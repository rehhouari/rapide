// vite.config.js
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	plugins: [WindiCSS()],
	publicDir: 'public/',
});
