/* src/pages/Home.jsx */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowRight, Shield, Globe, Award, HeartHandshake, Eye } from 'lucide-react';
import '../styles/global.css';

export const Home = () => {
  const { complaints, petitions } = useContext(AppContext);
  
  // Animated stats
  const [stats, setStats] = useState({ citizens: 1200, co2: 8430, resolved: 142 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        citizens: prev.citizens + Math.floor(Math.random() * 2),
        co2: prev.co2 + Math.floor(Math.random() * 5),
        resolved: prev.resolved + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const newsItems = [
    {
      title: "Atmospheric Methane Levels Surge Past Expected Limits",
      source: "Climate Monitor",
      date: "July 2, 2026",
      desc: "Agricultural practices and pipeline fractures in the northern plains release unprecedented volume. Experts urge tightening regional regulations.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "New Biodegradable Film Replaces Vegetable Plastic Sleeves",
      source: "GreenTech Weekly",
      date: "June 29, 2026",
      desc: "Developed from cellulose extract, the film degrades completely in compost environments within 18 days. Early tests in supermarket chains show promising results.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Ocean Re-wilding Project Restores 400 Hectares of Kelp Forest",
      source: "Marine Life",
      date: "June 24, 2026",
      desc: "Inshore marine habitats off the coastal shelf show strong recovery indicators. Biodiversity scores have increased by 45% in active pilot zones.",
      image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Hero Banner Section */}
      <section style={heroSection}>
        <div style={heroOverlay}></div>
        <div style={heroContent}>
          <span className="badge badge-success" style={{ marginBottom: '1rem', background: 'rgba(0, 245, 160, 0.12)' }}>
            Empowering Citizen Ecology
          </span>
          <h1 style={heroTitle}>
            Give Earth a <span className="text-gradient">Voice</span>
          </h1>
          <p style={heroSub}>
            EcoVoice Global is the decentralized public ledger and workspace for reporting environmental concerns, organizing green campaigns, and calculating ecological scores.
          </p>
          <div style={heroActions}>
            <Link to="/auth" className="btn btn-primary">
              <span>Join the Alliance</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Live Counter Dashboard */}
      <section style={statsSection}>
        <div className="grid-cols-3" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="glass-card" style={statCardStyle}>
            <Globe size={32} color="var(--color-primary)" />
            <h2 style={statNum}>{stats.citizens.toLocaleString()}+</h2>
            <p style={statLabel}>Active Global Guardians</p>
          </div>
          <div className="glass-card" style={statCardStyle}>
            <Shield size={32} color="var(--color-secondary)" />
            <h2 style={statNum}>{(stats.co2 / 1000).toFixed(2)}k Tons</h2>
            <p style={statLabel}>CO₂ Emissions Offset</p>
          </div>
          <div className="glass-card" style={statCardStyle}>
            <Award size={32} color="var(--color-success)" />
            <h2 style={statNum}>{stats.resolved}</h2>
            <p style={statLabel}>Environmental Violations Resolved</p>
          </div>
        </div>
      </section>

      {/* Vision & Core Features */}
      <section style={featuresSection}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Ecological Operations</h2>
          <p style={sectionSub}>Citizens report, validate, and lobby. Our community builds accountability.</p>
        </div>

        <div className="grid-cols-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="glass-panel" style={featureItem}>
            <div style={iconBox('primary')}><Shield size={20} /></div>
            <h3 style={featureItemTitle}>Instant AI Threat Scan</h3>
            <p style={featureItemText}>
              File complaints with images or video. Our AI model immediately verifies threat indicators, geolocates targets, and flags authorities.
            </p>
          </div>
          <div className="glass-panel" style={featureItem}>
            <div style={iconBox('secondary')}><Globe size={20} /></div>
            <h3 style={featureItemTitle}>Climate Layer Maps</h3>
            <p style={featureItemText}>
              Visualize real-time local and global reports on Air Quality index, Deforestation heat zones, and Water Pollution indicators.
            </p>
          </div>
          <div className="glass-panel" style={featureItem}>
            <div style={iconBox('accent')}><HeartHandshake size={20} /></div>
            <h3 style={featureItemTitle}>Lobby & Petition</h3>
            <p style={featureItemText}>
              Convert community reports into legal petitions. Track signatures, build digital community coalitions, and prompt regulatory audits.
            </p>
          </div>
        </div>
      </section>

      {/* Climate News Slider */}
      <section style={newsSection}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Climate Intelligence</h2>
          <p style={sectionSub}>Key environmental updates curated directly by our network scientists.</p>
        </div>
        <div className="grid-cols-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {newsItems.map((n, i) => (
            <div key={i} className="glass-card" style={newsCard}>
              <div style={newsImgWrapper}>
                <img src={n.image} alt={n.title} style={newsImg} />
                <span style={newsBadge}>{n.source}</span>
              </div>
              <div style={newsContent}>
                <span style={newsDate}>{n.date}</span>
                <h4 style={newsTitle}>{n.title}</h4>
                <p style={newsDesc}>{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const wrapper = {
  width: '100%',
  paddingBottom: '4rem'
};

const heroSection = {
  position: 'relative',
  padding: '8rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80") no-repeat center center/cover',
  minHeight: '650px',
  borderRadius: '24px',
  overflow: 'hidden',
  marginBottom: '2rem'
};

const heroOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(5,10,7,0.7), rgba(5,10,7,0.95))',
  zIndex: 1
};

const heroContent = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const heroTitle = {
  fontSize: '4rem',
  fontWeight: 900,
  letterSpacing: '-0.03em',
  marginBottom: '1rem',
  lineHeight: '1.1'
};

const heroSub = {
  fontSize: '1.25rem',
  color: 'var(--text-secondary)',
  marginBottom: '2.5rem',
  lineHeight: '1.6'
};

const heroActions = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const statsSection = {
  padding: '2rem 1rem 4rem 1rem',
  position: 'relative',

  zIndex: 10
};

const statCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '0.75rem',
  padding: '2.5rem 1.5rem',
  border: '1px solid var(--panel-border)',
  // background: 'rgba(9, 15, 12, 0.9)'
  // background: '#666d68',
  boxShadow: 'var(--shadow-md)'
};

const statNum = {
  fontSize: '2.5rem',
  fontWeight: 800,
  margin: 0,
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em'
};

const statLabel = {
  // color: 'var(--text-muted)',
  color:  '#9eb4d5',
  fontWeight: 600,
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const featuresSection = {
  padding: '4rem 2rem',
  width: '100%'
};

const sectionHeader = {
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto 3rem auto'
};

const sectionTitle = {
  fontSize: '2.2rem',
  fontWeight: 800,
  color: 'rgba(169, 217, 217, 0.8)'
};

const sectionSub = {
  color: 'var(--text-secondary)',
  fontSize: '1rem'
};

const featureItem = {
  padding: '2.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const iconBox = (color) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#050a07',
  background: color === 'primary' ? 'var(--color-primary)' : color === 'secondary' ? 'var(--color-secondary)' : 'var(--color-primary)'
});

const featureItemTitle = {
  fontSize: '1.25rem',
  fontWeight: '700'
};

const featureItemText = {
  color: '#9eb4d5',
  fontSize: '0.92rem',
  lineHeight: '1.6'
};

const newsSection = {
  padding: '4rem 2rem'
};

const newsCard = {
  padding: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const newsImgWrapper = {
  width: '100%',
  height: '180px',
  position: 'relative',
  overflow: 'hidden'
};

const newsImg = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s'
};

const newsBadge = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  background: 'rgba(5, 10, 7, 0.8)',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: 'var(--color-primary)'
};

const newsContent = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const newsDate = {
  fontSize: '0.75rem',
  color: '#9eb4d5'
};

const newsTitle = {
  fontSize: '1.05rem',
  fontWeight: '700',
  lineHeight: '1.3'
};

const newsDesc = {
  fontSize: '0.85rem',
  color: '#9eb4d5',
  lineHeight: '1.5'
};

// Add responsive font overrides
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .hero-title { font-size: 2.5rem !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Home;
