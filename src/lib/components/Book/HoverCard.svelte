<script>
	import { fly } from 'svelte/transition';
	/**
	 * @typedef {Object} bookInfo
	 * @property {string} title
	 * @property {string} url
	 * @property {number} price
	 * @property {string} author
	 * @property {string} summary
	 * @property {number} rating
	 */

	/**
	 * @type {bookInfo}
	 */
	export let book;
	export let hovered = 0;
</script>

{#if hovered}
	<div class="hover-card" in:fly={{y: 10, duration: 200}} out:fly={{y: -10, duration: 150}}>
		<div class="hover-card__content">
			<h3>{book.title}</h3>
			<p>{book.author}</p>
			<div class="condition">
				<p>Condition</p>
				<p>{Math.floor(book.rating)}</p>
			</div>
			<div class="description">
				<h4>Description</h4>
				<p>{book.summary}</p>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.hover-card {
		position: absolute;
		bottom: 0;
		left: calc(100% + 0.5rem);
		width: 320px;
		z-index: 1;
		background-color: hsl(34 98% 92%);
		border-radius: 1rem;
	}

	.hover-card__content {
		padding: 1rem;
		max-width: 320px;
	}
</style>
