<script>
	import heroImgMobile from '$lib/assets/hero-img-mobile.webp';
	import heroImg from '$lib/assets/hero-img.webp';
	import { IconArrowRight } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>Home | Bibliophile</title>
</svelte:head>
<main>
	<section>
		<p class="subtitle">Paradise for book lovers</p>
		<h1>Bibliophyle</h1>
		<p>Sharing knowledge has never been easier. Find and sell used books at lower rates</p>
		<a href="/bookshelf">Go to Bookshelf <IconArrowRight size={20} /></a>
		<picture>
			<source srcset={heroImgMobile} media="(max-width: 600px)" width="270" height="340" />
			<source srcset={heroImg} media="(min-width: 601px)" width="920" height="340" />
			<img src={heroImg} alt="two hands where one is taking a book from another" />
		</picture>
	</section>
</main>

<style lang="scss">
	@use '../lib/styles/utils' as *;

	a {
		--bg: var(--purple);
		background-color: var(--bg);
		padding: 0.5rem;
		color: var(--background);
		@extend %items-center;
		gap: 0.75rem;
		width: fit-content;
		margin-inline: auto;
		line-height: 1;
		border-radius: 6px;

		&:hover {
			--bg: var(--purple-100);
		}
	}

	h1 {
		font-size: var(--fs-800);

		@media (max-width: 600px) {
			font-size: var(--fs-700);
		}
	}

	p {
		font-size: var(--fs-100);
		line-height: 1.35;
		inline-size: min(35ch, 100%);
		margin-inline: auto;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		color: var(--green);
		text-transform: uppercase;
		font-size: var(--fs--100);
		letter-spacing: 2px;
		font-weight: bold;
	}

	main {
		@extend %wrapper;
		display: grid;
		place-items: center;
		padding-top: 1.5rem;
	}

	section {
		text-align: center;
	}

	picture {
		block-size: min(340px, 100%);
		margin: 0 auto;
		justify-self: center;
	}

	img {
		display: block;
		max-inline-size: 100%;
		border-radius: 3rem;
		object-fit: cover;
		margin: 1.5rem auto;
	}
</style>
