# 🌌 Nasrulla Waleed — Portfolio

Portfolio **dark violet** avec **paysages** en arrière-plan, responsive (mobile/tablette/PC) et code propre.

## Pages
- `index.html` — Accueil (intro rapide + mots-clés)
- `about.html` — À propos (parcours + infos)
- `projects.html` — Projets (prêt à remplir)
- `services.html` — Services / compétences
- `documents.html` — Documents (CV PDF)
- `contact.html` — Contact + formulaire

## Structure
```
assets/
  css/main.css
  js/main.js
  img/ (paysages)
  docs/CV-Nasrulla-Waleed.pdf
forms/
  contact.js   (Formspree, compatible GitHub Pages)
  contact.php  (pour un hébergement PHP)
```

## Déploiement GitHub Pages
Repo → **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/ (root)**

## Formulaire (important)
GitHub Pages ne supporte pas PHP.
✅ Pour que le formulaire fonctionne sur GitHub Pages :
1. Crée un formulaire sur **Formspree**
2. Copie l’endpoint (ex: `https://formspree.io/f/xxxxxx`)
3. Ouvre `forms/contact.js` et colle l’URL dans `FORM_ENDPOINT`

Si tu héberges sur un serveur PHP, tu peux utiliser `forms/contact.php`.

## Images
Les images “paysages” viennent de GoodFreePhotos (CC0 / domaine public).
