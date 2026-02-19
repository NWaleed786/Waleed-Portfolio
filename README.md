# Portfolio - Nasrulla Waleed

Portfolio sombre violet, responsive et accessible (Bootstrap 5 via CDN).  
Prêt à déployer sur GitHub Pages.

## Pages
- `index.html` (Accueil)
- `about.html` (À propos)
- `resume.html` (CV)
- `services.html` (Services)
- `portfolio.html` (Portfolio)
- `portfolio-details.html` (Détails projet)
- `contact.html` (Contact)

## Tester en local
- Ouvre `index.html` dans ton navigateur
- Ou VS Code → extension **Live Server** → Go Live

## GitHub Pages
1. Crée un repo (ex: `waleed-portfolio`)
2. Upload tout le dossier
3. Settings → Pages → Branch `main` → `/ (root)`

## Formulaire de contact (important)
GitHub Pages ne supporte pas PHP, donc `forms/contact.php` ne fonctionne pas sur GitHub Pages.

Solutions:
- **Formspree**: remplace l'attribut `action` du formulaire par l'URL Formspree
- **EmailJS**: envoi direct via JS

Sur un hébergement PHP (OVH, o2switch, etc.), `forms/contact.php` fonctionne.

## CV
- PDF: `assets/docs/CV-Nasrulla-Waleed.pdf`
