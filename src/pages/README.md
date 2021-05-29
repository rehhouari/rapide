## File-based Routing

Routes will be auto-generated for files in this dir with the same file structure.
Check out [`vite-plugin-pinecone`](https://github.com/rehhouari/vite-plugin-pinecone) for more details.

### Formats

HTML, Markdown, Javascript, Typescript.

### Naming

- Name the files the way you'd name routes in [Pinecone Router](https://github.com/pinecone-router/router#route-matching).

### Views

Views are HTML and/or Markdown files (HTML views can also have Alpine components in them.)
They'll be passed to [Frontmatter](https://github.com/jxson/front-matter) which you can use to specify the `layout` for the view.
Markdown will be compiled to HTML with `markdown-it` and syntax highlighting is done with `Prism`

### Handlers

Handlers are Typescript or Javascript files that export a single default function which take `Context` as a parameter.
(You can have both a view and a handler for the same route)

```ts
import type { Context } from "pinecone-router";

export default (context: Context) => {
	// do something
}
```

#### Path Aliasing

`~/` is aliased to `./src/` folder.

For example, instead of having

```ts
import { isDark } from '../../../../modules'
```

now, you can use

```ts
import { isDark } from '~/modules'
```
