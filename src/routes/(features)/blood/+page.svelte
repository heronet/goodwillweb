<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="mx-auto max-w-screen-xl p-4">
	<div class="my-24">
		<p class="text-center text-6xl font-bold">Be a Lifesaver: Donate Blood, Save Lives</p>
		<p class="my-4 py-2 text-center">
			Your donation has the power to be the difference between life and death. Donating blood is a
			quick, safe, and easy way to be a hero. Just one donation can save up to three lives!
		</p>
		<div class="flex justify-center gap-4">
			<Button>Donate Blood</Button>
			<Button variant="destructive">Ask for help</Button>
		</div>
	</div>
</main>
