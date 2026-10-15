/* js/modules/i18n.js */
import { sanitizeHTML, getSafeStorage } from '../security/sanitize.js';

const ALLOWED_LANGS = ['pt', 'en'];
const DEFAULT_LANG = 'pt';

let currentLang = getSafeStorage('portfolio_lang', ALLOWED_LANGS, DEFAULT_LANG);

export async function setLanguage(lang) {
  if (!ALLOWED_LANGS.includes(lang)) return;

  try {
    const response = await fetch(`./lang/${lang}.json`);
    if (!response.ok) throw new Error('Falha ao carregar o arquivo de idioma.');

    const translations = await response.json();

    // Aplica as traduções de forma segura em todos os elementos marcados
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        // Usa innerHTML acompanhado da higienização para converter entidades HTML como &amp; no caractere &
        element.innerHTML = sanitizeHTML(translations[key]);
      }
    });

    // Atualiza os atributos da tag html e o estado dos botões
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    localStorage.setItem('portfolio_lang', lang);
    currentLang = lang;

    updateLanguageButtons(lang);
  } catch (error) {
    console.error('[i18n Security Error]:', error);
  }
}

function updateLanguageButtons(activeLang) {
  const ptBtn = document.getElementById('lang-pt-btn');
  const enBtn = document.getElementById('lang-en-btn');

  if (ptBtn && enBtn) {
    if (activeLang === 'pt') {
      ptBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      enBtn.classList.add('active');
      ptBtn.classList.remove('active');
    }
  }
}

export function initI18n() {
  setLanguage(currentLang);

  // Event Listeners para os botões do header
  const ptBtn = document.getElementById('lang-pt-btn');
  const enBtn = document.getElementById('lang-en-btn');

  if (ptBtn) {
    ptBtn.addEventListener('click', () => setLanguage('pt'));
  }
  if (enBtn) {
    enBtn.addEventListener('click', () => setLanguage('en'));
  }
}