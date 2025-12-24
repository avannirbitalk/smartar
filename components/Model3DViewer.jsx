'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { useEffect, useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Play, Pause, RotateCcw, Maximize2, Minimize2, QrCode, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'

// 3D Model component with animation support
function Model({ modelUrl, isPlaying, playDirection, scale = 1 }) {
  const gltf = useGLTF(modelUrl)
  const mixer = useRef()
  const actions = useRef([])

  useEffect(() => {
    if (gltf.animations.length && gltf.scene) {
      mixer.current = new THREE.AnimationMixer(gltf.scene)
      actions.current = gltf.animations.map((clip) => {
        const action = mixer.current.clipAction(clip)
        action.play()
        return action
      })
    }
  }, [gltf])

  useEffect(() => {
    if (actions.current.length > 0) {
      actions.current.forEach((action) => {
        action.timeScale = playDirection * 0.5
      })
    }
  }, [playDirection])

  useFrame((_, delta) => {
    if (isPlaying && mixer.current) {
      mixer.current.update(delta)
    }
  })

  return <primitive object={gltf.scene} scale={scale} position={[0, -1.5, 0]} />
}

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0ea5e9" wireframe />
    </mesh>
  )
}

export default function Model3DViewer({ 
  modelUrl, 
  arUrl, 
  title = 'Objek 3D',
  scale = 1,
  showControls = true 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playDirection, setPlayDirection] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAR, setShowAR] = useState(false)
  const containerRef = useRef(null)

  const handlePlay = () => {
    setPlayDirection(1)
    setIsPlaying(true)
  }

  const handleReverse = () => {
    setPlayDirection(-1)
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.warn('Fullscreen error:', error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (showAR && arUrl) {
    return (
      <div ref={containerRef} className="relative w-full aspect-[4/3] bg-black rounded-xl overflow-hidden border-2 border-sky-200">
        <iframe
          src={arUrl}
          className="w-full h-full border-none"
          allow="camera; gyroscope; accelerometer; magnetometer; xr-spatial-tracking; microphone"
          title="WebAR Viewer"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowAR(false)}
            className="bg-white/90 hover:bg-white"
          >
            <Box className="w-4 h-4 mr-1" /> 3D
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={toggleFullscreen}
            className="bg-white/90 hover:bg-white"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] bg-gradient-to-b from-sky-50 to-white rounded-xl overflow-hidden border-2 border-sky-200 shadow-lg">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<LoadingPlaceholder />}>
          <Model
            modelUrl={modelUrl}
            isPlaying={isPlaying}
            playDirection={playDirection}
            scale={scale}
          />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={2}
          maxDistance={15}
        />
        <Environment preset="studio" />
      </Canvas>

      {/* Controls */}
      {showControls && (
        <>
          {/* Top controls */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={toggleFullscreen}
              className="bg-white/90 hover:bg-white"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleReverse}
              className="bg-white/90 hover:bg-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={isPlaying ? handleStop : handlePlay}
              className="bg-white/90 hover:bg-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          {/* AR Button */}
          {arUrl && (
            <div className="absolute bottom-3 right-3">
              <Button
                size="sm"
                onClick={() => setShowAR(true)}
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <QrCode className="w-4 h-4 mr-1" /> AR
              </Button>
            </div>
          )}
        </>
      )}

      {/* Title */}
      <div className="absolute top-3 right-3">
        <span className="bg-white/90 text-sky-800 text-xs font-medium px-3 py-1.5 rounded-full">
          {title}
        </span>
      </div>
    </div>
  )
}
