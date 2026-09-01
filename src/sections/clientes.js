/**
 * Clientes (brief 5.7) — marquee infinito, velocidad constante, NO atado
 * a scroll (a diferencia de todas las demás secciones). Pausa al hover,
 * logos en gris que ganan color. No hay assets de logos reales todavía:
 * placeholders honestos ("Cliente 0X") listos para reemplazar por <img>
 * cuando WordPress cargue los logos reales del cliente.
 */
const CLIENT_COUNT = 8;

function logoMarkup(n, ariaHidden) {
  return `
    <li class="clientes__item" ${ariaHidden ? 'aria-hidden="true"' : ''}>
      <span class="clientes__logo">Cliente 0${n}</span>
    </li>
  `;
}

export function renderClientes() {
  const set = Array.from({ length: CLIENT_COUNT }, (_, i) => i + 1);
  const originalItems = set.map((n) => logoMarkup(n, false)).join('');
  const duplicateItems = set.map((n) => logoMarkup(n, true)).join('');

  return `
    <section id="clientes" class="clientes" aria-label="Clientes">
      <div class="container clientes__label-row">
        <span class="clientes__label-tick"></span>
        <p class="clientes__label">Confían en nosotros</p>
        <span class="clientes__label-tick"></span>
      </div>

      <div class="clientes__marquee">
        <ul class="clientes__track" data-track>
          ${originalItems}
          ${duplicateItems}
        </ul>
      </div>
    </section>
  `;
}

export function initClientes() {
  // Puramente CSS (animation + :hover) — no necesita JS. Se deja el hook
  // por consistencia con el resto de los módulos de sección.
}
