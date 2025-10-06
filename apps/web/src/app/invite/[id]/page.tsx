import dayjs from 'dayjs'
import relativetime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInvite } from '@/http/accept-invite'
import { getInvite } from '@/http/get-invite'
import { getUserInitials } from '@/lib/utils'

dayjs.extend(relativetime)

type InvitePageProps = {
  params: Promise<{ id: string }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params
  const { invite } = await getInvite(id)
  const { user } = await auth()
  const isUserAuthenticated = await isAuthenticated()

  async function signInFromInvite() {
    'use server'

    const ck = await cookies()
    ck.set('inviteId', id)

    redirect(`/auth/sign-in?email=${invite?.email}`)
  }

  async function acceptInviteAction() {
    'use server'

    await acceptInvite(id)

    redirect(`/org/${invite.organization?.slug}/`)
  }

  const isUserAndInviteEmailMatch = user?.email === invite?.email

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            <AvatarImage src={invite?.author?.avatarUrl || undefined} />
            <AvatarFallback>
              {getUserInitials(invite?.author?.name || '')}
            </AvatarFallback>
          </Avatar>

          <p className="text-muted-foreground text-center leading-relaxed text-balance">
            <span className="text-foreground font-medium">
              {invite?.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="text-foreground font-medium">
              {invite?.organization?.name}
            </span>
            .{' '}
            <span className="text-xs">
              {dayjs(invite?.createdAt).fromNow()}
            </span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button variant="secondary" className="w-full" type="submit">
              <LogIn className="mr-2 size-4" />
              Log in to accept invite
            </Button>
          </form>
        )}

        {isUserAndInviteEmailMatch && (
          <form action={acceptInviteAction}>
            <Button variant="secondary" className="w-full" type="submit">
              <CheckCircle className="mr-2 size-4" />
              Join {invite?.organization?.name}
            </Button>
          </form>
        )}

        {isUserAuthenticated && !isUserAndInviteEmailMatch && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center text-sm leading-relaxed text-balance">
              This invite was sent to{' '}
              <span className="text-foreground font-medium">
                {invite?.email}
              </span>{' '}
              but your are logged in as{' '}
              <span className="text-foreground font-medium">{user?.email}</span>
            </p>

            <div className="space-y-2">
              <Button variant="secondary" asChild className="w-full">
                <a href="/api/auth/sign-out">
                  <LogOut className="mr-1 size-4" /> Sign out from {user?.email}
                </a>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
