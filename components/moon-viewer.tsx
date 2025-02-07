"use client"

import { useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { OrbitControls, Stars } from "@react-three/drei"
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

function AnimatedStars() {
  const starRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (starRef.current) {
      const time = clock.getElapsedTime();
      const sizes = starRef.current.geometry.attributes.size;
      for (let i = 0; i < sizes.array.length; i++) {
        sizes.array[i] = 2 + Math.sin(time * 2 + i) * 1.5;
      }
      sizes.needsUpdate = true;
    }
  });

  return (
    <Stars
      ref={starRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
    />
  );
}

function Moon({ onRegionSelect }: MoonProps) {
  const moonTexture = useTexture("/image4.png")
  const glowTexture = useTexture("/image4.png")
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  const handleClick = useCallback(
    (event: THREE.Intersection) => {
      if (!meshRef.current) return
      const point = event.point.clone()
      const radius = 3
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
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          handleClick(e.intersections[0])
        }}
      >
        <sphereGeometry args={[3, 128, 128]} />
        <meshStandardMaterial
          map={moonTexture}
          emissiveMap={glowTexture}
          emissive={new THREE.Color(0xffffff)}
          emissiveIntensity={0.4}
          roughness={1}
        />
      </mesh>
    </group>
  )
}

function Scene({ onRegionSelect }: { onRegionSelect: (region: Region) => void }) {
  const bgTexture = useTexture("/bg1.png")
  return (
    <>
      <AnimatedStars />
      <ambientLight intensity={0.6} color={0x505050} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="white" />
      <mesh scale={[-50, 50, 50]} rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial map={bgTexture} side={THREE.BackSide} />
      </mesh>
      <pointLight position={[3, 5, 2]} intensity={3} color="white" castShadow />
      <spotLight position={[5, 8, 5]} intensity={1} angle={0.3} penumbra={0.5} castShadow />
      <Moon onRegionSelect={onRegionSelect} />
      <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.2} zoomSpeed={1} minDistance={3} maxDistance={20} maxPolarAngle={Math.PI * 0.9} />
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
      <div className="w-[900px] h-screen">
        <Canvas
          camera={{ position: [-3, 0, 10], fov: 45 }}
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
