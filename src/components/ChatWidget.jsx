/* src/components/ChatWidget.jsx */
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Cpu, HelpCircle } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your EcoVoice AI Assistant. Ask me anything about environmental complaints, carbon metrics, or local conservation initiatives.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const predefinedReplies = [
    { keywords: ['carbon', 'co2', 'footprint'], response: "To lower carbon footprint: reduce vehicle travel, transition to energy-efficient appliances, and buy local produce. Try our Carbon Calculator module!" },
    { keywords: ['complaint', 'report', 'pollution'], response: "You can file active ecological issues using the 'Eco Complaints' page. Take a photo, input coordinates, and our AI scanner will verify it." },
    { keywords: ['petition', 'sign'], response: "Join community efforts on the 'Petitions' tab. Collect signatures to lobby local council members for electric buses or waste ordinances!" },
    { keywords: ['water', 'river', 'runoff'], response: "Water safety is vital. Industrial chemical dumping and e-waste runoff should be reported under the Critical severity class immediately." },
    { keywords: ['air', 'aqi', 'smoke'], response: "Check the local Air Quality Index on your Dashboard. AQI values above 100 represent health risks for sensitive citizens." }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let matchedResponse = "That is a great question. We are compiling ecological action reports for municipal representatives. Your participation makes our community cleaner!";

      for (const reply of predefinedReplies) {
        if (reply.keywords.some(kw => lowerInput.includes(kw))) {
          matchedResponse = reply.response;
          break;
        }
      }

      setMessages(prev => [...prev, { text: matchedResponse, isBot: true }]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div style={widgetContainer}>
      {isOpen ? (
        <div className="glass-panel" style={chatWindow}>
          {/* Header */}
          <div style={chatHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>EcoVoice AI</strong>
            </div>
            <button style={closeBtn} onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages list */}
          <div style={messageList}>
            {messages.map((m, i) => (
              <div key={i} style={m.isBot ? botMsgWrapper : userMsgWrapper}>
                <div style={m.isBot ? botMsgStyle : userMsgStyle}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={botMsgWrapper}>
                <div style={{ ...botMsgStyle, color: 'var(--text-muted)' }} className="animate-pulse-soft">
                  AI is analyzing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div style={suggestionRow}>
            <button style={suggestBtn} onClick={() => setInput('How to report pollution?')}>Report Info</button>
            <button style={suggestBtn} onClick={() => setInput('Reduce carbon footprint')}>Carbon Help</button>
          </div>

          {/* Footer Input */}
          <div style={chatInputArea}>
            <input
              type="text"
              placeholder="Ask EcoVoice AI..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={inputField}
            />
            <button style={sendBtn} onClick={handleSend} aria-label="Send message">
              <Send size={14} color="#050a07" />
            </button>
          </div>
        </div>
      ) : (
        <button style={floatingBtn} onClick={() => setIsOpen(true)} aria-label="Open AI chat">
          <MessageSquare size={22} color="#050a07" />
          <span style={pulseRing}></span>
        </button>
      )}
    </div>
  );
};

const widgetContainer = {
  position: 'fixed',
  bottom: '25px',
  right: '25px',
  zIndex: 9999,
  fontFamily: 'var(--font-body)'
};

const floatingBtn = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0, 245, 160, 0.4)',
  position: 'relative',
  transition: 'transform 0.2s'
};

const pulseRing = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '2px solid var(--color-primary)',
  animation: 'pulseGlow 2.5s infinite',
  pointerEvents: 'none'
};

const chatWindow = {
  width: '320px',
  height: '420px',
  borderRadius: '16px',
  background: 'rgba(9, 15, 12, 0.95)',
  border: '1px solid var(--panel-border)',
  boxShadow: 'var(--shadow-lg)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  animation: 'scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
};

const chatHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.85rem 1rem',
  background: 'rgba(255, 255, 255, 0.03)',
  borderBottom: '1px solid var(--panel-border)'
};

const closeBtn = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '0.2rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center'
};

const messageList = {
  flex: 1,
  padding: '1rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
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
  background: 'rgba(255,255,255,0.05)',
  padding: '0.65rem 0.85rem',
  borderRadius: '12px 12px 12px 2px',
  fontSize: '0.82rem',
  color: 'var(--text-primary)',
  maxWidth: '85%',
  lineHeight: '1.4',
  border: '1px solid var(--panel-border)'
};

const userMsgStyle = {
  background: 'var(--color-primary)',
  padding: '0.65rem 0.85rem',
  borderRadius: '12px 12px 2px 12px',
  fontSize: '0.82rem',
  color: '#050a07',
  maxWidth: '85%',
  lineHeight: '1.4',
  fontWeight: '500'
};

const suggestionRow = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0 1rem 0.5rem 1rem',
  overflowX: 'auto'
};

const suggestBtn = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--panel-border)',
  color: 'var(--text-secondary)',
  fontSize: '0.75rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '12px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'border-color 0.2s'
};

const chatInputArea = {
  padding: '0.75rem 1rem',
  borderTop: '1px solid var(--panel-border)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'rgba(0, 0, 0, 0.2)'
};

const inputField = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff',
  fontSize: '0.85rem'
};

const sendBtn = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  background: 'var(--color-primary)',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.1s'
};

export default ChatWidget;
