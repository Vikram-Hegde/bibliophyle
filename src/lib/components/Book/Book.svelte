<script>
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
</script>

<a
	href="#"
	class="book__wrapper"
	on:focus={() => (hovered = 1)}
	on:blur={() => (hovered = 0)}
	on:mouseover={() => (hovered = 1)}
	on:mouseleave={() => (hovered = 0)}
>
	<div class="book">
		<img src={book.url} alt={book.title} />
		<div class="book__details">
			<strike>₹{book.price + 300}</strike>
			<p class="book__price">₹{book.price}</p>
		</div>
	</div>
	<HoverCard {book} {hovered} />
</a>

<style lang="scss">
	a {
		text-decoration: none;
		color: inherit;
	}

	.book {
		background-color: hsl(34 98% 92%);
		min-width: 120px;
		overflow: hidden;
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
		}

		strike {
			font-size: var(--fs--200);
		}

		&__details {
			padding: 0.35rem;
			align-self: end;
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
