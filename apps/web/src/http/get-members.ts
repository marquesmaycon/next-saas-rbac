import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembersResponse = {
  members: {
    id: string
    userId: string
    role: Role
    name: string | null
    avatarUrl: string | null
    email: string
  }[]
}

export async function getMembers(slug: string) {
  return await api
    .get(`organizations/${slug}/members`)
    .json<GetMembersResponse>()
}
