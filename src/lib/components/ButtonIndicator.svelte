<script>
	import { IconShoppingCart } from '@tabler/icons-svelte';
	import { cartItems } from '$lib/utils/cartStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button aria-label="Cart" on:click={() => dispatch('open')}>
	<IconShoppingCart size={24} />
	{#if $cartItems.length}
		<span class="indicator">{$cartItems.length}</span>
	{/if}
</button>

<style lang="scss">
	button {
		all: unset;
		display: flex;
		padding: 0.5rem;
		border-radius: 50%;
		cursor: pointer;
		position: relative;

		&:hover {
			background-color: hsl(34 98% 92%);
		}
	}

	span {
		font-size: var(--fs--200);
		background-color: hsl(34 98% 90%);
		min-block-size: 1rem;
		min-inline-size: 1rem;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		font-weight: bold;
		right: 0.25rem;
		top: 0.25rem;
		scale: 0.8;
	}
</style>
