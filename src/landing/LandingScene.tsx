import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useThree } from '@react-three/fiber';
import EarthModel from './models/EarthModel';

const LandingScene: React.FC = () => {
  const earthRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useEarthRotation(earthRef, glowRef);

  useEffect(() => {
    camera.position.set(-3, 2, 5);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(-3, 2, 5);
  }, []);

  return (
    <>
      <directionalLight position={[3, 2, 10]} intensity={1.5} />
      <group ref={earthRef} position={[4, 2, -6]} scale={5}>
        <EarthModel />
      </group>
      <mesh ref={glowRef} position={[4, 2, -6]} scale={5.5} visible={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.15}/>
      </mesh>
    </>
  );
};

export default LandingScene;