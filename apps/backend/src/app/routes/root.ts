import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/test', async function () {
    return { message: 'Hello API' };
  });
}
