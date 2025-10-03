import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with email and password',
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return reply.status(400).send({ message: 'Invalid email or password' })
      }

      if (user.passwordHash === null) {
        return reply
          .status(400)
          .send({ message: 'User has no password set. Use social login' })
      }

      const isPasswordValid = await compare(password, user.passwordHash)

      if (!isPasswordValid) {
        return reply.status(400).send({ message: 'Invalid email or password' })
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        { sign: { expiresIn: '7d' } },
      )

      return reply.status(201).send({ token })
    },
  )
}
