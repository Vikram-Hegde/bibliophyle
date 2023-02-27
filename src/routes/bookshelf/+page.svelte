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
	let filterOptions;
	filterOptions = [...new Set(books.map((book) => book.genre).flat())];

	/**
	 * @type {string[]}
	 */
	let filter = [];
	let search = '';

	let duration = 150;

	$: {
		if (filter.length === 0) {
			books = bookData.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
			duration = 0;
		}

		let isPresent = false;
		if (search.length === 0 && filter.length !== 0) {
			duration = 250;
			books = bookData.filter((book) => {
				filter.forEach((genre) => {
					if (book.genre.includes(genre)) isPresent = true;
					else isPresent = false;
				});
				return isPresent;
			});
		}

		if (search.length && filter.length) {
			duration = 250;
			filter = [];
		}
	}
</script>

<main>
	<section class="options">
		<div class="filter">
			<h2>Filter by</h2>
			<div class="filter__options">
				{#each filterOptions as option}
					<label class="control control-checkbox">
						<input type="checkbox" bind:group={filter} value={option} />
						{option}
						<div class="control_indicator" />
					</label>
				{/each}
			</div>
			<!-- sort will also be here on desktop -->
		</div>
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

	.filter__options {
		display: grid;
		gap: 0.35rem;

		label {
			display: flex;
			gap: 0.25rem;
		}
	}

	// checkbox styles
	.control {
		position: relative;
		padding-left: 30px;
		// margin-bottom: 5px;
		padding-top: 2px;
		cursor: pointer;
	}
	.control input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}
	.control_indicator {
		position: absolute;
		top: 2px;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: transparent;
		border: 1px solid var(--text);
		border-radius: 6px;
	}
	.control:hover input ~ .control_indicator,
	.control input:focus-visible ~ .control_indicator {
		background-color: hsl(34 98% 88%);
	}

	.control input:checked ~ .control_indicator {
		background-color: var(--text);
	}

	.control_indicator:after {
		box-sizing: unset;
		content: '';
		position: absolute;
		opacity: 0;
	}

	.control input:checked ~ .control_indicator:after {
		display: block;
		transform: rotate(45deg) scale(1);
		opacity: 1;
	}

	.control-checkbox .control_indicator:after {
		left: 7px;
		top: 3px;
		width: 3px;
		height: 9px;
		border: solid var(--background);
		border-width: 0 2px 2px 0;
		transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		transform: rotate(45deg) scale(0.7);
	}
</style>
