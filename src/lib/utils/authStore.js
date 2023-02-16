import { writable } from 'svelte/store';

const authLocal = localStorage.getItem('auth');
const isLogged = localStorage.getItem('isLogged');

export let isLoggedIn = writable(isLogged ? JSON.parse(isLogged) : false);

export const auth = writable(authLocal ? JSON.parse(authLocal) : {});

isLoggedIn.subscribe((value) => {
	localStorage.setItem('isLogged', JSON.stringify(value));
});

auth.subscribe((value) => {
	localStorage.setItem('auth', JSON.stringify(value));
});

