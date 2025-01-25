import { FastifyInstance, FastifyRequest } from 'fastify';
import { login, loginResponse, loginSchema } from '@ultimate-tic-tac-toe/types';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/login',
    { schema: loginSchema },
    async function (
      data: FastifyRequest<{ Body: login }>
    ): Promise<loginResponse> {
      console.log('login', data.body);
      return { name: 'peter', id: data.body.id };
    }
  );
}
