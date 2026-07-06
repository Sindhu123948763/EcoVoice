/* src/components/ChartWidget.jsx */
import React from 'react';

export const ChartWidget = ({ type = 'line', data = [], title = 'Environmental Analytics' }) => {
  if (!data || data.length === 0) {
    return <div style={emptyStyle}>No data points recorded</div>;
  }

  // Dimension settings
  const width = 500;
  const height = 220;
  const padding = 40;

  // Max and min calculation
  const values = data.map(d => d.value);
  const maxVal = Math.max(...values, 10);
  const minVal = 0;
  const valRange = maxVal - minVal;

  // Helper coordinate mapping functions
  const getX = (index) => {
    return padding + (index * (width - padding * 2)) / (data.length - 1 || 1);
  };

  const getY = (val) => {
    return height - padding - ((val - minVal) * (height - padding * 2)) / valRange;
  };

  // SVG Render Helper Functions
  const renderLine = () => {
    const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
    
    // Create fill path underneath line
    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    const bottomY = height - padding;
    const fillPath = `M ${firstX} ${bottomY} ` + data.map((d, i) => `L ${getX(i)} ${getY(d.value)}`).join(' ') + ` L ${lastX} ${bottomY} Z`;

    return (
      <>
        {/* Gradient fill */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#chartGradient)" />
        <polyline
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          points={points}
        />
        {/* Render interactive dots */}
        {data.map((d, i) => (
          <g key={i} className="chart-dot-group">
            <circle
              cx={getX(i)}
              cy={getY(d.value)}
              r="6"
              fill="#050a07"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              style={{ transition: 'r 0.2s', cursor: 'pointer' }}
            />
            {/* Tooltip on hover */}
            <title>{`${d.label}: ${d.value}`}</title>
          </g>
        ))}
      </>
    );
  };

  const renderBar = () => {
    const totalBars = data.length;
    const chartWidth = width - padding * 2;
    const gap = 15;
    const barWidth = (chartWidth - (totalBars - 1) * gap) / totalBars;

    return data.map((d, i) => {
      const x = padding + i * (barWidth + gap);
      const y = getY(d.value);
      const barHeight = height - padding - y;

      return (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={barWidth}
            height={Math.max(barHeight, 4)}
            rx="4"
            fill="url(#barGradient)"
            style={{ transition: 'all 0.3s' }}
          />
          <title>{`${d.label}: ${d.value}`}</title>
        </g>
      );
    });
  };

  return (
    <div style={containerStyle}>
      <h4 style={titleStyle}>{title}</h4>
      <div style={chartWrapper}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          width="100%" 
          height="100%" 
          style={{ overflow: 'visible' }}
        >
          {type === 'bar' && (
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
            </defs>
          )}

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + ratio * (height - padding * 2);
            const val = maxVal - ratio * valRange;
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="var(--panel-border)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = type === 'line' 
              ? getX(i) 
              : padding + i * ((width - padding * 2) / data.length) + (width - padding * 2) / (data.length * 2);
            return (
              <text
                key={i}
                x={x}
                y={height - 15}
                fill="var(--text-secondary)"
                fontSize="11"
                textAnchor="middle"
              >
                {d.label}
              </text>
            );
          })}

          {/* Render charts */}
          {type === 'line' ? renderLine() : renderBar()}
        </svg>
      </div>
    </div>
  );
};

const containerStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.01)',
  padding: '0.5rem',
  borderRadius: '8px'
};

const titleStyle = {
  fontSize: '1rem',
  color: 'var(--text-secondary)',
  marginBottom: '1rem',
  fontFamily: 'var(--font-heading)'
};

const chartWrapper = {
  width: '100%',
  height: '220px',
  position: 'relative'
};

const emptyStyle = {
  height: '180px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-muted)',
  fontSize: '0.9rem',
  border: '1px dashed var(--panel-border)',
  borderRadius: '8px'
};

export default ChartWidget;
