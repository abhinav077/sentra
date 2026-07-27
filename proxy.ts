import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware(async (auth, request) => {
  const isPublicRoute = /^\/(sign-in|sign-up)(\/|$)/.test(
    request.nextUrl.pathname
  )

  if (!isPublicRoute) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
