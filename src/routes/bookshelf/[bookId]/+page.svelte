<script>
	import Book from '$lib/components/Book/Book.svelte';
	import Star from '$lib/components/Star.svelte';
	import { addToCart } from '$lib/utils/cartStore';
	import { IconArrowLeft, IconShoppingCartPlus } from '@tabler/icons-svelte';
	import { draw, fade } from 'svelte/transition';
	import Input from '../../sellbooks/Input.svelte';
	import toast from 'svelte-french-toast';
	import MD5 from 'crypto-js/md5';
	import { auth } from '$lib/utils/authStore';
	import { invalidateAll } from '$app/navigation';

	export let data;

	const { book } = data;
	const { relatedBooks } = data;
	let added = false;
	let main = null;

	let form;

	let rating;
	let commentText;
	let avatar_link = `https://www.gravatar.com/avatar/${MD5($auth.email).toString()}`;

	const handleSubmit = async () => {
		let review = {
			book_id: book._id,
			name: $auth.name,
			rating,
			comment: commentText,
			avatar_link
		};

		try {
			await fetch(`https://bibliophile-server.up.railway.app/books/${data.param}/reviewBook`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ review })
			});
			form.reset();
			toast.success('Posted review successfully');
			invalidateAll();
		} catch (err) {
			console.error(err);
		}
	};
</script>

<svelte:window
	on:popstate={() => {
		if (main) main.style.opacity = 0;
	}}
/>

<svelte:head>
	<title>{book.title} | Bibliophile</title>
</svelte:head>

<main class="book" bind:this={main}>
	<a class="back" href="/bookshelf">
		<IconArrowLeft size={24} />
	</a>
	<section class="book__cover">
		<img src={book.imageURL} alt={book.title} />
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
		<h2 class="book__price">
			₹{book.price} <span class="discount">25% off</span>
		</h2>
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
						<Book {book} link={book._id} noscroll="" />
					</div>
				{/each}
			</div>
		</section>
	{/if}
	<section class="book__review">
		<h2>Ratings <i>&</i> Reviews</h2>
		<form on:submit|preventDefault={handleSubmit} bind:this={form}>
			<Input type="number" placeholder="Book Rating" bind:value={rating} />
			<Input type="textarea" placeholder="Book Review" bind:value={commentText} />
			<button class="btn"> Submit </button>
		</form>
		{#each book.reviews as comment}
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

	.discount {
		all: unset;
		font-size: var(--fs--200);
		font-weight: lighter;
		background-color: hsl(var(--accent) 20%);
		border-radius: 6px;
		display: inline-block;
		padding: 0.25rem;
		color: var(--background);
	}

	form {
		max-inline-size: 75ch;
		display: grid;
		gap: 1rem;
	}

	@media (max-width: 850px) {
		form {
			max-inline-size: 100%;
		}

		h2 {
			margin-block-end: 1rem;
		}
	}

	.btn {
		width: fit-content;
		padding: 1rem;
		margin-left: auto;
	}
</style>
