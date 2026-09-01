/**
 * Cómo trabajamos (brief 5.5) — el punto elegido por el brief para el
 * efecto "live-draw SVG": una línea de proceso se dibuja progresivamente
 * (stroke-dashoffset atado a scroll, sin loop ni autoplay) y cada paso se
 * "enciende" cuando la línea lo alcanza. Sin plugin DrawSVG (de pago): se
 * logra el mismo efecto con la técnica estándar de dasharray/dashoffset.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initParallaxLayers } from '../core/parallax.js';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: 'Entendemos el negocio',
    text: 'Analizamos el contexto, los objetivos y el problema real antes de proponer cualquier cosa.',
    accent: '--mucho-purple',
  },
  {
    title: 'Definimos la estrategia',
    text: 'Concepto, mensaje, canales y prioridades claras. Sin improvisar.',
    accent: '--mucho-cyan',
  },
  {
    title: 'Diseñamos y producimos',
    text: 'Creatividad aplicada, estética con intención y ejecución cuidada.',
    accent: '--mucho-pink',
  },
  {
    title: 'Automatizamos y optimizamos',
    text: 'Sistemas que hacen que el trabajo fluya, escale y rinda.',
    accent: '--mucho-violet',
  },
  {
    title: 'Medimos y mejoramos',
    text: 'Ajustamos, optimizamos y acompañamos el crecimiento en el tiempo.',
    accent: '--mucho-cyan-light',
  },
];

function stepMarkup({ title, text, accent }, i) {
  return `
    <li class="metodo__step" data-step style="--accent: var(${accent})">
      <span class="metodo__step-number">0${i + 1}</span>
      <div class="metodo__step-body">
        <h3 class="metodo__step-title">${title}</h3>
        <p class="metodo__step-text">${text}</p>
      </div>
    </li>
  `;
}

export function renderMetodo() {
  return `
    <section
      id="metodo"
      class="metodo section spotlight-surface"
      data-spotlight
      style="--spotlight-color: var(--mucho-violet)"
      aria-label="Cómo trabajamos"
    >
      <span class="metodo__glow" aria-hidden="true" data-parallax="0.06"></span>

      <div class="container container--narrow metodo__content">
        <div class="metodo__intro">
          <h2 class="metodo__title">Con método. Con criterio. Sin vueltas innecesarias.</h2>
          <p class="metodo__lead">Cada proyecto arranca con claridad y termina con resultados medibles. Así trabajamos.</p>
        </div>

        <div class="metodo__timeline" data-timeline>
          <svg class="metodo__line" data-timeline-line-svg aria-hidden="true">
            <defs>
              <linearGradient
                id="metodo-line-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0%"
                x2="0"
                y2="100%"
              >
                <stop offset="0%" stop-color="var(--mucho-cyan)" />
                <stop offset="50%" stop-color="var(--mucho-purple)" />
                <stop offset="100%" stop-color="var(--mucho-pink)" />
              </linearGradient>
            </defs>
            <line data-timeline-line x1="2" y1="0" x2="2" y2="0" />
          </svg>

          <ol class="metodo__steps" data-steps>
            ${STEPS.map(stepMarkup).join('')}
          </ol>
        </div>
      </div>
    </section>
  `;
}

export function initMetodo() {
  const section = document.querySelector('#metodo');
  if (!section) return;

  initParallaxLayers(section);

  const timelineEl = section.querySelector('[data-timeline]');
  const svg = section.querySelector('[data-timeline-line-svg]');
  const line = section.querySelector('[data-timeline-line]');
  const stepsEl = section.querySelector('[data-steps]');
  const steps = section.querySelectorAll('[data-step]');
  if (!svg || !line || !stepsEl) return;

  const measure = () => {
    const height = stepsEl.offsetHeight;
    svg.setAttribute('viewBox', `0 0 4 ${height}`);
    svg.setAttribute('height', height);
    line.setAttribute('y2', height);
    return line.getTotalLength();
  };

  if (prefersReducedMotion()) {
    measure();
    line.style.strokeDashoffset = '0';
    steps.forEach((step) => step.classList.add('is-active'));
    return;
  }

  let length = measure();
  line.style.strokeDasharray = String(length);
  line.style.strokeDashoffset = String(length);

  const trigger = ScrollTrigger.create({
    trigger: timelineEl,
    start: 'top 72%',
    end: 'bottom 58%',
    scrub: true,
    onUpdate: (self) => {
      line.style.strokeDashoffset = String(length * (1 - self.progress));
      steps.forEach((step, i) => {
        const threshold = i / steps.length + 0.02;
        step.classList.toggle('is-active', self.progress >= threshold);
      });
    },
  });

  const onResize = () => {
    length = measure();
    line.style.strokeDasharray = String(length);
    trigger.refresh();
  };
  window.addEventListener('resize', onResize);
}
