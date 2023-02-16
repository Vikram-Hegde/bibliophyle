<script>
	import { page } from '$app/stores';
	export let href = '/';
	export let name = ' ';
</script>

<a {href} class:active={$page.url.pathname === href}>
	<slot name="icon" />
	{name}
</a>

<style>
	a {
		color: inherit;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		text-transform: uppercase;
	}

	.active {
		color: hsl(34 98% 48%);
	}
</style>
