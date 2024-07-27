import { browser } from '$app/environment';
import { authDataStore, oauthCredentialsStore } from '$lib/store';
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

		// Set the oauth credentials
		const oaCredentialStr = localStorage.getItem('oaCredential');
		if (oaCredentialStr) {
			const credential = JSON.parse(oaCredentialStr) as OAuthCredential;
			oauthCredentialsStore.set(credential);
		}
	}
	return {};
};
