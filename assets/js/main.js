(function(){
  const scroller = document.querySelector('[data-scroller]');
  const pages = Array.from(document.querySelectorAll('[data-page]'));
  const dots = Array.from(document.querySelectorAll('[data-dot]'));
  const topLinks = Array.from(document.querySelectorAll('[data-toplink]'));
  if(!scroller || pages.length === 0) return;

  function setActive(i){
    dots.forEach((d,idx)=>d.setAttribute('aria-current', idx===i ? 'true' : 'false'));
    topLinks.forEach(a=>a.setAttribute('aria-current', a.getAttribute('href') === pages[i].id ? 'page' : 'false'));
  }

  function scrollToIndex(i){
    const el = pages[i];
    if(!el) return;
    el.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  dots.forEach((d,i)=>{
    d.addEventListener('click', ()=>scrollToIndex(i));
  });

  topLinks.forEach((a)=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  const io = new IntersectionObserver((entries)=>{
    const visible = entries
      .filter(en=>en.isIntersecting)
      .sort((a,b)=>b.intersectionRatio - a.intersectionRatio)[0];
    if(!visible) return;
    const i = pages.findIndex(p=>p === visible.target);
    if(i >= 0) setActive(i);
  }, { root: scroller, threshold: [0.35, 0.6, 0.85] });

  pages.forEach(p=>io.observe(p));
  setActive(0);
})();