import { FastifyInstance, FastifyRequest } from 'fastify';
import { login, loginResponse, loginSchema } from '@ultimate-tic-tac-toe/types';
import { UserService } from '../services/user-service';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/login',
    { schema: loginSchema },
    async function (
      data: FastifyRequest<{ Body: login }>
    ): Promise<loginResponse> {
      const user = UserService.getUser(data.body.id);
      if (!user) {
        //throw new Error('User not found');
        return;
      }
      return { name: user.name, id: user.id };
    }
  );
}
