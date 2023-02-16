<script>
	import PageTransition from '$lib/utils/PageTransition.svelte';
	import NavDesktop from '$lib/components/Navbar/NavDesktop.svelte';
	import NavMobile from '$lib/components/Navbar/NavMobile.svelte';

	/** @type {import('./$types').PageData}*/
	export let data;
</script>

<NavDesktop />
<NavMobile />

<PageTransition pathname={data.pathname}>
	<slot />
</PageTransition>

<style lang="scss">
	@use '../lib/styles/global' as *;
</style>
