
(function(){
  let pointerFrame;
  document.addEventListener('pointermove', (event) => {
    if(pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      const x = (event.clientX / window.innerWidth - 0.5) * -18;
      const y = (event.clientY / window.innerHeight - 0.5) * -14;
      document.body.style.setProperty('--bg-shift-x', `${x.toFixed(2)}px`);
      document.body.style.setProperty('--bg-shift-y', `${y.toFixed(2)}px`);
      pointerFrame = null;
    });
  });

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

  document.querySelectorAll('[data-preview-open]').forEach(btn => {
    const dialog = document.getElementById(btn.dataset.previewOpen);
    if(!dialog) return;
    btn.addEventListener('click', () => dialog.showModal());
  });

  document.querySelectorAll('[data-preview-close]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('dialog').close());
  });

  document.querySelectorAll('dialog.preview-dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if(e.target === dialog) dialog.close();
    });
  });

  const typingText = document.querySelector('[data-typing-text]');
  if(typingText){
    const words = ['développeur', 'sérieux', 'créatif', 'curieux', 'motivé'];
    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;

    const typeLoop = () => {
      const word = words[wordIndex];
      typingText.textContent = word.slice(0, characterIndex);

      if(deleting){
        characterIndex -= 1;
        if(characterIndex === 0){
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      } else {
        characterIndex += 1;
        if(characterIndex === words[wordIndex].length){
          deleting = true;
          window.setTimeout(typeLoop, 2600);
          return;
        }
      }

      window.setTimeout(typeLoop, deleting ? 100 : 155);
    };

    window.setTimeout(typeLoop, 1400);
  }

  const newsPanel = document.querySelector('[data-live-news]');
  if(newsPanel){
    const topicSelect = newsPanel.querySelector('[data-news-topic]');
    const dateInput = newsPanel.querySelector('[data-news-date]');
    const refreshButton = newsPanel.querySelector('[data-news-refresh]');
    const status = newsPanel.querySelector('[data-news-status]');
    const newsList = newsPanel.querySelector('[data-news-list]');

    const loadNews = async () => {
      status.textContent = 'Chargement des nouveautés...';
      newsList.replaceChildren();
      try {
        const topics = topicSelect ? [topicSelect.value] : ['Apple', 'iPhone', 'AirPods', 'Samsung', 'intelligence artificielle', 'technologie'];
        const responses = await Promise.allSettled(topics.map(topic => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${topic}&hl=fr&gl=FR&ceid=FR:fr`)}`)));
        const availableResponses = responses.filter(result => result.status === 'fulfilled' && result.value.ok).map(result => result.value);
        if(!availableResponses.length) throw new Error('API indisponible');
        const feeds = await Promise.all(availableResponses.map(response => response.json()));
        const selectedDate = dateInput.value;
        const stories = feeds.flatMap(feed => feed.items || []).filter(story => {
          const publicationDate = new Date(story.pubDate).toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' });
          return story.title && story.link && publicationDate >= selectedDate;
        }).sort((first, second) => new Date(second.pubDate) - new Date(first.pubDate)).filter((story, index, allStories) => allStories.findIndex(item => item.link === story.link) === index).slice(0, 12);
        if(!stories.length){
          status.textContent = 'Aucune nouveauté trouvée depuis cette date.';
          return;
        }
        status.textContent = `Flux RSS/JSON · ${stories.length} nouveauté(s) en français · triées par date`;
        localStorage.setItem('veille-last-update', new Date().toISOString());
        stories.forEach(story => {
          const item = document.createElement('div');
          item.className = 'veille-live-item';
          const link = document.createElement('a');
          link.href = story.link;
          link.target = '_blank';
          link.rel = 'noopener';
          link.textContent = story.title;
          const date = document.createElement('time');
          date.textContent = new Date(story.pubDate).toLocaleDateString('fr-FR');
          item.append(link, date);
          newsList.append(item);
        });
      } catch(error) {
        status.textContent = 'Le flux est momentanément indisponible. Les articles de référence restent accessibles ci-dessus.';
      }
    };

    dateInput.value = '2026-09-01';
    refreshButton.addEventListener('click', loadNews);
    if(topicSelect) topicSelect.addEventListener('change', loadNews);
    dateInput.addEventListener('change', loadNews);
    loadNews();
    window.setInterval(loadNews, 24 * 60 * 60 * 1000);
  }
})();
