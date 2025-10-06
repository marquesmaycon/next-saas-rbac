'use server'

import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

export async function revokeInviteAction(inviteId: string) {
  const org = await getCurrentOrg()
  await revokeInvite({ org: org!, inviteId })

  revalidateTag(`${org}/invites`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const org = await getCurrentOrg()
  await updateMember({ org: org!, memberId, role })

  revalidateTag(`${org}/members`)
}

export async function removeMemberAction(memberId: string) {
  const org = await getCurrentOrg()
  await removeMember({ org: org!, memberId })

  revalidateTag(`${org}/members`)
}
