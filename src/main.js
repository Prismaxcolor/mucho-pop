import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';

import './styles/main.css';

import { initScroll, refreshOnFontsReady } from './core/scroll.js';
import { initSpotlight } from './core/spotlight.js';
import { renderHeader, initHeader } from './sections/header.js';
import { renderSideRails, initSideRails } from './sections/sideRails.js';
import { renderHero, initHero } from './sections/hero.js';
import { renderProblema, initProblema } from './sections/problema.js';
import { renderPropuesta, initPropuesta } from './sections/propuesta.js';
import { renderServicios, initServicios } from './sections/servicios.js';
import { renderMetodo, initMetodo } from './sections/metodo.js';
import { renderParaQuien, initParaQuien } from './sections/paraQuien.js';
import { renderClientes, initClientes } from './sections/clientes.js';
import { renderRaices, initRaices } from './sections/raices.js';
import { renderCta, initCta } from './sections/cta.js';
import { renderFooter, initFooter } from './sections/footer.js';

const app = document.querySelector('#app');

app.innerHTML = `
  ${renderHeader()}
  ${renderSideRails()}
  <main id="main-content">
    <!--
      Las secciones de la Home se montan aquí, una por una, cada una en su
      propio módulo dentro de /sections (render() = HTML, init() = animación).
    -->
    ${renderHero()}
    ${renderProblema()}
    ${renderPropuesta()}
    ${renderServicios()}
    ${renderMetodo()}
    ${renderParaQuien()}
    ${renderClientes()}
    ${renderRaices()}
    ${renderCta()}
  </main>
  ${renderFooter()}
`;

initScroll();
initHeader();
initSideRails();
initHero();
initProblema();
initPropuesta();
initServicios();
initMetodo();
initParaQuien();
initClientes();
initRaices();
initCta();
initFooter();
initSpotlight();
refreshOnFontsReady();

window.dispatchEvent(new Event('sections:mounted'));
