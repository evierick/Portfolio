/* js/security/sanitize.js */

/**
 * Escapa caracteres especiais de HTML para prevenir injeção XSS.
 * @param {string} str - A string de texto a ser higienizada.
 * @returns {string} String com entidades HTML escapadas.
 */
export function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Recupera e valida um valor do localStorage contra uma lista de permissões (allowlist).
 * @param {string} key - A chave do localStorage.
 * @param {Array<string>} allowedValues - Valores permitidos.
 * @param {string} fallbackValue - Valor padrão caso o item seja inválido/ausente.
 * @returns {string} O valor seguro e validado.
 */
export function getSafeStorage(key, allowedValues, fallbackValue) {
  try {
    const item = localStorage.getItem(key);
    if (item && allowedValues.includes(item)) {
      return item;
    }
  } catch (error) {
    console.warn(`[Security Warning]: Erro ao acessar o localStorage para a chave "${key}".`, error);
  }
  return fallbackValue;
}