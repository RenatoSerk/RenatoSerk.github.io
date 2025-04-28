import { useEffect, useState } from "react";
import LandingPage from "./landingPage/LandingPage";
import Office from "./office/Office";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "z") {
        setShowLanding(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {showLanding ? <LandingPage /> : <Office />}
    </div>
  );
}

export default App;
