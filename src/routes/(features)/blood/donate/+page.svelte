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

	let mapView: HTMLDivElement;
	let map: google.maps.Map;

	let selectedPlace: google.maps.places.PlaceResult;
	let name: string;
	let count: number;

	let bloodRequests: BloodRequest[] = [];

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

	async function initMarkers(loader: Loader) {
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
					`Patient: ${req.patientName}\n${req.bloodGroup}\nBlood required: ${req.bagCount} Bags`
				);

				infoWindow.open(map, marker);
				map.setOptions({
					zoom: 14,
					center: { lat: req.lat, lng: req.lng }
				});
			});

			return marker;
		});
	}

	async function initMap() {
		const loader = getMapLoader();

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

		await initAutocomplete(loader);
		await initMarkers(loader);
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

	function onSubmit() {}

	onMount(() => {
		initMap().then(() => console.log('Map On!'));
		bloodApi.getRequests($authDataStore?.token!).then((reqs) => (bloodRequests = reqs));
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
