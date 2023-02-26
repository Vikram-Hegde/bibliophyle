<script>
	import bookData from '$lib/books.json';
	import Book from '$lib/components/Book/Book.svelte';
	import Input from '$lib/components/Input.svelte';
	import { IconArrowsSort, IconFilter } from '@tabler/icons-svelte';
	import { flip } from 'svelte/animate';

	// check if its a touch device
	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);

	let books = bookData;

	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});

	/**
	 * @type {string[]}
	 */
	let filter = []

	$: {
		let isPresent = false

		duration = 150;

		if(filter.length !== 0)
		books = books.filter(book => {
			filter.forEach(genre => {
				if (book.genre.includes(genre)) isPresent = true
				else isPresent = false
			})
			return isPresent
		})
	}

	let search = '';
	let duration = 150;

	$: {
		books = bookData.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
		duration = 0
	}

	$: {
		if(filter.length === 0) {
			books = bookData.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
		}
	}
</script>

<main>
	<section class="options">
		<div class="filter">
			<h2>Filter by</h2>
			<div class="filter__options">
				<label>
					<input type="checkbox" bind:group={filter} value="Adventure" />
					Adventure
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Fantasy">
					Fantasy
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Mystery" />
					Mystery
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Romance" />
					Romance
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Science Fiction" />
					Science Fiction
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Self Help" />
					Self Help
				</label>
				<label>
					<input type="checkbox" bind:group={filter} value="Thriller" />
					Thriller
				</label>
		</div>
		<!-- sort will also be here on desktop -->
	</section>
	<section class="books">
		<div class="actions">
			<form>
				<Input bind:value={search} placeholder="Search for books..." type="search" />
			</form>
			{#if mobile.matches}
				<button><IconArrowsSort size={20} /></button>
				<button><IconFilter size={20} /></button>
			{/if}
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
		<h2>People Also Like</h2>
	</aside>
</main>

<style lang="scss">
	@use '../../lib/styles/utils' as *;

	main {
		display: grid;
		grid-template-columns: repeat(24, 1fr);

		@media (max-width: 750px) {
			padding-block-end: 4rem;
		}
	}

	.bookshelf {
		--min-width: 120px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
		gap: clamp(0.5rem, 4vw - 1rem, 1rem);
		padding: 1.5rem 0;
	}

	.options,
	.recommendation {
		grid-column: span 5;
		background-color: hsl(34 98% 93%);
		position: sticky;
		top: 0;
		padding: 1.5rem 2rem;
		max-block-size: calc(100vh - 2px);

		@media (max-width: 1030px) {
			//WIP
			display: none;
		}

		h2 {
			font-size: var(--fs--100);
			text-transform: uppercase;
			letter-spacing: 2px;
			margin-block-end: 1rem;
		}
	}

	.recommendation {
		background-color: hsl(34 98% 98%);
	}

	.books {
		grid-column: 6 / -6;
		padding: 1rem 2rem;

		@media (max-width: 1030px) {
			grid-column: span 24;
		}
	}

	form {
		max-inline-size: 50ch;
	}

	.book__wrapper {
		position: relative;
		display: flex;
	}
</style>
