<script>
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { auth } from '$lib/utils/authStore';

	let email = '';
	let password = '';

	function submit() {
		$auth = { email, password };
		goto('/');
	}
</script>

<svelte:head>
	<title>Sign Up | Bibliophile</title>
</svelte:head>

<section class="signup">
	<h1>Create a new account</h1>
	<form on:submit|preventDefault={submit}>
		<Input type="email" label="Email" bind:value={email} />
		<Input type="password" label="Password" bind:value={password} />
		<button>Create account</button>
	</form>
	<p>Already have an account? <a href="/account/login">Login</a></p>
</section>


<style lang="scss">
	section {
		h1 {
			text-align: center;
		}

		@media (min-width: 750px) {
			margin-top: calc(-1 * var(--nav));
			h1 {
				text-align: left;
			}
		}
	}

	form {
		inline-size: min(100%, clamp(20rem, 100%, 25rem));
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	button {
		background-color: var(--purple);
		color: var(--background);
		border: none;
		border-radius: 0.25rem;
		padding: 0.7rem 1rem;
		font-size: inherit;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 2px;
		font-size: var(--fs--200)
	}

	p {
		margin-top: 1rem;
	}
</style>
