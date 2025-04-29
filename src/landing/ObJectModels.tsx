import { useRef } from 'react'
import * as THREE from 'three'
import { ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function EarthModel(props: ThreeElements['mesh']) {
  const { scene } = useGLTF('/low_poly_planet_earth.glb');
  const meshRef = useRef<THREE.Object3D>(null!);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      {...props}
    />
  )
}

export default EarthModel