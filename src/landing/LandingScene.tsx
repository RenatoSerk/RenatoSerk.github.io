// LandingScene.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import EarthModel from './ObJectModels';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useThree } from '@react-three/fiber';

const LandingScene: React.FC<{ active: boolean }> = ({ active }) => {
  const earthRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  useEarthRotation(earthRef);

    // Initial camera setup
    useEffect(() => {
      camera.clear();
      camera.position.set(-2, 2, 4);
    }, [active, camera]);

  return (
    <group ref={earthRef} position={[0, 2, 0]}>
      <EarthModel scale={2} position={[0, -2.17, 0]} />
    </group>
  );
};

export default LandingScene;
