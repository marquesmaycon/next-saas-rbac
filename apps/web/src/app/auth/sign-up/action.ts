'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import z from 'zod'

import type { FormState } from '@/hooks/use-form-state'
import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((val) => val.split(' ').length > 1, {
      message: 'Please provide your full name.',
    }),
    email: z.email('Please provide a valid e-mail address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

type SignUpResponse = FormState<typeof signUpSchema.shape> & {
  fields: { name: string; email: string; password: string } | null
}

export async function signUpAction(
  _: unknown,
  formData: FormData,
): Promise<SignUpResponse> {
  const rawData = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
    password_confirmation:
      formData.get('password_confirmation')?.toString() ?? '',
  }

  const { success, data, error } = signUpSchema.safeParse(rawData)

  if (!success) {
    const errors = z.treeifyError(error)
    return {
      success: false,
      message: '',
      errors,
      fields: rawData,
    }
  }

  const { name, email, password } = data

  try {
    await signUp({ name, email, password })
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

  redirect('/auth/sign-in?registered=1')
}
