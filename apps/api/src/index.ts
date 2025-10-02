import { defineAbilitiesFor } from '@saas/auth'

const ability = defineAbilitiesFor({ role: 'MEMBER', id: 'user-1' })

console.log(ability.can('get', 'Project'))
