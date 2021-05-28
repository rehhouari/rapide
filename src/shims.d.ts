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

declare module '*.md' {
	// "unknown" would be more detailed depends on how you structure frontmatter
	const attributes: Record<string, unknown>;

	// When "Mode.TOC" is requested
	const toc: { level: string; content: string }[];

	// When "Mode.HTML" is requested
	const html: string;

	// Modify below per your usage
	export { attributes, toc, html };
}