import { AvatarFallback } from '@radix-ui/react-avatar'
import dayjs from 'dayjs'
import relativetime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/http/get-projects'
import { getUserInitials } from '@/lib/utils'

dayjs.extend(relativetime)

// TO DO => adicionar responsividade

export default async function ProjectList() {
  const org = await getCurrentOrg()
  const { projects } = await getProjects(org!)

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects?.map((pj) => (
        <Card key={pj.id}>
          <CardHeader>
            <CardTitle>{pj.name}</CardTitle>
            <CardDescription>{pj.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto flex items-center gap-1.5">
            <Avatar className="size-4">
              <AvatarImage src={pj.owner.avatarUrl || undefined} />
              <AvatarFallback>
                {getUserInitials(pj.owner.name || '')}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-xs">
              <span className="text-foreground font-medium">
                {pj.owner.name}
              </span>{' '}
              {dayjs(pj.createdAt).fromNow()}
            </span>

            <Button size="xs" variant="outline" className="ml-auto" asChild>
              <Link href={`/org/${org}/project/${pj.slug}`}>
                View <ArrowRight className="ml-2 size-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
