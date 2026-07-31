import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const canvasPath = new URL(
  "../features/workflows/components/canvas.tsx",
  import.meta.url
)
const canvasFlowPath = new URL(
  "../features/workflows/components/canvas-flow.tsx",
  import.meta.url
)
const globalsPath = new URL("../app/globals.css", import.meta.url)

test("canvas loads the layout-dependent React Flow surface only in the browser", async () => {
  const [canvas, canvasFlow, globals] = await Promise.all([
    readFile(canvasPath, "utf8"),
    readFile(canvasFlowPath, "utf8"),
    readFile(globalsPath, "utf8"),
  ])

  assert.match(canvas, /^"use client"/)
  assert.match(canvas, /import dynamic from "next\/dynamic"/)
  assert.match(canvas, /import\("\.\/canvas-flow"\)/)
  assert.match(canvas, /ssr: false/)
  assert.match(canvas, /<CanvasFlow \/>/)
  assert.match(canvasFlow, /^"use client"/)
  assert.match(canvasFlow, /from "@xyflow\/react"/)
  assert.match(canvasFlow, /from "@\/components\/theme-provider"/)
  assert.match(canvasFlow, /const \{ resolvedTheme \} = useTheme\(\)/)
  assert.match(canvasFlow, /<ReactFlow/)
  assert.match(canvasFlow, /nodes=\{nodes\}/)
  assert.match(canvasFlow, /edges=\{edges\}/)
  assert.match(canvasFlow, /onNodesChange=\{onNodesChange\}/)
  assert.match(canvasFlow, /onEdgesChange=\{onEdgesChange\}/)
  assert.match(canvasFlow, /onConnect=\{onConnect\}/)
  assert.match(
    canvasFlow,
    /connectionLineType=\{ConnectionLineType\.SmoothStep\}/
  )
  assert.match(canvasFlow, /connectionLineStyle=\{connectionLineStyle\}/)
  assert.match(canvasFlow, /colorMode=\{resolvedTheme\}/)
  assert.match(canvasFlow, /maxZoom=\{1\}/)
  assert.match(canvasFlow, /fitView/)
  assert.match(canvasFlow, /<Controls \/>/)
  assert.match(globals, /@import "@xyflow\/react\/dist\/style\.css";/)
  assert.match(globals, /--xy-background-color: var\(--background\);/)
  assert.match(globals, /--xy-edge-stroke: var\(--muted-foreground\);/)
  assert.match(
    globals,
    /--xy-connectionline-stroke: var\(--muted-foreground\);/
  )
})
