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
		<div class="row">
			<Input type="email" label="Email" bind:value={email} />
		</div>
		<div class="row">
			<Input type="password" label="Password" bind:value={password} minlength={6} />
		</div>
		<button>Create account</button>
	</form>
	<p>Already have an account? <a href="/account/login">Login</a></p>
</section>

<style lang="scss">
	@use '../styles/layout' as *;
</style>
