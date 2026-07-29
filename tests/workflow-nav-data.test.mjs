import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const appSidebarPath = new URL("../components/app-sidebar.tsx", import.meta.url)
const workflowNavPath = new URL(
  "../features/workflows/components/workflow-nav.tsx",
  import.meta.url
)

test("sidebar loads workflows for the active organization", async () => {
  const appSidebar = await readFile(appSidebarPath, "utf8")

  assert.match(appSidebar, /from "@clerk\/nextjs\/server"/)
  assert.match(appSidebar, /from "@\/features\/workflows\/data"/)
  assert.match(appSidebar, /from "@\/features\/workflows\/action"/)
  assert.match(appSidebar, /const \{ orgId \} = await auth\(\)/)
  assert.match(appSidebar, /const workflows = orgId \? await listWorkflows\(orgId\) : \[\]/)
  assert.match(
    appSidebar,
    /<WorkflowNav\s+workflows=\{workflows\}\s+createWorkflow=\{createWorkflowAction\}\s+\/>/
  )
})

test("workflow nav renders database workflows without dummy active state", async () => {
  const workflowNav = await readFile(workflowNavPath, "utf8")

  assert.match(workflowNav, /workflows: Workflow\[\]/)
  assert.match(workflowNav, /createWorkflow: \(name: string\) => Promise<void>/)
  assert.match(workflowNav, /from "@\/features\/workflows\/lib\/generate-slug"/)
  assert.match(workflowNav, /const name = generateSlug\(\)/)
  assert.match(workflowNav, /createWorkflow\(name\)/)
  assert.match(workflowNav, /workflow\.id/)
  assert.match(workflowNav, /workflow\.name/)
  assert.doesNotMatch(workflowNav, /const workflows = \[/)
  assert.doesNotMatch(workflowNav, /activeWorkflow|setActiveWorkflow/)
})
