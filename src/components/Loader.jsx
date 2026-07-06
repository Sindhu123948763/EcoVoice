/* src/components/Loader.jsx */
import React from 'react';

export const Loader = () => {
  return (
    <div style={containerStyle}>
      <div style={spinnerContainer}>
        <div style={spinnerRing}></div>
        <div style={spinnerLeaf}>🍃</div>
      </div>
      <p style={loadingText}>Connecting to EcoVoice Network...</p>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem',
  gap: '1rem'
};

const spinnerContainer = {
  position: 'relative',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const spinnerRing = {
  width: '100%',
  height: '100%',
  border: '3px solid rgba(0, 245, 160, 0.1)',
  borderTop: '3px solid var(--color-primary)',
  borderRadius: '50%',
  animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
};

const spinnerLeaf = {
  position: 'absolute',
  fontSize: '1.5rem',
  animation: 'pulseSoft 2s infinite ease-in-out'
};

const loadingText = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  letterSpacing: '0.05em'
};

// Add standard keyframe in stylesheet rules injectively
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if stylesheet isn't accessible or is empty yet
  }
}

export default Loader;
