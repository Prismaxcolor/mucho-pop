/**
 * Spotlight de cursor — secciones de fondo claro "dan color" al pasar el
 * mouse (feedback explícito del cliente). Cada sección define su propio
 * --spotlight-color inline; este módulo solo mueve la posición.
 * No se gatea por prefers-reduced-motion: es una respuesta directa al
 * puntero del usuario (color, no parallax/autoplay), no un disparador
 * vestibular.
 */
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function initSpotlight(root = document, selector = '[data-spotlight]') {
  if (!isFinePointer) return;

  root.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.spotlightBound) return;
    el.dataset.spotlightBound = 'true';

    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });

    el.addEventListener('mouseenter', () => el.classList.add('is-spotlit'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-spotlit'));
  });
}
