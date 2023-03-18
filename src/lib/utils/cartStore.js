import { writable } from 'svelte/store';

let storedItems = localStorage.getItem('cartItems');

let cartItems = writable(storedItems ? JSON.parse(storedItems) : []);

const addToCart = (book) => {
	cartItems.update((items) => {
		if (items.find((item) => item.id === book.id)) {
			return items;
		}
		return [...items, book];
	});
};

cartItems.subscribe((value) => {
	localStorage.setItem('cartItems', JSON.stringify(value));
});

export { cartItems, addToCart };
