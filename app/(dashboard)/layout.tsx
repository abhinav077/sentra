import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider className="h-svh">
      <AppSidebar />
      <SidebarInset className="min-h-0 overflow-hidden border shadow-none!">
        {children}
      </SidebarInset>
      <SidebarTrigger
        aria-label="Open sidebar"
        className="fixed top-4 left-4 z-20 size-11 rounded-full border border-white/15 bg-zinc-900/70 text-zinc-100 shadow-[0_10px_30px_rgba(9,9,11,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-[transform,opacity,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-800/80 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 motion-reduce:transition-none md:hidden"
        title="Open sidebar"
      />
    </SidebarProvider>
  )
}
