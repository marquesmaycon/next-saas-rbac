import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['invites'],
          summary: 'Create a new invite link for an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({ slug: z.string() }),
          body: z.object({ email: z.email(), role: roleSchema }),
          response: { 201: z.object({ inviteId: z.string() }) },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError('Not allowed to create invites')
        }

        const { email, role } = request.body

        const domain = email.split('@')[1]

        const userWillAutoJoin =
          organization.attachUsersByDomain && organization.domain === domain

        if (userWillAutoJoin) {
          throw new BadRequestError(
            `Users with this ${domain} domain will join the organization automatically on signup`,
          )
        }

        const existingInvite = await prisma.invite.findUnique({
          where: {
            email_organizationId: { organizationId: organization.id, email },
          },
        })

        if (existingInvite) {
          throw new BadRequestError(
            'An invite has already been sent to this email',
          )
        }

        const existingMember = await prisma.member.findFirst({
          where: { organizationId: organization.id, user: { email } },
        })

        if (existingMember) {
          throw new BadRequestError(
            'This user is already a member of the organization',
          )
        }

        const invite = await prisma.invite.create({
          data: {
            email,
            role,
            authorId: userId,
            organizationId: organization.id,
          },
        })

        return reply.status(201).send({ inviteId: invite.id })
      },
    )
}
