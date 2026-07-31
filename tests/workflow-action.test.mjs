import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const actionPath = new URL("../features/workflows/action.ts", import.meta.url)

test("workflow action creates an org workflow and redirects to it", async () => {
  const action = await readFile(actionPath, "utf8")

  assert.match(action, /^"use server"/)
  assert.match(action, /from "@clerk\/nextjs\/server"/)
  assert.match(action, /from "next\/cache"/)
  assert.match(action, /from "next\/navigation"/)
  assert.match(action, /from "\.\/data"/)
  assert.match(action, /export async function createWorkflowAction\(name: string\)/)
  assert.match(action, /const \{ orgId \} = await auth\(\)/)
  assert.match(action, /if \(!orgId\)/)
  assert.match(action, /await createWorkflow\(orgId, name\)/)
  assert.match(action, /revalidatePath\("\/workflows", "layout"\)/)
  assert.match(action, /redirect\(`\/workflows\/\$\{workflow\.id\}`\)/)
})

test("run workflow action returns a scoped realtime handle", async () => {
  const action = await readFile(actionPath, "utf8")

  assert.match(action, /import \{ tasks \} from "@trigger\.dev\/sdk"/)
  assert.match(
    action,
    /export async function runWorkflowAction\(\) \{[\s\S]*?const handle = await tasks\.trigger<typeof helloWorldTask>\("hello-world", \{\}\)[\s\S]*?return \{\s*runId: handle\.id,\s*publicAccessToken: handle\.publicAccessToken,\s*\}/
  )
})
