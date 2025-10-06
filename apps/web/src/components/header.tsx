import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.svg'
import { ability } from '@/auth/auth'

import { OrgSwitcher } from './org-switcher'
import PendingInvites from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import ThemeSwitcher from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src={logo} className="size-8" alt="Logo" />
        </Link>

        <Slash className="text-border size-4 -rotate-[24deg]" />

        <OrgSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="text-border size-4 -rotate-[24deg]" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />

        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}
