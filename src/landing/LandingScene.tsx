import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useThree } from '@react-three/fiber';
import { EarthModel, MarsModel } from './Models';

const LandingScene: React.FC = () => {
  const earthRef = useRef<THREE.Group>(null!);
  const marsRef = useRef<THREE.Group>(null!);
  const earthGlowRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  useEarthRotation(earthRef, earthGlowRef);

  useEffect(() => {
    camera.position.set(-3, 2, 5);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(-3, 2, 5);
  }, []);

  return (
    <>
      <directionalLight position={[3, 2, 10]} intensity={1.5} />

      // Earth
      <group ref={earthRef} position={[4, 2, -6]} scale={5}>
        <EarthModel />
      </group>
      <mesh ref={earthGlowRef} position={[4, 2, -6]} scale={5.5} visible={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.15}/>
      </mesh>

      // Mars
      <group ref={marsRef} position={[4, -10, -6]} scale={40}>
        <MarsModel />
      </group>
      
    </>
  );
};

export default LandingScene;