import { PUBLIC_BASE_URL } from '$env/static/public';
import type { LogItem } from '$lib/models/Log';

export async function getLog(token: string): Promise<LogItem[]> {
	try {
		const res: LogItem[] = await fetch(`${PUBLIC_BASE_URL}/common`, {
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
