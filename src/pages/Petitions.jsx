/* src/pages/Petitions.jsx */
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FileText, Users, Heart, Share2, Plus, Sparkles, Send, Award } from 'lucide-react';
import '../styles/global.css';

export const Petitions = () => {
  const { petitions, addPetition, signPetition, user, addToast } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Carbon Emissions');
  const [targetSignatures, setTargetSignatures] = useState(500);

  // Sign Form State
  const [signerName, setSignerName] = useState(user ? user.username : '');
  const [signerComment, setSignerComment] = useState('');

  const handleCreatePetition = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addPetition({
      title,
      description,
      category,
      targetSignatures: parseInt(targetSignatures)
    });

    setTitle('');
    setDescription('');
    setCategory('Carbon Emissions');
    setTargetSignatures(500);
    setShowCreateModal(false);
  };

  const handleSignSubmit = (e) => {
    e.preventDefault();
    if (!signerName.trim()) return;

    signPetition(selectedPetition.id, signerName, signerComment);
    
    // Auto sync selected petition update
    const updated = petitions.find(p => p.id === selectedPetition.id);
    setSelectedPetition(prev => ({
      ...prev,
      signaturesCount: prev.signaturesCount + 1,
      signatures: [...prev.signatures, { name: signerName, comment: signerComment, date: 'Just Now' }]
    }));
    
    setSignerComment('');
  };

  const handleShareClick = (platform) => {
    addToast(`Mock Link shared to ${platform}!`, 'info');
  };

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Header */}
      <section style={headerRow}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'rgba(56, 101, 79, 1)' }}>Lobbying & Petitions</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(54, 67, 60, 1)' }}>Advocate for policy shifts. Collect verified signatures. Prompt agency audits.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} />
          <span>Launch Campaign</span>
        </button>
      </section>

      {/* Grid container */}
      <div style={boardSplit}>
        {/* Left list */}
        <div style={listCol}>
          <h3 style={sectionSubtitle}>Active Environmental Campaigns</h3>
          <div style={cardsList}>
            {petitions.map(p => {
              const progressPct = Math.min((p.signaturesCount / p.targetSignatures) * 100, 100).toFixed(0);

              return (
                <div key={p.id} className="glass-card" style={petCard(selectedPetition?.id === p.id)} onClick={() => setSelectedPetition(p)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{p.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By {p.creator}</span>
                  </div>
                  <h4 style={petTitle}>{p.title}</h4>
                  
                  {/* Progress bar */}
                  <div style={{ margin: '1rem 0 0.5rem 0' }}>
                    <div style={progressOuter}>
                      <div style={{ ...progressInner, width: `${progressPct}%` }}></div>
                    </div>
                    <div style={progressLabelRow}>
                      <span style={{ fontWeight: 'bold' }}>{p.signaturesCount.toLocaleString()} signed</span>
                      <span style={{ color: 'var(--text-muted)' }}>Target: {p.targetSignatures} ({progressPct}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details inspector */}
        <div style={inspectCol}>
          {selectedPetition ? (
            <div className="glass-panel animate-fade" style={inspectCard}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{selectedPetition.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                Launched by <strong>{selectedPetition.creator}</strong> on {selectedPetition.createdDate}
              </p>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <strong style={secLabel}>Statement of Intent</strong>
                <p style={descText}>{selectedPetition.description}</p>
              </div>

              {/* Signatures List Drawer */}
              <div style={signatureListDrawer}>
                <strong style={secLabel}>Supporters ({selectedPetition.signatures.length})</strong>
                <div style={sigScrollList}>
                  {selectedPetition.signatures.map((sig, i) => (
                    <div key={i} style={sigItem}>
                      <div style={sigAvatar}>{sig.name.charAt(0)}</div>
                      <div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.85rem' }}>{sig.name}</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sig.date}</span>
                        </div>
                        {sig.comment && (
                          <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            "{sig.comment}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign Campaign Form */}
              <form onSubmit={handleSignSubmit} style={signForm} className="glass-panel">
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Add your Signature</h4>
                <div style={formGrid2}>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={signerName}
                    onChange={e => setSignerName(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Short Comment (Optional)"
                    value={signerComment}
                    onChange={e => setSignerComment(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <Send size={14} />
                  <span>Sign Campaign</span>
                </button>
              </form>

              {/* Social sharing */}
              <div style={shareBox}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Spread the campaign:</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleShareClick('Twitter')} style={shareBtn} className="btn btn-secondary">Twitter</button>
                  <button onClick={() => handleShareClick('Telegram')} style={shareBtn} className="btn btn-secondary">Telegram</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={emptyInspectBox} className="glass-panel">
              <FileText size={40} color="var(--text-muted)" />
              <h3>Select a Petition</h3>
              <p>Choose an active campaign to view its details, review existing comments, sign it, and share it with your network.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div style={modalBackdrop} onClick={() => setShowCreateModal(false)}>
          <div className="glass-card animate-scale" style={modalContent} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', color: 'var(--color-primary)' }}>Launch Lobbying Campaign</h3>
            <form onSubmit={handleCreatePetition}>
              <div className="form-group">
                <label className="form-label">Petition Title / Claim</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electrify all city public transit..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={formGrid2}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Carbon Emissions">Carbon Emissions</option>
                    <option value="Plastic Waste">Plastic Waste</option>
                    <option value="Water Quality">Water Quality</option>
                    <option value="Clean Energy">Clean Energy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Signature Goal</label>
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    required
                    value={targetSignatures}
                    onChange={e => setTargetSignatures(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label"> Lobbied Statement & Policy Goal</label>
                <textarea
                  required
                  placeholder="Provide background context on why this policy shift is vital. What metrics will be improved?..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>

              <div style={formActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Launch Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
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

const headerRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
};

const boardSplit = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.3fr',
  gap: '2.5rem'
};

const listCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const sectionSubtitle = {
  fontSize: '1.25rem',
  fontWeight: 800,
  margin: 0,
  color: 'rgba(56, 101, 79, 1)'
};

const cardsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '70vh',
  overflowY: 'auto',
  paddingRight: '0.25rem'
};

const petCard = (active) => ({
  cursor: 'pointer',
  padding: '1.25rem',
  border: active ? '1px solid var(--color-primary)' : '1px solid var(--panel-border)',
  background: active ? 'rgba(28, 29, 29, 0.92)' : '#000000',
  boxShadow: active ? 'rgba(28, 29, 29, 0.92)' : '#000000',
  transition: 'all 0.2s'
});

const petTitle = {
  fontSize: '1.05rem',
  fontWeight: 800,
  margin: '0.5rem 0'
};

const progressOuter = {
  width: '100%',
  height: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const progressInner = {
  height: '100%',
  backgroundColor: 'var(--color-primary)',
  boxShadow: 'var(--shadow-glow)',
  borderRadius: '4px',
  transition: 'width 0.5s ease-out'
};

const progressLabelRow = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.78rem',
  marginTop: '0.35rem'
};

const inspectCol = {
  position: 'sticky',
  top: '90px',
  height: 'fit-content'
};

const inspectCard = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  background: 'rgb(0, 0, 0)'
};

const secLabel = {
  fontSize: '0.82rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const descText = {
  fontSize: '0.88rem',
  lineHeight: '1.6',
  color: 'var(--text-primary)',
  margin: 0
};

const signatureListDrawer = {
  padding: '1rem 0',
  borderTop: '1px solid var(--panel-border)',
  borderBottom: '1px solid var(--panel-border)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const sigScrollList = {
  maxHeight: '130px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  paddingRight: '0.25rem'
};

const sigItem = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center'
};

const sigAvatar = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  background: 'var(--color-secondary)',
  color: '#050a07',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  flexShrink: 0
};

const signForm = {
  padding: '1rem',
  background: 'rgba(0, 245, 160, 0.01)',
  border: '1px solid rgba(0, 245, 160, 0.12)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const shareBox = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '0.5rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const shareBtn = {
  padding: '0.35rem 0.75rem',
  fontSize: '0.75rem'
};

const emptyInspectBox = {
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '2rem',
  gap: '1rem',
  color: 'var(--text-secondary)'
};

const modalBackdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(5, 10, 7, 0.8)',
  backdropFilter: 'blur(8px)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem'
};

const modalContent = {
  width: '100%',
  maxWidth: '520px',
  padding: '2rem',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const formGrid2 = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const formActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  marginTop: '1.5rem'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .board-split { grid-template-columns: 1fr !important; }
      .inspect-col { position: relative !important; top: 0 !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Petitions;
  