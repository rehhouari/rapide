import { AlpineComponentDataExtra } from '~/types';

export default class hello extends AlpineComponentDataExtra {
	name(): string | null {
		let name: string | null = this.$router.params.name;
		if (name) {
			return name + '!';
		}
		return null;
	}
}
