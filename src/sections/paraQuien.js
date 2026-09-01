/**
 * Para quién somos (brief 5.6) — bento grid asimétrico (tamaños desiguales),
 * deliberadamente distinto del grid uniforme de Propuesta de valor (5.3).
 * Firma de movimiento propia: una cortina de color (gradiente con nombre)
 * que se abre revelando la tarjeta, en vez de escala/rotación.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initTilt } from '../core/tilt.js';

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    tag: 'Empresas medianas',
    text: 'que necesitan un aliado estratégico, no otro proveedor.',
    gradient: '--gradient-signature',
    size: 'lg',
    origin: 'left',
  },
  {
    tag: 'Marcas en crecimiento',
    text: 'que quieren orden, estructura y resultados sostenibles.',
    gradient: '--gradient-creative',
    size: 'wide',
    origin: 'right',
  },
  {
    tag: 'Agencias extranjeras',
    text: 'que buscan un partner confiable para outsourcing y white label.',
    gradient: '--gradient-neon',
    size: 'sm',
    origin: 'left',
  },
  {
    tag: 'Retail y POP',
    text: 'que necesitan producción constante, rápida y de calidad.',
    gradient: '--gradient-premium',
    size: 'sm',
    origin: 'right',
  },
];

function blockMarkup({ tag, text, gradient, size, origin }, i) {
  return `
    <article class="para-quien__card para-quien__card--${size}" data-card data-wipe-origin="${origin}" style="--accent-gradient: var(${gradient})">
      <span class="para-quien__wipe" data-wipe></span>
      <div class="para-quien__body">
        <p class="para-quien__tag">${tag}</p>
        <p class="para-quien__text">${text}</p>
      </div>
    </article>
  `;
}

export function renderParaQuien() {
  return `
    <section
      id="para-quien"
      class="para-quien section spotlight-surface"
      data-spotlight
      style="--spotlight-color: var(--mucho-pink-light)"
      aria-label="Para quién somos"
    >
      <div class="container para-quien__content">
        <div class="para-quien__intro">
          <h2 class="para-quien__title">Trabajamos con marcas que quieren crecer con criterio.</h2>
          <p class="para-quien__lead">No buscamos volumen. Buscamos proyectos donde podamos hacer una diferencia real.</p>
        </div>

        <div class="para-quien__grid">
          ${BLOCKS.map(blockMarkup).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initParaQuien() {
  const section = document.querySelector('#para-quien');
  if (!section) return;

  initTilt(section);

  const cards = section.querySelectorAll('[data-card]');

  if (prefersReducedMotion()) {
    section.querySelectorAll('[data-wipe]').forEach((wipe) => {
      gsap.set(wipe, { scaleX: 0 });
    });
    return;
  }

  cards.forEach((card) => {
    const wipe = card.querySelector('[data-wipe]');
    const origin = card.dataset.wipeOrigin === 'right' ? 'right center' : 'left center';

    gsap.fromTo(
      wipe,
      { scaleX: 1, transformOrigin: origin },
      {
        scaleX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  });
}
