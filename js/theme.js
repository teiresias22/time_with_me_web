const Theme = {
  init() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.set(theme);

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.set(e.matches ? 'dark' : 'light');
        }
      });

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.set(next);
    localStorage.setItem('theme', next);
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }
};
