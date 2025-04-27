import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const useCameraControls = () => {
  const { camera, scene } = useThree();

  const pivot = useRef<THREE.Object3D>(new THREE.Object3D());
  const mouseDelta = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ yaw: 0, pitch: 0 });
  const currentRotation = useRef({ yaw: 0, pitch: 0 });

  const sensitivity = 0.002;
  const smoothness = 0.1;
  const pitchLimit = Math.PI / 2 - 0.1;

  useEffect(() => {
    // Attach the pivot to the scene if not already
    if (!pivot.current.children.includes(camera)) {
      pivot.current.add(camera);
      scene.add(pivot.current);
      camera.position.set(0, 0, 0); // Make sure camera is centered on pivot
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseDelta.current.x += event.movementX;
      mouseDelta.current.y += event.movementY;
    };

    const handleClick = () => {
      document.body.requestPointerLock();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [camera, scene]);

  useFrame(() => {
    targetRotation.current.yaw -= mouseDelta.current.x * sensitivity;
    targetRotation.current.pitch -= mouseDelta.current.y * sensitivity; // Counter inverted controls with subtraction

    // Clamp pitch
    targetRotation.current.pitch = Math.max(
      -pitchLimit,
      Math.min(pitchLimit, targetRotation.current.pitch)
    );

    // Reset mouse delta
    mouseDelta.current.x = 0;
    mouseDelta.current.y = 0;

    // Smoothly interpolate rotation
    currentRotation.current.yaw = THREE.MathUtils.lerp(
      currentRotation.current.yaw,
      targetRotation.current.yaw,
      smoothness
    );
    currentRotation.current.pitch = THREE.MathUtils.lerp(
      currentRotation.current.pitch,
      targetRotation.current.pitch,
      smoothness
    );

    // Apply rotations
    pivot.current.rotation.y = currentRotation.current.yaw; // Yaw on pivot
    camera.rotation.x = currentRotation.current.pitch;      // Pitch on camera
    camera.rotation.z = 0;                                  // Lock roll to 0
  });
};
