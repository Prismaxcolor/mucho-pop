/**
 * Núcleo de scroll — Lenis (smooth scroll global) sincronizado con
 * GSAP ScrollTrigger. Respeta prefers-reduced-motion: si el usuario lo pide,
 * no se instancia Lenis y el scroll queda nativo (brief 2 y 7).
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initScroll() {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduced-motion');
    return null;
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

/**
 * Sora carga async (font-display: swap). Si el texto reflowea después de
 * que ScrollTrigger ya midió posiciones (con la fuente de fallback), los
 * triggers quedan desalineados respecto al layout real. Un refresh cuando
 * la fuente está lista corrige eso sin esperar a un resize manual.
 */
export function refreshOnFontsReady() {
  if (!document.fonts?.ready) return;
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

/** Scroll suave a un ancla, con fallback nativo si Lenis no está activo. */
export function scrollToTarget(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, ...options });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}
