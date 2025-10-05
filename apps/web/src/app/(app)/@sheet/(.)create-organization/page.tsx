'use client'

import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/organization-form'

export default function CreateOrganizationModal() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Create Organization</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-6">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
