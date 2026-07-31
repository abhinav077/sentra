"use client"

import { useCallback } from "react"
import {
  addEdge,
  ConnectionLineType,
  type Connection,
  Controls,
  type Edge,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"

import { useTheme } from "@/components/theme-provider"

const initialNodes: Node[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
]

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }]
const connectionLineStyle = { stroke: "var(--xy-connectionline-stroke)" }

export function CanvasFlow() {
  const { resolvedTheme } = useTheme()
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot))
    },
    [setEdges]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
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
