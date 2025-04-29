import { useState, useEffect } from "react";
import LandingScene from "./landing/LandingScene";
import OfficeScene from "./office/OfficeScene";

const SceneManager: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "z") {
        setShowLanding(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {showLanding ? <LandingScene /> : <OfficeScene />}
    </>
  );
};

export default SceneManager;
