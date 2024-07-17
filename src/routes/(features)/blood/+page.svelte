<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import bloodbens from '$lib/assets/blood_bens.png';
</script>

<main class="mx-auto max-w-screen-xl p-4">
	<div class="my-24">
		<p class="text-center text-6xl font-bold">Be a Lifesaver: Donate Blood, Save Lives</p>
		<p class="my-4 py-2 text-center">
			Your donation has the power to be the difference between life and death. Donating blood is a
			quick, safe, and easy way to be a hero. Just one donation can save up to three lives!
		</p>
		<div class="flex justify-center gap-4">
			<a href="/blood/donate"><Button>Donate Blood</Button></a>
			<a href="/blood/request"><Button variant="destructive">Ask for help</Button></a>
		</div>

		<div class="mx-auto mt-16 flex flex-col items-center justify-center">
			<!-- https://www.starhealth.in/blog/blood-donation -->
			<p class="my-6 text-4xl font-bold">
				Benifits of Donating <span class="text-red-600">Blood</span>
			</p>
			<p class="m mb-12 text-center">
				Donating blood is a simple yet profound way to make a difference. Each donation can save
				multiple lives, providing critical support to patients in need. For donors, it's not just
				about giving—it's about gaining. You'll experience the joy of knowing you've helped others,
				along with potential health benefits like improved heart health and balanced iron levels.
				Join the life-saving mission of blood donation, and feel great knowing you're making a real
				impact.
			</p>
			<img src={bloodbens} alt="" class="w-full" />
		</div>
	</div>
</main>
