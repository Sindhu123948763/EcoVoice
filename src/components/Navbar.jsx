/* src/components/Navbar.jsx */
import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Leaf, Sun, Moon, Bell, LogOut, LayoutDashboard, Menu, X, User } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme, user, logout, notifications, markAllNotificationsRead } = useContext(AppContext);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogoutClick = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={headerStyle} className="glass-panel">
      <div style={navContainer}>
        {/* Logo */}
        <Link to="/" style={logoStyle} onClick={() => setMobileMenuOpen(false)}>
          <div style={logoIconBg}>
            <Leaf size={22} color="#050a07" fill="#050a07" />
          </div>
          <span style={logoTextStyle}>EcoVoice <span style={{ color: 'var(--color-primary)' }}>Global</span></span>
        </Link>

        {/* Desktop Main Links */}
        <nav style={desktopNavLinks}>
          <Link to="/" style={navLinkStyle(isActive('/'))}>Home</Link>
          <Link to="/community" style={navLinkStyle(isActive('/community'))}>Community</Link>
          <Link to="/learn" style={navLinkStyle(isActive('/learn'))}>Learn</Link>
          <Link to="/climate-map" style={navLinkStyle(isActive('/climate-map'))}>ClimateMap</Link>
          <Link to="/about" style={navLinkStyle(isActive('/about'))}>About</Link>
          <Link to="/contact" style={navLinkStyle(isActive('/contact'))}>Contact</Link>
        </nav>

        {/* Right Side Settings */}
        <div style={actionsContainer}>
          {/* Theme Toggle */}
          

          {/* Notifications Center */}
          <div style={{ position: 'relative' }}>
            <button 
              style={actionBtnStyle} 
              onClick={() => { setShowNotif(!showNotif); markAllNotificationsRead(); }}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
            </button>

            {showNotif && (
              <div className="glass-panel" style={notifDropdownStyle}>
                <div style={notifHeaderStyle}>
                  <strong style={{ fontSize: '0.95rem' }}>Environmental Alerts</strong>
                  <button style={clearBtnStyle} onClick={() => setShowNotif(false)}>Close</button>
                </div>
                <div style={notifListStyle}>
                  {notifications.length === 0 ? (
                    <div style={emptyNotifStyle}>No recent alerts. Stay alert, stay green!</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} style={notifItemStyle(n.read)}>
                        <div style={notifBullet(n.type)}></div>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.85rem' }}>{n.text}</p>
                          <span style={notifDateStyle}>{n.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Section */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                style={avatarButtonStyle} 
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img src={user.avatar} alt="avatar" style={avatarImgStyle} />
                <span style={usernameSpan}>{user.username}</span>
              </button>

              {showUserMenu && (
                <div className="glass-panel" style={userDropdownStyle}>
                  <div style={userHeaderStyle}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{user.username}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Eco Score: {user.ecoScore}</p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    style={dropdownLinkStyle}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>User Portal</span>
                  </Link>
                  <button 
                    onClick={handleLogoutClick}
                    style={{ ...dropdownLinkStyle, width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <LogOut size={16} color="var(--color-danger)" />
                    <span style={{ color: 'var(--color-danger)' }}>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            style={mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div style={mobileDrawerStyle} className="glass-panel">
          <nav style={mobileNavList}>
            <Link to="/" style={mobileNavLink(isActive('/'))} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/community" style={mobileNavLink(isActive('/community'))} onClick={() => setMobileMenuOpen(false)}>Community</Link>
            <Link to="/learn" style={mobileNavLink(isActive('/learn'))} onClick={() => setMobileMenuOpen(false)}>Learn</Link>
            <Link to="/climate-map" style={mobileNavLink(isActive('/climate-map'))} onClick={() => setMobileMenuOpen(false)}>ClimateMap</Link>
            <Link to="/about" style={mobileNavLink(isActive('/about'))} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" style={mobileNavLink(isActive('/contact'))} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            {user && (
              <Link to="/dashboard" style={mobileNavLink(isActive('/dashboard'))} onClick={() => setMobileMenuOpen(false)}>Dashboard Hub</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 2rem',
  zIndex: 999,
  borderRadius: 0,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  background: 'rgba(9, 15, 12, 0.8)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
};

const navContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer'
};

const logoIconBg = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-glow)'
};

const logoTextStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.4rem',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: 'var(--text-primary)'
};

const desktopNavLinks = {
  display: 'flex',
  gap: '2.5rem',
  alignItems: 'center'
};

const navLinkStyle = (active) => ({
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: active ? 'var(--color-primary)' : 'var(--text-secondary)',
  position: 'relative',
  padding: '0.25rem 0',
  transition: 'color var(--transition-fast)'
});

const actionsContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const actionBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  border: '1px solid transparent',
  position: 'relative'
};

const badgeStyle = {
  position: 'absolute',
  top: '2px',
  right: '2px',
  background: 'var(--color-danger)',
  color: 'white',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  minWidth: '16px',
  height: '16px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px'
};

const avatarButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--panel-border)',
  padding: '0.35rem 0.75rem',
  borderRadius: '20px',
  cursor: 'pointer',
  color: 'var(--text-primary)',
  transition: 'all 0.2s'
};

const avatarImgStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '1px solid var(--color-primary)'
};

const usernameSpan = {
  fontSize: '0.85rem',
  fontWeight: 600,
  fontFamily: 'var(--font-heading)'
};

const notifDropdownStyle = {
  position: 'absolute',
  top: '50px',
  right: '-10px',
  width: '320px',
  padding: '1rem',
  zIndex: 1000,
  borderRadius: '12px',
  background: 'rgba(9, 15, 12, 0.95)',
  boxShadow: 'var(--shadow-lg)'
};

const notifHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid var(--panel-border)',
  paddingBottom: '0.5rem',
  marginBottom: '0.5rem'
};

const clearBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--color-primary)',
  fontSize: '0.8rem',
  cursor: 'pointer'
};

const notifListStyle = {
  maxHeight: '250px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const emptyNotifStyle = {
  padding: '1.5rem 0',
  textAlign: 'center',
  fontSize: '0.8rem',
  color: 'var(--text-muted)'
};

const notifItemStyle = (read) => ({
  display: 'flex',
  gap: '0.75rem',
  padding: '0.5rem 0.25rem',
  borderRadius: '6px',
  background: read ? 'transparent' : 'rgba(0, 245, 160, 0.05)',
  transition: 'background 0.2s'
});

const notifBullet = (type) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  marginTop: '6px',
  flexShrink: 0,
  background: type === 'warning' ? 'var(--color-warning)' : type === 'success' ? 'var(--color-success)' : 'var(--color-secondary)'
});

const notifDateStyle = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)'
};

const userDropdownStyle = {
  position: 'absolute',
  top: '50px',
  right: 0,
  width: '180px',
  padding: '0.5rem',
  zIndex: 1000,
  borderRadius: '12px',
  background: 'rgba(9, 15, 12, 0.95)',
  boxShadow: 'var(--shadow-lg)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
};

const userHeaderStyle = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--panel-border)',
  marginBottom: '0.25rem'
};

const dropdownLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s'
};

const mobileMenuToggle = {
  display: 'none',
  background: 'none',
  border: 'none',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  padding: '0.25rem'
};

const mobileDrawerStyle = {
  position: 'absolute',
  top: '70px',
  left: 0,
  width: '100%',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: 0,
  background: 'rgba(9, 15, 12, 0.95)',
  padding: '1.5rem',
  boxShadow: 'var(--shadow-lg)'
};

const mobileNavList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const mobileNavLink = (active) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: active ? 'var(--color-primary)' : 'var(--text-secondary)'
});

// Inject styling details dynamically for responsive elements
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      header nav { display: none !important; }
      header button[aria-label="Toggle Menu"] { display: block !important; }
      .username-label { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;
