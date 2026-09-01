# Brief de construcción — Sitio web Mucho POP

## 1\. Contexto del proyecto

Landing page \+ blog para **Mucho POP**, agencia de diseño gráfico, marketing y branding. El sitio debe sentirse como una pieza de **diseño premium hecha a mano**, con animación abundante y capas visuales — el cliente rechazó explícitamente una propuesta anterior por "verse hecha con IA" (layout genérico, poca animación custom). Prioridad número uno: **que no se vea genérico**.

**Alcance:** 2 vistas únicamente.

1. **Home** — landing de una sola página (one-pager) con navegación por anchors a cada sección.  
2. **Blog** — listado \+ artículo individual. El sitio final correrá sobre WordPress y debe aprovechar el sistema de blog nativo de WP, así que el blog debe maquetarse con la misma identidad visual pero como una plantilla reutilizable (no contenido hardcodeado).

**Destino final:** el código se migrará a WordPress (theme custom o secciones HTML dentro de Elementor). Por eso, ver stack técnico en sección 2 — todo debe ser portable sin depender de un framework de componentes.

**Repositorio:** nuevo repo en GitHub, deploy en Vercel (gratuito) únicamente para que el cliente revise avances — no es el hosting final.

---

## 2\. Stack técnico

- **Vite** (template vanilla-js), sin React/Vue/frameworks de componentes.  
- **GSAP \+ ScrollTrigger** para todas las animaciones de scroll (reveals, transformaciones, scroll-scrubbing).  
- **DrawSVG plugin de GSAP** (o motion-path custom si no está disponible) para el efecto "live draw" de líneas SVG que se dibujan al hacer scroll.  
- **Lenis** para smooth scroll global.  
- Parallax multicapa con **CSS 3D transforms** (`translateZ`, `will-change`) — evitar Three.js/WebGL salvo que sea estrictamente necesario para un elemento puntual, priorizando performance en hosting compartido de WordPress.  
- HTML organizado en **partials/secciones independientes** (un archivo o bloque claramente delimitado por sección) para facilitar la migración posterior a theme de WordPress o bloques de Elementor.  
- Respetar `prefers-reduced-motion` en todas las animaciones (accesibilidad, y buena práctica que además demuestra pulido "no genérico").  
- Mobile-first en la lógica de breakpoints, pero el diseño desktop es el que lleva la complejidad de capas — mobile es una reinterpretación simplificada, no un colapso automático.

---

## 3\. Sistema de marca

### Colores

**Primarios (core, 50% del uso):**

- Mucho Purple `#4E2464` — institucional, tipografía, fondos, estructuras  
- Mucho Cyan `#32A6BE` — iluminación, reflejos, elementos 3D (30% del uso)  
- Mucho Pink `#CF489A` — acentos, puntos focales, highlights (20% del uso)

**Secundarios:**

- `#351846`, `#6736BA`, `#C8B5DB`, `#74C9DB`, `#A8DFEB`, `#E98BC4`

**Neutros:**

- `#FFFFFF`, `#F8F7FA`, `#ECEAF1`, `#BD B7C7` (gris medio), `#1A1A1A` aprox (texto oscuro)

**Gradientes con nombre (usar tal cual, no inventar otros):**

- Signature: `#4E2464 → #CF489A`  
- Creative: `#32A6BE → #CF489A`  
- Premium: `#351846 → #6736BA`  
- Neon: `#32A6BE → #74C9DB`  
- Pop (hero): `#32A6BE → #4E2464 → #CF489A`

### Tipografía

- Familia: **Sora** (Light, Regular, Medium, SemiBold, Bold, ExtraBold)  
- Headlines grandes en Bold/ExtraBold, cuerpo en Regular/Medium

### Iconografía y materiales

- Iconos: outline minimalista, trazo uniforme, sin sombras, sin degradados  
- Materiales 3D: glass (frosted, transparencia, bordes biselados), chrome (acabado espejo, reflejos de marca), plastic satinado (acabado brillante, sin textura)  
- Elementos 3D permitidos: tubos, esferas, anillos, placas de vidrio, cápsulas, cubos redondeados, marcos translúcidos, ondas, discos, superficies curvas, planos flotantes, halos  
- **Explícitamente prohibido:** engranajes, objetos tecnológicos genéricos, íconos 3D de stock, formas agresivas/angulosas, polígonos complejos — todo lo que grite "generado por IA genérica"

### Composición

- 60% espacio negativo, 25% objetos 3D, 15% contenido — mantener este ratio como guía, especialmente en el hero y separadores de sección  
- Iluminación tipo estudio: sombras suaves, global illumination, bloom ligero, reflexiones limpias  
- Movimiento: lento, con flotación, rotación suave, parallax, reflejos de vidrio — nunca efectos exagerados o "bouncy"

---

## 4\. Sistema de interacción global (aplica a todo el sitio)

Este es el corazón del pedido del cliente — sin esto, el sitio se ve genérico:

1. **Parallax multicapa:** en cada sección, al menos 2-3 capas moviéndose a velocidades distintas al hacer scroll. Elementos que pasan por detrás de las tarjetas de contenido y otros por delante (cruce de capas), no solo fondo-vs-contenido plano.  
2. **Scroll reveals tipo "Magic Scroll":** los elementos no simplemente aparecen con fade — se transforman: escalan, rotan levemente, cambian de posición/opacidad de forma escalonada (stagger) según el scroll progress, no con duración fija.  
3. **Live-draw SVG:** al menos 2-3 puntos del recorrido (ideal: separadores entre secciones, o iconografía de "Cómo trabajamos") donde una línea/trazo SVG se dibuja progresivamente ligado al scroll — no en loop automático, sino scrubbed al scroll real del usuario.  
4. **Horizontal scroll:** la sección de Servicios (5 servicios) se implementa como scroll horizontal dentro de un contenedor sticky vertical — el usuario sigue haciendo scroll hacia abajo pero el contenido se desplaza lateralmente, revelando cada servicio como una "carta" de vidrio.  
5. **Micro-interacciones con cursor:** hover states con desplazamiento magnético leve en CTAs, cursor custom opcional en zonas 3D, tilt sutil en tarjetas al mover el mouse (desktop only).  
6. **Smooth scroll global** (Lenis) para que todo el movimiento se sienta cohesivo y no "saltado".

---

## 5\. Estructura de secciones (Home) — contenido y dirección de diseño

> Todo el copy está final, no debe alterarse salvo ajustes de line-breaks para diseño.

### 5.1 Hero

**Copy:**

- Headline: *"Ideas que se convierten en sistemas. Creatividad que genera resultados."*  
- Subheadline: *"Ayudamos a empresas a crecer con diseño, estrategia y ejecución clara. Sin improvisación. Sin ruido."*  
- CTA primario: **Hablemos de tu proyecto** · CTA secundario: **Conoce cómo trabajamos**

**Diseño desktop:** concepto de caja de cartón sobre un pedestal, tratada con estética glass/chrome de la marca (no cartón literal-realista, sino reinterpretada con los materiales del brand: vidrio esmerilado, cromado). Al hacer scroll, la caja rota y se abre (scroll-scrubbed, ligado 1:1 al scroll, no autoplay), y de su interior salen esferas de los 3 colores de marca que caen y se distribuyen hacia el resto de la página, actuando como elemento de transición hacia la sección siguiente.

**Diseño mobile:** versión simplificada del mismo concepto — menos capas de parallax, animación por scroll-trigger normal (entra en viewport → anima una vez) en lugar de scroll-scrubbing continuo, para evitar jank en dispositivos móviles. Mantener las esferas cayendo como remate visual pero con menos elementos simultáneos en pantalla.

### 5.2 El Problema

**Copy:**

- *"Muchas empresas invierten en diseño y marketing constantemente. Pero algo no termina de funcionar."*  
- *"Falta dirección. Falta coherencia. Falta orden."*  
- *"Campañas desconectadas. Material que se ve bien pero no vende. Múltiples proveedores sin una estrategia que los una."*  
- *"El problema casi nunca es la creatividad. Es la falta de estructura detrás."*  
- Cierre destacado: **"Mucho POP existe para resolver exactamente eso."**

**Diseño:** texto editorial grande, líneas cortas apareciendo una a una con scroll reveal (stagger), fondo con textura glass sutil. El cierre destacado puede tener tratamiento de gradiente Signature en el texto o un fondo con glass card.

### 5.3 Propuesta de valor

**Copy:**

- Título: *"No somos una agencia más."*  
- Intro: *"En Mucho POP combinamos creatividad, pensamiento estratégico y gestión organizacional. Esa mezcla es lo que nos diferencia."*  
- 4 diferenciadores (formato visual, tipo tarjetas glass):  
  1. No solo diseñamos → **pensamos el negocio**  
  2. No solo ejecutamos → **estructuramos procesos**  
  3. No solo automatizamos → **hacemos la tecnología útil**  
  4. No improvisamos → **planificamos y cumplimos**  
- Cierre: *"Somos creativos. Pero también somos administradores y estrategas. Y esa combinación cambia todo."*

**Diseño:** grid de 4 tarjetas glassmorphism con íconos outline de marca, apareciendo con stagger \+ leve rotación 3D al hacer scroll. Elemento 3D flotante (esfera o tubo) cruzando por detrás del grid.

### 5.4 Servicios (horizontal scroll)

**Copy — intro:** *"Soluciones integradas en un solo proveedor. Todo conectado, todo con un objetivo claro."*

5 servicios, cada uno como una "carta" en el scroll horizontal:

1. **Design & Branding** — Construimos identidades sólidas, coherentes y funcionales. Branding, identidad visual, diseño corporativo, presentaciones y contenido gráfico.  
2. **Digital Marketing Lab** — Estrategia digital orientada a resultados reales. Marketing 360, redes sociales, campañas publicitarias, embudos de conversión.  
3. **IA & Automation Systems** — Automatización inteligente al servicio del negocio. CRM, flujos automatizados, bots, analítica e integraciones.  
4. **Creative Productions** — Contenido audiovisual con intención estratégica. Fotografía, video, reels y piezas visuales.  
5. **POP Lab** — Material POP y soluciones para punto de venta. Incluye: Sublimación, Impresión, Bordado, Corte, Vinil.

**Diseño:** sección sticky verticalmente mientras el contenido se desplaza horizontalmente (scroll vertical del usuario controla el avance horizontal, técnica clásica de GSAP ScrollTrigger \+ pin). Cada carta con su propio color de acento dentro de la paleta secundaria, material glass, ícono grande.

### 5.5 Cómo trabajamos

**Copy:**

- Título: *"Con método. Con criterio. Sin vueltas innecesarias."*  
- Intro: *"Cada proyecto arranca con claridad y termina con resultados medibles. Así trabajamos."*  
1. **Entendemos el negocio** — Analizamos el contexto, los objetivos y el problema real antes de proponer cualquier cosa.  
2. **Definimos la estrategia** — Concepto, mensaje, canales y prioridades claras. Sin improvisar.  
3. **Diseñamos y producimos** — Creatividad aplicada, estética con intención y ejecución cuidada.  
4. **Automatizamos y optimizamos** — Sistemas que hacen que el trabajo fluya, escale y rinda.  
5. **Medimos y mejoramos** — Ajustamos, optimizamos y acompañamos el crecimiento en el tiempo.

**Diseño:** este es el punto ideal para el efecto **live-draw SVG** — una línea de proceso que se va dibujando y conectando cada uno de los 5 pasos a medida que se hace scroll, con los números/tarjetas iluminándose progresivamente al ser "alcanzados" por la línea.

### 5.6 Para quién somos

**Copy:**

- Título: *"Trabajamos con marcas que quieren crecer con criterio."*  
- Intro: *"No buscamos volumen. Buscamos proyectos donde podamos hacer una diferencia real."*  
- 4 tipos (formato visual):  
  - **Empresas medianas** que necesitan un aliado estratégico, no otro proveedor  
  - **Marcas en crecimiento** que quieren orden, estructura y resultados sostenibles  
  - **Agencias extranjeras** que buscan un partner confiable para outsourcing y white label  
  - **Retail y POP** que necesitan producción constante, rápida y de calidad

**Diseño:** grid o layout asimétrico de 4 bloques con tratamiento glass, distinto al de la sección 5.3 para evitar repetición visual (ej. tamaños desiguales tipo bento grid en vez de grid uniforme).

### 5.7 Clientes

**Copy:** banda en loop con logos de clientes.

**Diseño:** marquee infinito horizontal, logos en escala de grises que ganan color al hover, velocidad lenta y constante (no ligada a scroll, loop continuo con pausa al hover).

### 5.8 Nuestras raíces

**Copy:**

- Título: *"Todo empezó con una taza."*  
- *"Mucho POP nació antes de ser una agencia."*  
- *"Nació en un momento casi doméstico: una taza sublimada sin maquinaria, sin estudio, sin recursos. Solo ingenio, creatividad y una fuente de calor improvisada."*  
- *"Ese momento reveló algo que hoy define todo lo que hacemos: no se necesita tenerlo todo para crear algo con impacto. Solo hace falta visión, criterio y una mente que no se rinda."*  
- *"El nombre surgió como una sátira al boom de marcas repetitivas y vacías. Un recordatorio de que el mercado puede llenarse de ruido, pero muy pocas propuestas realmente tienen algo que decir."*  
- *"Mucho POP nació como un acto de rebeldía. Y sigue siéndolo."*

**Diseño:** sección con tono más narrativo/editorial, texto en columna angosta y centrada, con una taza estilizada con los materiales de marca (glass/chrome) como elemento visual único de esta sección, apareciendo con un reveal más pausado (esta sección respira, contrasta con el ritmo más dinámico de las anteriores).

### 5.9 CTA final

**Copy:**

- Título: *"No todas las marcas necesitan más ideas. Muchas necesitan dirección."*  
- *"Mucho POP es para quienes entienden que crecer no es improvisar, sino pensar, estructurar y ejecutar con intención."*  
- *"Si tu marca está lista para dar ese paso, conversemos."*  
- CTA: **Hablemos de tu proyecto** · Subtexto: *"La primera asesoría es gratuita."*

**Diseño:** cierre de alto impacto, gradiente Pop de fondo (Signature), esferas/tubo cromado como remate visual final antes del footer, CTA grande y magnético al hover.

### 5.10 Footer

Nav de anchors, logo, redes sociales, datos de contacto. Mantener la estética glass/dark del gradiente Premium.

---

## 6\. Blog

- Debe integrarse visualmente con la identidad (misma tipografía, paleta, tratamiento glass en tarjetas de artículo), pero construido como **plantilla reutilizable**, no contenido fijo — pensando en que luego se conecta al loop de WordPress.  
- Vista de listado: grid de tarjetas de artículo (imagen, categoría, título, extracto, fecha) con el mismo lenguaje de glassmorphism, hover con leve profundidad 3D.  
- Vista de artículo individual: tipografía editorial legible (cuerpo en Sora Regular, buen line-height), con elementos de marca sutiles en los márgenes (no compitiendo con la lectura).  
- Navegación de vuelta a Home vía el mismo header con anchors.

---

## 7\. Consideraciones técnicas adicionales

- **Performance:** lazy-load de imágenes/animaciones pesadas fuera de viewport; el sitio va a vivir en hosting de WordPress compartido probablemente, así que cuidar peso de assets (SVGs optimizados, evitar video pesado sin comprimir para el efecto de scroll del hero — considerar sprite-sheet de frames o Lottie si el "video scroll" resulta muy pesado).  
- **Accesibilidad:** respetar `prefers-reduced-motion`, contraste de texto sobre fondos con gradiente, foco visible en elementos interactivos.  
- **Estructura de archivos:** separar por sección (`/sections/hero.js`, `/sections/servicios.js`, etc.) y por tipo de asset (`/assets/svg`, `/assets/3d`, `/styles/tokens.css` con las variables de marca) — esto es clave para que la migración a WordPress sea por bloques, no una reescritura.  
- **Design tokens:** definir todos los colores, gradientes y tipografía como CSS custom properties desde el inicio (`--mucho-purple`, `--mucho-cyan`, `--mucho-pink`, `--gradient-signature`, etc.) para consistencia y fácil ajuste.  
- **Anti-genérico (no negociable):** evitar patrones típicos de "landing hecha por IA" — no usar el layout típico de hero centrado \+ 3 cards idénticas \+ ícono+título+texto repetido sin variación, no usar blobs de gradiente genéricos sin propósito, no usar el mismo tipo de reveal (fade+slide-up) en todas las secciones. Cada sección debe tener una firma de movimiento distinta dentro del mismo sistema.

---

## 8\. Referencias de dirección de arte (para tono visual, no copiar layout literal)

- Léo Parpeix — leoparpeix.com (experiencias 3D inmersivas, portafolio)  
- Sutera — sutera.ch  
- Framer.com  
- State of AI Design — stateofaidesign.com

Estas referencias comparten: tipografía editorial grande, mucho espacio negativo, transiciones de scroll cinematográficas y elementos 3D/glass con parallax real — es el nivel de pulido que se espera, no un clon de ninguna.  
