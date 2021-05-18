import { AlpineComponent } from '@leanadmin/alpine-typescript';

export default class hello extends AlpineComponent {
	name(): string | null {
		let name: string | null = this.$router.params.name;
		if (name) {
			return name + '!';
		}
		return null;
	}
}
