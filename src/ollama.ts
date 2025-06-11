import wretch from 'wretch';

export interface ChatResponse {
	model: string
	created_at: string
	message: Message
	done_reason: string
	done: boolean
	total_duration: number
	load_duration: number
	prompt_eval_count: number
	prompt_eval_duration: number
	eval_count: number
	eval_duration: number
}

export interface Message {
	role: string
	content: string
}


// setup wretch client for ollama
const ollamaClient = wretch(`${process.env.OLLAMA_URL}/api/chat`);

export async function getOllamaResponse(prompt: string): Promise<string> {
	const response = await ollamaClient
		.post({
			"model": process.env.OLLAMA_MODEL,
			"messages": [
				{
					"role": "system",
					"content": "You are a sentence generator that generates a single sentence. No explanations or any other things needed."
				},
				{
					"role": "user",
					"content": prompt
				}
			],
			"stream": false
		})
		.json<ChatResponse>();

	console.dir(response);
	let returnedMessage = response.message.content;
	returnedMessage = sanitizeOutput(returnedMessage);
	if (returnedMessage) {
		return returnedMessage;
	} else {
		throw new Error("No message content in Ollama response");
	}
}

function sanitizeOutput(output: string): string {
	// Implement sanitization logic here
	return trimEnclosingQuotes(output.trim())
}

function trimEnclosingQuotes(str: string) {
	if (typeof str !== 'string') {
		throw new TypeError('Input must be a string');
	}

	const firstChar = str.charAt(0);
	const lastChar = str.charAt(str.length - 1);

	// Check if both the first and last characters are either single or double quotes
	if ((firstChar === "'" && lastChar === "'") || (firstChar === '"' && lastChar === '"')) {
		return str.slice(1, -1);
	}

	return str;
}