import page from 'https://unpkg.com/page/page.mjs';
import Spruce from './store.js';

// the content element where HTML will be included and replaced
const content = document.getElementById('content');
// the path where to look for views
const viewsPath = '/views/';

/**
 * When imported as a module, page.js can't detect the window object
 * // https://github.com/visionmedia/page.js/issues/537
 */
page.configure({ window: window });

// route hanldlers
const hanldler = {
	main() {
		setContent('welcome');
	},
	notfound() {
		setContent('notfound');
	},
};

// routes definitions
page('/', hanldler.main);
page('*', hanldler.notfound);

Spruce.started(function () {
	page();
});

/**
 * includeContent() adds an HTML file to comtent element.
 * This does not clear the element content
 */
function includeContent(page) {
	fetch(viewsPath + page + '.html')
		.then((response) => response.text())
		.then((response) => {
			content.innerHTML = response;
		});
}

/**
 * setContent() clear the content element
 * and replaces it entirely with the specified page
 */
function setContent(page) {
	clearContent();
	includeContent(page);
}

/**
 * clearContent() clears the content element
 */
function clearContent() {
	content.innerHTML = '';
}

export default page;
