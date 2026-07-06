/* src/components/MapWidget.jsx */
import React, { useState } from 'react';
import { ShieldAlert, Compass, Eye, Filter } from 'lucide-react';

export const MapWidget = ({ activeLayer = 'aqi', onRegionSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  // Region dataset simulating city zones
  const regions = [
    {
      id: 'r1',
      name: 'North Industrial Valley (Sector A)',
      path: 'M 50 40 L 220 30 L 250 110 L 80 120 Z',
      aqi: 145, // Orange alert
      water: 'Deficient (Heavy runoff detected)',
      deforestation: 'None',
      fires: 'Low risk',
      heat: 38,
      complaints: 4
    },
    {
      id: 'r2',
      name: 'Oakwood Forest Preserve (Sector B)',
      path: 'M 220 30 L 450 40 L 420 140 L 250 110 Z',
      aqi: 45, // Healthy
      water: 'Pristine',
      deforestation: 'Critical logging detected',
      fires: 'Active Warning',
      heat: 24,
      complaints: 8
    },
    {
      id: 'r3',
      name: 'Central Metropol (Sector C)',
      path: 'M 80 120 L 250 110 L 280 200 L 90 220 Z',
      aqi: 168, // Red alert
      water: 'Fair',
      deforestation: 'Urban canopy - 12%',
      fires: 'Safe',
      heat: 41,
      complaints: 12
    },
    {
      id: 'r4',
      name: 'Reservoir Watershed (Sector D)',
      path: 'M 250 110 L 420 140 L 390 230 L 280 200 Z',
      aqi: 58,
      water: 'Critical (E-Waste & Plastic pollution)',
      deforestation: 'Healthy woodland',
      fires: 'Safe',
      heat: 27,
      complaints: 6
    }
  ];

  // Helper function to color code based on the active layered view
  const getFillColor = (region) => {
    const isSelected = selectedId === region.id;
    
    switch (activeLayer) {
      case 'aqi':
        if (region.aqi > 150) return isSelected ? 'rgba(239, 68, 68, 0.85)' : 'rgba(239, 68, 68, 0.4)'; // Red
        if (region.aqi > 100) return isSelected ? 'rgba(245, 158, 11, 0.85)' : 'rgba(245, 158, 11, 0.4)'; // Amber
        return isSelected ? 'rgba(52, 211, 153, 0.85)' : 'rgba(52, 211, 153, 0.3)'; // Green

      case 'water':
        if (region.id === 'r4') return isSelected ? 'rgba(239, 68, 68, 0.85)' : 'rgba(248, 113, 113, 0.4)';
        if (region.id === 'r1') return isSelected ? 'rgba(245, 158, 11, 0.85)' : 'rgba(245, 158, 11, 0.4)';
        return isSelected ? 'rgba(0, 217, 245, 0.85)' : 'rgba(0, 217, 245, 0.25)';

      case 'deforestation':
        if (region.id === 'r2') return isSelected ? 'rgba(239, 68, 68, 0.85)' : 'rgba(239, 68, 68, 0.4)';
        return isSelected ? 'rgba(16, 185, 129, 0.85)' : 'rgba(16, 185, 129, 0.2)';

      case 'fires':
        if (region.id === 'r2') return isSelected ? 'rgba(239, 68, 68, 0.85)' : 'rgba(248, 113, 113, 0.5)';
        return isSelected ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)';

      case 'heat':
        if (region.heat > 40) return isSelected ? 'rgba(220, 38, 38, 0.9)' : 'rgba(220, 38, 38, 0.5)';
        if (region.heat > 30) return isSelected ? 'rgba(245, 158, 11, 0.85)' : 'rgba(245, 158, 11, 0.4)';
        return isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)';

      default:
        return 'rgba(255, 255, 255, 0.05)';
    }
  };

  const handleRegionClick = (region) => {
    setSelectedId(region.id);
    if (onRegionSelect) {
      onRegionSelect(region);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={legendStyle}>
        <div style={legendTitleStyle}>
          <Filter size={14} style={{ color: 'var(--color-primary)' }} />
          <span>Active Layer: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{activeLayer}</strong></span>
        </div>
        <div style={legendScale}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low Risk</span>
          <div style={gradientBar}></div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High Hazard</span>
        </div>
      </div>

      <div style={mapWrapper}>
        <svg viewBox="0 0 500 250" width="100%" height="100%">
          {/* Base grid details */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" rx="8" />

          {/* Region paths */}
          {regions.map(region => (
            <path
              key={region.id}
              d={region.path}
              fill={getFillColor(region)}
              stroke={selectedId === region.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={selectedId === region.id ? '2' : '1'}
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onClick={() => handleRegionClick(region)}
            >
              <title>{region.name}</title>
            </path>
          ))}

          {/* Active fire pulse animation overlay */}
          {activeLayer === 'fires' && (
            <g transform="translate(330, 80)">
              <circle r="8" fill="var(--color-danger)" opacity="0.8">
                <animate attributeName="r" values="4;16;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="var(--color-danger)" />
              <text x="12" y="4" fill="var(--color-danger)" fontSize="9" fontWeight="bold">ACTIVE BURN</text>
            </g>
          )}

          {/* Map Compass */}
          <g transform="translate(40, 210)" opacity="0.4">
            <circle r="15" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--text-muted)" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--text-muted)" />
            <text x="-4" y="-17" fill="var(--text-primary)" fontSize="8">N</text>
          </g>
        </svg>
      </div>

      <div style={infoBanner}>
        {selectedId ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <strong style={{ color: 'var(--color-primary)' }}>{regions.find(r => r.id === selectedId).name}</strong>
              <span className="badge badge-info">{regions.find(r => r.id === selectedId).complaints} Active Reports</span>
            </div>
            <div style={statGrid}>
              <span>AQI Score: <b style={{ color: 'white' }}>{regions.find(r => r.id === selectedId).aqi}</b></span>
              <span>Water Status: <b style={{ color: 'white' }}>{regions.find(r => r.id === selectedId).water.substring(0, 15)}...</b></span>
              <span>Avg Temp: <b style={{ color: 'white' }}>{regions.find(r => r.id === selectedId).heat}°C</b></span>
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <Compass size={16} />
            <span>Select a sector region on the map to analyze real-time environmental metrics</span>
          </div>
        )}
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem'
};

const legendStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(255, 255, 255, 0.02)',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--panel-border)',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const legendTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)'
};

const legendScale = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const gradientBar = {
  width: '100px',
  height: '8px',
  borderRadius: '4px',
  background: 'linear-gradient(to right, var(--color-success), var(--color-warning), var(--color-danger))'
};

const mapWrapper = {
  width: '100%',
  height: '260px',
  position: 'relative',
  background: 'rgba(5, 10, 7, 0.5)',
  border: '1px solid var(--panel-border)',
  borderRadius: '12px',
  overflow: 'hidden'
};

const infoBanner = {
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--panel-border)',
  borderRadius: '8px',
  fontSize: '0.85rem'
};

const statGrid = {
  display: 'flex',
  gap: '1.5rem',
  marginTop: '0.5rem',
  color: 'var(--text-secondary)',
  flexWrap: 'wrap'
};

export default MapWidget;
