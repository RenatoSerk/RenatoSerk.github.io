import { usePlane } from "@react-three/cannon";

// Static floor component
const Floor: React.FC = () => {
    usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0], // Horizontal plane
      position: [0, -0.5, 0],
    }));
  
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="rgb(222,184,135)" />
      </mesh>
    );
  };
  
  // Static wall component
  const Wall: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
    position,
    rotation = [0, 0, 0],
  }) => {
    usePlane(() => ({
      position,
      rotation,
    }));
  
    return (
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    );
  };

  export { Floor, Wall };