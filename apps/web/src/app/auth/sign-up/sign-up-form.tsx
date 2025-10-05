'use client'

import { Separator } from '@radix-ui/react-separator'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import gitHubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signInWithGitHub } from '../actions'
import { signUpAction } from './action'

const initalState = {
  success: false,
  message: '',
  errors: null,
  fields: { name: '', email: '', password: '', password_confirmation: '' },
}

export function SignUpForm() {
  const [{ success, message, errors, fields }, action, isPending] =
    useActionState(signUpAction, initalState)

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
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={fields?.name} />
        {errors?.properties?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.name.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          name="email"
          defaultValue={fields?.email}
        />
        {errors?.properties?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
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
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.password.errors[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          defaultValue={fields?.password_confirmation}
        />
        {errors?.properties?.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.properties.password_confirmation.errors[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit">
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          'Create Account'
        )}
      </Button>

      <Button variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-in">Already have an account? Sign in</Link>
      </Button>

      <Separator />

      <Button
        variant="outline"
        formAction={signInWithGitHub}
        className="w-full"
      >
        <Image
          src={gitHubIcon}
          alt="GitHub"
          className="mr-4 size-4 dark:invert"
        />
        Sign up with GitHub
      </Button>
    </form>
  )
}
