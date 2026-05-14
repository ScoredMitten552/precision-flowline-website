import { Link } from 'react-router-dom'

/* ─── Water-slash SVG divider (top of footer) ─── */
function WaterSlashDivider() {
  return (
    <div className="water-slash" style={{ marginBottom: -2 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
        <defs>
          <linearGradient id="footerSlash" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#00B4D8" stopOpacity="0"/>
            <stop offset="30%"  stopColor="#00B4D8" stopOpacity="0.5"/>
            <stop offset="70%"  stopColor="#4A90D9" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#4A90D9" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Main diagonal cut */}
        <path d="M0 60 L1440 0 L1440 8 L0 68 Z" fill="url(#footerSlash)"/>
        {/* Accent wave */}
        <path d="M0 50 Q360 30 720 45 Q1080 60 1440 35 L1440 40 Q1080 65 720 50 Q360 35 0 55 Z"
          fill="rgba(0,180,216,0.12)"/>
      </svg>
    </div>
  )
}

export default function Footer() {
  return (
    <footer>
      <WaterSlashDivider />
      <div style={{ background: '#040840', paddingTop: 60, paddingBottom: 36, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 48, marginBottom: 52,
          }}>
            {/* BRAND */}
            <div>
              <div style={{ marginBottom: 18 }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 14px rgba(0,180,216,0.3)',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M6 18L18 6" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M3 15 Q6 11 12 15 Q18 19 21 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M3 10 Q6 6 12 10 Q18 14 21 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#00B4D8' }}>PRECISION</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: 1.5, color: '#fff', marginTop: -2 }}>FLOWLINE</div>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.8, margin: 0 }}>
                  A Division of PIM<br/>
                  <span style={{ color: 'rgba(0,180,216,0.7)', fontWeight: 600 }}>Precision Infrastructure Management</span>
                </p>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                Patented ponding mitigation trusted by municipalities, property managers, and civil contractors nationwide.
              </p>
              {/* Tagline */}
              <p style={{
                marginTop: 16, padding: '10px 0',
                borderTop: '1px solid rgba(0,180,216,0.15)',
                color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
                fontStyle: 'italic', lineHeight: 1.6,
              }}>
                "Restore Flow. Extend Pavement Life.<br/>Reduce Complaints."
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 18 }}>
                Services
              </h4>
              {['Ponding Water Assessment','Pilot Cuts','Topography Alteration','Flow Verification Testing','Municipal Road Solutions','Commercial Property Drainage'].map(s => (
                <div key={s} style={{ marginBottom: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{s}</span>
                </div>
              ))}
            </div>

            {/* NAVIGATION */}
            <div>
              <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 18 }}>
                Company
              </h4>
              {[
                { label: 'How It Works',            to: '/how-it-works' },
                { label: 'Benefits & Cost Savings', to: '/benefits' },
                { label: 'Why Precision Flowline',  to: '/why-precision-flowline' },
                { label: 'Free Assessment',         to: '/contact' },
              ].map(({ label, to }) => (
                <div key={to} style={{ marginBottom: 10 }}>
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}>
                    {label}
                  </Link>
                </div>
              ))}
            </div>

            {/* CONTACT */}
            <div>
              <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 18 }}>
                Contact
              </h4>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 2.2 }}>
                <div>info@precisionflowline.com</div>
                <div>1-800-FLOWLINE</div>
              </div>
              <Link to="/contact" style={{
                display: 'inline-block', marginTop: 18,
                padding: '11px 22px',
                background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                color: '#0A1172', borderRadius: 7,
                fontWeight: 800, fontSize: 13,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,180,216,0.25)',
              }}>
                Free Assessment →
              </Link>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, margin: 0 }}>
                © {new Date().getFullYear()} Precision Flowline | A Division of PIM — Precision Infrastructure Management. All rights reserved. Patented Technology.
              </p>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, margin: 0 }}>
              precisionflowline.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
