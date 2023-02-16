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
		position: relative;
	}

	.active {
		color: hsl(34 80% 60%);
	}

	@media (min-width: 750px) {
		.active::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -22px;
			left: 2px;
			width: 100%;
			height: 2px;
			border-radius: 10px;
			background-color: hsl(34 80% 60%);
		}
	}
</style>
