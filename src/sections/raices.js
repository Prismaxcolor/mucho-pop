/**
 * Nuestras raíces (brief 5.8) — la sección "respira": el reveal de texto
 * sigue siendo el más simple y lento del sitio (fade + rise, sin escala
 * ni rotación), pero el "stage" de la taza ahora es más rico: anillos
 * concéntricos tipo onda (inspirados en topology.vc) laten despacio detrás
 * de la taza, hay partículas de vidrio flotando alrededor, un brillo sigue
 * al cursor (brief 4.5: "cursor custom opcional en zonas 3D"), y el vapor
 * -el segundo live-draw SVG del sitio- ahora son 3 trazos, no 2.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';

gsap.registerPlugin(ScrollTrigger);

const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const SPECKS = [
  { color: 'cyan', size: 10, top: '8%', left: '4%', delay: '0s' },
  { color: 'pink', size: 14, top: '18%', left: '92%', delay: '1.2s' },
  { color: 'violet', size: 8, top: '78%', left: '88%', delay: '2.4s' },
  { color: 'sky', size: 12, top: '86%', left: '10%', delay: '0.6s' },
  { color: 'pink-light', size: 7, top: '48%', left: '96%', delay: '1.8s' },
];

function speckMarkup({ color, size, top, left, delay }) {
  return `<span class="raices__speck raices__speck--${color}" style="--size:${size}px; top:${top}; left:${left}; --delay:${delay}"></span>`;
}

export function renderRaices() {
  return `
    <section
      id="raices"
      class="raices section spotlight-surface"
      data-spotlight
      style="--spotlight-color: var(--mucho-cyan-light)"
      aria-label="Nuestras raíces"
    >
      <div class="container container--narrow raices__content">
        <div class="raices__stage" data-stage>
          <span class="raices__ripple" data-ripple aria-hidden="true"></span>
          <span class="raices__ripple" data-ripple aria-hidden="true"></span>
          <span class="raices__ripple" data-ripple aria-hidden="true"></span>
          <span class="raices__cursor-glow" data-cursor-glow aria-hidden="true"></span>

          ${SPECKS.map(speckMarkup).join('')}

          <div class="raices__cup" data-cup aria-hidden="true">
            <svg class="raices__mug-svg" viewBox="0 0 60 72" fill="none">
              <defs>
                <linearGradient id="raices-glass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.9)" />
                  <stop offset="55%" stop-color="var(--mucho-lilac)" />
                  <stop offset="100%" stop-color="var(--mucho-purple)" />
                </linearGradient>
                <linearGradient id="raices-chrome" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="var(--mucho-cyan-light)" />
                  <stop offset="100%" stop-color="var(--mucho-pink)" />
                </linearGradient>
              </defs>

              <path data-steam d="M15 30 C 6 25, 20 20, 14 12 C 9 6, 21 3, 17 -3" stroke="url(#raices-chrome)" stroke-width="1.3" stroke-linecap="round" opacity="0.6" />
              <path data-steam d="M28 30 C 20 24, 36 20, 28 12 C 21 6, 35 3, 27 -4" stroke="url(#raices-chrome)" stroke-width="1.3" stroke-linecap="round" opacity="0.7" />
              <path data-steam d="M41 30 C 34 25, 48 21, 40 13 C 34 8, 46 5, 39 -1" stroke="url(#raices-chrome)" stroke-width="1.3" stroke-linecap="round" opacity="0.6" />

              <ellipse cx="29" cy="68" rx="20" ry="2.8" fill="rgba(53,24,70,0.14)" />
              <path d="M43 36 q11 0 11 11 q0 11 -11 11" stroke="url(#raices-chrome)" stroke-width="3.5" stroke-linecap="round" />
              <rect x="12" y="30" width="34" height="34" rx="7" fill="url(#raices-glass)" stroke="rgba(255,255,255,0.7)" stroke-width="1" />
              <path d="M16 34 L 16 60" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-linecap="round" />
              <rect x="12" y="30" width="34" height="8" rx="4" fill="rgba(255,255,255,0.55)" />
            </svg>
          </div>
        </div>

        <h2 class="raices__title">Todo empezó con una taza.</h2>

        <div class="raices__paragraphs">
          <p class="raices__line" data-line>Mucho POP nació antes de ser una agencia.</p>
          <p class="raices__line" data-line>
            Nació en un momento casi doméstico: una taza sublimada sin maquinaria, sin estudio, sin
            recursos. Solo ingenio, creatividad y una fuente de calor improvisada.
          </p>
          <p class="raices__line" data-line>
            Ese momento reveló algo que hoy define todo lo que hacemos: no se necesita tenerlo todo
            para crear algo con impacto. Solo hace falta visión, criterio y una mente que no se rinda.
          </p>
          <p class="raices__line" data-line>
            El nombre surgió como una sátira al boom de marcas repetitivas y vacías. Un recordatorio de
            que el mercado puede llenarse de ruido, pero muy pocas propuestas realmente tienen algo que
            decir.
          </p>
          <p class="raices__line raices__closing" data-line>
            Mucho POP nació como un acto de rebeldía. Y sigue siéndolo.
          </p>
        </div>
      </div>
    </section>
  `;
}

export function initRaices() {
  const section = document.querySelector('#raices');
  if (!section) return;

  const stage = section.querySelector('[data-stage]');
  const cup = section.querySelector('[data-cup]');
  const steamPaths = section.querySelectorAll('[data-steam]');
  const lines = section.querySelectorAll('[data-line]');
  const cursorGlow = section.querySelector('[data-cursor-glow]');

  initCursorGlow(stage, cursorGlow);

  if (prefersReducedMotion()) return;

  gsap.fromTo(
    cup,
    { opacity: 0, y: 24, scale: 0.94 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 35%',
        scrub: true,
      },
      onComplete: () => startIdleFloat(cup.querySelector('svg')),
    }
  );

  steamPaths.forEach((path, i) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: `top ${75 - i * 8}%`,
        end: 'top 15%',
        scrub: true,
      },
    });
  });

  lines.forEach((line) => {
    gsap.fromTo(
      line,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 92%',
          end: 'top 55%',
          scrub: true,
        },
      }
    );
  });
}

/** Flotación ambiental suave una vez que la taza terminó de aparecer. */
function startIdleFloat(cup) {
  gsap.to(cup, {
    y: '-=8',
    rotate: 1.2,
    duration: 3.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/** Brillo que sigue al cursor dentro del stage — solo desktop, puntero fino. */
function initCursorGlow(stage, glow) {
  if (!stage || !glow || !isFinePointer || prefersReducedMotion()) return;

  const quickX = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' });
  const quickY = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' });

  stage.addEventListener('mouseenter', () => {
    gsap.to(glow, { opacity: 1, duration: 0.4 });
  });

  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    quickX(event.clientX - rect.left - rect.width / 2);
    quickY(event.clientY - rect.top - rect.height / 2);
  });

  stage.addEventListener('mouseleave', () => {
    gsap.to(glow, { opacity: 0, duration: 0.5 });
  });
}
