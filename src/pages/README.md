## File-based Routing

Routes will be auto-generated for HTML & Markdown files in this dir with the same file structure.

[`vite-plugin-pinecone-pages`](https://github.com/rehhouari/vite-plugin-pinecone-pages) is used for this.

### Naming

Name the files the way you'd name routes in [Pinecone Router](https://github.com/pinecone-router/router#route-matching).

### Views

Views are HTML and/or Markdown files.

They'll be passed to [Frontmatter](https://github.com/jxson/front-matter) which you can use to specify the `layout` and `handlers`, and other data for the view.

Markdown will be compiled to HTML with `markdown-it` and syntax highlighting is done with `Prism`, and URLs automatically converted to anchors with `markdown-it-anchor`.

> You can disable Markdown Support in `vite.config.ts`, dependencies are not bundled with the plugin but instead installed in the project so you can remove them


### Components in Views

For HTML views you can simply wrap things in Alpine Components.
But you can also do it with FrontMatter!
This allow you to use things like i18n in Markdown (see [about.md](./about.md)).


```yaml
---
wrapInComponent: true
---
```

This will result in:

```html
<div x-data>
	your content
</div>
```

to specify a named component simply replace `true` with the components name:

```yaml
---
wrapInComponent: name
---
```

### Handlers

Define handlers in `src/core/router.ts` then reference them from the **view** or **layout** with FrontMatter like this:

```html
---
handlers: [handler, anotherhandler]
---

<!--HTML/MARKDOWN HERE-->
```
> Handlers are executed in order before the view is loaded.