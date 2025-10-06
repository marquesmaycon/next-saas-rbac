import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetOrganizationsResponse = {
  organizations: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    role: Role
  }[]
}

export async function getOrganizations() {
  const res = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<GetOrganizationsResponse>()
  return res
}
