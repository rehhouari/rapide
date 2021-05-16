import { registerSW } from 'virtual:pwa-register';

export default () => {
	registerSW({ immediate: true });
};
