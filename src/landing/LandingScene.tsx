import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import EarthModel from "./ObJectModels";

const LandingScene: React.FC = () => {
  const { camera } = useThree(); // 🔥 Correct way to get camera
  const earthRef = useRef<THREE.Group>(null!);
  const isDragging = useRef(false);
  const lastMouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const rotationVelocity = useRef<THREE.Vector2>(new THREE.Vector2());
  const damping = 0.95;
  const uprightRestorationSpeed = 0.02;

  useEffect(() => {
    const raycaster = new THREE.Raycaster();

    const handlePointerDown = (e: PointerEvent) => {
      if (!earthRef.current) return;
      
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera); // ✅ use correct camera

      const intersects = raycaster.intersectObject(earthRef.current, true);
      if (intersects.length > 0) {
        isDragging.current = true;
        lastMouse.current.set(e.clientX, e.clientY);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;
      lastMouse.current.set(e.clientX, e.clientY);

      rotationVelocity.current.x = deltaY * 0.005;
      rotationVelocity.current.y = deltaX * 0.005;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [camera]); // Important: camera dependency!

  useFrame(() => {
    const earth = earthRef.current;
    if (!earth) return;

    if (isDragging.current) {
      earth.rotation.x += rotationVelocity.current.x;
      earth.rotation.y += rotationVelocity.current.y;
    } else if (rotationVelocity.current.lengthSq() > 0.00001) {
      earth.rotation.x += rotationVelocity.current.x;
      earth.rotation.y += rotationVelocity.current.y;
      rotationVelocity.current.multiplyScalar(damping);
    } else {
      earth.rotation.x += (-earth.rotation.x) * uprightRestorationSpeed;
      earth.rotation.y += -0.0025;
    }
  });

  return (
    <group ref={earthRef}>
      <EarthModel position={[0, -2, 0]} scale={2} />
    </group>
  );
};

export default LandingScene;
