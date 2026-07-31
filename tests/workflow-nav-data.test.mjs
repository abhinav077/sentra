import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const appSidebarPath = new URL("../components/app-sidebar.tsx", import.meta.url)
const workflowNavPath = new URL(
  "../features/workflows/components/workflow-nav.tsx",
  import.meta.url
)
const workflowShellPath = new URL(
  "../features/workflows/components/workflow-shell.tsx",
  import.meta.url
)
const rightSidebarPath = new URL(
  "../features/workflows/components/right-sidebar.tsx",
  import.meta.url
)
const workflowPagePath = new URL(
  "../app/(dashboard)/workflows/[id]/page.tsx",
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

test("workflow nav links database workflows and marks the current one active", async () => {
  const workflowNav = await readFile(workflowNavPath, "utf8")

  assert.match(workflowNav, /workflows: Workflow\[\]/)
  assert.match(workflowNav, /createWorkflow: \(name: string\) => Promise<void>/)
  assert.match(workflowNav, /import Link from "next\/link"/)
  assert.match(workflowNav, /import \{ usePathname \} from "next\/navigation"/)
  assert.match(workflowNav, /from "@\/features\/workflows\/lib\/generate-slug"/)
  assert.match(workflowNav, /const name = generateSlug\(\)/)
  assert.match(workflowNav, /createWorkflow\(name\)/)
  assert.match(workflowNav, /const pathname = usePathname\(\)/)
  assert.match(
    workflowNav,
    /const isActive = pathname === `\/workflows\/\$\{workflow\.id\}`/
  )
  assert.match(workflowNav, /<SidebarMenuButton asChild isActive=\{isActive\}>/)
  assert.match(workflowNav, /<Link href=\{`\/workflows\/\$\{workflow\.id\}`\}>/)
  assert.match(workflowNav, /workflow\.id/)
  assert.match(workflowNav, /workflow\.name/)
  assert.doesNotMatch(workflowNav, /const workflows = \[/)
  assert.doesNotMatch(workflowNav, /activeWorkflow|setActiveWorkflow/)
})

test("workflow page renders the rem-sized editor shell", async () => {
  const [workflowShell, workflowPage, rightSidebar] = await Promise.all([
    readFile(workflowShellPath, "utf8"),
    readFile(workflowPagePath, "utf8"),
    readFile(rightSidebarPath, "utf8"),
  ])

  assert.match(workflowShell, /"use client"/)
  assert.match(workflowShell, /from "@\/components\/ui\/resizable"/)
  assert.match(workflowShell, /orientation="horizontal"/)
  assert.match(workflowShell, /className="size-full"/)
  assert.match(workflowShell, /minSize="30rem"/)
  assert.match(workflowShell, /orientation="vertical"/)
  assert.match(workflowShell, /minSize="18rem"/)
  assert.match(workflowShell, /defaultSize="8rem"/)
  assert.match(workflowShell, /minSize="6rem"/)
  assert.match(workflowShell, /defaultSize="16rem"/)
  assert.match(workflowShell, /minSize="14rem"/)
  assert.match(workflowShell, /maxSize="36rem"/)
  assert.match(workflowShell, /Canvas/)
  assert.match(workflowShell, /Logs/)
  assert.match(workflowShell, /<RightSidebar \/>/)
  assert.match(rightSidebar, /^"use client"/)
  assert.match(rightSidebar, /useRealtimeRun/)
  assert.match(rightSidebar, /runWorkflowAction/)
  assert.match(rightSidebar, /status/)
  assert.match(
    workflowPage,
    /import \{ WorkflowShell \} from "@\/features\/workflows\/components\/workflow-shell"/
  )
  assert.match(workflowPage, /<WorkflowShell workflowId=\{id\} \/>/)
})
