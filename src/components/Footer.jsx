import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#030720',
      borderTop: '1px solid rgba(0,180,216,0.15)',
      padding: '60px 24px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 26, color: 'white', letterSpacing: 1,
              }}>PRECISION</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: 15, color: '#00B4D8', letterSpacing: 4,
              }}>FLOWLINE</div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Fix Ponding. Reduce Risk. Protect Assets.<br />
              Patented ponding mitigation solutions trusted by municipalities and property managers nationwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Services</h4>
            {['Ponding Water Assessment', 'Topography Alteration', 'Flow Testing & Verification', 'Municipal Solutions', 'Commercial Properties'].map(s => (
              <div key={s} style={{ marginBottom: 10 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'default' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Company</h4>
            {[
              { label: 'How It Works', to: '/how-it-works' },
              { label: 'Benefits', to: '/benefits' },
              { label: 'Why Precision Flowline', to: '/why-precision-flowline' },
              { label: 'Get a Free Assessment', to: '/contact' },
            ].map(link => (
              <div key={link.to} style={{ marginBottom: 10 }}>
                <Link to={link.to} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none' }}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Contact</h4>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 2 }}>
              <div>info@precisionflowline.com</div>
              <div>1-800-FLOWLINE</div>
              <div style={{ marginTop: 12 }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                    color: '#0A0F6B',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Free Assessment →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: 0 }}>
            © {new Date().getFullYear()} Precision Flowline. All rights reserved. Patented Technology.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: 0 }}>
            precisionflowline.com
          </p>
        </div>
      </div>
    </footer>
  )
}
