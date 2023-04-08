<script>
	import heroImg from '$lib/assets/hero-img.webp';
	import heroImgMobile from '$lib/assets/hero-img-mobile.webp';
</script>

<svelte:head>
	<title>Home | Bibliophile</title>
</svelte:head>
<main>
	<section>
		<p class="subtitle">Paradise for book lovers</p>
		<h1>Bibliophile</h1>
		<p>Sharing knowledge has never been easier. Find and sell used books at lower rates</p>
	</section>
	<picture>
		<source srcset={heroImgMobile} media="(max-width: 600px)" width="270" height="340" />
		<source srcset={heroImg} media="(min-width: 601px)" width="920" height="340" />
		<img src={heroImg} alt="two hands where one is taking a book from another" />
	</picture>
</main>

<style lang="scss">
	@use '../lib/styles/utils' as *;

	h1 {
		font-size: var(--fs-800);
		margin-bottom: 0.5rem;

		@media (max-width: 600px) {
			font-size: var(--fs-700);
		}
	}

	p {
		font-size: var(--fs-100);
		line-height: 1.35;
		inline-size: min(35ch, 100%);
		margin: 0 auto;
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
		grid-template-rows: 1fr 1fr;
		align-items: center;
	}
	

	section {
		text-align: center;
	}

	picture {
		block-size: min(340px, 100%);
		margin: 0 auto;
		align-self: end;
	}

	img {
		display: block;
		max-inline-size: 100%;
		border-radius: 3rem 3rem 0 0;
		object-fit: cover;
	}
</style>
