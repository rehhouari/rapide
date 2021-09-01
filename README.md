# <i>Rapide</i> <sup><em>(fast)</em></sup> :zap: :mountain_snow: :evergreen_tree:

<p align='center'>
Opinionated Alpine.js starter template, with file based routing, PWA, components auto-loading, and more!

<p align='center'>
Mock up <i>Rapide</i> <sup><em>(fast)</em></sup> Alpine.js web apps.<br>
</p>

<br>

<p align='center'>
<a href="https://rapide.vercel.app/">Live Demo</a>
</p>
<br>

## NOTICE:

look, i **can't** work on it now, _sadly_. it works but you need to make some changes:

* roll back to this commit: https://github.com/rehhouari/rapide/commit/05b0e513949747b0fc645e3ea65c9d4f4d12630b

it have potential, or had. it came make spinning up a web app with alpine **v2** really quick but there are some problems. i tried documeting everything but the [vite plugin](https://github.com/pinecone-router/vite-plugin-pinecone-pages) isn't documented.

I don't think anyone would bother but if you're bored feel free, I'll try to accept pull requests too, and it's MIT so you can fork all parts i made (router, i18n, vite plugin) and make a better template. good luck and sorry.


## Features

-   ⚡️ [Alpine.js](https://github.com/alpinejs/alpine), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

-   📦 [Components auto importing](./src/components)

-   🗂 [File based routing](./src/pages) & [layout system](./src/layouts). on top of [Pinecone Router](https://gihtub.com/pinecone-router/router) + smart hot-reloading!

-   🛺  Add functionality with auto-loaded [modules](./src/modules)

-   📑 [Organized file structure](./src/) with documentation for each part.

-   📲 Zero-config [PWA](https://github.com/antfu/vite-plugin-pwa)

-   🎨 [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework

-   😃 [Use icons from any icon sets, with no compromise](./index.html#L120)

-   🌍 [I18n ready](./locales) with pre-configured [VSCode extension support](#dev-tools)

-   🗒 [Markdown Support](./src/pages), optional and can be removed without bloat left.

-   🔥 Central application store with [Spruce](./src/store)

-   🦾 Full TypeScript support, even in Alpine Components.

-   ☁️ Deploy on Netlify & Vercel, zero-config

<br>

## Pre-packed

### UI Frameworks

-   [Windi CSS](https://github.com/windicss/windicss) (On-demand [TailwindCSS](https://tailwindcss.com/)) - lighter and faster, with a bundle additional features!
    -   [Windi CSS Typography](https://windicss.netlify.app/guide/plugins.html#typography) - similar to [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typograph) but for Windi CSS

### Icons

-   [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
-   [`vite-plugin-purge-icons`](https://github.com/antfu/vite-plugin-icons) - only bundle icons you use.

### Plugins

-   [Pinecone Router](https://github.com/pinecone-router/router)
    -   [`pinecone-router-middleware-views`](https://github.com/pinecone-router/middleware-views) - load views from files
    -   [`vite-plugin-pinecone-pages`](https://github.com/rehhouari/vite-plugin-pinecone-pages) - file-based routing for Pinecone Router with (Optional, default: on) Markdown support, layouts, and smart reloading-no more full-reloads for view changes!
		-    [`markdown-it-prism`](https://github.com/jGleitz/markdown-it-prism) - [Prism](https://prismjs.com/) for syntax highlighting
    	-   [`prism-theme-vars`](https://github.com/antfu/prism-theme-vars) - customizable Prism.js theme using CSS variables
-   [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
-   [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - WindiCSS support
-   [Alpine I18n](https://github.com/rehhouari/alpinejs-i18n) - Internationalization, organized in local YAML files with [VSCode Extension support](#dev-tools)!
-   [Alpine Magic Helpers](https://github.com/alpine-collective/alpine-magic-helper), [x-else](https://github.com/ryangjchandler/x-else), [alpine-clipboard](https://github.com/ryangjchandler/alpine-clipboard), [alpine-toggle](https://github.com/ryangjchandler/alpine-toggle) - collection of useful magic helpers for Alpine.js, with TypeScript Support in components!.
-   [Spruce](./src/store) - Central store for Alpine.js components, supporting custom storage drivers, meaning you can easily sync data.
-   [NProgress](./src/modules/nprogress.js) - Beautiful progress bar, with [customizable looks](./src/styles/nprogress.css)

### Coding Style

-   [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

-   [VS Code Extensions](./.vscode/extensions.json)
    -   [Alpine.js IntelliSense](https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.alpine-js-intellisense)
    -   [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
    -   [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
    -   [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
    -   [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
    -   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [TypeScript](https://www.typescriptlang.org/)
-   [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
-   [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/) - zero-config deployment
-   [Icones](https://icones.netlify.app/) - view and explore all icons you can use in your app.  

## Try it now!

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/rehhouari/rapide/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit rehhouari/rapide my-rapide-app
cd my-rapide-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try to follow this checklist to update your info properly

-   [ ] Rename `name` field in `package.json`
-   [ ] Change the author name in `LICENSE`
-   [ ] Change the title in `index.html`
-   [ ] Change the icons in `public/images/icons`
-   [ ] Remove the `.github` folder which contains the funding info
-   [ ] Clean up the READMEs and remove routes & handlers

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3000

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served (test it with `pnpm serve`).

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

Same for Vercel.

## Why

This template is heavily inspired by and based on [@antfu](https://github.com/antfu)'s [Vitesse](https://github.com/antfu/vitesse) for Vue. I wanted to bring a similar development experience to Alpine.js and show how it can be used to make web apps as well and not just as a JQuery alternative. So I been building plugins for Alpine.js & Vite to bridge the gap that made it difficult to accomplish that.

Before I found Vitesse, I've based this on [@ryangjchandler](https://github.com/ryangjchandler)'s experiment on code organization. When I saw it I felt it has potential, and I wanted to make it more accessible. hopefully I did now.
