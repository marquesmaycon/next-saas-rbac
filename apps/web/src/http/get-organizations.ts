import { api } from './api-client'

type GetOrganizationsResponse = {
  organizations: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    // role: 'ADMIN' | 'MEMBER' | 'BILLING'
  }[]
}

export async function getOrganizations() {
  const res = await api.get('profile').json<GetOrganizationsResponse>()
  return res
}
