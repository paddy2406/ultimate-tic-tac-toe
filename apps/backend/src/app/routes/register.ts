import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  register,
  registerResponse,
  registerSchema,
} from '@ultimate-tic-tac-toe/types';
import { nanoid } from 'nanoid';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/register',
    { schema: registerSchema },
    async function (
      data: FastifyRequest<{ Body: register }>
    ): Promise<registerResponse> {
      console.log('login', data.body);
      return { name: data.body.name, id: nanoid() };
    }
  );
}
