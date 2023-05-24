<script>
	import Book from '$lib/components/Book/Book.svelte';
	import Input from '$lib/components/Input.svelte';
	import { IconFilter, IconFilterOff } from '@tabler/icons-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let data;

	let books = data.books;
	let totalBooks = [...data.books];

	/** @type {string[]} */
	let filterOptions;
	filterOptions = [...new Set(books.map((book) => book.genre).flat())];
	let state = 'closed';

	/** @type {string[]} */
	let filter = [];
	let search = '';
	let sort = '';

	let duration = 150;

	// let readersLikes = [];

	$: {
		if (!filter.length) {
			books = totalBooks.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
			duration = 0;
		}

		if (search.length === 0 && filter.length !== 0) {
			duration = 250;
			books = totalBooks.filter((book) => {
				let isPresent = false;
				filter.forEach((genre) => {
					if (book.genre.includes(genre)) isPresent = true;
				});
				return isPresent;
			});
		}

		if (search.length && filter.length) filter = [];

		// readersLikes = books.filter((book) => books[0]?.related.includes(book.id));
	}

	$: {
		duration = 250;

		if (sort === 'LH') books = books.sort((a, b) => a.price - b.price);

		if (sort === 'HL') books = books.sort((a, b) => b.price - a.price);
	}

	$: if (search.length) duration = 0;

	const toggleState = () => (state = state === 'open' ? 'closed' : 'open');
</script>

<svelte:head>
	<title>Bookshelf | Bibliophile</title>
</svelte:head>

<main>
	<button class="dark-screen" data-state={state} on:click={toggleState} />
	<section class="options" data-state={state}>
		<div class="filter">
			<div class="wrapper">
				<h2>Filter by</h2>
				{#if filter.length}
					<button
						transition:fade={{ duration: 100 }}
						aria-label="Clear Filters"
						on:click={() => (filter = [])}
						title="Clear Filters"
					>
						<IconFilterOff size={20} />
					</button>
				{/if}
			</div>
			{#each filterOptions as option}
				<label class="control control-checkbox">
					<input type="checkbox" bind:group={filter} value={option} />
					{option}
					<div class="control_indicator" />
				</label>
			{/each}
		</div>
		<div class="sort">
			<div class="wrapper">
				<h2>Sort By</h2>
			</div>
			<label class="control control-radio">
				Price (Low to High)
				<input type="radio" name="radio" value="LH" bind:group={sort} />
				<div class="control_indicator" />
			</label>
			<label class="control control-radio">
				Price (High to Low)
				<input type="radio" name="radio" value="HL" bind:group={sort} />
				<div class="control_indicator" />
			</label>
		</div>
	</section>
	<section class="books">
		<div class="actions">
			<form>
				<Input bind:value={search} placeholder="Search for books..." type="search" />
			</form>
			<div class="actions__btn">
				<button
					class="filter"
					on:click={() => {
						state = state === 'open' ? 'closed' : 'open';
					}}><IconFilter size={20} /></button
				>
			</div>
		</div>
		<div class="bookshelf">
			{#if books.length === 0}
				<p class="not-found">We're sorry, but we don't have any results for that search.</p>
			{/if}
			{#each books as book (book._id)}
				<div class="book__wrapper" animate:flip={{ duration }}>
					<Book {book} />
				</div>
			{/each}
		</div>
	</section>
	<!-- <aside class="recommendation">
		<h2>Readers Also Enjoyed</h2>
		<div class="recommendation__bookshelf">
			{#if readersLikes.length === 0}
				<p class="not-found">No related books found</p>
			{/if}
			{#each readersLikes as book (book.id)}
				<div class="book__wrapper">
					<a href="/bookshelf/{book.id}">
						<img src={book.url} alt={book.title} />
					</a>
				</div>
			{/each}
		</div>
	</aside> -->
</main>

<style lang="scss">
	@use './style';
</style>
