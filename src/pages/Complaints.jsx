/* src/pages/Complaints.jsx */
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Camera, MapPin, ShieldAlert, Award, FileText, CheckCircle, Clock } from 'lucide-react';
import '../styles/global.css';

export const Complaints = () => {
  const { complaints, addComplaint, voteComplaint, user } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water Quality');
  const [severity, setSeverity] = useState('High');
  const [imagePreview, setImagePreview] = useState(null);
  const [gps, setGps] = useState({ lat: '', lng: '', address: '' });
  const [fetchingGps, setFetchingGps] = useState(false);

  const workflowSteps = ['Citizen Filed', 'AI Verified', 'Community Validated', 'Assigned to Gov', 'Resolved'];

  const getWorkflowStepIndex = (status) => {
    return workflowSteps.indexOf(status);
  };

  const getSeverityColor = (sev) => {
    if (sev === 'Critical') return 'var(--color-danger)';
    if (sev === 'High') return 'var(--color-warning)';
    return 'var(--color-info)';
  };

  const handleSimulateGPS = () => {
    setFetchingGps(true);
    setTimeout(() => {
      const lat = (37.7 + Math.random() * 0.1).toFixed(4);
      const lng = (-122.4 - Math.random() * 0.1).toFixed(4);
      setGps({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: `Sector ${Math.floor(Math.random() * 10) + 1} Industrial Perimeter`
      });
      setFetchingGps(false);
    }, 1200);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addComplaint({
      title,
      description,
      category,
      severity,
      lat: gps.lat,
      lng: gps.lng,
      address: gps.address,
      images: imagePreview ? [imagePreview] : ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80']
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setCategory('Water Quality');
    setSeverity('High');
    setImagePreview(null);
    setGps({ lat: '', lng: '', address: '' });
    setShowCreateModal(false);
  };

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Page Header */}
      <section style={headerRow}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'rgba(56, 101, 79, 1)' }}>Eco Threat Registry</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(54, 67, 60, 1)' }}>Log local threats. AI automates auditing. Citizens enforce validation.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Camera size={16} />
          <span>File Threat Report</span>
        </button>
      </section>

      {/* Main Section split: Complaints Board & Validator feed */}
      <div style={boardSplit}>
        {/* Left: Active complaints database */}
        <div style={dbCol}>
          <h3 style={sectionSubtitle}>Active Environmental Claims</h3>
          <div style={claimsList}>
            {complaints.map(c => (
              <div key={c.id} className="glass-card" style={claimCard(selectedComplaint?.id === c.id)} onClick={() => setSelectedComplaint(c)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge" style={{ background: 'rgba(28, 29, 29, 0.92)', color: 'var(--text-secondary)' }}>{c.category}</span>
                  <span className="badge" style={{ background: `${getSeverityColor(c.severity)}20`, color: getSeverityColor(c.severity) }}>{c.severity}</span>
                </div>
                <h4 style={claimTitle}>{c.title}</h4>
                <p style={claimDescSnippet}>{c.description.substring(0, 100)}...</p>
                
                {/* Details Footer */}
                <div style={claimFooter}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} />
                    <span>{c.location.address}</span>
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected complaint inspection board */}
        <div style={inspectCol}>
          {selectedComplaint ? (
            <div className="glass-panel animate-fade" style={inspectCard}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{selectedComplaint.title}</h3>
              <div style={inspectMetaRow}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Filed by {selectedComplaint.reporter} on {selectedComplaint.filedDate}</span>
                <span className="badge badge-info">{selectedComplaint.votes} validations</span>
              </div>

              {/* Progress workflow tracer */}
              <div style={workflowTracker}>
                {workflowSteps.map((step, idx) => {
                  const currentIdx = getWorkflowStepIndex(selectedComplaint.status);
                  const isDone = idx <= currentIdx;
                  const isActive = idx === currentIdx;

                  return (
                    <div key={idx} style={workflowStepItem}>
                      <div style={workflowIndicator(isDone, isActive)}>
                        {isDone ? <CheckCircle size={14} /> : <Clock size={14} />}
                      </div>
                      <span style={workflowText(isDone)}>{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* Image Preview */}
              {selectedComplaint.images && selectedComplaint.images.length > 0 && (
                <div style={inspectImgWrapper}>
                  <img src={selectedComplaint.images[0]} alt="Pollution threat" style={inspectImg} />
                </div>
              )}

              {/* Description */}
              <div style={inspectDescBox}>
                <h4 style={inspectSecTitle}>Description</h4>
                <p style={inspectBodyText}>{selectedComplaint.description}</p>
              </div>

              {/* Location details */}
              <div style={inspectLocationBox}>
                <h4 style={inspectSecTitle}>Coordinates & Region</h4>
                <p style={inspectBodyText}>
                  📍 {selectedComplaint.location.address} (Lat: {selectedComplaint.location.lat}, Lng: {selectedComplaint.location.lng})
                </p>
              </div>

              {/* Validation CTA */}
              <div style={validationCtaBox} className="glass-panel">
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Do you verify this environmental threat?</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Community consensus escalates complaints to authorities.</p>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => voteComplaint(selectedComplaint.id)}
                  disabled={selectedComplaint.voters.includes(user?.username)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Award size={14} />
                  <span>{selectedComplaint.voters.includes(user?.username) ? 'Validated' : 'Validate Report'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={emptyInspectBox} className="glass-panel">
              <ShieldAlert size={40} color="var(--text-muted)" />
              <h3>Select a filed threat</h3>
              <p>Click any claim from the registry to audit its timeline, inspect visual evidence, and validate the report.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Threat Report Modal */}
      {showCreateModal && (
        <div style={modalBackdrop} onClick={() => setShowCreateModal(false)}>
          <div className="glass-card animate-scale" style={modalContent} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', color: 'rgba(169, 217, 217, 0.8)' }}>File New Threat Report</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Industrial runoff in municipal creek..."
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
                    <option value="Water Quality">Water Quality</option>
                    <option value="Deforestation">Deforestation</option>
                    <option value="Plastic Waste">Plastic Waste</option>
                    <option value="Air Pollution">Air Pollution</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Severity Level</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value)}
                    className="form-select"
                  >
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical (Immediate danger)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea
                  required
                  placeholder="Describe colors, smells, machinery type, or immediate impact..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="form-textarea"
                ></textarea>
              </div>

              {/* Coordinate simulator input */}
              <div className="form-group">
                <label className="form-label">Geographic Location</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    readOnly
                    placeholder="Lat, Lng (Click fetch)"
                    value={gps.lat ? `${gps.lat}, ${gps.lng}` : ''}
                    className="form-input"
                    style={{ flex: 1, background: 'rgba(255,255,255,0.01)' }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleSimulateGPS}
                    disabled={fetchingGps}
                  >
                    {fetchingGps ? 'Locating...' : 'Get GPS'}
                  </button>
                </div>
                {gps.address && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                    📍 Localized: {gps.address}
                  </span>
                )}
              </div>

              {/* Upload image */}
              <div className="form-group">
                <label className="form-label">Visual Evidence (Photo/Video)</label>
                <div style={uploadTriggerBox}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={fileInputHidden}
                    id="evidence-file"
                  />
                  <label htmlFor="evidence-file" style={uploadLabel}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="upload preview" style={uploadPreviewImg} />
                    ) : (
                      <>
                        <Camera size={28} color="var(--text-muted)" />
                        <span>Click to attach photo evidence</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div style={formActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Report</button>
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
  gridTemplateColumns: '1.1fr 1.3fr',
  gap: '2.5rem'
};

const dbCol = {
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

const claimsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '70vh',
  overflowY: 'auto',
  paddingRight: '0.25rem'
};

const claimCard = (active) => ({
  cursor: 'pointer',
  padding: '1.25rem',
  border: active ? '1px solid var(--color-primary)' : '1px solid var(--panel-border)',
  background: active ? 'rgba(28, 29, 29, 0.92)' : '#000000',
  boxShadow: active ? 'rgba(28, 29, 29, 0.92)' : '#000000'
});

const claimTitle = {
  fontSize: '1.05rem',
  fontWeight: 800,
  margin: '0.5rem 0'
};

const claimDescSnippet = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  lineHeight: '1.5',
  margin: '0 0 1rem 0'
};

const claimFooter = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.78rem',
  color: 'var(--text-secondary)'
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

const inspectMetaRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid var(--panel-border)',
  paddingBottom: '0.75rem'
};

const workflowTracker = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  padding: '1rem 0',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const workflowStepItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  minWidth: '70px',
  textAlign: 'center'
};

const workflowIndicator = (done, active) => ({
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? 'var(--color-primary)' : done ? 'rgba(0, 245, 160, 0.15)' : 'rgba(255,255,255,0.05)',
  border: active ? '1px solid var(--color-primary)' : done ? '1px solid var(--color-primary)' : '1px solid var(--panel-border)',
  color: done ? 'var(--color-primary)' : 'var(--text-muted)',
  marginBottom: '0.35rem',
  boxShadow: active ? 'var(--shadow-glow)' : 'none',
  transition: 'all 0.3s'
});

const workflowText = (done) => ({
  fontSize: '0.62rem',
  fontWeight: 'bold',
  color: done ? 'var(--text-primary)' : 'var(--text-muted)'
});

const inspectImgWrapper = {
  width: '100%',
  maxHeight: '220px',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid var(--panel-border)'
};

const inspectImg = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const inspectSecTitle = {
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: '0 0 0.5rem 0'
};

const inspectBodyText = {
  fontSize: '0.88rem',
  lineHeight: '1.6',
  color: 'var(--text-primary)',
  margin: 0
};

const inspectDescBox = {
  paddingBottom: '0.75rem',
  borderBottom: '1px solid var(--panel-border)'
};

const inspectLocationBox = {
  paddingBottom: '0.75rem',
  borderBottom: '1px solid var(--panel-border)'
};

const validationCtaBox = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  background: 'rgba(0, 245, 160, 0.02)',
  border: '1px solid rgba(0, 245, 160, 0.15)',
  flexWrap: 'wrap',
  gap: '1rem'
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
  maxWidth: '560px',
  padding: '2rem',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const formGrid2 = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const uploadTriggerBox = {
  border: '1px dashed var(--panel-border)',
  borderRadius: '8px',
  overflow: 'hidden'
};

const fileInputHidden = {
  display: 'none'
};

const uploadLabel = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '120px',
  cursor: 'pointer',
  gap: '0.5rem',
  fontSize: '0.82rem',
  color: 'var(--text-secondary)',
  textAlign: 'center'
};

const uploadPreviewImg = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
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

export default Complaints;
