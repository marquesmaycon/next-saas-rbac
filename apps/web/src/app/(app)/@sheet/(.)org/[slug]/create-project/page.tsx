'use client'

import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProjectSheet() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-6">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
