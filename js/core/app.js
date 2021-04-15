import { registerComponents } from './utils.js';
import './store.js';
import './routes.js';
import 'virtual:windi.css';
import '../../css/custom.css';

/*

// Load only used components, don't work if you use client-side routing
// and add components dynamically
const components = [...document.querySelectorAll("[x-data$='()']")].map(
	(component) => {
		return component.getAttribute('x-data').slice(0, -2);
	}
);

*/

const components = [];

(async () => {
	await registerComponents(components);

	await import('alpine-magic-helpers');
	await import('@ryangjchandler/alpine-toggle');
	await import('@ryangjchandler/x-else');
	await import('@ryangjchandler/alpine-clipboard');
	await import('alpinejs');
})();
