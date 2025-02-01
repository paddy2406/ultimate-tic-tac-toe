import Fastify from 'fastify';
import { app } from './app/app';
import { FastifySSEPlugin } from 'fastify-sse-v2';
import fastifyStatic from '@fastify/static';
import path from 'node:path';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);
server.register(FastifySSEPlugin);
server.register(fastifyStatic, {
  root: path.join(__dirname, '../../../../frontend'), // Replace 'public' with your folder name
  prefix: '/',
});

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
