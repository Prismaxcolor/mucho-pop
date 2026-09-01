/**
 * Header / navegación global — chrome persistente por anchors.
 * Este módulo entrega el HTML (render) y el comportamiento (init) del
 * bloque, para que en la migración a WordPress sea un partial autocontenido
 * (ej. header.php + su <script> de menú).
 */
import { initAnchorLinks } from '../core/anchors.js';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#metodo' },
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Nuestras raíces', href: '#raices' },
];

export function renderHeader() {
  const links = NAV_LINKS.map(
    ({ label, href }) => `
      <li>
        <a class="site-nav__link" href="${href}" data-anchor-link>${label}</a>
      </li>`
  ).join('');

  return `
    <header class="site-header" data-scrolled="false">
      <a class="site-logo" href="#hero" data-anchor-link aria-label="Mucho POP — inicio">
        <span class="site-logo__mucho">mucho</span><span class="site-logo__pop">POP</span>
      </a>

      <nav class="site-nav" data-nav aria-label="Navegación principal">
        <ul class="site-nav__list">${links}</ul>
        <a class="site-nav__cta" href="#contacto" data-anchor-link>Hablemos</a>
        <button
          class="site-nav__toggle"
          type="button"
          data-nav-toggle
          aria-label="Abrir menú"
          aria-expanded="false"
          aria-controls="site-nav"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <span class="site-header__progress" data-scroll-progress aria-hidden="true"></span>
    </header>
  `;
}

export function initHeader() {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  if (!header || !nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  initAnchorLinks(document);

  const progress = header.querySelector('[data-scroll-progress]');
  window.addEventListener(
    'scroll',
    () => {
      header.setAttribute('data-scrolled', String(window.scrollY > 8));
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    },
    { passive: true }
  );

  initScrollSpy(header);
}

/**
 * Resalta el link del nav correspondiente a la sección visible.
 * Se re-observa perezosamente porque, al construirse sección por sección,
 * no todos los <section> existen todavía en el DOM.
 */
function initScrollSpy(header) {
  const links = Array.from(header.querySelectorAll('.site-nav__link'));
  if (!links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const link = links.find((l) => l.getAttribute('href') === id);
        if (!link) return;
        link.setAttribute('aria-current', entry.isIntersecting ? 'true' : 'false');
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  const observeAvailableSections = () => {
    links.forEach((link) => {
      const id = link.getAttribute('href');
      const section = id && document.querySelector(id);
      if (section && !section.dataset.spyObserved) {
        section.dataset.spyObserved = 'true';
        observer.observe(section);
      }
    });
  };

  observeAvailableSections();
  window.addEventListener('sections:mounted', observeAvailableSections);
}
