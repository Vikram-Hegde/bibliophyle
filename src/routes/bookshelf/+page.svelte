<script>
	import bookData from '$lib/books.json';
	console.log(bookData)
	let bookUrl = bookData.at(-1)?.url;
	console.log(bookUrl)
</script>

<main>
	<h1>Bookshelf Page</h1>
	<img src={bookUrl} alt="a book cover">
</main>
