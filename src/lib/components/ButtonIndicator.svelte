<script>
	import { IconShoppingCart } from '@tabler/icons-svelte';
	import { cartItems } from '$lib/utils/cartStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button role="tab" aria-label="Cart" on:click={() => dispatch('open')}>
	<IconShoppingCart size={24} />
	{#key $cartItems.length}
		{#if $cartItems.length}
			<span class="indicator">{$cartItems.length}</span>
		{/if}
	{/key}
</button>

<style lang="scss">
	@use '../styles/utils' as *;

	button {
		padding: 0.5rem;
	}

	span {
		font-size: var(--fs--200);
		background-color: hsl(var(--accent) 90%);
		min-block-size: 1rem;
		min-inline-size: 1rem;
		border-radius: 10rem;
		@extend %items-center;
		justify-content: center;
		position: absolute;
		font-weight: bold;
		right: 0.25rem;
		top: 0.25rem;
		scale: 0.8;
		animation: scale 350ms ease-in-out forwards;
	}

	@keyframes scale {
		from {
			scale: 1.25;
		}
		to {
			scale: 0.8;
		}
	}
</style>
