<script>
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';
	import HoverCard from './HoverCard.svelte';
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
	let hovered = 0;
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

<a
	href="#"
	class="book__wrapper"
	on:focus={onHover}
	on:mouseenter={onHover}
	on:blur={onLeave}
	on:mouseleave={onLeave}
>
	<div class="book">
		<img src={book.url} alt={book.title} />
		<div class="book__details">
			<div>
				<strike>₹{book.price + 300}</strike>
				<p class="book__price">₹{book.price}</p>
			</div>
			<button><IconShoppingCartPlus size={20} /></button>
		</div>
	</div>
	<HoverCard {book} {hovered} {card} />
</a>

<style lang="scss">
	a {
		text-decoration: none;
		color: inherit;
	}

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
		min-width: 120px;
		border-radius: 8px;
		display: grid;

		img {
			align-self: start;
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 8px 8px 0 0;
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
		}

		&__wrapper {
			position: relative;
			display: flex;
		}
	}
</style>
