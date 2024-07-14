<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import type { BloodRequest } from '$lib/models/BloodRequest';
	import { getMapLoader } from '$lib/api/map';
	import type { Loader } from '@googlemaps/js-api-loader';
	import * as bloodApi from '$lib/api/blood';
	import { authDataStore } from '$lib/store';
	import type { BloodDonation } from '$lib/models/BloodDonation';
	import { toast } from 'svelte-sonner';

	let isLoading = false;

	let loader: Loader;
	let mapView: HTMLDivElement;
	let map: google.maps.Map;

	let selectedPlace: google.maps.places.PlaceResult;
	let count: number;

	let bloodRequests: BloodRequest[] = [];
	let selectedRequest: BloodRequest;

	let searchTerm = '';
	$: filteredRequests = bloodRequests.filter(
		(r) =>
			r.bloodGroup.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
			r.placeName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
			r.patientName.toLowerCase().includes(searchTerm.trim().toLowerCase())
	);

	async function initAutocomplete() {
		const { Autocomplete } = await loader.importLibrary('places');

		const autocomplete = new Autocomplete(document.getElementById('location') as HTMLInputElement, {
			fields: ['address_components', 'geometry', 'name', 'icon'],
			types: ['hospital'],
			componentRestrictions: { country: 'bd' }
		});

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert(`No details available for input: '${place.name}'`);
				return;
			}
			renderAddress(place);
		});
	}

	async function initMarkers() {
		const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
		const { InfoWindow } = await loader.importLibrary('maps');

		const infoWindow = new InfoWindow({
			content: '',
			disableAutoPan: true
		});

		// Add some markers to the map.
		const markers = bloodRequests.map((req, i) => {
			const label = `${i + 1}`;
			const pinGlyph = new PinElement({
				glyph: label,
				glyphColor: 'white'
			});
			const marker = new AdvancedMarkerElement({
				map,
				position: { lat: req.lat, lng: req.lng },
				content: pinGlyph.element
			});

			// markers can only be keyboard focusable when they have click listeners
			// open info window when marker is clicked
			marker.addListener('click', () => {
				infoWindow.setHeaderContent(req.placeName);
				infoWindow.setContent(
					`<div class="px-4 text-black">
						<div
							class="w-full rounded-xl text-start"
							
						>
							<h1 class="w-80 text-2xl font-bold">${req.placeName}</h1>
							<p class="">Patient: ${req.patientName}</p>
							<div class="mt-2 flex justify-between ">
								<p>
									<span class="text-3xl font-bold">${req.bagCount} </span>
									bags needed
								</p>
								<span class="text-3xl font-bold">${req.bloodGroup}</span>
							</div>
						</div>
					</div>`
				);

				infoWindow.open(map, marker);
				map.setOptions({
					zoom: 14,
					center: { lat: req.lat, lng: req.lng }
				});
				selectedRequest = req;
			});

			return marker;
		});
	}

	async function initMap() {
		loader = getMapLoader();

		const { Map } = await loader.importLibrary('maps');
		const center = { lat: 23.80562006647949, lng: 90.4145532906334 };
		map = new Map(mapView, {
			center: center,
			zoom: 8,
			mapId: PUBLIC_GOOGLE_MAPS_MAP_ID,
			fullscreenControl: true,
			mapTypeControl: false,
			streetViewControl: true,
			zoomControl: true,
			maxZoom: 22
		});

		await initAutocomplete();
		await initMarkers();
	}

	// On search
	async function renderAddress(place: google.maps.places.PlaceResult) {
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');

		if (place.geometry && place.geometry.location) {
			map.setOptions({
				center: place.geometry.location,
				zoom: 15
			});
			const marker = new AdvancedMarkerElement({
				map,
				position: place.geometry.location
			});
			selectedPlace = place;
		}
	}

	async function setLocation(req: BloodRequest) {
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');
		map.setOptions({
			zoom: 15,
			center: { lat: req.lat, lng: req.lng }
		});
		const marker = new AdvancedMarkerElement({
			map,
			position: { lat: req.lat, lng: req.lng }
		});
		selectedRequest = req;
	}

	async function submitDonation() {
		const donation: BloodDonation = {
			bagCount: count,
			bloodRequestId: selectedRequest.id!
		};
		isLoading = true;
		bloodApi
			.addDonation($authDataStore?.token!, donation)
			.then(() => {
				getBloodRequests();
				toast('Your donation was successful!');
			})
			.finally(() => (isLoading = false));
	}

	async function getBloodRequests() {
		isLoading = true;
		bloodApi
			.getRequests($authDataStore?.token!)
			.then((reqs) => (bloodRequests = reqs))
			.finally(() => (isLoading = false));
	}

	onMount(() => {
		initMap().then(() => console.log('Map On!'));
		getBloodRequests();
	});
</script>

<main class="relative flex flex-col items-center justify-center">
	<div
		id="map"
		bind:this={mapView}
		class="inline-block min-h-[calc(100dvh-4rem)] w-full flex-1"
	></div>
	<div
		class="top-1/6 absolute left-0 z-10 m-8 h-[90%] w-96 overflow-y-auto rounded-xl bg-[#202124] py-4"
	>
		<div class="p-4">
			<p class="mb-4 text-3xl">Advanced Search</p>
			<Input
				placeholder="Search Hospital"
				class="bg-indigo-100 py-6 text-black"
				bind:value={searchTerm}
			/>
		</div>
		{#each filteredRequests as request}
			<div class="border-b border-gray-700 px-4">
				<button
					class="my-2 w-full rounded-xl bg-indigo-400/50 p-4 text-start"
					on:click={() => setLocation(request)}
				>
					<h1 class="w-80 text-2xl font-bold text-indigo-100">{request.placeName}</h1>
					<p class="text-indigo-200">Patient: {request.patientName}</p>
					<div class="mt-2 flex justify-between text-indigo-200">
						<p>
							<span class="text-3xl font-bold">{request.bagCount} </span>
							bags needed
						</p>
						<span class="text-3xl font-bold">{request.bloodGroup}</span>
					</div>
				</button>
			</div>
		{/each}
	</div>

	<!-- Only show when selected -->
	{#if selectedRequest}
		<div
			class="top-1/6 absolute right-0 z-10 m-8 h-fit w-96 overflow-y-auto rounded-xl bg-[#202124] p-4"
		>
			<p class="mb-4 text-3xl">Will you donate?</p>
			<Input
				placeholder="How mane bags?"
				class=" my-2 bg-indigo-100 py-6 text-black"
				bind:value={count}
			/>
			<Button
				class="w-full bg-indigo-500 text-indigo-100"
				on:click={submitDonation}
				disabled={isLoading}>{isLoading ? 'Please wait...' : 'Submit'}</Button
			>
		</div>
	{/if}
</main>
