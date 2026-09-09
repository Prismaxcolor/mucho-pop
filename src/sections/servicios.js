/**
 * Servicios (brief 5.4) — sticky vertical (GSAP ScrollTrigger pin) donde
 * las cards viven apiladas (position:absolute, unas sobre otras) y hacen
 * crossfade: la activa se desvanece unos px hacia la izquierda mientras
 * la siguiente entra desde la derecha. A diferencia de un slide de track
 * completo (mover todo el ancho por card), acá el recorrido de scroll
 * necesario es corto — la transición es rápida aunque el movimiento sea
 * chico. En mobile no hay pin: el track es scroll horizontal nativo con
 * snap.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getLenis } from '../core/scroll.js';
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
    text: 'Construimos identidades sólidas, coherentes y funcionales.',
    tags: ['Branding', 'Identidad visual', 'Diseño corporativo', 'Presentaciones', 'Contenido gráfico'],
  },
  {
    icon: 'megaphone',
    accent: '--mucho-pink-light',
    title: 'Digital Marketing Lab',
    text: 'Estrategia digital orientada a resultados reales.',
    tags: ['Marketing 360', 'Redes sociales', 'Campañas publicitarias', 'Embudos de conversión'],
  },
  {
    icon: 'infinity',
    accent: '--mucho-cyan-light',
    title: 'IA & Automation Systems',
    text: 'Automatización inteligente al servicio del negocio.',
    tags: ['CRM', 'Flujos automatizados', 'Bots', 'Analítica', 'Integraciones'],
  },
  {
    icon: 'camera',
    accent: '--mucho-sky',
    title: 'Creative Productions',
    text: 'Contenido audiovisual con intención estratégica.',
    tags: ['Fotografía', 'Video', 'Reels', 'Piezas visuales'],
  },
  {
    icon: 'printer',
    accent: '--mucho-purple-deep',
    title: 'POP Lab',
    text: 'Material POP y soluciones para punto de venta.',
    tags: ['Sublimación', 'Impresión', 'Bordado', 'Corte', 'Vinil'],
  },
];

const TOTAL = SERVICES.length;

function cardMarkup({ icon, accent, title, text, tags }, i) {
  return `
    <article class="servicios__card" data-card style="--accent: var(${accent})">
      <span class="servicios__card-glow" aria-hidden="true"></span>
      <span class="servicios__index" aria-hidden="true">0${i + 1}</span>
      <div class="servicios__card-body">
        <span class="servicios__icon">${ICONS[icon]}</span>
        <h3 class="servicios__card-title">${title}</h3>
        <p class="servicios__card-text">${text}</p>
        <ul class="servicios__tags">
          ${tags.map((tag) => `<li>${tag}</li>`).join('')}
        </ul>
      </div>
    </article>
  `;
}

function dotMarkup({ title }, i) {
  return `<button class="servicios__dot" type="button" data-dot aria-label="Ir a ${title}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`;
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
        <div class="servicios__pagination">
          <p class="servicios__counter" data-counter aria-hidden="true">
            <span data-counter-current>01</span><span class="servicios__counter-sep">/</span>0${TOTAL}
          </p>
          <div class="servicios__dots" data-dots aria-label="Servicios">
            ${SERVICES.map(dotMarkup).join('')}
          </div>
        </div>
        <p class="servicios__hint" data-hint>Seguí bajando →</p>
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
  const hint = section.querySelector('[data-hint]');
  const dots = Array.from(section.querySelectorAll('[data-dot]'));
  const counter = section.querySelector('[data-counter-current]');
  const cards = Array.from(section.querySelectorAll('[data-card]'));
  if (!pinEl || !track || cards.length === 0) return;

  const setActive = (index) => {
    dots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
  };

  const jumpTo = (index, distance, start) => {
    const targetY = start + (index / (TOTAL - 1)) * distance;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1 });
    } else {
      window.scrollTo({ top: targetY, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };

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

      // Cards apiladas: arranca solo la primera visible, el resto
      // "esperando" un poco corridas a la derecha.
      gsap.set(cards, { opacity: 0, xPercent: 14 });
      gsap.set(cards[0], { opacity: 1, xPercent: 0 });

      // Recorrido corto y fijo (no atado al ancho de la card): cada
      // transición pide una fracción de la altura de pantalla, no una
      // pantalla entera — así nunca "tarda" en llegar a la siguiente.
      const segmentLength = () => Math.max(window.innerHeight * 0.55, 380);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${(TOTAL - 1) * segmentLength()}`,
          scrub: 0.3,
          pin: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * (TOTAL - 1)) / (TOTAL - 1),
            duration: 0.3,
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (TOTAL - 1)));
            if (hint) hint.style.opacity = self.progress > 0.04 ? '0' : '1';
          },
        },
      });

      // Secuencial, no crossfade simultáneo: la card 1 termina de
      // desvanecerse (opacity 0) ANTES de que la 2 empiece a entrar, para
      // que nunca se vean las dos superpuestas ("traspapeladas") al mismo
      // tiempo. Cada transición completa ocupa 1 unidad del timeline, en
      // línea con los índices de snap (i / (TOTAL - 1)).
      cards.forEach((card, i) => {
        if (i === TOTAL - 1) return;
        const next = cards[i + 1];
        tl.to(card, { opacity: 0, xPercent: -14, duration: 0.45, ease: 'power1.in' }, i).to(
          next,
          { opacity: 1, xPercent: 0, duration: 0.45, ease: 'power1.out' },
          i + 0.55
        );
      });

      const onDotClick = (index) => {
        const st = tl.scrollTrigger;
        if (!st) return;
        jumpTo(index, st.end - st.start, st.start);
      };
      const clickHandlers = dots.map((dot, i) => {
        const handler = () => onDotClick(i);
        dot.addEventListener('click', handler);
        return handler;
      });

      return () => {
        dots.forEach((dot, i) => dot.removeEventListener('click', clickHandlers[i]));
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }
  );

  // Mobile/reduced-motion: el track es un carrusel nativo — los dots
  // reflejan qué card está centrada usando IntersectionObserver, sin
  // depender de GSAP.
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (window.matchMedia('(min-width: 861px)').matches && !prefersReducedMotion()) return;
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = cards.indexOf(visible.target);
      if (index !== -1) setActive(index);
    },
    { root: track, threshold: [0.5, 0.75, 1] }
  );
  cards.forEach((card) => observer.observe(card));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (window.matchMedia('(min-width: 861px)').matches && !prefersReducedMotion()) return;
      cards[i]?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}
