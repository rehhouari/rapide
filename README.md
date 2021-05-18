# Rapide <sup><em>(fast)</em></sup>

Organized Alpine.js starter template, with client-side routing, PWA, :zap: :mountain_snow: :evergreen_tree:

Fast Alpine.js web app mocking with <b>Rapide</b><sup><em>(fast)</em></sup><br>
<br>

<p align='center'>
<a href="https://rapide.vercel.app/">Live Demo</a>
</p>

<br>

## Features

-   ⚡️ [Alpine.js](https://github.com/alpinejs/alpine), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

-   📦 [Components auto importing](./src/components)

-   🗂 Add functionality with auto-loaded [modules](./src/modules)

-   📑 [Organized file structure](./src/)

-   📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

-   🎨 [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework

-   😃 [Use icons from any icon sets, with no compromise](./index.html#l127)

-   🌍 [I18n ready](./locales) with [VSCode extension support](#dev-tools)

-   🗒 [Markdown Support](https://github.com/antfu/vite-plugin-md)

-   🔥 Central application store with [Spruce](./src/store)

-   🖨 Server-side generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

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
    -   [`pinecone-router-middleware-views`](https://github.com/hannoeru/vite-plugin-pages) - load views from files
-   [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
-   [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - WindiCSS support
-   [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md) - Markdown as components / components in Markdown
    -   [`markdown-it-prism`](https://github.com/jGleitz/markdown-it-prism) - [Prism](https://prismjs.com/) for syntax highlighting
    -   [`prism-theme-vars`](https://github.com/antfu/prism-theme-vars) - customizable Prism.js theme using CSS variables
-   [Alpine I18n](https://github.com/rehhouari/alpinejs-i18n) - Internationalization, organized in local JSON files with [VSCode Extension support](#dev-tools)
-   [Alpine Magic Helpers](https://github.com/alpine-collective/alpine-magic-helper), [x-else](https://github.com/ryangjchandler/x-else), [alpine-clipboard](https://github.com/ryangjchandler/alpine-clipboard), [alpine-toggle](https://github.com/ryangjchandler/alpine-toggle) - collection of useful magic helpers for Alpine.js, with TypeScript Support!.
-   [Spruce](./src/store) - Central store for Alpine.js components, supporting custom storage drivers, meaning you can easily sync data.
-   [NProgress](./src/modules/nprogress.js) - Beautiful progress bar, with [customizable looks](./src/styles/nprogress.css)

### Coding Style

-   Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
-   [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

-   [TypeScript](https://www.typescriptlang.org/)
-   [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
-   [Netlify](https://www.netlify.com/), [vercel](https://vercel.com/) - zero-config deployment
-   [VS Code Extensions](./.vscode/extensions.json)
    -   [Alpine.js IntelliSense](https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.alpine-js-intellisense)
    -   [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
    -   [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
    -   [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
    -   [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
    -   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Variations

As this template is strongly opinionated, the following provides a curated list for community maintained variations with different preferences and feature sets. Check them out as well. PR to add yours are also welcome!

-   [vitesse-addons](https://github.com/JohnCampionJr/vitesse-addons) by [@johncampionjr](https://github.com/johncampionjr) - additional options for integrations, including [Prettier](https://prettier.io) and [Storybook](https://storybook.js.org)
-   [vitesse-ssr-template](https://github.com/frandiox/vitesse-ssr-template) by [@frandiox](https://github.com/frandiox) - Vitesse with SSR
-   [vitesse-nuxt](https://github.com/antfu/vitesse-nuxt) - Vitesse for Nuxt 2 (expiremental)

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

When you use this template, try follow the checklist to update your info properly

-   [ ] Rename `name` field in `package.json`
-   [ ] Change the author name in `LICENSE`
-   [ ] Change the title in `index.html`
-   [ ] Change the icons in `public/images/icons`
-   [ ] Remove the `.github` folder which contains the funding info
-   [ ] Clean up the READMEs and remove routes

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

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

## Why

I have created several Vite apps recently. Setting the configs up is kinda the bottleneck for me to make the ideas simply come true within a very short time.

So I made this starter template for myself to create apps more easily, along with some good practices that I have learned from making those apps. It's strongly opinionated, but feel free to tweak it or even maintains your own forks. [(see community maintained variation forks)](#variations)
