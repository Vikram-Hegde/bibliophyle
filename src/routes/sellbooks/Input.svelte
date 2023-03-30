<script>
	export let type;
	export let placeholder;
	export let value = '';
	export let max = '';
	export let min = 1;
	export let onKeyUp = '';

	const handleTextArea = (e) => (value = e.target.value);

	function handleInputKeyUp(e) {
		onKeyUp(e);
	}

	function typeAction(e) {
		e.type = type;
	}
</script>

<div class="input-wrapper">
	<label>
		{#if type === 'number'}
			<input use:typeAction required bind:value placeholder=" " {max} {min} step="0.1" />
		{:else if type === 'tag'}
			<input type="text" bind:value placeholder=" " on:keydown={handleInputKeyUp} />
		{:else if type === 'textarea'}
			<textarea required on:input={handleTextArea} placeholder=" " />
		{:else}
			<input use:typeAction required bind:value placeholder=" " />
		{/if}
		<span>{placeholder}</span>
	</label>
</div>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		inline-size: 100%;
	}

	span {
		position: absolute;
		left: 0.5rem;
		color: hsl(33 35% 65%);
		cursor: pointer;
		transition: all 0.15s;
		pointer-events: none;
		border-radius: 20px;
	}

	textarea {
		inline-size: 100%;
		resize: vertical;
		border-radius: 0.3rem;
		block-size: 100%;
		padding: 0.75rem 0.5rem;
		outline: none;
		border: none;
		background-color: hsl(33 60% 92%);
		font: inherit;
		color: currentColor;
		max-block-size: 300px;
	}

	.input-wrapper:has(textarea) {
		min-block-size: 200px;

		label {
			align-items: start;

			span {
				top: 0.75rem;
			}
		}
	}

	.input-wrapper {
		--outline-color: var(--purple);
		display: flex;
		block-size: 2.5rem;
		border-radius: 0.3rem;
		position: relative;
		outline-offset: 2px;
		border: 1px solid hsl(33 35% 85%);
		flex: 1;

		&:focus-within {
			outline: 2px solid var(--outline-color);
		}
	}
	input {
		block-size: 100%;
		inline-size: 100%;
		border: none;
		background-color: hsl(33 60% 92%);
		outline: none;
		padding: 0 0.5rem;
		font-size: inherit;
		border-radius: 0.3rem;
		color: inherit;
	}

	:where(input, textarea):where(:not(:placeholder-shown), :focus-visible) ~ span {
		translate: 0 -22px;
		background-color: var(--background);
		font-size: 14px;
		padding: 0 2px;
		border-radius: 2px;
		color: currentColor;
	}

	.input-wrapper:has(input:user-invalid, input:invalid) {
		outline-offset: red;
	}
</style>
