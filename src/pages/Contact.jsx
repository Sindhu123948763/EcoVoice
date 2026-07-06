/* src/pages/Contact.jsx */
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/global.css';

export const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General Inquiries', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How does the automated AI threat scan verify my report?",
      a: "When you upload images or video, our AI diagnostic model compares visual features (like chemical sheen, logging trucks, pile patterns) against certified ecological databases. It also validates timestamps and checks coordinates against regional zoning records before generating an authenticity report."
    },
    {
      q: "Are my submissions anonymous?",
      a: "By default, your reports display your EcoVoice username. However, you can toggle the 'File Anonymously' option in the complaint form to hide your identity from the public ledger, while still contributing toward community verification scores."
    },
    {
      q: "When are petitions escalated to government agencies?",
      a: "Once a petition crosses its target signature count (usually 500 or 1000 verified citizens), the legal lobbying team compiles a certified audit packet. This is formally served to the municipal environment commissioner or national environmental department, requesting a public response."
    },
    {
      q: "How is my Citizen Eco Score calculated?",
      a: "Your Eco Score increases when you actively support local conservation: filing verified complaints (+30), voting to validate fellow citizen reports (+5), launching petitions (+40), signing active campaigns (+10), or saving carbon calculator reduction plans (+25)."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email format is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message details are required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', category: 'General Inquiries', message: '' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Intro Header */}
      <section style={introSection}>
        <span className="badge badge-primary">Support Center</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: 'rgba(169, 217, 217, 0.8)' }}>Get in Touch</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Have questions, partnership inquiries, or critical escalation requests?</p>
      </section>

      {/* Main Container Grid */}
      <div style={gridStyle}>
        {/* Left Form */}
        <div className="glass-card" style={formCard}>
          <h3 style={cardTitle}>Eco Report Inbox</h3>
          {submitted ? (
            <div style={successBox}>
              <h4 style={{ color: 'var(--color-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                🎉 Message Logged Successfully!
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Thank you for reaching out. A representative from the EcoVoice review board will respond to your registered email address within 24 hours.
              </p>
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '1rem' }}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. Alice Woods"
                />
                {errors.name && <span style={errorLabel}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. alice@ecovoice.org"
                />
                {errors.email && <span style={errorLabel}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="General Inquiries">General Inquiries</option>
                  <option value="Threat Escalation">Threat Escalation</option>
                  <option value="Tech Support">Tech Support</option>
                  <option value="Partner Collaboration">Partner Collaboration</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Provide precise coordinates or query description..."
                ></textarea>
                {errors.message && <span style={errorLabel}>{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send size={16} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info and FAQ */}
        <div style={infoCol}>
          {/* Quick Contacts */}
          <div className="glass-panel" style={contactCard}>
            <div style={contactItem}>
              <Mail size={18} color="var(--color-primary)" />
              <div>
                <strong style={contactLabel}>Support Email</strong>
                <p style={contactVal}>relations@ecovoice.global</p>
              </div>
            </div>
            <div style={contactItem}>
              <Phone size={18} color="var(--color-secondary)" />
              <div>
                <strong style={contactLabel}>Helpline Desk</strong>
                <p style={contactVal}>+1 (555) ECO-LINE</p>
              </div>
            </div>
            <div style={contactItem}>
              <MapPin size={18} color="var(--color-primary)" />
              <div>
                <strong style={contactLabel}>Central Office</strong>
                <p style={contactVal}>Greenhouse Boulevard, Sector 12, Geneva</p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div style={faqWrapper}>
            <h3 style={faqTitle}>Frequently Asked</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((f, idx) => (
                <div key={idx} className="glass-panel" style={faqItemStyle}>
                  <button style={faqHeaderBtn} onClick={() => toggleFaq(idx)}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', textAlign: 'left' }}>
                      <HelpCircle size={16} color="var(--color-primary)" />
                      <strong style={{ fontSize: '0.88rem' }}>{f.q}</strong>
                    </div>
                    {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeFaq === idx && (
                    <div style={faqAnswerBody}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const wrapper = {
  width: '100%',
  padding: '2rem 0 4rem 0'
};

const introSection = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr',
  gap: '2.5rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const formCard = {
  padding: '2.5rem 2rem'
};

const cardTitle = {
  fontSize: '1.4rem',
  fontWeight: 800,
  marginBottom: '1.5rem'
};

const successBox = {
  padding: '1.5rem',
  background: 'rgba(0, 245, 160, 0.05)',
  border: '1px solid rgba(0, 245, 160, 0.2)',
  borderRadius: '8px',
  textAlign: 'center'
};

const errorLabel = {
  color: 'var(--color-danger)',
  fontSize: '0.78rem',
  marginTop: '0.2rem'
};

const infoCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const contactCard = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const contactItem = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
};

const contactLabel = {
  fontSize: '0.78rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const contactVal = {
  fontSize: '0.9rem',
  fontWeight: '600',
  color: 'var(--text-primary)',
  margin: 0
};

const faqWrapper = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const faqTitle = {
  fontSize: '1.25rem',
  fontWeight: 800
};

const faqItemStyle = {
  borderRadius: '8px',
  padding: '0.5rem',
  overflow: 'hidden'
};

const faqHeaderBtn = {
  width: '100%',
  background: 'none',
  border: 'none',
  color: 'var(--text-primary)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem',
  cursor: 'pointer'
};

const faqAnswerBody = {
  padding: '0.5rem 0.75rem 0.75rem 2.25rem',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  lineHeight: '1.6',
  borderTop: '1px solid var(--panel-border)',
  marginTop: '0.5rem',
  animation: 'fadeIn 0.2s ease-in-out'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Contact;
