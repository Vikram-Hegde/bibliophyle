<script>
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';
	import HoverCard from './HoverCard.svelte';
	import { addToCart } from '$lib/utils/cartStore';

	export let book;
	export let link = `bookshelf/${book.id}`;

	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);
	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});
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

<div class="book" on:mouseenter={onHover} on:mouseleave={onLeave}>
	<a href={link} on:focus={onHover} on:blur={onLeave}>
		<img src={book.url} alt={book.title} />
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
		color: inherit;
		padding: 0.5rem;
		border-radius: 6px;
	}

	.book {
		background-color: hsl(var(--accent) 92%);
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
