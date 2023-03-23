import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let books = writable([]);

if (browser) {
	let storedBooks = localStorage.getItem('storedBooks');
	books = writable(storedBooks ? JSON.parse(storedBooks) : []);
	books.subscribe((value) => {
		localStorage.setItem('storedBooks', JSON.stringify(value));
	});
}

export { books };
