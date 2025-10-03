import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with GitHub',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const url = new URL('https://github.com/login/oauth/access_token')
      url.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      url.searchParams.set('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)
      url.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)
      url.searchParams.set('code', code)

      const ghOathResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const data = await ghOathResponse.json()

      const { access_token: accessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(data)

      const userDataResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const userData = await userDataResponse.json()

      const {
        id: gitHubId,
        name,
        avatar_url: avatarUrl,
        email,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.url(),
          name: z.string().nullable(),
          email: z.email().nullable(),
        })
        .parse(userData)

      if (email === null) {
        throw new BadRequestError('Email not provided by GitHub')
      }

      let user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        user = await prisma.user.create({
          data: { name, email, avatarUrl },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            userId: user.id,
            provider: 'GITHUB',
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            userId: user.id,
            provider: 'GITHUB',
            providerAccountId: gitHubId,
          },
        })
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        { sign: { expiresIn: '7d' } },
      )

      return reply.status(201).send({ token })
    },
  )
}
