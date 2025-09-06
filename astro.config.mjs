// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { rename } from 'node:fs/promises';
// https://astro.build/config

export default defineConfig({
	integrations: [
		{
			name: 'rename-404',
			hooks: {
				'astro:build:done': async (params) => {
					const notFoundFileURL = new URL('./404.html', params.dir);
					const newNotFoundFileURL = new URL('./not_found.html', params.dir);

					await rename(
						fileURLToPath(notFoundFileURL),
						fileURLToPath(newNotFoundFileURL)
					);
				},
			},
		},
	],
});
