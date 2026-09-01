import { defineConfig } from 'vite';

// Base relativa: el HTML/CSS final se trocea dentro de un theme de WordPress,
// así que evitamos rutas absolutas ancladas a la raíz del dominio de Vite.
export default defineConfig({
  base: './',
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});
