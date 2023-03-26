import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isLoggedIn } from '$lib/utils/authStore.js';

export const load = async () => {
	if (!get(isLoggedIn)) {
		console.log('Need to Login to access this page.');
		throw redirect(401, '/');
	}
};
