import { buildComponent } from '../core/utils.js';

const data = {
	settings: {
		middlewares: {
			views: {
				enable: true,
				basePath: '/views/',
			},
		},
	},
};

const methods = {
	// this will validate the name in the /hello/:name route
	checkName(context) {
		if (context.params.name.toLowerCase() == 'home') {
			// redirecting is as easy as return the context.redirect function.
			return context.redirect('/');
		}
	},
};

export default buildComponent(data, methods);
