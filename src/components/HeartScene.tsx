import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MarchingCube, MarchingCubes } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function AnatomicalHeart() {
  const root = useRef<THREE.Group>(null)
  const vesselMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1940b1',
        roughness: 0.22,
        metalness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        transmission: 0.05,
      }),
    [],
  )
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ef3122',
        emissive: '#8f1b12',
        emissiveIntensity: 0.3,
        roughness: 0.18,
        metalness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        sheen: 0.6,
        sheenColor: '#ffffff',
      }),
    [],
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const pulse = 1 + Math.sin(t * 2.05) * 0.035
    if (root.current) {
      root.current.rotation.y += 0.0022
      root.current.rotation.x = Math.sin(t * 0.3) * 0.1
      root.current.position.y = Math.sin(t * 0.9) * 0.1
      root.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={root} rotation={[0.16, -0.24, 0]}>
      <MarchingCubes resolution={64} maxPolyCount={30000} enableUvs={false} enableColors={false}>
        <primitive object={coreMaterial} attach="material" />
        <MarchingCube strength={1.15} subtract={8} position={[-0.38, 0.42, 0]} />
        <MarchingCube strength={1.15} subtract={8} position={[0.36, 0.4, 0]} />
        <MarchingCube strength={1.25} subtract={8} position={[-0.05, -0.1, 0.05]} />
        <MarchingCube strength={1.15} subtract={8} position={[0.28, -0.28, 0]} />
        <MarchingCube strength={1.1} subtract={8} position={[-0.3, -0.4, 0]} />
        <MarchingCube strength={0.95} subtract={8} position={[-0.08, -0.8, 0]} />
      </MarchingCubes>

      <mesh position={[-0.28, 0.96, 0.12]} rotation={[0.28, 0.08, 0.24]} material={vesselMaterial}>
        <cylinderGeometry args={[0.14, 0.18, 0.8, 34]} />
      </mesh>
      <mesh position={[0.24, 0.95, 0.2]} rotation={[-0.4, 0.08, -0.34]} material={vesselMaterial}>
        <cylinderGeometry args={[0.11, 0.16, 0.75, 32]} />
      </mesh>
      <mesh position={[-0.6, 0.62, 0.2]} rotation={[0.65, -0.15, 0.2]} material={vesselMaterial}>
        <cylinderGeometry args={[0.06, 0.08, 0.54, 26]} />
      </mesh>
      <mesh position={[0.64, 0.52, 0.18]} rotation={[-0.56, 0.22, -0.25]} material={vesselMaterial}>
        <cylinderGeometry args={[0.06, 0.08, 0.48, 26]} />
      </mesh>
    </group>
  )
}

type HeartSceneProps = {
  className?: string
}

export default function HeartScene({ className = '' }: HeartSceneProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3.8], fov: 40 }}>
        <ambientLight intensity={0.55} color="#ffffff" />
        <hemisphereLight intensity={0.6} color="#9bb7ff" groundColor="#ffd2cc" />
        <pointLight position={[2.1, 2, 2]} intensity={12} color="#1940b1" />
        <pointLight position={[-2.2, -1, 2]} intensity={12} color="#ef3122" />
        <pointLight position={[0, 2.8, 1.2]} intensity={6} color="#ffffff" />
        <AnatomicalHeart />
        <Environment preset="city" />
        <fog attach="fog" args={['#e8f0ff', 8, 14]} />
      </Canvas>
    </div>
  )
}
