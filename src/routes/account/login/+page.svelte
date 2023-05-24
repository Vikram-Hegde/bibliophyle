<script>
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { auth, isLoggedIn } from '$lib/utils/authStore';
	import toast from 'svelte-french-toast';

	let email = '';
	let password = '';

	function submit() {
		if (email === $auth.email && password === $auth.password) {
			goto('/');
			isLoggedIn.set(true);
			toast.success(`Wecome back ${$auth.name}`);
		} else {
			toast.error('Invalid Credentials, try again');
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
			<Input
				placeholder="novelninja@gmail.com"
				type="email"
				label="Email"
				bind:value={email}
				autocomplete="true"
			/>
		</div>
		<div class="row">
			<Input placeholder="******" type="password" label="Password" bind:value={password} />
		</div>
		<button>Sign In</button>
	</form>
	<p>Don't have an account? <a href="/account/signup">Create a new one</a></p>
</section>

<style lang="scss">
	@use '../styles/layout' as *;
</style>
