<script>
	import PageTransition from '$lib/utils/PageTransition.svelte';
	import NavDesktop from '$lib/components/Navbar/NavDesktop.svelte';
	import NavMobile from '$lib/components/Navbar/NavMobile.svelte';
	import Cart from '$lib/components/Cart.svelte';

	export let data;

	let cartVisible = false;
</script>

<NavDesktop on:open={() => (cartVisible = true)} />
<NavMobile pathname={data.pathname} on:open={() => (cartVisible = true)} />

<PageTransition pathname={data.pathname}>
	<slot />
</PageTransition>

<Cart on:close={() => (cartVisible = false)} {cartVisible} />

<style lang="scss">
	@use '../lib/styles/global' as *;
</style>
