'use client'

import type { Role } from '@saas/auth'
import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { createInviteAction } from './actions'

const initialState = {
  success: false,
  message: '',
  errors: null,
  fields: { email: '', role: 'MEMBER' as Role },
}

export function CreateInviteForm() {
  const [{ success, message, errors, fields }, action, isPending] =
    useActionState(createInviteAction, initialState)

  return (
    <form action={action} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite creation failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={fields?.email}
          />

          {errors?.properties?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.properties.email.errors[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select name="role" defaultValue={fields?.role}>
            <SelectTrigger className="mt-1 min-w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>
          {errors?.properties?.role && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.properties.role.errors[0]}
            </p>
          )}
        </div>

        <Button type="submit" className="min-w-32">
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-1 size-4" />
              Send Invite
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
