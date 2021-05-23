import type AlpineI18n from 'alpinejs-i18n';
import type { Context } from 'pinecone-router';
import type { AxiosRequestConfig, AxiosPromise } from 'axios';
import { AlpineComponent } from '@leanadmin/alpine-typescript';


// Extended component data with additional magic helpers.
export abstract class AlpineComponentData extends AlpineComponent {
	/**
	 * The current route's context. Pinecone Router.
	 */
	$router!: Context;

	/**
	 * Get a component's data by it's name
	 * @param name components name. It is set with x-title, x-id, or id
	 */
	$component!: (name: string) => { [name: string]: any };

	/**
	 * Get the parent component's data.
	 */
	$parent!: () => { [name: string]: any };

	/**
	 * Quickly toggle / negate a property in your Alpine.js components.
	 * @param property the dot-notation of the property you wish to toggle.
	 */
	$toggle!: (property: string) => void;

	/**
	 * Using Axios, fetch JSON from an external source.
	 * @param options URL or Axios options
	 */
	$fetch!: (
		options?: string | AxiosRequestConfig
	) => AxiosPromise | Promise<any>;

	$get!: (url: string, params: { [name: string]: any }) => Promise<any>;
	$post!: (url: string, data: { [name: string]: any }) => Promise<any>;

	/**
	 * Run a function every n milliseconds. Optionally start and stop the timer.
	 */
	$interval!: (
		callback: () => void,
		milliseconds: number,
		forceInterval?: boolean
	) => void;

	/**
	 * Iterate over a range of values.
	 * N.B: You may use $range(10) which will compute to [1...10]
	 */
	$range!: (start?: number, stop?: number, step?: number) => number[];

	/**
	 * Manually refresh a component.
	 */
	$refresh!: () => void;

	/**
	 * Detect if the current browser width is equal or greater than a given breakpoints.
	 * The breakpoints:
	 * xs: 0px
	 * sm: 640px
	 * md: 768px
	 * lg: 1024px
	 * xl: 1280px
	 * 2xl: 1536px
	 * you can pass a numeric value to use an ad-hoc breakpoints.
	 */
	$screen!: (breakpoints: string | number) => boolean;

	/**
	 * Scroll the page vertically to a specific position.
	 * @param to the element, selector, or numeric point to scroll to
	 */
	$scroll!: (
		to: HTMLElement | string | number,
		options?: {
			behavior?: 'auto' | 'smooth';
			offset?: number;
		}
	) => void;

	/**
	 * Limit a text string to a specific number of characters or words.
	 * @param text the text to truncate
	 * @param options if a number it'll be used as characters, if object it can be words.
	 */
	$truncate!: (
		text: string,
		options:
			| number
			| { characters?: number; words?: number; ellipsis?: string },
		ellipsis?: string
	) => string;

	/**
	 * Track and undo state changes inside your component.
	 */
	$undo!: () => void;

	$history!: ($el: HTMLElement, clone: HTMLElement) => Iterable<any>;
	$track!: () => void;

	/**
	 * Copy a text to the clipboard
	 */
	$clipboard!: (text: string | (() => string)) => void;

	/**
	 * Translate a string
	 */
	$t!: typeof AlpineI18n.t;

	/**
	 * if the name is provided, set the current locale to name
	 * if empty return current locale
	 */
	$locale!: (name?: string) => string;

	/**
	 * get a store's data by its name
	 */
	$store!: { [name: string]: any };

	[name: string]: any;
}
