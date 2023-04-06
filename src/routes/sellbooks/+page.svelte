<script>
	import { IconArrowBackUp, IconPhoto, IconArrowRight } from '@tabler/icons-svelte';
	import Input from './Input.svelte';
	import TagInput from './TagInput.svelte';
	import { books } from '$lib/utils/uploadedBooks.js';

	let form;

	let url = '';
	let title;
	let description;
	let author;
	let price;
	let rating;
	let tags = [];
	let loadError = false;

	let previewText = 'Cover Preview';

	const handleNewBook = (e) => {
		if (!form.reportValidity()) return;

		$books = [
			...$books,
			{
				id: crypto.randomUUID(),
				title,
				author,
				price: parseFloat(price),
				url: loadError ? '/bookcover/error.png' : url,
				genre: tags,
				rating: parseFloat(rating),
				summary: description,
				related: [],
				discount: (Math.ceil(Math.random() * 30) / 100).toFixed(2)
			}
		];
		tags = [];
		form.reset();
	};
</script>

<svelte:head>
	<title>Upload Book | Bibliophyle</title>
</svelte:head>

<main>
	<h1>Upload your book</h1>
	<div class="cover">
		<IconPhoto size={50} stroke={1} />
		<p>{previewText}</p>
		{#if url}
			<img
				src={url}
				alt=""
				on:error={() => {
					loadError = true;
					previewText = 'Cover Not Found';
				}}
			/>
		{/if}
	</div>
	<form bind:this={form}>
		<Input type="text" placeholder="Book Title" bind:value={title} />
		<Input type="url" placeholder="Book cover URL" bind:value={url} />
		<Input type="text" placeholder="Book Author" bind:value={author} />
		<div class="row">
			<Input type="number" placeholder="Book Rating" max={5} bind:value={rating} />
			<Input type="number" placeholder="Book Price" bind:value={price} />
		</div>
		<TagInput on:newtag={(e) => (tags = e.detail)} />
		<Input type="textarea" placeholder="Book Description" bind:value={description} />
		<div class="row btn-row">
			<button class="btn btn--secondary" type="reset"><IconArrowBackUp size={20} /> Reset</button>
			<button type="button" class="btn btn--primary" on:click={handleNewBook}
				>Submit <IconArrowRight size={20} /></button
			>
		</div>
	</form>
</main>

<style lang="scss">
	@use '../../lib/styles/utils' as *;

	form {
		inline-size: min(65ch, 100%);
		display: grid;
		gap: 1rem;
	}

	.row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.btn-row {
		justify-content: space-between;
	}

	.btn {
		padding: 0.5rem 1rem;
		background-color: var(--bg);
		color: var(--color, inherit);
		border-radius: 6px;
		gap: 0.5rem;

		&--primary {
			--color: var(--background);
			--bg: var(--purple);
		}

		&--secondary {
			border: 1px solid;
		}
	}


	main {
		@extend %wrapper;
		display: grid;
		justify-items: center;
		padding-block: 2rem;
		align-content: start;
		gap: 1rem;

		@media (max-width: 850px) {
			padding-bottom: 5rem;
		}
	}

	.cover {
		inline-size: calc(177px / 1.25);
		position: relative;
		block-size: calc(266px / 1.25);
		overflow: hidden;
		outline: 1px solid;
		border-radius: 8px;
		outline-style: dashed;
		display: grid;
		place-content: center;
		justify-items: center;
	}

	img {
		display: block;
		position: absolute;
		object-fit: cover;
		aspect-ratio: 1 / 1.5;
		max-inline-size: 100%;
	}
</style>
