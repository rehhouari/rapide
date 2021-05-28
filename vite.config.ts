import path from 'path';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import { VitePWA } from 'vite-plugin-pwa';
import PurgeIcons from 'vite-plugin-purge-icons';
// @ts-ignore
import yaml from '@rollup/plugin-yaml';
// @ts-ignore
import { plugin } from './src/plugin';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import Prism from 'markdown-it-prism';
import markdownIt from 'markdown-it';
// @ts-ignore
// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// ts-ignore
export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		//dynamicImportVars(),
		mdPlugin({
			mode: [Mode.HTML],
			markdownIt: markdownIt({ html: true }).use(Prism),
		}),
		plugin(),
		htmlplugin(),
		yaml(),
		WindiCSS({
			scan: {
				dirs: ['.'], // all files in the cwd
				fileExtensions: ['html', 'js', 'ts'], // also enabled scanning for js/ts
			},
		}),
		PurgeIcons({
			/* PurgeIcons Options */
			content: [
				'**/*.html',
				'**/*.js',
				'**/*.vue', // scan for .vue file as well
			],
		}),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'PWA App',
				short_name: 'PWA App',
				description: 'This is a PWA Minimum Template',
				icons: [
					{
						src: '/images/icons/icon-48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-168x168.png',
						sizes: '168x168',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/images/icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: '/images/icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/images/icons/maskable_icon.png',
						sizes: '196x196',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				lang: 'en',
				dir: 'ltr',
				scope: '/',
				start_url: '/',
				display: 'standalone',
				orientation: 'any',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				//@ts-ignore
				prefer_related_applications: false,
			},
			workbox: {},
		}),
	],
	publicDir: 'public/',
});

function htmlplugin() {
	return {
		name: 'html-plugin',
		enforce: 'pre',
		transform(code: any, id: any) {
			if (id.endsWith('.html'))
				return `export default ${JSON.stringify(code)}`;
			else return code;
		},
	};
}
