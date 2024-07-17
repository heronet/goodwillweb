import { PUBLIC_BASE_URL } from '$env/static/public';
import type { BloodDonation } from '$lib/models/BloodDonation';
import type { BloodRequest } from '$lib/models/BloodRequest';
import type { FloodRequest } from '$lib/models/FloodReques';

export async function addRequest(token: string, floodReq: FloodRequest) {
	const res = await fetch(`${PUBLIC_BASE_URL}/flood/request`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(floodReq)
	}).then((r) => r.json());
}

export async function getRequests(token: string): Promise<BloodRequest[]> {
	try {
		const res: BloodRequest[] = await fetch(`${PUBLIC_BASE_URL}/blood`, {
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
export async function addDonation(token: string, donation: BloodDonation) {
	const res = await fetch(`${PUBLIC_BASE_URL}/blood/donate`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(donation)
	}).then((r) => r.json());

	console.log(res);
}
