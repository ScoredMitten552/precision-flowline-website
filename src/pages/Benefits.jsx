import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

function AnimatedNumber({ target, suffix = '', prefix = '', duration = 2 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const isRange = typeof target === 'string' && target.includes('–')
      if (isRange) {
        setDisplay(target)
        return
      }
      const end = parseFloat(target)
      const startTime = performance.now()
      const step = (now) => {
        const elapsed = (now - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(eased * end * 10) / 10
        setDisplay(Number.isInteger(end) ? Math.round(current) : current)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{typeof display === 'string' ? display : display}{suffix}
    </span>
  )
}

export default function Benefits() {
  const mainStats = [
    {
      value: '55–85',
      display: '55–85%',
      suffix: '',
      label: 'Cost Savings vs. Traditional',
      sublabel: 'vs. full-depth reclamation',
      desc: 'Precision corrections use targeted material and minimal equipment — dramatically reducing cost per square foot.',
      icon: '💰',
      color: '#00B4D8',
    },
    {
      value: '98',
      display: null,
      suffix: '%',
      label: 'Project Success Rate',
      sublabel: 'verified by flow testing',
      desc: 'Every project is verified before closeout. If water still ponds, we\'re not done.',
      icon: '✅',
      color: '#48CAE4',
    },
    {
      value: 'Hours',
      display: 'Hours',
      suffix: '',
      label: 'Completion Time',
      sublabel: 'not weeks like traditional methods',
      desc: 'Most projects complete in a single shift — minimizing traffic disruption and business impact.',
      icon: '⚡',
      color: '#0096B7',
    },
    {
      value: '50–75',
      display: '50–75%',
      suffix: '',
      label: 'Traffic Control Savings',
      sublabel: 'vs. overlay and mill projects',
      desc: 'Shorter work windows mean fewer cones, fewer personnel, and far less exposure on active roadways.',
      icon: '🚦',
      color: '#00B4D8',
    },
  ]

  const additionalBenefits = [
    {
      title: 'Zero Infrastructure Loss',
      desc: 'We work within your existing pavement structure. No full-depth removal means no disposal costs and no replacement laydown.',
      icon: '🏗️',
    },
    {
      title: 'Regulatory Compliance Ready',
      desc: 'Full flow-test documentation supports ADA compliance, municipal stormwater permits, and property insurance requirements.',
      icon: '📋',
    },
    {
      title: 'Liability Risk Elimination',
      desc: 'Ponding water is a slip-and-fall liability. Our solutions permanently eliminate the water — and the risk.',
      icon: '⚖️',
    },
    {
      title: 'Minimal Business Disruption',
      desc: 'Short work windows keep your parking lot, road, or facility in near-continuous operation throughout the project.',
      icon: '🏢',
    },
    {
      title: 'Long-Term Pavement Life',
      desc: 'By eliminating water infiltration at the source, we extend pavement life by years — protecting your capital investment.',
      icon: '📈',
    },
    {
      title: 'Environmental Responsibility',
      desc: 'Less material removal means less landfill waste, lower carbon footprint, and cleaner job sites.',
      icon: '🌿',
    },
  ]

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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block', background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100,
              padding: '6px 18px', color: '#00B4D8', fontSize: 12, fontWeight: 700,
              letterSpacing: 2, marginBottom: 20,
            }}
          >
            THE NUMBERS DON'T LIE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(48px, 7vw, 80px)',
              color: 'white', margin: '0 0 20px', lineHeight: 0.95,
            }}
          >
            RESULTS THAT <span style={{ color: '#00B4D8' }}>SPEAK</span><br />FOR THEMSELVES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}
          >
            Dramatic cost reduction, faster completion, and a near-perfect success rate —
            backed by real-world data from hundreds of projects.
          </motion.p>
        </div>
      </section>

      {/* MAIN STATS */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {mainStats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: '40px 32px',
                  background: 'linear-gradient(135deg, rgba(0,180,216,0.1), rgba(0,180,216,0.02))',
                  border: `1px solid ${stat.color}33`,
                  borderRadius: 20,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{stat.icon}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(52px, 8vw, 72px)',
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {stat.display ? stat.display : (
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 17, marginBottom: 6 }}>
                    {stat.label}
                  </div>
                  <div style={{ color: stat.color, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
                    {stat.sublabel}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    {stat.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON BAR */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'white', textAlign: 'center', margin: '0 0 12px',
            }}>
              COST COMPARISON
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, textAlign: 'center', marginBottom: 48 }}>
              Per square foot, project for project
            </p>
          </FadeIn>
          {[
            { label: 'Precision Flowline', pct: 25, amount: '$2–4/sq ft', color: '#00B4D8' },
            { label: 'Surface Overlay', pct: 55, amount: '$5–8/sq ft', color: 'rgba(255,255,255,0.3)' },
            { label: 'Mill & Fill', pct: 70, amount: '$7–12/sq ft', color: 'rgba(255,255,255,0.2)' },
            { label: 'Full-Depth Reclamation', pct: 100, amount: '$12–20/sq ft', color: 'rgba(255,255,255,0.12)' },
          ].map((row, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: row.color === '#00B4D8' ? '#00B4D8' : 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 15 }}>
                    {row.label}
                  </span>
                  <span style={{ color: row.color === '#00B4D8' ? '#00B4D8' : 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 600 }}>
                    {row.amount}
                  </span>
                </div>
                <div style={{ height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: row.color,
                      borderRadius: 6,
                      boxShadow: row.color === '#00B4D8' ? '0 0 12px rgba(0,180,216,0.4)' : 'none',
                    }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ADDITIONAL BENEFITS */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)',
                color: 'white', margin: '0 0 12px',
              }}>
                BEYOND THE NUMBERS
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16 }}>
                Operational, legal, and environmental advantages that compound over time
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {additionalBenefits.map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  display: 'flex', gap: 20, padding: 28,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                }}>
                  <div style={{ fontSize: 32, flexShrink: 0, lineHeight: 1 }}>{b.icon}</div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: 17, margin: '0 0 8px' }}>{b.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
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
            SEE THESE SAVINGS <span style={{ color: '#00B4D8' }}>ON YOUR PROJECT</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, margin: '0 0 36px' }}>
            Contact us for a custom cost comparison for your specific site.
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
