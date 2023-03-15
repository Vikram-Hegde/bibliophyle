import { writable } from 'svelte/store';

let cartItems = writable([]);

const addToCart = (book) => {
	cartItems.update((items) => {
		if (items.find((item) => item.id === book.id)) {
			// do nothing
			return items;
		}
		return [...items, book];
	});
};

export { cartItems, addToCart };
