import Spruce from "~/core/store";

// this will toggle languages. feel free to remove it
export default () => {
	var current = 1;
	window.toggleLanguage = () => {
		current++;
		const locales = Object.keys(window.AlpineI18n.messages);
		if (current >= locales.length) {
			current = 0;
		}
		Spruce.set('i18n.locale', locales[current]);
		window.AlpineI18n.locale = locales[current];
	};
};
