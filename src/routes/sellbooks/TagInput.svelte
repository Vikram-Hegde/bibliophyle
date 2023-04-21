<script>
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import Input from './Input.svelte';

	let input;
	export let tags = [];

	let dispatch = createEventDispatcher();

	function addTag() {
		if (!input.trim()) return;
		input = input.charAt(0).toUpperCase() + input.slice(1);
		tags = [...tags, input];
		input = '';
		dispatch('newtag', tags);
	}

	function handleInput(e) {
		if (e.code === 'Enter') {
			addTag();
			e.preventDefault();
		}
	}

	const removeTag = (t) => {
		tags = tags.filter((tag) => tag != t);
		dispatch('newtag', tags);
	};
</script>

<div class="row">
	<Input
		type="tag"
		placeholder="Book Genre(hit enter/+ to add)"
		bind:value={input}
		onKeyUp={handleInput}
	/>
	<button type="button" class="btn add-tag" on:click={addTag}>+</button>
</div>
{#if tags.length}
	<div class="tags">
		{#each tags as tag (tag)}
			<span class="tag" animate:flip={{ duration: 150 }}>
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

	button:not(.add-tag) {
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

	.row {
		display: flex;
		gap: 0.5rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		background-color: var(--bg);
		color: var(--color, inherit);
		border-radius: 6px;
	}

	.add-tag {
		background-color: hsl(var(--accent) 90%);
		font-size: var(--fs-100);
	}
</style>
