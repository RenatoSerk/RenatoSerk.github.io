import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls } from "./useKeyboardControls";

const SPEED = 5;

export const usePlayerMovement = (api: { velocity: { set: (x: number, y: number, z: number) => void } }, pivot: React.RefObject<THREE.Object3D>) => {
  const keys = useKeyboardControls();

  useFrame(() => {
    if (!pivot.current) return;

    const moveDirection = new THREE.Vector3();

    const yawRotation = new THREE.Euler(0, pivot.current.rotation.y, 0);
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(yawRotation);
    const right = new THREE.Vector3(1, 0, 0).applyEuler(yawRotation);

    if (keys.current.w || keys.current.ArrowUp) moveDirection.add(forward);
    if (keys.current.s || keys.current.ArrowDown) moveDirection.sub(forward);
    if (keys.current.a || keys.current.ArrowLeft) moveDirection.sub(right);
    if (keys.current.d || keys.current.ArrowRight) moveDirection.add(right);

    moveDirection.normalize().multiplyScalar(SPEED);

    api.velocity.set(
      moveDirection.x,
      0,
      moveDirection.z
    );
  });
};
