import { routes } from 'virtual:routes';

export const addRoutes = () => {
	routes.forEach((route: any) => {
		let template = document.createElement('template');
		template.setAttribute('x-route', route.route);
		if (route.view) template.setAttribute('x-view', route.view);
		if (route.handler) template.setAttribute('x-handler', route.handler);
		document.querySelector('[x-router]')?.appendChild(template)
	});
};

// router settings
const settings = {
	allowNoHandler: true,
	middlewares: {
		views: {
			selector: '#app',
			enable: true,
			basePath: '/pages/',
		},
	},
};

const router = () => ({ settings: settings });
export default router;
window.router = router;
