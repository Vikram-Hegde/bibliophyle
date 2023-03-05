import bookJson from '$lib/books.json';

// get the bookId and send the data to the page before load
export async function load({ params }) {
	const { bookId } = params;
	const book = bookJson.find((b) => b.id === bookId);
	const relatedBooks = book?.related.map((id) => bookJson.find((b) => b.id === id));
	return { book, relatedBooks };
}
