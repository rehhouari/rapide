import { buildComponent } from '../core/utils.js'

const data = {}

const methods = {
	hello(ctx) {
		// can be used for authorization/authentication
		// this will redirect before rendering the page
		if (ctx.props.name != null && ctx.props.name == 'home') {
			return ctx.go('/');
		}
	}
}

export default buildComponent(data, methods)
