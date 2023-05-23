/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	try {
		const res = await fetch(`http://localhost:5174/books/${params.bookId}`);
		const bookData = await res.json();
		let genres = bookData.genre;
		genres = genres
			.map((genre, i) => {
				if (genres[i + 1]) {
					return `genres=${encodeURIComponent(genre)}&`;
				}
				return `genres=${encodeURIComponent(genre)}`;
			})
			.join('');
		const relatedRes = await fetch(
			`http://localhost:5174/books/${params.bookId}/related?${genres}`
		);
		const related = await relatedRes.json();
		return {
			book: bookData,
			relatedBooks: related,
			param: params.bookId
		};
	} catch (err) {
		console.error(err);
	}
}
