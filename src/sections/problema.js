/**
 * El problema (brief 5.2) — texto editorial que se revela línea a línea,
 * atado al progreso de scroll (no a una duración fija): cada línea escala,
 * rota levemente y gana opacidad mientras cruza una franja del viewport.
 * Firma de movimiento deliberadamente distinta a la del Hero (nada de 3D,
 * nada de pin) para evitar que todo el sitio se mueva "igual".
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initParallaxLayers } from '../core/parallax.js';

gsap.registerPlugin(ScrollTrigger);

export function renderProblema() {
  return `
    <section
      id="problema"
      class="problema section spotlight-surface"
      data-spotlight
      style="--spotlight-color: var(--mucho-pink)"
      aria-label="El problema"
    >
      <span class="problema__glow problema__glow--a" aria-hidden="true" data-parallax="0.09"></span>
      <span class="problema__glow problema__glow--b" aria-hidden="true" data-parallax="0.04"></span>

      <div class="container container--narrow problema__content">
        <p class="problema__line" data-line>
          Muchas empresas invierten en diseño y marketing constantemente. Pero algo no termina de funcionar.
        </p>

        <p class="problema__line problema__line--beats" data-line data-beats-line>
          <span class="problema__beat problema__beat--purple">Falta dirección.</span>
          <span class="problema__beat problema__beat--cyan">Falta coherencia.</span>
          <span class="problema__beat problema__beat--pink">Falta orden.</span>
        </p>

        <p class="problema__line" data-line>
          Campañas desconectadas. Material que se ve bien pero no vende. Múltiples proveedores sin una
          estrategia que los una.
        </p>

        <p class="problema__line" data-line>
          El problema casi nunca es la creatividad. Es la falta de estructura detrás.
        </p>

        <div class="problema__closing" data-closing>
          <p class="problema__closing-card glass-panel">
            <span class="problema__closing-text">Mucho POP existe para resolver exactamente eso.</span>
          </p>
        </div>
      </div>
    </section>
  `;
}

export function initProblema() {
  const section = document.querySelector('#problema');
  if (!section) return;

  initParallaxLayers(section);

  if (prefersReducedMotion()) return;

  const lines = section.querySelectorAll('[data-line]:not([data-beats-line])');
  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 36, scale: 0.94, rotate: i % 2 === 0 ? -1.1 : 1.1 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 88%',
          end: 'top 48%',
          scrub: true,
        },
      }
    );
  });

  const beatsLine = section.querySelector('[data-beats-line]');
  if (beatsLine) {
    const beats = beatsLine.querySelectorAll('.problema__beat');
    gsap.fromTo(
      beats,
      { opacity: 0, y: 24, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: beatsLine,
          start: 'top 88%',
          end: 'top 40%',
          scrub: true,
        },
      }
    );
  }

  const closing = section.querySelector('[data-closing]');
  if (closing) {
    gsap.fromTo(
      closing,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: closing,
          start: 'top 90%',
          end: 'top 55%',
          scrub: true,
        },
      }
    );
  }
}
