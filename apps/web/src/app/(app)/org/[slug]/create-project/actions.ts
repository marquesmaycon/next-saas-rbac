'use server'

import { HTTPError } from 'ky'
import z from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import type { FormState } from '@/hooks/use-form-state'
import { createProject } from '@/http/create-project'

// TO DO => extrair schema para arquivo separado e usar o type nos inital states

const createProjectSchema = z.object({
  name: z.string().min(4, 'Project name must be at least 4 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
})

type CreateProjectResponse = FormState<typeof createProjectSchema.shape>

export async function createProjectAction(
  _: unknown,
  formData: FormData,
): Promise<CreateProjectResponse> {
  const rawData = {
    name: formData.get('name')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
  }

  const { success, data, error } = createProjectSchema.safeParse(rawData)

  if (!success) {
    const errors = z.treeifyError(error)
    return {
      success: false,
      message: '',
      errors,
      fields: rawData,
    }
  }

  const { name, description } = data

  try {
    const org = await getCurrentOrg()
    await createProject({ org: org!, name, description })
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
    message: 'Project created successfully.',
    errors: null,
    fields: null,
  }
}
