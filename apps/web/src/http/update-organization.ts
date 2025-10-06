import { api } from './api-client'

type UpdateOrganizationRequest = {
  org: string
  name: string
  domain: string | null
  attachUsersByDomain: boolean
}

export async function updateOrganization({
  org,
  name,
  domain,
  attachUsersByDomain,
}: UpdateOrganizationRequest) {
  await api.put(`organizations/${org}`, {
    json: { name, domain, attachUsersByDomain },
  })
}
