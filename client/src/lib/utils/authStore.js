import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let isLoggedIn = writable(false);
let auth = writable({});

if (browser) {
	const authLocal = localStorage.getItem('auth');
	const isLogged = localStorage.getItem('isLogged');

	isLoggedIn = writable(isLogged ? JSON.parse(isLogged) : false);

	auth = writable(authLocal ? JSON.parse(authLocal) : {});

	isLoggedIn.subscribe((value) => {
		localStorage.setItem('isLogged', JSON.stringify(value));
	});

	auth.subscribe((value) => {
		localStorage.setItem('auth', JSON.stringify(value));
	});
}

export { isLoggedIn, auth };
