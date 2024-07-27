import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_GOOGLE_REDIRECT_URL } from '$env/static/public';
import type { AuthData } from '$lib/models/AuthData';
import { setAuthData } from './app';

export const register = () => {
	const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${PUBLIC_GOOGLE_REDIRECT_URL}&scope=openid%20profile%20email`;

	window.location.href = authUrl;
};

export async function googleSSO(code: string) {
	const res: AuthData = await fetch(`/api/auth/google/sso?code=${code}`).then((res) => res.json());
	console.log(res);

	setAuthData(res);
	return res;
}
