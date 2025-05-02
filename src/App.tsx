import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './index.css';
import SceneManager from './SceneManager';
import HtmlManager from './HTMLManager';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'z') {
        setShowLanding(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <HtmlManager showLanding={showLanding} />
      <Canvas style={{ background: "rgb(237, 226, 213)" }} shadows >
        <SceneManager showLanding={showLanding} />
      </Canvas>
    </div>
  );
};

export default App;
