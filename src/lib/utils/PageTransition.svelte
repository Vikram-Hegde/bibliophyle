<script>
	import { fly } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div class="page" in:fly={{ x: -10, duration: 250, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>
		<slot />
	</div>
{/key}

<style>
	div {
		position: absolute;
		inline-size: 100%;
	}
</style>
