<script>
	import treeImg from '$lib/assets/book-tree.png';
</script>

<main>
	<div class="content">
		<slot />
	</div>
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
	}

	// .hero-img {
	// 	position: sticky;
	// 	top: 0;
	// }

	// .content {
	// 	--col: 2 / 7;
	// }

	img {
		z-index: -1;
		width: auto;
		height: calc(var(--nav) + 100%);
		object-fit: cover;
		position: absolute;
		right: -4rem;
		bottom: 0;
	}
</style>
