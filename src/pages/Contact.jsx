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

function Field({ label, id, type = 'text', required, value, onChange, error, placeholder, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor={id} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
        {label} {required && <span style={{ color: '#00B4D8' }}>*</span>}
      </label>
      {children || (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${error ? '#ff6b6b' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 10,
            color: 'white',
            fontSize: 15,
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={e => { e.target.style.borderColor = '#00B4D8' }}
          onBlur={e => { e.target.style.borderColor = error ? '#ff6b6b' : 'rgba(255,255,255,0.12)' }}
        />
      )}
      {error && <p style={{ color: '#ff6b6b', fontSize: 13, margin: '6px 0 0' }}>{error}</p>}
    </div>
  )
}

const initialForm = { name: '', email: '', phone: '', company: '', projectType: '', description: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.description.trim()) e.description = 'Please describe your project'
    else if (form.description.trim().length < 20) e.description = 'Please provide more detail (at least 20 characters)'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)

    const subject = encodeURIComponent(`Free Assessment Request — ${form.name}${form.company ? ` (${form.company})` : ''}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nCompany: ${form.company || 'Not provided'}\nProject Type: ${form.projectType || 'Not specified'}\n\nProject Description:\n${form.description}`
    )
    window.location.href = `mailto:info@precisionflowline.com?subject=${subject}&body=${body}`

    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm(initialForm)
    }, 800)
  }

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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block', background: 'rgba(0,180,216,0.15)',
              border: '1px solid rgba(0,180,216,0.35)', borderRadius: 100,
              padding: '6px 18px', color: '#00B4D8', fontSize: 12, fontWeight: 700,
              letterSpacing: 2, marginBottom: 20,
            }}
          >
            FREE • NO OBLIGATION • FAST RESPONSE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: 'clamp(48px, 7vw, 78px)',
              color: 'white', margin: '0 0 20px', lineHeight: 0.95,
            }}
          >
            GET A <span style={{ color: '#00B4D8' }}>FREE</span><br />ASSESSMENT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}
          >
            Describe your ponding issue and our engineering team will respond
            within 24 hours with a tailored mitigation proposal.
          </motion.p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 60, alignItems: 'start',
        }}>
          {/* FORM */}
          <FadeIn>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: '40px 36px',
            }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(0,180,216,0.15)',
                    border: '2px solid #00B4D8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}>
                    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                      <path d="M2 12L11 21L30 2" stroke="#00B4D8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 26, margin: '0 0 12px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                    MESSAGE SENT!
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.65, margin: '0 0 28px' }}>
                    Thank you for reaching out. Your email client should open with your inquiry.
                    Our engineering team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      background: 'rgba(0,180,216,0.15)',
                      border: '1px solid rgba(0,180,216,0.4)',
                      borderRadius: 8,
                      color: '#00B4D8',
                      fontSize: 14, fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 28, color: 'white',
                    margin: '0 0 28px',
                  }}>
                    PROJECT INQUIRY
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <Field label="Full Name" id="name" required value={form.name} onChange={update('name')} error={errors.name} placeholder="John Smith" />
                    <Field label="Company / Agency" id="company" value={form.company} onChange={update('company')} placeholder="City of Springfield" />
                  </div>

                  <Field label="Email Address" id="email" type="email" required value={form.email} onChange={update('email')} error={errors.email} placeholder="john@example.com" />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <Field label="Phone Number" id="phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="(555) 000-0000" />
                    <Field label="Project Type" id="projectType" value={form.projectType} onChange={update('projectType')}>
                      <select
                        id="projectType"
                        value={form.projectType}
                        onChange={update('projectType')}
                        style={{
                          width: '100%', padding: '14px 16px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1.5px solid rgba(255,255,255,0.12)',
                          borderRadius: 10, color: form.projectType ? 'white' : 'rgba(255,255,255,0.35)',
                          fontSize: 15, outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
                        }}
                      >
                        <option value="" disabled style={{ background: '#0A0F6B' }}>Select type...</option>
                        {['Parking Lot', 'Municipal Road', 'Commercial Property', 'Industrial Facility', 'Residential', 'Other'].map(t => (
                          <option key={t} value={t} style={{ background: '#0A0F6B' }}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Project Description" id="description" required value={form.description} onChange={update('description')} error={errors.description}>
                    <textarea
                      id="description"
                      required
                      value={form.description}
                      onChange={update('description')}
                      rows={5}
                      placeholder="Describe the ponding issue: location, approximate affected area, how long it has persisted, any previous repair attempts..."
                      style={{
                        width: '100%', padding: '14px 16px', resize: 'vertical', minHeight: 120,
                        background: 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${errors.description ? '#ff6b6b' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: 10, color: 'white', fontSize: 15,
                        outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#00B4D8' }}
                      onBlur={e => { e.target.style.borderColor = errors.description ? '#ff6b6b' : 'rgba(255,255,255,0.12)' }}
                    />
                    {errors.description && <p style={{ color: '#ff6b6b', fontSize: 13, margin: '6px 0 0' }}>{errors.description}</p>}
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      background: submitting ? 'rgba(0,180,216,0.4)' : 'linear-gradient(135deg, #00B4D8, #48CAE4)',
                      border: 'none',
                      borderRadius: 10, color: '#0A0F6B',
                      fontWeight: 800, fontSize: 17,
                      cursor: submitting ? 'wait' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 6px 24px rgba(0,180,216,0.3)',
                    }}
                  >
                    {submitting ? 'Sending...' : 'Submit Assessment Request →'}
                  </button>

                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textAlign: 'center', marginTop: 14 }}>
                    By submitting you agree to be contacted about your project inquiry. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>

          {/* INFO */}
          <div>
            <FadeIn delay={0.15}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: 32, color: 'white', margin: '0 0 16px',
                }}>
                  WHAT HAPPENS NEXT?
                </h3>
                {[
                  { n: '1', title: '24-Hour Response', desc: 'Our engineering team reviews your inquiry and responds within one business day.' },
                  { n: '2', title: 'Site Assessment', desc: 'We schedule a free on-site evaluation to document the ponding and gather topographic data.' },
                  { n: '3', title: 'Custom Proposal', desc: 'You receive a detailed scope of work, timeline, and cost — with no obligation to proceed.' },
                  { n: '4', title: 'Project Execution', desc: 'If you approve, we mobilize quickly and complete your project with minimal disruption.' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00B4D8, #0096B7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900, fontSize: 18, color: 'white',
                    }}>{step.n}</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{step.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div style={{
                padding: 28, background: 'rgba(0,180,216,0.08)',
                border: '1px solid rgba(0,180,216,0.2)', borderRadius: 16,
                marginBottom: 24,
              }}>
                <h4 style={{ color: '#00B4D8', fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 16px' }}>
                  Direct Contact
                </h4>
                {[
                  { icon: '📧', label: 'Email', value: 'info@precisionflowline.com' },
                  { icon: '📞', label: 'Phone', value: '1-800-FLOWLINE' },
                  { icon: '⏱️', label: 'Response Time', value: 'Within 24 business hours' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 1 }}>{item.label.toUpperCase()}</div>
                      <div style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                borderLeft: '3px solid #00B4D8',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
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
