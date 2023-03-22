<script>
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	let input;
	let tags = [];

	let dispatch = createEventDispatcher();

	function handleInput(e) {
		if (e.code === 'Comma') {
			tags = [...tags, { id: crypto.randomUUID(), tag: input }];
			input = '';
			dispatch('newtag', tags);
			e.preventDefault();
		}
	}

	const removeTag = (tid) => {
		tags = tags.filter(({ id }) => tid != id);
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
		{#each tags as { id, tag }}
			<span class="tag">
				{tag}

				<button type="button" class="close" on:click={() => removeTag(id)}>&times;</button>
			</span>
		{/each}
	</div>
{/if}

<style lang="scss">
	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	button {
		all: unset;
		border-radius: 50%;
		cursor: pointer;
		block-size: 10px;
		inline-size: 10px;
		display: flex;
		align-items: center;
		line-height: 0;

		&:focus-visible {
			outline: 1px solid;
			outline-offset: 1px;
		}
	}

	.tag {
		display: flex;
		align-items: center;
		padding: 0.25rem;
		gap: 0.35rem;
		background-color: hsl(33 98% 91%);
		border-radius: 6px;
	}
</style>
