'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import z from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import type { FormState } from '@/hooks/use-form-state'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

const createInviteSchema = z.object({
  email: z.email('Invalid email address'),
  role: roleSchema,
})

type CreateInviteResponse = FormState<typeof createInviteSchema.shape>

export async function createInviteAction(
  _: unknown,
  formData: FormData,
): Promise<CreateInviteResponse> {
  const rawData = {
    email: formData.get('email')?.toString() ?? '',
    role: formData.get('role')?.toString() as Role,
  }

  const { success, data, error } = createInviteSchema.safeParse(rawData)

  if (!success) {
    const errors = z.treeifyError(error)
    return {
      success: false,
      message: '',
      errors,
      fields: rawData,
    }
  }

  const { email, role } = data

  try {
    const org = await getCurrentOrg()

    await createInvite({ org: org!, email, role })

    revalidateTag(`${org}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()
      return {
        success: false,
        message,
        errors: null,
        fields: rawData,
      }
    }

    return {
      success: false,
      message: 'Unexpected error occurred.',
      errors: null,
      fields: rawData,
    }
  }

  // TO DO => retornar o projeto criado para redirecionar para a página dele

  return {
    success: true,
    message: 'Invite created successfully.',
    errors: null,
    fields: null,
  }
}

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
