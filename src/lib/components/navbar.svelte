<script>
	import { removeAuthData } from '$lib/api/auth/app';
	import { authDataStore } from '$lib/store';
	import Button from './ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import avater from '$lib/assets/avatar.svg';
	import { goto } from '$app/navigation';
</script>

<section>
	<div class="fixed flex h-16 w-full items-center justify-between border-b bg-black p-4">
		<p class="font-bold"><a href="/">GoodWill</a></p>
		<div>
			{#if $authDataStore}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="flex items-center">
						<img src={avater} alt="avater" class="h-9 w-9" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={() => goto('/profile')}>Profile</DropdownMenu.Item>
							<DropdownMenu.Item on:click={() => goto('/log')}>Log</DropdownMenu.Item>
							<DropdownMenu.Item on:click={removeAuthData}>Logout</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<a href="/auth/login"><Button>Login</Button></a>
			{/if}
		</div>
	</div>
	<div class="h-16"></div>
</section>
