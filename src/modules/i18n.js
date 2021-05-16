import 'alpinejs-i18n';

export default () => {
	let locale = 'en';

	const messages = Object.fromEntries(
		Object.entries(import.meta.globEager('../../locales/*.json')).map(
			([key, value]) => {
				return [key.match('../../locales/(.+).json')[1], value.default];
			}
		)
	);
	window.AlpineI18n.create(locale, messages);

	// Locales of RTL Languages you support (arabic, farsi, hebrew..)
	const supportedRtlLanguages = ['ara'];
	// Automatically switch to RTL
	window.addEventListener('locale-change', function () {
		if (supportedRtlLanguages.includes(window.AlpineI18n.locale)) {
			document.body.setAttribute('dir', 'rtl');
		} else {
			document.body.removeAttribute('dir');
		}
	});
};
