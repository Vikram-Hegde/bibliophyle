import bookJson from '$lib/books.json';
import { get } from 'svelte/store';
import { books as uploadedBooks } from '$lib/utils/uploadedBooks.js';

// get the book data from the json file
function getBookData(params, books) {
	const { bookId } = params;
	const book = books.find((b) => b.id === bookId);
	if (!book) throw error(404, 'Not Found');
	const relatedBooks = book?.related.map((id) => books.find((b) => b.id === id));
	return { book, relatedBooks };
}

// get the bookId and send the data to the page before load()
export async function load({ params }) {
	const books = [...bookJson, ...get(uploadedBooks)];
	const data = await getBookData(params, books);
	return data;
}
