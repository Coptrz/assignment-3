(function () {
  // ===== Grab references to DOM elements =====
  const docEl = document.documentElement;      // <html> element (for theme toggle)
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const greeting = document.getElementById('greeting');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const year = document.getElementById('year');

  // ===== Footer year =====
  if (year) year.textContent = new Date().getFullYear();

  // ===== Greeting message by time of day =====
  const hour = new Date().getHours();
  let msg = 'Hello!';
  if (hour < 12) msg = 'Good morning!';
  else if (hour < 18) msg = 'Good afternoon!';
  else msg = 'Good evening!';
  if (greeting) greeting.textContent = msg;

  // ===== Theme Toggle with persistence =====
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    docEl.setAttribute('data-theme', 'dark');   // apply dark theme
    themeToggle?.setAttribute('aria-pressed', 'true');
    if (themeLabel) themeLabel.textContent = 'Light'; // update label
  }

  // Toggle theme on button click
  themeToggle?.addEventListener('click', () => {
    const isDark = docEl.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);        // save preference
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    if (themeLabel) themeLabel.textContent = isDark ? 'Dark' : 'Light';
  });

  // ===== Contact Form validation (demo only) =====
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Clear previous errors
    ['name','email','message'].forEach(id => {
      document.getElementById(id)?.classList.remove('error');
      document.getElementById('err-' + id).textContent = '';
    });

    let errors = [];
    if (!name.value.trim()) { errors.push('Name is required.'); document.getElementById('err-name').textContent = 'Name is required.'; name.classList.add('error'); }
    if (!email.value.trim()) { errors.push('Email is required.'); document.getElementById('err-email').textContent = 'Email is required.'; email.classList.add('error'); }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { errors.push('Enter a valid email.'); document.getElementById('err-email').textContent = 'Enter a valid email.'; email.classList.add('error'); }
    if (!message.value.trim()) { errors.push('Message is required.'); document.getElementById('err-message').textContent = 'Message is required.'; message.classList.add('error'); }

    if (errors.length) {
      formStatus.textContent = errors.join(' ');
      formStatus.classList.remove('hidden');
      formStatus.classList.add('status','show','error');
      setTimeout(() => formStatus.classList.remove('error'), 400);
      return;
    }

    formStatus.textContent = 'Thanks! Your message has been prepared (demo only).';
    formStatus.classList.remove('hidden');
    formStatus.classList.add('status','show','success');
    setTimeout(() => formStatus.classList.remove('success'), 1000);
    form.reset();
  });

})();
// ===== Personalized Greeting (stored username) =====
(() => {
  const nameForm = document.getElementById('nameForm');
  const usernameInput = document.getElementById('username');
  const nameStatus = document.getElementById('nameStatus');
  const greeting = document.getElementById('greeting');

  // Load saved name into input
  const savedName = localStorage.getItem('username');
  if (savedName && usernameInput) {
    usernameInput.value = savedName;
  }

  // Append name to greeting if available
  function applyGreetingName() {
    if (!greeting) return;
    const nm = localStorage.getItem('username');
    if (!nm) return; // if no name saved, keep normal greeting

    // keep the full original greeting ("Good morning!" etc.)
    const current = greeting.textContent || 'Hello!';
    // if the greeting already includes the name, avoid duplication
    if (current.includes(nm)) return;

    // remove just the exclamation mark and append name
    const base = current.replace(/!$/, '');
    greeting.textContent = `${base}, ${nm}!`;
  }

  applyGreetingName();

  nameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = usernameInput?.value.trim();
    if (!val) {
      if (nameStatus) nameStatus.textContent = 'Please enter a name.';
      return;
    }
    localStorage.setItem('username', val);
    if (nameStatus) nameStatus.textContent = 'Saved ✔';
    applyGreetingName();
    setTimeout(() => { if (nameStatus) nameStatus.textContent = ''; }, 1600);
  });
})();
// ===== Live Search + Category Filters for Projects =====
(() => {
  const search = document.getElementById('projectSearch');
  const chips = Array.from(document.querySelectorAll('.filters .chip'));
  const cards = Array.from(document.querySelectorAll('.projects-grid .card'));
  const emptyState = document.getElementById('emptyState');

  let activeFilter = 'all';

  function visibleByFilter(card) {
    if (activeFilter === 'all') return true;
    return (card.getAttribute('data-category') || '').toLowerCase() === activeFilter;
  }

  function visibleBySearch(card) {
    const q = (search?.value || '').toLowerCase();
    return card.textContent.toLowerCase().includes(q);
  }

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach(card => {
      const show = visibleByFilter(card) && visibleBySearch(card);
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    if (emptyState) emptyState.classList.toggle('hidden', visibleCount !== 0);
  }

  // chip clicks
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = (chip.getAttribute('data-filter') || 'all').toLowerCase();
      applyFilters();
    });
  });

  // live search
  search?.addEventListener('input', applyFilters);

  // initial paint
  applyFilters();
})();
// ===== Expand/Collapse project details =====
(() => {
  const toggles = Array.from(document.querySelectorAll('.toggle-details'));
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (!(details instanceof HTMLElement)) return;
      const isOpen = details.getAttribute('data-open') === 'true';
      details.hidden = isOpen;
      details.setAttribute('data-open', String(!isOpen));
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = isOpen ? 'Show details' : 'Hide details';
    });
  });
})();
// ===== Public API demo with loading, fallback, and retry =====
// Uses a simple public endpoint; if it fails, shows a friendly error and a retry button.
(() => {
  const statusEl = document.getElementById('apiStatus');
  const quoteEl = document.getElementById('apiQuote');
  const retryBtn = document.getElementById('apiRetry');

  if (!statusEl || !quoteEl || !retryBtn) return; // widget not on page

  async function fetchQuote() {
    // UI: set loading state
    statusEl.textContent = "Loading a quick quote";
    statusEl.classList.add('loading');
    quoteEl.classList.add('hidden');
    quoteEl.textContent = "";

    try {
      // fetch with a simple timeout race to avoid hanging forever
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 6000);

      // Example public API (can be any safe CORS-enabled API)
      const res = await fetch('https://api.quotable.io/random', { signal: controller.signal });
      clearTimeout(t);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // UI: success
      quoteEl.textContent = `“${data.content}” — ${data.author || "Unknown"}`;
      quoteEl.classList.remove('hidden');
      statusEl.textContent = "Loaded";
      statusEl.classList.remove('loading');
    } catch (err) {
      // UI: friendly fallback with retry
      statusEl.textContent = "Couldn't load a quote. Check your connection and click Try another.";
      statusEl.classList.remove('loading');
      quoteEl.classList.add('hidden');
    }
  }

  // First load + retry handler
  fetchQuote();
  retryBtn.addEventListener('click', fetchQuote);
})();
// ===== Reveal on scroll (fade/slide in) =====
(() => {
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || items.length === 0) {
    // Fallback: show everything if IO not supported
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target); // reveal once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  items.forEach(el => io.observe(el));
})();

