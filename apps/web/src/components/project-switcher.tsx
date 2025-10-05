'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const crrProject = data?.projects?.find((pj) => pj.slug === projectSlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {isLoading ? (
          <>
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Loader2 className="text-muted-foreground ml-auto size-4 shrink-0 animate-spin" />
          </>
        ) : (
          <>
            {crrProject ? (
              <ProjectAvatar {...crrProject} />
            ) : (
              <span className="text-muted-foreground">Select a project</span>
            )}
            <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
          </>
        )}

        {}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data?.projects?.map((pj) => (
            <DropdownMenuItem key={pj.id} asChild>
              <Link
                href={`/org/${orgSlug}/project/${pj.slug}`}
                className="flex items-center"
              >
                <ProjectAvatar avatarUrl={pj.avatarUrl} name={pj.name} />
              </Link>
            </DropdownMenuItem>
          ))}
          {!data?.projects?.length && (
            <DropdownMenuItem>
              <p className="text-muted-foreground text-sm">
                You have no projects yet.
              </p>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-project">
            <PlusCircle className="mr-2 size-4" /> Add Project
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ProjectAvatar = ({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null
  name: string
}) => {
  return (
    <>
      <Avatar className="mr-2 size-8">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback />
      </Avatar>
      <span className="truncate text-start">{name}</span>
    </>
  )
}
