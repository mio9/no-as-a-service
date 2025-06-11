// const express = require('express');
// const rateLimit = require('express-rate-limit');
// const fs = require('fs');
import Fastify from 'fastify'
import rateLimit from '@fastify/rate-limit'
import fs from 'fs'

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
})


// Random rejection reason endpoint
fastify.get('/no', async (request, reply) => {
  const { endless } = request.query as { endless?: string };
  if (endless === 'true') {
    // Implement endless mode with Ollama AI
  }
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  return reply.send({ reason });
});

//fastify start server
fastify.listen({ port: parseInt(PORT, 10), }, (err) => {
  if (err) throw err;
  fastify.log.info(`No-as-a-Service is running on port ${PORT}`);
});