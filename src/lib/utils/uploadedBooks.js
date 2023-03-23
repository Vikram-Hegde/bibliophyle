import { writable } from 'svelte/store';

let storedBooks = localStorage.getItem('storedBooks');

export let books = writable(storedBooks ? JSON.parse(storedBooks) : []);

books.subscribe((value) => {
	localStorage.setItem('storedBooks', JSON.stringify(value));
});
