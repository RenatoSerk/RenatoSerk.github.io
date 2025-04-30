// useEarthRotation.ts
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export function useEarthRotation(earthRef: React.RefObject<THREE.Group>) {
  const { camera } = useThree();

  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const lastMouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const rotationVelocity = useRef<THREE.Vector2>(new THREE.Vector2());

  const DAMPING = 0.95;
  const UPRIGHT_RESTORATION_SPEED = 0.02;

  useEffect(() => {
    const raycaster = new THREE.Raycaster();

    const handlePointerMove = (e: PointerEvent) => {
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(earthRef.current!, true);

      const hovering = intersects.length > 0;
      if (hovering !== isHovering.current && !isDragging.current) {
        document.body.style.cursor = hovering ? 'grab' : 'default';
        isHovering.current = hovering;
      }

      if (!isDragging.current) return;

      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;
      lastMouse.current.set(e.clientX, e.clientY);

      rotationVelocity.current.x = deltaY * 0.005;
      rotationVelocity.current.y = deltaX * 0.005;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(earthRef.current!, true);

      if (intersects.length > 0) {
        isDragging.current = true;
        lastMouse.current.set(e.clientX, e.clientY);
        document.body.style.cursor = 'grabbing';
      }
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = isHovering.current ? 'grab' : 'default';
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [camera, earthRef]);

  useFrame(() => {
    const earth = earthRef.current;
    if (!earth) return;

    if (isDragging.current) {
      earth.rotation.x += rotationVelocity.current.x;
      earth.rotation.y += rotationVelocity.current.y;
    } else if (rotationVelocity.current.lengthSq() > 0.00001) {
      earth.rotation.x += rotationVelocity.current.x;
      earth.rotation.y += rotationVelocity.current.y;
      rotationVelocity.current.multiplyScalar(DAMPING);
    } else {
      earth.rotation.x += (-earth.rotation.x) * UPRIGHT_RESTORATION_SPEED;
      earth.rotation.y += -0.003;
    }
  });
}