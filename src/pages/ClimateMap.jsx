/* src/pages/ClimateMap.jsx */
import React, { useState } from 'react';
import { MapWidget } from '../components/MapWidget';
import { Layers, ShieldAlert, Thermometer, Flame, Leaf, Wind } from 'lucide-react';
import '../styles/global.css';

export const ClimateMap = () => {
  const [activeLayer, setActiveLayer] = useState('aqi');
  const [inspectedRegion, setInspectedRegion] = useState(null);

  const layers = [
    { id: 'aqi', name: 'Air Quality', icon: <Wind size={16} /> },
    { id: 'water', name: 'Water Purity', icon: <DropletIcon /> },
    { id: 'deforestation', name: 'Forest Loss', icon: <Leaf size={16} /> },
    { id: 'fires', name: 'Wildfire Points', icon: <Flame size={16} /> },
    { id: 'heat', name: 'Heat Island', icon: <Thermometer size={16} /> }
  ];

  const handleRegionSelect = (region) => {
    setInspectedRegion(region);
  };

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Header */}
      <section style={headerRow}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'rgba(56, 101, 79, 1)' }}>Climate Data Desk</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(54, 67, 60, 1)' }}>Toggle environmental diagnostic layers. Select sectors to inspect compliance records.</p>
        </div>
      </section>

      {/* Main Map Workspace layout */}
      <div style={workspaceGrid}>
        {/* Left Side Controls & Map */}
        <div style={mapCol}>
          {/* Layer buttons panel */}
          <div className="glass-panel" style={layersBar}>
            <div style={panelTitleRow}>
              <Layers size={16} color="var(--color-primary)" />
              <span style={panelTitleText}>Display Layers</span>
            </div>
            <div style={layersList}>
              {layers.map(l => (
                <button
                  key={l.id}
                  onClick={() => { setActiveLayer(l.id); }}
                  style={activeLayer === l.id ? activeLayerBtn : layerBtn}
                >
                  {l.icon}
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Wrapper */}
          <div className="glass-panel" style={mapWrapper}>
            <MapWidget activeLayer={activeLayer} onRegionSelect={handleRegionSelect} />
          </div>
        </div>

        {/* Right Side regional stats inspector */}
        <div style={inspectorCol}>
          {inspectedRegion ? (
            <div className="glass-panel animate-fade" style={inspectCard}>
              <h3 style={regionNameText}>{inspectedRegion.name}</h3>
              <span className="badge badge-info" style={{ width: 'fit-content' }}>Sector Registry Node</span>
              
              <div style={detailsGrid}>
                <div style={detailBox}>
                  <strong style={detailLabel}>Air Quality</strong>
                  <span style={detailVal(inspectedRegion.aqi > 100 ? 'var(--color-warning)' : 'var(--color-success)')}>
                    {inspectedRegion.aqi} AQI
                  </span>
                </div>
                <div style={detailBox}>
                  <strong style={detailLabel}>Avg Temperature</strong>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{inspectedRegion.heat}°C</span>
                </div>
                <div style={detailBox}>
                  <strong style={detailLabel}>Water Reservoir</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-secondary)' }}>{inspectedRegion.water}</span>
                </div>
                <div style={detailBox}>
                  <strong style={detailLabel}>Forest Canopy</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{inspectedRegion.deforestation}</span>
                </div>
              </div>

              {/* Warnings and claims count */}
              <div style={warningsBox}>
                <h4 style={secTitle}>Recorded Incidents</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <ShieldAlert size={18} color="var(--color-warning)" />
                  <span style={{ fontSize: '0.88rem' }}>
                    <strong>{inspectedRegion.complaints} Active environmental threats</strong> logged in this Sector bounds.
                  </span>
                </div>
              </div>

              {/* Event Suggestion widget */}
              <div style={eventPromoBox}>
                <span style={promoLabel}>Local Initiative</span>
                <h4 style={promoTitle}>Sector Tree Canopy Drive</h4>
                <p style={promoDesc}>Help counter the Sector urban heat island. Join local advocates this Saturday at 09:00 AM.</p>
                <button className="btn btn-primary" onClick={() => alert('Successfully registered for Tree Canopy Drive!')} style={{ width: '100%', padding: '0.45rem', fontSize: '0.82rem' }}>
                  Volunteer to Offset
                </button>
              </div>
            </div>
          ) : (
            <div style={emptyInspectStyle} className="glass-panel">
              <Layers size={40} color="var(--text-muted)" />
              <h3 style={{ margin: '1rem 0 0.5rem 0' }}>Sectors Hub</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Select a zone boundaries on the map to load real-time database files, air quality warnings, and local volunteer networks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SVG Droplet Helper Icon
const DropletIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const wrapper = {
  width: '100%',
  paddingBottom: '4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const headerRow = {
  marginBottom: '0.5rem'
};

const workspaceGrid = {
  display: 'grid',
  gridTemplateColumns: '1.6fr 1fr',
  gap: '2rem'
};

const mapCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const layersBar = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  background: 'rgba(15, 16, 16, 1)'
};

const panelTitleRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const panelTitleText = {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const layersList = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap'
};

const layerBtn = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--panel-border)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.85rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.82rem',
  transition: 'all 0.2s'
};

const activeLayerBtn = {
  background: 'var(--color-primary)',
  border: '1px solid var(--color-primary)',
  color: '#050a07',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.85rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.82rem',
  fontWeight: 'bold',
  boxShadow: 'var(--shadow-glow)'
};

const mapWrapper = {
  padding: '1.5rem',
  background: 'rgba(15, 16, 16, 1)'
};

const inspectorCol = {
  position: 'sticky',
  top: '90px',
  height: 'fit-content'
};

const inspectCard = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  background: 'rgba(15, 16, 16, 1)'
};

const regionNameText = {
  fontSize: '1.4rem',
  fontWeight: 800,
  margin: 0
};

const detailsGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  borderTop: '1px solid var(--panel-border)',
  paddingTop: '1.25rem',
  marginTop: '0.5rem'
};

const detailBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  background: 'rgba(255,255,255,0.01)',
  border: '1px solid var(--panel-border)',
  padding: '0.75rem',
  borderRadius: '8px'
};

const detailLabel = {
  fontSize: '0.72rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const detailVal = (col) => ({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: col
});

const warningsBox = {
  padding: '0.85rem',
  background: 'rgba(245, 158, 11, 0.03)',
  border: '1px solid rgba(245, 158, 11, 0.15)',
  borderRadius: '8px'
};

const secTitle = {
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: 0
};

const eventPromoBox = {
  padding: '1rem',
  background: 'rgba(0, 245, 160, 0.02)',
  border: '1px solid rgba(0, 245, 160, 0.15)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '0.5rem'
};

const promoLabel = {
  fontSize: '0.65rem',
  fontWeight: 'bold',
  color: 'var(--color-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em'
};

const promoTitle = {
  fontSize: '0.95rem',
  margin: 0,
  fontWeight: 'bold'
};

const promoDesc = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  margin: 0,
  lineHeight: '1.4'
};

const emptyInspectStyle = {
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '2rem',
  color: 'var(--text-secondary)'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .workspace-grid { grid-template-columns: 1fr !important; }
      .inspector-col { position: relative !important; top: 0 !important; }
    }
  `;
  document.head.appendChild(style);
}

export default ClimateMap;
