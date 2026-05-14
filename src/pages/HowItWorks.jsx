import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 40 : 0, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 },
    visible: { opacity: 1, y: 0, x: 0 },
  }
  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Pilot Cuts',
      subtitle: 'Precision Diagnosis Without Full Removal',
      icon: '🔬',
      color: '#00B4D8',
      desc: `Our engineers begin by making strategic, calculated pilot cuts into the existing pavement surface. These precision incisions expose subsurface conditions and water migration pathways without requiring full-depth removal of your existing infrastructure.`,
      bullets: [
        'Minimal surface disruption — no full tear-out required',
        'Reveals subsurface drainage failures and soil conditions',
        'Maps existing water pathways beneath the pavement',
        'Confirms our topographic model and corrects for field conditions',
        'Typically completed in hours, not days',
      ],
      detail: 'Unlike traditional milling that removes the entire surface blindly, our pilot cuts are surgical. Each cut is placed based on topographic modeling to confirm our diagnosis before committing to a full correction plan.',
    },
    {
      number: '02',
      title: 'Topography Alterations',
      subtitle: 'Calculated Grade Corrections',
      icon: '📐',
      color: '#48CAE4',
      desc: `Using data gathered from the pilot cuts and our proprietary topographic analysis, our crews implement precise grade alterations that redirect water flow away from ponding zones toward existing drainage infrastructure.`,
      bullets: [
        'Sub-inch grade precision using laser-guided equipment',
        'Minimal material usage — targeted corrections only',
        'Preserves surrounding pavement integrity',
        'Works within existing drainage system capacity',
        'Traffic control time reduced by 50–75% vs. traditional methods',
      ],
      detail: "Our patented process uses the minimum necessary material to achieve the maximum drainage improvement. We don't rebuild what works — we correct what doesn't.",
    },
    {
      number: '03',
      title: 'Flow Testing',
      subtitle: 'Real-Time Verification Before Closeout',
      icon: '✅',
      color: '#0096B7',
      desc: `Before any project is closed out, our team conducts live flow testing that simulates real rainfall conditions. Water is introduced to the corrected surface to verify that all ponding zones have been eliminated and drainage paths are functioning as designed.`,
      bullets: [
        '100% of corrections are field-verified before project close',
        'Water simulation matches worst-case storm conditions',
        'Documentation provided for regulatory compliance',
        'Client walkthrough included in every project',
        '98% of projects pass verification on first test',
      ],
      detail: 'Flow testing is non-negotiable. We don\'t close a project until water behaves exactly as our model predicted. This is why our success rate is 98% — we don\'t leave until it\'s right.',
    },
  ]

  return (
    <main>
      {/* PAGE HEADER */}
      <section style={{
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        background: 'linear-gradient(160deg, #0A0F6B 0%, #070B52 60%, #051040 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block',
              background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.35)',
              borderRadius: 100,
              padding: '6px 18px',
              color: '#00B4D8',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            PATENTED 3-STEP PROCESS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(48px, 7vw, 80px)',
              color: 'white',
              margin: '0 0 20px',
              lineHeight: 0.95,
            }}
          >
            HOW IT <span style={{ color: '#00B4D8' }}>WORKS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.65, maxWidth: 580, margin: '0 auto' }}
          >
            Three precision steps. No guesswork. No unnecessary demolition.
            Just targeted corrections that solve ponding — permanently.
          </motion.p>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.1}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 60,
                alignItems: 'center',
                marginBottom: 100,
                direction: i % 2 === 1 ? 'rtl' : 'ltr',
              }}
              className="process-grid"
              >
                {/* Visual */}
                <div style={{ direction: 'ltr' }}>
                  <div style={{
                    position: 'relative',
                    background: `linear-gradient(135deg, rgba(0,180,216,0.1), rgba(0,180,216,0.03))`,
                    border: `1px solid rgba(0,180,216,0.25)`,
                    borderRadius: 24,
                    padding: '48px 40px',
                    overflow: 'hidden',
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900, fontSize: 120, color: 'rgba(0,180,216,0.07)',
                      position: 'absolute', bottom: -20, right: 10, lineHeight: 1,
                      userSelect: 'none',
                    }}>{step.number}</div>

                    <div>
                      <div style={{ fontSize: 48, marginBottom: 20 }}>{step.icon}</div>
                      <div style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900, fontSize: 48, color: step.color, lineHeight: 1,
                        marginBottom: 4,
                      }}>{step.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{step.subtitle}</div>
                    </div>

                    <div style={{
                      marginTop: 32,
                      padding: '16px 20px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: 12,
                      borderLeft: `3px solid ${step.color}`,
                    }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                        "{step.detail}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ direction: 'ltr' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    marginBottom: 20,
                  }}>
                    <div style={{
                      width: 36, height: 36,
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                      borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900, fontSize: 18, color: 'white',
                    }}>{i + 1}</div>
                    <span style={{ color: step.color, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
                      STEP {step.number}
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(32px, 4vw, 46px)',
                    color: 'white',
                    margin: '0 0 16px',
                    lineHeight: 1.05,
                  }}>{step.title.toUpperCase()}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.75, margin: '0 0 28px' }}>
                    {step.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {step.bullets.map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: `${step.color}22`,
                          border: `2px solid ${step.color}`,
                          flexShrink: 0, marginTop: 1,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: step.color }} />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.5 }}>{b}</span>
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
            .process-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          }
        `}</style>
      </section>

      {/* WHY PATENTED */}
      <FadeIn>
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(0,180,216,0.12), rgba(0,180,216,0.04))',
          borderTop: '1px solid rgba(0,180,216,0.2)',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(32px, 5vw, 52px)',
              color: 'white', margin: '0 0 20px',
            }}>
              WHY PATENT PROTECTION <span style={{ color: '#00B4D8' }}>MATTERS</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.75, maxWidth: 680, margin: '0 auto 40px' }}>
              Our process isn't just effective — it's protected. The Precision Flowline methodology is the result of years of engineering research and real-world validation. Imitations can't replicate the precision, and the results show it.
            </p>
            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              color: '#0A0F6B',
              borderRadius: 10,
              fontWeight: 800, fontSize: 16,
              textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(0,180,216,0.35)',
            }}>
              Start With a Free Assessment
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  )
}
