import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import BeforeAfterSlider, { sliders } from '../components/BeforeAfterSlider'

/* ─── Helpers ─── */
function FadeIn({ children, delay = 0, y = 36 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-64px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

/* ─── Water-slash decorative divider ─── */
function SlashDivider({ flip = false, color = '#0A1172' }) {
  return (
    <div className="water-slash" style={{ lineHeight: 0, transform: flip ? 'scaleX(-1)' : 'none' }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: '100%', height: 72, display: 'block' }}>
        <defs>
          <linearGradient id={`slash-${flip}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#00B4D8" stopOpacity="0"/>
            <stop offset="40%"  stopColor="#00B4D8" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#4A90D9" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Angled fill into next section */}
        <polygon points={`0,72 1440,0 1440,72`} fill={color}/>
        {/* Glowing slash line */}
        <line x1="0" y1="72" x2="1440" y2="0" stroke={`url(#slash-${flip})`} strokeWidth="2.5"/>
        {/* Secondary wave */}
        <path d="M0 60 Q360 45 720 58 Q1080 71 1440 52" stroke="rgba(0,180,216,0.2)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  )
}

/* ─── Animated rain hero background ─── */
function HeroBackground() {
  const drops = Array.from({ length: 38 }, (_, i) => ({
    left: `${(i * 2.7) % 100}%`,
    height: `${40 + (i * 17) % 50}px`,
    animationDuration: `${0.7 + (i * 0.11) % 1.2}s`,
    animationDelay: `${(i * 0.23) % 3}s`,
    opacity: 0.15 + (i * 0.013) % 0.4,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Base gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0A1172 0%, #060C5A 45%, #040840 80%, #030620 100%)',
      }}/>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,180,216,0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,216,0.055) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }}/>
      {/* Diagonal water-slash across hero */}
      <div style={{
        position: 'absolute', top: '30%', left: '-10%', right: '-10%', height: 4,
        background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.35), rgba(74,144,217,0.25), transparent)',
        transform: 'rotate(-8deg)',
        filter: 'blur(1px)',
      }}/>
      <div style={{
        position: 'absolute', top: '42%', left: '-10%', right: '-10%', height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.18), transparent)',
        transform: 'rotate(-8deg)',
      }}/>
      {/* Rain drops */}
      {drops.map((d, i) => (
        <div key={i} className="rain-drop" style={{
          position: 'absolute', left: d.left,
          width: 1.5, height: d.height, borderRadius: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.55))',
          opacity: d.opacity,
          animationDuration: d.animationDuration,
          animationDelay: d.animationDelay,
        }}/>
      ))}
      {/* Ripple circles at bottom */}
      {[{ l: '18%', s: 110, d: '0s' }, { l: '55%', s: 75, d: '1.1s' }, { l: '80%', s: 90, d: '2.2s' }].map((r, i) => (
        <div key={i} style={{ position: 'absolute', bottom: '12%', left: r.l, width: r.s, height: r.s / 3 }}>
          {[0, 1, 2].map(j => (
            <div key={j} className="ripple-anim" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid rgba(0,180,216,0.35)',
              animationDelay: `${parseFloat(r.d) + j * 1.1}s`,
            }}/>
          ))}
        </div>
      ))}
      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 130, overflow: 'hidden' }}>
        <div className="wave-anim" style={{ position: 'absolute', bottom: 0, width: '200%', height: 130 }}>
          <svg viewBox="0 0 1440 130" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 65 C240 110 480 20 720 65 C960 110 1200 20 1440 65 L1440 130 L0 130 Z" fill="rgba(0,180,216,0.1)"/>
          </svg>
        </div>
        <div className="wave-slow" style={{ position: 'absolute', bottom: 0, width: '200%', height: 90, animationDelay: '-5s' }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 35 C360 75 720 0 1080 35 C1260 55 1380 25 1440 35 L1440 90 L0 90 Z" fill="rgba(74,144,217,0.07)"/>
          </svg>
        </div>
      </div>
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 68%)',
        pointerEvents: 'none',
      }}/>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: '#0A1172' }}>

      {/* ════════════════ HERO ════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '120px 24px 100px',
      }}>
        <HeroBackground/>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 880 }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.4)',
              borderRadius: 100, padding: '8px 22px', marginBottom: 32,
            }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00B4D8', boxShadow: '0 0 10px #00B4D8' }}/>
            <span style={{ color: '#00B4D8', fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>
              PATENTED TECHNOLOGY · PROVEN NATIONWIDE
            </span>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(52px,9vw,100px)',
              lineHeight: 0.92, margin: '0 0 28px', letterSpacing: -1 }}>
            <span style={{ color: '#fff' }}>REVOLUTIONARY</span><br/>
            <span style={{ color: '#00B4D8' }}>PONDING</span><br/>
            <span style={{ color: '#fff' }}>MITIGATION</span>
          </motion.h1>

          {/* TAGLINE */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.28 }}
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700, fontSize: 'clamp(17px,2.8vw,22px)',
              color: '#00B4D8', letterSpacing: 1, margin: '0 0 12px',
              textTransform: 'uppercase',
            }}>
            Restore Flow. Extend Pavement Life. Reduce Complaints.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.38 }}
            style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(15px,2.2vw,19px)', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 44px' }}>
            Precision Flowline's patented 3-step process eliminates ponding water from parking lots,
            roads, and municipal infrastructure — in hours, not weeks, at a fraction of the cost.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '17px 38px', borderRadius: 10,
              background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              color: '#0A1172', fontWeight: 800, fontSize: 17,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,180,216,0.4)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,180,216,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,180,216,0.4)' }}
            >
              Get a Free Assessment →
            </Link>
            <Link to="/how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '17px 32px', borderRadius: 10,
              border: '2px solid rgba(74,144,217,0.45)',
              color: '#fff', fontWeight: 600, fontSize: 17, textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B4D8'; e.currentTarget.style.background = 'rgba(0,180,216,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,144,217,0.45)'; e.currentTarget.style.background = 'transparent' }}
            >
              See How It Works
            </Link>
          </motion.div>

          {/* HERO STATS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
            style={{ marginTop: 70, display: 'flex', justifyContent: 'center', gap: 44, flexWrap: 'wrap' }}>
            {[
              { v: '98%',    l: 'Success Rate' },
              { v: '55–85%', l: 'Cost Savings' },
              { v: 'Hours',  l: 'Not Weeks' },
              { v: '50–75%', l: 'Traffic Savings' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 38, color: '#00B4D8', lineHeight: 1 }}>
                  {s.v}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, letterSpacing: 1.5, marginTop: 5, textTransform: 'uppercase' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: 2.5 }}>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 20, height: 30, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 10, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 3, height: 6, background: '#00B4D8', borderRadius: 2 }}/>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════ SLASH INTO PROBLEM SECTION ════════ */}
      <SlashDivider color="rgba(0,0,0,0.2)"/>

      {/* ════════════════ PROBLEM ════════════════ */}
      <section style={{ padding: '80px 24px 100px', background: 'rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ color: '#4A90D9', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>THE PROBLEM</div>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(34px,5vw,58px)', color: '#fff', margin: '0 0 16px' }}>
                PONDING WATER IS <span style={{ color: '#00B4D8' }}>COSTING YOU</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
                Every inch of standing water means liability, accelerated deterioration, and costly traditional repairs.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {[
              { icon: '⚠️', t: 'Slip & Fall Liability',     d: 'Ponding water creates dangerous conditions and unlimited legal exposure for property owners and municipalities.' },
              { icon: '🔧', t: 'Pavement Deterioration',    d: 'Water infiltration accelerates freeze-thaw cycles, pothole formation, and structural pavement failure.' },
              { icon: '🚧', t: 'Disruptive Closures',       d: 'Traditional overlay closures last weeks, disrupting tenants, customers, commuters, and business operations.' },
              { icon: '💸', t: 'Excessive Project Costs',   d: 'Full-depth reclamation runs 2–5× the cost of Precision Flowline\'s targeted mitigation approach.' },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: 28, borderRadius: 16,
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  height: '100%',
                }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>{c.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DIAGONAL INTO PROCESS ════════ */}
      <SlashDivider color="#0A1172" flip/>

      {/* ════════════════ PROCESS PREVIEW ════════════════ */}
      <section style={{ padding: '100px 24px', background: '#0A1172' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ color: '#00B4D8', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>PATENTED 3-STEP PROCESS</div>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(34px,5vw,56px)', color: '#fff', margin: 0 }}>
                PRECISION THAT <span style={{ color: '#00B4D8' }}>WORKS</span>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 28 }}>
            {[
              { n: '01', t: 'Pilot Cuts',            d: 'Strategic precision cuts diagnose subsurface water pathways without full surface removal.' },
              { n: '02', t: 'Topography Alterations', d: 'Calculated grade adjustments redirect water flow away from ponding zones with minimal material.' },
              { n: '03', t: 'Flow Testing',           d: 'Real-time water simulation verifies complete ponding elimination before project closeout.' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  padding: '36px 30px', borderRadius: 20, position: 'relative', overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(0,180,216,0.09), rgba(74,144,217,0.04))',
                  border: '1px solid rgba(0,180,216,0.22)',
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
                    fontSize: 100, color: 'rgba(0,180,216,0.06)',
                    position: 'absolute', top: -12, right: 12, lineHeight: 1, userSelect: 'none',
                  }}>{s.n}</div>
                  {/* Step badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: 10,
                    background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 20, color: '#fff',
                    marginBottom: 20, boxShadow: '0 4px 14px rgba(0,180,216,0.35)',
                  }}>{s.n}</div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 22, margin: '0 0 12px' }}>{s.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link to="/how-it-works" style={{
                display: 'inline-block', padding: '14px 32px',
                border: '2px solid rgba(0,180,216,0.45)', color: '#00B4D8',
                borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,180,216,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                Deep Dive: Full Process Breakdown + 3D Animation →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ DIAGONAL INTO STATS ════════ */}
      <SlashDivider color="rgba(0,0,0,0.22)"/>

      {/* ════════════════ STATS ════════════════ */}
      <section style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ color: '#4A90D9', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>REAL RESULTS</div>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(34px,5vw,56px)', color: '#fff', margin: '0 0 56px' }}>
              THE NUMBERS <span style={{ color: '#00B4D8' }}>SPEAK</span>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4 }}>
            {[
              { v: '55–85%', l: 'Cost Savings',            sub: 'vs. full-depth reclamation' },
              { v: '98%',    l: 'Project Success Rate',     sub: 'verified by live flow testing' },
              { v: 'Hours',  l: 'Completion Time',          sub: 'not weeks like traditional methods' },
              { v: '50–75%', l: 'Traffic Control Savings',  sub: 'less lane closure time' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{
                  padding: '40px 16px',
                  borderRight: i < 3 ? '1px solid rgba(0,180,216,0.15)' : 'none',
                }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(44px,6vw,68px)', color: '#00B4D8', lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginTop: 10, marginBottom: 6 }}>{s.l}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: 0.5 }}>{s.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SLASH INTO SLIDERS ════════ */}
      <SlashDivider color="#0A1172" flip/>

      {/* ════════════════ BEFORE/AFTER SLIDERS ════════════════ */}
      <section style={{ padding: '100px 24px', background: '#0A1172' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ color: '#00B4D8', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>BEFORE & AFTER</div>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(34px,5vw,58px)', color: '#fff', margin: '0 0 16px' }}>
                RESULTS THAT <span style={{ color: '#00B4D8' }}>SPEAK</span><br/>FOR THEMSELVES
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
                Drag the handle left or right to reveal each transformation.
                Real projects — same surface, hours later.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 32 }}>
            {sliders.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <BeforeAfterSlider
                  beforeScene={s.before}
                  afterScene={s.after}
                  title={s.title}
                />
              </FadeIn>
            ))}
          </div>
          {/* Swap-in note */}
          <FadeIn delay={0.3}>
            <div style={{
              marginTop: 36, textAlign: 'center',
              padding: '14px 24px',
              background: 'rgba(0,180,216,0.07)',
              border: '1px solid rgba(0,180,216,0.18)',
              borderRadius: 10, display: 'inline-block',
              left: '50%', position: 'relative', transform: 'translateX(-50%)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                📸 Placeholder scenes shown — swap in real project photos anytime
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ SLASH INTO TAGLINE ════════ */}
      <SlashDivider color="rgba(0,180,216,0.1)"/>

      {/* ════════════════ BOLD TAGLINE BANNER ════════════════ */}
      <section style={{
        padding: '90px 24px',
        background: 'linear-gradient(135deg, rgba(0,180,216,0.13), rgba(74,144,217,0.06))',
        borderTop: '1px solid rgba(0,180,216,0.2)',
        borderBottom: '1px solid rgba(0,180,216,0.2)',
        textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px,5vw,56px)',
            color: '#fff',
            margin: '0 0 12px',
            letterSpacing: 0.5,
          }}>
            RESTORE FLOW.{' '}
            <span style={{ color: '#00B4D8' }}>EXTEND PAVEMENT LIFE.</span>{' '}
            REDUCE COMPLAINTS.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, margin: '0 0 36px', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Precision Flowline delivers what traditional methods can't — a permanent solution
            with verified results, in hours, at a fraction of the cost.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block', padding: '18px 44px',
            background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
            color: '#0A1172', borderRadius: 10,
            fontWeight: 800, fontSize: 18, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,180,216,0.35)',
          }}>
            Get Your Free Assessment Today
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}
