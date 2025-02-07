"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface VideoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  region: {
    name: string
    latitude: number
    longitude: number
  }
}

export function VideoDialog({ open, onOpenChange, region }: VideoDialogProps) {
  const [generating, setGenerating] = useState(false)
  const [videoParams, setVideoParams] = useState({
    duration: "30",
    resolution: "1080p",
    fps: "30",
  })
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      // Reset video when closing popup
      setVideoUrl(null)
      setGenerating(false)
    }
  }, [open])

  const handleGenerate = async () => {
    setGenerating(true)

    // Simulate video generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // ✅ Google Drive Direct Link (Replace 'YOUR_FILE_ID' with actual file ID)
    const driveFileId = "1DKQQgo3V9D-kRv9b_TRKsh0VXr7loxfh" // Replace with your actual file ID
    const generatedVideoPath = `https://drive.google.com/uc?export=download&id=${driveFileId}`

    setVideoUrl(generatedVideoPath)
    setGenerating(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>
            {videoUrl ? "Generated Video" : `Generate Video for ${region.name}`}
          </DialogTitle>
        </DialogHeader>

        {!videoUrl ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input value={region.latitude.toFixed(5)} readOnly />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input value={region.longitude.toFixed(5)} readOnly />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Duration (seconds)</Label>
              <Input
                value={videoParams.duration}
                onChange={(e) => setVideoParams((p) => ({ ...p, duration: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Resolution</Label>
              <Input
                value={videoParams.resolution}
                onChange={(e) => setVideoParams((p) => ({ ...p, resolution: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>FPS</Label>
              <Input
                value={videoParams.fps}
                onChange={(e) => setVideoParams((p) => ({ ...p, fps: e.target.value }))}
              />
            </div>
          </div>
        ) : (
         <div className="flex flex-col items-center gap-4 min-w-[1000] max-w-7xl p-4 rounded-lg shadow-lg">
  <iframe
    src="https://drive.google.com/file/d/1DKQQgo3V9D-kRv9b_TRKsh0VXr7loxfh/preview"
    className="w-full h-[400px] rounded-lg"
    allow="autoplay"
  ></iframe>
</div>


        )}

        <DialogFooter>
          {!videoUrl ? (
            <Button onClick={handleGenerate} disabled={generating}>
              {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {generating ? "Generating..." : "Generate Video"}
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
