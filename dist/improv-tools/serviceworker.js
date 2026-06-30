self.addEventListener('install', (event) => {
	console.log('[Service worker] installed');
	caches
		.open('appData')
		.then((cache) => {
			console.log('[Service worker] Caching...');
			cache.addAll([
				'./',
				'./index.html',
				'./suggestions.js',
				'./prompts.js',
				'./games.js',
				'./utilities.js',
				'/js/toggle-tabs.js',
			]);
		})
		.catch((error) => {
			console.log(error);
		});
});

async function networkFirst(request) {
	try {
		// get the response
		// if it's okay, cache a copy and then return it
		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open('appData');
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		// if the response is an error, check for a match in the cache
		// if there's a match in the cache, return it
		// otherwise return the error
		const cachedResponse = await caches.match(request);
		return cachedResponse || Response.error();
	}
}

self.addEventListener('fetch', (event) => {
	event.respondWith(networkFirst(event.request));
});
