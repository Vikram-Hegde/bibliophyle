<script>
	import { goto } from '$app/navigation';
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

<h1>Sign In</h1>
<form on:submit|preventDefault={submit}>
	<label for="email">Email</label>
	<input type="email" bind:value={email} required />
	<label for="password">Password</label>
	<input type="password" bind:value={password} required />
	<button>Login</button>
</form>

<p>Don't have an account? <a href="/account/signup">Create a new one</a></p>

<style lang="scss">

</style>