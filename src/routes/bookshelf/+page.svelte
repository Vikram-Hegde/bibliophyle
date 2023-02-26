<script>
	import bookData from '$lib/books.json';
	import Book from '$lib/components/Book/Book.svelte';
	import Input from '$lib/components/Input.svelte';

	// check if its a touch device
	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);

	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});

	let search = '';
</script>

<main>
	<section class="filter">
		<h2>Filter by</h2>
	</section>
	<section class="books">
		<form>
			<Input bind:value={search} placeholder="Search for books..." type="search" />
		</form>
		<div class="bookshelf">
			{#each bookData as book}
				{#if book.title.toLowerCase().includes(search.toLowerCase())}
					<Book {book} {mobile} />
					<!-- {:else} -->
				{/if}
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

	.filter,
	.recommendation {
		grid-column: span 5;
		background-color: hsl(34 98% 93%);
		position: sticky;
		top: 0;
		padding: 1.5rem 2rem;
		max-block-size: calc(100vh - 2px);

		@media(max-width: 1030px) {
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

		@media(max-width: 1030px) {
			grid-column: span 24;
		}
	}

	form {
		max-inline-size: 50ch;
	}
</style>
