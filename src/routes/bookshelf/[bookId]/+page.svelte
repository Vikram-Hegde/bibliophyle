<script>
	import Book from '$lib/components/Book/Book.svelte';
	import Star from '$lib/components/Star.svelte';
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';

	export let data;
	const { book } = data;
	const { relatedBooks } = data;
</script>

<svelte:head>
	<title>{book.title} | Bibliophile</title>
</svelte:head>

<main class="book">
	<section class="book__cover">
		<img src={book.url} alt={book.title} />
		<button><IconShoppingCartPlus size={20} /> Add To Cart </button>
	</section>
	<section class="book__info">
		<h1>{book.title}</h1>
		<p class="book__author">{book.author}</p>
		<Star rating={book.rating} />
		<p class="book__description">
			{book.summary}
		</p>
		<div class="book__genre">
			<h4>Genre</h4>
			{#each book.genre as genre}
				<div class="genre">{genre}</div>
			{/each}
		</div>
	</section>
	<section class="book__recommendation">
		<h2>Readers <i>would</i> recommend</h2>
		<div class="books">
			{#each relatedBooks as book}
				<div class="book__wrapper">
					<Book {book} link={book.id} />
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@use './style';
</style>
