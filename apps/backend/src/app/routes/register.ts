import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  register,
  registerResponse,
  registerSchema,
} from '@ultimate-tic-tac-toe/types';
import { UserService } from '../services/user-service';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/register',
    { schema: registerSchema },
    async function (
      data: FastifyRequest<{ Body: register }>
    ): Promise<registerResponse> {
      return UserService.register(data.body.name);
    }
  );
}
