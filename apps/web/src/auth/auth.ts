import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const ck = await cookies()
  return !!ck.get('token')?.value
}

export async function auth() {
  const ck = await cookies()
  const token = ck.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    return await getProfile()
  } catch {}

  redirect('/auth/sign-in')
}
