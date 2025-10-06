import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get details of an organization where user is member',
          security: [{ bearerAuth: [] }],
          params: z.object({ slug: z.string() }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.uuid(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullable(),
                attachUsersByDomain: z.boolean(),
                avatarUrl: z.url().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                ownerId: z.uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return reply.send({ organization })
      },
    )
}
