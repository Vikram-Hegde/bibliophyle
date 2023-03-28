<script>
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';
	import HoverCard from './HoverCard.svelte';
	import { addToCart } from '$lib/utils/cartStore';

	/**
	 * @typedef {Object} bookInfo
	 * @property {string} title
	 * @property {string} url
	 * @property {number} price
	 * @property {number} id
	 * @property {string} author
	 * @property {string} summary
	 * @property {number} rating
	 */

	/**  @type {bookInfo} */
	export let book;

	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);

	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});

	export let link = `bookshelf/${book.id}`;

	let hovered = 0;

	/**  @type {HTMLElement | null} card */
	let card = null;

	function onHover() {
		hovered = 1;
		card = this;
	}

	function onLeave() {
		hovered = 0;
		card = null;
	}
</script>

<div
	class="book"
	on:focus={onHover}
	on:mouseenter={onHover}
	on:blur={onLeave}
	on:mouseleave={onLeave}
>
	<a href={link}>
		<img src={book.url} alt={book.title} loading="lazy" />
	</a>
	<div class="book__details">
		<div>
			{#if mobile.matches}
				<h3 class="book__title">{book.title}</h3>
			{/if}
			<strike>₹{book.price + 300}</strike>
			<p class="book__price">₹{book.price}</p>
		</div>
		{#if !mobile.matches}
			<button on:click={() => addToCart(book)}><IconShoppingCartPlus size={20} /></button>
		{/if}
	</div>
</div>
{#if !mobile.matches}
	<HoverCard {book} {hovered} {card} />
{/if}

<style lang="scss">
	button {
		background-color: hsl(34 90% 88%);
		color: inherit;
		padding: 0.5rem;
		border: none;
		cursor: pointer;
		display: flex;
		border-radius: 6px;
	}

	.book {
		background-color: hsl(34 98% 92%);
		min-inline-size: var(--min-width);
		border-radius: 8px;
		display: grid;
		overflow: hidden;

		&__title {
			font-size: var(--fs--100);
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			max-inline-size: var(--min-width);
		}

		img {
			display: block;
			block-size: 100%;
			inline-size: 100%;
			object-fit: cover;
			border-radius: 0.5rem 0.5rem 0 0;
		}

		strike {
			font-size: var(--fs--200);
		}

		&__details {
			align-items: center;
			padding: 0.35rem;
			align-self: end;
			display: flex;
			justify-content: space-between;
		}

		&__price {
			font-size: var(--fs-100);
			@media (max-width: 600px) {
				font-size: calc(var(--fs-100) + 0.25rem);
			}
		}
	}
</style>
