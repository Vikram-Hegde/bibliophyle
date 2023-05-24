import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let cartItems = writable([]);

if (browser) {
	let storedItems = localStorage.getItem('cartItems');
	cartItems = writable(storedItems ? JSON.parse(storedItems) : []);
	cartItems.subscribe((value) => {
		localStorage.setItem('cartItems', JSON.stringify(value));
	});
}

const addToCart = (book) => {
	cartItems.update((items) => {
		if (items.find((item) => item._id === book._id)) {
			return items;
		}
		return [...items, book];
	});
};

export { cartItems, addToCart };
