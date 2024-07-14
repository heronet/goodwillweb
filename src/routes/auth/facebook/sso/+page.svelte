<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { facebookSSO } from '$lib/api/auth/facebook';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { onMount } from 'svelte';

	let isLoading = false;
	let pvalue = 33;
	onMount(() => {
		const code = $page.url.searchParams.get('code');
		console.log('code');

		if (code) {
			isLoading = true;
			facebookSSO(code).then((user) => {
				pvalue = 100;

				goto('/');
				console.log(user);
			});
		}
	});
</script>

<div class="flex w-full justify-center">
	<div class="mx-auto mt-8 flex flex-col items-center">
		{#if isLoading}
			<p class="text-2xl font-bold">Authenticating</p>
			<p class="mb-4 text-muted-foreground">Please wait...</p>
			<Progress value={pvalue} />
		{/if}
	</div>
</div>
