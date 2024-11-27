import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      description: 'Returns a hello message',
      response: {
        200: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ['Root'],
    },
  }, async (request, reply) => {
    return { message: 'hello' };
  });
}
