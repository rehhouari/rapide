import { registerComponents } from './utils.js';
import { registerSW } from 'virtual:pwa-register';
import 'virtual:windi.css';
import './store.js';
import '../../css/custom.css';

// see vite-plugin-pwa documentation
const updateSW = registerSW({
	onNeedRefresh() {
		// show a prompt to user
		console.log('need refreshing');
	},
	onOfflineReady() {
		// show a ready to work offline to user
		console.log('offline ready');
	},
});

// Add the name of the components you're using here
// TODO:  automatically include the router component using the vite plugin
const components = ['hello', 'router'];

(async () => {
	await registerComponents(components);

	await import('alpine-magic-helpers');
	await import('@ryangjchandler/alpine-clipboard');
	await import('@ryangjchandler/alpine-toggle');
	await import('@ryangjchandler/x-else');
	//await import('pinecone-router-middleware-views');
	await import('../../../../alpinejs/pinecone-router/middleware-views');
	await import('pinecone-router');
	await import('alpinejs');
})();
