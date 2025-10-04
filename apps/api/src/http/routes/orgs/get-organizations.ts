import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get organizations where user is member',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  name: z.string(),
                  id: z.string(),
                  slug: z.string(),
                  avatarUrl: z.url().nullable(),
                  role: roleSchema,
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const organizations = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: { role: true },
              where: { userId },
            },
          },
          where: { members: { some: { userId } } },
        })

        const orgsWithRoles = organizations.map(({ members, ...org }) => ({
          ...org,
          role: members[0]?.role,
          members: undefined,
        }))

        return reply.status(200).send({ organizations: orgsWithRoles })
      },
    )
}
