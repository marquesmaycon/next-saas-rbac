import { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembershipResponse = {
  membership: {
    id: string
    userId: string
    role: Role
    organizationId: string
  }
}

export async function getMembership(org: string) {
  const res = await api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()
  return res
}
