/**
 * Hero — caja/vessel de vidrio y cromo sobre pedestal, que rota y se abre
 * ligada al scroll (desktop) y libera esferas de los 3 colores de marca
 * como remate hacia la sección siguiente (brief 5.1).
 *
 * render(): HTML semántico, portable a un partial de WordPress.
 * init(): comportamiento GSAP, scopeado a este módulo.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../core/scroll.js';
import { initMagnetic } from '../core/magnetic.js';

gsap.registerPlugin(ScrollTrigger);

const SPHERES_BACK = [
  { color: 'purple', size: 46, x: -22, y: 58, z: -80, rot: -35 },
  { color: 'sky', size: 30, x: 30, y: 78, z: -60, rot: 20 },
  { color: 'violet', size: 36, x: -38, y: 92, z: -40, rot: 60 },
];

const SPHERES_FRONT = [
  { color: 'pink', size: 52, x: 18, y: 62, z: 40, rot: 25 },
  { color: 'cyan', size: 34, x: -14, y: 84, z: 60, rot: -45 },
  { color: 'pink-light', size: 26, x: 40, y: 96, z: 30, rot: 15 },
  { color: 'cyan-light', size: 22, x: 4, y: 104, z: 50, rot: -20 },
];

function sphereMarkup(sphere, index, group) {
  return `<span
    class="hero__sphere hero__sphere--${sphere.color}"
    data-sphere
    data-group="${group}"
    data-x="${sphere.x}"
    data-y="${sphere.y}"
    data-z="${sphere.z}"
    data-rot="${sphere.rot}"
    style="--sphere-size:${sphere.size}px;"
    aria-hidden="true"
  ></span>`;
}

export function renderHero() {
  const back = SPHERES_BACK.map((s, i) => sphereMarkup(s, i, 'back')).join('');
  const front = SPHERES_FRONT.map((s, i) => sphereMarkup(s, i, 'front')).join('');

  return `
    <section id="hero" class="hero" aria-label="Presentación">
      <div class="hero__atmosphere" aria-hidden="true">
        <span class="hero__glow hero__glow--cyan" data-parallax="0.06"></span>
        <span class="hero__glow hero__glow--pink" data-parallax="0.1"></span>
      </div>

      <div class="hero__content container">
        <svg class="hero__intro-logo" viewBox="0 0 460 90" aria-label="Mucho POP" role="img">
          <defs>
            <linearGradient id="hero-logo-pop-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--mucho-purple)" />
              <stop offset="100%" stop-color="var(--mucho-pink)" />
            </linearGradient>
          </defs>
          <text data-intro-fill x="4" y="66" class="hero__intro-logo-text hero__intro-logo-text--mucho">mucho</text>
          <text
            data-intro-fill
            x="252"
            y="66"
            class="hero__intro-logo-text hero__intro-logo-text--pop"
            fill="url(#hero-logo-pop-fill)"
          >
            POP
          </text>
        </svg>

        <p class="chip hero__kicker"><span class="chip-dot"></span>Diseño · Estrategia · Ejecución</p>

        <h1 class="hero__headline">
          Ideas que se convierten en <span class="hero__headline-accent hero__headline-accent--signature">sistemas</span>.
          <br />
          Creatividad que genera <span class="hero__headline-accent hero__headline-accent--creative">resultados</span>.
        </h1>

        <p class="hero__subheadline">
          Ayudamos a empresas a crecer con diseño, estrategia y ejecución clara. Sin improvisación. Sin ruido.
        </p>

        <div class="hero__actions">
          <a class="btn btn--primary" data-magnetic href="#contacto">Hablemos de tu proyecto</a>
          <a class="btn btn--secondary" data-magnetic href="#metodo">Conoce cómo trabajamos</a>
        </div>
      </div>

      <div class="hero__scene" data-scene aria-hidden="true">
        <div class="hero__spheres hero__spheres--back" data-sphere-group="back">
          ${back}
        </div>

        <div class="hero__stage">
          <div class="hero__pedestal" data-parallax="0.04">
            <span class="hero__pedestal-stem"></span>
          </div>
          <div class="hero__vessel" data-vessel>
            <div class="hero__vessel-body">
              <span class="hero__vessel-sheen"></span>
              <span class="hero__vessel-glow" data-vessel-glow></span>
            </div>
            <div class="hero__vessel-lid" data-vessel-lid></div>
          </div>
        </div>

        <div class="hero__spheres hero__spheres--front" data-sphere-group="front">
          ${front}
        </div>
      </div>

      <div class="hero__scroll-cue">
        <span class="hero__scroll-line" data-scroll-line></span>
        Scroll
      </div>
    </section>
  `;
}

export function initHero() {
  const section = document.querySelector('#hero');
  if (!section) return;

  initMagnetic(section);
  initIntroLogo(section);

  const vessel = section.querySelector('[data-vessel]');
  const lid = section.querySelector('[data-vessel-lid]');
  const glow = section.querySelector('[data-vessel-glow]');
  const spheres = Array.from(section.querySelectorAll('[data-sphere]'));
  const backSpheres = spheres.filter((s) => s.dataset.group === 'back');
  const frontSpheres = spheres.filter((s) => s.dataset.group === 'front');
  const glows = Array.from(section.querySelectorAll('[data-parallax]'));
  const scrollLine = section.querySelector('[data-scroll-line]');

  if (!vessel || !lid || !glow) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 861px)',
      isMobile: '(max-width: 860px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop, isMobile, reduceMotion } = context.conditions;

      if (reduceMotion) {
        setFinalState({ vessel, lid, glow, spheres });
        return () => {};
      }

      if (isDesktop) {
        return buildDesktopTimeline({ section, vessel, lid, glow, backSpheres, frontSpheres, glows, scrollLine });
      }

      if (isMobile) {
        // Menos elementos simultáneos en pantalla que en desktop (brief 5.1).
        const mobileSpheres = [backSpheres[0], frontSpheres[0], backSpheres[1], frontSpheres[2]].filter(Boolean);
        return buildMobileTimeline({ section, vessel, lid, glow, spheres: mobileSpheres });
      }

      return () => {};
    }
  );
}

/**
 * Logo de apertura: arranca con el trazo negro visible y relleno
 * transparente, y se va rellenando de color (inspirado en meminteriores.com).
 * Es lo primero que se ve en la página, antes que el resto del texto —
 * por eso corre una sola vez al cargar, no ligado a scroll.
 */
function initIntroLogo(section) {
  const texts = section.querySelectorAll('[data-intro-fill]');
  if (!texts.length) return;

  if (prefersReducedMotion()) {
    gsap.set(texts, { fillOpacity: 1 });
    return;
  }

  gsap.set(texts, { fillOpacity: 0 });
  gsap.to(texts, {
    fillOpacity: 1,
    duration: 1.4,
    stagger: 0.35,
    ease: 'power2.out',
    delay: 0.2,
  });
}

/** Punto de origen (boca del vessel) del que "nacen" las esferas, en % del stage. */
const SPHERE_ORIGIN = { left: 50, top: 32 };

function setFinalState({ vessel, lid, glow, spheres }) {
  gsap.set(lid, { rotateX: -118, opacity: 1 });
  gsap.set(vessel, { rotateY: 6, rotateX: 2 });
  gsap.set(glow, { opacity: 0.9, scale: 1 });
  spheres.forEach((el) => {
    gsap.set(el, {
      opacity: 1,
      scale: 1,
      left: `${el.dataset.x}%`,
      top: `${el.dataset.y}%`,
      rotate: el.dataset.rot,
    });
  });
}

function buildDesktopTimeline({ section, vessel, lid, glow, backSpheres, frontSpheres, glows, scrollLine }) {
  const allSpheres = [...backSpheres, ...frontSpheres];

  gsap.set(lid, { rotateX: 0, transformOrigin: '50% 100%' });
  gsap.set(vessel, { rotateY: -10, rotateX: 6, transformPerspective: 1200 });
  gsap.set(glow, { opacity: 0, scale: 0.4 });
  gsap.set(allSpheres, {
    opacity: 0,
    scale: 0.2,
    left: `${SPHERE_ORIGIN.left}%`,
    top: `${SPHERE_ORIGIN.top}%`,
    rotate: 0,
  });
  if (scrollLine) gsap.set(scrollLine, { scaleY: 0, transformOrigin: '50% 0%' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      // Sin pin: la sección se sigue desplazando con normalidad y el usuario
      // nunca queda "atrapado" sin poder bajar. El timeline solo se ata al
      // progreso natural del scroll mientras el hero pasa por el viewport.
      start: 'top top',
      end: '+=80%',
      scrub: true,
    },
  });

  tl.to(vessel, { rotateY: 8, rotateX: -3, duration: 1, ease: 'none' }, 0)
    .to(lid, { rotateX: -128, duration: 1.1, ease: 'power2.inOut' }, 0.15)
    .to(glow, { opacity: 1, scale: 1.15, duration: 0.9, ease: 'none' }, 0.35)
    .to(
      backSpheres,
      {
        opacity: 1,
        scale: 1,
        left: (i, el) => `${el.dataset.x}%`,
        top: (i, el) => `${el.dataset.y}%`,
        rotate: (i, el) => el.dataset.rot,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.08,
      },
      0.4
    )
    .to(
      frontSpheres,
      {
        opacity: 1,
        scale: 1,
        left: (i, el) => `${el.dataset.x}%`,
        top: (i, el) => `${el.dataset.y}%`,
        rotate: (i, el) => el.dataset.rot,
        duration: 1.1,
        ease: 'power2.out',
        stagger: 0.1,
      },
      0.5
    )
    .to(glow, { opacity: 0.55, duration: 0.6, ease: 'none' }, 1.1);

  glows.forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.05;
    gsap.to(el, {
      yPercent: 100 * speed * 6,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=80%',
        scrub: true,
      },
    });
  });

  if (scrollLine) {
    gsap.to(scrollLine, {
      scaleY: 1,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  return () => {
    tl.kill();
  };
}

function buildMobileTimeline({ vessel, lid, glow, spheres }) {
  gsap.set(lid, { rotateX: 0, transformOrigin: '50% 100%' });
  gsap.set(vessel, { rotateY: 0, rotateX: 0, transformPerspective: 900 });
  gsap.set(glow, { opacity: 0, scale: 0.5 });
  gsap.set(spheres, {
    opacity: 0,
    scale: 0.3,
    left: `${SPHERE_ORIGIN.left}%`,
    top: `${SPHERE_ORIGIN.top}%`,
    rotate: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.to(lid, { rotateX: -120, duration: 0.9, ease: 'power2.inOut' })
    .to(glow, { opacity: 0.9, scale: 1, duration: 0.7, ease: 'power1.out' }, '-=0.4')
    .to(
      spheres,
      {
        opacity: 1,
        scale: 1,
        left: (i, el) => `${el.dataset.x}%`,
        top: (i, el) => `${el.dataset.y}%`,
        rotate: (i, el) => el.dataset.rot,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.06,
      },
      '-=0.3'
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
