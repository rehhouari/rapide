## Source directory

Here are all your scripts organized, and they can be accessed from TypeScript with the prefix `~/`.

### Structure

-   [`main.ts`](./main.ts): the entry point of the site, it imports modules, components, styles, and other packages.
-   [`~/core/`](./core): this directory contains core modules, that will be referenced by modules & components as `~/core/..`.
-   -   [`~/core/router`](./core/router.ts): the router data, it contains its settings and handlers.
-   -   [`~/core/store`](./core/store.ts): central Spruce store. you can define stores that can be accessed by many components/modules. if the store is specific to a certain module, define that store inside the affected module only.
-   -   [`~/core/auth`](./core/auth.ts): empty/dummy authentication module.
-   [`~/modules/`](./modules): this directory contains user modules, that will be automatically executed before components.
-   [`~/components/`](./components): this directory contains alpine components data. they are automatically loaded, after all modules are imported.
-   [`~/styles/`](./styles): this directory contains styles, it comes with [`main.css`](./styles/main.css) which is imported automatically. and [`nprogress.css`](./styles/nprogress.css) which is allow you to customize your progress bar. i made it easier by providing css variables for you to customize.
-	[`types.ts`](./types.ts), [`shims.d.ts`](./shims.d.ts) are for TypeScript definitions. The former add types for Alpine Components and need to be imported on the top of each component file & the latter have Window type extensions.