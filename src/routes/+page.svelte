<script>
	import heroImg from '$lib/assets/hero-img.png';
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
	<img src={heroImg} alt="two hands where one is taking a book from another" />
</main>

<style lang="scss">
	@use '../lib/styles/utils' as *;

	.subtitle {
		color: var(--green);
		text-transform: uppercase;
		font-size: var(--fs--100);
		letter-spacing: 2px;
	}

	h1 {
		font-size: calc(var(--fs-700) + 1rem);
		margin-bottom: 0.5rem;
	}

	p {
		font-size: var(--fs-100);
		line-height: 1.5;
		width: min(35ch, 100%);
		margin: 0 auto;
	}

	main {
		@extend %wrapper;
		padding: 2rem 0 0 0;
		display: grid;
		height: calc(100vh - var(--nav) - 2px);
		grid-template-rows: 1fr 1fr;
		grid-template-columns: repeat(12, 1fr);
	}

	section {
		grid-column: 1 / -1;
		text-align: center;
		align-self: center;
	}

	img {
		display: block;
		height: 100%;
		max-height: 340px;
		margin: 0 auto;
		grid-column: 1 / -1;
		object-fit: cover;
		max-width: 100%;
		align-self: end;
		border-radius: 3rem 3rem 0 0;
	}
</style>
