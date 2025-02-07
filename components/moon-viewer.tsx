"use client"

import { useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
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
  const moonTexture = useTexture("/image4.png")
  const meshRef = useRef<THREE.Mesh>(null)

  // 🔄 Smooth, Slower Rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015 // Adjust speed for realism
    }
  })

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

      onRegionSelect({ name: regionName, latitude, longitude })
    },
    [onRegionSelect],
  )

  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(e.intersections[0])
      }}
    >
      <sphereGeometry args={[3, 128, 128]} />

      {/* 🌕 More Realistic Moon Material */}
      <meshStandardMaterial 
        map={moonTexture}  
        roughness={0.9}  // Reduces shininess  
        metalness={0}  // Ensures non-metallic look
        transparent={true}  
        opacity={2}  // Softens the texture
        emissive={"#808080"}  // Adds moon glow  
        emissiveIntensity={0.1}  // Controls brightness  
      />
    </mesh>
  )
}

function Scene({ onRegionSelect }: { onRegionSelect: (region: Region) => void }) {
  return (
    <>
      {/* 🌕 Soft, Realistic Lighting */}
      <ambientLight intensity={0.5} color={0x404040} /> {/* Soft white light */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="white" />

      <Moon onRegionSelect={onRegionSelect} />

      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.2}
        zoomSpeed={1}
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
      {/* 🎨 Increased Canvas Width */}
      <div className="w-[900px] h-screen">
        <Canvas
          camera={{ position: [-3, 0, 10], fov: 45 }} // Adjusted for better view
          className="bg-black"
          gl={{ antialias: true, pixelRatio: Math.min(2, window.devicePixelRatio) }}
        >
          <Scene onRegionSelect={handleRegionSelect} />
        </Canvas>
      </div>

      {selectedRegion && <VideoDialog open={showDialog} onOpenChange={setShowDialog} region={selectedRegion} />}
    </>
  )
}
