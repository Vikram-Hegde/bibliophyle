<script>
	import { fade } from 'svelte/transition';
</script>

<div class="loader__wrapper" transition:fade={{ duration: 250 }}>
	<span class="loader" />
</div>

<style lang="scss">
	.loader {
		--content-color: hsl(var(--h) 30% 80%);
		width: 200px;
		height: 140px;
		// background: #979794;
		background-color: hsl(var(--h) 30% 85%);
		box-sizing: border-box;
		position: relative;
		border-radius: 8px;
		perspective: 1000px;

		&__wrapper {
			position: fixed;
			z-index: 5;
			height: min(100% - var(--nav), 100vh - var(--nav));
			width: 100%;
			background-color: var(--background);
			display: grid;
			place-items: center;
		}
	}

	.loader:before {
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		top: 10px;
		bottom: 10px;
		border-radius: 8px;
		background: #f5f5f5 no-repeat;
		background-size: 60px 10px;
		background-image: linear-gradient(var(--content-color) 100px, transparent 0),
			linear-gradient(var(--content-color) 100px, transparent 0), linear-gradient(var(--content-color) 100px, transparent 0),
			linear-gradient(var(--content-color) 100px, transparent 0), linear-gradient(var(--content-color) 100px, transparent 0),
			linear-gradient(var(--content-color) 100px, transparent 0);

		background-position: 15px 30px, 15px 60px, 15px 90px, 105px 30px, 105px 60px, 105px 90px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
	}
	.loader:after {
		content: '';
		position: absolute;
		width: calc(50% - 10px);
		right: 10px;
		top: 10px;
		bottom: 10px;
		border-radius: 8px;
		background: #fff no-repeat;
		background-size: 60px 10px;
		background-image: linear-gradient(var(--content-color) 100px, transparent 0),
			linear-gradient(var(--content-color) 100px, transparent 0), linear-gradient(var(--content-color) 100px, transparent 0);
		background-position: 50% 30px, 50% 60px, 50% 90px;
		transform: rotateY(0deg);
		transform-origin: left center;
		animation: paging 750ms linear infinite;
	}

	@keyframes paging {
		to {
			transform: rotateY(-180deg);
		}
	}
</style>
