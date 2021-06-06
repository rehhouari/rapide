## Components

Components in this dir will be auto-registered, named & titled based on its file name. 

### Creating a component

Place a `.ts` or `.js` file with the following template, it will be installed automatically.

```ts
import { AlpineComponent } from 'alpine-typescript-extras'

export default class extends AlpineComponent {
	// your component's logic here
}

```

### Usage in HTML

For example, if the component's file name is `name.(ts|js)`:

```html
<div x-data="Alpine.component('name')()">
...
</div>
```

#### Using $component magic helper

`x-title` attribute is automatically to components with the name of the class, so you can access it with the magic helper like this: `$component('name')`. 

### Acknowledgment

[Alpine Typescript](https://github.com/LeanAdmin/alpine-typescript).
[@ryangjchandler](https://github.com/ryangjchandler)'s Alpine  code organization [experiment](https://github.com/ryangjchandler/alpine-experiments/tree/master/code-org).
