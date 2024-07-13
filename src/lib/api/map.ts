import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import * as gmapsLoader from '@googlemaps/js-api-loader';

export function getMapLoader() {
	return new gmapsLoader.Loader({
		apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
		version: 'weekly'
	});
}
