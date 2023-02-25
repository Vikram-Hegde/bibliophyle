<script>
	import {
		IconHome2,
		IconBooks,
		IconUserCircle,
		IconLogin,
		IconBuildingStore,
		IconLogout,
		IconUserPlus
	} from '@tabler/icons-svelte';
	import NavItem from './NavItem.svelte';
	import { isLoggedIn } from '$lib/utils/authStore';
</script>

<nav class="nav-desktop">
	<div class="nav-desktop__logo">
		<a href="/">
			<svg width="20" height="20" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15.9375 3.35837C17.1637 2.06649 19.2788 1.69712 21.7725 1.94837C24.0863 2.18087 26.4656 2.92899 28.125 3.62274V22.2284C26.4037 21.5721 24.1744 20.9309 21.9619 20.7096C19.9106 20.5015 17.6906 20.6365 15.9375 21.6321V3.35837ZM15 1.66337C13.1531 0.0752416 10.4756 -0.161008 8.03813 0.0827416C5.19938 0.369617 2.33438 1.34274 0.549375 2.15462C0.385592 2.22911 0.246704 2.34915 0.149289 2.50043C0.051875 2.6517 4.98214e-05 2.82781 0 3.00774L0 23.6327C4.34287e-05 23.7896 0.0394446 23.9439 0.114595 24.0816C0.189744 24.2193 0.298241 24.3359 0.430145 24.4208C0.56205 24.5057 0.713146 24.5562 0.869594 24.5675C1.02604 24.5789 1.18284 24.5508 1.32563 24.4859C2.97938 23.7359 5.64375 22.834 8.22563 22.5734C10.8675 22.3071 13.0819 22.7365 14.2688 24.2177C14.3566 24.3272 14.4679 24.4156 14.5945 24.4763C14.721 24.537 14.8596 24.5686 15 24.5686C15.1404 24.5686 15.279 24.537 15.4055 24.4763C15.5321 24.4156 15.6434 24.3272 15.7313 24.2177C16.9181 22.7365 19.1325 22.3071 21.7725 22.5734C24.3563 22.834 27.0225 23.7359 28.6744 24.4859C28.8172 24.5508 28.974 24.5789 29.1304 24.5675C29.2869 24.5562 29.438 24.5057 29.5699 24.4208C29.7018 24.3359 29.8103 24.2193 29.8854 24.0816C29.9606 23.9439 30 23.7896 30 23.6327V3.00774C30 2.82781 29.9481 2.6517 29.8507 2.50043C29.7533 2.34915 29.6144 2.22911 29.4506 2.15462C27.6656 1.34274 24.8006 0.369617 21.9619 0.0827416C19.5244 -0.162883 16.8469 0.0752416 15 1.66337Z"
					fill="currentColor"
				/>
			</svg>
		</a>
	</div>
	<ul class="nav-desktop__list">
		<li>
			<NavItem href="/" name="Home">
				<IconHome2 size={20} slot="icon" />
			</NavItem>
		</li>
		<li>
			<NavItem href="/bookshelf" name="Bookshelf">
				<IconBooks size={20} slot="icon" />
			</NavItem>
		</li>
		{#if $isLoggedIn}
			<li>
				<NavItem href="/profile" name="Profile">
					<IconUserCircle size={20} slot="icon" />
				</NavItem>
			</li>
		{/if}
	</ul>
	<ul class="nav-desktop__list nav-desktop__action">
		{#if $isLoggedIn}
			<li class="sellbooks">
				<NavItem href="/sellbooks" name="Sell Books">
					<IconBuildingStore size={20} slot="icon" />
				</NavItem>
			</li>
			<li>
				<button class="logout" on:click={() => isLoggedIn.set(false)}>
					<IconLogout size={22} />
				</button>
			</li>
		{:else}
			<li>
				<NavItem href="/account/login" name="Login">
					<IconLogin size={20} slot="icon" />
				</NavItem>
			</li>
			<li>
				<NavItem href="/account/signup" name="Sign Up">
					<IconUserPlus size={20} slot="icon" />
				</NavItem>
			</li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	@use '../../styles/utils' as *;

	.nav-desktop {
		@extend %wrapper;
		grid-template-columns: repeat(3, 1fr);
		justify-content: space-between;
		align-items: center;
		height: var(--nav);

		&__logo {
			line-height: 0;
			display: flex;
			align-items: center;
		}

		&__list {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			@extend %list-reset;
		}

		&__action {
			justify-self: end;
		}
	}

	.sellbooks {
		padding: 0.6rem 1rem;
		color: var(--background);
		background-color: var(--purple);
		border-radius: 6px;
		line-height: 0;
	}

	a {
		color: var(--text);
	}
</style>
