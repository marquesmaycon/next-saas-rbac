import { Slash } from 'lucide-react'
import Image from 'next/image'

import logo from '@/assets/logo.svg'

import { OrgSwitcher } from './org-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} className="size-6" alt="Logo" />
        <Slash className="text-border size-4 -rotate-[24deg]" />
        <OrgSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
