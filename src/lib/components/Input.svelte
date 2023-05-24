<script>
	import { IconAt, IconLock, IconUser, IconSearch } from '@tabler/icons-svelte';

	export let type = '';
	export let placeholder = '';
	export let value = '';
	export let label = '';
	export let minlength = '';
	export let autocomplete = 'false';

	function chooseIcon() {
		switch (type) {
			case 'email':
				return IconAt;
			case 'password':
				return IconLock;
			case 'text':
				return IconUser;
			case 'search':
				return IconSearch;
			default:
				return null;
		}
	}

	function typeAction(e) {
		e.type = type;
	}

	const Icon = chooseIcon();
</script>

<label for="email">{label}</label>
<div class="input">
	{#if Icon}
		<div class="icon"><Icon size={20} /></div>
	{/if}
	<input use:typeAction bind:value {placeholder} required {minlength} {autocomplete} />
</div>

<style lang="scss">
	@use '../styles/utils' as *;

	label {
		display: block;
		margin-bottom: 0.25rem;
	}
	.icon {
		background-color: hsl(34 61% 89%);
		block-size: 2.75rem;
		inline-size: 3rem;
		@extend %items-center;
		justify-content: center;
		border-radius: 0.3rem 0 0 0.3rem;
	}
	.input {
		@extend %items-center;
		block-size: 2.75rem;
		border-radius: 0.3rem;

		&:focus-within {
			outline: 2px solid var(--purple);
		}
	}
	input {
		inline-size: 100%;
		block-size: 100%;
		border: none;
		background-color: hsl(33 60% 92%);
		outline: none;
		padding: 0 0.5rem;
		font-size: inherit;
		color: inherit;
		border-radius: 0 0.3rem 0.3rem 0;

		&::placeholder {
			color: hsl(33 35% 75%);
		}
	}
</style>
