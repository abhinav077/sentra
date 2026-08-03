import { Liveblocks } from "@liveblocks/node"

let liveblocks: Liveblocks | undefined

export function getLiveblocks() {
  liveblocks ??= new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  })

  return liveblocks
}
