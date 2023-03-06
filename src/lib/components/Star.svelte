<script>
	import { IconStar, IconStarHalfFilled, IconStarFilled } from '@tabler/icons-svelte';
	export let rating = 0;

	const stars = Array.from({ length: 5 }, (_, i) => {
		if (i < rating) {
			return 'full';
		} else if (i < rating + 0.5) {
			return 'half';
		} else {
			return 'empty';
		}
	});
</script>

<div class="book__rating">
{#each stars as star}
	{#if star === 'full'}
		<IconStarFilled size={20} />
	{:else if star === 'half'}
		<IconStarHalfFilled size={20} />
	{:else}
		<IconStar size={20} />
	{/if}
{/each}
</div>

<style>
	.book__rating {
		display: flex;
		gap: 0.3rem;
	}
</style>