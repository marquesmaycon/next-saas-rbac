import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

export async function ShutdownOrgButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const org = await getCurrentOrg()
    await shutdownOrganization({ org: org! })

    redirect('/')
  }

  // TO DO => Add a confirmation dialog, separate action, use useActionState to show loading state, etc

  return (
    <form action={shutdownOrganizationAction}>
      <Button variant="destructive" type="submit" className="w-56">
        <XCircle className="mr-2 size-4" /> Shutdown Organization
      </Button>
    </form>
  )
}
