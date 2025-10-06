'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { type ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname()
  const isCurrent = props.href.toString() === pathname

  return <Link data-current={isCurrent} {...props}></Link>
}
