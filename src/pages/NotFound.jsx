/* src/pages/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div style={container}>
      <AlertCircle size={60} color="var(--color-warning)" />
      <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>404</h1>
      <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Region Uncharted</h3>
      <p style={{ margin: '0.5rem 0 1.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        The ecosystem parameters or URL node you requested does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Safety
      </Link>
    </div>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 250px)',
  textAlign: 'center',
  padding: '2rem'
};

export default NotFound;
