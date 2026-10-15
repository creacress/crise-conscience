# Instagram : publication automatique

100 posts prêts, publiés un par semaine (le lundi) par le workflow GitHub
Actions `.github/workflows/instagram.yml`. Le workflow tourne tous les jours
à 09:15 UTC et ne publie que si un post est prévu à cette date ou avant.

* `posts.json` : la file d'attente (numéro, date prévue, thème, URL de l'image,
  légende, statut). Les images sont servies par le site :
  `https://criseconscience.org/instagram/post-NNN.png` (dossier `public/instagram`).
* `publish.py` : prend le premier post `pending` dont la date est atteinte,
  le publie via l'API Instagram (graph.instagram.com), puis note `published`
  (ou `error`). Le workflow commite le fichier mis à jour sur `main`.
* `token.enc` : jeton courant, chiffré (AES-256, clé = secret `TOKEN_KEY`).
  Le script renouvelle le jeton à chaque exécution (validité 60 jours) et
  réécrit ce fichier, donc le jeton ne périme jamais tant que le workflow tourne.

## Pré-requis côté Instagram / Meta

1. Compte Instagram de l'association en mode **Professionnel** (Entreprise ou
   Créateur). Pas besoin de Page Facebook.
2. Une app sur developers.facebook.com (type « Business » ou « Other »),
   produit **Instagram** > « API setup with Instagram login ».
3. Dans « Generate access tokens », ajouter le compte Instagram et générer un
   jeton avec `instagram_business_basic` et `instagram_business_content_publish`.
   Ce jeton est long-lived (60 jours).

## Secrets GitHub (Settings > Secrets and variables > Actions)

* `IG_ACCESS_TOKEN` : le jeton généré ci-dessus (sert au premier lancement,
  ensuite `token.enc` prend le relais).
* `TOKEN_KEY` : une phrase secrète quelconque (32 caractères aléatoires),
  pour chiffrer `token.enc`.

Tant que `IG_ACCESS_TOKEN` est absent, le workflow se termine sans rien faire.

## Opérations courantes

* Tester sans publier : lancer le workflow à la main (onglet Actions) avec
  « Simulation » coché. Le résumé affiche le compte Instagram reconnu.
* Publier un post précis tout de suite : lancer le workflow à la main avec
  son numéro dans « Numéro de post ».
* Décaler le calendrier : modifier les champs `date` dans `posts.json`.
* Rejouer un post en erreur : remettre son `status` à `pending`.
* Ajouter des posts : déposer l'image dans `public/instagram/` et ajouter un
  bloc dans `posts.json` (statut `pending`).
* Jeton perdu ou révoqué : regénérer un jeton, le remettre dans
  `IG_ACCESS_TOKEN` et supprimer `token.enc`.

En local : `IG_ACCESS_TOKEN=... python3 instagram/publish.py` (ajouter
`DRY_RUN=1` pour simuler).
