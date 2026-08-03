import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import { updateWorkflowGraphAction } from "@/features/workflows/action"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { getWorkflow } from "@/features/workflows/data"
import { getWorkflowGraph } from "@/features/workflows/nodes/workflow-graph"
import { Room } from "@/features/workflows/components/room"
import { getLiveblocks } from "@/lib/liveblocks"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()

  if (!orgId) {
    notFound()
  }

  const workflow = await getWorkflow(orgId, id)

  if (!workflow) {
    notFound()
  }

  await getLiveblocks().getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
  })

  return (
    <Room roomId={id}>
      <WorkflowShell
        workflowId={id}
        initialGraph={getWorkflowGraph(workflow.graph)}
        saveGraph={updateWorkflowGraphAction}
      />
    </Room>
  )
}
