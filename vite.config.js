import path from 'path';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import { VitePWA } from 'vite-plugin-pwa';
import PurgeIcons from 'vite-plugin-purge-icons';
import yaml from '@rollup/plugin-yaml';
import fg from 'fast-glob';
import fs from 'fs';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		plugin(),
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
				prefer_related_applications: false,
			},
			workbox: {},
		}),
	],
	publicDir: 'public/',
});

function plugin() {
	let generatedRoutes = null;
	const extensions = ['html'];
	const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`);
	var dynamicRouteRE = /^\[.+\]$/;
	function slash(str) {
		return str.replace(/\\/g, '/');
	}
	async function getPageFiles(path) {
		const ext = extensionsToGlob(extensions);
		const files = await fg(`**/*.${ext}`, {
			ignore: ['node_modules', '.git', '**/__*__/**'],
			onlyFiles: true,
			cwd: path,
		});
		return files;
	}
	function extensionsToGlob(extensions) {
		return extensions.length > 1
			? `{${extensions.join(',')}}`
			: extensions[0] || '';
	}
	function isDynamicRoute(routePath) {
		return dynamicRouteRE.test(routePath);
	}
	function isCatchAllRoute(routePath) {
		return /^\[\.{3}/.test(routePath);
	}

	var html =
		'<div x-data="Alpine.component(\'router\')()" x-router>{templates}</div>';
	var routeTemplate =
		'<template x-route="{route}" x-view="{view}"></template>';
	return {
		name: 'plugin',
		enforce: 'pre',
		transformIndexHtml(h) {
			console.log(html);
			return h.replace('{router}', 'testttt');
		},
		handleHotUpdate({ file, server}) {
			let parts = file.split('/');
			if (parts.includes('pages')) {
				server.ws.send({
					type: 'full-reload',
				});
			}
			return [];
		},
		async load(id) {
			if (!generatedRoutes) {
				generatedRoutes = [];
				const pageDirPath = slash(path.resolve('src/pages'));
				let filesPath = await getPageFiles(pageDirPath);
				let pagesDir = pageDirPath;
				const routes = [];
				for (const filePath of filesPath) {
					const resolvedPath = filePath.replace(extensionsRE, '');
					const pathNodes = resolvedPath.split('/');
					const component = `/${pagesDir}/${filePath}`;
					const route = {
						name: '',
						path: '',
						component,
					};
					let parentRoutes = routes;
					for (let i = 0; i < pathNodes.length; i++) {
						const node = pathNodes[i];
						const isDynamic = isDynamicRoute(node);
						const isCatchAll = isCatchAllRoute(node);
						const normalizedName = isDynamic
							? false
								? isCatchAll
									? 'all'
									: node.replace(/^_/, '')
								: node
										.replace(/^\[(\.{3})?/, '')
										.replace(/\]$/, '')
							: node;
						const normalizedPath = normalizedName.toLowerCase();
						route.name += route.name
							? `-${normalizedName}`
							: normalizedName;
						const parent = parentRoutes.find(
							(node2) => node2.name === route.name
						);
						if (parent) {
							parent.children = parent.children || [];
							parentRoutes = parent.children;
							route.path = '';
						} else if (normalizedName === 'index' && !route.path) {
							route.path += '/';
						} else if (normalizedName !== 'index') {
							if (isDynamic) {
								route.path += `/:${normalizedName}`;
								if (isCatchAll) route.path += '(.*)';
							} else {
								route.path += `/${normalizedPath}`;
							}
						}
					}
					parentRoutes.push(route);
				}

				let templates = '';
				routes.forEach((route) => {
					if (route.path == '/notfound') route.path = 'notfound';
					console.log(route.component);
					fs.copyFile(
						route.component,
						'./public/pages/' + route.name + '.html',
						(err) => {
							if (err) throw err;
							console.log(
								'source.txt was copied to destination.txt'
							);
						}
					);
					templates += routeTemplate
						.replace('{route}', route.path)
						.replace('{view}', route.name);
				});
				html = html.replace('{templates}', templates);
			}
		},
	};
}
