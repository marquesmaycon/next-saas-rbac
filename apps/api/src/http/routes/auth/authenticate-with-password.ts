import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

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
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new BadRequestError('Invalid email or password')
      }

      if (user.passwordHash === null) {
        throw new BadRequestError('User has no password set. Use social login')
      }

      const isPasswordValid = await compare(password, user.passwordHash)

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid email or password')
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        { sign: { expiresIn: '7d' } },
      )

      return reply.status(201).send({ token })
    },
  )
}
