# Waleed — Portfolio (Dark Violet)

Portfolio **pro, clean, responsive** (mobile/tablette/PC).
Navigation fluide type “pages” avec scroll (snap) + barre à droite.

## Pages
- `index.html` (expérience principale en scroll)
- `about.html`, `projects.html`, `services.html`, `documents.html`, `contact.html` (redirigent vers les sections de `index.html`)

## Dossiers
- `assets/css/main.css`
- `assets/js/main.js`
- `assets/img/` (illustrations SVG 3D)
- `assets/docs/CV-Waleed.pdf`
- `forms/` (formulaire)

## Formulaire
- GitHub Pages ne supporte pas PHP.
- Pour que le formulaire marche sur GitHub Pages: mets ton endpoint Formspree dans `forms/contact.js` (FORM_ENDPOINT).
- `forms/contact.php` sert si tu héberges sur un serveur PHP.

## Déploiement GitHub Pages
Settings → Pages → Deploy from branch → `main` → `/ (root)`

## Mise à jour
Upload les fichiers modifiés puis commit. GitHub Pages met à jour automatiquement.
