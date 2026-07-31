"use client"

import dynamic from "next/dynamic"

import { ResizablePanel } from "@/components/ui/resizable"

const CanvasFlow = dynamic(
  () => import("./canvas-flow").then((module) => module.CanvasFlow),
  { ssr: false }
)

export function Canvas() {
  return (
    <ResizablePanel minSize="18rem">
      <div className="size-full">
        <CanvasFlow />
      </div>
    </ResizablePanel>
  )
}
