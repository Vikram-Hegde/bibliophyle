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

		&:not(:is(.active, .sellbooks a)):hover {
			color: hsl(34 98% 38%);
		}
	}

	:not(.sellbooks a).active {
		color: hsl(34 80% 60%);
	}

	@media (min-width: 850px) {
		:not(.sellbooks a).active::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -23px;
			left: 2px;
			width: 100%;
			height: 3px;
			border-radius: 10px;
			background-color: currentColor;
			outline: 0;
		}
	}
</style>
