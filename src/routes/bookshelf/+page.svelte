<script>
	import bookData from '$lib/books.json';
	import Book from '$lib/components/Book/Book.svelte';
	import Input from '$lib/components/Input.svelte';
	import { IconFilter } from '@tabler/icons-svelte';
	import { flip } from 'svelte/animate';

	// check if its a touch device
	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);

	let books = bookData;

	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});

	/** @type {string[]} */
	let filterOptions;
	filterOptions = [...new Set(books.map((book) => book.genre).flat())];
	let state = 'closed';

	/** @type {string[]} */
	let filter = [];
	let search = '';
	let sort = '';

	let duration = 150;

	let readersLikes = [];

	$: {
		if (!filter.length) {
			books = bookData.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
			duration = 0;
		}

		if (search.length === 0 && filter.length !== 0) {
			duration = 250;
			books = bookData.filter((book) => {
				let isPresent = false;
				filter.forEach((genre) => {
					if (book.genre.includes(genre)) isPresent = true;
				});
				return isPresent;
			});
		}

		if (search.length && filter.length) filter = [];

		readersLikes = bookData.filter((book) => books[0]?.related.includes(book.id));
	}

	$: {
		duration = 250;

		if (sort === 'LH') books = books.sort((a, b) => a.price - b.price);

		if (sort === 'HL') books = books.sort((a, b) => b.price - a.price);
	}

	$: if (search.length) duration = 0;

	const toggleState = () => {
		if (state === 'open') state = 'closed';
		else state = 'open';
	};
</script>

<svelte:head>
	<title>Bookshelf | Bibliophile</title>
</svelte:head>

<main>
	<button class="dark-screen" data-state={state} on:click={toggleState} />
	<section class="options" data-state={state}>
		<div class="filter">
			<h2>Filter by</h2>
			{#each filterOptions as option}
				<label class="control control-checkbox">
					<input type="checkbox" bind:group={filter} value={option} />
					{option}
					<div class="control_indicator" />
				</label>
			{/each}
		</div>
		<div class="sort">
			<h2>Sort By</h2>
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
					on:click={() => {
						if (state === 'open') state = 'closed';
						else state = 'open';
					}}><IconFilter size={20} /></button
				>
			</div>
		</div>
		<div class="bookshelf">
			{#each books as book (book.id)}
				<div class="book__wrapper" animate:flip={{ duration }}>
					<Book {book} {mobile} />
				</div>
			{/each}
		</div>
	</section>
	<aside class="recommendation">
		<h2>Readers Also Enjoyed</h2>
		<div class="recommendation__bookshelf">
			{#each readersLikes as book (book.id)}
				<div class="book__wrapper">
					<a href="/bookshelf/{book.id}">
						<img src={book.url} alt={book.title} />
					</a>
				</div>
			{/each}
		</div>
	</aside>
</main>

<style lang="scss">
	@use './style';
</style>
