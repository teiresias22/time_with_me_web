const I18n = {
  currentLang: 'en',
  translations: {},
  supported: ['en', 'ko', 'es', 'ja', 'zh'],

  async init() {
    const saved = localStorage.getItem('lang');
    const browserLang = navigator.language.slice(0, 2);
    this.currentLang = saved || (this.supported.includes(browserLang) ? browserLang : 'en');

    if (this.currentLang !== 'en') {
      await this.loadLanguage(this.currentLang);
      this.apply();
    }

    this.updateSelector();

    const select = document.getElementById('lang-select');
    if (select) {
      select.addEventListener('change', (e) => this.setLanguage(e.target.value));
    }
  },

  async loadLanguage(lang) {
    if (this.translations[lang]) return;
    try {
      const resp = await fetch('i18n/' + lang + '.json');
      if (resp.ok) {
        this.translations[lang] = await resp.json();
      }
    } catch (e) {
      console.warn('Failed to load language:', lang);
    }
  },

  async setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    if (lang === 'en') {
      this.resetToDefault();
    } else {
      await this.loadLanguage(lang);
      this.apply();
    }

    this.updateSelector();
  },

  apply() {
    const t = this.translations[this.currentLang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = this.resolve(t, key);
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = this.resolve(t, key);
      if (value) el.innerHTML = value;
    });
  },

  resetToDefault() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const def = el.getAttribute('data-i18n-default');
      if (def) el.textContent = def;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const def = el.getAttribute('data-i18n-html-default');
      if (def) el.innerHTML = def;
    });
  },

  resolve(obj, path) {
    return path.split('.').reduce((o, k) => o && o[k], obj);
  },

  updateSelector() {
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = this.currentLang;
  },

  saveDefaults() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!el.hasAttribute('data-i18n-default')) {
        el.setAttribute('data-i18n-default', el.textContent);
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      if (!el.hasAttribute('data-i18n-html-default')) {
        el.setAttribute('data-i18n-html-default', el.innerHTML);
      }
    });
  }
};
