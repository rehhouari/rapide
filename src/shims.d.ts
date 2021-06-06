/* eslint-disable import/no-duplicates */
import type AlpineI18n from 'alpinejs-i18n';
import type { Context, PineconeRouter } from 'pinecone-router';

declare global {
	interface Window {
		// extend the window
		AlpineI18n: AlpineI18n;
		PineconeRouter: PineconeRouter;
		[name: string]: any;
	}
}
