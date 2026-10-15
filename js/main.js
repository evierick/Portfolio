/* js/main.js */
import { initTheme } from './modules/theme.js';
import { initI18n } from './modules/i18n.js';
import { initVideos } from './modules/video.js';
import { verifySecurityPolicy } from './security/csp-check.js';

document.addEventListener('DOMContentLoaded', () => {
  // Executa a auditoria de segurança do CSP
  verifySecurityPolicy();

  // Inicializa a gestão do tema (Claro/Escuro)
  initTheme();

  // Inicializa o sistema de tradução/internacionalização (PT/EN)
  initI18n();

  // Inicializa o controlo otimizado dos vídeos
  initVideos();
});