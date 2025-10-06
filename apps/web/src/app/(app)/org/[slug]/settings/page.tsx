import { OrganizationForm } from '@/app/(app)/org/organization-form'
import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import Billing from './billing'
import { ShutdownOrgButton } from './shutdown-org-button'

export default async function Settings() {
  const org = await getCurrentOrg()
  const { organization } = await getOrganization(org!)

  const permission = await ability()
  const canUpdateOrg = permission?.can('update', 'Organization')
  const canGetBilling = permission?.can('get', 'Billing')
  const canShutDownOrg = permission?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Settings</h1>
      <div className="space-y-4">
        {canUpdateOrg && (
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm isUpdating initialData={organization} />
            </CardContent>
          </Card>
        )}

        {canGetBilling && <Billing />}

        {canShutDownOrg && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown Organization</CardTitle>
              <CardDescription>
                This will delete all members and projects. This cannot be
                undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrgButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
