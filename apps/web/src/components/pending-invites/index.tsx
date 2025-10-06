'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativetime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2 } from 'lucide-react'
import { useState } from 'react'

import { getPendingInvites } from '@/http/get-pending-invites'
import { queryClient } from '@/lib/tanstack-query'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './action'

dayjs.extend(relativetime)

export default function PendingInvites() {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  // TO DO => testar os 2 casos
  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending Invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 space-y-2">
        <span className="text-sm font-medium">
          Pending Invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && !isLoading && (
          <p className="text-muted-foreground text-sm">
            You have no pending invites.
          </p>
        )}

        {data?.invites.map((inv) => (
          <div className="space-y-2" key={inv.id}>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <span className="text-foreground font-medium">
                {inv.author?.name ?? 'Someone'}
              </span>{' '}
              invited you to join{' '}
              <span className="text-foreground font-medium">
                {inv.organization?.name}
              </span>
              . <span>{dayjs(inv.createdAt).fromNow()}</span>
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleAcceptInvite(inv.id)}
              >
                <Check className="mr-1 size-4" />
                Accept
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleRejectInvite(inv.id)}
              >
                <Check className="mr-1 size-4" />
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
