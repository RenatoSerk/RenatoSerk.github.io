import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EarthModel from "./ObJectModels";

const LandingPage: React.FC = () => {
  return (
    <Canvas style={{ background: "black" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Suspense fallback={null}>
        <EarthModel position={[0, -2, 0]} scale={2} />
      </Suspense>

    </Canvas>
  );
};

export default LandingPage;
