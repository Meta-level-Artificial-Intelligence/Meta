(function () {
  const html = document.documentElement;
  const THEME_KEY = 'meta_ai_theme';
  const LANG_KEY = 'meta_ai_lang';

  // --- Theme ---
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }

  applyTheme(getInitialTheme());

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // --- Language State ---
  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang');
    if (q === 'en' || q === 'zh') return q;
    if (window.location.hash === '#en') return 'en';
    if (window.location.hash === '#zh') return 'zh';
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (_) {}
    return 'zh';
  }

  let currentLang = document.body.dataset.hasBilingual === 'true' ? getInitialLang() : 'zh';
  let headingEls = [];
  let tocLinkMap = new Map();

  function updateUiStrings(lang) {
    document.querySelectorAll('[data-zh][data-en]').forEach(function (el) {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
    });
    const searchInput = document.getElementById('tocSearch');
    if (searchInput) {
      searchInput.placeholder = lang === 'en' ? 'Filter headings...' : '筛选目录章节...';
    }
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // --- TOC Builder ---
  function buildToc() {
    const tocList = document.getElementById('tocList');
    const tocCount = document.getElementById('tocCount');
    const searchInput = document.getElementById('tocSearch');
    if (!tocList) return;

    const container = document.querySelector('.lang-pane.active') || document.getElementById('articleRoot');
    if (!container) return;

    headingEls = Array.from(container.querySelectorAll('h1, h2, h3'));
    tocList.innerHTML = '';
    tocLinkMap.clear();

    headingEls.forEach(function (h, idx) {
      if (!h.id) {
        h.id = 'sec-' + idx;
      }
      const level = parseInt(h.tagName.substring(1), 10);
      const li = document.createElement('li');
      li.className = 'toc-item toc-lvl-' + level;

      const a = document.createElement('a');
      a.className = 'toc-link';
      a.href = '#' + h.id;
      const label = h.textContent.trim();
      a.textContent = label;
      a.title = label;
      a.addEventListener('click', function () {
        closeDrawer();
      });

      li.appendChild(a);
      tocList.appendChild(li);
      tocLinkMap.set(h.id, { li: li, a: a, text: label.toLowerCase() });
    });

    if (tocCount) {
      tocCount.textContent = String(headingEls.length);
    }

    if (searchInput && searchInput.value.trim()) {
      filterToc(searchInput.value);
    }
    updateActiveHeading();
  }

  function filterToc(query) {
    const q = query.trim().toLowerCase();
    const tocList = document.getElementById('tocList');
    if (!tocList) return;
    let visible = 0;

    tocLinkMap.forEach(function (entry) {
      const match = !q || entry.text.includes(q);
      entry.li.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    let emptyEl = tocList.querySelector('.toc-empty');
    if (visible === 0) {
      if (!emptyEl) {
        emptyEl = document.createElement('li');
        emptyEl.className = 'toc-empty';
        emptyEl.textContent = currentLang === 'en' ? 'No matching headings' : '无匹配章节';
        tocList.appendChild(emptyEl);
      }
    } else if (emptyEl) {
      emptyEl.remove();
    }
  }

  const tocSearch = document.getElementById('tocSearch');
  if (tocSearch) {
    tocSearch.addEventListener('input', function (e) {
      filterToc(e.target.value);
    });
  }

  // --- Language Switcher ---
  function setLanguage(lang, pushUrl) {
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}

    if (document.body.dataset.hasBilingual === 'true') {
      document.querySelectorAll('.lang-pane').forEach(function (pane) {
        pane.classList.toggle('active', pane.dataset.lang === lang);
      });
      html.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
      document.title = lang === 'en'
        ? (document.body.dataset.titleEn || document.title)
        : (document.body.dataset.titleZh || document.title);

      if (pushUrl) {
        try {
          const url = new URL(window.location.href);
          if (lang === 'en') {
            url.searchParams.set('lang', 'en');
          } else {
            url.searchParams.delete('lang');
          }
          window.history.replaceState({}, '', url.toString());
        } catch (_) {}
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    updateUiStrings(lang);
    buildToc();
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const lang = btn.dataset.lang;
      if (!lang) return;
      if (document.body.dataset.hasBilingual === 'true') {
        setLanguage(lang, true);
      } else {
        // On secondary pages, switch UI chrome language or navigate to main page edition if desired
        try {
          localStorage.setItem(LANG_KEY, lang);
        } catch (_) {}
        currentLang = lang;
        updateUiStrings(lang);
      }
    });
  });

  // --- ScrollSpy & Progress ---
  function updateActiveHeading() {
    if (!headingEls.length) return;
    const offset = 100;
    let activeId = headingEls[0].id;
    for (let i = 0; i < headingEls.length; i++) {
      const rect = headingEls[i].getBoundingClientRect();
      if (rect.top <= offset) {
        activeId = headingEls[i].id;
      } else {
        break;
      }
    }

    tocLinkMap.forEach(function (entry, id) {
      const isActive = id === activeId;
      entry.a.classList.toggle('active', isActive);
      if (isActive) {
        const list = document.getElementById('tocList');
        if (list) {
          const linkRect = entry.a.getBoundingClientRect();
          const listRect = list.getBoundingClientRect();
          if (linkRect.top < listRect.top + 20 || linkRect.bottom > listRect.bottom - 20) {
            entry.a.scrollIntoView({ block: 'nearest' });
          }
        }
      }
    });
  }

  function updateScrollProgress() {
    const bar = document.getElementById('progressBar');
    const backBtn = document.getElementById('backToTop');
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    if (bar) {
      bar.style.width = Math.min(100, (scrollTop / maxScroll) * 100).toFixed(2) + '%';
    }
    if (backBtn) {
      backBtn.classList.toggle('visible', scrollTop > 400);
    }
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveHeading();
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Drawer ---
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('drawerBackdrop');
  const tocToggle = document.getElementById('tocToggle');

  function closeDrawer() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  if (tocToggle) {
    tocToggle.addEventListener('click', function () {
      const open = sidebar && sidebar.classList.toggle('open');
      if (backdrop) backdrop.classList.toggle('open', open);
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // --- Init ---
  if (document.body.dataset.hasBilingual === 'true') {
    setLanguage(currentLang, false);
  } else {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'zh') currentLang = saved;
    } catch (_) {}
    updateUiStrings(currentLang);
    buildToc();
  }
  updateScrollProgress();
})();
