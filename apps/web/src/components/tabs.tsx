import React from 'react'

import { getCurrentOrg } from '@/auth/auth'

import NavLink from './nav-link'
import { Button } from './ui/button'

// TO DO => criar classe auxiliar para armazenar estilo do layout maximo horizontal

export default async function Tabs() {
  const org = await getCurrentOrg()
  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground border border-transparent"
        >
          <NavLink href={`/org/${org}`}>Dashboard</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground border border-transparent"
        >
          <NavLink href={`/org/${org}/members`}>Members</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground border border-transparent"
        >
          <NavLink href={`/org/${org}/settings`}>Settings</NavLink>
        </Button>
      </nav>
    </div>
  )
}
