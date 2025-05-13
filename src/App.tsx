import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './styles/index.css';
import SceneManager from './SceneManager';
import CustomCursor from './CustomCursor';
import HTMLContent from './HTMLContent';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'z') {
        setShowLanding((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Canvas id="threejs-canvas" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'rgb(239, 232, 220)'
      }}>
        <SceneManager showLanding={showLanding} />
      </Canvas>
      <CustomCursor />
      <HTMLContent />
    </>
  );
};

export default App;