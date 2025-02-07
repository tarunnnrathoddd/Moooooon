"use client"

import { useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Environment, useTexture } from "@react-three/drei"
import { VideoDialog } from "./video-dialog"

interface Region {
  name: string
  latitude: number
  longitude: number
}

interface MoonProps {
  onRegionSelect: (region: Region) => void
}

function Moon({ onRegionSelect }: MoonProps) {
  const moonTexture = useTexture(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20at%2012.19.23%E2%80%AFAM-vuMeqR3eUBUESu6pnU9AqitDy7EgLt.png",
  )
  const meshRef = useRef<THREE.Mesh>(null)

  const handleClick = useCallback(
    (event: THREE.Intersection) => {
      if (!meshRef.current) return

      const point = event.point.clone()
      const radius = 2

      const latitude = (Math.asin(point.y / radius) * 180) / Math.PI
      const longitude = ((Math.atan2(point.z, point.x) * 180) / Math.PI + 180) % 360

      let regionName = ""
      if (latitude > 60) regionName = "North Pole"
      else if (latitude < -60) regionName = "South Pole"
      else if (longitude < 90) regionName = "East Region"
      else if (longitude > 270) regionName = "West Region"
      else regionName = "Equatorial Region"

      onRegionSelect({
        name: regionName,
        latitude,
        longitude,
      })
    },
    [onRegionSelect],
  )

  const materialProps = {
    map: moonTexture,
    roughness: 0.9,
    metalness: 0.1,
    bumpScale: 0.02,
    side: THREE.DoubleSide,
  }

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(e.intersections[0])
      }}
    >
      <sphereGeometry args={[2, 128, 128]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}

function Scene({ onRegionSelect }: { onRegionSelect: (region: Region) => void }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Moon onRegionSelect={onRegionSelect} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={1.2}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI * 0.9}
      />
      <Environment preset="night" />
    </>
  )
}

export function MoonViewer() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const handleRegionSelect = useCallback((region: Region) => {
    setSelectedRegion(region)
    setShowDialog(true)
  }, [])

  return (
    <>
      <div className="w-full h-screen">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="bg-black"
          gl={{
            antialias: true,
            pixelRatio: Math.min(2, window.devicePixelRatio),
          }}
        >
          <Scene onRegionSelect={handleRegionSelect} />
        </Canvas>
      </div>
      {selectedRegion && <VideoDialog open={showDialog} onOpenChange={setShowDialog} region={selectedRegion} />}
    </>
  )
}

