import { Canvas } from "@react-three/fiber";
import SceneManager from "./SceneManager";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas style={{ background: "black" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <SceneManager />
      </Canvas>
    </div>
  );
}

export default App;
