import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { usePlayerMovement } from "./hooks/usePlayerMovement";
import { useCameraControls } from "./hooks/useCameraControls";

const Player: React.FC = () => {
  const { camera, scene } = useThree();
  const [playerBodyRef, api] = useSphere(() => ({
    mass: 10,
    position: [0, 3, 0],
    args: [0.5]
  }));

  const pivot = useRef(new THREE.Object3D());

  usePlayerMovement(api, pivot);
  useCameraControls(camera, pivot);

  useEffect(() => {
    pivot.current.add(camera);
    scene.add(pivot.current);
    camera.position.set(0, 4, 0);
  
    return () => {
      pivot.current.remove(camera); // Detach camera
      scene.remove(pivot.current);  // Clean up scene
      camera.rotation.set(0, 0, 0); // Reset rotation
      camera.position.set(0, 2, 5); // Optional default
    };
  }, [camera, scene]);


  
  useFrame(() => {
    // Move the pivot to match player position
    if (playerBodyRef.current) {
      playerBodyRef.current.getWorldPosition(pivot.current.position);
    }
  });

  return <mesh ref={playerBodyRef} />;
};

export default Player;
