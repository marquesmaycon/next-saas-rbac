import dayjs from 'dayjs'
import relativetime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn } from 'lucide-react'
import { cookies } from 'next/headers'
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
  const isUserAuthenticated = await isAuthenticated()
  const isUserAndInviteEmailMatch = (await auth()).user?.email === invite?.email

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-12">
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
      </div>
    </div>
  )
}
