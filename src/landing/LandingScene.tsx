import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import EarthModel from './ObJectModels';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useThree } from '@react-three/fiber';

const LandingScene: React.FC = () => {
  const earthRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useEarthRotation(earthRef);

  useEffect(() => {
    camera.position.set(-3, 2, 5);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(-3, 2, 5);
  }, );

  return (
    <group ref={earthRef} position={[4, 2, -6]}>
      <EarthModel scale={4} position={[0, -4.3, 0]} />
    </group>
  );
};

export default LandingScene;