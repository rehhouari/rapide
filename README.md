# Vite & Alpine.js PWA Template

> An opinionated  PWA template.

WIP, going to change some things probably. But it's usable ^^ (follow the [usage guide](#usage)).

> Based on [Alpine Experiments](https://github.com/ryangjchandler/alpine-experiments) from [Ryan Chandler](https://github.com/ryangjchandler) and [TASH](https://github.com/go4cas/tash-starter-template)!

## What is included?

-   [Vite.js](https://vitejs.dev) for fast dev server & production builds.
-   [WindiCSS](https://windicss.org) for compoent styling.
-   [Alpine.js](https://github.com/alpinejs/alpine) for reactivity and component logic.
-   [Spruce](https://github.com/ryangjchandler/spruce) for application state management.
-   [Alpine Magic Helpers](https://github.com/KevinBatdorf/alpine-magic-helpers), [$clipboard](https://github.com/ryangjchandler/alpine-clipboard), [$toggle](https://github.com/ryangjchandler/alpine-toggle), [x-else](https://github.com/ryangjchandler/x-else) for additinal sugar.
-   [Page.js](https://github.com/visionmedia/page.js) for routing.

You get the following out of the box:
-	Vite.js dev server with WindiCSS configured.
-   Central application store, using Spruce.
-   Routing with Page.js, Auth placeholder.
-   Component logic split in separate files.

## Getting Started

Simply click the **Use this template** button of this repo, and follow the [Github Guide](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

### Installing
`npm install` to install dependencies then:
-	Dev server : `npm run dev`
-	Build for production : `npm run build`
-	Serve the production build: `npm run serve`

### Usage
- Editng [index.html](https://github.com/rehhouari/vite-alpine-pwa/blob/main/index.html) by replacing items in curly braces `{}`.
- Service worker is disabled by default for developement, toggle it [here](https://github.com/rehhouari/vite-alpine-pwa/blob/main/index.html#L102)
- Edit [manifest.webmanifest](https://github.com/rehhouari/vite-alpine-pwa/blob/main/public/manifest.webmanifest), [sw.js](https://github.com/rehhouari/vite-alpine-pwa/blob/main/public/sw.js) with your app info.
- Edit [js/core/routes.js](https://github.com/rehhouari/vite-alpine-pwa/tree/main/js/core/routes.js) with your own routes, views are at [public/views/](https://github.com/rehhouari/vite-alpine-pwa/tree/main/public/views).
- Create Alpine.js components in [js/components]((https://github.com/rehhouari/vite-alpine-pwa/blob/main/js/components) following this [template file](https://github.com/rehhouari/vite-alpine-pwa/blob/main/js/components/component.js).
- Import dependencies in the main module [js/core/app.js](https://github.com/rehhouari/vite-alpine-pwa/tree/main/js/core/app.js) and add components you're using [here](https://github.com/rehhouari/vite-alpine-pwa/tree/main/public/views).

## Deployment

Files to serve are in the `dist` directory after running `npm run build`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   [Ryan Chandler](https://github.com/ryangjchandler)
-   [go4as](https://github.com/go4cas/tash-starter-template)
-   [Anthony Fu](https://github.com/antfu)
