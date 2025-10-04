'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import gitHubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithCredentials } from './actions'

const initialState = {
  success: false,
  message: '',
  errors: null,
  fields: { email: '', password: '' },
}

export function SignInForm() {
  const [{ success, message, errors, fields }, action, isPending] =
    useActionState(signInWithCredentials, initialState)

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
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          name="email"
          defaultValue={fields?.email}
        />

        {errors?.properties?.email && (
          <p className="text-xs text-red-600">
            {errors.properties.email.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          defaultValue={fields?.password}
        />

        {errors?.properties?.password && (
          <p className="text-xs text-red-600">
            {errors.properties.password.errors[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button className="w-full" type="submit">
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-up">Create a new account</Link>
      </Button>

      <Separator />

      <Button variant="outline" className="w-full">
        <Image
          src={gitHubIcon}
          alt="GitHub"
          className="mr-4 size-4 dark:invert"
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}
