"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"
import { Spinner } from "@/components/ui/spinner"

export function Room({
  roomId,
  children,
}: {
  roomId: string
  children: ReactNode
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks/auth"
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        try {
          const response = await fetch("/api/liveblocks/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds }),
          })

          if (!response.ok) {
            return undefined
          }

          return await response.json()
        } catch {
          return undefined
        }
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Spinner className="flex min-h-svh items-center justify-center" />
          </div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
