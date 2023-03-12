import { writable } from 'svelte/store';

export let cartItems = writable([
	{
		id: 'b1',
		title: "Harry Potter and the Philosopher's Stone",
		author: 'J.K. Rowling',
		price: 279,
		url: '/bookcover/harry-potter-and-the-philosophers-stone.jpg',
		genre: ['Fantasy', 'Adventure', 'Mystery'],
		rating: 4.5,
		summary:
			"Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
		related: ['b9', 'b10', 'b11', 'b24']
	}
]);
