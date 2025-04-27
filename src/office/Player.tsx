import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

const SPEED = 5;
const sensitivity = 0.002;
const smoothness = 0.1;
const pitchLimit = Math.PI / 2 - 0.1;

const Player: React.FC = () => {
  const { camera, scene } = useThree();
  const [playerBodyRef, api] = useSphere(() => ({
    mass: 1000,
    type: "Dynamic",
    position: [0, 4, 0],
    args: [0.5],
  }));

  const velocity = useRef([0, 0, 0]);
  const keys = useKeyboardControls();

  const pivot = useRef(new THREE.Object3D());
  const mouseDelta = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ yaw: 0, pitch: 0 });
  const currentRotation = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    pivot.current.add(camera);
    scene.add(pivot.current);
    camera.position.set(0, 1.5, 0); // Offset camera height on pivot

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
    // Update rotation based on mouse
    targetRotation.current.yaw -= mouseDelta.current.x * sensitivity;
    targetRotation.current.pitch -= mouseDelta.current.y * sensitivity;

    targetRotation.current.pitch = Math.max(
      -pitchLimit,
      Math.min(pitchLimit, targetRotation.current.pitch)
    );

    mouseDelta.current.x = 0;
    mouseDelta.current.y = 0;

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

    pivot.current.rotation.y = currentRotation.current.yaw;
    camera.rotation.x = currentRotation.current.pitch;
    camera.rotation.z = 0;

    // Move the pivot to match player position
    if (playerBodyRef.current) {
      playerBodyRef.current.getWorldPosition(pivot.current.position);
    }

    // Movement
    const moveDirection = new THREE.Vector3();
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, pivot.current.rotation.y, 0));
    const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, pivot.current.rotation.y, 0));

    if (keys.current.w || keys.current.ArrowUp) moveDirection.add(forward);
    if (keys.current.s || keys.current.ArrowDown) moveDirection.sub(forward);
    if (keys.current.a || keys.current.ArrowLeft) moveDirection.sub(right);
    if (keys.current.d || keys.current.ArrowRight) moveDirection.add(right);

    moveDirection.normalize().multiplyScalar(SPEED);

    api.velocity.set(
      moveDirection.x,
      velocity.current[1], // preserve vertical (gravity)
      moveDirection.z
    );
  });

  return <mesh ref={playerBodyRef} />;
};

export default Player;
