/* src/components/Sidebar.jsx */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileText, 
  Users, 
  Map, 
  Calculator, 
  Cpu, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard Hub', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Eco Complaints', path: '/complaints', icon: <AlertTriangle size={20} /> },
    { name: 'Petition Platform', path: '/petitions', icon: <FileText size={20} /> },
    { name: 'Global Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Interactive Map', path: '/climate-map', icon: <Map size={20} /> },
    { name: 'Carbon Calculator', path: '/carbon-calc', icon: <Calculator size={20} /> },
    { name: 'AI Consultant', path: '/ai-assistant', icon: <Cpu size={20} /> }
  ];

  const sidebarWidth = collapsed ? '70px' : '260px';

  return (
    <aside style={{ ...asideStyle, width: sidebarWidth }} className="glass-panel">
      {/* Toggle button */}
      <button 
        style={toggleButtonStyle} 
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation List */}
      <nav style={navStyle}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => navLinkStyle(isActive, collapsed)}
            title={collapsed ? item.name : undefined}
          >
            <div style={iconWrapper}>{item.icon}</div>
            {!collapsed && <span style={labelStyle}>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Mini Footer indicator when not collapsed */}
      {!collapsed && (
        <div style={sidebarFooter}>
          <div style={statusDot}></div>
          <span style={footerText}>EcoVoice Node: Active</span>
        </div>
      )}
    </aside>
  );
};

const asideStyle = {
  height: 'calc(100vh - 70px)',
  position: 'sticky',
  top: '70px',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem 0.5rem',
  borderTop: 'none',
  borderLeft: 'none',
  borderBottom: 'none',
  borderRadius: 0,
  transition: 'width var(--transition-normal)',
  background: 'rgba(9, 15, 12, 0.85)',
  zIndex: 90,
  overflowX: 'hidden'
};

const toggleButtonStyle = {
  position: 'absolute',
  top: '1.5rem',
  right: '10px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--panel-border)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  zIndex: 100
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '3.5rem',
  flex: 1
};

const navLinkStyle = (isActive, isCollapsed) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
  background: isActive ? 'rgba(0, 245, 160, 0.06)' : 'transparent',
  border: isActive ? '1px solid rgba(0, 245, 160, 0.15)' : '1px solid transparent',
  textDecoration: 'none',
  gap: '1rem',
  transition: 'all var(--transition-fast)',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  cursor: 'pointer'
});

const iconWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: 600,
  fontFamily: 'var(--font-heading)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const sidebarFooter = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1rem',
  borderTop: '1px solid var(--panel-border)',
  marginTop: 'auto'
};

const statusDot = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-primary)',
  boxShadow: 'var(--shadow-glow)',
  animation: 'pulseGlow 2s infinite'
};

const footerText = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-heading)',
  fontWeight: 500
};

export default Sidebar;
