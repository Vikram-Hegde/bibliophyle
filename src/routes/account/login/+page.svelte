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
		<div class="row">
			<Input type="email" label="Email" bind:value={email} />
		</div>
		<div class="row">
			<Input type="password" label="Password" bind:value={password} />
		</div>
		<button>Login</button>
	</form>
	<p>Don't have an account? <a href="/account/signup">Create a new one</a></p>
</section>

<style lang="scss">
	@use '../styles/layout' as *;
</style>
