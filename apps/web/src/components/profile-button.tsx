import { ChevronDown, LogOut } from 'lucide-react'
import React from 'react'

import { auth } from '@/auth/auth'
import { getUserInitials } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function ProfileButton() {
  const { user } = await auth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-muted-foreground text-xs">{user?.email}</span>
        </div>
        <Avatar className="size-8">
          <AvatarImage src={user?.avatarUrl || undefined} />
          <AvatarFallback>{getUserInitials(user?.name || '')}</AvatarFallback>
        </Avatar>
        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" /> Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
