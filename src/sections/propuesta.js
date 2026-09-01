/**
 * Propuesta de valor (brief 5.3) — grid de 4 diferenciadores. Riesgo
 * explícito del brief: "4 cards idénticas" es EL patrón genérico a evitar.
 * Se compensa con tratamiento tipográfico propio (tachado → texto fuerte,
 * no icono+título+párrafo), acento de color distinto por tarjeta, tilt 3D
 * al mouse y un tubo cromado cruzando en diagonal por detrás del grid.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initParallaxLayers } from '../core/parallax.js';
import { initTilt } from '../core/tilt.js';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  flow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2.2"/><circle cx="12" cy="7" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M6.6 16.2 10.4 9M17.4 16.2 13.6 9"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 5.5 14h5L10 21l8.5-11.5h-5z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.2 12.6l2.6 2.6L16 9.6"/></svg>`,
};

const CARDS = [
  { icon: 'target', no: 'No solo diseñamos', yes: 'Pensamos el negocio', accent: '--mucho-purple' },
  { icon: 'flow', no: 'No solo ejecutamos', yes: 'Estructuramos procesos', accent: '--mucho-cyan' },
  { icon: 'spark', no: 'No solo automatizamos', yes: 'Hacemos la tecnología útil', accent: '--mucho-pink' },
  { icon: 'check', no: 'No improvisamos', yes: 'Planificamos y cumplimos', accent: '--mucho-violet' },
];

function cardMarkup({ icon, no, yes, accent }, i) {
  return `
    <article class="propuesta__card" data-card data-tilt style="--accent: var(${accent})">
      <span class="propuesta__icon">${ICONS[icon]}</span>
      <p class="propuesta__card-no">${no}</p>
      <p class="propuesta__card-yes">${yes}</p>
    </article>
  `;
}

export function renderPropuesta() {
  return `
    <section
      id="propuesta"
      class="propuesta section spotlight-surface"
      data-spotlight
      style="--spotlight-color: var(--mucho-cyan)"
      aria-label="Propuesta de valor"
    >
      <span class="propuesta__glow" aria-hidden="true" data-parallax="0.05"></span>
      <div class="propuesta__floater" aria-hidden="true" data-parallax="0.11"></div>

      <div class="container propuesta__content">
        <div class="propuesta__intro">
          <h2 class="propuesta__title">No somos una agencia más.</h2>
          <p class="propuesta__lead">
            En Mucho POP combinamos creatividad, pensamiento estratégico y gestión organizacional. Esa
            mezcla es lo que nos diferencia.
          </p>
        </div>

        <div class="propuesta__grid">
          ${CARDS.map(cardMarkup).join('')}
        </div>

        <p class="propuesta__closing">
          Somos creativos. Pero también somos administradores y estrategas. Y esa combinación cambia todo.
        </p>
      </div>
    </section>
  `;
}

export function initPropuesta() {
  const section = document.querySelector('#propuesta');
  if (!section) return;

  initParallaxLayers(section);
  initTilt(section);

  if (prefersReducedMotion()) return;

  const cards = section.querySelectorAll('[data-card]');
  gsap.fromTo(
    cards,
    { opacity: 0, y: 44, scale: 0.9, rotateX: 10, rotate: (i) => (i % 2 === 0 ? -3 : 3) },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotate: 0,
      ease: 'none',
      stagger: 0.15,
      scrollTrigger: {
        trigger: section.querySelector('.propuesta__grid'),
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    section.querySelector('.propuesta__intro'),
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section.querySelector('.propuesta__intro'),
        start: 'top 90%',
        end: 'top 60%',
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    section.querySelector('.propuesta__closing'),
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section.querySelector('.propuesta__closing'),
        start: 'top 92%',
        end: 'top 65%',
        scrub: true,
      },
    }
  );
}
