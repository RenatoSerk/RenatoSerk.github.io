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
    const pivotObject = pivot.current;
    pivotObject.add(camera);
    scene.add(pivotObject);
    camera.position.set(0, 4, 0);

    return () => {
      document.exitPointerLock();
      pivotObject.remove(camera);
      scene.remove(pivotObject);
      camera.rotation.set(0, 0, 0);
      camera.position.set(0, 2, 5);
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
