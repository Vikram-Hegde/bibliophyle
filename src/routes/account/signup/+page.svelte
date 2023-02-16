<script>
	import { goto } from '$app/navigation';
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

<h1>create new account</h1>
<form on:submit|preventDefault={submit}>
	<label for="email">Email</label>
	<input type="email" bind:value={email} required />
	<label for="password">Password</label>
	<input type="password" bind:value={password} required />
	<button>Login</button>
</form>

<p>Already have an account? <a href="/account/login">Login</a></p>
