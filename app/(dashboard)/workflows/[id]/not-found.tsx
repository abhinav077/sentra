import { WorkflowIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="min-h-svh border-none p-6">
      <EmptyHeader className="gap-3">
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle className="text-base">Workflow not found</EmptyTitle>
        <EmptyDescription className="max-w-xs">
          This workflow may have been deleted or is no longer available.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
