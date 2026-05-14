import { useRef, useState, useEffect } from 'react'

/* ─── Placeholder scene: BEFORE (flooded) ─── */
function FloodedStreet() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a3e"/>
          <stop offset="100%" stopColor="#2d2d5e"/>
        </linearGradient>
        <linearGradient id="water1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d4a7a" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1e6f9f" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="road1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a28"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="800" height="420" fill="url(#sky1)"/>
      {/* Clouds */}
      <ellipse cx="150" cy="60" rx="90" ry="30" fill="#2a2a4a" opacity="0.7"/>
      <ellipse cx="500" cy="40" rx="120" ry="35" fill="#252545" opacity="0.8"/>
      <ellipse cx="700" cy="70" rx="80" ry="25" fill="#2a2a4a" opacity="0.6"/>
      {/* Buildings bg */}
      <rect x="0"   y="80" width="100" height="180" fill="#1a1a35" rx="2"/>
      <rect x="110" y="100" width="80" height="160" fill="#1e1e40" rx="2"/>
      <rect x="620" y="90" width="90" height="170" fill="#1a1a38" rx="2"/>
      <rect x="720" y="110" width="80" height="150" fill="#1e1e40" rx="2"/>
      {/* Building windows */}
      {[[20,100],[50,100],[20,130],[50,130],[20,160],[50,160],[130,120],[165,120],[130,150],[165,150]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="16" height="12" fill="#f5e642" opacity="0.6" rx="1"/>
      ))}
      {/* Road */}
      <rect x="0" y="200" width="800" height="220" fill="url(#road1)"/>
      {/* Road dashes (barely visible through water) */}
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x={60+i*150} y="292" width="80" height="5" fill="#fff" opacity="0.08" rx="2"/>
      ))}
      {/* Large flood water */}
      <ellipse cx="400" cy="310" rx="320" ry="80" fill="url(#water1)" opacity="0.85"/>
      <ellipse cx="200" cy="330" rx="180" ry="50" fill="#0a3d6e" opacity="0.7"/>
      <ellipse cx="650" cy="320" rx="140" ry="45" fill="#0e4a7a" opacity="0.65"/>
      {/* Water reflection shimmer */}
      <ellipse cx="400" cy="295" rx="200" ry="20" fill="#48CAE4" opacity="0.08"/>
      <ellipse cx="300" cy="310" rx="80" ry="8" fill="#48CAE4" opacity="0.12"/>
      {/* Rain streaks */}
      {Array.from({length:28},(_,i)=>(
        <line key={i}
          x1={20+i*28} y1={i%3===0?60:40}
          x2={12+i*28} y2={i%3===0?160:140}
          stroke="#4ab5e0" strokeWidth="1.2" opacity="0.35"
        />
      ))}
      {/* Flooded curb */}
      <rect x="0" y="196" width="800" height="8" fill="#111128" opacity="0.9"/>
      {/* Sidewalk */}
      <rect x="0" y="176" width="800" height="24" fill="#1e1e38"/>
      {/* Warning cone */}
      <polygon points="360,230 380,230 375,200 365,200" fill="#ff6b00" opacity="0.85"/>
      <rect x="355" y="228" width="30" height="5" fill="#ff6b00" opacity="0.7"/>
    </svg>
  )
}

function DrySt() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a4a"/>
          <stop offset="100%" stopColor="#2a3a5e"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#sky2)"/>
      <ellipse cx="150" cy="60" rx="90" ry="30" fill="#253050" opacity="0.5"/>
      <ellipse cx="500" cy="40" rx="120" ry="35" fill="#202d50" opacity="0.6"/>
      <rect x="0"   y="80" width="100" height="180" fill="#1a1a35" rx="2"/>
      <rect x="110" y="100" width="80" height="160" fill="#1e1e40" rx="2"/>
      <rect x="620" y="90" width="90" height="170" fill="#1a1a38" rx="2"/>
      <rect x="720" y="110" width="80" height="150" fill="#1e1e40" rx="2"/>
      {[[20,100],[50,100],[20,130],[50,130],[20,160],[50,160],[130,120],[165,120],[130,150],[165,150]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="16" height="12" fill="#f5e642" opacity="0.5" rx="1"/>
      ))}
      {/* Dry road */}
      <rect x="0" y="200" width="800" height="220" fill="#1e1e2e"/>
      {/* Center line dashes */}
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x={60+i*150} y="292" width="80" height="6" fill="#fff" opacity="0.6" rx="2"/>
      ))}
      {/* Flow channels (the precision cuts) */}
      {[-30,0,30].map((offset,i)=>(
        <line key={i} x1="0" y1={310+offset} x2="800" y2={310+offset}
          stroke="#00B4D8" strokeWidth="2.5" opacity="0.5" strokeDasharray="20,10"/>
      ))}
      {/* Sidewalk */}
      <rect x="0" y="176" width="800" height="24" fill="#252535"/>
      <rect x="0" y="196" width="800" height="8" fill="#1a1a28" opacity="0.9"/>
      {/* Precision Flowline marker */}
      <rect x="340" y="220" width="120" height="22" rx="3" fill="#00B4D8" opacity="0.15"/>
      <text x="400" y="235" textAnchor="middle" fill="#00B4D8" fontSize="10" fontWeight="700" letterSpacing="1" opacity="0.8">FLOW RESTORED</text>
    </svg>
  )
}

function FloodedLot() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lotbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111120"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </linearGradient>
        <linearGradient id="pond1" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#0e4a7a" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#1565a0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#0a3360" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#lotbg)"/>
      {/* Parking stall lines (faint under water) */}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={i} x1={80+i*100} y1="50" x2={80+i*100} y2="420" stroke="#fff" strokeWidth="1.5" opacity="0.08"/>
      ))}
      {/* Large central pond */}
      <ellipse cx="400" cy="220" rx="300" ry="140" fill="url(#pond1)" opacity="0.9"/>
      <ellipse cx="280" cy="200" rx="160" ry="70" fill="#0d4a7a" opacity="0.7"/>
      <ellipse cx="520" cy="240" rx="140" ry="60" fill="#0e5080" opacity="0.65"/>
      {/* Water shimmer */}
      <ellipse cx="350" cy="190" rx="100" ry="18" fill="#48CAE4" opacity="0.1"/>
      <ellipse cx="450" cy="230" rx="70" ry="12" fill="#48CAE4" opacity="0.08"/>
      {/* Rain */}
      {Array.from({length:30},(_,i)=>(
        <line key={i} x1={15+i*27} y1={i%2===0?0:20} x2={8+i*27} y2={i%2===0?90:110}
          stroke="#4ab5e0" strokeWidth="1" opacity="0.3"/>
      ))}
      {/* Vehicles partially visible */}
      <rect x="55"  y="60"  width="70" height="35" rx="4" fill="#2a2a50" opacity="0.8"/>
      <rect x="640" y="60"  width="70" height="35" rx="4" fill="#2a2a50" opacity="0.8"/>
      <rect x="55"  y="360" width="70" height="35" rx="4" fill="#2a2a50" opacity="0.8"/>
      <rect x="640" y="360" width="70" height="35" rx="4" fill="#2a2a50" opacity="0.8"/>
      {/* Warning sign */}
      <rect x="372" y="80" width="56" height="40" rx="4" fill="#ff6b00" opacity="0.85"/>
      <text x="400" y="98" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">FLOOD</text>
      <text x="400" y="112" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">RISK</text>
    </svg>
  )
}

function DryLot() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="420" fill="#1a1a2a"/>
      {/* Stall lines */}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={i} x1={80+i*100} y1="50" x2={80+i*100} y2="420" stroke="#fff" strokeWidth="1.8" opacity="0.55"/>
      ))}
      {/* Directional arrows */}
      <polygon points="400,180 385,220 395,215 395,260 405,260 405,215 415,220" fill="#fff" opacity="0.2"/>
      {/* Flow channels */}
      {[140,210,280].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="800" y2={y} stroke="#00B4D8" strokeWidth="2" opacity="0.4" strokeDasharray="30,15"/>
      ))}
      {/* Vehicles */}
      <rect x="55"  y="60"  width="70" height="35" rx="4" fill="#2a3060" opacity="0.9"/>
      <rect x="640" y="60"  width="70" height="35" rx="4" fill="#2a3060" opacity="0.9"/>
      <rect x="55"  y="360" width="70" height="35" rx="4" fill="#2a3060" opacity="0.9"/>
      <rect x="640" y="360" width="70" height="35" rx="4" fill="#2a3060" opacity="0.9"/>
      {/* Center badge */}
      <rect x="330" y="190" width="140" height="32" rx="4" fill="#00B4D8" opacity="0.18"/>
      <text x="400" y="211" textAnchor="middle" fill="#00B4D8" fontSize="11" fontWeight="800" letterSpacing="1.5">PONDING ELIMINATED</text>
    </svg>
  )
}

function FloodedPath() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pathbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10101e"/>
          <stop offset="100%" stopColor="#0c0c18"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#pathbg)"/>
      {/* Path surface */}
      <rect x="250" y="0" width="300" height="420" fill="#181828"/>
      <rect x="250" y="0" width="4" height="420" fill="#252535"/>
      <rect x="546" y="0" width="4" height="420" fill="#252535"/>
      {/* Accessibility symbol (partially submerged) */}
      <circle cx="400" cy="160" r="35" fill="none" stroke="#fff" strokeWidth="4" opacity="0.3"/>
      <circle cx="400" cy="135" r="9" fill="#fff" opacity="0.3"/>
      <path d="M400 148 L390 185 L408 185 M385 200 L400 185 L415 200" stroke="#fff" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Water flood */}
      <rect x="250" y="200" width="300" height="220" fill="#0d4a7a" opacity="0.85"/>
      <ellipse cx="400" cy="200" rx="150" ry="25" fill="#1565a0" opacity="0.6"/>
      {/* Water surface shimmer */}
      <ellipse cx="360" cy="210" rx="60" ry="8" fill="#48CAE4" opacity="0.12"/>
      {/* Rain */}
      {Array.from({length:22},(_,i)=>(
        <line key={i} x1={15+i*37} y1={i%3===0?0:25} x2={8+i*37} y2={i%3===0?100:125}
          stroke="#4ab5e0" strokeWidth="1.1" opacity="0.3"/>
      ))}
      {/* Warning tape */}
      <line x1="200" y1="200" x2="600" y2="200" stroke="#ff0" strokeWidth="3" strokeDasharray="20,10" opacity="0.6"/>
    </svg>
  )
}

function DryPath() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="420" fill="#101018"/>
      {/* Path */}
      <rect x="250" y="0" width="300" height="420" fill="#1e1e2e"/>
      <rect x="250" y="0" width="4"   height="420" fill="#2a2a3a"/>
      <rect x="546" y="0" width="4"   height="420" fill="#2a2a3a"/>
      {/* Accessibility symbol (clear) */}
      <circle cx="400" cy="160" r="35" fill="none" stroke="#fff" strokeWidth="4" opacity="0.7"/>
      <circle cx="400" cy="133" r="9" fill="#fff" opacity="0.7"/>
      <path d="M400 146 L390 183 L408 183 M385 198 L400 183 L415 198" stroke="#fff" strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round"/>
      {/* ADA compliance badge */}
      <rect x="338" y="240" width="124" height="28" rx="4" fill="#00B4D8" opacity="0.2"/>
      <text x="400" y="259" textAnchor="middle" fill="#00B4D8" fontSize="10" fontWeight="800" letterSpacing="1">ADA COMPLIANT</text>
      {/* Flow channels */}
      {[300,340,380].map((y,i)=>(
        <line key={i} x1="250" y1={y} x2="550" y2={y} stroke="#00B4D8" strokeWidth="1.5" opacity="0.35" strokeDasharray="20,10"/>
      ))}
    </svg>
  )
}

function FloodedIntersection() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="420" fill="#0d0d1a"/>
      {/* Road surfaces */}
      <rect x="0"   y="160" width="800" height="100" fill="#181828"/>
      <rect x="340" y="0"   width="120" height="420" fill="#181828"/>
      {/* Flood covering intersection */}
      <ellipse cx="400" cy="210" rx="220" ry="90" fill="#0e4a7a" opacity="0.88"/>
      <ellipse cx="400" cy="210" rx="130" ry="50" fill="#1565a0" opacity="0.7"/>
      {/* Water shimmer */}
      <ellipse cx="370" cy="200" rx="70" ry="12" fill="#48CAE4" opacity="0.1"/>
      {/* Traffic lights */}
      <rect x="335" y="100" width="16" height="48" rx="3" fill="#1a1a30"/>
      <circle cx="343" cy="110" r="5" fill="#ff4444" opacity="0.9"/>
      <circle cx="343" cy="124" r="5" fill="#333"/>
      <circle cx="343" cy="138" r="5" fill="#333"/>
      <rect x="450" y="100" width="16" height="48" rx="3" fill="#1a1a30"/>
      <circle cx="458" cy="110" r="5" fill="#ff4444" opacity="0.9"/>
      <circle cx="458" cy="124" r="5" fill="#333"/>
      <circle cx="458" cy="138" r="5" fill="#333"/>
      {/* Stripes under water */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={360+i*22} y="175" width="12" height="50" fill="#fff" opacity="0.06" rx="1"/>
      ))}
      {/* Rain */}
      {Array.from({length:25},(_,i)=>(
        <line key={i} x1={10+i*32} y1={i%3===0?0:15} x2={3+i*32} y2={i%3===0?100:115}
          stroke="#4ab5e0" strokeWidth="1.1" opacity="0.3"/>
      ))}
    </svg>
  )
}

function DryIntersection() {
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="420" fill="#0d0d1a"/>
      {/* Road surfaces */}
      <rect x="0"   y="160" width="800" height="100" fill="#1e1e2e"/>
      <rect x="340" y="0"   width="120" height="420" fill="#1e1e2e"/>
      {/* Crosswalk stripes */}
      {[0,1,2,3].map(i=>(
        <rect key={i} x={360+i*22} y="175" width="12" height="50" fill="#fff" opacity="0.55" rx="1"/>
      ))}
      {/* Flow channels */}
      {[170,210,250].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="800" y2={y} stroke="#00B4D8" strokeWidth="1.8" opacity="0.4" strokeDasharray="24,12"/>
      ))}
      {/* Traffic lights (green) */}
      <rect x="335" y="100" width="16" height="48" rx="3" fill="#1a1a30"/>
      <circle cx="343" cy="110" r="5" fill="#333"/>
      <circle cx="343" cy="124" r="5" fill="#333"/>
      <circle cx="343" cy="138" r="5" fill="#00cc44" opacity="0.95"/>
      <rect x="450" y="100" width="16" height="48" rx="3" fill="#1a1a30"/>
      <circle cx="458" cy="110" r="5" fill="#333"/>
      <circle cx="458" cy="124" r="5" fill="#333"/>
      <circle cx="458" cy="138" r="5" fill="#00cc44" opacity="0.95"/>
      {/* Badge */}
      <rect x="340" y="225" width="120" height="26" rx="4" fill="#00B4D8" opacity="0.2"/>
      <text x="400" y="242" textAnchor="middle" fill="#00B4D8" fontSize="10" fontWeight="800" letterSpacing="1">FLOW RESTORED</text>
    </svg>
  )
}

/* ─── Core slider component ─── */
export default function BeforeAfterSlider({ beforeScene, afterScene, title }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef()
  const dragging = useRef(false)

  const move = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }

  useEffect(() => {
    const up = () => { dragging.current = false }
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up) }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {title && (
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
          {title}
        </p>
      )}
      <div
        ref={containerRef}
        onMouseDown={() => { dragging.current = true }}
        onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
        onTouchStart={() => { dragging.current = true }}
        onTouchMove={(e) => { move(e.touches[0].clientX) }}
        style={{
          position: 'relative', width: '100%', height: 260,
          overflow: 'hidden', borderRadius: 14, cursor: 'ew-resize',
          userSelect: 'none', WebkitUserSelect: 'none',
          border: '1px solid rgba(0,180,216,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* AFTER (full, behind) */}
        <div style={{ position: 'absolute', inset: 0 }}>{afterScene}</div>

        {/* BEFORE (clipped left portion) */}
        <div style={{
          position: 'absolute', inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: dragging.current ? 'none' : 'clip-path 0.05s',
        }}>{beforeScene}</div>

        {/* Divider line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${pos}%`, width: 2,
          background: 'rgba(255,255,255,0.9)',
          transform: 'translateX(-50%)',
          zIndex: 10,
          boxShadow: '0 0 8px rgba(0,180,216,0.5)',
        }}/>

        {/* Handle */}
        <div
          className="slider-handle"
          style={{
            position: 'absolute',
            top: '50%', left: `${pos}%`,
            transform: 'translate(-50%, -50%)',
            width: 46, height: 46, borderRadius: '50%',
            background: 'white',
            zIndex: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'ew-resize',
            boxShadow: '0 0 0 3px rgba(0,180,216,0.5), 0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 5L3 11L8 17" stroke="#0A1172" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 5L19 11L14 17" stroke="#0A1172" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* BEFORE label */}
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 12,
          background: 'rgba(185, 28, 28, 0.92)',
          color: 'white', fontSize: 10, fontWeight: 900,
          letterSpacing: 2, padding: '4px 11px',
          borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)',
        }}>BEFORE</div>

        {/* AFTER label */}
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 12,
          background: 'rgba(0,180,216,0.92)',
          color: '#0A1172', fontSize: 10, fontWeight: 900,
          letterSpacing: 2, padding: '4px 11px',
          borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)',
        }}>AFTER</div>
      </div>
    </div>
  )
}

/* ─── Export preset sliders ─── */
export const sliders = [
  { title: 'Residential Street Flooding', before: <FloodedStreet/>, after: <DrySt/> },
  { title: 'Commercial Parking Lot Ponding', before: <FloodedLot/>, after: <DryLot/> },
  { title: 'ADA Accessible Route Blocked', before: <FloodedPath/>, after: <DryPath/> },
  { title: 'Intersection Flooding', before: <FloodedIntersection/>, after: <DryIntersection/> },
]
