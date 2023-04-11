<script>
	import { fly } from 'svelte/transition';
	import Star from '../Star.svelte';
	/**
	 * @typedef {Object} bookInfo
	 * @property {string} title
	 * @property {string} author
	 * @property {string} summary
	 * @property {number} rating
	 */

	let align = 1;

	/**  @type {bookInfo} */
	export let book;

	/** @type {HTMLElement | null} */
	export let card;

	export let hovered = 0;

	$: if (card) {
		const rect = card.getBoundingClientRect();
		const window = document.body.getBoundingClientRect();

		if (rect.width + rect.left + 320 > window.width) {
			align = 1;
		} else {
			align = 0;
		}
	}
</script>

{#if hovered}
	<div
		class={`hover-card ${align ? 'right' : 'left'}`}
		in:fly={{ y: 10, duration: 250 }}
		out:fly={{ y: -10, duration: 150 }}
	>
		<div class="hover-card__content">
			<h3>{book.title}</h3>
			<i>{book.author}</i>
			<div class="condition">
				<p>Rating</p>
				<Star rating={book.rating} size={14} />
			</div>
			<div class="description">
				<h3>Description</h3>
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
		font-size: var(--fs--200);

		:first-child {
			margin-bottom: 0.25rem;
		}
	}

	.condition {
		display: flex;
		justify-content: space-between;
		font-size: var(--fs--100);
	}

	.left {
		left: calc(100% + 0.5rem);
	}

	.right {
		right: calc(100% + 0.5rem);
	}

	.hover-card {
		position: absolute;
		bottom: 0;
		inline-size: 320px;
		z-index: 1;
		background-color: hsl(34 98% 92%);
		box-shadow: 0 20px 25px -5px hsl(34 30% 70% / 50%), 0 4px 6px -4px hsl(34 30% 70% / 50%);
		border-radius: 1rem;
		border: 1px solid hsl(34 40% 70%);

		&__content {
			padding: 1rem;
			max-inline-size: 320px;
			display: grid;
			gap: 0.5rem;
		}
	}

	.description {
		font-size: calc(var(--fs--100) - 0.09rem);
	}
</style>
