import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Floor, Wall } from "./Environment";
import Player from "./Player";

export const OfficeScene: React.FC = () => {

  return (
    <Canvas gl={{ antialias: true }} style={{ background: "ivory" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={5} />

      <Physics gravity={[0, -80, 0]}>
        <Player />
        <Floor />
        <Wall position={[0, 5, -15]} color="rgb(197, 25, 25)"/>
        <Wall position={[0, 5, 15]} rotation={[0, Math.PI, 0]} color="rgb(28, 25, 197)"/>
        <Wall position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} color="rgb(25, 197, 62)"/>
        <Wall position={[15, 5, 0]} rotation={[0, -Math.PI / 2, 0]} color="rgb(213, 226, 24)"/>

        {/* Ceiling */}
        <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="rgb(255, 255, 255)" />
        </mesh>
      </Physics>
    </Canvas>    
  );
};

export default OfficeScene;
