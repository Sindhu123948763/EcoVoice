/* src/components/Toast.jsx */
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import '../styles/global.css';

export const ToastContainer = () => {
  const { toasts } = useContext(AppContext);

  return (
    <div style={containerStyle}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={18} color="#00f5a0" />;
      case 'warning': return <AlertCircle size={18} color="#f59e0b" />;
      case 'danger': return <XCircle size={18} color="#f87171" />;
      default: return <Info size={18} color="#00d9f5" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'rgba(0, 245, 160, 0.4)';
      case 'warning': return 'rgba(245, 158, 11, 0.4)';
      case 'danger': return 'rgba(248, 113, 113, 0.4)';
      default: return 'rgba(0, 217, 245, 0.4)';
    }
  };

  const toastStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1.25rem',
    borderRadius: '8px',
    background: 'rgba(18, 30, 23, 0.9)',
    backdropFilter: 'blur(16px)',
    border: `1px solid ${getBorderColor()}`,
    color: '#f0fdf4',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    minWidth: '280px',
    maxWidth: '450px',
    fontSize: '0.9rem',
    animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    justifyContent: 'space-between'
  };

  return (
    <div style={toastStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {getIcon()}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const containerStyle = {
  position: 'fixed',
  top: '85px',
  right: '20px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  pointerEvents: 'none'
};
export default ToastContainer;
