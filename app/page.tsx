"use client"

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Page() {
  return (
    <div className="min-h-svh p-6">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-4 border-b pb-4">
        <span className="font-medium">Sentra</span>
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>
      <main className="mx-auto flex max-w-3xl min-w-0 flex-col gap-4 py-12 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2" onClick={() => toast("Button clicked!")}>
            Button
          </Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </main>
    </div>
  )
}
