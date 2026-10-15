/* js/modules/theme.js */
import { getSafeStorage } from '../security/sanitize.js';

const ALLOWED_THEMES = ['light', 'dark'];
const DEFAULT_THEME = 'light';

export function initTheme() {
  // Recupera o tema salvo no localStorage com validação de segurança
  const savedTheme = getSafeStorage('portfolio_theme', ALLOWED_THEMES, DEFAULT_THEME);
  applyTheme(savedTheme);

  // Escuta o clique no botão de alternância de tema do header
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
      const nextTheme = current === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }
}

function applyTheme(theme) {
  // Define o atributo no elemento HTML raiz
  document.documentElement.setAttribute('data-theme', theme);
  // Persiste a escolha do utilizador de forma segura
  localStorage.setItem('portfolio_theme', theme);
}