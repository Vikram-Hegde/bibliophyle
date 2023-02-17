<script>
	import { goto } from '$app/navigation';
	import { auth, isLoggedIn } from '$lib/utils/authStore';
	import { IconAt, IconLock } from '@tabler/icons-svelte';

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
		<div class="row">
			<label for="email">Email</label>
			<div class="input">
				<div class="icon"><IconAt size={20} /></div>
				<input type="email" bind:value={email} required />
			</div>
		</div>
		<div class="row">
			<label for="password">Password</label>
			<div class="input">
				<div class="icon"><IconLock size={20} /></div>
				<input type="password" bind:value={password} required />
			</div>
		</div>
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
	label {
		display: block;
		margin-bottom: 0.25rem;
	}
	.row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.icon,
	svg {
		display: inline-block;
	}
	.icon {
		background-color: hsl(34 61% 90%);
		block-size: 2.75rem;
		inline-size: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.3rem 0 0 0.3rem;
	}
	.input {
		display: flex;
		align-items: center;
		block-size: 2.75rem;
		border-radius: 0.3rem;

		&:focus-within {
			outline: 2px solid var(--purple);
		}
	}
	input {
		inline-size: 100%;
		block-size: 100%;
		border: none;
		background-color: hsl(33 60% 92%);
		outline: none;
		padding: 0 0.5rem;
		font-size: inherit;
		color: inherit;
		border-radius: 0 0.3rem 0.3rem 0;
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
		letter-spacing: 1px;
	}

	p {
		margin-top: 1rem;
	}
</style>
