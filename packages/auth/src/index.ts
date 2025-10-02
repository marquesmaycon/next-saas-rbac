import type { CreateAbility, MongoAbility } from '@casl/ability'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import type { User } from './models/user'
import { permissions } from './permissions'
import { ProjectSubject } from './subjects/projects'
import { UserSubject } from './subjects/user'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilitiesFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  const userPermissions = permissions[user.role]

  if (typeof userPermissions !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  userPermissions(user, builder)

  return builder.build()
}
