import { useState, useRef } from 'react'
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

const inputStyle = (err) => ({
  width: '100%', padding: '13px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: `1.5px solid ${err ? '#ff6b6b' : 'rgba(255,255,255,0.1)'}`,
  borderRadius: 9, color: '#fff', fontSize: 15,
  outline: 'none', transition: 'border-color 0.2s',
  boxSizing: 'border-box', fontFamily: 'inherit',
})

const initial = { name: '', email: '', phone: '', company: '', type: '', desc: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errs, setErrs] = useState({})
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const set = (f) => (e) => setForm(v => ({ ...v, [f]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.desc.trim()) e.desc = 'Please describe your project'
    else if (form.desc.trim().length < 20) e.desc = 'Please provide at least 20 characters'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setErrs({}); setBusy(true)
    const sub = encodeURIComponent(`Free Assessment Request — ${form.name}${form.company ? ` (${form.company})` : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone||'—'}\nCompany: ${form.company||'—'}\nProject Type: ${form.type||'—'}\n\nProject Description:\n${form.desc}`)
    window.location.href = `mailto:info@precisionflowline.com?subject=${sub}&body=${body}`
    setTimeout(() => { setBusy(false); setSent(true); setForm(initial) }, 900)
  }

  const focus = (e) => { e.target.style.borderColor = '#00B4D8' }
  const blur  = (e, err) => { e.target.style.borderColor = err ? '#ff6b6b' : 'rgba(255,255,255,0.1)' }

  return (
    <main style={{ background: '#0A1172' }}>

      {/* HEADER */}
      <section style={{ padding: '120px 24px 80px', background: 'linear-gradient(160deg, #0A1172 0%, #060C5A 55%, #040840 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)`, backgroundSize: '64px 64px' }}/>
        <div style={{ position: 'absolute', top: '60%', left: '-5%', right: '-5%', height: 3, background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.4), transparent)', transform: 'rotate(-5deg)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-block', background: 'rgba(0,180,216,0.13)', border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100, padding: '6px 20px', color: '#00B4D8', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, marginBottom: 22 }}>
            FREE · NO OBLIGATION · 24HR RESPONSE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(48px,7vw,82px)', color: '#fff', margin: '0 0 20px', lineHeight: 0.93 }}>
            GET A <span style={{ color: '#00B4D8' }}>FREE</span><br/>ASSESSMENT
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
            Describe your ponding issue and our engineering team responds within 24 hours with a tailored proposal.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 56, alignItems: 'start' }}>

          {/* FORM */}
          <FadeIn>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 22, padding: '38px 34px' }}>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,180,216,0.14)', border: '2px solid #00B4D8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none"><path d="M2 11L10.5 19.5L28 2" stroke="#00B4D8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#fff', fontWeight: 900, fontSize: 28, margin: '0 0 12px' }}>MESSAGE SENT!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.65, margin: '0 0 28px' }}>Your email client should open with the inquiry. Our engineering team responds within 24 hours.</p>
                  <button onClick={() => setSent(false)} style={{ padding: '12px 24px', background: 'rgba(0,180,216,0.14)', border: '1px solid rgba(0,180,216,0.4)', borderRadius: 8, color: '#00B4D8', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 28, color: '#fff', margin: '0 0 26px' }}>PROJECT INQUIRY</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
                    {/* Name */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Full Name <span style={{ color: '#00B4D8' }}>*</span></label>
                      <input value={form.name} onChange={set('name')} placeholder="John Smith" style={inputStyle(errs.name)} onFocus={focus} onBlur={e => blur(e, errs.name)}/>
                      {errs.name && <p style={{ color: '#ff6b6b', fontSize: 12, margin: '5px 0 0' }}>{errs.name}</p>}
                    </div>
                    {/* Company */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Company / Agency</label>
                      <input value={form.company} onChange={set('company')} placeholder="City of Springfield" style={inputStyle()} onFocus={focus} onBlur={e => blur(e, false)}/>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Email Address <span style={{ color: '#00B4D8' }}>*</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" style={inputStyle(errs.email)} onFocus={focus} onBlur={e => blur(e, errs.email)}/>
                    {errs.email && <p style={{ color: '#ff6b6b', fontSize: 12, margin: '5px 0 0' }}>{errs.email}</p>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
                    {/* Phone */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Phone Number</label>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" style={inputStyle()} onFocus={focus} onBlur={e => blur(e, false)}/>
                    </div>
                    {/* Type */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Project Type</label>
                      <select value={form.type} onChange={set('type')} style={{ ...inputStyle(), cursor: 'pointer', color: form.type ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                        <option value="" disabled style={{ background: '#0A1172' }}>Select type…</option>
                        {['Parking Lot','Municipal Road','Commercial Property','Industrial Facility','Residential','Other'].map(t => (
                          <option key={t} value={t} style={{ background: '#0A1172' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Project Description <span style={{ color: '#00B4D8' }}>*</span></label>
                    <textarea rows={5} value={form.desc} onChange={set('desc')}
                      placeholder="Describe the ponding issue: location, approximate affected area, how long it has persisted, any previous repair attempts…"
                      style={{ ...inputStyle(errs.desc), resize: 'vertical', minHeight: 110, border: `1.5px solid ${errs.desc ? '#ff6b6b' : 'rgba(255,255,255,0.1)'}` }}
                      onFocus={focus} onBlur={e => blur(e, errs.desc)}
                    />
                    {errs.desc && <p style={{ color: '#ff6b6b', fontSize: 12, margin: '5px 0 0' }}>{errs.desc}</p>}
                  </div>

                  <button type="submit" disabled={busy} style={{
                    width: '100%', padding: '16px 0',
                    background: busy ? 'rgba(0,180,216,0.4)' : 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                    border: 'none', borderRadius: 9,
                    color: '#0A1172', fontWeight: 800, fontSize: 16,
                    cursor: busy ? 'wait' : 'pointer',
                    boxShadow: '0 6px 22px rgba(0,180,216,0.3)',
                    transition: 'all 0.2s',
                  }}>
                    {busy ? 'Sending…' : 'Submit Assessment Request →'}
                  </button>
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                    No spam, ever. Your info stays private.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>

          {/* INFO PANEL */}
          <div>
            <FadeIn delay={0.15}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 32, color: '#fff', margin: '0 0 24px' }}>WHAT HAPPENS NEXT?</h3>
              {[
                { n: '1', t: '24-Hour Response',  d: 'Our engineering team reviews your inquiry and responds within one business day.' },
                { n: '2', t: 'Site Assessment',   d: 'We schedule a free on-site evaluation to document the ponding and gather topographic data.' },
                { n: '3', t: 'Custom Proposal',   d: 'You receive a detailed scope, timeline, and cost — no obligation to proceed.' },
                { n: '4', t: 'Project Execution', d: 'If you approve, we mobilize quickly and complete your project with minimal disruption.' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #00B4D8, #0096B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 17, color: '#fff' }}>{s.n}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.t}</div>
                    <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: 14, lineHeight: 1.6 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.25}>
              <div style={{ padding: 26, background: 'rgba(0,180,216,0.07)', border: '1px solid rgba(0,180,216,0.18)', borderRadius: 14, marginBottom: 22, marginTop: 8 }}>
                <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', margin: '0 0 16px' }}>Direct Contact</h4>
                {[
                  { icon: '📧', l: 'Email',         v: 'info@precisionflowline.com' },
                  { icon: '📞', l: 'Phone',         v: '1-800-FLOWLINE' },
                  { icon: '⏱️', l: 'Response Time', v: 'Within 24 business hours' },
                ].map(item => (
                  <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 1 }}>{item.l.toUpperCase()}</div>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{item.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div style={{ padding: '18px 22px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, borderLeft: '3px solid #00B4D8' }}>
                <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                  "Precision Flowline completed a project in 6 hours that we were quoted 3 weeks and $180,000 for using traditional methods. The result was better."
                </p>
                <p style={{ color: '#00B4D8', fontSize: 13, fontWeight: 700, margin: '12px 0 0' }}>— Municipal Project Manager</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
