/* src/pages/CarbonCalculator.jsx */
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ChartWidget } from '../components/ChartWidget';
import { Calculator, ArrowRight, ArrowLeft, RefreshCw, Leaf, CheckCircle } from 'lucide-react';
import '../styles/global.css';

export const CarbonCalculator = () => {
  const { addCarbonLog, addToast } = useContext(AppContext);

  // Wizard Step: 1 = Personal Habit, 2 = Transit, 3 = Household, 4 = Result
  const [step, setStep] = useState(1);

  // Form parameters
  const [diet, setDiet] = useState('meat'); // meat, flexitarian, vegetarian, vegan
  const [recycle, setRecycle] = useState('partial'); // always, partial, never
  
  const [vehicle, setVehicle] = useState('petrol'); // petrol, hybrid, electric, none
  const [miles, setMiles] = useState(6000);
  const [flights, setFlights] = useState(1); // annual flights

  const [houseSize, setHouseSize] = useState(2); // people
  const [heating, setHeating] = useState('gas'); // gas, electric, solar

  // Calculated Results
  const [results, setResults] = useState(null);

  const calculateFootprint = () => {
    // Basic coefficients (tons CO2 / year)
    let dietScore = 2.5; // meat
    if (diet === 'flexitarian') dietScore = 1.8;
    if (diet === 'vegetarian') dietScore = 1.3;
    if (diet === 'vegan') dietScore = 0.8;

    let wasteScore = 1.2;
    if (recycle === 'always') wasteScore = 0.4;
    if (recycle === 'partial') wasteScore = 0.8;

    let transitScore = 0;
    if (vehicle === 'petrol') transitScore = miles * 0.0004; // 0.4kg per mile
    if (vehicle === 'hybrid') transitScore = miles * 0.0002;
    if (vehicle === 'electric') transitScore = miles * 0.00008; // small charging index
    
    transitScore += flights * 0.8; // 0.8 tons per flight

    let houseScore = 3.0; // average gas utility
    if (heating === 'electric') houseScore = 2.0;
    if (heating === 'solar') houseScore = 0.5;
    houseScore = houseScore / Math.max(houseSize, 1);

    const total = dietScore + wasteScore + transitScore + houseScore;
    
    setResults({
      total: parseFloat(total.toFixed(1)),
      breakdown: [
        { label: 'Nutrition', value: parseFloat(dietScore.toFixed(1)) },
        { label: 'Waste', value: parseFloat(wasteScore.toFixed(1)) },
        { label: 'Transport', value: parseFloat(transitScore.toFixed(1)) },
        { label: 'Home Energy', value: parseFloat(houseScore.toFixed(1)) }
      ]
    });
    setStep(4);
  };

  const handleSaveResult = () => {
    if (results) {
      addCarbonLog(results.total, 'Carbon Audit');
      addToast('Calculations stored in your Dashboard logs!', 'success');
      setStep(1);
      setResults(null);
    }
  };

  const offsetRecommendations = [
    { text: "Transition your home heating from gas to a heat pump.", co2Offset: "1.8 tons" },
    { text: "Swap meat diets for flexitarian or plant-based meals 3 days a week.", co2Offset: "0.6 tons" },
    { text: "Replace medium-range flights with high-speed rail trips.", co2Offset: "0.8 tons" },
    { text: "Increase recycling habits to eliminate household compost waste.", co2Offset: "0.4 tons" }
  ];

  return (
    <div className="animate-fade" style={wrapper}>
      {/* Header */}
      <section style={headerRow}>
        <span className="badge badge-success" style={{ display: 'flex', gap: '0.25rem', width: 'fit-content' }}>
          <Calculator size={12} />
          <span>Carbon Auditing Tool</span>
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.5rem', color: 'rgba(169, 217, 217, 0.8)' }}>Carbon footprint Diagnosis</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Identify high-impact factors. Estimate your annual greenhouse footprints. Get offset checklists.</p>
      </section>

      {/* Main Split Layout */}
      <div style={calcSplit}>
        {/* Left Side: Diagnostic Wizard panel */}
        <div className="glass-card" style={wizardPanel}>
          {/* Step indicators */}
          <div style={stepRow}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={stepIndicator(s <= step, s === step)}>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <form style={formWrapper}>
            {/* STEP 1: Personal Habitation */}
            {step === 1 && (
              <div className="animate-fade">
                <h3 style={stepTitle}>Step 1: Nutrition & Habits</h3>
                
                <div className="form-group">
                  <label className="form-label">Nutrition Profile</label>
                  <select className="form-select" value={diet} onChange={e => setDiet(e.target.value)}>
                    <option value="meat">Standard Meat Eater (Heavy beef/poultry consumption)</option>
                    <option value="flexitarian">Flexitarian (Minimal meat, active plant-focused)</option>
                    <option value="vegetarian">Vegetarian (No meat, dairy/eggs active)</option>
                    <option value="vegan">Vegan (Strictly plant-based nutrition)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Recycle & Waste habits</label>
                  <select className="form-select" value={recycle} onChange={e => setRecycle(e.target.value)}>
                    <option value="partial">Partial (Recycle paper/plastic occasionally)</option>
                    <option value="always">Always (Strict sorting, organic composted)</option>
                    <option value="never">Never (Throw all waste into single trash bins)</option>
                  </select>
                </div>

                <div style={navButtons}>
                  <div></div>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                    <span>Transportation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Transportation */}
            {step === 2 && (
              <div className="animate-fade">
                <h3 style={stepTitle}>Step 2: Commuting & Transit</h3>
                
                <div className="form-group">
                  <label className="form-label">Primary Commute Vehicle</label>
                  <select className="form-select" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                    <option value="petrol">Petrol / Diesel Sedan or SUV</option>
                    <option value="hybrid">Hybrid combustion electric</option>
                    <option value="electric">100% Electric Vehicle (EV)</option>
                    <option value="none">Public transit / Walking / Bicycle exclusively</option>
                  </select>
                </div>

                {vehicle !== 'none' && (
                  <div className="form-group">
                    <label className="form-label">Estimated Annual Mileage ({miles} miles)</label>
                    <input
                      type="range"
                      min="1000"
                      max="25000"
                      step="1000"
                      value={miles}
                      onChange={e => setMiles(parseInt(e.target.value))}
                      style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Annual Short & Long flights</label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    className="form-input"
                    value={flights}
                    onChange={e => setFlights(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div style={navButtons}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                    <span>Household</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Household energy */}
            {step === 3 && (
              <div className="animate-fade">
                <h3 style={stepTitle}>Step 3: Household Dynamics</h3>
                
                <div className="form-group">
                  <label className="form-label">People in Household</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="form-input"
                    value={houseSize}
                    onChange={e => setHouseSize(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Heating Source</label>
                  <select className="form-select" value={heating} onChange={e => setHeating(e.target.value)}>
                    <option value="gas">Natural Gas furnace heating</option>
                    <option value="electric">Standard electric radiator grid</option>
                    <option value="solar">Solar panel collection with battery buffers</option>
                  </select>
                </div>

                <div style={navButtons}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button type="button" className="btn btn-primary" onClick={calculateFootprint}>
                    <span>Calculate</span>
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Results Display */}
            {step === 4 && results && (
              <div className="animate-fade" style={{ textAlign: 'center' }}>
                <h3 style={stepTitle}>Your Footprint Profile</h3>
                
                <div style={resultsNumCircle}>
                  <h2 style={{ fontSize: '3rem', margin: 0, color: 'var(--color-primary)' }}>{results.total}</h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tons CO₂ / Year</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Your estimated annual impact is equivalent to charging <strong>{Math.round(results.total * 122)} smartphones</strong> or driving <strong>{Math.round(results.total * 2400)} miles</strong> in a standard sedan.
                </p>

                <div style={resultsNavBtns}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    <span>Audit Again</span>
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveResult}>
                    <span>Save Result Logs</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Charts breakdown OR recommendations checklist */}
        <div style={resultsCol}>
          {step === 4 && results ? (
            <div className="glass-panel animate-fade" style={visualCard}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem' }}>Carbon Sector Breakdown</h3>
              
              {/* SVG Chart display */}
              <ChartWidget 
                type="bar" 
                data={results.breakdown} 
                title="Tons of CO₂ Emissions per sector class" 
              />

              {/* Offset recommendation checklists */}
              <div style={offsetsBlock}>
                <h4 style={offsetsSecTitle}>Suggested Offset Actions</h4>
                <div style={offsetListStyle}>
                  {offsetRecommendations.map((off, idx) => (
                    <div key={idx} style={offsetItem}>
                      <Leaf size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{off.text}</span>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
                          -{off.co2Offset}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={promoCard} className="glass-panel">
              <Calculator size={36} color="var(--text-muted)" />
              <h3 style={{ margin: '1rem 0 0.5rem 0' }}>Why Audit Carbon?</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Analyzing nutrition profiles, travel distances, and household grids gives our environmental lobbying team verified local datasets. Citizens with verified low footprints can display eco indicators on the forum feed.
              </p>
            </div>
          )}
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

const calcSplit = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr',
  gap: '2.5rem'
};

const wizardPanel = {
  padding: '2.5rem 2rem'
};

const stepRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2.5rem',
  position: 'relative'
};

const stepIndicator = (active, current) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: current ? 'var(--color-primary)' : active ? 'rgba(0, 245, 160, 0.15)' : 'rgba(255,255,255,0.05)',
  border: current ? '1px solid var(--color-primary)' : active ? '1px solid var(--color-primary)' : '1px solid var(--panel-border)',
  color: current ? '#050a07' : active ? 'var(--color-primary)' : 'var(--text-muted)',
  fontSize: '0.88rem',
  fontWeight: 'bold',
  boxShadow: current ? 'var(--shadow-glow)' : 'none',
  transition: 'all 0.3s'
});

const formWrapper = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '220px'
};

const stepTitle = {
  fontSize: '1.25rem',
  fontWeight: '800',
  marginBottom: '1.5rem'
};

const navButtons = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '2rem'
};

const resultsNumCircle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '3px solid rgba(0, 245, 160, 0.15)',
  borderTopColor: 'var(--color-primary)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem auto',
  background: 'rgba(255,255,255,0.01)',
  animation: 'pulseGlow 2.5s infinite'
};

const resultsNavBtns = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '1rem'
};

const resultsCol = {
  position: 'sticky',
  top: '90px',
  height: 'fit-content'
};

const visualCard = {
  padding: '1.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  background: 'rgba(9, 15, 12, 0.6)'
};

const offsetsBlock = {
  borderTop: '1px solid var(--panel-border)',
  paddingTop: '1.25rem'
};

const offsetsSecTitle = {
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: '0 0 0.75rem 0'
};

const offsetListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const offsetItem = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
  padding: '0.6rem 0.85rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--panel-border)',
  borderRadius: '8px'
};

const promoCard = {
  padding: '2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  color: 'var(--text-secondary)',
  height: '350px'
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .calc-split { grid-template-columns: 1fr !important; }
      .results-col { position: relative !important; top: 0 !important; }
    }
  `;
  document.head.appendChild(style);
}

export default CarbonCalculator;
