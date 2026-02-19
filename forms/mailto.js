
(function(){
  const form = document.querySelector('[data-mailto-form]');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const to = form.getAttribute('data-to') || '';
    const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  });
})();
