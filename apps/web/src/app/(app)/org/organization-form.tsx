'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createOrganizationAction } from '../create-organization/actions'

const initialState = {
  success: false,
  message: '',
  errors: null,
  fields: { name: '', domain: '', attachUsersByDomain: false },
}

export function OrganizationForm() {
  const [{ success, message, errors, fields }, action, isPending] =
    useActionState(createOrganizationAction, initialState)

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
        <Label htmlFor="name">Organization Name</Label>
        <Input id="name" name="name" defaultValue={fields?.name} />
        {errors?.properties?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.name.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          name="domain"
          inputMode="url"
          placeholder="example.com"
          defaultValue={fields?.domain ?? ''}
        />
        {errors?.properties?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.domain.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="attachUsersByDomain"
            id="attachUsersByDomain"
            className="translate-y-0.5"
            checked={fields?.attachUsersByDomain === true}
          />
          <label htmlFor="attachUsersByDomain" className="space-y-1">
            <span className="text-sm leading-none font-medium">
              Auto join new members
            </span>
            <p className="text-muted-foreground text-sm">
              This will automatically add users with email addresses matching
              your organization's domain.
            </p>
          </label>
        </div>
      </div>

      <Button className="w-full" type="submit">
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          'Save Organization'
        )}
      </Button>
    </form>
  )
}
