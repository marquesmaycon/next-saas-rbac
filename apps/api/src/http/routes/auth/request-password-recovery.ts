import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecovery(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recovery',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request password recovery',
        body: z.object({
          email: z.email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return reply.status(201).send()
      }

      await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVERY',
          userId: user.id,
        },
      })

      return reply.status(201).send()
    },
  )
}
