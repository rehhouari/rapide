var CACHE_NAME = 'appcache';

var urlsToCache = [
	'/',
	'/manifest.webmanifest',
	'/static/css/custom.css',
	'/static/js/core/app.js',
	'/static/js/core/utils.js',
	'/static/js/core/store.js',
	'/static/js/core/routes.js',
	'/static/js/core/auth.js',
	'/static/js/components/component.js',
	'https://cdn.jsdelivr.net/npm/pwacompat@2.x.x/pwacompat.min.js',
	'https://cdn.jsdelivr.net/gh/alpinejs/alpine@latest/dist/alpine.min.js',
	'https://cdn.jsdelivr.net/npm/@ryangjchandler/spruce@2.x.x/dist/spruce.module.js',
	'https://cdn.jsdelivr.net/gh/alpine-collective/alpine-magic-helpers@1.x.x/dist/index.min.js',
	'https://unpkg.com/page/page.mjs',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function (event) {
	var cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	if (event.request.mode === 'navigate') {
		event.respondWith(caches.match('/'));
		return;
	}
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			}

			var fetchRequest = event.request.clone();
			return fetch(fetchRequest).then(function (response) {
				if (
					!response ||
					response.status !== 200 ||
					response.type !== 'basic'
				) {
					return response;
				}

				var responseToCache = response.clone();
				caches.open(CACHE_NAME).then(function (cache) {
					cache.put(event.request, responseToCache);
				});
				return response;
			});
		})
	);
});
