
(function(){
  const yearEl = document.querySelector('[data-year]');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if(btn && nav){
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    btn.addEventListener('click', ()=> setOpen(!nav.classList.contains('open')));

    // Fermer le menu quand on clique sur un lien
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Fermer quand on clique en dehors
    document.addEventListener('click', (e) => {
      const isOpen = nav.classList.contains('open');
      if(!isOpen) return;
      if(nav.contains(e.target) || btn.contains(e.target)) return;
      setOpen(false);
    });

    // Fermer via ESC
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') setOpen(false);
    });

    // Si on repasse en desktop, on remet propre
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 860) setOpen(false);
    });
  }

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path) a.classList.add('active');
  });

  // Liens "bientôt" (aria-disabled) : on bloque le clic
  document.querySelectorAll('a[aria-disabled="true"]').forEach(a=>{
    a.addEventListener('click', (e)=> e.preventDefault());
  });
})();
