import { AvatarFallback } from '@radix-ui/react-avatar'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function OrgSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        <span className="text-muted-foreground">Select an Org</span>
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuItem>
            <Avatar className="mr-2 size-5">
              <AvatarImage src="https://picsum.photos/150/150" />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">Org 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Avatar className="mr-2 size-5">
              <AvatarImage src="https://picsum.photos/150/150" />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">Org 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Avatar className="mr-2 size-5">
              <AvatarImage src="https://picsum.photos/150/150" />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">Org 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/organizations/new">
            <PlusCircle className="mr-2 size-4" /> Add Organization
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
