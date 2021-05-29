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
		Object.entries(import.meta.globEager('../../locales/*.y(a)?ml')).map(
			([key, value]) => {
				return [
					key.match('../../locales/(.+).y(a)?ml')![1],
					value.default,
				];
			}
		)
	);

	// import everything
	window.AlpineI18n.create(Spruce.get('i18n.locale'), messages);

	// Run at first load to check if the current locale is RTL
	checkRTL();

	// Automatically switch to RTL
	window.addEventListener('locale-change', checkRTL);
};

function checkRTL() {
	// ts-ignore
	if (window.AlpineI18n.t('isRTL') == true) {
		document.body.setAttribute('dir', 'rtl');
	} else {
		document.body.removeAttribute('dir');
	}
}
