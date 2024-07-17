<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_MAPS_MAP_ID } from '$env/static/public';
	import type { Loader } from '@googlemaps/js-api-loader';
	import { getMapLoader } from '$lib/api/map';
	import * as Select from '$lib/components/ui/select';
	import * as userApi from '$lib/api/user';
	import { authDataStore } from '$lib/store';
	import { toast } from 'svelte-sonner';
	import type { User } from '$lib/models/User';
	import { goto } from '$app/navigation';

	let isLoading = false;

	let mapView: HTMLDivElement;
	let map: google.maps.Map;

	let selectedPlace: google.maps.places.PlaceResult;

	let user: Partial<User> = {};

	$: disabled = isLoading || !user?.name || !map || !user?.bloodGroup;

	async function initAutocomplete(loader: Loader) {
		const { Autocomplete } = await loader.importLibrary('places');

		const autocomplete = new Autocomplete(document.getElementById('location') as HTMLInputElement, {
			fields: ['address_components', 'geometry', 'name', 'icon'],
			types: ['establishment'],
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
		setLocation(loader);
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
		user.bloodGroup = e.value;
	}

	function onSubmit() {
		if (disabled) return;

		const profile: User = {
			placeName: selectedPlace?.name ?? '',
			lat: selectedPlace?.geometry?.location?.lat() ?? 0,
			lng: selectedPlace?.geometry?.location?.lng() ?? 0,
			name: user?.name ?? '',
			bloodGroup: user?.bloodGroup ?? ''
		};

		isLoading = true;

		userApi
			.updateProfile($authDataStore?.token!, profile)
			.then(() => {
				toast('Profile updated successfully!');
				goto('/');
			})
			.finally(() => (isLoading = false));
	}

	async function setLocation(loader: Loader) {
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');
		map.setOptions({
			zoom: 15,
			center: { lat: user.lat!, lng: user.lng! }
		});
		const marker = new AdvancedMarkerElement({
			map,
			position: { lat: user.lat!, lng: user.lng! }
		});
	}

	onMount(() => {
		userApi.getProfile($authDataStore?.token!).then((res) => {
			user = res;
			initMap().then(() => console.log('Map On!'));
		});
	});
</script>

<main>
	<div class="mx-auto flex max-w-xl flex-col gap-2 p-4">
		<p class="my-4 text-center text-4xl">Your Profile</p>
		<Input placeholder="Your Name" bind:value={user.name} />
		<Input placeholder="Location" id="location" bind:value={user.placeName} />
		<Select.Root
			onSelectedChange={onBloodSelect}
			selected={{ value: user?.bloodGroup, label: user?.bloodGroup }}
		>
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
		<div id="map" bind:this={mapView} class="h-96 w-full"></div>
		<Button on:click={onSubmit} {disabled}>{isLoading ? 'Please Wait...' : 'Save'}</Button>
	</div>
</main>
