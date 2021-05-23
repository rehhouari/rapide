import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '~/styles/main.css';
import '@purge-icons/generated';
import '~/core/router';
import { component, addTitles } from '@leanadmin/alpine-typescript';

// import modules
Object.values(import.meta.globEager('./modules/*.{js,ts}')).map((m) =>
	m.default()
);

// register components
Object.entries(import.meta.globEager('./components/*.{js,ts}')).map(
	([_, value]) => {
		component(value.default.name, value.default);
	}
);

// import dependencies
(async () => {
	// import plugins before alpine
	// @ts-ignore
	await import('alpine-magic-helpers');
	// @ts-ignore
	await import('@ryangjchandler/alpine-clipboard');
	// @ts-ignore
	await import('@ryangjchandler/alpine-toggle');
	// @ts-ignore
	await import('@ryangjchandler/x-else');
	// @ts-ignore
	await import('pinecone-router-middleware-views');
	await import('pinecone-router');
	// import alpinejs
	// @ts-ignore
	await import('alpinejs');
	// this will add 'x-title' attributes to all components, must be imported after alpinejs.
	await addTitles();
})();


