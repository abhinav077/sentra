"use client"

import dynamic from "next/dynamic"

import { ResizablePanel } from "@/components/ui/resizable"
import type { WorkflowGraph } from "@/features/workflows/nodes/workflow-graph"

const CanvasFlow = dynamic(
  () => import("./canvas-flow").then((module) => module.CanvasFlow),
  { ssr: false }
)

type CanvasProps = {
  workflowId: string
  initialGraph: WorkflowGraph
  saveGraph: (workflowId: string, graph: WorkflowGraph) => Promise<void>
}

export function Canvas({ workflowId, initialGraph, saveGraph }: CanvasProps) {
  return (
    <ResizablePanel minSize="18rem">
      <div className="size-full">
        <CanvasFlow
          workflowId={workflowId}
          initialGraph={initialGraph}
          saveGraph={saveGraph}
        />
      </div>
    </ResizablePanel>
  )
}
