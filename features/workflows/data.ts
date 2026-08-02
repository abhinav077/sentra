import { and, desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"
import type { WorkflowGraph } from "./nodes/workflow-graph"

export function listWorkflows(orgId: string) {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.createdAt))
}

export function createWorkflow(
  orgId: string,
  name: string,
  graph: WorkflowGraph
) {
  return db.insert(workflows).values({ orgId, name, graph }).returning()
}

export async function getWorkflow(orgId: string, id: string) {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(and(eq(workflows.orgId, orgId), eq(workflows.id, id)))

  return workflow
}

export function updateWorkflowGraph(
  orgId: string,
  id: string,
  graph: WorkflowGraph
) {
  return db
    .update(workflows)
    .set({ graph, updatedAt: new Date() })
    .where(and(eq(workflows.orgId, orgId), eq(workflows.id, id)))
}
