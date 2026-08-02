"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import type { WorkflowGraph } from "@/features/workflows/nodes/workflow-graph"
import { Canvas } from "./canvas"
import { RightSidebar } from "./right-sidebar"

type WorkflowShellProps = {
  workflowId: string
  initialGraph: WorkflowGraph
  saveGraph: (workflowId: string, graph: WorkflowGraph) => Promise<void>
}

export function WorkflowShell({
  workflowId,
  initialGraph,
  saveGraph,
}: WorkflowShellProps) {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="size-full"
      data-workflow-id={workflowId}
    >
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <Canvas
            initialGraph={initialGraph}
            saveGraph={saveGraph}
            workflowId={workflowId}
          />
          <ResizableHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            Logs
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
