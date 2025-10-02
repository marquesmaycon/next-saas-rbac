import { defineAbilitiesFor } from '@saas/auth'

const ability = defineAbilitiesFor({ role: 'ADMIN' })

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteAnotherUser = ability.can('delete', 'User')

console.log('User can delete another user:', userCanDeleteAnotherUser)

console.log('User can invite someone else:', userCanInviteSomeoneElse)
