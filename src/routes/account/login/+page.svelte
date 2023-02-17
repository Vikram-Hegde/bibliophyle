<script>
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { auth, isLoggedIn } from '$lib/utils/authStore';

	let email = '';
	let password = '';

	function submit() {
		if (email === $auth.email && password === $auth.password) {
			goto('/');
			isLoggedIn.set(true);
		} else {
			alert('Invalid credentials');
		}
	}
</script>

<svelte:head>
	<title>Sign In | Bibliophile</title>
</svelte:head>

<section class="login">
	<h1>Sign In</h1>
	<form on:submit|preventDefault={submit}>
		<Input type="email" label="Email" bind:value={email} />
		<Input type="password" label="Password" bind:value={password} />
		<button>Login</button>
	</form>
	<p>Don't have an account? <a href="/account/signup">Create a new one</a></p>
</section>

<style lang="scss">
	section {
		h1 {
			text-align: center;
		}

		@media(min-width: 750px) {
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
		padding: 0.70rem 1rem;
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
