import { api } from './api-client'

type GetOrganizationResponse = {
  organization: {
    id: string
    name: string
    slug: string
    attachUsersByDomain: boolean
    createdAt: string
    updatedAt: string
    ownerId: string
    domain: string | null
    avatarUrl: string | null
  }
}

export async function getOrganization(org: string) {
  const res = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationResponse>()
  return res
}
