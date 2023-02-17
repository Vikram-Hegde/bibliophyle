<script>
	import treeImg from '$lib/assets/book-tree.png';
</script>

<main>
		<slot />
		<img src={treeImg} alt="A tree full of books instead of leaves" />
</main>

<style lang="scss">
	@use '../../lib/styles/utils' as *;

	:global {
		html,
		body {
			overflow-x: hidden;
		}
	}

	main {
		@extend %wrapper;
		display: grid;
		place-items: center;
	}

	img {
		z-index: -1;
		width: auto;
		height: calc(100% + var(--nav));
		object-fit: cover;
		position: absolute;
		// right: -4rem;
		bottom: 0;
		// display: none;
		mix-blend-mode: overlay;
		opacity: 0.5;
	}
	
	@media(min-width: 1100px) {
		main {
			place-items: initial;
			align-items: center;
		}

		img {
			mix-blend-mode: normal;
			right: -4rem;
			opacity: 1;
		}
	}
</style>
