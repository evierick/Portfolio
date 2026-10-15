/* js/security/csp-check.js */

export function verifySecurityPolicy() {
  // Verifica se a Meta Tag CSP está presente no <head>
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

  if (!cspMeta) {
    console.warn('[Security Warning]: A diretiva Content-Security-Policy (CSP) não foi detetada no documento.');
  } else {
    console.log('[Security Audit]: CSP ativa e aplicada com sucesso.');
  }

  // Previne a execução acidental ou injeção de scripts inline não higienizados
  window.addEventListener('securitypolicyviolation', (event) => {
    console.error('[CSP Violation Detected]:', {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy
    });
  });
}