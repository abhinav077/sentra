"use client"

import { PlusIcon, WorkflowIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  const handleNewWorkflow = () => {
    toast.info("New workflow", {
      description: "Workflow creation is coming soon.",
    })
  }

  return (
    <Empty className="relative isolate min-h-svh overflow-hidden border-none p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_70%_at_center,oklch(1_0_0)_0%,oklch(1_0_0_/_0.96)_42%,transparent_76%),linear-gradient(to_right,oklch(0.145_0_0_/_0.045)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.145_0_0_/_0.045)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px] dark:bg-[radial-gradient(ellipse_80%_70%_at_center,oklch(0.222_0_0)_0%,oklch(0.222_0_0_/_0.95)_42%,transparent_76%),linear-gradient(to_right,oklch(1_0_0_/_0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_0.06)_1px,transparent_1px)]"
      />
      <EmptyHeader className="relative z-10 gap-3">
        <EmptyMedia
          className="mb-1 size-11 rounded-xl border border-border/70 bg-background/70 shadow-sm backdrop-blur-sm dark:bg-card/70 [&_svg:not([class*='size-'])]:size-5"
          variant="icon"
        >
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle className="text-base">No workflow selected</EmptyTitle>
        <EmptyDescription className="max-w-xs">
          Select a workflow from the sidebar or create a new one to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="relative z-10 pt-1">
        <Button className="h-10 px-4 shadow-sm" onClick={handleNewWorkflow}>
          <PlusIcon />
          New workflow
        </Button>
      </EmptyContent>
    </Empty>
  )
}
