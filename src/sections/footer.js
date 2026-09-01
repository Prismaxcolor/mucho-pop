/**
 * Footer (brief 5.10) — nav de anchors, logo, redes, contacto. Estética
 * glass/dark del gradiente Premium. Sin protagonismo de animación: es
 * chrome de cierre, no una sección de contenido.
 */
const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#metodo' },
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Nuestras raíces', href: '#raices' },
  { label: 'Hablemos', href: '#contacto' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5v6"/><circle cx="8" cy="7.2" r="0.4" fill="currentColor" stroke="none"/><path d="M12 16.5v-3.5a2 2 0 0 1 4 0v3.5"/><path d="M12 10.5v6"/></svg>',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M14 8.5h-1.5A2 2 0 0 0 10.5 10.5V21M8.5 13.5h4"/></svg>',
  },
];

export function renderFooter() {
  const links = NAV_LINKS.map(
    ({ label, href }) => `<li><a class="footer__link" href="${href}" data-anchor-link>${label}</a></li>`
  ).join('');

  const socials = SOCIALS.map(
    ({ label, href, icon }) => `
      <a class="footer__social" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">
        ${icon}
      </a>`
  ).join('');

  return `
    <footer class="footer" aria-label="Pie de página">
      <span class="footer__watermark" aria-hidden="true">POP</span>
      <div class="container footer__grid">
        <div class="footer__brand">
          <a class="footer__logo" href="#hero" data-anchor-link aria-label="Mucho POP — inicio">
            mucho<span class="footer__logo-pop">POP</span>
          </a>
          <p class="footer__tagline">Ideas que se convierten en sistemas.</p>
          <div class="footer__socials">${socials}</div>
        </div>

        <nav class="footer__nav" aria-label="Navegación del pie de página">
          <p class="footer__heading">Navegación</p>
          <ul class="footer__links">${links}</ul>
        </nav>

        <div class="footer__contact">
          <p class="footer__heading">Contacto</p>
          <a class="footer__link" href="mailto:hola@muchopop.com">hola@muchopop.com</a>
          <a class="footer__link" href="tel:+584141124258">+58 414 112 4258</a>
        </div>
      </div>

      <div class="container footer__bottom">
        <p>© ${new Date().getFullYear()} Mucho POP. Todos los derechos reservados.</p>
      </div>
    </footer>
  `;
}

export function initFooter() {
  // Chrome estático — sin animación propia. Los [data-anchor-link] de acá
  // los resuelve initAnchorLinks(document), llamado una sola vez desde
  // initHeader() después de que todas las secciones (incluido el footer)
  // ya están en el DOM.
}
