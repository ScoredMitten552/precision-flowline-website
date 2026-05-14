import { useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const DrainageAnimation = lazy(() => import('../components/DrainageAnimation'))

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

const steps = [
  {
    n: '01', title: 'Pilot Cuts', color: '#00B4D8', icon: '🔬',
    sub: 'Precision Diagnosis Without Full Removal',
    desc: 'Our engineers make strategic, calculated pilot cuts into the existing pavement surface. These incisions expose subsurface conditions and water migration pathways — without requiring full-depth removal.',
    bullets: [
      'Minimal surface disruption — no full tear-out',
      'Reveals subsurface drainage failures and soil conditions',
      'Maps existing water pathways beneath pavement',
      'Confirms topographic model against field conditions',
      'Typically completed in hours, not days',
    ],
    quote: "Our pilot cuts are surgical. Each is placed based on topographic modeling to confirm our diagnosis before committing to a full correction plan.",
  },
  {
    n: '02', title: 'Topography Alterations', color: '#4A90D9', icon: '📐',
    sub: 'Sub-Inch Grade Corrections',
    desc: 'Using data from the pilot cuts and our proprietary topographic analysis, our crews implement precise grade alterations that redirect water flow away from ponding zones toward existing drainage infrastructure.',
    bullets: [
      'Sub-inch grade precision with laser-guided equipment',
      'Minimal material — targeted corrections only',
      'Preserves surrounding pavement integrity',
      'Works within existing drainage system capacity',
      'Traffic control reduced 50–75% vs. traditional methods',
    ],
    quote: "We don't rebuild what works — we correct what doesn't. The minimum necessary material for the maximum drainage improvement.",
  },
  {
    n: '03', title: 'Flow Testing', color: '#00B4D8', icon: '✅',
    sub: 'Real-Time Verification Before Closeout',
    desc: 'Before any project closes, our team conducts live flow testing simulating real rainfall conditions. Water is introduced to the corrected surface to verify all ponding zones have been eliminated.',
    bullets: [
      '100% of corrections field-verified before close',
      'Water simulation matches worst-case storm conditions',
      'Full documentation for regulatory compliance',
      'Client walkthrough included in every project',
      '98% of projects pass verification on first test',
    ],
    quote: "Flow testing is non-negotiable. We don't close a project until water behaves exactly as our model predicted.",
  },
]

export default function HowItWorks() {
  return (
    <main style={{ background: '#0A1172' }}>

      {/* PAGE HEADER */}
      <section style={{
        paddingTop: 120, paddingBottom: 80, padding: '120px 24px 80px',
        background: 'linear-gradient(160deg, #0A1172 0%, #060C5A 55%, #040840 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}/>
        {/* Diagonal slash accent */}
        <div style={{
          position: 'absolute', top: '55%', left: '-5%', right: '-5%', height: 3,
          background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.4), rgba(74,144,217,0.3), transparent)',
          transform: 'rotate(-5deg)',
        }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block', background: 'rgba(0,180,216,0.13)',
              border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100,
              padding: '6px 20px', color: '#00B4D8', fontSize: 11, fontWeight: 700,
              letterSpacing: 2.5, marginBottom: 22,
            }}>
            PATENTED 3-STEP PROCESS
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,7vw,84px)', color: '#fff', margin: '0 0 20px', lineHeight: 0.93 }}>
            HOW IT <span style={{ color: '#00B4D8' }}>WORKS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: 18, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Three precision steps. No guesswork. No unnecessary demolition.
            Targeted corrections that solve ponding — permanently.
          </motion.p>
        </div>
      </section>

      {/* ════════════════ 3D ANIMATION ════════════════ */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ color: '#4A90D9', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, marginBottom: 12 }}>INTERACTIVE 3D MODEL</div>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(28px,4vw,44px)', color: '#fff', margin: '0 0 12px' }}>
                SEE THE WATER <span style={{ color: '#00B4D8' }}>DRAIN AWAY</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, margin: 0 }}>
                Simulated parking lot surface · Camera orbits automatically · Press the button to trigger the Precision Flowline process
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Suspense fallback={<div style={{ height: 460, background: 'rgba(0,0,0,0.2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#00B4D8', fontSize: 14 }}>Loading 3D simulation…</span></div>}>
              <DrainageAnimation />
            </Suspense>
          </FadeIn>
        </div>
      </section>

      <SlashDivider color="#0A1172" flip/>

      {/* ════════════════ PROCESS STEPS ════════════════ */}
      <section style={{ padding: '80px 24px 60px', background: '#0A1172' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.08}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 56, alignItems: 'center',
                marginBottom: 96,
                direction: i % 2 === 1 ? 'rtl' : 'ltr',
              }} className="step-grid">

                {/* ── Visual card ── */}
                <div style={{ direction: 'ltr' }}>
                  <div style={{
                    position: 'relative', borderRadius: 22, overflow: 'hidden',
                    background: `linear-gradient(135deg, rgba(0,180,216,0.09), rgba(74,144,217,0.03))`,
                    border: `1px solid ${step.color}33`, padding: '44px 36px',
                    minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    {/* Large step ghost number */}
                    <div style={{
                      position: 'absolute', bottom: -18, right: 8,
                      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
                      fontSize: 130, color: `${step.color}08`, lineHeight: 1, userSelect: 'none',
                    }}>{step.n}</div>
                    <div>
                      <div style={{ fontSize: 44, marginBottom: 18 }}>{step.icon}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 46, color: step.color, lineHeight: 1, marginBottom: 6 }}>
                        {step.title}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{step.sub}</div>
                    </div>
                    <div style={{
                      marginTop: 28, padding: '16px 20px',
                      background: 'rgba(0,0,0,0.3)', borderRadius: 12,
                      borderLeft: `3px solid ${step.color}`,
                    }}>
                      <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 13, lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
                        "{step.quote}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Content ── */}
                <div style={{ direction: 'ltr' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 17, color: '#fff',
                    }}>{i + 1}</div>
                    <span style={{ color: step.color, fontWeight: 700, fontSize: 12, letterSpacing: 2.5 }}>STEP {step.n}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(30px,4vw,46px)', color: '#fff', margin: '0 0 16px', lineHeight: 1.05 }}>
                    {step.title.toUpperCase()}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 16, lineHeight: 1.78, margin: '0 0 28px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {step.bullets.map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                          background: `${step.color}18`, border: `2px solid ${step.color}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: step.color }}/>
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .step-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <SlashDivider color="rgba(0,180,216,0.1)"/>
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0,180,216,0.12), rgba(74,144,217,0.06))',
        borderTop: '1px solid rgba(0,180,216,0.2)',
      }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(30px,5vw,50px)', color: '#fff', margin: '0 0 16px' }}>
            READY TO RESTORE <span style={{ color: '#00B4D8' }}>FLOW?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 17, margin: '0 0 36px' }}>
            Start with a no-obligation assessment. Our engineers will map your ponding zones and deliver a proposal — free.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block', padding: '17px 42px',
            background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
            color: '#0A1172', borderRadius: 10,
            fontWeight: 800, fontSize: 17, textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,180,216,0.35)',
          }}>
            Get Your Free Assessment
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}
