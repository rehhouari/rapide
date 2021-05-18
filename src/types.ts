import type AlpineI18n from 'alpinejs-i18n';
import type { Context } from 'pinecone-router';
import type { AxiosRequestConfig, AxiosPromise } from 'axios';

// Window.Alpine type
export declare interface Alpine {
	version: string;
	pauseMutationObserver: boolean;
	magicProperties: { [name: string]: (el: HTMLElement) => void };
	ignoreFocusedForValueBinding: boolean;
	onComponentInitializeds: Array<(component: AlpineComponent) => void>;
	onBeforeComponentInitializeds: Array<(component: AlpineComponent) => void>;
	onComponentInitialized: (
		callback: (component: AlpineComponent) => void
	) => void;
	onBeforeComponentInitialized: (
		callback: (component: AlpineComponent) => void
	) => void;
	listenForNewUninitializedComponentsAtRunTime: () => undefined;
	discoverUninitializedComponents: (
		callback: (rootEl: HTMLElement) => void,
		el?: HTMLElement
	) => void;
	discoverComponents: (callback: (rootEl: HTMLElement) => void) => void;
	start: () => void;
	addMagicProperty: (
		name: string,
		callback: ($el: HTMLElement) => void
	) => void;
	clone: (component: AlpineComponent, newEl: HTMLElement) => void;

	[key: string]: any;
}

// Actual Alpine Component{} type. will be accessed by plugins.
export declare interface AlpineComponent {
	$el: HTMLElement;
	$data: ProxyConstructor;
	$nextTickStack: CallableFunction[];
	$showDirectiveStack: any[];
	$watchers: { [name: string]: CallableFunction };
	unobservedData: AlpineComponentData;
	getUnobservedData: () => AlpineComponentData;
	updateElements: (rootEl: HTMLElement, extraVars?: () => {}) => void;
	updateElement: (el: HTMLElement, extraVars?: () => {}) => void;
	evaluateReturnExpression: (
		el: HTMLElement,
		expression: string,
		extraVars?: () => {}
	) => void;
	[key: string]: any;
}

// The data that you can access within a component
export abstract class AlpineComponentData {
	/** Retrieve the root component DOM node. */
	$el!: HTMLElement;
	/** Retrieve DOM elements marked with x-ref inside the component. */
	$refs!: {
		[name: string]: HTMLElement;
	};
	/** Retrieve the native browser "Event" object within an event listener. */
	$event!: Event;
	/** Create a CustomEvent and dispatch it using .dispatchEvent() internally. */
	$dispatch!: (event: string, data: object) => void;
	/** Execute a given expression AFTER Alpine has made its reactive DOM updates. */
	$nextTick!: (callback: (_: any) => void) => void;
	/** Will fire a provided callback when a component property you "watched" gets changed. */
	$watch!: (property: string, callback: (value: any) => void) => void;
	[key: string]: any;
}

// Extended component data with additional magic helpers.
export abstract class AlpineComponentDataExtra extends AlpineComponentData {
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
