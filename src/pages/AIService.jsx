/* src/pages/AIService.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Mic, Paperclip, X, Eye, FileText, ChevronRight } from 'lucide-react';
import '../styles/global.css';

export const AIService = () => {
  const [messages, setMessages] = useState([
    { text: "Greetings, Guardian! I am the EcoVoice AI consultant. I hold regional regulatory guidelines, air/water purity databases, and carbon offset suggestions in my memory. Ask me anything or attach an environmental report.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    { label: "Draft Council Letter", text: "Draft a formal lobby letter to municipal authorities regarding the chemical runoff in Sector A reservoir." },
    { label: "Water Safety Levels", text: "What represents a dangerous NTU turbidity score in drinking water reservoirs?" },
    { label: "Audit Carbon Target", text: "Explain how to reduce carbon score from 8.5 to a sustainable 4.0 tons." }
  ];

  const handleSend = () => {
    if (!input.trim() && !attachedFile) return;

    let userText = input;
    if (attachedFile) {
      userText = `[Uploaded: ${attachedFile.name}] ${input || 'Please analyze this environmental report.'}`;
    }

    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput('');
    setAttachedFile(null);
    setIsTyping(true);

    // AI thinking simulation
    setTimeout(() => {
      let replyText = "I have scanned our database for references. It appears Sector A and Sector B show high correlation in runoff profiles. I recommend submitting an official validation ticket to compile lobbying metrics.";

      const lowerText = userText.toLowerCase();
      if (lowerText.includes('runoff') || lowerText.includes('letter')) {
        replyText = `Subject: Formal Notice of Environmental Concern - Sector A Water Runoff\n\nDear Municipal Commissioner,\n\nWe represent the verified residents of EcoVoice Global. Real-time community consensus registers a Critical turbidity rating of 1.8+ NTU alongside visible chemical sheen. We demand an immediate site audit under Regional Ordinance 402.\n\nRespectfully,\nEcoVoice Citizens`;
      } else if (lowerText.includes('ntu') || lowerText.includes('water')) {
        replyText = "Turbidity is measured in Nephelometric Turbidity Units (NTU). Safe drinking water usually requires less than 1.0 NTU. A score of 5.0 NTU is visible to the naked eye. Our monitored Sector D reservoir is currently clean at 1.8 NTU, but Sector A runoff poses immediate threat.";
      } else if (lowerText.includes('carbon') || lowerText.includes('sustainable')) {
        replyText = "Transitioning to 4.0 tons CO2/year requires action in three sectors:\n1. Home: Switch to heat pumps and solar sources.\n2. Diet: Reduce meat intake to 2 days/week.\n3. Transit: Electric vehicle charging or public bus pooling. Check our Carbon offsets checklist!";
      } else if (lowerText.includes('greenhouse gas report') || lowerText.includes('.pdf') || lowerText.includes('uploaded')) {
        replyText = "PDF Audit Verified: Greenhouse Gas Report 2026. Found 14% high-severity leaks in Sector B forestry zone. Drafted resolution proposal for state foresters to replace machinery buffers.";
      }

      setMessages(prev => [...prev, { text: replyText, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
      setInput(`Please analyze the data in ${file.name}`);
    }
  };

  const toggleVoiceMode = () => {
    if (voiceActive) {
      setVoiceActive(false);
    } else {
      setVoiceActive(true);
      // Simulate listening and typing after 4 seconds
      setTimeout(() => {
        setVoiceActive(false);
        setInput("How can our city transition to electric buses by 2028?");
      }, 4000);
    }
    
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Header */}
      <section style={headerRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Cpu size={28} color="var(--color-primary)" />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'rgba(169, 217, 217, 0.8)' }}>AI Consultant Desk</h1>
        </div>
        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)' }}>Query regulatory criteria, check safety metrics, or upload ecological documents for immediate auditing.</p>
      </section>

      {/* Workspace Grid */}
      <div style={chatWorkspace}>
        {/* Left Side: Large dedicated Chat Window */}
        <div className="glass-card" style={chatCard}>
          {/* Messages scroll box */}
          <div style={msgList}>
            {messages.map((m, i) => (
              <div key={i} style={m.isBot ? botMsgWrapper : userMsgWrapper}>
                <div style={m.isBot ? botMsgStyle : userMsgStyle}>
                  {m.text.split('\n').map((line, idx) => (
                    <span key={idx} style={{ display: 'block', minHeight: line === '' ? '1rem' : 'auto' }}>
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={botMsgWrapper}>
                <div style={{ ...botMsgStyle, color: 'var(--text-muted)' }} className="animate-pulse-soft">
                  AI Consultant is drafting regulatory suggestions...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Voice Indicator overlay */}
          {voiceActive && (
            <div style={voiceOverlay}>
              <div style={voiceWaveContainer}>
                {[1, 2, 3, 4, 5, 6, 7].map(bar => (
                  <div key={bar} className="voice-bar" style={voiceBarStyle(bar)}></div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                Listening to Citizen Audio... Talk now
              </p>
            </div>
          )}

          {/* Attachment chip display */}
          {attachedFile && (
            <div style={attachmentChip}>
              <FileText size={14} color="var(--color-primary)" />
              <span style={{ fontSize: '0.8rem', color: 'white' }}>{attachedFile.name}</span>
              <button style={closeChip} onClick={() => setAttachedFile(null)}>
                <X size={12} />
              </button>
            </div>
          )}

          {/* Input control rows */}
          <div style={inputAreaRow}>
            {/* Standard file select */}
            <input
              type="file"
              accept=".pdf,.txt,.doc"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="report-file"
            />
            <label htmlFor="report-file" style={clipBtnStyle} title="Attach Environmental report">
              <Paperclip size={18} />
            </label>

            {/* Mic trigger */}
            <button style={micBtnStyle(voiceActive)} onClick={toggleVoiceMode} title="Simulate voice input">
              <Mic size={18} />
            </button>

            {/* Text input */}
            <input
              type="text"
              placeholder="Ask AI Advisor about regulatory guidelines..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={inputFieldStyle}
            />

            {/* Send */}
            <button style={sendBtnStyle} onClick={handleSend}>
              <Send size={16} color="#050a07" />
            </button>
          </div>
        </div>

        {/* Right Side: suggested prompts and info */}
        <div style={suggestionsCol}>
          <div className="glass-card" style={sidebarCard}>
            <h3 style={sidebarTitle}>Eco Prompts</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Select any predefined ecological prompt to load regulatory data analysis parameters immediately.
            </p>
            <div style={promptList}>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q.text)}
                  style={promptBtnStyle}
                >
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'white', display: 'block' }}>{q.label}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.text.substring(0, 50)}...</span>
                  </div>
                  <ChevronRight size={14} style={{ flexShrink: 0 }} />
                </button>
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
  paddingBottom: '4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const headerRow = {
  marginBottom: '0.5rem'
};

const chatWorkspace = {
  display: 'grid',
  gridTemplateColumns: '1.7fr 1fr',
  gap: '2rem'
};

const chatCard = {
  height: '520px',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  background: 'rgba(9, 15, 12, 0.65)',
  position: 'relative',
  overflow: 'hidden'
};

const msgList = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingRight: '0.25rem',
  marginBottom: '1rem'
};

const botMsgWrapper = {
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%'
};

const userMsgWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
};

const botMsgStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--panel-border)',
  color: 'var(--text-primary)',
  padding: '0.75rem 1rem',
  borderRadius: '16px 16px 16px 3px',
  maxWidth: '85%',
  fontSize: '0.88rem',
  lineHeight: '1.5'
};

const userMsgStyle = {
  background: 'var(--color-primary)',
  color: '#050a07',
  fontWeight: '500',
  padding: '0.75rem 1rem',
  borderRadius: '16px 16px 3px 16px',
  maxWidth: '85%',
  fontSize: '0.88rem',
  lineHeight: '1.5'
};

const voiceOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(5, 10, 7, 0.9)',
  backdropFilter: 'blur(4px)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  animation: 'fadeIn 0.2s ease-in-out'
};

const voiceWaveContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  height: '60px'
};

const voiceBarStyle = (idx) => ({
  width: '6px',
  height: '100%',
  background: 'var(--color-primary)',
  borderRadius: '3px',
  animation: `wave 1.${idx}s ease-in-out infinite alternate`
});

// Inject styling details for voice bar animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wave {
      0% { height: 10px; }
      100% { height: 50px; }
    }
  `;
  document.head.appendChild(style);
}

const attachmentChip = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--panel-border)',
  borderRadius: '20px',
  padding: '0.25rem 0.75rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: 'fit-content',
  marginBottom: '0.75rem',
  animation: 'slideUp 0.2s forwards'
};

const closeChip = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

const inputAreaRow = {
  borderTop: '1px solid var(--panel-border)',
  paddingTop: '1rem',
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center'
};

const clipBtnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--panel-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--text-secondary)',
  transition: 'border-color 0.2s'
};

const micBtnStyle = (active) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: active ? 'var(--color-danger)' : 'rgba(255,255,255,0.03)',
  border: active ? '1px solid var(--color-danger)' : '1px solid var(--panel-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: active ? '#fff' : 'var(--text-secondary)',
  transition: 'all 0.2s'
});

const inputFieldStyle = {
  flex: 1,
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--panel-border)',
  borderRadius: 'var(--radius-md)',
  padding: '0.75rem 1.25rem',
  color: '#fff',
  outline: 'none',
  fontSize: '0.88rem',
  transition: 'border-color 0.2s'
};

const sendBtnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'var(--color-primary)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-glow)'
};

const suggestionsCol = {
  position: 'sticky',
  top: '90px',
  height: 'fit-content'
};

const sidebarCard = {
  padding: '1.75rem'
};

const sidebarTitle = {
  fontSize: '1.15rem',
  fontWeight: '800',
  margin: '0 0 0.5rem 0'
};

const promptList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const promptBtnStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--panel-border)',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .chat-workspace { grid-template-columns: 1fr !important; }
      .suggestions-col { position: relative !important; top: 0 !important; }
    }
  `;
  document.head.appendChild(style);
}

export default AIService;
