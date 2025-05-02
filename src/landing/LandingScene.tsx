import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEarthRotation } from './hooks/useEarthRotation';
import { useThree } from '@react-three/fiber';
import EarthModel from './ObJectModels';

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
    <>
      <directionalLight position={[3, 2, 10]} intensity={1.5}/>
      <group ref={earthRef} position={[4, 2, -6]} scale={5}>
        <EarthModel/>
      </group>
    </>
  );
};

export default LandingScene;