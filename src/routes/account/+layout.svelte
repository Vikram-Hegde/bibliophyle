<script>
	import treeImg from '$lib/assets/book-tree.webp';
	import { fly } from 'svelte/transition';
</script>

<main>
	<slot />
	<img src={treeImg} alt="A tree full of books instead of leaves" />
</main>

<style lang="scss">
	@use '../../lib/styles/utils' as *;

	main {
		@extend %wrapper;
		display: grid;
		place-items: center;
		position: relative;
	}

	img {
		isolation: isolate;
		z-index: -1;
		inline-size: auto;
		block-size: 100%;
		object-fit: cover;
		position: absolute;
		bottom: 0;
		display: none;
	}

	@media (min-width: 1100px) {
		main {
			place-items: initial;
			align-items: center;
		}

		img {
			display: block;
			right: -2rem;
		}
	}
</style>
