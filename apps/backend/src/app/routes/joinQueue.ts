import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { QueueService } from '../services/queue-service';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/queue',
    async function (
      request: FastifyRequest<{ Querystring: { id?: string; name?: string } }>,
      reply: FastifyReply
    ) {
      reply.sse({ event: 'connected' });
      const newDataCallback = (event: string, data: string) => {
        reply.sse({ event, data });
      };

      QueueService.joinQueue(
        request.query.id,
        request.query.name,
        newDataCallback
      );

      request.socket.on('close', () => {
        QueueService.leaveQueue(request.query.id);
      });
    }
  );
}
