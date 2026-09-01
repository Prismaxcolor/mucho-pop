/**
 * Tilt 3D sutil en tarjetas al mover el mouse (brief 4.5). Desktop only
 * (puntero fino) y respeta prefers-reduced-motion. Reutilizable: cualquier
 * sección con tarjetas (`data-tilt`) puede sumarse sin reescribir esto.
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from './scroll.js';

const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function initTilt(root = document, selector = '[data-tilt]', maxDeg = 7) {
  if (!isFinePointer || prefersReducedMotion()) return;

  root.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = 'true';

    const quickRotateX = gsap.quickTo(el, 'rotateX', { duration: 0.45, ease: 'power3.out' });
    const quickRotateY = gsap.quickTo(el, 'rotateY', { duration: 0.45, ease: 'power3.out' });

    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      quickRotateY(relX * maxDeg);
      quickRotateX(relY * -maxDeg);
    });

    el.addEventListener('mouseleave', () => {
      quickRotateX(0);
      quickRotateY(0);
    });
  });
}
