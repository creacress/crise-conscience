#!/usr/bin/env python3
"""
Publication automatique des posts Instagram de Crise Conscience.

API utilisée : « Instagram API with Instagram Login » (graph.instagram.com),
qui ne nécessite pas de Page Facebook, seulement un compte Instagram
professionnel. Les jetons durent 60 jours ; le script les renouvelle lui-même
et conserve le jeton courant chiffré dans instagram/token.enc (clé dans le
secret TOKEN_KEY), que le workflow commite.

Lit instagram/posts.json, prend le premier post "pending" dont la date est
atteinte, le publie (image + légende), puis marque le post "published" (ou
"error") dans le fichier.

Variables d'environnement :
  IG_ACCESS_TOKEN  jeton initial (long-lived). Utilisé si token.enc n'existe pas.
  TOKEN_KEY        clé de chiffrement de token.enc (obligatoire pour la rotation)
  DRY_RUN=1        n'appelle pas l'API de publication
  FORCE_POST=42    publie le post n° 42 quelle que soit sa date

Usage : python3 instagram/publish.py
"""

from __future__ import annotations

import base64
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path

GRAPH = "https://graph.instagram.com/v21.0"
HERE = Path(__file__).resolve().parent
POSTS_FILE = HERE / "posts.json"
TOKEN_FILE = HERE / "token.enc"


# ----------------------------------------------------------------- jeton

def _openssl(args: list[str], data: bytes, key: str) -> bytes:
    return subprocess.run(
        ["openssl", "enc", *args, "-aes-256-cbc", "-pbkdf2", "-salt", "-pass", "env:TOKEN_KEY"],
        input=data, capture_output=True, check=True, env={**os.environ, "TOKEN_KEY": key},
    ).stdout


def load_token() -> tuple[str, str]:
    """Renvoie (jeton, source). Priorité au fichier chiffré, sinon au secret."""
    key = os.environ.get("TOKEN_KEY")
    if TOKEN_FILE.exists() and key:
        blob = base64.b64decode(TOKEN_FILE.read_text())
        payload = json.loads(_openssl(["-d"], blob, key))
        return payload["token"], f"token.enc (obtenu le {payload['obtained'][:10]})"
    token = os.environ.get("IG_ACCESS_TOKEN", "")
    if not token:
        raise RuntimeError("Aucun jeton : définir le secret IG_ACCESS_TOKEN.")
    return token, "secret IG_ACCESS_TOKEN"


def save_token(token: str) -> None:
    key = os.environ.get("TOKEN_KEY")
    if not key:
        print("TOKEN_KEY absent : le jeton renouvelé n'est pas conservé.", file=sys.stderr)
        return
    payload = json.dumps({"token": token, "obtained": datetime.now(timezone.utc).isoformat()}).encode()
    TOKEN_FILE.write_text(base64.b64encode(_openssl(["-e"], payload, key)).decode() + "\n")


def refresh_token(token: str) -> str | None:
    """Renouvelle un jeton long-lived (valable 60 jours). Renvoie le nouveau jeton ou None."""
    try:
        res = api("GET", "refresh_access_token", {"grant_type": "ig_refresh_token"}, token, raw=True)
        print(f"Jeton renouvelé, expire dans {res.get('expires_in', 0) // 86400} jours.")
        return res["access_token"]
    except RuntimeError as e:
        # Un jeton de moins de 24 h ne peut pas être renouvelé : ce n'est pas bloquant.
        print(f"Renouvellement du jeton non effectué : {e}", file=sys.stderr)
        return None


# ------------------------------------------------------------------- API

def api(method: str, path: str, params: dict, token: str, raw: bool = False) -> dict:
    params = {**params, "access_token": token}
    data = urllib.parse.urlencode(params).encode()
    url = f"https://graph.instagram.com/{path}" if raw else f"{GRAPH}/{path}"
    if method == "GET":
        req = urllib.request.Request(f"{url}?{data.decode()}")
    else:
        req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: {body}") from None


def check_image(url: str) -> None:
    req = urllib.request.Request(url, method="HEAD")
    with urllib.request.urlopen(req, timeout=30) as resp:
        ctype = resp.headers.get("Content-Type", "")
        if not ctype.startswith("image/"):
            raise RuntimeError(f"L'URL {url} ne renvoie pas une image ({ctype}).")


def publish(token: str, ig_user_id: str, image_url: str, caption: str) -> str:
    """Crée le conteneur média, attend qu'il soit prêt, publie. Renvoie l'id du média."""
    container = api("POST", f"{ig_user_id}/media", {"image_url": image_url, "caption": caption}, token)
    cid = container["id"]
    for _ in range(20):
        status = api("GET", cid, {"fields": "status_code,status"}, token)
        code = status.get("status_code")
        if code == "FINISHED":
            break
        if code == "ERROR":
            raise RuntimeError(f"Conteneur en erreur : {status}")
        time.sleep(3)
    else:
        raise RuntimeError("Le conteneur média n'est pas prêt après 60 s.")
    result = api("POST", f"{ig_user_id}/media_publish", {"creation_id": cid}, token)
    return result["id"]


# ------------------------------------------------------------------ main

def main() -> int:
    posts = json.loads(POSTS_FILE.read_text(encoding="utf-8"))
    today = date.today().isoformat()
    dry_run = os.environ.get("DRY_RUN") == "1"
    force = os.environ.get("FORCE_POST")

    if force:
        candidates = [p for p in posts if str(p["n"]) == force]
    else:
        candidates = [p for p in posts if p["status"] == "pending" and p["date"] <= today]

    if not os.environ.get("IG_ACCESS_TOKEN") and not TOKEN_FILE.exists():
        print("Pas encore de jeton Instagram (secret IG_ACCESS_TOKEN absent) : rien à faire.")
        return 0

    token, source = load_token()
    print(f"Jeton : {source}")

    if not candidates:
        pending = [p for p in posts if p["status"] == "pending"]
        nxt = f"prochain : n° {pending[0]['n']} le {pending[0]['date']}" if pending else "tout est publié"
        print(f"Rien à publier aujourd'hui ({today}), {nxt}.")
        if not dry_run and (new := refresh_token(token)):
            save_token(new)
        return 0

    post = sorted(candidates, key=lambda p: p["n"])[0]
    print(f"Post n° {post['n']} ({post['theme']}, prévu le {post['date']})")
    print(f"Image : {post['image']}")
    print(f"Légende ({len(post['caption'])} car.) :\n{post['caption'][:200]}…\n")

    if dry_run:
        me = api("GET", "me", {"fields": "user_id,username,account_type"}, token)
        print(f"Compte : @{me.get('username')} ({me.get('account_type')}, id {me.get('user_id')})")
        print("DRY_RUN=1 : aucune publication.")
        return 0

    try:
        check_image(post["image"])
        me = api("GET", "me", {"fields": "user_id,username"}, token)
        print(f"Compte : @{me.get('username')}")
        media_id = publish(token, me["user_id"], post["image"], post["caption"])
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
    if new := refresh_token(token):
        save_token(new)
    return rc


if __name__ == "__main__":
    sys.exit(main())
