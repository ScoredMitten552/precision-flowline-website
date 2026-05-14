import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

function SlashDivider({ color = '#0A1172', flip = false }) {
  return (
    <div className="water-slash" style={{ lineHeight: 0, transform: flip ? 'scaleX(-1)' : 'none' }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
        <polygon points="0,64 1440,0 1440,64" fill={color}/>
        <line x1="0" y1="64" x2="1440" y2="0" stroke="rgba(0,180,216,0.35)" strokeWidth="2"/>
      </svg>
    </div>
  )
}

function AnimCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current || isNaN(Number(target))) return
    started.current = true
    const end = parseFloat(target)
    const t0 = performance.now()
    const dur = 1800
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Number.isInteger(end) ? Math.round(e * end) : Math.round(e * end * 10) / 10)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref}>{isNaN(Number(target)) ? target : val}{suffix}</span>
}

export default function Benefits() {
  const stats = [
    { v: '55–85', display: '55–85%', icon: '💰', label: 'Cost Savings',           sub: 'vs. full-depth reclamation',       color: '#00B4D8', desc: 'Precision corrections use targeted material — dramatically reducing cost per sq ft.' },
    { v: '98',    display: null,      icon: '✅', label: 'Project Success Rate',    sub: 'verified by live flow testing',    color: '#4A90D9', desc: "Every project is verified before closeout. If water still ponds, we're not done." },
    { v: 'Hours', display: 'Hours',  icon: '⚡', label: 'Completion Time',         sub: 'not weeks like traditional',       color: '#00B4D8', desc: 'Most projects complete in a single shift — minimizing traffic disruption.' },
    { v: '50–75', display: '50–75%', icon: '🚦', label: 'Traffic Control Savings', sub: 'vs. mill and overlay projects',   color: '#4A90D9', desc: 'Shorter work windows mean fewer cones, less personnel, far less roadway exposure.' },
  ]

  const extra = [
    { icon: '🏗️', t: 'Zero Infrastructure Loss',   d: 'Work within existing pavement — no full-depth removal, no disposal costs, no replacement laydown.' },
    { icon: '📋', t: 'Regulatory Compliance Ready', d: 'Full flow-test documentation supports ADA compliance, stormwater permits, and insurance requirements.' },
    { icon: '⚖️', t: 'Liability Risk Elimination',  d: 'Ponding water is a slip-and-fall liability. Our solutions permanently eliminate the water — and the risk.' },
    { icon: '🏢', t: 'Minimal Business Disruption', d: 'Short work windows keep your parking lot, road, or facility in near-continuous operation.' },
    { icon: '📈', t: 'Extended Pavement Life',       d: 'Eliminating water infiltration at the source extends pavement life by years — protecting your investment.' },
    { icon: '🌿', t: 'Environmental Responsibility', d: 'Less material removal means less landfill waste, lower carbon footprint, and cleaner job sites.' },
  ]

  return (
    <main style={{ background: '#0A1172' }}>

      {/* HEADER */}
      <section style={{
        padding: '120px 24px 80px',
        background: 'linear-gradient(160deg, #0A1172 0%, #060C5A 55%, #040840 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}/>
        {/* Slash accent */}
        <div style={{ position: 'absolute', top: '60%', left: '-5%', right: '-5%', height: 3, background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.4), transparent)', transform: 'rotate(-5deg)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-block', background: 'rgba(0,180,216,0.13)', border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100, padding: '6px 20px', color: '#00B4D8', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 22 }}>
            THE NUMBERS DON'T LIE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,7vw,84px)', color: '#fff', margin: '0 0 20px', lineHeight: 0.93 }}>
            RESULTS THAT <span style={{ color: '#00B4D8' }}>SPEAK</span><br/>FOR THEMSELVES
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: 18, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Dramatic cost reduction, faster completion, and a near-perfect success rate — backed by real-world data.
          </motion.p>
        </div>
      </section>

      {/* MAIN STATS */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: '44px 28px', borderRadius: 20, textAlign: 'center',
                  background: `linear-gradient(135deg, ${s.color}12, ${s.color}04)`,
                  border: `1px solid ${s.color}30`,
                }}>
                  <div style={{ fontSize: 40, marginBottom: 18 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(52px,7vw,72px)', color: s.color, lineHeight: 1, marginBottom: 10 }}>
                    {s.display
                      ? s.display
                      : <AnimCounter target={s.v} suffix="%" />
                    }
                  </div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>{s.sub}</div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COST COMPARISON */}
      <SlashDivider color="#0A1172" flip/>
      <section style={{ padding: '80px 24px', background: '#0A1172' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(32px,5vw,50px)', color: '#fff', textAlign: 'center', margin: '0 0 8px' }}>
              COST COMPARISON
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, textAlign: 'center', marginBottom: 48 }}>Per square foot — project for project</p>
          </FadeIn>
          {[
            { l: 'Precision Flowline', pct: 22, amt: '$2–4/sq ft',   color: '#00B4D8' },
            { l: 'Surface Overlay',     pct: 50, amt: '$5–8/sq ft',   color: 'rgba(255,255,255,0.22)' },
            { l: 'Mill & Fill',         pct: 68, amt: '$7–12/sq ft',  color: 'rgba(255,255,255,0.15)' },
            { l: 'Full-Depth Reclaim',  pct: 100,amt: '$12–20/sq ft', color: 'rgba(255,255,255,0.09)' },
          ].map((row, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: row.color === '#00B4D8' ? '#00B4D8' : 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 15 }}>{row.l}</span>
                  <span style={{ color: row.color === '#00B4D8' ? '#00B4D8' : 'rgba(255,255,255,0.4)', fontSize: 15, fontWeight: 600 }}>{row.amt}</span>
                </div>
                <div style={{ height: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 6, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.15, ease: 'easeOut' }}
                    style={{ height: '100%', background: row.color, borderRadius: 6, boxShadow: row.color === '#00B4D8' ? '0 0 14px rgba(0,180,216,0.45)' : 'none' }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* EXTRA BENEFITS */}
      <SlashDivider color="rgba(0,0,0,0.18)"/>
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.16)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(30px,5vw,48px)', color: '#fff', margin: '0 0 10px' }}>
                BEYOND THE NUMBERS
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>Operational, legal, and environmental advantages that compound over time</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {extra.map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: 18, padding: 26, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 30, flexShrink: 0, lineHeight: 1 }}>{b.icon}</div>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 8px' }}>{b.t}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{b.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(0,180,216,0.12), rgba(74,144,217,0.05))', borderTop: '1px solid rgba(0,180,216,0.2)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(30px,5vw,50px)', color: '#fff', margin: '0 0 16px' }}>
            SEE THESE SAVINGS <span style={{ color: '#00B4D8' }}>ON YOUR PROJECT</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, margin: '0 0 36px' }}>Contact us for a custom cost comparison for your specific site.</p>
          <Link to="/contact" style={{ display: 'inline-block', padding: '17px 42px', background: 'linear-gradient(135deg, #00B4D8, #48CAE4)', color: '#0A1172', borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,180,216,0.35)' }}>
            Get Your Free Assessment
          </Link>
        </section>
      </FadeIn>
    </main>
  )
}
