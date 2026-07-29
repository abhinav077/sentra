import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const themeProviderPath = new URL(
  "../components/theme-provider.tsx",
  import.meta.url
)
const sonnerPath = new URL("../components/ui/sonner.tsx", import.meta.url)

test("theme provider does not render next-themes script tags", async () => {
  const themeProvider = await readFile(themeProviderPath, "utf8")

  assert.doesNotMatch(themeProvider, /next-themes/)
  assert.doesNotMatch(themeProvider, /<script|dangerouslySetInnerHTML/)
  assert.match(themeProvider, /createContext/)
  assert.match(themeProvider, /localStorage/)
})

test("sonner reads theme from the local theme provider", async () => {
  const sonner = await readFile(sonnerPath, "utf8")

  assert.match(sonner, /from "@\/components\/theme-provider"/)
  assert.doesNotMatch(sonner, /from "next-themes"/)
})
