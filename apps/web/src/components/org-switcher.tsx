import { AvatarFallback } from '@radix-ui/react-avatar'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { getOrganizations } from '@/http/get-organizations'

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

export async function OrgSwitcher() {
  const ck = await cookies()
  const { organizations } = await getOrganizations()

  const org = ck.get('org')?.value
  const crrOrg = organizations.find((o) => o.slug === org)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {crrOrg ? (
          <OrgAvatar {...crrOrg} />
        ) : (
          <span className="text-muted-foreground">Select an Org</span>
        )}

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
          {organizations?.map((org) => (
            <DropdownMenuItem asChild>
              <Link
                key={org.id}
                href={`/org/${org.slug}`}
                className="flex items-center"
              >
                <OrgAvatar {...org} />
              </Link>
            </DropdownMenuItem>
          ))}
          {!organizations?.length && (
            <DropdownMenuItem>
              <p className="text-muted-foreground text-sm">
                You are not a member of any organization yet.
              </p>
            </DropdownMenuItem>
          )}
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

const OrgAvatar = ({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null
  name: string
}) => {
  return (
    <>
      <Avatar className="mr-2 size-8">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback />
      </Avatar>
      <span className="truncate text-start">{name}</span>
    </>
  )
}
