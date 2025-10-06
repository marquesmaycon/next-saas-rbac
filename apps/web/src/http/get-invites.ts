import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetInvitesResponse = {
  invites: {
    id: string
    email: string
    role: Role
    createdAt: Date
    author: {
      id: string
      name: string | null
    } | null
  }[]
}

export async function getInvites(org: string) {
  return await api
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`],
      },
    })
    .json<GetInvitesResponse>()
}
