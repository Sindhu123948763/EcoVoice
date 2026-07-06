/* src/pages/ResourceViewer.jsx */
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/global.css';

const RESOURCE_META = {
  'https://www.ipcc.ch': {
    images: [
      'https://images.unsplash.com/photo-1530569673472-307dc017a82d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    ],
    intro: 'The Intergovernmental Panel on Climate Change (IPCC) is the UN body for assessing the science related to climate change, providing governments with regular scientific assessments.',
    stats: [
      { value: '800+', label: 'Scientists', desc: 'from 90+ countries contribute to each report' },
      { value: '2040', label: 'Warning Year', desc: '1.5°C warming threshold may be crossed' },
      { value: 'AR6', label: 'Latest Report', desc: 'Covers physical science, impacts & mitigation' },
      { value: '195', label: 'Member Countries', desc: 'participate in IPCC assessments' },
    ],
    sections: [
      { title: 'What is the IPCC?', body: 'Founded in 1988 by the UN, the IPCC evaluates thousands of scientific papers every cycle to give policymakers a clear picture of climate change, its causes, and what can be done about it.' },
      { title: 'Assessment Reports', body: 'The sixth Assessment Report (AR6, 2021–2022) confirmed that human influence has warmed the climate at an unprecedented rate, with global temperatures already 1.1°C above pre-industrial levels.' },
      { title: 'Key Findings', body: 'Limiting warming to 1.5°C requires net-zero CO₂ emissions by 2050. Every fraction of a degree of warming matters — and every action to reduce emissions counts toward slowing the crisis.' },
    ],
  },

  'https://climate.nasa.gov': {
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
    ],
    intro: 'NASA uses satellites to collect long-term observations of our changing planet — tracking global temperatures, sea levels, ice extent, CO₂ levels, and more from space.',
    stats: [
      { value: '+1.1°C', label: 'Warming', desc: 'rise in global temperature since 19th century' },
      { value: '3.3mm', label: 'Sea Rise/yr', desc: 'current annual rate of sea level rise' },
      { value: '-13%', label: 'Ice Loss', desc: 'Arctic sea ice decline per decade' },
      { value: '420ppm', label: 'CO₂ Level', desc: 'highest atmospheric CO₂ in 800,000 years' },
    ],
    sections: [
      { title: 'Satellite Monitoring', body: 'NASA operates dozens of Earth-observing satellites. They capture data on ocean temperatures, ice sheet movement, deforestation, and greenhouse gas concentrations — updated in near real-time.' },
      { title: 'Temperature Records', body: 'The last decade (2011–2020) was the hottest on record globally. 19 of the 20 hottest years ever recorded have occurred since 2000, driven by rising greenhouse gas emissions.' },
      { title: 'Sea Level Rise', body: 'Global sea levels have risen about 20cm since 1900. The rate is accelerating due to melting ice sheets in Greenland and Antarctica and thermal expansion of warming ocean water.' },
    ],
  },

  'https://www.who.int/health-topics/air-pollution': {
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80',

      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=600&q=80',
       'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80',

    ],
    intro: 'Air pollution is one of the greatest environmental risks to health. WHO estimates that 99% of people breathe air that exceeds safe limits, causing 7 million premature deaths every year worldwide.',
    stats: [
      { value: '7M', label: 'Deaths/yr', desc: 'premature deaths caused by air pollution' },
      { value: '99%', label: 'Exposed', desc: 'of people breathe unsafe air globally' },
      { value: 'PM2.5', label: 'Key Pollutant', desc: 'fine particles that enter lungs and bloodstream' },
      { value: '2021', label: 'Updated', desc: 'WHO released new stricter air quality guidelines' },
    ],
    sections: [
      { title: 'What is Air Pollution?', body: 'Air pollution is contamination of indoor or outdoor air by chemical, physical, or biological agents. Common sources include vehicles, industry, wildfires, cooking stoves, and agricultural burning.' },
      { title: 'Health Impacts', body: 'Breathing polluted air causes strokes, heart disease, lung cancer, and respiratory infections. Children and the elderly are most vulnerable, as fine particles penetrate deep into the lungs and enter the bloodstream.' },
      { title: 'WHO Guidelines', body: 'WHO\'s updated 2021 guidelines cut the safe annual PM2.5 limit to 5 µg/m³ — half the previous limit. Meeting these standards globally could prevent millions of deaths annually.' },
    ],
  },

  'https://www.globalforestwatch.org': {
    images: [
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    ],
    intro: 'Global Forest Watch monitors forests worldwide in near real-time using satellite technology — empowering governments, companies, and citizens to protect forests before it\'s too late.',
    stats: [
      { value: '4.1M ha', label: 'Lost in 2022', desc: 'tropical primary forest lost globally' },
      { value: '24–72h', label: 'Alert Speed', desc: 'deforestation alerts sent via satellite' },
      { value: '80+', label: 'Governments', desc: 'use GFW data for forest policy decisions' },
      { value: '31%', label: 'Land Cover', desc: 'of Earth\'s surface covered by forests' },
    ],
    sections: [
      { title: 'How It Works', body: 'GFW uses Landsat and Sentinel satellite imagery to detect tree cover loss. The platform processes petabytes of data to deliver near real-time monitoring — alerts are issued within 24 to 72 hours of changes.' },
      { title: 'Forest Loss Crisis', body: 'In 2022, the world lost 4.1 million hectares of tropical primary forest — an area roughly the size of the Netherlands. Brazil, the DRC, and Bolivia were the top three hotspots.' },
      { title: 'Why Forests Matter', body: 'Forests store 296 gigatons of carbon, regulate water cycles, and support biodiversity. They sustain the livelihoods of 1.6 billion people. Losing them dramatically accelerates climate change.' },
    ],
  },

  'https://ourworldindata.org/co2-emissions': {
    images: [
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=600&q=80',
    ],
    intro: 'Our World in Data provides free, open-access research and interactive charts on CO₂ and greenhouse gas emissions — making complex global data clear and understandable for everyone.',
    stats: [
      { value: '37.4B t', label: 'CO₂ in 2023', desc: 'tonnes of CO₂ emitted globally last year' },
      { value: 'China 31%', label: 'Top Emitter', desc: 'followed by USA 14% and India 7%' },
      { value: '73%', label: 'Energy Share', desc: 'of GHG emissions from energy production' },
      { value: '-45%', label: '2030 Target', desc: 'required emissions reduction to meet 1.5°C' },
    ],
    sections: [
      { title: 'Global Emissions Today', body: 'Global CO₂ emissions reached 37.4 billion tonnes in 2023. Energy production accounts for the largest share (73%), followed by agriculture (18%) and industrial processes.' },
      { title: 'Country Breakdown', body: 'China, USA, and India are the top three emitters by total output. However, per-capita emissions tell a different story — Qatar, Kuwait, and UAE have the highest per-person emissions globally.' },
      { title: 'Historical Context', body: 'CO₂ emissions have grown from ~2 billion tonnes in 1900 to over 37 billion today. The fastest growth occurred post-WWII and during rapid Asian industrialization in the 2000s.' },
    ],
  },

  'https://oceanconservancy.org': {
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580019542155-247062e19ce4?auto=format&fit=crop&w=600&q=80',
    ],
    intro: 'Ocean Conservancy works to protect the ocean from plastic pollution, climate change, and unsustainable fishing. A healthy ocean supports all life on Earth — producing 50% of our oxygen.',
    stats: [
      { value: '8M t/yr', label: 'Plastic', desc: 'metric tons of plastic entering oceans each year' },
      { value: '300M lbs', label: 'Cleanup', desc: 'of trash removed from coastlines to date' },
      { value: '50%+', label: 'Oxygen', desc: 'of Earth\'s oxygen produced by ocean organisms' },
      { value: '30%', label: 'CO₂ Absorbed', desc: 'of human CO₂ emissions absorbed by oceans' },
    ],
    sections: [
      { title: 'Plastic Pollution Crisis', body: '8 million metric tons of plastic enter the ocean every year. This breaks into microplastics that enter the food chain. Ocean Conservancy\'s International Coastal Cleanup has removed over 300 million pounds of trash globally.' },
      { title: 'Ocean Acidification', body: 'The ocean absorbs ~30% of all human CO₂ emissions. This causes ocean acidification — pH has dropped 26% since industrialization — threatening coral reefs, shellfish, and the entire marine food web.' },
      { title: 'Why Oceans Matter', body: 'Oceans cover 71% of Earth\'s surface, generate 50%+ of our oxygen, and absorb 90% of excess heat from global warming. Protecting them is absolutely essential to fighting climate change.' },
    ],
  },
};

export const ResourceViewer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const url = searchParams.get('url') || '';
  const title = searchParams.get('title') || 'Eco Resource';
  const tag = searchParams.get('tag') || '';

  const meta = RESOURCE_META[url] || {
    images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80'],
    intro: 'This resource provides valuable environmental data and research.',
    stats: [{ value: '—', label: 'Resource', desc: 'Eco environmental resource' }],
    sections: [{ title: 'About', body: 'Visit the official website for full details and research.' }],
  };

  return (
    <div className="animate-fade" style={wrapper}>

      {/* ── Header Card (back button + title + intro) ── */}
      <div className="glass-card" style={headerCard}>
        <button style={backBtn} onClick={() => navigate('/learn')}>
          <ArrowLeft size={15} />
          Back to Learn
        </button>
        <div style={headerDivider} />
        {tag && <span style={tagBadge}>{tag}</span>}
        <h1 style={pageTitle}>{title}</h1>
        <p style={introText}>{meta.intro}</p>
      </div>

      {/* ── Photo Grid (4 images, no gap) ── */}
      <div style={photoGrid}>
        <div style={mainImgBox}>
          <img src={meta.images[activeImg]} alt={title} style={mainImg} />
        </div>
        <div style={thumbGrid}>
          {meta.images.map((src, i) => (
            <div key={i}
              style={{ ...thumbBox, outline: activeImg === i ? '2px solid rgba(169,217,217,0.7)' : '2px solid transparent' }}
              onClick={() => setActiveImg(i)}>
              <img src={src} alt={`${title} ${i + 1}`} style={thumbImg} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Grid (4 boxes) ── */}
      <div style={statsGrid}>
        {meta.stats.map((s, i) => (
          <div key={i} className="glass-card" style={statCard}>
            <span style={statValue}>{s.value}</span>
            <span style={statLabel}>{s.label}</span>
            <p style={statDesc}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Content Sections Grid ── */}
      <div style={sectionsGrid}>
        {meta.sections.map((sec, i) => (
          <div key={i} className="glass-card" style={sectionCard}>
            <div style={sectionNum}>{i + 1}</div>
            <h3 style={sectionTitle}>{sec.title}</h3>
            <p style={sectionBody}>{sec.body}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

/* ── Styles ── */
const wrapper = { width: '100%', maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '3rem' };

const headerCard = { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(9,18,13,0.6)' };

const backBtn = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '0.35rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-heading)', width: 'fit-content' };

const headerDivider = { height: '1px', background: 'var(--panel-border)', margin: '0.1rem 0' };

const tagBadge = { fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: '999px', background: 'rgba(169,217,217,0.08)', color: 'rgba(169,217,217,0.8)', border: '1px solid rgba(169,217,217,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em', width: 'fit-content' };

const pageTitle = { margin: 0, fontSize: '1.9rem', fontWeight: 900, color: 'rgba(169,217,217,0.85)' };

const introText = { margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '760px' };

/* Photo grid — fixed height, no gap */
const photoGrid = { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '0.75rem', alignItems: 'stretch', height: '300px' };

const mainImgBox = { borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--panel-border)', height: '300px' };

const mainImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

const thumbGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.75rem', height: '300px' };

const thumbBox = { borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--panel-border)', transition: 'outline 0.15s' };

const thumbImg = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

/* Stats grid */
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' };

const statCard = { padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', background: 'rgba(9,18,13,0.6)', textAlign: 'center', alignItems: 'center' };

const statValue = { fontSize: '1.5rem', fontWeight: 900, color: 'rgba(169,217,217,0.85)', fontFamily: 'var(--font-heading)', lineHeight: 1.2 };

const statLabel = { fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' };

const statDesc = { margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'center' };

/* Sections grid */
const sectionsGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' };

const sectionCard = { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(9,18,13,0.6)' };

const sectionNum = { width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(169,217,217,0.1)', border: '1px solid rgba(169,217,217,0.25)', color: 'rgba(169,217,217,0.8)', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };

const sectionTitle = { margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'rgba(169,217,217,0.8)' };

const sectionBody = { margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.65' };

export default ResourceViewer;
