/* src/pages/Dashboard.jsx */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ChartWidget } from '../components/ChartWidget';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  ChevronRight, 
  Activity, 
  TrendingDown,
  Camera,
  Heart,
  Cpu
} from 'lucide-react';
import '../styles/global.css';

export const Dashboard = () => {
  const { user, carbonLogs, complaints, notifications } = useContext(AppContext);

  // Fallback default user metrics if logged out
  const username = user ? user.username : 'Guest Citizen';
  const ecoScore = user ? user.ecoScore : 80;
  const hours = user ? user.volunteerHours : 4;
  const avatar = user ? user.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

  // Format carbon logs for ChartWidget
  const chartData = carbonLogs.map(log => ({
    label: log.label.replace(' Estimate', '').replace(' Reductions', '').replace(' Offsets', ''),
    value: log.totalScore
  }));

  const activeAlerts = notifications.filter(n => n.type === 'warning');

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Dashboard Top Banner */}
      <section style={topBanner} className="glass-panel">
        <div style={userInfo}>
          <img src={avatar} alt="avatar" style={userAvatar} />
          <div>
            <h1 style={greetingText}>Active Hub: {username}</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Welcome back to your ecological dashboard. Your efforts offset real carbon emissions.
            </p>
          </div>
        </div>
        <div style={scoreWrapper}>
          <div style={scoreBlock}>
            <span style={scoreLabel}>Eco Score</span>
            <span style={scoreNum}>{ecoScore} pts</span>
          </div>
          <div style={scoreBlock}>
            <span style={scoreLabel}>Volunteer Hours</span>
            <span style={scoreNum}>{hours} hrs</span>
          </div>
        </div>
      </section>

      {/* Local Environment Metrics */}
      <section style={metricsGrid} className="grid-cols-3">
        <div className="glass-card" style={metricCard}>
          <div style={metricHeader}>
            <div style={iconBox('secondary')}><CloudSun size={20} /></div>
            <span style={metricLabel}>Local Weather</span>
          </div>
          <div style={metricMain}>
            <h2 style={metricValue}>24°C</h2>
            <span style={metricSubtext}>Clear Sky · Humidity 52%</span>
          </div>
        </div>

        <div className="glass-card" style={metricCard}>
          <div style={metricHeader}>
            <div style={iconBox('primary')}><Wind size={20} /></div>
            <span style={metricLabel}>Air Quality Index</span>
          </div>
          <div style={metricMain}>
            <h2 style={{ ...metricValue, color: 'var(--color-warning)' }}>145</h2>
            <span style={metricSubtext} className="badge badge-warning">Unhealthy (Sensitive)</span>
          </div>
        </div>

        <div className="glass-card" style={metricCard}>
          <div style={metricHeader}>
            <div style={iconBox('accent')}><Droplets size={20} /></div>
            <span style={metricLabel}>Water Turbidity</span>
          </div>
          <div style={metricMain}>
            <h2 style={{ ...metricValue, color: 'var(--color-primary)' }}>1.8 NTU</h2>
            <span style={metricSubtext} className="badge badge-success">Clean Reservoir</span>
          </div>
        </div>
      </section>

      {/* Main Grid content: Alerts + Carbon Trends */}
      <div style={dashboardSplit}>
        {/* Carbon trends and charts */}
        <div className="glass-card" style={leftPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingDown size={18} color="var(--color-primary)" />
              <span>Carbon Footprint Trend</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tons CO₂/Year</span>
          </div>
          <ChartWidget type="line" data={chartData} title="Estimated Annual Footprint over time" />
          <div style={chartDetails}>
            <p style={{ margin: 0 }}>
              Your current estimated footprint is <strong>{chartData[chartData.length - 1]?.value || 0} tons CO₂/yr</strong>. Average target footprint is <strong>4.0 tons</strong>.
            </p>
            <Link to="/carbon-calc" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              Recalculate
            </Link>
          </div>
        </div>

        {/* Real-time Alerts and Quick Actions */}
        <div style={rightPanel}>
          {/* Alerts Card */}
          <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="var(--color-warning)" />
              <span>Safety warnings</span>
            </h3>
            <div style={alertsList}>
              {activeAlerts.map((a, i) => (
                <div key={i} style={alertItem}>
                  <div style={alertIconBorder}><AlertTriangle size={14} color="var(--color-warning)" /></div>
                  <div style={{ flex: 1 }}>
                    <p style={alertText}>{a.text}</p>
                    <span style={alertDate}>{a.date}</span>
                  </div>
                </div>
              ))}
              {activeAlerts.length === 0 && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                  No active ecological warnings in your Sector bounds.
                </p>
              )}
            </div>
          </div>

        {/* Quick Actions */}
<div className="glass-card" style={quickActionsCard}>
  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Node Actions</h3>

  <div style={actionsBtnGrid}>
    <Link to="/complaints" style={actionBtn}>
      <Camera size={16} color="var(--color-primary)" />
      <span>File Threat Report</span>
      <ChevronRight size={14} />
    </Link>

    <Link to="/petitions" style={actionBtn}>
      <Heart size={16} color="var(--color-secondary)" />
      <span>Sign Campaigns</span>
      <ChevronRight size={14} />
    </Link>

    <Link to="/ai-assistant" style={actionBtn}>
      <Cpu size={16} color="var(--color-primary)" />
      <span>Ask AI Assistant</span>
      <ChevronRight size={14} />
    </Link>
  </div>
</div>

{/* Recent Activities */}
<div className="glass-card" style={{ padding: '1.5rem' }}>
  <h3 style={{ marginBottom: '1rem' }}>Recent Activities</h3>

  <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
    <li>Filed Plastic Waste complaint</li>
    <li>Signed Clean Air petition</li>
    <li>Reduced carbon footprint by 1.3 tons</li>
    <li>Earned 20 Eco Points</li>
  </ul>
</div>
        </div>
      </div>
    </div>
  );
};

const wrapper = {
  width: '100%',
  paddingBottom: '4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const topBanner = {
  padding: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1.5rem',
  background: 'rgba(9, 15, 12, 0.6)'
};

const userInfo = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem'
};

const userAvatar = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid var(--color-primary)',
  boxShadow: 'var(--shadow-sm)'
};

const greetingText = {
  fontSize: '1.75rem',
  fontWeight: 800,
  margin: 0,
  color: 'rgba(169, 217, 217, 0.8)'
};

const scoreWrapper = {
  display: 'flex',
  gap: '2rem'
};

const scoreBlock = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

const scoreLabel = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const scoreNum = {
  fontSize: '1.5rem',
  fontWeight: 800,
  color: 'var(--color-primary)'
};

const metricsGrid = {
  width: '100%'
};

const metricCard = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const metricHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const metricLabel = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const iconBox = (color) => ({
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: color === 'primary' ? 'rgba(0, 245, 160, 0.1)' : color === 'secondary' ? 'rgba(0, 217, 245, 0.1)' : 'rgba(16, 185, 129, 0.1)',
  color: color === 'primary' ? 'var(--color-primary)' : color === 'secondary' ? 'var(--color-secondary)' : 'var(--color-primary)'
});

const metricMain = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
};

const metricValue = {
  fontSize: '2rem',
  fontWeight: 800,
  margin: 0
};

const metricSubtext = {
  fontSize: '0.8rem',
  color: 'var(--text-secondary)'
};

const dashboardSplit = {
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr',
  gap: '2rem',
  width: '100%'
};

const leftPanel = {
  padding: '1.75rem'
};

const chartDetails = {
  marginTop: '1.5rem',
  paddingTop: '1rem',
  borderTop: '1px solid var(--panel-border)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  flexWrap: 'wrap',
  gap: '1rem'
};

const rightPanel = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const alertsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const alertItem = {
  display: 'flex',
  gap: '0.75rem',
  padding: '0.75rem',
  background: 'rgba(245, 158, 11, 0.03)',
  border: '1px solid rgba(245, 158, 11, 0.15)',
  borderRadius: '8px'
};

const alertIconBorder = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1px solid rgba(245, 158, 11, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};

const alertText = {
  fontSize: '0.8rem',
  margin: 0,
  lineHeight: '1.4'
};

const alertDate = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)'
};

const quickActionsCard = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column'
};

const actionsBtnGrid = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const actionBtn = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.85rem 1rem',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--panel-border)',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s',
  textDecoration: 'none',
  fontSize: '0.88rem',
  fontWeight: '600'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .dashboard-split { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;
