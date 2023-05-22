/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const res = await fetch('http://localhost:5174/books');
		const data = await res.json();
		return {
			books: data
		};
	} catch (err) {
		console.log(err);
	}
}
