"use client"

import { useCallback, useEffect } from "react"
import {
  addEdge,
  ConnectionLineType,
  type Connection,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"

import { useTheme } from "@/components/theme-provider"
import type { StepNodeType } from "@/features/workflows/nodes/nodes-registery"
import type { WorkflowGraph } from "@/features/workflows/nodes/workflow-graph"
import { AvoidingEdge } from "./avoiding-edge"
import { StepNode } from "./step-nodes"

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
  const [nodes, , onNodesChange] = useNodesState<StepNodeType>(
    initialGraph.nodes
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialGraph.edges.map((edge) => ({ ...edge, type: "avoiding" }))
  )
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edgesSnapshot) =>
        addEdge({ ...connection, type: "avoiding" }, edgesSnapshot)
      )
    },
    [setEdges]
  )

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
      defaultEdgeOptions={{ type: "avoiding" }}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={connectionLineStyle}
      colorMode={resolvedTheme}
      fitView
      maxZoom={1}
    >
      <Controls />
    </ReactFlow>
  )
}
