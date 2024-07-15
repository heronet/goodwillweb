import { PUBLIC_GOOGLE_AI_API_KEY } from '$env/static/public';
import type { BloodRequest } from '$lib/models/BloodRequest';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(PUBLIC_GOOGLE_AI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function getChat(reqs: string) {
	const chat = model.startChat({
		generationConfig: { maxOutputTokens: 500 },
		history: [
			{
				role: 'user',
				parts: [
					{
						text: `System message: You are a doctor name GoodWillAi. You are very good with blood. I will provide you with some location data as JSON of hospital patients and my location and blood group and required blood bags. Answer the follow up questions accordingly. Now introduce yourself and welcome me\n\n Here is the JSON data: ${reqs}`
					}
				]
			}
		]
	});
	return chat;
}
