import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetPendingInvitesResponse = {
  invites: {
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
  }[]
}

export async function getPendingInvites() {
  return await api.get('pending-invites').json<GetPendingInvitesResponse>()
}
