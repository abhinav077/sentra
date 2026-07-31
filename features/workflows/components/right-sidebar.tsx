"use client"

import { useState, useTransition } from "react"
import { PlayIcon } from "lucide-react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "../action"
import type { helloWorldTask } from "@/src/trigger/example"

export function RightSidebar() {
  const [runHandle, setRunHandle] = useState<{
    runId: string
    publicAccessToken: string
  }>()
  const [triggerError, setTriggerError] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(
    runHandle?.runId,
    {
      accessToken: runHandle?.publicAccessToken,
      enabled: Boolean(runHandle),
      skipColumns: ["payload"],
    }
  )

  const handleRun = () => {
    setTriggerError(undefined)

    startTransition(async () => {
      try {
        setRunHandle(await runWorkflowAction())
      } catch (error) {
        setTriggerError(
          error instanceof Error ? error.message : "Unable to start workflow"
        )
      }
    })
  }

  const feedback = triggerError ?? error?.message ?? run?.output?.message
  const status = run?.status ?? (isPending ? "Starting" : undefined)

  return (
    <aside className="flex size-full flex-col items-center justify-center gap-2">
      <Button type="button" onClick={handleRun} disabled={isPending}>
          <PlayIcon />
        {isPending ? "Starting" : "Run"}
      </Button>
      {(status || feedback) && (
        <p className="text-center text-sm text-muted-foreground" aria-live="polite">
          {status && `Status: ${status}`}
          {feedback && `${status ? " — " : ""}${feedback}`}
        </p>
      )}
    </aside>
  )
}
