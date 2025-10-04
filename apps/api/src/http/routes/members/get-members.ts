import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/members',
      {
        schema: {
          tags: ['members'],
          summary: 'Get all members within an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({ slug: z.string() }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.uuid(),
                  userId: z.uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  avatarUrl: z.url().nullable(),
                  email: z.email(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            'Not allowed to see organizations members',
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: { id: true, name: true, email: true, avatarUrl: true },
            },
          },
          where: { organizationId: organization.id },
          orderBy: { role: 'asc' },
        })

        const membersData = members.map(
          ({ user: { id: userId, ...user }, ...member }) => ({
            ...user,
            ...member,
            userId,
          }),
        )

        return reply.status(200).send({ members: membersData })
      },
    )
}
