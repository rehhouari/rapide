import 'virtual:windi.css';
import '@purge-icons/generated';
import './styles/main.css';
import './router.js';
import { buildComponent } from './utils.js';

// import modules
Object.values(import.meta.globEager('./modules/*.{js,ts}')).map((m) =>
	m.default()
);

// register components
Object.entries(import.meta.globEager('./components/*.{js,ts}')).map(
	([key, value]) => {
		let name = key.match('./components/(.*).(js|ts)')[1];
		if (name == 'component') return;
		window[name] = buildComponent(value.data, value.methods);
	}
);

(async () => {
	await import('alpine-magic-helpers');
	await import('@ryangjchandler/alpine-clipboard');
	await import('@ryangjchandler/alpine-toggle');
	await import('@ryangjchandler/x-else');
	await import('pinecone-router-middleware-views');
	await import('pinecone-router');
	await import('alpinejs');
	await import('nprogress');
})();