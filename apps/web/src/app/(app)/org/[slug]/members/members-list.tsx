import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown } from 'lucide-react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { getUserInitials } from '@/lib/utils'

export default async function MembersList() {
  const slug = await getCurrentOrg()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(slug!),
    getMembers(slug!),
    getOrganization(slug!),
  ])

  const authOrg = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>
      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              const isOwner = member.userId === organization?.ownerId
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 40 }}>
                    <Avatar className="size-8">
                      <AvatarImage
                        src={member.avatarUrl || undefined}
                        alt="user avatar"
                      />
                      <AvatarFallback>
                        {getUserInitials(member.name || '')}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}{' '}
                        {member.userId === membership?.userId && '(me)'}
                        {isOwner && (
                          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                            <Crown className="size-3" /> Owner
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can('transfer_ownership', authOrg) &&
                        !isOwner && (
                          <Button variant="ghost" size="sm">
                            <ArrowLeftRight className="mr-2 size-4" />
                            Transfer ownership
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// TO DO => unificar user avatar com org e pj avatar
