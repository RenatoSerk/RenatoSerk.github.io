import { Outlines, useGLTF } from '@react-three/drei'
import * as THREE from 'three';

function EarthModel() {
  const { nodes, materials } = useGLTF('/poly_earth_02.glb');

  // Create cell shaded material from the original material
  const planetMaterial = materials['Planet'] as THREE.MeshStandardMaterial;
  const toonMaterial = new THREE.MeshToonMaterial({
    color: planetMaterial.color,
    map: planetMaterial.map,
  });

  return (
    <mesh
      geometry={(nodes.polyEarth as THREE.Mesh).geometry}
      material={toonMaterial}
    >
      <Outlines thickness={1.5} color={'black'} />
    </mesh>
  );
}

export default EarthModel;