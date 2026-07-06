/* src/pages/Auth.jsx */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, User, Key, KeyRound } from 'lucide-react';
import '../styles/global.css';

export const Auth = () => {
  const { login, register } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
  const user = localStorage.getItem("user");

  if (user) {
    navigate('/dashboard');
  }
}, [navigate]);

  // Mode: 'login' | 'register' | 'forgot' | 'otp'
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '', otpCode: '' });
  const [passStrength, setPassStrength] = useState({ score: 0, text: 'Very Weak', color: 'var(--color-danger)' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password' && mode === 'register') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (val) => {
    let score = 0;
    if (val.length >= 6) score += 1;
    if (val.length >= 10) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    let text = 'Very Weak';
    let color = 'var(--color-danger)';
    if (score >= 4) {
      text = 'Excellent';
      color = 'var(--color-success)';
    } else if (score >= 2) {
      text = 'Medium';
      color = 'var(--color-warning)';
    }

    setPassStrength({ score, text, color });
  };

 const handleLoginSubmit = (e) => {
  e.preventDefault();

  const success = login(form.email, form.password);

  if (success) {
  navigate('/dashboard');
} else {
  alert("Invalid Email or Password");
}
};

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Prompt OTP code screen
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    setMode('otp');
  };

  const handleOtpSubmit = (e) => {
  e.preventDefault();

  if (form.otpCode === '1234') {

    const success = register(
      form.username,
      form.email,
      form.password
    );

    if (success) {

      localStorage.setItem(
        "eco-user",
        JSON.stringify({
          username: form.username,
          email: form.email
        })
      );

      alert("Registration Successful!");

      navigate('/dashboard');
    }

  } else {
    alert("Invalid verification code. Please enter 1234.");
  }
};

  return (
    <div className="animate-fade" style={wrapper}>
      <div className="glass-card" style={authContainer}>
        {/* Toggle headers */}
        {mode !== 'otp' && (
          <div style={tabsHeader}>
            <button 
              style={mode === 'login' ? activeTab : inactiveTab} 
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button 
              style={mode === 'register' ? activeTab : inactiveTab} 
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>
        )}

        {/* Login Mode */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={formStyle}>
            <div style={logoWrapper}>
              <ShieldCheck size={28} color="var(--color-primary)" />
              <h2 style={{ margin: 0 }}>Welcome Back</h2>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={inputWithIcon}>
                <Mail size={16} style={inputIcon} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="password">Password</label>
                <button 
                  type="button" 
                  style={linkBtn} 
                  onClick={() => setMode('forgot')}
                >
                  Forgot password?
                </button>
              </div>
              <div style={inputWithIcon}>
                <Lock size={16} style={inputIcon} />
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Sign In to Dashboard
            </button>
          </form>
        )}

        {/* Register Mode */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} style={formStyle}>
            <div style={logoWrapper}>
              <ShieldCheck size={28} color="var(--color-primary)" />
              <h2 style={{ margin: 0 }}>Join EcoVoice</h2>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <div style={inputWithIcon}>
                <User size={16} style={inputIcon} />
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  placeholder="EcoWarrior"
                  value={form.username}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={inputWithIcon}>
                <Mail size={16} style={inputIcon} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="warrior@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div style={inputWithIcon}>
                <Lock size={16} style={inputIcon} />
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {form.password && (
                <div style={strengthWrapper}>
                  <div style={strengthOuter}>
                    <div style={{
                      ...strengthInner,
                      width: `${(passStrength.score / 5) * 100}%`,
                      backgroundColor: passStrength.color
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: passStrength.color, fontWeight: 'bold' }}>
                    Strength: {passStrength.text}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Send Verification Code
            </button>
          </form>
        )}

        {/* Forgot Password Mode */}
        {mode === 'forgot' && (
          <div style={formStyle}>
            <div style={logoWrapper}>
              <Key size={28} color="var(--color-secondary)" />
              <h2 style={{ margin: 0 }}>Reset Request</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email address and we will forward a simulated recovery credentials link.
            </p>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="registered@example.com"
                className="form-input"
              />
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={() => { alert('Password link transmitted!'); setMode('login'); }}
            >
              Send Recovery Email
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setMode('login')}>
              Back to Login
            </button>
          </div>
        )}

        {/* OTP Verification Mode */}
        {mode === 'otp' && (
          <form onSubmit={handleOtpSubmit} style={formStyle}>
            <div style={logoWrapper}>
              <KeyRound size={28} color="var(--color-primary)" />
              <h2 style={{ margin: 0 }}>OTP Verification</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1rem' }}>
              We sent a simulated 4-digit code to <strong>{form.email}</strong>. 
            </p>
            <div style={simWarning}>
              <strong>Bypass Tip:</strong> Enter <strong>1234</strong> to verify.
            </div>

            <div className="form-group" style={{ alignItems: 'center' }}>
              <label className="form-label">Enter Verification Pin</label>
              <input
                type="text"
                name="otpCode"
                required
                maxLength="4"
                value={form.otpCode}
                onChange={handleInputChange}
                className="form-input"
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem', width: '150px', padding: '0.5rem 0 0.5rem 0.5rem' }}
                placeholder="0000"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Verify & Complete Registration
            </button>
            <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setMode('register')}>
              Change Details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const wrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 200px)',
  padding: '2rem 1rem'
};

const authContainer = {
  width: '100%',
  maxWidth: '420px',
  padding: '2.5rem 2rem'
};

const tabsHeader = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  borderBottom: '1px solid var(--panel-border)',
  marginBottom: '2rem'
};

const activeTab = {
  background: 'none',
  border: 'none',
  borderBottom: '3px solid var(--color-primary)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  padding: '0.75rem',
  cursor: 'pointer',
  fontSize: '1rem'
};

const inactiveTab = {
  background: 'none',
  border: 'none',
  borderBottom: '3px solid transparent',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-heading)',
  fontWeight: '600',
  padding: '0.75rem',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'color 0.2s'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
};

const logoWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '2rem',
  textAlign: 'center'
};

const inputWithIcon = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%'
};

const inputIcon = {
  position: 'absolute',
  left: '12px',
  color: 'var(--text-muted)',
  pointerEvents: 'none'
};

const linkBtn = {
  background: 'none',
  border: 'none',
  color: 'var(--color-primary)',
  fontSize: '0.8rem',
  cursor: 'pointer'
};

const strengthWrapper = {
  marginTop: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const strengthOuter = {
  width: '120px',
  height: '6px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderRadius: '3px',
  overflow: 'hidden'
};

const strengthInner = {
  height: '100%',
  transition: 'width 0.3s'
};

const simWarning = {
  padding: '0.75rem',
  background: 'rgba(0, 217, 245, 0.08)',
  border: '1px solid rgba(0, 217, 245, 0.2)',
  borderRadius: '6px',
  fontSize: '0.82rem',
  color: 'var(--color-secondary)',
  marginBottom: '1.25rem',
  textAlign: 'center'
};

export default Auth;
