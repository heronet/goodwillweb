import type { AuthData } from '$lib/models/AuthData';
import { authDataStore, oauthCredentialsStore } from '$lib/store';

export const setAuthData = (authData: AuthData) => {
	localStorage.setItem('authData', JSON.stringify(authData));
	authDataStore.set(authData);
};

export const removeAuthData = () => {
	localStorage.removeItem('authData');
	authDataStore.set(null);
};

export const setOAuthCredentials = (credential: OAuthCredential) => {
	localStorage.setItem('oaCredential', JSON.stringify(credential));
	oauthCredentialsStore.set(credential);
};
export const removeOAuthCredentials = () => {
	oauthCredentialsStore.set(null);
	localStorage.removeItem('oaCredential');
};
