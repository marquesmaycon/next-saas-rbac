import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_: User, { can }) => {
    can('manage', 'all')
  },
  MEMBER: (_: User, { can }) => {
    // can('invite', 'User')
    can('create', 'Project')
  },
  BILLING: () => {
    // can('read', 'Project')
  },
}
