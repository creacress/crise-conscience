# Crise Conscience

Site web officiel de l’association **Crise Conscience**, dédiée à la **sensibilisation, l’analyse critique et la prévention des dérives sectaires**.  
Le projet est **open source**, tout en protégeant strictement l’identité, les contenus et la mission de l’association.

---

## 🌍 Objectif du projet

- Informer et sensibiliser le grand public
- Publier des articles d’analyse critique et pédagogique
- Centraliser des ressources fiables (rapports, institutions, associations)
- Automatiser la mise à jour des contenus (CMS / n8n)
- Proposer un site moderne, accessible et durable

---

## 🧠 Stack technique

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Prisma**
- **PostgreSQL (Neon)**
- **n8n** (ingestion & automatisation des contenus)
- **Vercel** (déploiement)

---

## 🔐 Licence & droits

### Code
Le code source est distribué sous licence **AGPL-3.0**.  
Toute modification déployée publiquement doit être rendue accessible.

### Contenus & identité
Les éléments suivants **ne sont pas couverts par la licence open source** :
- Nom et identité de l’association *Crise Conscience*
- Logo, charte graphique, visuels
- Textes éditoriaux, articles, ressources pédagogiques

➡️ **© Crise Conscience — Tous droits réservés**

Voir `COPYRIGHT.md` pour plus de détails.

---

## 🚀 Démarrage rapide (local)

### Prérequis
- Node.js 20+
- npm / pnpm / yarn
- Base PostgreSQL

### Installation
```bash
git clone https://github.com/creacress/crise-conscience.git
cd crise-conscience
npm install
```

### Configuration
Créer un fichier `.env` à partir de l’exemple :
```bash
cp .env.example .env
```

### Lancer le projet
```bash
npm run dev
```

➡️ http://localhost:3000

---

## 🧪 Scripts utiles

```bash
npm run dev        # Développement
npm run build      # Build production
npm run lint       # Lint
npm run typecheck  # Vérification TypeScript
```

---

## 🔍 Sécurité

- Analyse automatique des dépendances (Dependabot)
- Scan de code (CodeQL)
- Protection des secrets GitHub
- CI obligatoire avant merge

📧 Signalement responsable : `security@criseconscience.org`  
Voir `SECURITY.md`.

---

## 🤝 Contributions

Les contributions sont bienvenues **sur le code uniquement**.

Merci de :
- respecter la mission de l’association
- ne pas réutiliser les contenus ou l’identité
- proposer des PR claires et documentées

---

## 📬 Contact

- 🌐 https://www.criseconscience.org
- 📧 contact@criseconscience.org
- 👨‍💻 admin@criseconscience.org
- 🔒 security@webcresson.com

---

> Ce projet est volontairement ouvert pour favoriser la transparence,  
> mais fermement protégé pour éviter toute récupération ou détournement.
