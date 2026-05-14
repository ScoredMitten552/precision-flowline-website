import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function RainDrop({ style }) {
  return (
    <div
      className="rain-drop"
      style={{
        position: 'absolute',
        width: 1.5,
        borderRadius: 2,
        background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.6))',
        ...style,
      }}
    />
  )
}

function HeroBackground() {
  const drops = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    height: `${Math.random() * 60 + 40}px`,
    animationDuration: `${Math.random() * 1.5 + 0.8}s`,
    animationDelay: `${Math.random() * 3}s`,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0A0F6B 0%, #070B52 40%, #051040 70%, #030820 100%)',
      }} />

      {/* Animated grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,180,216,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,216,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Rain drops */}
      {drops.map((d, i) => <RainDrop key={i} style={d} />)}

      {/* Ripple circles */}
      {[
        { bottom: '15%', left: '20%', size: 120, delay: '0s' },
        { bottom: '10%', left: '60%', size: 80, delay: '1.2s' },
        { bottom: '20%', left: '80%', size: 60, delay: '0.6s' },
        { bottom: '8%', left: '40%', size: 100, delay: '2s' },
      ].map((r, i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: r.bottom,
          left: r.left,
          width: r.size,
          height: r.size / 3,
        }}>
          {[0,1,2].map(j => (
            <div key={j} className="ripple-anim" style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(0,180,216,0.4)',
              animationDelay: `${parseFloat(r.delay) + j * 1.1}s`,
            }} />
          ))}
        </div>
      ))}

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, overflow: 'hidden' }}>
        <div className="wave-anim" style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: 140,
        }}>
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path
              d="M0,70 C240,120 480,20 720,70 C960,120 1200,20 1440,70 L1440,140 L0,140 Z"
              fill="rgba(0,180,216,0.12)"
            />
          </svg>
        </div>
        <div className="wave-anim-slow" style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: 100,
          animationDelay: '-4s',
        }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,100 L0,100 Z"
              fill="rgba(0,150,183,0.08)"
            />
          </svg>
        </div>
      </div>

      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}>
        <HeroBackground />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 860 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.4)',
              borderRadius: 100,
              padding: '8px 20px',
              marginBottom: 32,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00B4D8', boxShadow: '0 0 8px #00B4D8' }} />
            <span style={{ color: '#00B4D8', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
              PATENTED TECHNOLOGY • PROVEN RESULTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(52px, 8vw, 96px)',
              lineHeight: 0.95,
              margin: '0 0 24px',
              letterSpacing: -1,
            }}
          >
            <span style={{ color: 'white' }}>REVOLUTIONARY</span>
            <br />
            <span style={{ color: '#00B4D8' }}>PONDING</span>
            <br />
            <span style={{ color: 'white' }}>MITIGATION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.65,
              maxWidth: 620,
              margin: '0 auto 40px',
            }}
          >
            Precision Flowline's patented process eliminates ponding water from parking lots,
            commercial properties, and municipal infrastructure — in hours, not weeks.
            Trusted by engineers and property managers nationwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px',
              background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              color: '#0A0F6B',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 17,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,180,216,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,180,216,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,180,216,0.4)' }}
            >
              Get a Free Assessment →
            </Link>
            <Link to="/how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px',
              border: '2px solid rgba(255,255,255,0.25)',
              color: 'white',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 17,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,180,216,0.6)'; e.currentTarget.style.background = 'rgba(0,180,216,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent' }}
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{
              marginTop: 64,
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '98%', label: 'Success Rate' },
              { value: '55–85%', label: 'Cost Savings' },
              { value: 'Hours', label: 'Not Weeks' },
              { value: '50–75%', label: 'Traffic Savings' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: 34, color: '#00B4D8', lineHeight: 1,
                }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 1, marginTop: 4 }}>
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 2 }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 20, height: 30, border: '2px solid rgba(255,255,255,0.25)', borderRadius: 10, position: 'relative' }}
          >
            <div style={{
              position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
              width: 3, height: 6, background: '#00B4D8', borderRadius: 2,
            }} />
          </motion.div>
        </motion.div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.25)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)',
                color: 'white', margin: '0 0 16px', letterSpacing: -0.5,
              }}>
                PONDING WATER IS <span style={{ color: '#00B4D8' }}>COSTING YOU</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
                Every inch of standing water means liability, infrastructure damage, and costly traditional repairs that disrupt operations for weeks.
              </p>
            </div>
          </FadeInSection>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              { icon: '⚠️', title: 'Slip & Fall Liability', desc: 'Ponding water creates dangerous conditions and unlimited legal exposure for property owners.' },
              { icon: '🔧', title: 'Pavement Deterioration', desc: 'Water infiltration accelerates freeze-thaw cycles, pothole formation, and structural failure.' },
              { icon: '🚧', title: 'Disruptive Repairs', desc: 'Traditional milling and overlay closures last weeks, disrupting tenants, customers, and traffic.' },
              { icon: '💸', title: 'Excessive Costs', desc: 'Full-depth reclamation and overlay projects run 2–5x the cost of precision mitigation.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div style={{
                  padding: 28,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  height: '100%',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: 18, margin: '0 0 10px' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ color: '#00B4D8', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>OUR PATENTED 3-STEP PROCESS</div>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 'clamp(36px, 5vw, 52px)',
                color: 'white', margin: '0 0 16px',
              }}>
                PRECISION THAT WORKS
              </h2>
            </div>
          </FadeInSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Pilot Cuts', desc: 'Strategic precision cuts diagnose subsurface water pathways without full surface removal.' },
              { step: '02', title: 'Topography Alterations', desc: 'Calculated grade adjustments redirect water flow away from ponding zones using minimal material.' },
              { step: '03', title: 'Flow Testing', desc: 'Real-time water simulation verifies complete ponding elimination before project closure.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div style={{
                  padding: '36px 32px',
                  background: 'linear-gradient(135deg, rgba(0,180,216,0.08), rgba(0,180,216,0.02))',
                  border: '1px solid rgba(0,180,216,0.2)',
                  borderRadius: 20,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 80, color: 'rgba(0,180,216,0.08)',
                    position: 'absolute', top: -10, right: 20, lineHeight: 1,
                  }}>{item.step}</div>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 20, color: 'white',
                  }}>{item.step}</div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 22, margin: '0 0 12px' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/how-it-works" style={{
                display: 'inline-block',
                padding: '14px 32px',
                border: '2px solid rgba(0,180,216,0.5)',
                color: '#00B4D8',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
              }}>
                Deep Dive: Full Process Breakdown →
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(0,180,216,0.05))',
        borderTop: '1px solid rgba(0,180,216,0.2)',
        borderBottom: '1px solid rgba(0,180,216,0.2)',
      }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(36px, 5vw, 52px)',
              color: 'white', margin: '0 0 16px',
            }}>
              READY TO ELIMINATE PONDING?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, margin: '0 0 36px' }}>
              Our experts assess your site, identify problem zones, and deliver a no-obligation solution proposal — free.
            </p>
            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '18px 44px',
              background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              color: '#0A0F6B',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,180,216,0.35)',
            }}>
              Get Your Free Assessment Today
            </Link>
          </div>
        </FadeInSection>
      </section>
    </main>
  )
}
