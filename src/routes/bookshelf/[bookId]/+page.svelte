<script>
	import Book from '$lib/components/Book/Book.svelte';
	import Star from '$lib/components/Star.svelte';
	import { IconArrowLeft, IconShoppingCartPlus } from '@tabler/icons-svelte';
	import commentsJson from '$lib/comments.json';
	import { addToCart } from '$lib/utils/cartStore';

	/** @type {import('./$types').PageData}*/
	export let data;

	const { book } = data;
	const { relatedBooks } = data;

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	shuffleArray(commentsJson);
</script>

<svelte:head>
	<title>{book.title} | Bibliophile</title>
</svelte:head>

<main class="book">
	<button class="back" on:click={() => history.go(-1)}>
		<IconArrowLeft size={24} />
	</button>
	<section class="book__cover">
		<img src={book.url} alt={book.title} />
		<button on:click={() => addToCart(data.book)}>
			<IconShoppingCartPlus size={20} /> Add To Cart
		</button>
	</section>
	<section class="book__info">
		<h1>{book.title}</h1>
		<h3 class="book__author">{book.author}</h3>
		<div class="book__rating">
			<Star rating={book.rating} />
			<h2>{book.rating}</h2>
		</div>
		<h2 class="book__price">₹{book.price}</h2>
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
	<section class="book__review">
		<h2>Ratings <i>&</i> Reviews</h2>
		{#each commentsJson as comment}
			<div class="review">
				<div class="review__author-info">
					<img src={comment.avatar_link} alt="comment author {comment.name}" loading="lazy" />
					<h4>{comment.name}</h4>
				</div>
				<div class="review__description">
					<Star rating={comment.rating} />
					<p>{comment.comment}</p>
				</div>
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
	@use './style';
</style>
