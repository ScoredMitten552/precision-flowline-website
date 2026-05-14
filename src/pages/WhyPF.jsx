import { useRef } from 'react'
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

const rows = [
  { cat: 'Project Duration',           pf: 'Hours to 1 day',                  trad: '1–4 weeks' },
  { cat: 'Cost per Sq Ft',             pf: '$2–4',                             trad: '$12–20' },
  { cat: 'Traffic Control Duration',   pf: 'Hours',                            trad: 'Days to weeks' },
  { cat: 'Pavement Removed',           pf: 'Minimal (pilot cuts only)',         trad: 'Full surface or full depth' },
  { cat: 'Disposal Required',          pf: 'Minimal to none',                  trad: 'Extensive haul-off' },
  { cat: 'Success Verification',       pf: 'Live flow testing — every project', trad: 'Visual inspection only' },
  { cat: 'Success Rate',               pf: '98%',                              trad: 'Varies — no standard' },
  { cat: 'Disruption to Operations',   pf: 'Minimal — short closures',         trad: 'Major disruption for weeks' },
  { cat: 'Material Usage',             pf: 'Targeted, precision only',          trad: 'Full-surface replacement' },
  { cat: 'Warranty / Verification',    pf: 'Flow-test documentation included',  trad: 'Rarely provided' },
  { cat: 'Environmental Impact',       pf: 'Low waste, low footprint',          trad: 'High material waste' },
  { cat: 'Regulatory Documentation',  pf: 'Full package provided',             trad: 'Limited documentation' },
]

const clients = [
  { icon: '🏛️', t: 'Municipal Engineers',   d: 'Road departments, DOT agencies, and city infrastructure teams benefit from reduced traffic control costs, faster project closeout, and verified flow documentation for compliance.', tags: ['DOT Projects','Roadway Ponding','Municipal ROW'] },
  { icon: '🏢', t: 'Property Managers',     d: 'Commercial and retail property managers eliminate parking lot liability, reduce tenant complaints, and protect pavement assets at a fraction of overlay costs.', tags: ['Parking Lots','Retail Centers','Commercial Complexes'] },
  { icon: '🏗️', t: 'General Contractors',   d: 'GCs and civil contractors use Precision Flowline as a high-value subcontractor delivering superior drainage results without schedule impact.', tags: ['Subcontractor Work','Site Development','Grading & Drainage'] },
  { icon: '🏭', t: 'Industrial Facilities', d: "Warehouses, distribution centers, and industrial campuses can't afford weeks-long closures. Our single-day solutions keep operations running.", tags: ['Warehouses','Loading Docks','Industrial Sites'] },
]

export default function WhyPF() {
  return (
    <main style={{ background: '#0A1172' }}>

      {/* HEADER */}
      <section style={{ padding: '120px 24px 80px', background: 'linear-gradient(160deg, #0A1172 0%, #060C5A 55%, #040840 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`, backgroundSize: '64px 64px' }}/>
        <div style={{ position: 'absolute', top: '58%', left: '-5%', right: '-5%', height: 3, background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.4), transparent)', transform: 'rotate(-5deg)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-block', background: 'rgba(0,180,216,0.13)', border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100, padding: '6px 20px', color: '#00B4D8', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 22 }}>
            HEAD-TO-HEAD COMPARISON
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,7vw,84px)', color: '#fff', margin: '0 0 20px', lineHeight: 0.93 }}>
            WHY <span style={{ color: '#00B4D8' }}>PRECISION</span><br/>FLOWLINE
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Twelve categories. Twelve wins. See exactly how Precision Flowline stacks up against traditional ponding mitigation.
          </motion.p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <FadeIn>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              background: 'rgba(0,180,216,0.08)',
              border: '1px solid rgba(0,180,216,0.25)',
              borderRadius: '16px 16px 0 0', overflow: 'hidden',
            }}>
              <div style={{ padding: '20px 24px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12, letterSpacing: 1.5 }}>CATEGORY</div>
              <div style={{ padding: '20px 24px', background: 'rgba(0,180,216,0.18)', borderLeft: '1px solid rgba(0,180,216,0.3)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #00B4D8, #0096B7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 6 Q3.5 2 7 6 Q10.5 10 13 6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
                </div>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>Precision Flowline</span>
              </div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 700, fontSize: 14 }}>Traditional Methods</span>
              </div>
            </div>
          </FadeIn>

          {/* Rows */}
          {rows.map((row, i) => (
            <FadeIn key={i} delay={i * 0.035}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderLeft: '1px solid rgba(0,180,216,0.14)',
                borderRight: '1px solid rgba(0,180,216,0.14)',
                borderBottom: '1px solid rgba(255,255,255,0.055)',
                background: i % 2 === 0 ? 'rgba(0,0,0,0.08)' : 'transparent',
              }}>
                <div style={{ padding: '17px 24px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 600 }}>{row.cat}</span>
                </div>
                <div style={{ padding: '17px 24px', background: 'rgba(0,180,216,0.04)', borderLeft: '1px solid rgba(0,180,216,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,180,216,0.15)', border: '1.5px solid #00B4D8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 5.8L8 1" stroke="#00B4D8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ color: '#00B4D8', fontSize: 13, fontWeight: 600 }}>{row.pf}</span>
                </div>
                <div style={{ padding: '17px 24px', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,80,80,0.1)', border: '1.5px solid rgba(255,80,80,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="rgba(255,80,80,0.65)" strokeWidth="1.7" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>{row.trad}</span>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Footer */}
          <FadeIn>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,180,216,0.14), rgba(0,180,216,0.04))',
              border: '1px solid rgba(0,180,216,0.28)', borderTop: 'none',
              borderRadius: '0 0 16px 16px', padding: '22px 24px',
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>OVERALL ADVANTAGE</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 24, color: '#00B4D8' }}>12 / 12</span>
                <span style={{ color: 'rgba(0,180,216,0.7)', fontSize: 13 }}>categories</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>0 / 12</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <SlashDivider color="#0A1172" flip/>
      <section style={{ padding: '80px 24px', background: '#0A1172' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(30px,5vw,48px)', color: '#fff', margin: '0 0 10px' }}>WHO WE SERVE</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>Precision Flowline solutions engineered for clients who demand results</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
            {clients.map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '30px 26px', background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20 }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 19, margin: '0 0 12px' }}>{c.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7, margin: '0 0 18px' }}>{c.d}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{ padding: '3px 10px', background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.22)', borderRadius: 100, color: '#48CAE4', fontSize: 11, fontWeight: 600 }}>{tag}</span>
                    ))}
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
            THE CHOICE IS <span style={{ color: '#00B4D8' }}>CLEAR</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, margin: '0 auto 36px', maxWidth: 520 }}>
            Stop overpaying for traditional methods that take longer and deliver less. Get a free site assessment today.
          </p>
          <Link to="/contact" style={{ display: 'inline-block', padding: '17px 42px', background: 'linear-gradient(135deg, #00B4D8, #48CAE4)', color: '#0A1172', borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,180,216,0.35)' }}>
            Get Your Free Assessment
          </Link>
        </section>
      </FadeIn>
    </main>
  )
}
