import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useKeyboardControls } from "./useKeyboardControls";

const SPEED = 5;
const ACCELERATION = 70;

export const usePlayerMovement = (
  api: {
    velocity: {
      subscribe: (callback: (v: number[]) => void) => () => void;
    };
    applyForce: (force: [number, number, number], point: [number, number, number]) => void;
    linearDamping: {
      set: (value: number) => void;
    };
  },
  pivot: React.RefObject<THREE.Object3D>
) => {
  const keys = useKeyboardControls();
  const currentVelocity = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v: number[]) => {
      currentVelocity.current = v;
    });
    return unsubscribe;
  }, [api]);

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

    moveDirection.normalize();

    const moving = moveDirection.lengthSq() > 0;

    if (moving) {
      const velocityXZ = new THREE.Vector2(currentVelocity.current[0], currentVelocity.current[2]);
      const moveXZ = new THREE.Vector2(moveDirection.x, moveDirection.z);

      const desiredVelocity = moveXZ.multiplyScalar(SPEED);
      const velocityDifference = desiredVelocity.sub(velocityXZ);

      const force = velocityDifference.multiplyScalar(ACCELERATION);

      api.applyForce([force.x, 0, force.y], [0, 0, 0]);
      api.linearDamping.set(0.2);
    } else {
      api.linearDamping.set(0.999);
    }
  });
};
