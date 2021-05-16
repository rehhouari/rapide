import { buildComponent } from './utils.js';

export const data = {
	settings: {
		middlewares: {
			views: {
				enable: true,
				basePath: '/views/',
			},
		},
	},
};

export const methods = {
	// this will validate the name in the /hello/:name route
	checkName(context) {
		if (context.params.name.toLowerCase() == 'home') {
			// redirecting is as easy as return the context.redirect function.
			return context.redirect('/');
		}
	},
};

window.router = buildComponent(data, methods);
