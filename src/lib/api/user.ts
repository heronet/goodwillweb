import { PUBLIC_BASE_URL } from '$env/static/public';
import type { User } from '$lib/models/User';

export async function updateProfile(token: string, user: User) {
	const res: User = await fetch(`${PUBLIC_BASE_URL}/users/profile`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	}).then((r) => r.json());
	return res;
}

export async function getProfile(token: string) {
	const res: User = await fetch(`${PUBLIC_BASE_URL}/users/profile`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
	return res;
}
