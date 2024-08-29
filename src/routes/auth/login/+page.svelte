<script lang="ts">
	import * as facebookApi from '$lib/api/auth/facebook';
	import * as googleApi from '$lib/api/auth/google';
	import Button from '$lib/components/ui/button/button.svelte';
	import fb from '$lib/assets/fb.svg';
	import google from '$lib/assets/google.svg';
</script>

<main class="flex flex-col items-center justify-center">
	<p class="mt-24 text-4xl font-bold">Welcome to Googwill</p>
	<p class="mb-4 mt-2">Get started with your good deeds now!</p>
	<div class="gap-2">
		<Button on:click={googleApi.register}
			><img src={google} alt="" class="mr-3 h-full" /> Login with Google</Button
		>
		<!-- <Button on:click={facebookApi.register}
			><img src={fb} alt="" class="mr-3 h-full" /> Login with Facebook</Button
		> -->
	</div>
</main>
