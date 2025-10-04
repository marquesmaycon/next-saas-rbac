import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import Link from 'next/link'

import gitHubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signInWithCredentials } from './actions'

export default function SignInPage() {
  return (
    <form action={signInWithCredentials} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button className="w-full" type="submit">
        Sign in with e-mail
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
