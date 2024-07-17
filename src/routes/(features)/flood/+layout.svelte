<script>
	import { goto } from '$app/navigation';
	import { authDataStore } from '$lib/store';
	import { onMount } from 'svelte';

	// can't access if not logged in
	onMount(() => {
		if (!$authDataStore) {
			goto('/auth/login');
		}
	});
</script>

<slot></slot>
