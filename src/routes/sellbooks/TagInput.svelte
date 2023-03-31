<script>
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	let input;
	let tags = [];

	let dispatch = createEventDispatcher();

	function handleInput(e) {
		if (e.code === 'Comma') {
			input = input.charAt(0).toUpperCase() + input.slice(1);
			tags = [...tags, input];
			input = '';
			dispatch('newtag', tags);
			e.preventDefault();
		}
	}

	const removeTag = (t) => {
		tags = tags.filter((tag) => tag != t);
		dispatch('newtag', tags);
	};
</script>

<Input
	type="tag"
	placeholder="Book Genre(separated by comma)"
	bind:value={input}
	onKeyUp={handleInput}
/>
{#if tags.length}
	<div class="tags">
		{#each tags as tag}
			<span class="tag">
				{tag}
				<button type="button" class="close" on:click={() => removeTag(tag)}>&times;</button>
			</span>
		{/each}
	</div>
{/if}

<style lang="scss">
	@use '../../lib/styles/utils' as *;

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	button {
		border-radius: 50%;
		block-size: 10px;
		inline-size: 10px;

		&:focus-visible {
			--offset: 1px;
			outline: 1px solid;
		}
	}

	.tag {
		@extend %items-center;
		padding: 0.25rem;
		gap: 0.35rem;
		background-color: hsl(var(--accent) 91%);
		border-radius: 6px;
	}
</style>
