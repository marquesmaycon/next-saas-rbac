import { defineAbilitiesFor, userSchema } from '@saas/auth'

import type { Role } from '@/generated/prisma'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({ id: userId, role })

  return defineAbilitiesFor(authUser)
}
