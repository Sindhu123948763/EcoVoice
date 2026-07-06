/* src/components/Modal.jsx */
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div 
        className="glass-card animate-scale" 
        style={modalContentStyle} 
        onClick={e => e.stopPropagation()}
      >
        <div style={headerStyle}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div style={bodyStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(5, 10, 7, 0.75)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '1.5rem'
};

const modalContentStyle = {
  width: '100%',
  maxWidth: '600px',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.75rem',
  background: 'var(--panel-bg)',
  border: '1px solid var(--panel-border)',
  overflow: 'hidden'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'between',
  justifyContent: 'space-between',
  borderBottom: '1px solid var(--panel-border)',
  paddingBottom: '1rem',
  marginBottom: '1rem'
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '0.25rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  border: '1px solid transparent'
};

const bodyStyle = {
  overflowY: 'auto',
  flex: 1,
  paddingRight: '0.25rem'
};

export default Modal;
