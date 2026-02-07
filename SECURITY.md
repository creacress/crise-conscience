# Security Policy

## 📌 Scope

Cette politique de sécurité s’applique au **code source du site web de l’association Crise Conscience**.

Elle couvre :
- L’application web (Next.js)
- Les API et mécanismes d’ingestion de contenu
- La configuration de build, CI/CD et déploiement

Elle **ne couvre pas** :
- Les opinions, analyses ou positions éditoriales de l’association
- Les contenus de sources externes référencées

---

## 🔐 Versions prises en charge

Seule la **version actuellement déployée depuis la branche `main`** est maintenue avec des correctifs de sécurité.

| Version | Support sécurité |
|--------|------------------|
| main (production) | ✅ |
| anciennes versions / forks | ❌ |

---

## 🚨 Signalement d’une vulnérabilité

Si vous découvrez une faille de sécurité, **merci de ne pas ouvrir d’issue publique**.

### Contact dédié
📧 **security@criseconscience.org**

### Objet du mail

[SECURITY] Brève description

### Merci d’inclure
- Une description claire de la vulnérabilité
- Les étapes de reproduction (si possible)
- L’impact potentiel
- Toute information utile (logs, captures, PoC)

---

## ⏱ Processus de traitement

- Accusé de réception sous **72 heures**
- Analyse et validation
- Correction et déploiement
- Divulgation publique éventuelle **uniquement après correction**

Nous encourageons la **divulgation responsable** et remercions les chercheurs pour leur coopération.

---

## 🛡 Mesures de sécurité en place

Ce dépôt utilise :
- Analyse automatique des dépendances (Dependabot)
- Détection de secrets & protection à l’envoi
- Analyse statique du code (CodeQL)
- Intégration continue obligatoire avant merge

---

## ⚠ Cadre légal

Toute recherche de sécurité doit être menée **de bonne foi**.

Sont strictement interdits :
- l’exploitation malveillante de failles,
- l’accès non autorisé à des données,
- toute perturbation volontaire du service.

Ces actes relèvent du cadre légal en vigueur.

---

© Crise Conscience