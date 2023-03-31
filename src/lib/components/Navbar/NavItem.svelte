<script>
	import { page } from '$app/stores';
	export let href = '/';
	export let name = ' ';
	export let label = '';
</script>

<a {href} aria-label={label} class:active={$page.url.pathname === href}>
	<slot name="icon" />
	{name}
</a>

<style lang="scss">
	@use '../../styles/utils' as *;
	a {
		color: inherit;
		text-decoration: none;
		@extend %items-center;
		gap: 0.25rem;
		text-transform: uppercase;
		position: relative;

		&:not(:is(.active, .sellbooks a)):hover {
			color: hsl(var(--accent) 38%);
		}
	}

	:not(.sellbooks a).active {
		color: hsl(var(--accent) 35%);
	}

	@media (min-width: 850px) {
		:not(.sellbooks a).active::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -23px;
			left: 2px;
			inline-size: 100%;
			block-size: 3px;
			border-radius: 10px;
			background-color: currentColor;
			outline: 0;
		}
	}
</style>
