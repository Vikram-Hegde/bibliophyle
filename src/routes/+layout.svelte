<script>
	import Cart from '$lib/components/Cart.svelte';
	import NavDesktop from '$lib/components/Navbar/NavDesktop.svelte';
	import NavMobile from '$lib/components/Navbar/NavMobile.svelte';
	import PageTransition from '$lib/utils/PageTransition.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.scss';

	export let data;

	let cartVisible = false;
</script>

<NavDesktop on:open={() => (cartVisible = true)} />
<NavMobile pathname={data.pathname} on:open={() => (cartVisible = true)} />

<PageTransition pathname={data.pathname}>
	<slot />
</PageTransition>

<Cart on:close={() => (cartVisible = false)} {cartVisible} />

<Toaster
	position="top-right"
	toastOptions={{
		style:
			'border: 1px solid var(--text); color: var(--text); background-color: hsl(var(--accent) 93% / 0.6); backdrop-filter: blur(5px)',
		iconTheme: {
			primary: 'var(--text)',
			secondary: 'var(--background)'
		}
	}}
/>