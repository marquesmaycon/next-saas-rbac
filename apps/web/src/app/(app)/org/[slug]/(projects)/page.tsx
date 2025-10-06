// TO DO => criar layout dinamico para reaproveitamendo devido a componentes que precisam ser re renderizados

import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import ProjectList from './project-list'

export default async function Projects() {
  const org = await getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button asChild size="sm">
            <Link href={`/org/${org}/create-project`}>
              <Plus className="mr-2 size-4" /> New Project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p>You do not have permission to view projects.</p>
      )}
    </div>
  )
}
