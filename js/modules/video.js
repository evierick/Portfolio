/* js/modules/video.js */

export function initVideos() {
  const videos = document.querySelectorAll('video.card-video');

  if (videos.length === 0) return;

  // Utiliza IntersectionObserver para alta performance e consumo eficiente
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        // Tenta reproduzir quando o elemento entra na área visível
        video.play().catch(error => {
          // Trata bloqueios de autoplay do navegador
          console.warn('[Video Player]: Autoplay bloqueado pelo navegador', error);
        });
      } else {
        // Pausa quando sai do ecrã para poupar processamento
        video.pause();
      }
    });
  }, {
    threshold: 0.25 // Inicia/pausa quando 25% do vídeo está visível
  });

  videos.forEach(video => observer.observe(video));
}