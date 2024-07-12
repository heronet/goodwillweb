import { facebookCredentialsStore } from '$lib/store';
import { PUBLIC_FACEBOOK_CLIENT_ID, PUBLIC_FACEBOOK_REDIRECT_URL } from '$env/static/public';
import type { AuthData } from '$lib/models/AuthData';
import { setAuthData } from './app';

export const register = () => {
	const scopes = ['email', 'public_profile'];

	console.log(`${PUBLIC_FACEBOOK_REDIRECT_URL}/sso`);

	window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${PUBLIC_FACEBOOK_REDIRECT_URL}/sso&scope=${scopes.join()}&auth_type=rerequest`;
};

export async function facebookSSO(code: string) {
	const res: AuthData = await fetch(`/api/auth/facebook/sso?code=${code}`).then((res) =>
		res.json()
	);
	setAuthData(res);
	return res;
}

export const setFacebookCredentials = (credential: FacebookCredential) => {
	localStorage.setItem('fbCredential', JSON.stringify(credential));
	facebookCredentialsStore.set(credential);
};
export const removeFacebookCredentials = () => {
	facebookCredentialsStore.set(null);
	localStorage.removeItem('fbCredential');
};
