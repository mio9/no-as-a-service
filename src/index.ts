// const express = require('express');
// const rateLimit = require('express-rate-limit');
// const fs = require('fs');
import Fastify from 'fastify'
import rateLimit from '@fastify/rate-limit'
import fs from 'fs'
import { getOllamaResponse } from './ollama';

// const app = express();
const fastify = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
				translateTime: 'SYS:standard',
				ignore: 'pid,hostname' // Ignore specific fields from the log output
			}
		}
	},
	trustProxy: (process.env.TRUST_PROXY?.toLowerCase()) == 'true' ? true : false
});
// Trust proxy headers (for Cloudflare)
// app.set('trust proxy', true);

const PORT = process.env.PORT || '3000';

// Load reasons from JSON
const reasons = JSON.parse(fs.readFileSync('./reasons.json', 'utf-8'));

// Rate limiter: 120 requests per minute per IP
await fastify.register(rateLimit, {
	max: 120,
	timeWindow: 60 * 1000,
	allowList: ["127.0.0.1", "[::1]"]
})


// Random rejection reason endpoint
fastify.get('/no', async (request, reply) => {
	const { endless, wild } = request.query as { endless?: string, wild?: number };
	let outReason = ""
	const wildMode = wild || 0;
	if (endless === 'true') {
		// Implement endless mode with Ollama AI
		let prompt = `generate a random reason to turn down something`
		if (wildMode != -1 ) {
			prompt += " in creative way"
		}
		if (wildMode >= 1) {
			prompt += ", and express it in an abstract manner"
		}
		if (wildMode >= 2) {
			prompt += " poetically"
		}
		if (wildMode >= 3) {
			prompt += " in royal english"
		}
		const response = await getOllamaResponse(prompt);
		outReason = response; // Use the generated reason from Ollama AI
	} else {
		outReason = reasons[Math.floor(Math.random() * reasons.length)];
	}
	return reply.send({ reason: outReason });
});


//fastify start server
fastify.listen({ port: parseInt(PORT, 10), }, (err) => {
	if (err) throw err;
	fastify.log.info(`No-as-a-Service is running on port ${PORT}`);
});