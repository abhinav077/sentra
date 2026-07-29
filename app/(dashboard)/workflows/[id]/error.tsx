"use client"

import { WorkflowIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Error() {
  return (
    <Empty className="min-h-svh border-none p-6">
      <EmptyHeader className="gap-3">
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle className="text-base">Something went wrong</EmptyTitle>
        <EmptyDescription className="max-w-xs">
          We couldn&apos;t load this workflow. Please try again.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
