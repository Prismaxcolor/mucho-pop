/**
 * Parallax multicapa reutilizable (brief 4.1): ata elementos [data-parallax]
 * al scroll natural de una sección -sin pin-, cada uno a su propia
 * velocidad. Se usa en más de una sección para no reescribir esta lógica
 * cada vez.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initParallaxLayers(scope, { start = 'top bottom', end = 'bottom top' } = {}) {
  const layers = scope.querySelectorAll('[data-parallax]');

  layers.forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.05;
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: scope,
        start,
        end,
        scrub: true,
      },
    });
  });
}
