'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

import type { FormState } from '@/hooks/use-form-state'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.email('Please provide a valid e-mail address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

export type SignInResponse = FormState<typeof signInSchema.shape> & {
  fields: { email: string; password: string } | null
}

export async function signInWithCredentials(_: unknown, formData: FormData) {
  const rawData = {
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  }

  try {
    const { success, data, error } = signInSchema.safeParse(rawData)

    if (!success) {
      const errors = z.treeifyError(error)
      return {
        success: false,
        message: 'Validation error occurred.',
        errors,
        fields: rawData,
      }
    }

    const { token } = await signInWithPassword(data)

    const ck = await cookies()
    ck.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 })
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

  redirect('/')
}
