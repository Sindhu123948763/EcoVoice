/* src/components/Footer.jsx */
import React, { useState } from 'react';
import { Leaf, Heart, Send } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubbed(true);
      setEmail('');
    }
  };

  return (
    <footer style={footerStyle}>
      <div style={container}>
        {/* About Column */}
        <div style={columnStyle}>
          <div style={logoWrapper}>
            <div style={logoIcon}>
              <Leaf size={16} color="#050a07" fill="#050a07" />
            </div>
            <span style={logoText}>EcoVoice Global</span>
          </div>
          <p style={descText}>
            Empowering global citizens to report environmental threats, mobilize community petitions, track carbon emissions, and consult eco-intelligence.
          </p>
          <div style={socialsRow}>
            <a href="#" style={socialIcon} aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" style={socialIcon} aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div style={columnStyle}>
          <h4 style={titleStyle}>Quick Access</h4>
          <ul style={linkList}>
            <li><a href="/" style={linkStyle}>Home Portal</a></li>
            <li><a href="/about" style={linkStyle}>Mission & Team</a></li>
            <li><a href="/contact" style={linkStyle}>Support & FAQs</a></li>
            <li><a href="/dashboard" style={linkStyle}>Citizens Hub</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div style={columnStyle}>
          <h4 style={titleStyle}>Eco Action Reports</h4>
          <p style={descText}>Subscribe to get real-time environmental alerts and weekly impact summaries.</p>
          {subbed ? (
            <div style={successNotif}>
              🌱 Subscribed! Welcome to the green alliance.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={formStyle}>
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={submitBtnStyle} aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div style={bottomBar}>
        <div style={bottomContainer}>
          <span>© {new Date().getFullYear()} EcoVoice Global. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffffff' }}>
            Made with <Heart size={12} color="var(--color-primary)" fill="var(--color-primary)" /> for our Biosphere.
          </span>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  background: 'rgba(61, 59, 60, 1)',
  fontWeight: 950,
  borderTop: '1px solid var(--panel-border)',
  padding: '4rem 2rem 0 2rem',
  color: 'var(--text-secondary)',
  marginTop: 'auto',
  width: '100%',
  zIndex: 10
};

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1.5fr',
  gap: '3rem',
  paddingBottom: '3rem'
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const logoWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const logoIcon = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const logoText = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.15rem',
  fontWeight: 800,
  color: 'var(--text-primary)'
};

const descText = {
  fontSize: '0.85rem',
  lineHeight: '1.6',
  fontWeight: 100,
  color: '#FAF9F6'
};

const socialsRow = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: '0.25rem'
};

const socialIcon = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid #F5FFFA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff77',
  color: '#039978',
  fontWeight: 950,
  transition: 'all 0.2s'
};


const titleStyle = {
  fontSize: '1rem',
  fontFamily: 'var(--font-heading)',
  fontWeight: '700',
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const linkList = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: 0
};

const linkStyle = {
  fontSize: '0.88rem',
  fontWeight: 900,
  color: '#F5FFFA',
  transition: 'color 0.2s'
};

const formStyle = {
  display: 'flex',
  border: '0.2px solid #F5FFFA',
  borderRadius: 'var(--radius-sm)',
  background: 'rgba(255, 255, 255, 0.05)',
  overflow: 'hidden'
};

const inputStyle = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  padding: '0.75rem 1rem',
  color: 'black',
  fontSize: '0.85rem',
  outline: 'none'
};

const submitBtnStyle = {
  background: 'var(--color-primary)',
  border: 'none',
  padding: '0 1.25rem',
  color: '#050a07',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const successNotif = {
  padding: '0.75rem',
  background: 'rgba(0, 245, 160, 0.1)',
  borderRadius: '6px',
  fontSize: '0.85rem',
  color: 'var(--color-primary)',
  border: '1px solid rgba(0, 245, 160, 0.2)'
};

const bottomBar = {
  borderTop: '1px solid var(--panel-border)',
  padding: '1.5rem 0',
  fontSize: '0.8rem',
  color: '#ffffff'
};

const bottomContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
};

// Responsiveness injection
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      footer .container { grid-template-columns: 1fr !important; gap: 2rem !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Footer;
