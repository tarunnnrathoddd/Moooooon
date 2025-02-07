"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RegionData {
  craterDensity: number
  roughness: number
  elevation: number
  illumination: number
  temperature: number
  mineralComposition: {
    iron: number
    titanium: number
    aluminum: number
  }
}

export function AnalysisPanel() {
  const [regionData, setRegionData] = useState<RegionData>({
    craterDensity: 75,
    roughness: 60,
    elevation: 5125.07,
    illumination: 85,
    temperature: -153,
    mineralComposition: {
      iron: 45,
      titanium: 25,
      aluminum: 30,
    },
  })

  return (
    <Card className="fixed right-4 top-4 bottom-4 w-96 bg-background/80 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Surface Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="terrain">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terrain">Terrain</TabsTrigger>
            <TabsTrigger value="composition">Composition</TabsTrigger>
          </TabsList>
          <TabsContent value="terrain" className="mt-4">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Elevation Profile</div>
                  <div className="h-32 bg-muted rounded-md" />
                  <div className="text-xs text-muted-foreground">
                    Current elevation: {regionData.elevation.toFixed(2)} m/px
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Crater Density</div>
                  <Progress value={regionData.craterDensity} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.craterDensity.toFixed(1)}% relative density
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Surface Temperature</div>
                  <div className="text-xs text-muted-foreground">{regionData.temperature}°C</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Surface Roughness</div>
                  <Progress value={regionData.roughness} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.roughness.toFixed(1)}% roughness index
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Illumination</div>
                  <Progress value={regionData.illumination} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.illumination.toFixed(1)}% illumination
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="composition" className="mt-4">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Iron Content</div>
                  <Progress value={regionData.mineralComposition.iron} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.mineralComposition.iron}% concentration
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Titanium Content</div>
                  <Progress value={regionData.mineralComposition.titanium} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.mineralComposition.titanium}% concentration
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Aluminum Content</div>
                  <Progress value={regionData.mineralComposition.aluminum} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {regionData.mineralComposition.aluminum}% concentration
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Mineral Distribution</div>
                  <div className="h-48 bg-muted rounded-md" />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

