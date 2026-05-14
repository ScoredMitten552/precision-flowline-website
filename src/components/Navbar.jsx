import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'How It Works',  to: '/how-it-works' },
  { label: 'Benefits',      to: '/benefits' },
  { label: 'Why Us',        to: '/why-precision-flowline' },
]

/* ─── Logo mark ─── */
function LogoMark({ size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.22),
      background: 'linear-gradient(135deg, #00B4D8 0%, #0096B7 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 0 18px rgba(0,180,216,0.35)',
    }}>
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
        {/* Diagonal slash */}
        <path d="M6 18L18 6" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
        {/* Water waves */}
        <path d="M3 15 Q6 11 12 15 Q18 19 21 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M3 10 Q6 6 12 10 Q18 14 21 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.65"/>
      </svg>
    </div>
  )
}

/* ─── Word mark ─── */
function LogoWord({ stacked = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: stacked ? 11 : 12,
        letterSpacing: stacked ? 3 : 3.5,
        color: '#00B4D8',
        textTransform: 'uppercase',
      }}>PRECISION</span>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: stacked ? 22 : 24,
        letterSpacing: 1.5,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        marginTop: -1,
      }}>FLOWLINE</span>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'all 0.35s ease',
      background: scrolled ? 'rgba(6, 10, 90, 0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,180,216,0.18)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74 }}>

          {/* LOGO */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <LogoMark size={42} />
            <LogoWord />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map(({ label, to }) => (
              <Link key={to} to={to} style={{
                textDecoration: 'none',
                padding: '9px 18px',
                borderRadius: 7,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.3,
                color: loc.pathname === to ? '#00B4D8' : 'rgba(255,255,255,0.8)',
                background: loc.pathname === to ? 'rgba(0,180,216,0.1)' : 'transparent',
                border: loc.pathname === to ? '1px solid rgba(0,180,216,0.25)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
                {label}
              </Link>
            ))}
            <Link to="/contact" style={{
              textDecoration: 'none',
              marginLeft: 12,
              padding: '10px 24px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
              color: '#0A1172',
              background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              boxShadow: '0 4px 16px rgba(0,180,216,0.35)',
              letterSpacing: 0.3,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,180,216,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,180,216,0.35)'; e.currentTarget.style.transform = 'none' }}
            >
              Free Assessment
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(v => !v)}
            className="nav-mobile"
            style={{
              background: 'none', border: '1px solid rgba(0,180,216,0.3)',
              borderRadius: 8, padding: '8px 10px',
              cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: '#00B4D8', borderRadius: 2,
                transition: 'all 0.3s',
                transform: open
                  ? i === 1 ? 'scaleX(0)' : i === 0 ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
              }}/>
            ))}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(6,10,90,0.98)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(0,180,216,0.15)' }}
          >
            <div style={{ padding: '16px 24px 24px' }}>
              {[...NAV, { label: 'Contact', to: '/contact' }].map(({ label, to }) => (
                <Link key={to} to={to} style={{
                  display: 'block', textDecoration: 'none',
                  padding: '14px 0',
                  fontSize: 18, fontWeight: 700,
                  color: loc.pathname === to ? '#00B4D8' : 'white',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                  {label}
                </Link>
              ))}
              <Link to="/contact" style={{
                display: 'block', textDecoration: 'none',
                marginTop: 20, padding: '15px 0', textAlign: 'center',
                borderRadius: 8, fontSize: 17, fontWeight: 800,
                color: '#0A1172',
                background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
              }}>
                Get Free Assessment →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
