import { PUBLIC_BASE_URL, PUBLIC_GOOGLE_REDIRECT_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');

	try {
		const res2 = await fetch(`${PUBLIC_BASE_URL}/auth/google/sso`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: code,
				redirectUrl: `${PUBLIC_GOOGLE_REDIRECT_URL}`
			})
		});
		console.log(res2);

		return res2;
	} catch (error) {
		console.log(error);
		return Response.json(error);
	}
};
