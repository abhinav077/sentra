import { auth, clerkClient } from "@clerk/nextjs/server"

const CLERK_USER_ID_BATCH_SIZE = 100

type UserInfoRequest = {
  userIds?: unknown
  userUds?: unknown
}

export async function POST(request: Request) {
  const { orgId, userId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  let body: UserInfoRequest

  try {
    const parsedBody: unknown = await request.json()

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return Response.json(
        { error: "Expected a JSON object body" },
        { status: 400 }
      )
    }

    body = parsedBody as UserInfoRequest
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const requestedUserIds = Array.isArray(body.userIds)
    ? body.userIds
    : body.userUds

  if (
    !Array.isArray(requestedUserIds) ||
    !requestedUserIds.every(
      (requestedUserId) => typeof requestedUserId === "string"
    )
  ) {
    return Response.json(
      { error: "Expected an array of user IDs" },
      { status: 400 }
    )
  }

  const userIds = requestedUserIds as string[]
  const usersById = new Map<string, { name: string; avatar: string }>()
  const client = await clerkClient()

  for (
    let index = 0;
    index < userIds.length;
    index += CLERK_USER_ID_BATCH_SIZE
  ) {
    const batch = userIds.slice(index, index + CLERK_USER_ID_BATCH_SIZE)
    const { data: users } = await client.users.getUserList({
      limit: batch.length,
      organizationId: [orgId],
      userId: batch,
    })

    for (const user of users) {
      usersById.set(user.id, {
        name: user.fullName ?? user.username ?? user.id,
        avatar: user.imageUrl,
      })
    }
  }

  return Response.json(
    userIds.map((requestedUserId) => usersById.get(requestedUserId) ?? null)
  )
}
