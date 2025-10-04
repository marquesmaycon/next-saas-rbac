import { type FormEvent, useState, useTransition } from 'react'
import type z from 'zod'
import type { $ZodErrorTree } from 'zod/v4/core'

export type FormState<T extends z.ZodRawShape = z.ZodRawShape> = {
  success: boolean
  message: string
  errors: $ZodErrorTree<z.infer<T>> | null
  fields?: Record<string, string> | null
}

export function useFormState<T extends z.ZodRawShape>(
  action: (data: FormData) => Promise<FormState<T>>,
  initialState: FormState<T>,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState<T>>(initialState)

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)
      setFormState(state)
    })
  }

  return [formState, handleFormSubmit, isPending] as const
}
