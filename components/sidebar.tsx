"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search, Sun, Moon, Mountain, Layers, Target } from "lucide-react"

const objectives = [
  { name: "Sun Angle", icon: Sun },
  { name: "Phase Angle", icon: Moon },
  { name: "Depth Estimation", icon: Mountain },
  { name: "Terrain Analysis", icon: Layers },
  { name: "Crater Detection", icon: Target },
]

export function AnalysisSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <div className="flex items-center gap-2 rounded-md border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search coordinates..." className="h-8 border-0 p-0 focus-visible:ring-0" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {objectives.map((objective) => (
                <SidebarMenuItem key={objective.name}>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <objective.icon className="h-4 w-4" />
                      {objective.name}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

