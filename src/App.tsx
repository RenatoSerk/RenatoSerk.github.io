import { useRef, useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useMemo } from 'react'

// Create a custom shader material for polka dots
const PolkaDotMaterial = shaderMaterial(
  { uColor1: new THREE.Color('white'), uColor2: new THREE.Color('black') },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main() {
    float dots = step(0.5, mod(floor(vUv.x * 10.0) + floor(vUv.y * 10.0), 2.0));
    gl_FragColor = vec4(mix(uColor1, uColor2, dots), 1.0);
  }
  `
)

// Extend the material so it can be used as a JSX element
extend({ PolkaDotMaterial })

function App() {
  function Sphere(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    // Rotate the sphere horizontally (around the Y-axis)
    useFrame((state, delta) => (meshRef.current.rotation.y += delta))
  
    // Memoize the material to avoid re-creating it on every render
    const materialProps = useMemo(() => ({
      uColor1: hovered ? new THREE.Color('hotpink') : new THREE.Color('#2f74c0'),
      uColor2: new THREE.Color('white'),
    }), [hovered])
  
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 2.5 : 1.5} 
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <polkaDotMaterial {...materialProps} />
      </mesh>
    )
  }

  return (
    <div style={{ width: '50vw', height: '100vh', margin: '0 auto' }}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Sphere position={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default App