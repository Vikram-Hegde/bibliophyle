<script>
	import { cartItems } from '$lib/utils/cartStore';
	import { createEventDispatcher } from 'svelte';
	export let cartVisible;

	$: amount = $cartItems.reduce((acc, item) => {
		return acc + item.price;
	}, 0);

	const dispatcher = createEventDispatcher();
</script>

{#if cartVisible}
	<button class="dark-screen" data-state="open" on:click={() => dispatcher('close')} />
	<div class="cart__container">
		<h3>Cart</h3>
		{#each $cartItems as item}
			<div class="cart__item">
				<img src={item.url} alt={item.title} />
				<div class="cart__info">
					<h4>{item.title}</h4>
					<h3>₹{item.price}</h3>
				</div>
			</div>
		{/each}
		<div class="total">
			<h3>Total :</h3>
			<span>₹{amount} /-</span>
		</div>
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
			max-inline-size: min(20rem, 80%);
			background-color: hsl(34 98% 98%);
			padding: 1.5rem;
			z-index: 3;
			box-shadow: -20px 0 25px -5px hsl(34 30% 70% / 30%), -4px 0 6px -4px hsl(34 30% 70% / 30%);
			border-radius: 1rem 0 0 1rem;
		}

		&__item {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	img {
		height: clamp(4rem, 4vw + 1rem, 5.25rem);
		width: auto;
		object-fit: cover;
		border-radius: 6px;
	}

	h3 {
		text-transform: uppercase;
		font-family: 'Open Sans', sans-serif;
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
</style>
