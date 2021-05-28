import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import ts from 'typescript';

import Frontmatter from 'front-matter';
import MarkdownIt from 'markdown-it';
import Prism from 'markdown-it-prism';


class ExportedContent {
	#exports = [];
	#contextCode = '';

	addContext(contextCode) {
		this.#contextCode += `${contextCode}\n`;
	}

	addExporting(exported) {
		this.#exports.push(exported);
	}

	export() {
		return [
			this.#contextCode,
			`export { ${this.#exports.join(', ')} }`,
		].join('\n');
	}
}

const markdownCompiler = (options) => {
	if (options.markdownIt) {
		if (
			options.markdownIt ||
			options.markdownIt?.constructor?.name === 'MarkdownIt'
		) {
			return options.markdownIt;
		} else if (typeof options.markdownIt === 'object') {
			return MarkdownIt(options.markdownIt);
		}
	} else if (options.markdown) {
		return { render: options.markdown };
	}
	return MarkdownIt({ html: true });
};

const tf = (code, options) => {
	const content = new ExportedContent();
	const fm = Frontmatter(code);
	const html = markdownCompiler(options).render(fm.body);

	return {
		code: html,
		attributes: fm.attributes,
	};
};


export const plugin = () => {
	const virtualFileId = 'virtual:routes';
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

	return {
		name: 'plugin',
		enforce: 'pre',
		resolveId(id) {
			if (id === virtualFileId) {
				return virtualFileId;
			}
		},
		async load(id) {
			if (id === virtualFileId) {
				if (!generatedRoutes) {
					generatedRoutes = [];
					const pageDirPath = slash(path.resolve('src/pages'));
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
									: node
											.replace(/^\[(\.{3})?/, '')
											.replace(/\]$/, '')
								: node;
							const normalizedPath = normalizedName.toLowerCase();
							file.name += file.name
								? `-${normalizedName}`
								: normalizedName;
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
						ext = extensionRE.exec(file.fullPath);
						file.ext = ext[1];
						if (file.path == '/notfound') file.path = 'notfound';
						file.isHandler = ['js', 'ts'].includes(file.ext);

						let r = {
							name: file.name,
							route: file.path,
						}
						let path = relativePath(file.fullPath);
						if (!file.isHandler) {
							view = file.name + '.html'

							if (file.ext == 'html') {
								fs.copyFile(
									file.fullPath,
									'./public/pages/' + view,
									(err) => {
										if (err) throw err;
									}
								);
							} else if (file.ext == 'md') {
								let md = fs.readFileSync(path, 'utf-8');
								let html = tf(md, MarkdownIt().use(Prism)).code;
								fs.writeFileSync('./public/pages/'+view, html)
							}

							r.view = view
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
							let handlerFunction = (
								await import(tsModule ?? path)
							).default;
							r.handler = handlerFunction
								.toString()
								.replace(/\r?\n|\r|\s/g, '');
						}
						let index = generatedRoutes.findIndex((e) => e.name == r.name);
						if (index != -1) {
							r = {...r, ...generatedRoutes[index]}
							generatedRoutes[index] = r;
						} else generatedRoutes.push(r);
					}

				}
				let r = JSON.stringify(generatedRoutes)
				console.log({r});
				console.log(generatedRoutes)
				return `export const routes = ${r}`;
			}
		},
		handleHotUpdate({ file, server }) {
			let parts = file.split('/');
			if (parts.includes('pages') && generatedRoutes != null) {
				generatedRoutes = null;
				return server.ws.send({
					type: 'full-reload',
				});
			}
		},
	};
};
