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

const comparisonRows = [
  { category: 'Project Duration', pf: 'Hours to 1 day', traditional: '1–4 weeks', advantage: true },
  { category: 'Cost per Sq Ft', pf: '$2–4', traditional: '$12–20', advantage: true },
  { category: 'Traffic Control Duration', pf: 'Hours', traditional: 'Days to weeks', advantage: true },
  { category: 'Pavement Removed', pf: 'Minimal (pilot cuts only)', traditional: 'Full surface or full depth', advantage: true },
  { category: 'Disposal Required', pf: 'Minimal to none', traditional: 'Extensive haul-off', advantage: true },
  { category: 'Success Verification', pf: 'Live flow testing on every project', traditional: 'Visual inspection only', advantage: true },
  { category: 'Success Rate', pf: '98%', traditional: 'Varies widely (no standard)', advantage: true },
  { category: 'Disruption to Operations', pf: 'Minimal — short closures', traditional: 'Major disruption for weeks', advantage: true },
  { category: 'Material Usage', pf: 'Targeted, precision only', traditional: 'Full-surface replacement', advantage: true },
  { category: 'Warranty / Verification', pf: 'Flow-test documentation included', traditional: 'Rarely provided', advantage: true },
  { category: 'Environmental Impact', pf: 'Low waste, low footprint', traditional: 'High material waste', advantage: true },
  { category: 'Regulatory Documentation', pf: 'Full package provided', traditional: 'Limited documentation', advantage: true },
]

export default function WhyPF() {
  return (
    <main>
      {/* HEADER */}
      <section style={{
        paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
        background: 'linear-gradient(160deg, #0A0F6B 0%, #070B52 60%, #051040 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block', background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100,
              padding: '6px 18px', color: '#00B4D8', fontSize: 12, fontWeight: 700,
              letterSpacing: 2, marginBottom: 20,
            }}
          >
            HEAD-TO-HEAD COMPARISON
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(48px, 7vw, 80px)',
              color: 'white', margin: '0 0 20px', lineHeight: 0.95,
            }}
          >
            WHY <span style={{ color: '#00B4D8' }}>PRECISION</span><br />FLOWLINE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.65, maxWidth: 600, margin: '0 auto' }}
          >
            Twelve categories. Twelve wins. See exactly how Precision Flowline stacks up
            against traditional ponding mitigation methods.
          </motion.p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Table header */}
          <FadeIn>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 0,
              background: 'rgba(0,180,216,0.08)',
              border: '1px solid rgba(0,180,216,0.25)',
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '20px 24px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
                CATEGORY
              </div>
              <div style={{
                padding: '20px 24px',
                background: 'rgba(0,180,216,0.2)',
                borderLeft: '1px solid rgba(0,180,216,0.3)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7 Q3.5 4 7 7 Q10.5 10 12 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M2 4 Q3.5 1 7 4 Q10.5 7 12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
                  </svg>
                </div>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 15 }}>Precision Flowline</span>
              </div>
              <div style={{
                padding: '20px 24px',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 700, fontSize: 15 }}>Traditional Methods</span>
              </div>
            </div>
          </FadeIn>

          {/* Table rows */}
          {comparisonRows.map((row, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 0,
                borderLeft: '1px solid rgba(0,180,216,0.15)',
                borderRight: '1px solid rgba(0,180,216,0.15)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'transparent',
              }}>
                <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }}>{row.category}</span>
                </div>
                <div style={{
                  padding: '18px 24px',
                  background: 'rgba(0,180,216,0.05)',
                  borderLeft: '1px solid rgba(0,180,216,0.15)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(0,180,216,0.15)',
                    border: '1.5px solid #00B4D8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00B4D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ color: '#00B4D8', fontSize: 14, fontWeight: 600 }}>{row.pf}</span>
                </div>
                <div style={{
                  padding: '18px 24px',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(255,100,100,0.1)',
                    border: '1.5px solid rgba(255,100,100,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 1L7 7M7 1L1 7" stroke="rgba(255,100,100,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>{row.traditional}</span>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Table footer */}
          <FadeIn>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(0,180,216,0.05))',
              border: '1px solid rgba(0,180,216,0.3)',
              borderTop: 'none',
              borderRadius: '0 0 16px 16px',
              padding: '24px 24px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                  OVERALL ADVANTAGE
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: 22, color: '#00B4D8',
                }}>12 / 12</span>
                <span style={{ color: 'rgba(0,180,216,0.7)', fontSize: 13 }}>Categories</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>0 / 12</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .comparison-grid { font-size: 12px !important; }
          }
        `}</style>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)',
                color: 'white', margin: '0 0 12px',
              }}>WHO WE SERVE</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16 }}>
                Precision Flowline solutions are engineered for clients who demand results
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                icon: '🏛️',
                title: 'Municipal Engineers',
                desc: 'Road departments, DOT agencies, and city infrastructure teams benefit from reduced traffic control costs, faster project closeout, and verified flow documentation for compliance.',
                tags: ['DOT Projects', 'Roadway Ponding', 'Municipal ROW'],
              },
              {
                icon: '🏢',
                title: 'Property Managers',
                desc: 'Commercial and retail property managers eliminate parking lot liability, reduce tenant complaints, and protect pavement assets — at a fraction of traditional overlay costs.',
                tags: ['Parking Lots', 'Retail Centers', 'Commercial Complexes'],
              },
              {
                icon: '🏗️',
                title: 'General Contractors',
                desc: 'GCs and civil contractors use Precision Flowline as a high-value subcontractor — delivering superior drainage results without the schedule impact of traditional methods.',
                tags: ['Subcontractor Work', 'Site Development', 'Grading & Drainage'],
              },
              {
                icon: '🏭',
                title: 'Industrial Facilities',
                desc: 'Warehouses, distribution centers, and industrial campuses can\'t afford weeks-long closures. Our single-day solutions keep operations running.',
                tags: ['Warehouses', 'Loading Docks', 'Industrial Sites'],
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: '32px 28px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  height: '100%',
                }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 20, margin: '0 0 12px' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, margin: '0 0 20px' }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '4px 12px',
                        background: 'rgba(0,180,216,0.1)',
                        border: '1px solid rgba(0,180,216,0.25)',
                        borderRadius: 100,
                        color: '#48CAE4', fontSize: 12, fontWeight: 600,
                      }}>{tag}</span>
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
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(0,180,216,0.12), rgba(0,180,216,0.04))',
          borderTop: '1px solid rgba(0,180,216,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: 'clamp(32px, 5vw, 52px)',
            color: 'white', margin: '0 0 16px',
          }}>
            THE CHOICE IS <span style={{ color: '#00B4D8' }}>CLEAR</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, margin: '0 0 36px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Stop overpaying for traditional methods that take longer and deliver less.
            Get a free site assessment today.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block',
            padding: '18px 44px',
            background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
            color: '#0A0F6B', borderRadius: 10,
            fontWeight: 800, fontSize: 18,
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,180,216,0.35)',
          }}>
            Get Your Free Assessment
          </Link>
        </section>
      </FadeIn>
    </main>
  )
}
