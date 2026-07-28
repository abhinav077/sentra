import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const appSidebarPath = new URL("../components/app-sidebar.tsx", import.meta.url)
const sidebarPrimitivePath = new URL(
  "../components/ui/sidebar.tsx",
  import.meta.url
)
const dashboardPagePath = new URL(
  "../app/(dashboard)/page.tsx",
  import.meta.url
)
const dashboardLayoutPath = new URL(
  "../app/(dashboard)/layout.tsx",
  import.meta.url
)
const workflowNavPath = new URL(
  "../features/workflows/components/workflow-nav.tsx",
  import.meta.url
)

test("collapsed sidebar keeps a visible icon rail", async () => {
  const appSidebar = await readFile(appSidebarPath, "utf8")

  assert.match(appSidebar, /<Sidebar variant="inset" collapsible="icon"/)
  assert.match(appSidebar, /group-data-\[collapsible=icon\]/)
  assert.doesNotMatch(appSidebar, /collapsible="offcanvas"/)
})

test("dashboard provides a persistent glass sidebar trigger", async () => {
  const dashboardLayout = await readFile(dashboardLayoutPath, "utf8")

  assert.match(dashboardLayout, /<SidebarTrigger/)
  assert.match(dashboardLayout, /fixed/)
  assert.match(dashboardLayout, /left-4/)
  assert.match(dashboardLayout, /top-4/)
  assert.match(dashboardLayout, /z-20/)
  assert.match(dashboardLayout, /size-11/)
  assert.match(dashboardLayout, /rounded-full/)
  assert.match(dashboardLayout, /backdrop-blur-md/)
  assert.match(dashboardLayout, /md:hidden/)
  assert.doesNotMatch(dashboardLayout, /hidden.*SidebarTrigger/)
})

test("sidebar shell uses reduced-motion-safe easing", async () => {
  const sidebarPrimitive = await readFile(sidebarPrimitivePath, "utf8")

  assert.match(sidebarPrimitive, /ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\]/)
  assert.match(sidebarPrimitive, /motion-reduce:transition-none/)
})

test("dashboard home page has no duplicate header", async () => {
  const dashboardPage = await readFile(dashboardPagePath, "utf8")

  assert.doesNotMatch(dashboardPage, /<header[\s>]/)
  assert.doesNotMatch(dashboardPage, /OrganizationSwitcher/)
  assert.doesNotMatch(dashboardPage, /UserButton/)
})

test("new workflow actions trigger a toast", async () => {
  const dashboardPage = await readFile(dashboardPagePath, "utf8")
  const workflowNav = await readFile(workflowNavPath, "utf8")

  assert.match(dashboardPage, /from "sonner"/)
  assert.match(dashboardPage, /toast\.info\(/)
  assert.match(workflowNav, /from "sonner"/)
  assert.match(workflowNav, /toast\.info\(/)
})
