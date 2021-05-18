// @ts-ignore
import Spruce from '@ryangjchandler/spruce';

// you can define your global  stores here

// here we export it so it can be imported by modules directly,
// e.g.: import { counter } from '~/core/store'
// if you're not going to use it in a module, don't export it.
// just import '~/core/store' and use Spruce.store('counter').
// and from components: $store.counter
export const counter = Spruce.store(
	// store name
	'counter',

	// store data
	{
		amount: 0,
	},

	// this is the persistence driver, when empty it wont persist data.
	// when set to "true" it defaults to sessionStorage.
	// you can define your own storage as well.
	window.localStorage
);

// this is called after stores are defined
Spruce.store();

export default Spruce;
