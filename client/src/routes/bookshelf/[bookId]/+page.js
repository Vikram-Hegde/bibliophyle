/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`http://localhost:5174/books/${params.bookId}`);
	const bookData = await res.json()
	return {
		book: bookData
	};
}
