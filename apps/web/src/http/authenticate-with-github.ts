import { api } from './api-client'

type AuthenticateWithGitHubRequest = {
  code: string
}

type AuthenticateWithGitHubResponse = {
  token: string
}

export async function authenticateWithGitHub({
  code,
}: AuthenticateWithGitHubRequest) {
  const res = await api
    .post('sessions/github', {
      json: { code },
    })
    .json<AuthenticateWithGitHubResponse>()

  return res
}
