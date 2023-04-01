export const ssr = false;

export const load = async ({ url: { pathname } }) => {
	return { pathname };
};
