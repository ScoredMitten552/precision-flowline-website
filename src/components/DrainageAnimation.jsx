import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/* ─── Mobile CSS fallback ─── */
function MobileFallback() {
  const [phase, setPhase] = useState('pool') // pool | cutting | drain | done

  const trigger = () => {
    if (phase !== 'pool') return
    setPhase('cutting')
    setTimeout(() => setPhase('drain'), 1800)
    setTimeout(() => setPhase('done'), 4500)
  }

  return (
    <div style={{
      background: 'linear-gradient(160deg, #060C5A, #0A1172)',
      borderRadius: 16,
      padding: '40px 24px 32px',
      textAlign: 'center',
      border: '1px solid rgba(0,180,216,0.2)',
      minHeight: 380,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
    }}>
      <div style={{ color: '#00B4D8', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
        CROSS-SECTION VIEW
      </div>

      {/* Road cross-section */}
      <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>
        {/* Road surface */}
        <div style={{
          height: 18, background: 'linear-gradient(180deg, #2a2a40, #1a1a2e)',
          borderRadius: '4px 4px 0 0',
          border: '1px solid rgba(255,255,255,0.1)',
          borderBottom: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Cut lines on road */}
          {phase !== 'pool' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 2, height: '100%',
                  background: '#00B4D8',
                  boxShadow: '0 0 8px #00B4D8',
                  animation: 'cutAppear 0.4s ease-out forwards',
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0,
                }}/>
              ))}
            </div>
          )}
        </div>

        {/* Water layer on top */}
        <div style={{
          height: 50,
          background: phase === 'drain' || phase === 'done'
            ? 'transparent'
            : 'linear-gradient(180deg, rgba(0,100,160,0.6), rgba(0,70,120,0.9))',
          border: phase === 'drain' || phase === 'done' ? 'none' : '1px solid rgba(0,180,216,0.3)',
          borderBottom: 'none',
          borderTop: 'none',
          position: 'relative',
          transition: 'all 0.8s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: -1,
        }}>
          {(phase === 'pool' || phase === 'cutting') && (
            <span style={{ color: '#48CAE4', fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8 }}>
              STANDING WATER
            </span>
          )}
          {phase === 'drain' && (
            <div style={{ display: 'flex', gap: 20 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 3, background: 'linear-gradient(180deg, #00B4D8, transparent)',
                  height: 40,
                  animation: 'waterDrop 0.8s linear infinite',
                  animationDelay: `${i * 0.25}s`,
                  borderRadius: 2,
                }}/>
              ))}
            </div>
          )}
          {phase === 'done' && (
            <span style={{ color: '#00B4D8', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>✓ CLEAR</span>
          )}
        </div>

        {/* Sub-base */}
        <div style={{
          height: 32,
          background: 'linear-gradient(180deg, #1a1820, #141220)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        }}>
          {/* Drain outlets */}
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 12, height: 16, borderRadius: '0 0 6px 6px',
              background: phase === 'drain' || phase === 'done'
                ? 'linear-gradient(180deg, #00B4D8, #0096B7)'
                : 'rgba(255,255,255,0.1)',
              boxShadow: (phase === 'drain' || phase === 'done') ? '0 0 8px rgba(0,180,216,0.6)' : 'none',
              transition: 'all 0.4s',
            }}/>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { color: '#2a3a6a', label: 'Road Surface' },
          { color: '#0d4a7a', label: 'Standing Water', hide: phase === 'done' },
          { color: '#00B4D8', label: 'Pilot Cuts', show: phase !== 'pool' },
          { color: '#00B4D8', label: 'Drainage Flow', show: phase === 'drain' || phase === 'done' },
        ].filter(l => !l.hide && (l.show === undefined || l.show)).map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color, flexShrink: 0 }}/>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{item.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={trigger}
        disabled={phase !== 'pool'}
        style={{
          padding: '13px 32px',
          background: phase === 'done'
            ? 'rgba(0,180,216,0.15)'
            : phase !== 'pool'
            ? 'rgba(0,180,216,0.2)'
            : 'linear-gradient(135deg, #00B4D8, #48CAE4)',
          border: phase !== 'pool' ? '1px solid rgba(0,180,216,0.4)' : 'none',
          borderRadius: 8,
          color: phase !== 'pool' ? '#00B4D8' : '#0A1172',
          fontWeight: 800, fontSize: 15,
          cursor: phase === 'pool' ? 'pointer' : 'default',
          transition: 'all 0.3s',
        }}
      >
        {phase === 'pool'    ? '▶ Watch the Water Drain'   : ''}
        {phase === 'cutting' ? '⚡ Precision Cuts Active...'  : ''}
        {phase === 'drain'   ? '💧 Draining...'             : ''}
        {phase === 'done'    ? '✓ Ponding Eliminated'       : ''}
      </button>
    </div>
  )
}

/* ─── Three.js scene ─── */
export default function DrainageAnimation() {
  const mountRef = useRef()
  const phaseRef = useRef('pool')
  const [phase, setPhase] = useState('pool')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) { setIsMobile(true); return }

    const container = mountRef.current
    if (!container) return
    const W = container.clientWidth
    const H = Math.min(520, Math.max(400, W * 0.55))

    /* ── Scene ── */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0A1172)
    scene.fog = new THREE.Fog(0x060C5A, 20, 35)

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100)
    camera.position.set(10, 8, 13)
    camera.lookAt(0, 0, 0)

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x4A90D9, 0.5))
    const sun = new THREE.DirectionalLight(0xffffff, 1.2)
    sun.position.set(8, 14, 6)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.near = 0.5
    sun.shadow.camera.far = 50
    sun.shadow.camera.left = -12
    sun.shadow.camera.right = 12
    sun.shadow.camera.top = 10
    sun.shadow.camera.bottom = -10
    scene.add(sun)
    const fillLight = new THREE.DirectionalLight(0x00B4D8, 0.3)
    fillLight.position.set(-6, 4, -4)
    scene.add(fillLight)

    /* ── Road ── */
    const roadGeo = new THREE.PlaneGeometry(14, 10)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1c1c2c, roughness: 0.85, metalness: 0.05 })
    const road = new THREE.Mesh(roadGeo, roadMat)
    road.rotation.x = -Math.PI / 2
    road.receiveShadow = true
    scene.add(road)

    /* ── Road markings (center dashes) ── */
    const markMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 })
    for (let z = -4; z <= 4; z += 2.5) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 1.2), markMat)
      m.rotation.x = -Math.PI / 2
      m.position.set(0, 0.005, z)
      scene.add(m)
    }

    /* ── Raised curbs ── */
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x252535, roughness: 0.9 })
    const makeEdge = (x) => {
      const e = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 10), curbMat)
      e.position.set(x, 0.12, 0)
      e.castShadow = true
      scene.add(e)
    }
    makeEdge(-7.2)
    makeEdge(7.2)

    /* ── Parking stall lines ── */
    const stallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
    for (let x = -6; x <= 6; x += 2) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 8), stallMat)
      s.rotation.x = -Math.PI / 2
      s.position.set(x, 0.005, 0)
      s.material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, opacity: 0.25, transparent: true })
      scene.add(s)
    }

    /* ── Standing water plane ── */
    const waterPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(13.5, 9.5),
      new THREE.MeshStandardMaterial({
        color: 0x1565a0,
        transparent: true,
        opacity: 0.62,
        roughness: 0.05,
        metalness: 0.4,
      })
    )
    waterPlane.rotation.x = -Math.PI / 2
    waterPlane.position.y = 0.03
    scene.add(waterPlane)

    /* ── Pilot cut lines (hidden initially) ── */
    const cutMat = new THREE.MeshStandardMaterial({
      color: 0x00B4D8,
      emissive: new THREE.Color(0x00B4D8),
      emissiveIntensity: 2,
    })
    const cuts = [-2.5, 0, 2.5].map(z => {
      const cut = new THREE.Mesh(new THREE.BoxGeometry(13.8, 0.04, 0.08), cutMat)
      cut.position.set(0, 0.04, z)
      cut.visible = false
      scene.add(cut)
      return cut
    })

    /* ── Cyan point light for drain glow ── */
    const drainLight = new THREE.PointLight(0x00B4D8, 0, 8)
    drainLight.position.set(0, 1, 0)
    scene.add(drainLight)

    /* ── Water particles ── */
    const COUNT = 700
    const positions = new Float32Array(COUNT * 3)
    const velY = new Float32Array(COUNT)
    const velXZ = new Float32Array(COUNT * 2)
    const onSurface = new Uint8Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 13
      positions[i * 3 + 1] = Math.random() * 3 + 0.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9
      velY[i]       = 0.015 + Math.random() * 0.01
      velXZ[i * 2]  = (Math.random() - 0.5) * 0.006
      velXZ[i * 2 + 1] = (Math.random() - 0.5) * 0.006
      onSurface[i]  = 0
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const ptMat = new THREE.PointsMaterial({
      color: 0x48CAE4, size: 0.11, transparent: true, opacity: 0.8, sizeAttenuation: true,
    })
    const points = new THREE.Points(ptGeo, ptMat)
    scene.add(points)

    /* ── Camera orbit ── */
    let orbitAngle = 0.52

    /* ── Animation loop ── */
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      clock.getElapsedTime()

      /* Orbit */
      orbitAngle += 0.0018
      camera.position.x = Math.cos(orbitAngle) * 14
      camera.position.z = Math.sin(orbitAngle) * 13
      camera.position.y = 8
      camera.lookAt(0, 0.5, 0)

      const pos = ptGeo.attributes.position.array
      const ph = phaseRef.current

      if (ph === 'pool') {
        /* Rain fall + pool */
        for (let i = 0; i < COUNT; i++) {
          const idx = i * 3
          if (pos[idx + 1] > 0.06) {
            pos[idx + 1] -= velY[i]
          } else {
            pos[idx + 1] = 0.06
            pos[idx]     += velXZ[i * 2]
            pos[idx + 2] += velXZ[i * 2 + 1]
            pos[idx]     = Math.max(-6.8, Math.min(6.8, pos[idx]))
            pos[idx + 2] = Math.max(-4.7, Math.min(4.7, pos[idx + 2]))
          }
        }
        /* Gentle shimmer on water plane */
        waterPlane.material.opacity = 0.58 + Math.sin(clock.elapsedTime * 1.2) * 0.04
      }

      if (ph === 'cutting') {
        /* Show cuts, pulse glow */
        cuts.forEach(c => { c.visible = true })
        drainLight.intensity = 1 + Math.sin(clock.elapsedTime * 8) * 0.5
        waterPlane.material.opacity = Math.max(0.3, waterPlane.material.opacity - 0.003)
        for (let i = 0; i < COUNT; i++) {
          const idx = i * 3
          if (pos[idx + 1] > 0.06) pos[idx + 1] -= velY[i]
          else {
            pos[idx + 1] = 0.06
            pos[idx]     += velXZ[i * 2] * 0.5
            pos[idx + 2] += velXZ[i * 2 + 1] * 0.5
          }
        }
      }

      if (ph === 'drain') {
        cuts.forEach(c => { c.visible = true })
        drainLight.intensity = 2.5
        waterPlane.material.opacity = Math.max(0, waterPlane.material.opacity - 0.005)

        for (let i = 0; i < COUNT; i++) {
          const idx = i * 3
          /* Attract toward nearest cut z, then fall */
          const cz = [-2.5, 0, 2.5].reduce((best, cz) =>
            Math.abs(pos[idx + 2] - cz) < Math.abs(pos[idx + 2] - best) ? cz : best, -2.5)
          pos[idx + 2] += (cz - pos[idx + 2]) * 0.02
          pos[idx + 1] -= 0.04 + Math.random() * 0.02

          if (pos[idx + 1] < -1.5) {
            /* Reset as new rain — sparse */
            if (Math.random() > 0.7) {
              pos[idx]     = (Math.random() - 0.5) * 13
              pos[idx + 1] = Math.random() * 4 + 3
              pos[idx + 2] = (Math.random() - 0.5) * 9
            } else {
              pos[idx + 1] = -10 // hide it
            }
          }
        }
      }

      if (ph === 'done') {
        drainLight.intensity = Math.max(0, drainLight.intensity - 0.02)
        waterPlane.material.opacity = Math.max(0, waterPlane.material.opacity - 0.01)
        /* Hide all particles */
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3 + 1] = -10
        }
      }

      ptGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const onResize = () => {
      const w = container.clientWidth
      const h = Math.min(520, Math.max(400, w * 0.55))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    /* ── Expose phase trigger ── */
    container._setPhase = (p) => { phaseRef.current = p }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [isMobile])

  const trigger = () => {
    if (phase !== 'pool') return
    const advance = (p) => {
      setPhase(p)
      if (mountRef.current?._setPhase) mountRef.current._setPhase(p)
    }
    advance('cutting')
    setTimeout(() => advance('drain'), 2000)
    setTimeout(() => advance('done'), 6000)
  }

  if (isMobile) return <MobileFallback />

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,180,216,0.2)' }}>
      <div ref={mountRef} style={{ width: '100%', display: 'block' }} />
      {/* Overlay UI */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10,
      }}>
        <button
          onClick={trigger}
          disabled={phase !== 'pool'}
          style={{
            padding: '13px 32px',
            background: phase !== 'pool'
              ? 'rgba(0,0,0,0.5)'
              : 'linear-gradient(135deg, #00B4D8, #48CAE4)',
            border: phase !== 'pool' ? '1px solid rgba(0,180,216,0.4)' : 'none',
            borderRadius: 8,
            color: phase !== 'pool' ? '#00B4D8' : '#0A1172',
            fontWeight: 800, fontSize: 15,
            cursor: phase === 'pool' ? 'pointer' : 'default',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s',
          }}
        >
          {phase === 'pool'    ? '▶  Watch the Water Drain'     : ''}
          {phase === 'cutting' ? '⚡  Precision Cuts Activating…' : ''}
          {phase === 'drain'   ? '💧  Draining…'                : ''}
          {phase === 'done'    ? '✓   Ponding Eliminated'        : ''}
        </button>
      </div>
      {/* Corner badge */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        background: 'rgba(10,17,114,0.75)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0,180,216,0.3)',
        borderRadius: 8, padding: '6px 14px',
        color: '#00B4D8', fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
      }}>
        3D SIMULATION · LIVE
      </div>
    </div>
  )
}
