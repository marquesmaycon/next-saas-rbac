import { api } from './api-client'

type SignInWithPasswordRequest = {
  email: string
  password: string
}

type SignInWithPasswordResponse = {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const res = await api
    .post('sessions/password', {
      json: { email, password },
    })
    .json<SignInWithPasswordResponse>()

  return res
}
