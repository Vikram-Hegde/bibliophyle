import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isLoggedIn } from '$lib/utils/authStore.js';
import toast from 'svelte-french-toast';

export const load = async () => {
	if (!get(isLoggedIn)) {
		toast.error('Login to access this page');
		throw redirect(302, '/');
	}
};
