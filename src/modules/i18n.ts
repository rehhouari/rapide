import 'alpinejs-i18n';
import Spruce from '~/core/store';

export default () => {
	// store the locale with spruce
	Spruce.store(
		'i18n',
		{
			// the default locale
			locale: 'en',
		},
		window.localStorage
	);

	// load locale files
	const messages = Object.fromEntries(
		// @ts-ignore
		Object.entries(import.meta.globEager('../../locales/*.json')).map(
			([key, value]) => {
				// @ts-ignore
				return [key.match('../../locales/(.+).json')[1], value.default];
			}
		)
	);

	// import everything
	window.AlpineI18n.create(Spruce.get('i18n.locale'), messages);

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
