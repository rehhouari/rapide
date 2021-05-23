const router = () => ({
	// router settings

	settings: {
		middlewares: {
			views: {
				enable: true,
				basePath: '/views/',
			},
		},
	},

	// handlers

	/**
	 * This is a basic example of authorization.
	 * it will validate the name in the /hello/:name route
	 */
	checkName(context: any) {
		if (context.params.name.toLowerCase() == 'home') {
			// redirecting is as easy as return the context.redirect function.
			return context.redirect('/');
		}
	},
});

export default router;
window.router = router;