import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Benefits', to: '/benefits' },
  { label: 'Why Us', to: '/why-precision-flowline' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(6, 10, 82, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,180,216,0.2)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2 14 Q5.5 9 11 14 Q16.5 19 20 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M2 9 Q5.5 4 11 9 Q16.5 14 20 9" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: 1,
                color: 'white',
                lineHeight: 1,
              }}>
                PRECISION
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 3,
                color: '#00B4D8',
                lineHeight: 1,
                marginTop: 1,
              }}>
                FLOWLINE
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 500,
                  color: location.pathname === link.to ? '#00B4D8' : 'rgba(255,255,255,0.85)',
                  background: location.pathname === link.to ? 'rgba(0,180,216,0.12)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              style={{
                textDecoration: 'none',
                padding: '10px 22px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                color: '#0A0F6B',
                background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                marginLeft: 8,
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(0,180,216,0.3)',
              }}
            >
              Free Assessment
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, display: 'none', flexDirection: 'column', gap: 5,
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: '#00B4D8', borderRadius: 2,
                transition: 'all 0.3s',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(6, 10, 82, 0.98)',
              borderTop: '1px solid rgba(0,180,216,0.2)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px 24px' }}>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    padding: '14px 0',
                    fontSize: 18,
                    fontWeight: 600,
                    color: location.pathname === link.to ? '#00B4D8' : 'white',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  marginTop: 20,
                  padding: '14px 0',
                  textAlign: 'center',
                  borderRadius: 8,
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#0A0F6B',
                  background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                }}
              >
                Get Free Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
