/* src/pages/Learn.jsx */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Wind, Droplet, Leaf, Flame, Calculator,
  HelpCircle, Check, X, ArrowRight, GraduationCap,
  AlertTriangle, BookOpen, ExternalLink, Lightbulb,
  CheckSquare, Square, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../styles/global.css';

/* ─── Did You Know Facts ─── */
const ECO_FACTS = [
  "🌊 The ocean absorbs around 30% of the CO₂ produced by humans, buffering the impacts of global warming.",
  "🌳 A single mature tree can absorb up to 48 lbs of CO₂ per year and release enough oxygen for two people.",
  "♻️ Recycling one aluminium can saves enough energy to run a TV for 3 hours.",
  "🐝 One-third of the world's food supply depends on pollinators like bees, butterflies, and birds.",
  "💧 Only 3% of Earth's water is fresh, and two-thirds of that is locked in glaciers and ice caps.",
  "🔥 The last decade (2011–2020) was the hottest on record globally.",
  "🚗 Transport accounts for about 16% of global greenhouse gas emissions.",
  "🌱 Switching to a plant-based diet can reduce an individual's carbon footprint by up to 73%.",
  "🏭 Around 8 million metric tons of plastic enter the ocean every year.",
  "☀️ Solar energy could theoretically power the entire world using just 0.3% of the Sahara Desert."
];

/* ─── Action Checklist Items ─── */
const CHECKLIST_ITEMS = [
  { id: 'c1', label: 'Carry a reusable water bottle for 7 days' },
  { id: 'c2', label: 'Switch off unused lights and appliances' },
  { id: 'c3', label: 'Buy locally sourced produce this week' },
  { id: 'c4', label: 'Go meat-free for at least 2 days' },
  { id: 'c5', label: 'Plant a tree or indoor plant' },
  { id: 'c6', label: 'Sort your waste into recycling bins' },
  { id: 'c7', label: 'Calculate your carbon footprint' },
  { id: 'c8', label: 'Share an eco fact with someone today' },
];

/* ─── Eco Resources ─── */
const ECO_RESOURCES = [
  { title: 'IPCC Climate Reports', desc: 'Intergovernmental Panel on Climate Change — scientific basis for climate action.', url: 'https://www.ipcc.ch', tag: 'Science' },
  { title: 'NASA Climate', desc: 'Real-time satellite data on global temperatures, sea levels, and ice extent.', url: 'https://climate.nasa.gov', tag: 'Data' },
  { title: 'WHO Air Quality', desc: 'World Health Organization guidelines on safe air quality limits and health impacts.', url: 'https://www.who.int/health-topics/air-pollution', tag: 'Health' },
  { title: 'Global Forest Watch', desc: 'Live monitoring of global forest cover changes and deforestation alerts.', url: 'https://www.globalforestwatch.org', tag: 'Forests' },
  { title: 'Our World in Data — CO₂', desc: 'Open-access charts and data on CO₂ emissions by country, sector, and year.', url: 'https://ourworldindata.org/co2-emissions', tag: 'Emissions' },
  { title: 'Ocean Conservancy', desc: 'Resources on marine plastic pollution, ocean acidification, and cleanup campaigns.', url: 'https://oceanconservancy.org', tag: 'Oceans' },
];

/* ─── All Quiz Questions (9 total, 3 picked randomly per session) ─── */
const ALL_QUIZ_QUESTIONS = [
  {
    question: "Which greenhouse gas has ~80x the warming potential of CO₂ over a 20-year timescale?",
    options: ["Nitrous Oxide", "Methane", "Water Vapor", "Ozone"],
    correctIndex: 1,
    explanation: "Methane is highly potent short-term. Reducing methane from agriculture and gas leaks is the fastest way to slow warming immediately."
  },
  {
    question: "What does an AQI value of 145 indicate?",
    options: ["Good air quality", "Moderate air quality", "Unhealthy for Sensitive Groups", "Hazardous"],
    correctIndex: 2,
    explanation: "An AQI between 101–150 is classified as Unhealthy for Sensitive Groups — children, elderly, and those with respiratory conditions."
  },
  {
    question: "How long does a cellulose-based biodegradable film take to degrade in compost?",
    options: ["18 days", "180 days", "2 years", "It never degrades"],
    correctIndex: 0,
    explanation: "Advanced cellulose films degrade entirely within 18 days in compost environments — a sustainable alternative to single-use plastics."
  },
  {
    question: "Approximately what percentage of global greenhouse gas emissions come from food systems?",
    options: ["5%", "10%", "26%", "45%"],
    correctIndex: 2,
    explanation: "Food systems — including agriculture, land use, and supply chains — account for roughly 26% of global GHG emissions."
  },
  {
    question: "What does NTU measure in water quality assessments?",
    options: ["Chemical toxicity level", "Water temperature", "Turbidity (cloudiness)", "Bacterial count"],
    correctIndex: 2,
    explanation: "NTU (Nephelometric Turbidity Units) measures how clear water is. Safe drinking water requires less than 1.0 NTU."
  },
  {
    question: "Which energy source has the lowest lifecycle carbon emissions per kWh?",
    options: ["Natural Gas", "Coal", "Nuclear", "Wind"],
    correctIndex: 3,
    explanation: "Wind power produces roughly 7–15g CO₂ equivalent per kWh over its lifecycle — lower than nuclear, solar, gas, or coal."
  },
  {
    question: "What is 'ocean acidification' primarily caused by?",
    options: ["Industrial waste dumping", "CO₂ absorbed from the atmosphere", "Overfishing", "Volcanic activity"],
    correctIndex: 1,
    explanation: "When oceans absorb CO₂, it reacts with seawater to form carbonic acid, lowering pH levels and threatening marine ecosystems."
  },
  {
    question: "Urban Heat Islands are primarily caused by?",
    options: ["Increased rainfall", "Replacement of natural land with concrete/asphalt", "Rising ocean temperatures", "Solar flares"],
    correctIndex: 1,
    explanation: "Dense urban materials absorb and re-emit heat, causing cities to be significantly warmer than surrounding rural areas."
  },
  {
    question: "Which sector contributes the most to global CO₂ emissions?",
    options: ["Transport", "Industry & Manufacturing", "Agriculture", "Electricity & Heat Production"],
    correctIndex: 3,
    explanation: "Electricity and heat production accounts for about 25% of global emissions — the largest single sector contributor."
  }
];

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export const Learn = () => {
  const { user, setUser, addToast } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('atmosphere');

  /* ─── Learning Progress ─── */
  const [visitedTopics, setVisitedTopics] = useState(() => {
    const saved = localStorage.getItem('eco-learn-visited');
    return saved ? JSON.parse(saved) : [];
  });

  const markTopicVisited = (key) => {
    setVisitedTopics(prev => {
      if (prev.includes(key)) return prev;
      const updated = [...prev, key];
      localStorage.setItem('eco-learn-visited', JSON.stringify(updated));
      return updated;
    });
  };

  // const handleTabChange = (key) => {
  //   setActiveTab(key);
  //   markTopicVisited(key);
  // };



  // newly added

const handleTabChange = (key) => {         
  if (!visitedTopics.includes(key)) {
    markTopicVisited(key);
  }

  setActiveTab(key);
};




  // useEffect(() => { markTopicVisited('atmosphere'); }, []);





  /* ─── Did You Know Rotator ─── */
  const [factIndex, setFactIndex] = useState(0);
  const factTimer = useRef(null);

  useEffect(() => {
    factTimer.current = setInterval(() => {
      setFactIndex(prev => (prev + 1) % ECO_FACTS.length);
    }, 5000);
    return () => clearInterval(factTimer.current);
  }, []);

  /* ─── Action Checklist ─── */
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('eco-checklist');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleCheck = (id) => {
    setChecked(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('eco-checklist', JSON.stringify(updated));
      return updated;
    });
  };

  /* ─── Quiz ─── */
  const [quizQuestions] = useState(() => pickRandom(ALL_QUIZ_QUESTIONS, 5));
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasClaimedPoints, setHasClaimedPoints] = useState(false);

  const handleAnswerSelect = (index) => { if (!showFeedback) setSelectedAnswer(index); };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || showFeedback) return;
    if (selectedAnswer === quizQuestions[currentQuestion].correctIndex) setScore(p => p + 1);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(p => p + 1);
    } else {
      setQuizFinished(true);
      const final = score + (selectedAnswer === quizQuestions[currentQuestion].correctIndex ? 1 : 0);
      if (final === quizQuestions.length && !hasClaimedPoints) {
        if (user) { setUser(p => ({ ...p, ecoScore: p.ecoScore + 30 })); addToast('Perfect! +30 Eco Score awarded!', 'success'); }
        else { addToast('Perfect score! Sign in to save Eco Score points.', 'info'); }
        setHasClaimedPoints(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0); setSelectedAnswer(null);
    setShowFeedback(false); setScore(0); setQuizFinished(false); setQuizStarted(true);
  };

  const topics = {
    atmosphere: {
      title: "Atmosphere & Air Quality", icon: <Wind size={20} color="var(--color-secondary)" />, color: "var(--color-secondary)",
      points: [
        { sub: "Understanding AQI Metrics", desc: "The Air Quality Index (AQI) monitors five key air pollutants: ground-level ozone, particle pollution (PM2.5/PM10), carbon monoxide, sulfur dioxide, and nitrogen dioxide. Lower is safer; scores above 100 suggest precautions." },
        { sub: "The Methane Challenge", desc: "Methane (CH4) accounts for about 30% of global temperature increases. Because it stays in the atmosphere for a shorter duration than CO2, capturing methane leaks now offers immediate climate relief." },
        { sub: "Actionable Steps", desc: "Reduce your dairy/meat intake, support methane recapture landfill projects, and check local air quality guidelines before engaging in high-exertion outdoor activities." }
      ]
    },
    water: {
      title: "Watersheds & Purity", icon: <Droplet size={20} color="var(--color-info)" />, color: "var(--color-info)",
      points: [
        { sub: "Chemical Runoffs", desc: "Pesticides, heavy metals, and industrial chemicals enter our local streams through rainwater runoff. Stormwater channels carry these toxic wastes straight to marine sanctuaries without filtration." },
        { sub: "Kelp Forest Ecosystems", desc: "Marine re-wilding through kelp forest cultivation absorbs up to 20 times more carbon per acre than land-based trees, while filtering local waters and reducing ocean acidification." },
        { sub: "Actionable Steps", desc: "Avoid pouring household chemicals down drains, switch to biodegradable cleaning solutions, and participate in local riverbank/shore cleanup campaigns." }
      ]
    },
    forestry: {
      title: "Forests & Heat Islands", icon: <Leaf size={20} color="var(--color-success)" />, color: "var(--color-success)",
      points: [
        { sub: "Deforestation & Warming", desc: "Trees act as carbon sinks, absorbing emissions. When cleared, that stored carbon is released. Without forest shade, the ground temperature surges, killing off local micro-organisms." },
        { sub: "Urban Heat Islands", desc: "Metropolitan centers covered in asphalt and concrete experience temperatures up to 10°F higher than rural surroundings. Expanding local tree canopies cools neighborhoods and reduces energy loads." },
        { sub: "Actionable Steps", desc: "Join a tree planting campaign, plant native vegetation in your yard, and lobby for municipal green roofs and shaded pedestrian parkways." }
      ]
    },
    waste: {
      title: "Plastic & Circular Economy", icon: <Flame size={20} color="var(--color-danger)" />, color: "var(--color-danger)",
      points: [
        { sub: "Microplastics Everywhere", desc: "Synthetic plastic never truly biodegrades. Instead, it breaks down into microscopic fragments (microplastics) that enter soil, water columns, and bio-accumulate inside marine life." },
        { sub: "The E-Waste Hazard", desc: "Old devices leak lead, mercury, and cadmium into ground soils when thrown in general landfills. E-waste recycling recovers precious metals and keeps watersheds clean." },
        { sub: "Actionable Steps", desc: "Switch to package-free produce markets, dispose of electronics at designated green centers, and choose cellulose-based biodegradable films instead of vegetable wraps." }
      ]
    }
  };

  const topicKeys = Object.keys(topics);
  const totalTopics = topicKeys.length;
  const completedTopics = topicKeys.filter(k => visitedTopics.includes(k)).length;
  const progressPct = Math.round((completedTopics / totalTopics) * 100);
  const checklistPct = Math.round((checked.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="animate-fade" style={wrapper}>

      {/* ── Header ── */}
      <section style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <GraduationCap size={36} color="var(--color-primary)" />
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: 0, color: 'rgba(169, 217, 217, 0.8)' }}>Citizen Advocate Academy</h1>
        </div>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Dive into environmental science topics, complete interactive modules to test your knowledge, and level up your Eco Score to help make a global impact.
        </p>
      </section>

      {/* ── Did You Know Strip ── */}
      <div className="glass-panel" style={factStrip}>
        <Lightbulb size={18} color="rgba(169,217,217,0.8)" style={{ flexShrink: 0 }} />
        <span style={factText}><strong style={{ color: 'rgba(169,217,217,0.8)' }}>Did You Know?</strong>&nbsp;&nbsp;{ECO_FACTS[factIndex]}</span>
        <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto', flexShrink: 0 }}>
          <button style={factNavBtn} onClick={() => setFactIndex(p => (p - 1 + ECO_FACTS.length) % ECO_FACTS.length)} aria-label="Previous fact"><ChevronLeft size={14} /></button>
          <button style={factNavBtn} onClick={() => setFactIndex(p => (p + 1) % ECO_FACTS.length)} aria-label="Next fact"><ChevronRight size={14} /></button>
        </div>
      </div>











      {/* ── Learning Progress Bar ── */}
      <div className="glass-panel" style={progressSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={16} color="rgba(169,217,217,0.8)" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'rgba(169,217,217,0.8)' }}>Learning Progress</span>
          </div>



          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
               {completedTopics}/{totalTopics} topics explored · {progressPct}%
          </span>



        </div>
        <div style={progressOuter}>
          <div style={{ ...progressInner, width: `${progressPct}%` }} />
        </div>



        <div style={{ marginTop: "12px" }}>
            <button
                className="btn btn-secondary"
                onClick={() => {
                                setVisitedTopics([]);
                                localStorage.removeItem("eco-learn-visited");
    }}
  >
    Reset Progress
  </button>
</div>



        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {topicKeys.map(k => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: visitedTopics.includes(k) ? 'rgba(169,217,217,0.8)' : 'var(--text-muted)' }}>
              {visitedTopics.includes(k) ? <Check size={12} /> : <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid var(--panel-border)' }} />}
              <span>{topics[k].title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={contentGrid}>

        {/* Left: Topics */}
        <div style={topicsCol}>
          <div className="glass-panel" style={tabBar}>
            {topicKeys.map((key) => (
              <button key={key} onClick={() => handleTabChange(key)}
                style={activeTab === key ? { ...tabBtnActive, borderColor: topics[key].color } : tabBtn}>
                {topics[key].icon}
                <span style={{ flex: 1 }}>{topics[key].title}</span>
                {visitedTopics.includes(key) && <Check size={12} color="rgba(169,217,217,0.6)" />}
              </button>
            ))}
          </div>

          <div className="glass-card animate-fade" style={{ ...topicDetailCard, borderLeft: `4px solid ${topics[activeTab].color}` }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {topics[activeTab].icon}
              <span style={{ color: 'rgba(169,217,217,0.8)' }}>{topics[activeTab].title} Deep Dive</span>
            </h2>
            <div style={bulletList}>
              {topics[activeTab].points.map((point, index) => (
                <div key={index} style={bulletItem}>
                  <h3 style={bulletSub}>{point.sub}</h3>
                  <p style={bulletDesc}>{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quiz + Promo + Checklist */}
        <div style={sidebarCol}>

          {/* Quiz */}
          <div className="glass-card" style={quizCard}>
            <div style={quizHeader}>
              <HelpCircle size={22} color="var(--color-primary)" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Eco Knowledge Check</h3>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>5 random questions</span>
            </div>

            {!quizStarted && !quizFinished ? (
              <div style={quizIntro}>
                <p style={quizText}>Test your environmental knowledge across all topics. 5 questions are randomly selected each session. Score 100% to earn points!</p>
                <div style={badgeContainer}><div style={awardBadge}>+30 Eco Score</div></div>
                <button className="btn btn-primary" onClick={() => setQuizStarted(true)} style={{ width: '100%' }}>Start Quiz</button>
              </div>
            ) : quizFinished ? (
              <div style={quizResult}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: score === quizQuestions.length ? 'var(--color-success)' : 'white' }}>
                  {score === quizQuestions.length ? 'Perfect Score!' : 'Quiz Completed'}
                </h4>
                <p style={{ fontSize: '0.95rem', margin: '0 0 1.25rem 0', color: 'var(--text-secondary)' }}>
                  You got <strong>{score}</strong> out of <strong>{quizQuestions.length}</strong> correct.
                </p>
                {score === quizQuestions.length ? (
                  <div className="badge badge-success" style={{ padding: '0.65rem 1rem', width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(52,211,153,0.12)' }}>
                    <Check size={16} /> Verified Eco Scholar
                  </div>
                ) : (
                  <div className="badge badge-warning" style={{ padding: '0.65rem 1rem', width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.12)', color: 'var(--color-warning)' }}>
                    <AlertTriangle size={16} /> Aim for 100% to earn points!
                  </div>
                )}
                <button className="btn btn-secondary" onClick={resetQuiz} style={{ width: '100%' }}>Try Again</button>
              </div>
            ) : (
              <div style={quizActive}>
                <div style={quizProgress}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <div style={progressBarBg}><div style={{ ...progressBarFill, width: `${(currentQuestion / quizQuestions.length) * 100}%` }} /></div>
                </div>
                <h4 style={questionTitle}>{quizQuestions[currentQuestion].question}</h4>
                <div style={optionsBlock}>
                  {quizQuestions[currentQuestion].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[currentQuestion].correctIndex;
                    let optStyle = optionBtn;
                    if (isSelected) optStyle = optionBtnSelected;
                    if (showFeedback) { if (isCorrect) optStyle = optionBtnCorrect; else if (isSelected) optStyle = optionBtnIncorrect; else optStyle = optionBtnDisabled; }
                    return (
                      <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={showFeedback} style={optStyle}>
                        <span style={{ flex: 1 }}>{option}</span>
                        {showFeedback && isCorrect && <Check size={16} color="var(--color-success)" />}
                        {showFeedback && isSelected && !isCorrect && <X size={16} color="var(--color-danger)" />}
                      </button>
                    );
                  })}
                </div>
                {showFeedback && (
                  <div style={feedbackCard}>
                    <p style={feedbackText}><strong>{selectedAnswer === quizQuestions[currentQuestion].correctIndex ? 'Correct!' : 'Incorrect.'}</strong> {quizQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
                <div style={{ marginTop: '1.5rem' }}>
                  {!showFeedback
                    ? <button className="btn btn-primary" onClick={handleAnswerSubmit} disabled={selectedAnswer === null} style={{ width: '100%' }}>Submit Answer</button>
                    : <button className="btn btn-primary" onClick={handleNextQuestion} style={{ width: '100%' }}>{currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</button>
                  }
                </div>
              </div>
            )}
          </div>

          {/* Action Checklist */}
          <div className="glass-card" style={checklistCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <CheckSquare size={20} color="rgba(169,217,217,0.8)" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'rgba(169,217,217,0.8)' }}>Eco Action Checklist</h3>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{checked.length}/{CHECKLIST_ITEMS.length} done</span>
            </div>
            <div style={progressBarBg}><div style={{ ...progressBarFill, width: `${checklistPct}%`, background: 'rgba(169,217,217,0.7)' }} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
              {CHECKLIST_ITEMS.map(item => (
                <button key={item.id} onClick={() => toggleCheck(item.id)} style={{ ...checklistItem, borderColor: checked.includes(item.id) ? 'rgba(169,217,217,0.3)' : 'var(--panel-border)', background: checked.includes(item.id) ? 'rgba(169,217,217,0.05)' : 'transparent' }}>
                  {checked.includes(item.id) ? <CheckSquare size={15} color="rgba(169,217,217,0.8)" /> : <Square size={15} color="var(--text-muted)" />}
                  <span style={{ fontSize: '0.82rem', color: checked.includes(item.id) ? 'rgba(169,217,217,0.8)' : 'var(--text-secondary)', textDecoration: checked.includes(item.id) ? 'line-through' : 'none' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Carbon Calculator Promo */}
          <div className="glass-card" style={promoCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={promoIconBg}><Calculator size={20} color="#050a07" /></div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 'bold' }}>Emissions Offset</h4>
            </div>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Have you calculated your personal carbon footprint this month? Record emission values to log your offset progress.
            </p>
            <Link to="/carbon-calc" className="btn btn-primary" style={{ display: 'flex', width: '100%', padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <span>Compute Carbon Footprint</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Eco Resources Section ── */}
      <section style={resourcesSection}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <BookOpen size={22} color="rgba(169,217,217,0.8)" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'rgba(169,217,217,0.8)' }}>Eco Learning Resources</h2>
        </div>
        <div style={resourcesGrid} className="resources-grid">
          {ECO_RESOURCES.map((r, i) => (
            <div
              key={i}
              onClick={() => navigate(`/learn/resource?url=${encodeURIComponent(r.url)}&title=${encodeURIComponent(r.title)}&tag=${encodeURIComponent(r.tag)}`)}
              style={resourceCard}
              className="glass-card resource-card"
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/learn/resource?url=${encodeURIComponent(r.url)}&title=${encodeURIComponent(r.title)}&tag=${encodeURIComponent(r.tag)}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ ...resourceTag, background: 'rgba(169,217,217,0.08)', color: 'rgba(169,217,217,0.8)', border: '1px solid rgba(169,217,217,0.2)' }}>{r.tag}</span>
                <ExternalLink size={14} color="var(--text-muted)" />
              </div>
              <h4 style={resourceTitle}>{r.title}</h4>
              <p style={resourceDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

/* ─────────────────── Styles ─────────────────── */
const wrapper = { width: '100%', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2rem' };
const headerStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1.5rem' };

const factStrip = { 
  display: 'flex', alignItems: 'center', 
  gap: '0.75rem', padding: '0.85rem 1.25rem', 
  // background: 'rgba(9,18,13,0.6)', 
  background: 'linear-gradient(135deg, #131f1dff 0%, #273c36ff 40%, #193d34ff 75%, #13453aff 100%)',
  border: '1px solid rgba(169,217,217,0.12)' };



const factText = { fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1 };
const factNavBtn = { background: 'rgba(255,255,255,0.04)', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };

const progressSection = { padding: '1.25rem 1.5rem', background: 'rgba(0, 10, 7, 0.6)' };

// const progressSection = {
//   padding: '1.25rem 1.5rem',
//   background: 'linear-gradient(135deg, #08110f 0%, #0d1c18 40%, #133129 75%, #184239 100%)',
//   border: '1px solid rgba(0,245,160,0.12)',
//   borderRadius: '18px',
//   boxShadow: '0 12px 35px rgba(0,0,0,.35)',
// };





const progressOuter = { width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' };
const progressInner = { height: '100%', background: 'rgba(169,217,217,0.7)', borderRadius: '4px', transition: 'width 0.5s ease' };

const contentGrid = { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' };
const topicsCol = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const tabBar = { display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', background: 'rgba(9,18,13,0.6)' };

const tabBtn = { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.25rem', background: 'transparent', border: '1px solid transparent', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.2s' };
const tabBtnActive = { ...tabBtn, background: 'rgba(255,255,255,0.02)', borderLeftWidth: '3px', color: 'var(--text-primary)', fontWeight: '700' };
const topicDetailCard = { padding: '2.5rem', background: 'rgba(9,18,13,0.6)' };
const bulletList = { display: 'flex', flexDirection: 'column', gap: '2rem' };
const bulletItem = { display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1.5rem' };
const bulletSub = { margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' };
const bulletDesc = { margin: 0, fontSize: '0.95rem', color: '#9eb4d5', lineHeight: '1.6' };

const sidebarCol = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const quizCard = { padding: '2rem', background: 'rgba(9,18,13,0.65)', display: 'flex', flexDirection: 'column', gap: '1.25rem' };
const quizHeader = { display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem' };
const quizIntro = { display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' };
const quizText = { margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' };
const badgeContainer = { display: 'flex', justifyContent: 'center', margin: '0.5rem 0' };
const awardBadge = { background: 'rgba(0,245,160,0.12)', color: 'var(--color-primary)', border: '1px solid rgba(0,245,160,0.25)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.02em', boxShadow: 'var(--shadow-glow)' };
const quizActive = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const quizProgress = { display: 'flex', flexDirection: 'column', gap: '0.35rem' };
const progressBarBg = { width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' };
const progressBarFill = { height: '100%', background: 'var(--color-primary)', borderRadius: '3px', transition: 'width 0.3s ease-in-out' };
const questionTitle = { margin: '0.5rem 0 1rem 0', fontSize: '1.05rem', fontWeight: 'bold', lineHeight: '1.4' };
const optionsBlock = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const optionBtn = { display: 'flex', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.88rem', transition: 'all 0.2s' };
const optionBtnSelected = { ...optionBtn, background: 'rgba(0,217,245,0.05)', border: '1px solid var(--color-secondary)', color: 'var(--color-secondary)' };
const optionBtnCorrect = { ...optionBtn, background: 'rgba(52,211,153,0.1)', border: '1px solid var(--color-success)', color: 'var(--color-success)' };
const optionBtnIncorrect = { ...optionBtn, background: 'rgba(248,113,113,0.1)', border: '1px solid var(--color-danger)', color: 'var(--color-danger)' };
const optionBtnDisabled = { ...optionBtn, opacity: 0.5, cursor: 'not-allowed' };
const feedbackCard = { padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '8px', marginTop: '0.5rem' };
const feedbackText = { margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' };
const quizResult = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0' };

const checklistCard = { padding: '1.5rem', background: 'rgba(9,18,13,0.6)' };
const checklistItem = { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left' };

const promoCard = { padding: '1.5rem', background: 'rgba(0,245,160,0.01)', border: '1px solid rgba(0,245,160,0.12)' };
const promoIconBg = { width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' };

const resourcesSection = { marginTop: '1rem' };
const resourcesGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' };
const resourceCard = { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textDecoration: 'none', transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s', cursor: 'pointer', border: '1px solid var(--panel-border)', borderRadius: '16px', background: 'var(--panel-bg)', userSelect: 'none' };
const resourceTag = { fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px', letterSpacing: '0.04em', textTransform: 'uppercase', width: 'fit-content' };
const resourceTitle = { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' };
const resourceDesc = { margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' };

if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.textContent = `
    a.resource-card:hover {
      transform: translateY(-4px);
      border-color: rgba(169,217,217,0.4) !important;
      box-shadow: 0 8px 24px rgba(169,217,217,0.12);
    }
    a.resource-card:hover h4 {
      color: rgba(169,217,217,0.9);
    }
    @media (max-width: 900px) {
      .resources-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 600px) {
      .resources-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

export default Learn;
