import type { Edge } from "@xyflow/react"

import { nodeRegistry, type StepNodeType } from "./nodes-registery"

export type WorkflowGraph = {
  nodes: StepNodeType[]
  edges: Edge[]
}

const startNode = nodeRegistry.start

export function createStarterGraph(): WorkflowGraph {
  return {
    nodes: [
      {
        id: "start",
        type: "step",
        position: { x: 0, y: 0 },
        data: {
          type: startNode.type as "start",
          kind: startNode.kind,
          title: startNode.label,
          values: {},
        },
      },
    ],
    edges: [],
  }
}

export function getWorkflowGraph(graph: WorkflowGraph | null) {
  return graph ?? createStarterGraph()
}
