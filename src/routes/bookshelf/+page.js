/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const res = await fetch('https://bibliophile-server.up.railway.app/books');
		const data = await res.json();
		return {
			books: data
		};
	} catch (err) {
		console.log(err);
	}
}
