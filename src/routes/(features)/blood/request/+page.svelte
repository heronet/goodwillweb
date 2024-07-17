<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import type { BloodRequest } from '$lib/models/BloodRequest';
	import type { Loader } from '@googlemaps/js-api-loader';
	import { getMapLoader } from '$lib/api/map';
	import * as Select from '$lib/components/ui/select';
	import * as bloodApi from '$lib/api/blood';
	import { authDataStore } from '$lib/store';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let isLoading = false;

	let mapView: HTMLDivElement;
	let map: google.maps.Map;

	let selectedPlace: google.maps.places.PlaceResult;
	let name: string;
	let count: number;
	let bloodGroup: string;

	$: disabled = isLoading || !name || !map || !count || !bloodGroup || !selectedPlace;

	async function initAutocomplete(loader: Loader) {
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
			renderAddress(loader, map, place);
		});
	}

	async function initMap() {
		const loader = getMapLoader();

		const { Map } = await loader.importLibrary('maps');
		const center = { lat: 23.80562006647949, lng: 90.4145532906334 };
		map = new Map(mapView, {
			center: center,
			zoom: 11,
			mapId: PUBLIC_GOOGLE_MAPS_MAP_ID,
			fullscreenControl: true,
			mapTypeControl: false,
			streetViewControl: true,
			zoomControl: true,
			maxZoom: 22
		});

		await initAutocomplete(loader);
	}

	// On search
	async function renderAddress(
		loader: Loader,
		map: google.maps.Map,
		place: google.maps.places.PlaceResult
	) {
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

	function onBloodSelect(e: any) {
		bloodGroup = e.value;
	}

	function onSubmit() {
		if (disabled) return;

		const request: BloodRequest = {
			placeName: selectedPlace?.name ?? 'Untitled',
			lat: selectedPlace?.geometry?.location?.lat() ?? 0,
			lng: selectedPlace?.geometry?.location?.lng() ?? 0,
			bagCount: count,
			patientName: name,
			bloodGroup: bloodGroup
		};
		isLoading = true;

		bloodApi
			.addRequest($authDataStore?.token!, request)
			.then(() => {
				toast('You requested successfully!');
				goto('/blood/donate');
			})
			.finally(() => (isLoading = false));
	}

	onMount(() => {
		initMap().then(() => console.log('Map On!'));
	});
</script>

<main>
	<div class="mx-auto flex max-w-xl flex-col gap-2 p-4">
		<p class="mt-16 text-center text-5xl">Who needs <span class="text-red-500">blood</span>?</p>
		<p class="mb-12 text-center">Please fill up the form</p>
		<Input placeholder="Patient Name" bind:value={name} />
		<Input placeholder="Hospital Name" id="location" />
		<Select.Root onSelectedChange={onBloodSelect}>
			<Select.Trigger>
				<Select.Value placeholder="Blood Group" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="A+">A+</Select.Item>
				<Select.Item value="B+">B+</Select.Item>
				<Select.Item value="AB+">AB+</Select.Item>
				<Select.Item value="O+">O+</Select.Item>
				<Select.Item value="A-">A-</Select.Item>
				<Select.Item value="B-">B-</Select.Item>
				<Select.Item value="AB-">AB-</Select.Item>
				<Select.Item value="O-">O-</Select.Item>
			</Select.Content>
		</Select.Root>
		<Input placeholder="Number of Bags" type="number" bind:value={count} />
		<div id="map" bind:this={mapView} class="h-96 w-full"></div>
		<Button on:click={onSubmit} {disabled}>{isLoading ? 'Please Wait...' : 'Submit'}</Button>
	</div>
</main>
