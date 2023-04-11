<script>
	import { fly } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div
		class="page"
		in:fly={{ x: -10, duration: 200, delay: 200 }}
		out:fly={{ x: 5, duration: 200 }}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	div {
		position: absolute;
		inset: calc(var(--nav) + 2px) 0 0 0;
	}
</style>
