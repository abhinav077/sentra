import { auth } from "@clerk/nextjs/server"
import { liveblocks } from "@/lib/liveblocks"

export async function POST() {
  const { orgId, userId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { body, status } = await liveblocks.identifyUser(
    {
      userId,
      groupIds: [orgId],
    },
    {
      userInfo: { name: userId },
    }
  )

  return new Response(body, { status })
}
