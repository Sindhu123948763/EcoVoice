/* src/pages/Community.jsx */
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Heart, MessageSquare, Plus, Share2, Award, TrendingUp,
  Wind, Droplets, TreePine, Trash2, Users, ChevronDown,
  ChevronUp, Send, Filter, X, CheckCircle, Flame, Globe
} from 'lucide-react';
import '../styles/global.css';

/* ─────────────────────────────── Data ────────────────────────────────── */
const CATEGORY_META = {
  All: {
    icon: Globe,
    color: '#00f5a0',
    gradient: 'linear-gradient(135deg, #00f5a0 0%, #00d9f5 100%)',
    bg: 'rgba(0,245,160,0.08)',
    desc: 'All discussions'
  },
  Atmosphere: {
    icon: Wind,
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
    bg: 'rgba(96,165,250,0.08)',
    desc: 'Air quality & climate'
  },
  'Water Quality': {
    icon: Droplets,
    color: '#00d9f5',
    gradient: 'linear-gradient(135deg, #00d9f5 0%, #0ea5e9 100%)',
    bg: 'rgba(0,217,245,0.08)',
    desc: 'Rivers, lakes & oceans'
  },
  Deforestation: {
    icon: TreePine,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    bg: 'rgba(52,211,153,0.08)',
    desc: 'Forests & biodiversity'
  },
  'Plastic Waste': {
    icon: Trash2,
    color: '#f87171',
    gradient: 'linear-gradient(135deg, #f87171 0%, #fb923c 100%)',
    bg: 'rgba(248,113,113,0.08)',
    desc: 'Waste & recycling'
  },
  Discussion: {
    icon: MessageSquare,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    bg: 'rgba(245,158,11,0.08)',
    desc: 'Open community dialogue'
  }
};

const TRENDING = [
  { rank: 1, tag: '#MethaneWarming', count: '142 active opinions', heat: 98 },
  { rank: 2, tag: '#E-WasteWatersheds', count: '98 discussions', heat: 74 },
  { rank: 3, tag: '#KelpforestRevival', count: '64 comments', heat: 55 },
  { rank: 4, tag: '#SolarFarming', count: '41 topics', heat: 33 },
  { rank: 5, tag: '#CleanCookstoves', count: '28 replies', heat: 22 },
];

const COMMUNITY_STATS = [
  { label: 'Members', value: '12,480', icon: Users, color: '#00f5a0' },
  { label: 'Posts Today', value: '384', icon: MessageSquare, color: '#60a5fa' },
  { label: 'Active Now', value: '247', icon: Flame, color: '#f59e0b' },
];

/* ─────────────────────────────── Component ───────────────────────────── */
export const Community = () => {
  const { posts, addPost, likePost, addCommentToPost, votePoll, user } = useContext(AppContext);

  const [activeCategory, setActiveCategory] = useState('All');
  const [showCreateModal, setShowCreateModal]  = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [animIn, setAnimIn] = useState(true);

  const [title, setTitle]       = useState('');
  const [content, setContent]   = useState('');
  const [category, setCategory] = useState('Discussion');
  const [hasPoll, setHasPoll]   = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions]   = useState(['', '']);
  const [commentInputs, setCommentInputs] = useState({});

  const categories = ['All', 'Atmosphere', 'Water Quality', 'Deforestation', 'Plastic Waste', 'Discussion'];

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setAnimIn(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setAnimIn(true);
    }, 180);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const filteredOpts = pollOptions.filter(o => o.trim() !== '');
    addPost({
      title, content, category,
      pollQuestion: hasPoll ? pollQuestion : null,
      pollOptions: hasPoll ? filteredOpts : null
    });
    setTitle(''); setContent(''); setCategory('Discussion');
    setHasPoll(false); setPollQuestion(''); setPollOptions(['', '']);
    setShowCreateModal(false);
  };

  const handleCommentSubmit = (postId) => {
    const txt = commentInputs[postId];
    if (!txt || !txt.trim()) return;
    addCommentToPost(postId, txt);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const getPollTotal = (poll) => poll.options.reduce((s, o) => s + o.votes, 0);
  const toggleComments = (id) => setExpandedComments(prev => ({ ...prev, [id]: !prev[id] }));

  const meta = CATEGORY_META[activeCategory] || CATEGORY_META.All;
  const ActiveIcon = meta.icon;

  return (
    <div className="animate-fade" style={S.wrapper}>

      {/* Hero Banner */}
      <section style={S.hero}>
        <div style={{ ...S.heroBg, backgroundImage: meta.gradient }} />
        <div style={S.heroContent}>
          <div style={S.heroText}>
            <div style={{ ...S.heroPill, borderColor: meta.color + '44', color: meta.color }}>
              <ActiveIcon size={13} />
              <span>Community Hub</span>
            </div>
            <h1 style={S.heroTitle}>
              Discuss Global{' '}
              <span style={{ ...S.gradText, backgroundImage: meta.gradient }}>
                Ecological Studies
              </span>
            </h1>
            <p style={S.heroSub}>Habits, research, and community action plans — all in one place.</p>
            <div style={S.statsRow}>
              {COMMUNITY_STATS.map(s => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} style={S.statChip}>
                    <SIcon size={14} color={s.color} />
                    <strong style={{ color: s.color }}>{s.value}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="btn btn-primary" style={S.launchBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            <span>Launch Topic</span>
          </button>
        </div>
      </section>

      {/* Category Filters */}
      <section style={S.filterBar}>
        {categories.map((cat) => {
          const cm = CATEGORY_META[cat];
          const CIcon = cm.icon;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                ...S.filterBtn,
                ...(isActive ? {
                  backgroundImage: cm.gradient,
                  color: '#050a07',
                  border: '1px solid transparent',
                  fontWeight: 700,
                  boxShadow: `0 0 20px ${cm.color}44`
                } : {
                  background: cm.bg,
                  border: `1px solid ${cm.color}22`,
                  color: cm.color
                })
              }}
            >
              <CIcon size={13} />
              <span>{cat}</span>
            </button>
          );
        })}
      </section>

      {/* Main Grid */}
      <div style={S.grid}>

        {/* Posts Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: animIn ? 1 : 0, transition: 'opacity 0.25s ease' }}>
          {filteredPosts.length === 0 && (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Globe size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No posts in this category yet. Be the first to launch a topic!</p>
            </div>
          )}

          {filteredPosts.map((post, idx) => {
            const catMeta  = CATEGORY_META[post.category] || CATEGORY_META.Discussion;
            const PostIcon = catMeta.icon;
            const hasVoted = post.poll && post.poll.userVotedOption !== null;
            const totalPV  = post.poll ? getPollTotal(post.poll) : 0;
            const commExpanded = !!expandedComments[post.id];

            return (
              <div
                key={post.id}
                className="glass-card"
                style={{ ...S.postCard, borderLeft: `3px solid ${catMeta.color}66` }}
              >
                {/* Category Tag */}
                <div style={{ ...S.catTag, background: catMeta.bg, color: catMeta.color, border: `1px solid ${catMeta.color}33` }}>
                  <PostIcon size={11} />
                  <span>{post.category}</span>
                </div>

                {/* Author */}
                <div style={S.authorRow}>
                  <img
                    src={post.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80'}
                    alt="avatar"
                    style={S.avatar}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{post.author.username}</strong>
                      <span style={S.authorBadge}>{post.author.title}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.date}</span>
                  </div>
                </div>

                <h3 style={S.postTitle}>{post.title}</h3>
                <p style={S.postBody}>{post.content}</p>

                {/* Poll */}
                {post.poll && (
                  <div style={S.pollBox}>
                    <p style={S.pollQ}>{post.poll.question}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {post.poll.options.map((opt, oIdx) => {
                        const pct = totalPV > 0 ? ((opt.votes / totalPV) * 100).toFixed(0) : 0;
                        const chosen = post.poll.userVotedOption === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => votePoll(post.id, oIdx)}
                            disabled={hasVoted}
                            style={{
                              ...S.pollOpt,
                              border: chosen ? `1px solid ${catMeta.color}` : '1px solid var(--panel-border)',
                              cursor: hasVoted ? 'default' : 'pointer'
                            }}
                          >
                            {hasVoted && (
                              <div style={{ ...S.pollBar, width: `${pct}%`, background: `${catMeta.color}18` }} />
                            )}
                            <div style={S.pollOptInner}>
                              <span style={{ fontWeight: chosen ? 700 : 400, position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                {chosen && <CheckCircle size={12} color={catMeta.color} />}
                                {opt.text}
                              </span>
                              {hasVoted && (
                                <span style={{ fontWeight: 700, color: catMeta.color, fontSize: '0.8rem', position: 'relative', zIndex: 2 }}>
                                  {pct}% &middot; {opt.votes}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {hasVoted && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{totalPV} total votes</p>}
                  </div>
                )}

                {/* Controls */}
                <div style={S.controls}>
                  <button style={S.controlBtn} onClick={() => likePost(post.id)}>
                    <Heart
                      size={15}
                      fill={post.likedBy.includes(user && user.username) ? '#f87171' : 'none'}
                      color={post.likedBy.includes(user && user.username) ? '#f87171' : 'currentColor'}
                    />
                    <span>{post.likes} Likes</span>
                  </button>
                  <button style={S.controlBtn} onClick={() => toggleComments(post.id)}>
                    <MessageSquare size={15} />
                    <span>{post.comments.length} Comments</span>
                    {commExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <button style={{ ...S.controlBtn, marginLeft: 'auto' }}>
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments */}
                {commExpanded && (
                  <div style={S.commentsBox}>
                    {post.comments.length === 0 && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem 0' }}>
                        No comments yet — start the conversation!
                      </p>
                    )}
                    {post.comments.map((cm, cIdx) => (
                      <div key={cIdx} style={S.commentItem}>
                        <div style={{ ...S.commentInitial, backgroundImage: catMeta.gradient, color: '#050a07' }}>
                          {cm.author.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>{cm.author}</strong>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{cm.date}</span>
                          </div>
                          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{cm.content}</p>
                        </div>
                      </div>
                    ))}
                    <div style={S.commentInputRow}>
                      <div style={{ ...S.commentInitial, backgroundImage: catMeta.gradient, color: '#050a07', flexShrink: 0 }}>
                        {user ? user.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <input
                        type="text"
                        placeholder="Share your perspective…"
                        value={commentInputs[post.id] || ''}
                        onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && handleCommentSubmit(post.id)}
                        style={S.commentField}
                      />
                      <button
                        style={{ ...S.sendBtn, backgroundImage: catMeta.gradient, color: '#050a07' }}
                        onClick={() => handleCommentSubmit(post.id)}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div style={S.sidebar}>
          {/* Trending */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={S.sideTitle}>
              <TrendingUp size={16} color="var(--color-primary)" />
              Trending Topics
            </h3>
            {TRENDING.map(t => (
              <div key={t.rank} style={S.trendRow}>
                <span style={S.trendRank}>#{t.rank}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>{t.tag}</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.count}</span>
                  <div style={S.heatBg}>
                    <div style={{ ...S.heatFill, width: `${t.heat}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse by Topic */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={S.sideTitle}>
              <Filter size={16} color="var(--color-primary)" />
              Browse by Topic
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {categories.filter(c => c !== 'All').map(cat => {
                const cm = CATEGORY_META[cat];
                const CatIc = cm.icon;
                const count = posts.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      ...S.catBrowseBtn,
                      background: activeCategory === cat ? cm.bg : 'transparent',
                      borderColor: activeCategory === cat ? cm.color + '55' : 'var(--panel-border)'
                    }}
                  >
                    <div style={{ ...S.catIconBox, background: cm.bg, color: cm.color }}>
                      <CatIc size={13} />
                    </div>
                    <span style={{ flex: 1, textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cat}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.45rem', borderRadius: '999px' }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Community Pledge */}
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <h3 style={{ ...S.sideTitle, marginBottom: '0.75rem' }}>
              <Award size={16} color="var(--color-primary)" />
              Community Pledge
            </h3>
            {[
              'Share verified data & cite sources',
              'Respect diverse perspectives',
              'Report harmful or misleading posts',
              'Uplift local ecological champions'
            ].map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <CheckCircle size={13} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div style={S.backdrop} onClick={() => setShowCreateModal(false)}>
          <div className="glass-card animate-scale" style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Launch Discussion</h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Start an ecological conversation</p>
              </div>
              <button style={S.closeBtn} onClick={() => setShowCreateModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label className="form-label">Topic Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {categories.filter(c => c !== 'All').map(cat => {
                    const cm = CATEGORY_META[cat];
                    const CatIc = cm.icon;
                    const sel = category === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.78rem',
                          cursor: 'pointer', transition: 'all 0.2s',
                          backgroundImage: sel ? cm.gradient : 'none',
                          background: sel ? undefined : cm.bg,
                          color: sel ? '#050a07' : cm.color,
                          border: `1px solid ${cm.color}44`,
                          fontWeight: sel ? 700 : 400
                        }}
                      >
                        <CatIc size={11} />
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Title / Hook</label>
                <input
                  type="text" required
                  placeholder="Summarize your observation or question…"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Details / Statement</label>
                <textarea
                  required
                  placeholder="Explain background data, research, or your community plan…"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '110px' }}
                />
              </div>

              <div style={S.pollToggleRow}>
                <label style={S.pollToggleLabel} htmlFor="hasPoll">
                  <input
                    id="hasPoll" type="checkbox"
                    checked={hasPoll}
                    onChange={e => setHasPoll(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span>Include Community Survey Poll</span>
                </label>
              </div>

              {hasPoll && (
                <div style={S.pollBlock}>
                  <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label">Poll Question</label>
                    <input
                      type="text"
                      placeholder="e.g. Which metric is most critical?"
                      value={pollQuestion}
                      onChange={e => setPollQuestion(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Options (max 4)</label>
                    {pollOptions.map((opt, idx) => (
                      <input
                        key={idx} type="text"
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={e => {
                          const up = [...pollOptions];
                          up[idx] = e.target.value;
                          setPollOptions(up);
                        }}
                        className="form-input"
                        style={{ marginBottom: '0.5rem' }}
                      />
                    ))}
                    {pollOptions.length < 4 && (
                      <button type="button" onClick={() => setPollOptions(prev => [...prev, ''])} style={S.addOptBtn}>
                        + Add Option
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div style={S.formActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <Globe size={15} />
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Styles ─────────────────────── */
const S = {
  wrapper: { width: '100%', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' },
  hero: { position: 'relative', borderRadius: '20px', overflow: 'hidden', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', minHeight: '200px' },
  heroBg: { position: 'absolute', inset: 0, opacity: 0.07, zIndex: 0 },
  heroContent: { position: 'relative', zIndex: 1, padding: '2.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' },
  heroText: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  heroPill: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', width: 'fit-content', background: 'rgba(0,0,0,0.2)' },
  heroTitle: { fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, margin: 0, lineHeight: 1.2 },
  gradText: { WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  heroSub: { color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 },
  statsRow: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' },
  statChip: { display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--panel-border)', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.8rem' },
  launchBtn: { padding: '0.85rem 1.75rem', fontSize: '0.95rem', flexShrink: 0 },
  filterBar: { display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.25rem' },
  filterBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: '999px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease', fontSize: '0.82rem', fontWeight: 500 },
  grid: { display: 'grid', gridTemplateColumns: '1.85fr 1fr', gap: '1.75rem', alignItems: 'start' },
  postCard: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0' },
  catTag: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.85rem', width: 'fit-content' },
  authorRow: { display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--panel-border)', flexShrink: 0 },
  authorBadge: { fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: '999px', background: 'rgba(96,165,250,0.12)', color: '#60a5fa', fontWeight: 600 },
  postTitle: { fontSize: '1.12rem', fontWeight: 800, marginBottom: '0.65rem', lineHeight: 1.3, color: 'var(--text-primary)' },
  postBody: { fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' },
  pollBox: { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '1rem 1.1rem', marginBottom: '1.25rem' },
  pollQ: { fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' },
  pollOpt: { width: '100%', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.025)', borderRadius: '8px', color: 'var(--text-primary)', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' },
  pollBar: { position: 'absolute', top: 0, left: 0, height: '100%', zIndex: 1, transition: 'width 0.6s ease-out' },
  pollOptInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.83rem', position: 'relative', zIndex: 2 },
  controls: { display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--panel-border)', paddingTop: '0.85rem', marginBottom: '0.85rem' },
  controlBtn: { background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', cursor: 'pointer', transition: 'color 0.2s', padding: '0.3rem 0.5rem', borderRadius: '6px' },
  commentsBox: { background: 'rgba(5,10,7,0.5)', border: '1px solid var(--panel-border)', borderRadius: '10px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  commentItem: { display: 'flex', gap: '0.65rem', alignItems: 'flex-start', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  commentInitial: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 },
  commentInputRow: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  commentField: { flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.8rem', outline: 'none' },
  sendBtn: { border: 'none', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '90px' },
  sideTitle: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' },
  trendRow: { display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--panel-border)' },
  trendRank: { fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.7, minWidth: '24px' },
  heatBg: { height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', marginTop: '0.35rem', overflow: 'hidden' },
  heatFill: { height: '100%', background: 'linear-gradient(90deg, #00f5a0, #00d9f5)', borderRadius: '999px', transition: 'width 0.5s ease' },
  catBrowseBtn: { display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', width: '100%' },
  catIconBox: { width: '26px', height: '26px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(5,10,7,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' },
  modal: { width: '100%', maxWidth: '560px', padding: '2rem', maxHeight: '92vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' },
  closeBtn: { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  pollToggleRow: { margin: '1rem 0', display: 'flex', alignItems: 'center' },
  pollToggleLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' },
  pollBlock: { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' },
  addOptBtn: { background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', cursor: 'pointer', padding: '0.25rem 0' },
  formActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }
};

export default Community;
