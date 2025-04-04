
import { SidebarProvider, SidebarRail } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import Navbar from "@/components/layout/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 pt-4">
            {children}
          </main>
        </div>
        <SidebarRail />
      </SidebarProvider>
    </>
  )
}
