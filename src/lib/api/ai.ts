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
						text: `System message: You are a philosopher named GoodWillAi. You are very good with volunteering. I will provide you with a JSON containing my location and information, my nearest events and required volunteers. You should also be able to tell me the nearest event based on the provided JSON data. Answer the follow up questions accordingly. Now introduce yourself and welcome me\n\n Here is the JSON data: ${data}`
					}
				]
			}
		]
	});
	return chat;
}
