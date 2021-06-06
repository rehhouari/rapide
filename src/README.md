## Source directory

Here are all your code is organized into directories.

Scripts can be accessed from TypeScript with the prefix `~/` (e.g.: `~/core/store`)

> note: some directories have further instructions inside, make sure to check them.

### Structure

-   [`main.ts`](./main.ts): the entry point of the app, it imports modules, components, styles, and other packages.
-   [`~/core/`](./core): contains core modules, that will be referenced by modules & components as `~/core/`.
-   -   [`~/core/router`](./core/router.ts): the router data, it contains its settings and handlers.
-   -   [`~/core/store`](./core/store.ts): central Spruce store. you can define stores that can be accessed by many components/modules. if the store is specific to a certain module, define that store inside the affected module only.
-   -   [`~/core/auth`](./core/auth.ts): empty/dummy authentication module for demonstration.
-   [`~/modules/`](./modules): contains user modules; they will be automatically executed at the start.
-   [`~/components/`](./components):  contains alpine components data. they are automatically loaded.
-   [`~/styles/`](./styles): contains CSS styles.
-	[`types.ts`](./types.ts), [`shims.d.ts`](./shims.d.ts) are for TypeScript definitions. The former add types for Alpine Components and need to be imported on the top of each component file & the latter have Window type extensions.