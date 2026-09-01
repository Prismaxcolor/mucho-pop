/**
 * Micro-interacción global: desplazamiento magnético leve en CTAs (brief 4.5).
 * Solo desktop (hover fino) y solo si el usuario no pidió reduced motion.
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from './scroll.js';

const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function initMagnetic(root = document, selector = '[data-magnetic]', strength = 0.35) {
  if (!isFinePointer || prefersReducedMotion()) return;

  root.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';

    const quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      quickX(relX * strength);
      quickY(relY * strength);
    });

    el.addEventListener('mouseleave', () => {
      quickX(0);
      quickY(0);
    });
  });
}
