'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { createProjectAction } from './actions'

const initialState = {
  success: false,
  message: '',
  errors: null,
  fields: { name: '', domain: '', attachUsersByDomain: false },
}

export function ProjectForm() {
  const [{ success, message, errors, fields }, action, isPending] =
    useActionState(createProjectAction, initialState)

  return (
    <form action={action} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" defaultValue={fields?.name} />
        {errors?.properties?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.name.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Project description"
          defaultValue={fields?.description ?? ''}
        />
        {errors?.properties?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.description.errors[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit">
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          'Save Project'
        )}
      </Button>
    </form>
  )
}
