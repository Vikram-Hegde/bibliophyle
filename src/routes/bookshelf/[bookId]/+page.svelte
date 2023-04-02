<script>
	import Book from '$lib/components/Book/Book.svelte';
	import Star from '$lib/components/Star.svelte';
	import { IconArrowLeft, IconShoppingCartPlus } from '@tabler/icons-svelte';
	import commentsJson from '$lib/comments.json';
	import { addToCart } from '$lib/utils/cartStore';
	import { fade, draw } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';

	/** @type {import('./$types').PageData}*/
	export let data;

	const { book } = data;
	const { relatedBooks } = data;
	let added = false;

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	shuffleArray(commentsJson);

	let splash = false;

	function addSplash() {
		splash = true;
	}

	onMount(() => {
		window.addEventListener('popstate', addSplash);
	});
	onDestroy(() => {
		window.removeEventListener('popstate', addSplash);
		splash = false;
	});
</script>

<svelte:head>
	<title>{book.title} | Bibliophile</title>
</svelte:head>

<main class="book">
	{#if splash}
		<div class="splash" />
	{/if}
	<button
		class="back"
		on:click={() => {
			history.go(-1);
			splash = true;
		}}
	>
		<IconArrowLeft size={24} />
	</button>
	<section class="book__cover">
		<img src={book.url} alt={book.title} />
		<button
			class="btn--primary"
			on:click|once={() => {
				addToCart(data.book);
				added = true;
				setTimeout(() => {
					added = false;
				}, 900);
			}}
		>
			{#if added}
				<div class="added-to-cart" out:fade={{ duration: 100 }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="icon icon-tabler icon-tabler-check"
						><path in:draw={{ duration: 100 }} stroke="none" d="M0 0h24v24H0z" /><path
							in:draw={{ duration: 150, delay: 100 }}
							d="m5 12 5 5L20 7"
						/></svg
					>
				</div>
			{/if}
			<IconShoppingCartPlus size={20} /> <span>Add To Cart</span>
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
	{#if relatedBooks.length}
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
	{/if}
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

	span {
		margin-block-start: 2px;
		letter-spacing: 1px;
		font-weight: bold;
	}

	.splash {
		position: fixed;
		inset: 0;
		background-color: var(--background);
		z-index: 3;
	}
</style>
