import { PUBLIC_GOOGLE_AI_API_KEY } from '$env/static/public';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(PUBLIC_GOOGLE_AI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function getChat(data: string) {
	const chat = model.startChat({
		generationConfig: { maxOutputTokens: 500 },
		history: [
			{
				role: 'user',
				parts: [
					{
						text: `System message: You are a doctor name GoodWillAi. You are very good with blood. I will provide you with a JSON containing my location and blood information, my nearest hospital and my blood group, hospital patients and blood group and required blood bags. You should also be able to tell me the nearest patient based on the provided JSON data. Answer the follow up questions accordingly. Now introduce yourself and welcome me\n\n Here is the JSON data: ${data}`
					}
				]
			}
		]
	});
	return chat;
}
