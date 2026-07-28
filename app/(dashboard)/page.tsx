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
    <Empty className="min-h-svh border-none">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WorkflowIcon />
        </EmptyMedia>
        <EmptyTitle>No workflow selected</EmptyTitle>
        <EmptyDescription>
          Select a workflow from the sidebar or create a new one to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={handleNewWorkflow}>
          <PlusIcon />
          New workflow
        </Button>
      </EmptyContent>
    </Empty>
  )
}
