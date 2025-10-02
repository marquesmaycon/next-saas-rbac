import { ability } from '@saas/auth'

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteAnotherUser = ability.can('delete', 'User')

console.log('User can delete another user:', userCanDeleteAnotherUser)

console.log('User can invite someone else:', userCanInviteSomeoneElse)
