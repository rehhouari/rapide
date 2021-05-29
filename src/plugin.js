import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import ts from 'typescript';

import Frontmatter from 'front-matter';
import MarkdownIt from 'markdown-it';

const markdownCompiler = () => {
	return MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
	}).use(require('markdown-it-prism'), require('markdown-it-anchor'));
};

const tf = (code) => {
	const fm = Frontmatter(code);
	const html = markdownCompiler().render(fm.body);

	return {
		code: html,
		attributes: fm.attributes,
	};
};

const defaultOptions = {
	pagesDir: 'src/pages',
	layoutsDir: 'src/layouts/',
	layoutContentString: '<!--content-->',
	viewsDir: '/pages/',
	dev: true,
}

export const plugin = (
	options = defaultOptions
) => {
	options = {...defaultOptions, ...options}
	const virtualRoutesId = 'virtual:pinecone-routes';
	const virtualUpdateId = 'virtual:pinecone-update';
	let generatedRoutes = null;

	const extensions = ['html', 'ts', 'js', 'md'];
	const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`);
	const extensionRE = /(?:\.([^.]+))?$/;

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

	function relativePath(path) {
		return '.' + path.match(/(\/src\/pages\/.+)/gi)[0];
	}

	async function generateRoutes() {
		let generatedRoutes = [];
		const pageDirPath = slash(path.resolve(options.pagesDir));
		let filesPath = await getPageFiles(pageDirPath);
		let pagesDir = pageDirPath;
		const routes = [];
		for (const filePath of filesPath) {
			const resolvedPath = filePath.replace(extensionsRE, '');
			const pathNodes = resolvedPath.split('/');
			const fullPath = `/${pagesDir}/${filePath}`;
			const file = {
				name: '',
				path: '',
				fullPath,
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
						: node.replace(/^\[(\.{3})?/, '').replace(/\]$/, '')
					: node;
				const normalizedPath = normalizedName.toLowerCase();
				file.name += file.name ? `-${normalizedName}` : normalizedName;
				const parent = parentRoutes.find(
					(node2) => node2.name === file.name
				);
				if (parent) {
					parent.children = parent.children || [];
					parentRoutes = parent.children;
					file.path = '';
				} else if (normalizedName === 'index' && !file.path) {
					file.path += '/';
				} else if (normalizedName !== 'index') {
					if (isDynamic) {
						file.path += `/:${normalizedName}`;
						if (isCatchAll) file.path += '(.*)';
					} else {
						file.path += `/${normalizedPath}`;
					}
				}
			}
			if (file.fullPath.includes('README.md')) continue;
			ext = extensionRE.exec(file.fullPath);
			file.ext = ext[1];
			if (file.path == '/notfound') file.path = 'notfound';
			file.isHandler = ['js', 'ts'].includes(file.ext);

			let r = {
				name: file.name,
				route: file.path,
			};
			let path = relativePath(file.fullPath);
			if (!file.isHandler) {
				view = file.name + '.html';
				let fm = null;
				let html = '';
				if (file.ext == 'html') {
					let source = fs.readFileSync(path, 'utf-8');
					fm = Frontmatter(source);
				} else if (file.ext == 'md') {
					let source = fs.readFileSync(path, 'utf-8');
					fm = Frontmatter(source);
					fm.body = tf(fm.body).code;
				}
				html = fm.attributes.layout
					? fs
							.readFileSync(
								options.layoutsDir +
									fm.attributes.layout +
									'.html',
								'utf-8'
							)
							.replace(options.layoutContentString, fm.body)
					: fm.body;
				fs.writeFileSync('./public' + options.viewsDir + view, html);

				r.view = view;
			} else {
				let tsModule = null;
				if (file.ext == 'ts') {
					let data = fs.readFileSync(path, 'utf-8');
					let js = ts.transpileModule(data, {
						compilerOptions: {
							module: ts.ModuleKind.ES2015,
						},
					});
					tsModule =
						'data:text/javascript;base64,' +
						Buffer.from(js.outputText).toString('base64');
				}
				let handlerFunction = (await import(tsModule ?? path)).default;
				r.handler = handlerFunction
					.toString()
					.replace(/\r?\n|\r/g, '');
			}
			let index = generatedRoutes.findIndex((e) => e.name == r.name);
			if (index != -1) {
				r = { ...r, ...generatedRoutes[index] };
				generatedRoutes[index] = r;
			} else generatedRoutes.push(r);
		}
		return generatedRoutes;
	}

	return {
		name: 'vite-plugin-pinecone',
		//enforce: 'pre',
		resolveId(id) {
			if (id === virtualRoutesId) {
				return virtualRoutesId;
			}
			if (id === virtualUpdateId) {
				return virtualUpdateId;
			}
		},
		async load(id) {
			if (id === virtualRoutesId) {
				if (!generatedRoutes) {
					generatedRoutes = await generateRoutes();
					let r = JSON.stringify(generatedRoutes);
					return `
					export const addRoutes = () => {
						const r = ${r};
						let t = [];
						r.forEach((route) => {
							let template = document.createElement('template');
							template.setAttribute('x-route', route.route);
							if (route.view) template.setAttribute('x-view', route.view);
							if (route.handler) template.setAttribute('x-handler', route.handler);
							t.push(template);
						});
						document.querySelector('[x-router]').append(...t);
					};
					`;
				}
			}
			if (id === virtualUpdateId) {
				if (import.meta?.env?.mode == 'build') {console.log('prod'); return '';}
				return `
				const socketProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
				const socketHost = \`\${location.hostname}:3000\`;
				const socket = new WebSocket(\`\${socketProtocol}://\${socketHost}\`, 'vite-hmr');

				// Listen for messages
				socket.addEventListener('message', async ({ data }) => {
					handleMessage(JSON.parse(data));
					console.log(data)
				});
				
				async function handleMessage(payload) {
					switch (payload.type) {
						case 'full-reload':
							if (
								payload.path.startsWith('/src/pages') ||
								payload.path.startsWith('/src/layouts')
							) {
								console.log('Rapide: reloading view!')
								window.PineconeRouter.navigate(window.PineconeRouter.currentContext.path);
							}
							break;
					}
				}`;
			}
		},
		handleHotUpdate({ file, server }) {
			if (
				(file.includes('src/pages') || file.includes('src/layouts')) &&
				generatedRoutes != null
			) {
				generateRoutes();
				return [];
			}
			
			// if (file.includes('public/pages')) {
			// 	return null;
			// }
			if (file.includes('.md')) {
				server.ws.send({
					type: 'full-reload'
				});
			}
			return [];
		},
	};
};
