import { useBox } from "@react-three/cannon";

// Static floor component
const Floor: React.FC = () => {
  useBox(() => ({
    type: "Static",
    position: [0, -0.5, 0],
    args: [30, 1, 30], // width, height (thickness), depth
  }));

  return (
    <mesh position={[0, -0.5, 0]}>
      <boxGeometry args={[30, 1, 30]} />
      <meshStandardMaterial color="rgb(222,184,135)" />
    </mesh>
  );
};

// Static wall component
const Wall: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0],
}) => {
  useBox(() => ({
    type: "Static",
    position,
    rotation,
    args: [30, 10, 1], // width, height, depth thickness of the wall
  }));

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[30, 10, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
};

export { Floor, Wall };
