import { buildComponent } from '../core/utils.js'

const data = {}

const methods = {
	text() {
		// the user didn't input anything yet
		if (this.$router.route == '/hello') {
			return 'Hello, what is your name?';
		} else return `Hello, ${this.$router.props.name}!`;
	},
	name() {
		if (this.$router.route == '/hello') {
			return '';
		} else return this.$router.props.name;
	}
}

export default buildComponent(data, methods)
