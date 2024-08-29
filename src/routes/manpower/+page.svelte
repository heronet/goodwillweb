<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import flood from '$lib/assets/flood.png';
</script>

<main class="mx-auto max-w-screen-xl p-4">
	<div class="my-24">
		<p class="text-center text-6xl font-bold">Rise to the Occasion: Volunteer for Flood Relief</p>
		<p class="my-4 py-2 text-center">
			In times of crisis, your willingness to help can make all the difference. Volunteering for
			flood relief efforts means providing vital support to communities affected by natural
			disasters. Your contribution, whether it's delivering supplies, providing shelter, or offering
			a helping hand in cleanup efforts, can restore hope and bring relief to those in need.
			Volunteering not only makes a positive impact on others but also enriches your own life
			through the experience of teamwork, compassion, and resilience. Step up and be a hero in your
			community. Together, we can weather any storm and rebuild stronger than ever.
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
	</div>
</main>
