<script>
	import { IconShoppingCartPlus } from '@tabler/icons-svelte';

	export let data;
	const { book } = data;
	const { relatedBooks } = data;
</script>

<svelte:head>
	<title>{book.title} | Bibliophile</title>
</svelte:head>

<main>
	<section class="book__cover">
		<img src={book.url} alt={book.title} />
		<button><IconShoppingCartPlus size={20} /> Add To Cart </button>
	</section>
	<section class="book__info">

	</section>
</main>

<style lang="scss">
	@use './style';
</style>
