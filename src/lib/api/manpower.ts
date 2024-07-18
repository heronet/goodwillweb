import { PUBLIC_BASE_URL } from '$env/static/public';
import type { ManpowerRequest } from '$lib/models/ManpowerRequest';
import type { ManpowerResponse } from '$lib/models/ManpowerResponse';

export async function addRequest(token: string, req: ManpowerRequest) {
	const res = await fetch(`${PUBLIC_BASE_URL}/manpower/request`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(req)
	}).then((r) => r.json());
}

export async function getRequests(token: string): Promise<ManpowerRequest[]> {
	try {
		const res: ManpowerRequest[] = await fetch(`${PUBLIC_BASE_URL}/manpower`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((r) => r.json());
		return res;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function addVolunteer(token: string, response: ManpowerResponse) {
	const res = await fetch(`${PUBLIC_BASE_URL}/manpower/volunteer`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(response)
	}).then((r) => r.json());

	console.log(res);
}
