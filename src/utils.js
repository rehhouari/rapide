export const buildComponent = (data, methods = {}, init = () => {}) => {
	return () => {
		return { init, ...data, ...methods };
	};
};
