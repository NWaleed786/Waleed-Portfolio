(function(){
  const year = document.querySelector('[data-year]');
  if(year) year.textContent = new Date().getFullYear();

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if(href===path) a.classList.add('active');
  });
})();