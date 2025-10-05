import { defineAbilitiesFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const ck = await cookies()
  return !!ck.get('token')?.value
}

export async function getCurrentOrg() {
  const ck = await cookies()
  return ck.get('org')?.value || null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)
  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilitiesFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
