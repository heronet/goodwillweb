<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import flood from '$lib/assets/flood.png';
	import protest from '$lib/assets/protest.png';
</script>

<main class="mx-auto max-w-screen-xl p-4">
	<div class="my-24">
		<p class="text-center text-6xl font-bold">Rise to the Occasion: Be a Volunteer</p>
		<p class="my-4 py-2 text-center">
			In times of crisis, your willingness to help others can make all the difference. Offering
			support—whether it’s lending a listening ear, providing essential resources, or stepping in to
			assist with daily tasks—can have a profound impact on those in need. Your acts of kindness and
			compassion not only provide immediate relief but also foster a sense of hope and solidarity.
			Helping others enriches your own life through the fulfillment of making a difference and
			strengthening community bonds. Step up and be a source of support and care. Together, we can
			overcome any challenge and build a more compassionate and resilient society.
		</p>
		<div class="flex justify-center gap-4">
			<a href="/manpower/volunteer"><Button>Volunteer</Button></a>
			<a href="/manpower/request"
				><Button variant="secondary" class="bg-blue-700 text-white hover:bg-blue-800"
					>Ask for help</Button
				></a
			>
		</div>

		<div class="mx-auto mt-16 flex flex-col items-center justify-center">
			<p class="my-6 text-4xl font-bold">Understanding the Challenges: The Impact of Floods</p>
			<p class="m mb-12 text-center">
				Floods are among the most devastating natural disasters, causing widespread damage and
				disruption. The immediate aftermath includes loss of life, destruction of homes and
				infrastructure, and displacement of communities. Floodwaters can contaminate drinking water
				supplies, leading to health crises and outbreaks of waterborne diseases. Economic impacts
				are significant, with damage to agriculture, businesses, and public infrastructure costing
				billions. Long-term issues include the disruption of education and social services, and the
				psychological toll on affected individuals. By understanding these challenges, we can better
				prepare, respond, and support recovery efforts to mitigate the impact of floods.
			</p>
			<img src={flood} alt="" class="w-full" />
			<a
				class="mt-4"
				href="https://www.semanticscholar.org/paper/Impacts-of-flood-on-the-lives-and-livelyhoods-of-in-Rahman/5ba4bf76183c597d69b28a606e02266f5fc09696"
			>
				<Button variant="link">Source</Button></a
			>
		</div>

		<div class="mx-auto mt-16 flex flex-col items-center justify-center">
			<p class="my-6 text-4xl font-bold">Understanding the Challenges: The Impact of Protests</p>
			<p class="m mb-12 text-center">
				In light of recent developments, it's important to recognize and celebrate the positive
				strides being made. The ongoing efforts are resulting in stronger communities, innovative
				solutions, and inspiring leadership. These achievements are paving the way for a future
				marked by equity, sustainability, and inclusive growth. Acknowledging these successes is
				crucial as we continue to push for even greater progress and ensure that the benefits of
				these advancements reach everyone.
			</p>
			<img src={protest} alt="" class="w-full" />
			<a class="mt-4" href="https://journals.sagepub.com/doi/full/10.1177/00113921211024692">
				<Button variant="link">Source</Button></a
			>
		</div>
	</div>
</main>
