"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AnalysisSidebar } from "@/components/sidebar"
import  {MoonViewer}  from "@/components/moon-viewer"
import { AnalysisPanel } from "@/components/analysis-panel"

export default function Home() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <AnalysisSidebar />
        <main className="flex-1 relative">
          <MoonViewer />
          <AnalysisPanel />
        </main>
      </div>
    </SidebarProvider>
  )
}

