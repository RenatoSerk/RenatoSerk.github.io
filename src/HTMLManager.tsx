// HtmlManager.tsx
import React from 'react';

interface Props {
  showLanding: boolean;
}

const HtmlManager: React.FC<Props> = ({ showLanding }) => {
  return showLanding ? (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '5%',
      transform: 'translateY(-50%)',
      color: 'black',
      fontSize: '3rem',
      lineHeight: '2.2rem',
      textAlign: 'left',
      zIndex: 10,
      userSelect: 'none'
    }}>
      <div>Renato Serkhanian</div>
      <div style={{ fontSize: '1rem', opacity: 0.8 }}>Full Stack Developer</div>
    </div>
  ) : (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
      background: 'rgba(0,0,0,0.5)',
      padding: '10px',
      borderRadius: '8px',
      zIndex: 10
    }}>
      Welcome to the Office!
    </div>
  );
};

export default HtmlManager;
