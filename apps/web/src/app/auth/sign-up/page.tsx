import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import Link from 'next/link'

import gitHubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" className="input" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" id="email" className="input" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" className="input" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input type="password" id="password_confirmation" className="input" />
      </div>

      <Button className="w-full" type="submit">
        Create Account
      </Button>

      <Button variant="link" size="sm" className="w-full" asChild>
        <Link href="/auth/sign-in">Already have an account? Sign in</Link>
      </Button>

      <Separator />

      <Button variant="outline" className="w-full">
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
