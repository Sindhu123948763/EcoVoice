/* src/pages/About.jsx */
import React from 'react';
import { Award, Compass, Heart, Users } from 'lucide-react';
import '../styles/global.css';

export const About = () => {
  const team = [
    {
      name: "Dr. Evelyn Sterling",
      role: "Climate Intelligence Director",
      bio: "Former IPCC researcher with 12+ years of atmospheric analysis. Leading our AI diagnostic validation standards.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Marcus Chen",
      role: "Core Platform Architect",
      bio: "Systems programmer dedicated to ecological transparency. Architected our distributed community voting system.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Diana Prince",
      role: "Lobby & Coalition Lead",
      bio: "Environmental lawyer specialized in community action lobbying. Coordinating petition reports with government regulators.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const milestones = [
    { year: "2024", title: "EcoVoice Conceived", desc: "Formed a coalition of environmentalists and developers to create digital accountability." },
    { year: "2025", title: "AI Model Development", desc: "Trained vision models to classify toxic runoff and illegal waste heaps using satellite/mobile feeds." },
    { year: "2026", title: "Beta Launch", desc: "Opened the platform to the public. Introduced Carbon Calculator wizardry and live dashboard maps." },
    { year: "2027", title: "Regulatory Inbound", desc: "Expanding direct escalation links to provincial state environmental offices." }
  ];

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Intro Header */}
      <section style={aboutIntro}>
        <span className="badge badge-info" style={{ marginBottom: '1rem' }}>Our Purpose</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(169, 217, 217, 0.8)' }}>Restoring Accountability to our Biosphere</h1>
        <p style={introSub}>
          EcoVoice Global is a non-governmental initiative bridging the gap between local citizens, automated AI classification, and public policy representation.
        </p>
      </section>

      {/* Grid: Mission, Vision, Value */}
      <section style={valuesSection} className="grid-cols-3">
        <div className="glass-card" style={valueCard}>
          <Compass size={28} color="var(--color-primary)" />
          <h3 style={valueTitle}>Transparent Diagnostics</h3>
          <p style={valueText}>
            We believe environmental metrics should be public, unalterable, and easily queryable by any individual.
          </p>
        </div>
        <div className="glass-card" style={valueCard}>
          <Award size={28} color="var(--color-secondary)" />
          <h3 style={valueTitle}>Consensus Action</h3>
          <p style={valueText}>
            Reports are verified by AI models and validated through verified citizen community consensus.
          </p>
        </div>
        <div className="glass-card" style={valueCard}>
          <Heart size={28} color="var(--color-primary)" />
          <h3 style={valueTitle}>Direct Representation</h3>
          <p style={valueText}>
            Turning local feedback into structured legal petitions that hold corporate and state actors accountable.
          </p>
        </div>
      </section>

      {/* Timeline Journey */}
      <section style={timelineSection}>
        <h2 style={sectionTitle}>The Journey</h2>
        <div style={timelineWrapper}>
          {milestones.map((m, i) => (
            <div key={i} style={timelineItem}>
              <div style={timelineDot}></div>
              <div style={timelineCard} className="glass-panel">
                <span style={timelineYear}>{m.year}</span>
                <h4 style={timelineCardTitle}>{m.title}</h4>
                <p style={timelineCardDesc}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Grid */}
      <section style={teamSection}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={sectionTitle}>The Guardians</h2>
          <p style={{ color: 'var(--text-secondary)' }}>A dedicated squad of scientists, coders, and advocates.</p>
        </div>
        <div className="grid-cols-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {team.map((member, i) => (
            <div key={i} className="glass-card" style={teamCard}>
              <img src={member.img} alt={member.name} style={teamImg} />
              <div style={teamContent}>
                <h4 style={teamName}>{member.name}</h4>
                <span style={teamRole}>{member.role}</span>
                <p style={teamBio}>{member.bio}</p>
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
  padding: '2rem 0 4rem 0'
};

const aboutIntro = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto 4rem auto'
};

const introSub = {
  fontSize: '1.1rem',
  color: 'var(--text-secondary)',
  marginTop: '1rem',
  lineHeight: '1.7'
};

const valuesSection = {
  maxWidth: '1200px',
  margin: '0 auto 5rem auto'
};

const valueCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem 1.5rem'
};

const valueTitle = {
  fontSize: '1.2rem',
  fontWeight: '700'
};

const valueText = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6'
};

const timelineSection = {
  maxWidth: '1200px',
  margin: '0 auto 5rem auto'
};

const sectionTitle = {
  fontSize: '2rem',
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: '3rem',
  color: 'rgba(169, 217, 217, 0.8)'
};

const timelineWrapper = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.5rem',
  position: 'relative',
  paddingTop: '2rem'
};

const timelineItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
};

const timelineDot = {
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  background: 'var(--color-primary)',
  boxShadow: 'var(--shadow-glow)',
  marginBottom: '1.5rem',
  zIndex: 2
};

const timelineCard = {
  padding: '1.25rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  textAlign: 'left'
};

const timelineYear = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  fontWeight: 800,
  color: 'var(--color-primary)'
};

const timelineCardTitle = {
  fontSize: '0.95rem',
  fontWeight: '700'
};

const timelineCardDesc = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  lineHeight: '1.5'
};

const teamSection = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const teamCard = {
  padding: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const teamImg = {
  width: '100%',
  height: '240px',
  objectFit: 'cover'
};

const teamContent = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const teamName = {
  fontSize: '1.15rem',
  fontWeight: '700'
};

const teamRole = {
  fontSize: '0.8rem',
  color: 'var(--color-primary)',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const teamBio = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  lineHeight: '1.5'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .timeline-wrapper { grid-template-columns: 1fr !important; gap: 2rem !important; }
      .timeline-item { align-items: flex-start !important; }
      .timeline-dot { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default About;
