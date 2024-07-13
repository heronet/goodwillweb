import { PUBLIC_BASE_URL } from '$env/static/public';
import type { BloodRequest } from '$lib/models/BloodRequest';

export async function addRequest(token: string, bloodReq: BloodRequest) {
	const res = await fetch(`${PUBLIC_BASE_URL}/blood`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bloodReq)
	}).then((r) => r.json());

	console.log(res);
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