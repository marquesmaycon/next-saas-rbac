'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import z from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import type { FormState } from '@/hooks/use-form-state'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

// TO DO => extrair schema para arquivo separado e usar o type nos inital states

const organizationSchema = z
  .object({
    name: z.string().min(4, 'Organization name must be at least 4 characters'),
    domain: z
      .string()
      .nullable()
      .refine(
        (val) => {
          if (val) {
            return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
          }
          return true
        },
        { error: 'Invalid domain format' },
      ),
    attachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.attachUsersByDomain === true && !data.domain) {
        return false
      }
      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type OrganizationSchema = z.infer<typeof organizationSchema>

type CreateOrganizationResponse = FormState<typeof organizationSchema.shape>

export async function createOrganizationAction(
  _: unknown,
  formData: FormData,
): Promise<CreateOrganizationResponse> {
  const rawData = {
    name: formData.get('name')?.toString() ?? '',
    domain: formData.get('domain')?.toString() ?? null,
    attachUsersByDomain:
      formData.get('attachUsersByDomain')?.toString() === 'on',
  }

  const { success, data, error } = organizationSchema.safeParse(rawData)

  if (!success) {
    const errors = z.treeifyError(error)
    return {
      success: false,
      message: '',
      errors,
      fields: rawData,
    }
  }

  const { name, domain, attachUsersByDomain } = data

  try {
    await createOrganization({ name, domain, attachUsersByDomain })
    revalidateTag('organizations')
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

  return {
    success: true,
    message: '',
    errors: null,
    fields: null,
  }
}

export async function updateOrganizationAction(
  _: unknown,
  formData: FormData,
): Promise<CreateOrganizationResponse> {
  const rawData = {
    name: formData.get('name')?.toString() ?? '',
    domain: formData.get('domain')?.toString() ?? null,
    attachUsersByDomain:
      formData.get('attachUsersByDomain')?.toString() === 'on',
  }

  const { success, data, error } = organizationSchema.safeParse(rawData)

  if (!success) {
    const errors = z.treeifyError(error)
    return {
      success: false,
      message: '',
      errors,
      fields: rawData,
    }
  }

  const { name, domain, attachUsersByDomain } = data

  try {
    const org = await getCurrentOrg()

    await updateOrganization({ org: org!, name, domain, attachUsersByDomain })

    revalidateTag('organizations')
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

  return {
    success: true,
    message: '',
    errors: null,
    fields: null,
  }
}
