'use server'

import { HTTPError } from 'ky'
import z from 'zod'
import type { $ZodErrorTree } from 'zod/v4/core'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.email('Please provide a valid e-mail address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

export type SignInResponse = {
  success: boolean
  message: string | null
  errors: $ZodErrorTree<z.infer<typeof signInSchema>> | null
  fields: { email: string; password: string } | null
}

export async function signInWithCredentials(
  _: unknown,
  formData: FormData,
): Promise<SignInResponse> {
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

    await signInWithPassword(data)

    return {
      success: true,
      message: 'Sign in successful.',
      errors: null,
      fields: null,
    }
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
}
