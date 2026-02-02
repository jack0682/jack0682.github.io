(function () {
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const langBtn = document.getElementById('lang-toggle');

  // Theme
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') html.classList.add('theme-dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      html.classList.toggle('theme-dark');
      localStorage.setItem('theme', html.classList.contains('theme-dark') ? 'dark' : 'light');
    });
  }

  // Language
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      const path = window.location.pathname;
      const isEN = path.startsWith('/en/');
      const nextPath = isEN ? path.replace(/^\/en\//, '/') : '/en' + path;
      localStorage.setItem('lang', isEN ? 'ko' : 'en');
      window.location.pathname = nextPath;
    });
  }
})();
