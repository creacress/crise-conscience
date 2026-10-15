#!/usr/bin/env python3
"""
Publication automatique des posts Instagram de Crise Conscience.

Lit instagram/posts.json, prend le premier post "pending" dont la date est
atteinte, le publie via l'API Instagram Graph (image + légende), puis marque
le post comme "published" (ou "error") dans le fichier.

Variables d'environnement :
  IG_ACCESS_TOKEN  (obligatoire) jeton d'accès Meta (page / system user)
  IG_USER_ID       (facultatif)  identifiant du compte Instagram pro ;
                                 résolu automatiquement s'il est absent
  DRY_RUN=1        (facultatif)  n'appelle pas l'API, affiche ce qui serait publié
  FORCE_POST=42    (facultatif)  publie le post n° 42 quelle que soit sa date

Usage : python3 instagram/publish.py
"""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path

GRAPH = "https://graph.facebook.com/v21.0"
POSTS_FILE = Path(__file__).with_name("posts.json")


def api(method: str, path: str, params: dict) -> dict:
    """Appel Graph API avec le jeton, renvoie le JSON décodé."""
    params = {**params, "access_token": os.environ["IG_ACCESS_TOKEN"]}
    data = urllib.parse.urlencode(params).encode()
    url = f"{GRAPH}/{path}"
    if method == "GET":
        url = f"{url}?{data.decode()}"
        req = urllib.request.Request(url)
    else:
        req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: {body}") from None


def resolve_ig_user_id() -> str:
    """Trouve le compte Instagram pro lié à une des pages accessibles."""
    if os.environ.get("IG_USER_ID"):
        return os.environ["IG_USER_ID"]
    pages = api("GET", "me/accounts", {"fields": "name,instagram_business_account"})
    for page in pages.get("data", []):
        iba = page.get("instagram_business_account")
        if iba:
            print(f"Compte Instagram trouvé via la page « {page['name']} » : {iba['id']}")
            return iba["id"]
    raise RuntimeError(
        "Aucun compte Instagram professionnel lié aux pages accessibles. "
        "Vérifier que le compte est en mode Professionnel et relié à une Page Facebook."
    )


def check_image(url: str) -> None:
    req = urllib.request.Request(url, method="HEAD")
    with urllib.request.urlopen(req, timeout=30) as resp:
        ctype = resp.headers.get("Content-Type", "")
        if not ctype.startswith("image/"):
            raise RuntimeError(f"L'URL {url} ne renvoie pas une image ({ctype}).")


def publish(ig_user_id: str, image_url: str, caption: str) -> str:
    """Crée le conteneur média, attend qu'il soit prêt, publie. Renvoie l'id du média."""
    container = api("POST", f"{ig_user_id}/media", {"image_url": image_url, "caption": caption})
    cid = container["id"]
    for _ in range(20):
        status = api("GET", cid, {"fields": "status_code,status"})
        code = status.get("status_code")
        if code == "FINISHED":
            break
        if code == "ERROR":
            raise RuntimeError(f"Conteneur en erreur : {status}")
        time.sleep(3)
    else:
        raise RuntimeError("Le conteneur média n'est pas prêt après 60 s.")
    result = api("POST", f"{ig_user_id}/media_publish", {"creation_id": cid})
    return result["id"]


def main() -> int:
    posts = json.loads(POSTS_FILE.read_text(encoding="utf-8"))
    today = date.today().isoformat()
    dry_run = os.environ.get("DRY_RUN") == "1"
    force = os.environ.get("FORCE_POST")

    if force:
        candidates = [p for p in posts if str(p["n"]) == force]
    else:
        candidates = [p for p in posts if p["status"] == "pending" and p["date"] <= today]
    if not candidates:
        pending = [p for p in posts if p["status"] == "pending"]
        nxt = f"prochain : n° {pending[0]['n']} le {pending[0]['date']}" if pending else "tout est publié"
        print(f"Rien à publier aujourd'hui ({today}), {nxt}.")
        return 0

    post = sorted(candidates, key=lambda p: p["n"])[0]
    print(f"Post n° {post['n']} ({post['theme']}, prévu le {post['date']})")
    print(f"Image : {post['image']}")
    print(f"Légende ({len(post['caption'])} car.) :\n{post['caption'][:200]}…\n")

    if dry_run:
        print("DRY_RUN=1 : aucune publication.")
        return 0

    try:
        check_image(post["image"])
        ig_user_id = resolve_ig_user_id()
        media_id = publish(ig_user_id, post["image"], post["caption"])
        post["status"] = "published"
        post["media_id"] = media_id
        post["published_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
        print(f"Publié : media_id={media_id}")
        rc = 0
    except Exception as e:  # noqa: BLE001
        post["status"] = "error"
        post["error"] = str(e)[:500]
        post["published_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
        print(f"ERREUR : {e}", file=sys.stderr)
        rc = 1

    POSTS_FILE.write_text(json.dumps(posts, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return rc


if __name__ == "__main__":
    sys.exit(main())
