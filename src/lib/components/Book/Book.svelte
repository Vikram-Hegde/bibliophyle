<script>
	import { addToCart } from '$lib/utils/cartStore';
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';
	import { draw, fade } from 'svelte/transition';
	import HoverCard from './HoverCard.svelte';

	export let book;
	export let link = `bookshelf/${book.id}`;
	export let noscroll = 'off';

	let mediaCheck = '(hover: none), (pointer: coarse), (max-width: 750px)';
	let mobile = window.matchMedia(mediaCheck);
	mobile.addEventListener('change', () => {
		mobile = window.matchMedia(mediaCheck);
	});
	let hovered = 0;
	let card = null;
	let added = false;
	let splash = false;

	function onHover() {
		hovered = 1;
		card = this;
	}

	function onLeave() {
		hovered = 0;
		card = null;
	}
</script>

{#if splash}
	<div class="splash" />
{/if}

<div class="book" on:mouseenter={onHover} on:mouseleave={onLeave}>
	<a
		on:click={() => {
			splash = true;
		}}
		href={link}
		on:focus={onHover}
		on:blur={onLeave}
		data-sveltekit-noscroll={noscroll}
	>
		<img src={book.url} alt={book.title} />
	</a>
	<div class="book__details">
		<div>
			{#if mobile.matches}
				<h3 class="book__title">{book.title}</h3>
			{/if}
			<strike>₹{Math.ceil(book.price + book.price * book.discount)}</strike>
			<p class="book__price">₹{book.price}</p>
		</div>
		{#if !mobile.matches}
			<button
				on:click|once={() => {
					addToCart(book);
					added = true;
					setTimeout(() => {
						added = false;
					}, 900);
				}}
			>
				{#if added}
					<div class="added-to-cart" role="presentation" out:fade={{ duration: 100 }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="icon icon-tabler icon-tabler-check"
							><path in:draw={{ duration: 100 }} stroke="none" d="M0 0h24v24H0z" /><path
								in:draw={{ duration: 150, delay: 100 }}
								d="m5 12 5 5L20 7"
							/></svg
						>
					</div>
				{/if}
				<IconShoppingCartPlus size={20} />
			</button>
		{/if}
	</div>
</div>
{#if !mobile.matches}
	<HoverCard {book} {hovered} {card} />
{/if}

<style lang="scss">
	@use '../../styles/utils' as *;
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
			@extend %items-center;
			padding: 0.35rem;
			align-self: end;
			justify-content: space-between;
		}

		&__price {
			font-size: var(--fs-100);
			@media (max-width: 600px) {
				font-size: calc(var(--fs-100) + 0.25rem);
			}
		}
	}

	.splash {
		position: fixed;
		background-color: var(--background);
		z-index: 3;
		inset: 0;
	}
</style>
