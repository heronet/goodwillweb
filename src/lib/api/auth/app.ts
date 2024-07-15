import type { AuthData } from '$lib/models/AuthData';
import { authDataStore } from '$lib/store';

export const setAuthData = (authData: AuthData) => {
	localStorage.setItem('authData', JSON.stringify(authData));
	authDataStore.set(authData);
};

export const removeAuthData = () => {
	localStorage.removeItem('authData');
	authDataStore.set(null);
};
