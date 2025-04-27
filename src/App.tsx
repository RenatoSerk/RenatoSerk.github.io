import { useRef, useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useMemo } from 'react'

// Create a custom shader material for polka dots
const PolkaDotMaterial = shaderMaterial(
  { uColor1: new THREE.Color('white'), uColor2: new THREE.Color('black'), resolution: new THREE.Vector2(1, 1) },
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
  uniform vec2 resolution;

  void main() {
    vec2 adjustedUV = vec2(vUv.x * 1.9, vUv.y);
    vec2 gridUV = adjustedUV * 10.0;
    gridUV.x += step(1.0, mod(floor(gridUV.y), 2.0)) * 0.5;
    vec2 cellUV = fract(gridUV) - 0.5;
    float dist = length(cellUV);
    float circle = step(dist, 0.3);

    gl_FragColor = vec4(mix(uColor1, uColor2, circle), 1.0);
  }
  `
);
// Extend the material so it can be used as a JSX element
extend({ PolkaDotMaterial })

function Sphere(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate the sphere horizontally (around the Y-axis)
  useFrame((_state, delta) => (meshRef.current.rotation.y += delta))

  // Memoize the material to avoid re-creating it on every render
  const materialProps = useMemo(() => ({
    uColor1: hovered ? new THREE.Color('hotpink') : new THREE.Color('#2f74c0'),
    uColor2: new THREE.Color('white'),
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  }), [hovered]);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 2.5 : 1.5}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <primitive object={new PolkaDotMaterial(materialProps)} attach="material" />
    </mesh>
  )
}

function App() {
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