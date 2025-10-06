import { ability } from '@/auth/auth'

import Invites from './invites'
import MembersList from './members-list'

export default async function MembersPage() {
  const permission = await ability()

  const canGetMembers = permission?.can('get', 'User')
  const canGetInvites = permission?.can('get', 'Invite')

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Members</div>
      {canGetMembers && <MembersList />}
      {canGetInvites && <Invites />}
    </div>
  )
}
