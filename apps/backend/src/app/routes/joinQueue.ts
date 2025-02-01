import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { QueueCallback, QueueService } from '../services/queue-service';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/queue',
    async function (
      request: FastifyRequest<{ Querystring: { id?: string; name?: string } }>,
      reply: FastifyReply
    ) {
      reply.sse({ event: 'connected' });
      const newDataCallback: QueueCallback = (event, data) => {
        reply.sse({ event, data: JSON.stringify(data) });
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
