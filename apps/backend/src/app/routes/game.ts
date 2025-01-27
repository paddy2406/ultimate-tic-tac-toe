import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GameService } from '../services/game-service';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/game',
    async function (
      request: FastifyRequest<{
        Querystring: { gameId?: string; playerId?: string };
      }>,
      reply: FastifyReply
    ) {
      reply.sse({ event: 'connected' });
      const newDataCallback = (event: string, data: string) => {
        reply.sse({ event, data });
      };

      GameService.joinGame(
        request.query.gameId,
        request.query.playerId,
        newDataCallback
      );

      request.socket.on('close', () => {
        GameService.disconnect(request.query.gameId, request.query.playerId);
      });
    }
  );
}
