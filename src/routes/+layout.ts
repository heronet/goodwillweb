import { browser } from '$app/environment';
import { authDataStore, facebookCredentialsStore } from '$lib/store';
import type { LayoutLoad } from './$types';

import type { AuthData } from '$lib/models/AuthData';

export const load: LayoutLoad = async () => {
	if (browser) {
		// Set the auth data
		const authDataStr = localStorage.getItem('authData');
		if (authDataStr) {
			const credential = JSON.parse(authDataStr) as AuthData;
			authDataStore.set(credential);
		}

		// Set the facebook credentials
		const fbCredentialStr = localStorage.getItem('fbCredential');
		if (fbCredentialStr) {
			const credential = JSON.parse(fbCredentialStr) as FacebookCredential;
			facebookCredentialsStore.set(credential);
		}
	}
	return {};
};
