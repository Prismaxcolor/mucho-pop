/**
 * Rieles laterales — chrome decorativo fijo en los bordes (feedback:
 * "los lados se ven vacíos"). Referencia: márgenes anotados de sitios
 * editoriales (Sutéra). mix-blend-mode:difference para leerse tanto sobre
 * fondos claros como oscuros sin variantes de color por sección.
 */
export function renderSideRails() {
  return `
    <div class="side-rail side-rail--left" aria-hidden="true">
      <span class="side-rail__bracket side-rail__bracket--top"></span>
      <span class="side-rail__line-wrap">
        <span class="side-rail__line"></span>
      </span>
      <span class="side-rail__label">Diseño · Estrategia · Ejecución</span>
      <span class="side-rail__bracket side-rail__bracket--bottom"></span>
    </div>
    <div class="side-rail side-rail--right" aria-hidden="true">
      <span class="side-rail__bracket side-rail__bracket--top"></span>
      <span class="side-rail__line-wrap">
        <span class="side-rail__line"></span>
        <span class="side-rail__progress-dot" data-rail-dot></span>
      </span>
      <span class="side-rail__label side-rail__label--mirror">Mucho POP — Est. 2020</span>
      <span class="side-rail__bracket side-rail__bracket--bottom"></span>
    </div>
  `;
}

export function initSideRails() {
  const dot = document.querySelector('[data-rail-dot]');
  if (!dot) return;

  window.addEventListener(
    'scroll',
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      dot.style.top = `${progress * 100}%`;
    },
    { passive: true }
  );
}
