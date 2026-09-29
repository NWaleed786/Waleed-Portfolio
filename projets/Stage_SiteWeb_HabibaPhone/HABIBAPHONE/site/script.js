const form = document.querySelector('#quote-form');

if (form) {
  const summary = document.querySelector('#summary');
  const result = document.querySelector('#result');
  const emailLink = document.querySelector('#email-link');
  const copyStatus = document.querySelector('#copy-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      'DEMANDE DE DEVIS — HABIBAPHONE',
      '',
      `Nom : ${data.get('nom')}`,
      `E-mail : ${data.get('email')}`,
      `Téléphone : ${data.get('telephone')}`,
      `Appareil : ${data.get('modele')}`,
      `Problème : ${data.get('probleme')}`,
      `Précisions : ${data.get('details')}`
    ].join('\n');

    summary.textContent = message;
    result.hidden = false;

    const gmail = new URL('https://mail.google.com/mail/');
    gmail.searchParams.set('view', 'cm');
    gmail.searchParams.set('fs', '1');
    gmail.searchParams.set('to', 'HabibaPhone12@gmail.com');
    gmail.searchParams.set('su', 'Demande de devis HABIBAPHONE');
    gmail.searchParams.set('body', message);
    emailLink.href = gmail.toString();

    // Si le navigateur bloque l'onglet, le lien reste visible sous le récapitulatif.
    window.open(emailLink.href, '_blank', 'noopener');
    result.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('#copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.textContent);
      copyStatus.textContent = 'Récapitulatif copié.';
    } catch {
      copyStatus.textContent = 'Sélectionnez le récapitulatif pour le copier.';
    }
  });

  document.querySelector('#print').addEventListener('click', () => window.print());
}
