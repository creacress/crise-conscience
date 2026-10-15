# Instagram : publication automatique

100 posts prêts, publiés un par un par le workflow GitHub Actions
`.github/workflows/instagram.yml`, tous les jours à 09:15 UTC.

* `posts.json` : la file d'attente (numéro, date prévue, thème, URL de l'image,
  légende, statut). Les images sont servies par le site :
  `https://criseconscience.org/instagram/post-NNN.png` (dossier `public/instagram`).
* `publish.py` : prend le premier post `pending` dont la date est atteinte,
  le publie via l'API Instagram Graph, puis note `published` (ou `error`).
  Le workflow commite le fichier mis à jour sur `main`.

## Secrets GitHub nécessaires (Settings > Secrets and variables > Actions)

* `IG_ACCESS_TOKEN` : jeton Meta avec les permissions `instagram_basic`,
  `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
  Préférer un jeton de System User (Business Manager) qui n'expire pas.
* `IG_USER_ID` : facultatif, identifiant du compte Instagram pro
  (résolu automatiquement via les pages accessibles s'il est absent).

Pré-requis côté Meta : compte Instagram en mode Professionnel, relié à une
Page Facebook, et une app Meta (type Business) avec le produit Instagram.

## Opérations courantes

* Tester sans publier : lancer le workflow à la main (onglet Actions) avec
  « Simulation » coché.
* Publier un post précis tout de suite : lancer le workflow à la main avec
  son numéro dans « Numéro de post ».
* Décaler le calendrier : modifier les champs `date` dans `posts.json`.
* Rejouer un post en erreur : remettre son `status` à `pending`.
* Ajouter des posts : déposer l'image dans `public/instagram/` et ajouter un
  bloc dans `posts.json` (statut `pending`).

En local : `IG_ACCESS_TOKEN=... python3 instagram/publish.py` (ajouter
`DRY_RUN=1` pour simuler).
