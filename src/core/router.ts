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