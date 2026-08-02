"use client"

import { useEffect } from "react"
import {
  ConnectionLineType,
  Controls,
  type Edge,
  ReactFlow,
} from "@xyflow/react"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"

import { useTheme } from "@/components/theme-provider"
import type { StepNodeType } from "@/features/workflows/nodes/nodes-registery"
import type { WorkflowGraph } from "@/features/workflows/nodes/workflow-graph"
import { AvoidingEdge } from "./avoiding-edge"
import { StepNode } from "./step-nodes"

import "@xyflow/react/dist/style.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-flow/styles.css";

const nodeTypes = { step: StepNode }
const edgeTypes = { avoiding: AvoidingEdge }

const connectionLineStyle = { stroke: "var(--xy-connectionline-stroke)" }

type CanvasFlowProps = {
  workflowId: string
  initialGraph: WorkflowGraph
  saveGraph: (workflowId: string, graph: WorkflowGraph) => Promise<void>
}

export function CanvasFlow({
  workflowId,
  initialGraph,
  saveGraph,
}: CanvasFlowProps) {
  const { resolvedTheme } = useTheme()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow<StepNodeType, Edge>({
      suspense: true,
      nodes: { initial: initialGraph.nodes },
      edges: {
        initial: initialGraph.edges.map((edge) => ({
          ...edge,
          type: "avoiding",
        })),
      },
    })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void saveGraph(workflowId, { nodes, edges })
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [edges, nodes, saveGraph, workflowId])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDelete={onDelete}
      defaultEdgeOptions={{ type: "avoiding" }}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={connectionLineStyle}
      colorMode={resolvedTheme}
      fitView
      maxZoom={1}
    >
      <Controls />
      <Cursors />
    </ReactFlow>
  )
}
