<script>
	import { page } from '$app/stores';
	export let href = '/';
	export let name = ' ';
</script>

<a {href} class:active={$page.url.pathname === href}>
	<slot name="icon" />
	{name}
</a>

<style lang="scss">
	a {
		color: inherit;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		text-transform: uppercase;
		position: relative;

		&:not(.active):hover {
			color: hsl(34 98% 38%);
		}
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
			background-color: currentColor;
		}
	}
</style>
