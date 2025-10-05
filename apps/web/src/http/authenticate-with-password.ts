import { api } from './api-client'

type AuthenticateWithPasswordRequest = {
  email: string
  password: string
}

type AuthenticateWithPasswordResponse = {
  token: string
}

export async function authenticateWithPassword({
  email,
  password,
}: AuthenticateWithPasswordRequest) {
  const res = await api
    .post('sessions/password', {
      json: { email, password },
    })
    .json<AuthenticateWithPasswordResponse>()

  return res
}
