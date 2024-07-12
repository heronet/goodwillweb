<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import * as gmapsLoader from '@googlemaps/js-api-loader';
	import { PUBLIC_GOOGLE_MAPS_API_KEY, PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import type { BloodRequest } from '$lib/models/BloodRequest';

	const { Loader } = gmapsLoader;

	let mapView: HTMLDivElement;

	let selectedPlace: google.maps.places.PlaceResult;
	let name: string;
	let count: number;

	async function initMap() {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
			version: 'weekly'
		});
		const { Map } = await loader.importLibrary('maps');
		const center = { lat: 23.80562006647949, lng: 90.4145532906334 };
		const map = new Map(mapView, {
			center: center,
			zoom: 11,
			mapId: PUBLIC_GOOGLE_MAPS_MAP_ID,
			fullscreenControl: true,
			mapTypeControl: false,
			streetViewControl: true,
			zoomControl: true,
			maxZoom: 22
		});

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
			renderAddress(map, place);
		});
	}

	async function renderAddress(map: google.maps.Map, place: google.maps.places.PlaceResult) {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
			version: 'weekly'
		});

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

	function onSubmit() {
		const request: BloodRequest = {
			placeName: selectedPlace.name ?? 'Untitled',
			lat: selectedPlace.geometry?.location?.lat() ?? 0,
			lng: selectedPlace.geometry?.location?.lng() ?? 0,
			count: count
		};

		// TODO: send this to server
	}

	onMount(() => {
		initMap().then(() => console.log('Map On!'));
	});
</script>

<main>
	<div class="mx-auto flex max-w-xl flex-col gap-2 p-4">
		<Input placeholder="Patient Name" bind:value={name} />
		<Input placeholder="Hospital Name" id="location" />
		<Input placeholder="Number of Bags" type="number" bind:value={count} />
		<div id="map" bind:this={mapView} class="h-96 w-full"></div>
	</div>
	<Button on:click={onSubmit}>Show</Button>
</main>
