<script>
	import { authDataStore } from '$lib/store';
	import Button from './ui/button/button.svelte';
</script>

<section>
	<div class="fixed flex h-16 w-full items-center justify-between border-b p-4">
		<p class="font-bold"><a href="/">GoodWill</a></p>
		<div>
			{#if $authDataStore}
				<a href="/profile"><Button>Profile</Button></a>
			{:else}
				<a href="/auth/login"><Button>Login</Button></a>
			{/if}
		</div>
	</div>
	<div class="h-16"></div>
</section>
