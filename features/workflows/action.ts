"use server"

import { auth } from "@clerk/nextjs/server"
import { tasks } from "@trigger.dev/sdk"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createWorkflow, updateWorkflowGraph } from "./data"
import { createStarterGraph, type WorkflowGraph } from "./nodes/workflow-graph"
import type { helloWorldTask } from "@/src/trigger/example"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const [workflow] = await createWorkflow(orgId, name, createStarterGraph())

  revalidatePath("/workflows", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function updateWorkflowGraphAction(
  workflowId: string,
  graph: WorkflowGraph
) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  await updateWorkflowGraph(orgId, workflowId, graph)
}

export async function runWorkflowAction() {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {})

  return {
    runId: handle.id,
    publicAccessToken: handle.publicAccessToken,
  }
}
