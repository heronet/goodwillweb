<script lang="ts">
	import send from '$lib/assets/send.svg';
	import arrow from '$lib/assets/arr_d.svg';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as aiApi from '$lib/api/ai';
	import * as userApi from '$lib/api/user';
	import { onMount } from 'svelte';
	import type { ChatSession } from '@google/generative-ai';
	import type { ManpowerRequest } from '$lib/models/ManpowerRequest';
	import { authDataStore } from '$lib/store';

	let isLoading = false;
	let expanded = true;
	export let requests: ManpowerRequest[];

	let reqText = '';
	let resText = '';
	let chat: ChatSession;
	let history: { role: string; message: string }[] = [];

	let textwall: HTMLDivElement;

	async function sendMessage() {
		history = [...history, { role: 'user', message: reqText }];
		const result = await chat.sendMessageStream(reqText);

		for await (const chunk of result.stream) {
			const chunkText = chunk.text();
			resText += chunkText;
		}
		history = [...history, { role: 'ai', message: resText }];

		resText = '';
		textwall.scrollTop = textwall.scrollHeight;
	}
	onMount(() => {
		isLoading = true;
		userApi
			.getProfile($authDataStore?.token!)
			.then((userRes) => {
				const data = JSON.stringify({
					myInfo: userRes,
					patientInfo: requests
				});

				aiApi
					.getChat(data)
					.then((res) => {
						chat = res;
						console.log('Chat On!');
					})
					.finally(() => (isLoading = false));
			})
			.finally(() => (isLoading = false));
	});
</script>

<div class="fixed bottom-0 right-12 w-96 rounded-t-xl bg-[#202124] shadow">
	<button
		class="flex w-full items-center justify-between border-b border-gray-500 px-4"
		on:click={() => (expanded = !expanded)}
	>
		<div class="my-4 flex items-center gap-2">
			<!-- <img src={magic} alt="magic" /> -->
			<span class="text-2xl">Chat with AI</span>
		</div>

		<img src={arrow} alt="arr_d" />
	</button>
	{#if expanded}
		<div class="h-[300px] overflow-y-scroll pr-4 text-sm" bind:this={textwall}>
			{#if history.length === 0}
				<p class="py-8 text-center text-indigo-300">Start chatting with AI</p>
				<p class="p-8 text-center text-muted-foreground">
					Ask it questions like <span class="text-indigo-300">What is the event for me?</span>, or
					<span class="text-indigo-300">When will I be eligible attend?</span> etc.
				</p>
			{/if}
			{#each history as text}
				{#if text.role === 'user'}
					<p
						class="float-end mx-4 mt-4 w-fit rounded-3xl bg-purple-400/50 px-4 py-2 text-purple-200"
					>
						{text.message}
					</p>
				{:else}
					<div class="float-left flex items-start gap-4 p-4">
						<!-- <img src={magic} alt="mag" /> -->
						<p
							class="mt-4 whitespace-pre-wrap rounded-3xl bg-indigo-400/50 px-4 py-2 text-indigo-200"
						>
							{text.message}
						</p>
					</div>
				{/if}
			{/each}
			<!-- Streaming reponse -->
			{#if resText}
				<div class="float-left flex items-start gap-4 p-4">
					<!-- <img src={magic} alt="mag" /> -->
					<p
						class="mt-4 whitespace-pre-wrap rounded-3xl bg-indigo-400/50 px-4 py-2 text-indigo-200"
					>
						{resText}
					</p>
				</div>
			{/if}
		</div>

		<form on:submit|preventDefault={sendMessage} class="flex items-center gap-2 p-4 text-sm">
			<Input placeholder="Ask AI" class="bg-indigo-100 py-5 text-black" bind:value={reqText} />
			<Button type="submit" class="bg-indigo-100 py-5 hover:bg-indigo-200">
				<img src={send} alt="sendbtn" />
			</Button>
		</form>
	{/if}
</div>
