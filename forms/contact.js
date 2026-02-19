const FORM_ENDPOINT = ""; // Formspree endpoint

(function(){
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if(!form || !status) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = "Envoi…";

    const data = new FormData(form);

    if(!FORM_ENDPOINT){
      status.textContent = "Configure Formspree dans forms/contact.js";
      return;
    }

    try{
      const res = await fetch(FORM_ENDPOINT, { method:'POST', headers:{'Accept':'application/json'}, body:data });
      if(res.ok){
        form.reset();
        status.textContent = "Message envoyé ✅";
      }else{
        status.textContent = "Erreur d’envoi.";
      }
    }catch(_){
      status.textContent = "Erreur réseau.";
    }
  });
})();
