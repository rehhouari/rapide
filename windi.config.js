import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';
import forms from 'windicss/plugin/forms';

export default defineConfig({
	darkMode: 'class',
	// used vite.js scan option instead, this didnt seem to wrok
	// include: ['public/views/*.html', 'js/**/*.{js,jsx,tsx}', 'css/*.css'], 
	plugins: [forms, typography],
});
