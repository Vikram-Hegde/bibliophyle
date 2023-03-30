<script>
	import { cartItems } from '$lib/utils/cartStore';
	import { IconArrowRight, IconTrash } from '@tabler/icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let cartVisible;

	$: amount = $cartItems.reduce((acc, item) => {
		return acc + item.price;
	}, 0);

	const dispatch = createEventDispatcher();

	const removeFromCart = (id) => {
		$cartItems = $cartItems.filter((item) => item.id != id);
	};
</script>

{#if cartVisible}
	<button
		transition:fade={{ duration: 200 }}
		class="dark-screen"
		data-state="open"
		on:click={() => dispatch('close')}
	/>
	<div
		class="cart__container"
		transition:fly={{ x: 250, duration: 250 }}
		in={{ duration: 250, x: 0 }}
		out={{ duration: 200, x: 250 }}
	>
		<div class="wrapper">
			<h3>Cart</h3>
			<button class="arrow-right" aria-label="Close Cart Menu" on:click={() => dispatch('close')}>
				<IconArrowRight size={20} />
			</button>
		</div>
		<div class="cart__wrapper">
			{#if $cartItems.length === 0}
				<h4>Looks like your cart is feeling a little lonely at the moment.</h4>
			{/if}
			{#each $cartItems as item (item.id)}
				<div class="cart__item" animate:flip={{ duration: 250 }}>
					<img src={item.url} alt={item.title} />
					<div class="cart__info">
						<h4>{item.title}</h4>
						<div class="wrapper">
							<h3>₹{item.price}</h3>
							<button on:click={() => removeFromCart(item.id)}><IconTrash size={20} /></button>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="total">
			<h3>Total :</h3>
			<span>₹{amount} /-</span>
		</div>
		<button class="order--btn" disabled={$cartItems.length ? false : true}
			>Order {$cartItems.length > 1 ? 'Books' : 'Book'}</button
		>
	</div>
{/if}

<style lang="scss">
	.cart {
		&__container {
			display: grid;
			gap: 0.75rem;
			align-items: start;
			grid-template-rows: auto 1fr auto;
			position: fixed;
			block-size: 100%;
			right: 0;
			top: 0;
			inline-size: min(20rem, 80%);
			background-color: hsl(var(--accent) 98%);
			padding: 1.5rem;
			z-index: 3;
			box-shadow: -20px 0 25px -5px hsl(34 30% 70% / 30%), -4px 0 6px -4px hsl(34 30% 70% / 30%);
			border-radius: 1rem 0 0 1rem;
			overflow-y: auto;
		}

		&__wrapper {
			display: grid;
			gap: 0.5rem;
		}

		&__item {
			display: flex;
			align-items: center;
			inline-size: 100%;
			gap: 0.5rem;
		}

		&__info {
			flex: 1;

			button {
				color: hsl(4, 100%, 50%);
				block-size: 1.75rem;
				inline-size: 1.75rem;
				border-radius: 50%;
				justify-content: center;

				&:before {
					background-color: hsl(4, 100%, 90%);
				}

				&:focus-visible {
					outline: 2px solid hsl(4, 100%, 50%);
				}
			}
		}
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	img {
		height: clamp(4rem, 4vw + 1rem, 5.25rem);
		width: auto;
		object-fit: cover;
		border-radius: 6px;
		flex-shrink: 0;
	}

	h3 {
		text-transform: uppercase;
		font-family: 'Open Sans', sans-serif;
	}

	h4 {
		font-weight: lighter;
	}

	.total {
		display: flex;
		justify-content: space-between;
		align-items: center;

		span {
			font-weight: bold;
			font-size: var(--fs-100);
		}
	}

	.order--btn {
		text-transform: uppercase;
		letter-spacing: 2px;
		background-color: var(--purple);
		color: var(--background);
		font-weight: bold;
		line-height: 3;
		border-radius: 6px;
		transition: background-color 150ms ease-in-out;
		justify-content: center;

		&:hover {
			background-color: var(--purple-100);
		}

		&:disabled {
			filter: brightness(80%);
			cursor: not-allowed;
		}
	}

	.arrow-right {
		padding: 0.5rem;
		border-radius: 6px;

		&:focus-visible {
			outline: 2px solid;
		}
	}
</style>
