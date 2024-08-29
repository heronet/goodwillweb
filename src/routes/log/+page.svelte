<script lang="ts">
	import * as commonApi from '$lib/api/common';

	import type { LogItem } from '$lib/models/Log';
	import { authDataStore } from '$lib/store';
	import { onMount } from 'svelte';

	let isLoading = false;

	let log: LogItem[] = [];

	async function getLog() {
		isLoading = true;
		log = await commonApi.getLog($authDataStore?.token!);
		console.log(log);

		isLoading = false;
	}

	onMount(() => {
		getLog();
	});
</script>

<section class="mx-auto max-w-screen-sm p-4">
	<p class="py-4 text-center text-3xl font-bold text-indigo-300">Your activities</p>
	{#if isLoading}
		<p class="py-4 text-center font-bold text-indigo-300">Loading...</p>
	{/if}
	{#each log as logitem}
		{#if logitem.incident}
			<p class="my-2 w-full rounded bg-indigo-400/50 p-4 text-indigo-100">
				You provided <span class="text-red-300">{logitem.count}</span> manpower to
				<span class="text-red-300">{logitem.place}</span>
				for the <span class="text-red-300">{logitem.incident}</span> incident
			</p>
		{:else}
			<p class="my-2 w-full rounded bg-red-400/50 p-4 text-indigo-100">
				You donated <span class="text-indigo-400">{logitem.count}</span> bags of blood to a patient
				at <span class="text-indigo-400">{logitem.place}</span>
			</p>
		{/if}
	{/each}
</section>
