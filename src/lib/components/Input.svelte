<script>
	import { IconAt, IconLock } from '@tabler/icons-svelte';

	export let type = '';
	export let placeholder = '';
	export let value = '';
	export let label = '';
	export let minlength = 0;

	function chooseIcon() {
		switch (type) {
			case 'email':
				return IconAt;
			case 'password':
				return IconLock;
			default:
				return null;
		}
	}

	function typeAction(e) {
		e.type = type;
	}

	const Icon = chooseIcon();
</script>

<div class="row">
	<label for="email">{label}</label>
	<div class="input">
		{#if Icon}
			<div class="icon"><Icon size={20} /></div>
		{/if}
		<input use:typeAction bind:value {placeholder} required />
	</div>
</div>

<style lang="scss">
	label {
		display: block;
		margin-bottom: 0.25rem;
	}
	.row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.icon,
	svg {
		display: inline-block;
	}
	.icon {
		background-color: hsl(34 61% 90%);
		block-size: 2.75rem;
		inline-size: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.3rem 0 0 0.3rem;
	}
	.input {
		display: flex;
		align-items: center;
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
	}
</style>
