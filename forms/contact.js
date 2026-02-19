// GitHub Pages-friendly contact form (Formspree)
// 1) Create a Formspree form, get endpoint URL
// 2) Replace FORM_ENDPOINT below
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxx"

(function(){
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    if(!FORM_ENDPOINT){
      e.preventDefault();
      status.textContent = "Configure Formspree dans forms/contact.js (FORM_ENDPOINT).";
      status.className = "alert alert-warning mt-3";
      return;
    }
    e.preventDefault();
    status.textContent = "Envoi…";
    status.className = "alert alert-info mt-3";

    const data = new FormData(form);
    try{
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      });
      if(res.ok){
        form.reset();
        status.textContent = "Message envoyé ✅";
        status.className = "alert alert-success mt-3";
      }else{
        status.textContent = "Erreur d’envoi. Réessaie plus tard.";
        status.className = "alert alert-danger mt-3";
      }
    }catch(err){
      status.textContent = "Impossible d’envoyer (réseau).";
      status.className = "alert alert-danger mt-3";
    }
  });
})();