/**
 * Servicios (brief 5.4) — scroll horizontal dentro de un contenedor
 * sticky vertical (GSAP ScrollTrigger pin clásico). A diferencia del hero,
 * acá el pin SÍ es la técnica correcta: la distancia pineada se calibra
 * exactamente al ancho real del track (no un porcentaje arbitrario), así
 * que nunca se siente más largo de lo que el contenido justifica. En
 * mobile no hay pin: el track es scroll horizontal nativo con snap.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initTilt } from '../core/tilt.js';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/></svg>`,
  megaphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h3l6 4V6l-6 4H3z"/><path d="M14 9a4 4 0 0 1 0 6"/><path d="M17 6a8 8 0 0 1 0 12"/></svg>`,
  infinity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9a3 3 0 1 0 0 6c2 0 3-1.5 5-3s3-3 5-3a3 3 0 1 1 0 6c-2 0-3-1.5-5-3s-3-3-5-3z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13.5" r="3.2"/></svg>`,
  printer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1.5"/><path d="M6 17v4h12v-4"/></svg>`,
};

const SERVICES = [
  {
    icon: 'layers',
    accent: '--mucho-violet',
    title: 'Design & Branding',
    text: 'Construimos identidades sólidas, coherentes y funcionales. Branding, identidad visual, diseño corporativo, presentaciones y contenido gráfico.',
  },
  {
    icon: 'megaphone',
    accent: '--mucho-pink-light',
    title: 'Digital Marketing Lab',
    text: 'Estrategia digital orientada a resultados reales. Marketing 360, redes sociales, campañas publicitarias, embudos de conversión.',
  },
  {
    icon: 'infinity',
    accent: '--mucho-cyan-light',
    title: 'IA & Automation Systems',
    text: 'Automatización inteligente al servicio del negocio. CRM, flujos automatizados, bots, analítica e integraciones.',
  },
  {
    icon: 'camera',
    accent: '--mucho-sky',
    title: 'Creative Productions',
    text: 'Contenido audiovisual con intención estratégica. Fotografía, video, reels y piezas visuales.',
  },
  {
    icon: 'printer',
    accent: '--mucho-purple-deep',
    title: 'POP Lab',
    text: 'Material POP y soluciones para punto de venta. Incluye: Sublimación, Impresión, Bordado, Corte, Vinil.',
  },
];

function cardMarkup({ icon, accent, title, text }, i) {
  return `
    <article class="servicios__card" data-card style="--accent: var(${accent})">
      <span class="servicios__index">0${i + 1}</span>
      <span class="servicios__icon">${ICONS[icon]}</span>
      <h3 class="servicios__card-title">${title}</h3>
      <p class="servicios__card-text">${text}</p>
    </article>
  `;
}

export function renderServicios() {
  return `
    <section id="servicios" class="servicios" aria-label="Servicios">
      <div class="servicios__intro container">
        <p class="chip"><span class="chip-dot"></span>Servicios</p>
        <h2 class="servicios__title">
          Soluciones integradas en un solo proveedor. Todo conectado, todo con un objetivo claro.
        </h2>
      </div>

      <div class="servicios__pin" data-pin>
        <div class="servicios__track" data-track>
          ${SERVICES.map(cardMarkup).join('')}
        </div>
        <div class="servicios__progress" data-progress aria-hidden="true">
          <span class="servicios__progress-fill" data-progress-fill></span>
        </div>
        <p class="servicios__hint" data-hint>Seguí bajando para ver los 5 servicios →</p>
      </div>
    </section>
  `;
}

export function initServicios() {
  const section = document.querySelector('#servicios');
  if (!section) return;

  initTilt(section);

  const pinEl = section.querySelector('[data-pin]');
  const track = section.querySelector('[data-track]');
  const fill = section.querySelector('[data-progress-fill]');
  const hint = section.querySelector('[data-hint]');
  if (!pinEl || !track) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 861px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      // Fuera de este rango el track es scroll horizontal nativo (CSS),
      // sin pin — más simple y sin riesgo de "scroll pegado" en mobile.
      if (!isDesktop || reduceMotion) return () => {};

      const getScrollDistance = () => Math.max(track.scrollWidth - pinEl.clientWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill) fill.style.transform = `scaleX(${self.progress})`;
            if (hint) hint.style.opacity = self.progress > 0.08 ? '0' : '1';
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  );
}
