<script lang="ts">
	import * as facebookApi from '$lib/api/auth/facebook';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<main>
	<p>Welcome to Googwill</p>
	<Button on:click={facebookApi.register}>Login with Facebook</Button>
</main>
