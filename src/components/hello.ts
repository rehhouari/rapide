import { AlpineComponentData } from '~/types';

export default class hello extends AlpineComponentData {
	name(): string | null {
		let name: string | null = this.$router.params.name;
		if (name) {
			return name + '!';
		}
		return null;
	}
}
