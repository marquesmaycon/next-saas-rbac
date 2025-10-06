import React from 'react'

import { ability, getCurrentOrg } from '@/auth/auth'

import NavLink from './nav-link'
import { Button } from './ui/button'

// TO DO => criar classe auxiliar para armazenar estilo do layout maximo horizontal

export default async function Tabs() {
  const org = await getCurrentOrg()
  const permission = await ability()

  const canUpdateOrg = permission?.can('update', 'Organization')
  const canGetBilling = permission?.can('get', 'Billing')
  const canGetMembers = permission?.can('get', 'User')
  const canGetProjects = permission?.can('get', 'Project')

  const tabs = [
    { name: 'Dashboard', href: `/org/${org}`, can: canGetProjects },
    { name: 'Members', href: `/org/${org}/members`, can: canGetMembers },
    {
      name: 'Settings',
      href: `/org/${org}/settings`,
      can: canUpdateOrg || canGetBilling,
    },
  ]

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {tabs.map((tab) => {
          if (!tab.can) return null
          return (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground border border-transparent"
            >
              <NavLink href={tab.href}>{tab.name}</NavLink>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
