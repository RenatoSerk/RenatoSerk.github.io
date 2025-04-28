import { useBox } from "@react-three/cannon";

// Static floor component
const Floor: React.FC = () => {
  useBox(() => ({
    type: "Static",
    position: [0, -0.5, 0],
    args: [30, 1, 30],
  }));

  return (
    <mesh position={[0, -0.5, 0]}>
      <boxGeometry args={[30, 1, 30]} />
      <meshStandardMaterial color="rgb(222,184,135)" />
    </mesh>
  );
};


const Wall: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position, rotation = [0, 0, 0], color = "#cccccc" }) => { 
  useBox(() => ({
    type: "Static",
    position,
    rotation,
    args: [30, 10, 1],
  }));

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[30, 10, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export { Floor, Wall };
