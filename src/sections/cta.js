/**
 * CTA final (brief 5.9) — cierre de alto impacto sobre gradiente Pop.
 * Las esferas ahora se comportan como burbujas efervescentes de soda:
 * transparentes, chicas, muchas, subiendo despacio sin llamar la atención
 * (feedback explícito del cliente). Se mantienen unas pocas esferas grandes
 * de acento -las que riman con las del Hero- entre la nube de burbujas.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initMagnetic } from '../core/magnetic.js';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_SPHERES = [
  { color: 'pink', size: 56, top: '14%', left: '10%' },
  { color: 'cyan', size: 34, top: '70%', left: '88%' },
  { color: 'violet', size: 30, top: '82%', left: '46%' },
];

const BUBBLE_COUNT = 48;

function accentMarkup({ color, size, top, left }, i) {
  return `<span class="cta__sphere cta__sphere--${color}" style="--size:${size}px; top:${top}; left:${left}; --delay:${i * 0.6}s" data-cta-sphere></span>`;
}

/** Burbujas efervescentes: tamaño, posición, velocidad y recorrido al azar
 *  para que la nube se vea orgánica, no repetitiva en loop visible. */
function bubbleMarkup() {
  const size = (Math.random() * 8 + 3).toFixed(1);
  const left = (Math.random() * 100).toFixed(1);
  const bottom = (Math.random() * 15).toFixed(1);
  const rise = -(Math.random() * 320 + 260).toFixed(0);
  const drift = (Math.random() * 40 - 20).toFixed(0);
  const duration = (Math.random() * 6 + 5).toFixed(1);
  const delay = -(Math.random() * duration).toFixed(1);
  const peak = (Math.random() * 0.3 + 0.25).toFixed(2);

  return `<span
    class="cta__bubble"
    style="
      --size:${size}px; left:${left}%; bottom:${bottom}%;
      --rise:${rise}px; --drift:${drift}px;
      --duration:${duration}s; --delay:${delay}s; --peak:${peak};
    "
  ></span>`;
}

export function renderCta() {
  const bubbles = Array.from({ length: BUBBLE_COUNT }, bubbleMarkup).join('');

  return `
    <section id="contacto" class="cta" aria-label="Hablemos de tu proyecto">
      <div class="cta__bubbles" aria-hidden="true">${bubbles}</div>

      <div class="cta__spheres" aria-hidden="true">
        ${ACCENT_SPHERES.map(accentMarkup).join('')}
      </div>

      <div class="container container--narrow cta__content">
        <h2 class="cta__title">
          No todas las marcas necesitan más ideas. Muchas necesitan dirección.
        </h2>
        <p class="cta__text">
          Mucho POP es para quienes entienden que crecer no es improvisar, sino pensar, estructurar y
          ejecutar con intención.
        </p>
        <p class="cta__text cta__text--emphasis">Si tu marca está lista para dar ese paso, conversemos.</p>

        <a class="btn btn--cta" data-magnetic href="mailto:hola@muchopop.com">Hablemos de tu proyecto</a>
        <p class="cta__subtext">La primera asesoría es gratuita.</p>
      </div>
    </section>
  `;
}

export function initCta() {
  const section = document.querySelector('#contacto');
  if (!section) return;

  initMagnetic(section);

  if (prefersReducedMotion()) return;

  const spheres = section.querySelectorAll('[data-cta-sphere]');
  gsap.fromTo(
    spheres,
    { opacity: 0, scale: 0.3 },
    {
      opacity: 1,
      scale: 1,
      stagger: 0.12,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 40%',
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    section.querySelector('.cta__bubbles'),
    { opacity: 0 },
    {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        end: 'top 60%',
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    section.querySelector('.cta__content'),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 50%',
        scrub: true,
      },
    }
  );
}
