/**
 * Scroll suave para cualquier [data-anchor-link] del documento (header,
 * footer, CTAs...). Antes vivía solo dentro de header.js, pero el footer
 * también necesita anchors — se centraliza acá para no duplicar lógica.
 */
import { scrollToTarget } from './scroll.js';

export function initAnchorLinks(root = document) {
  root.querySelectorAll('[data-anchor-link]').forEach((link) => {
    if (link.dataset.anchorBound) return;
    link.dataset.anchorBound = 'true';

    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      event.preventDefault();
      scrollToTarget(targetEl);
      history.pushState(null, '', href);

      const nav = document.querySelector('[data-nav]');
      const toggle = document.querySelector('[data-nav-toggle]');
      nav?.setAttribute('data-open', 'false');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}
