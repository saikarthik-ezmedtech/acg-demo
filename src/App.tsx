import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import Lenis from 'lenis'
import CardiovascularJourney from './components/CardiovascularJourney'
import HeartbeatLine from './components/HeartbeatLine'

const navItems = [
  { label: 'Team', href: '#providers' },
  { label: 'Community', href: '#community' },
  { label: 'Journey', href: '#journey' },
  { label: 'Services', href: '#services' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

const cardiacServices = [
  {
    id: 'diagnostics',
    title: 'Cardiac Diagnostics',
    sub: 'Advanced imaging & rhythm',
    copy: 'Echocardiography, nuclear stress testing, Holter monitoring, and advanced imaging to identify the source of your symptoms.',
    icon: '⬡',
  },
  {
    id: 'prevention',
    title: 'Preventive Cardiology',
    sub: 'Risk before symptoms',
    copy: 'Personalized risk assessment, lipid management, hypertension control, and lifestyle programs to stop heart disease before it starts.',
    icon: '◎',
  },
  {
    id: 'heartfailure',
    title: 'Heart Failure & Transplant',
    sub: 'Advanced cardiac management',
    copy: 'Specialized management of advanced heart failure, medical optimization, and transplant evaluation coordination.',
    icon: '♡',
  },
  {
    id: 'chronic',
    title: 'Chronic Disease Management',
    sub: 'AFib, CAD & more',
    copy: 'Ongoing coordinated care for atrial fibrillation, coronary artery disease, and other long-term cardiac conditions.',
    icon: '∞',
  },
  {
    id: 'vascular',
    title: 'Vascular Studies',
    sub: 'Non-invasive imaging',
    copy: 'Non-invasive ultrasound and imaging to evaluate blood flow in the legs, neck, and major vessels.',
    icon: '〜',
  },
  {
    id: 'wellness',
    title: 'Annual Cardiac Wellness',
    sub: 'Proactive heart health',
    copy: 'Comprehensive cardiovascular evaluations for executives, athletes, and anyone wanting a proactive look at their heart health.',
    icon: '✦',
  },
]


const experienceNotes = [
  {
    title: 'Clear answers',
    meta: 'Patient experience',
    quote: 'A calm visit should leave you understanding what your symptoms mean, what was measured, and what happens next.',
  },
  {
    title: 'Prevention first',
    meta: 'ACG philosophy',
    quote: 'The goal is to catch heart disease before it catches you, using evidence, listening, and precise diagnostics.',
  },
  {
    title: 'Trusted guidance',
    meta: 'Long-term care',
    quote: 'Risk, rhythm, blood pressure, cholesterol, and family history should become one plan you can actually follow.',
  },
  {
    title: 'Human follow-up',
    meta: 'Care continuity',
    quote: 'Cardiovascular care should keep evolving after the first appointment, with next steps that feel specific and steady.',
  },
  {
    title: 'Built for Gwinnett',
    meta: 'Opening August 2026',
    quote: 'A modern heart and vascular center designed for families, professionals, and communities across Metro Atlanta.',
  },
]

const servicePhoneMeta: Record<string, { label: string; title: string; score: string }> = {
  diagnostics: {
    label: 'Diagnostic review',
    title: 'Echo, stress, and rhythm data aligned',
    score: '98%',
  },
  prevention: {
    label: 'Prevention plan',
    title: 'Risk markers trending in range',
    score: '2.1%',
  },
  heartfailure: {
    label: 'Care stability',
    title: 'Weight, fluid, and symptoms synced',
    score: '0',
  },
  chronic: {
    label: 'Long-term care',
    title: 'Medication and rhythm patterns current',
    score: '100%',
  },
  vascular: {
    label: 'Vascular flow',
    title: 'Bilateral arterial signals reviewed',
    score: '1.06',
  },
  wellness: {
    label: 'Wellness index',
    title: 'Fitness and prevention goals on track',
    score: '87',
  },
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(16px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: 'easeOut' },
  },
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h10.4m0 0-4.2-4.2M14.4 10l-4.2 4.2" />
    </svg>
  )
}

function StarRow() {
  return (
    <div className="star-row" aria-label="Five star experience">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.2 14.9 8.4l6.7.8-4.9 4.7 1.3 6.6-6-3.3-6 3.3 1.3-6.6-4.9-4.7 6.7-.8L12 2.2Z" />
        </svg>
      ))}
    </div>
  )
}

function ServicePhoneMockup({ serviceId }: { serviceId: string }) {
  const meta = servicePhoneMeta[serviceId] || servicePhoneMeta.diagnostics

  return (
    <div className="phone-shell phone-shell--light" aria-label="Animated cardiovascular service mockup">
      <div className="phone-sensor" />
      <div className="phone-screen phone-screen--light service-phone-screen">
        <div className="phone-top">
          <span>ACG Digital Portal</span>
          <span>Live Sync</span>
        </div>
        <div className={`phone-service-hero phone-service-hero--${serviceId}`}>
          <span>{meta.label}</span>
          <strong>{meta.score}</strong>
          <small>{meta.title}</small>
          <i />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={serviceId}
            className="screen-content service-phone-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {serviceId === 'diagnostics' && (
              <div className="screen-content diagnostics-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>ECG rhythm</span>
                    <strong>68 bpm</strong>
                  </div>
                  <div className="offer-metric">
                    <span>Ejection Frac.</span>
                    <strong>EF 62%</strong>
                  </div>
                </div>
                <div className="offers-wave">
                  {Array.from({ length: 22 }).map((_, j) => (
                    <i key={j} style={{ height: `${[12,14,12,26,44,34,16,12,10,92,15,36,22,14,12,34,46,33,14,16,20,18][j]}%`, animationDelay: `${j * 0.04}s` }} />
                  ))}
                </div>
                <div className="screen-insight-card">
                  <span>Next best step</span>
                  <strong>Review echo + rhythm summary</strong>
                </div>
                <p className="screen-subtext">Normal sinus rhythm · 68 bpm</p>
              </div>
            )}

            {serviceId === 'prevention' && (
              <div className="screen-content prevention-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>Blood Pressure</span>
                    <strong>118 / 74</strong>
                  </div>
                  <div className="offer-metric">
                    <span>Risk Index</span>
                    <strong>Low 2.1%</strong>
                  </div>
                  <div className="offer-metric" style={{ gridColumn: 'span 2' }}>
                    <span>Cholesterol</span>
                    <strong>LDL 92 mg/dL</strong>
                  </div>
                </div>
                <div className="screen-ring-container">
                  <div className="screen-ring">
                    <span>Lab status</span>
                    <strong>Optimal</strong>
                  </div>
                </div>
                <div className="screen-pill-row">
                  <span>BP stable</span>
                  <span>LDL plan</span>
                </div>
              </div>
            )}

            {serviceId === 'heartfailure' && (
              <div className="screen-content heartfailure-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>Dry Weight</span>
                    <strong>168.2 lbs</strong>
                  </div>
                  <div className="offer-metric">
                    <span>Fluid retention</span>
                    <strong>0 (Stable)</strong>
                  </div>
                </div>
                <div className="screen-graph-container">
                  <div className="bar-graph">
                    <div className="graph-bar" style={{ height: '70%' }} />
                    <div className="graph-bar" style={{ height: '75%' }} />
                    <div className="graph-bar" style={{ height: '73%' }} />
                    <div className="graph-bar" style={{ height: '78%' }} />
                    <div className="graph-bar active" style={{ height: '72%' }} />
                  </div>
                </div>
                <div className="screen-insight-card">
                  <span>Care note</span>
                  <strong>No symptom escalation reported</strong>
                </div>
                <p className="screen-subtext">Daily auto-weight sync verified</p>
              </div>
            )}

            {serviceId === 'chronic' && (
              <div className="screen-content chronic-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>AFib Burden</span>
                    <strong>0% (Clear)</strong>
                  </div>
                  <div className="offer-metric">
                    <span>Medications</span>
                    <strong>100% adherence</strong>
                  </div>
                </div>
                <div className="screen-logs">
                  <div className="screen-log-row"><span>Morning Meds</span><span className="badge checked">✓ Taken</span></div>
                  <div className="screen-log-row"><span>Evening Meds</span><span className="badge checked">✓ Taken</span></div>
                  <div className="screen-log-row"><span>Symp. Log</span><span className="badge">No events</span></div>
                </div>
                <div className="screen-pill-row">
                  <span>AFib clear</span>
                  <span>CAD follow-up</span>
                </div>
              </div>
            )}

            {serviceId === 'vascular' && (
              <div className="screen-content vascular-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>ABI Index (R)</span>
                    <strong>1.05</strong>
                  </div>
                  <div className="offer-metric">
                    <span>ABI Index (L)</span>
                    <strong>1.06</strong>
                  </div>
                </div>
                <div className="screen-pulse-wave">
                  <svg viewBox="0 0 100 35" className="pulse-svg">
                    <path d="M 0 17 C 10 5, 20 5, 30 17 C 40 30, 50 30, 60 17 C 70 5, 80 5, 90 17" fill="none" stroke="#315f52" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="vessel-map">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="screen-subtext">Normal bilateral arterial waveforms</p>
              </div>
            )}

            {serviceId === 'wellness' && (
              <div className="screen-content wellness-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric" style={{ gridColumn: 'span 2' }}>
                    <span>Cardio Fitness</span>
                    <strong>VO2 Max 44.2 (Excellent)</strong>
                  </div>
                </div>
                <div className="screen-wellness-meter">
                  <div className="meter-track"><div className="meter-fill" style={{ width: '87%' }} /></div>
                  <div className="meter-label">Wellness Index: 87 / 100</div>
                </div>
                <div className="screen-pill-row">
                  <span>VO2 target</span>
                  <span>Annual plan</span>
                </div>
                <p className="screen-subtext">Optimized for athletic targets</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="phone-shadow" />
    </div>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, -90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.35])

  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          if (!isNaN(index)) {
            setActiveServiceIndex(index)
          }
        }
      })
    }, {
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.15
    })

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85 })
    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const id = href.substring(1)
          const element = document.getElementById(id)
          if (element) {
            const offset = id === 'team' ? -120 : -88
            lenis.scrollTo(element, { offset, duration: 0.9 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="page-wipe" aria-hidden="true" />
      <header className="navigation">
        <div className={`nav_layout-2${navOpen ? ' is-open' : ''}`}>
          <a className="nav_home" href="#top" aria-label="ACG Heart and Vascular home">
            <div className="nav_logo-container">
              <div className="logo brand-mark">
                <img src="/acg-logo.png" alt="" />
                <span>ACG Heart & Vascular</span>
              </div>
            </div>
            <span className="u-sr-only">ACG Heart and Vascular Home</span>
          </a>

          <div className="nav_main-wrapper">
            <div className="nav_main">
              <div className="nav_main-inner">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="navigation_link"
                    onClick={() => setNavOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a className="nav-cta btn cc-navigation" href="#contact">
                Request <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="nav_right">
            <button
              className={`nav_menu-2 nav-menu-btn${navOpen ? ' is-open' : ''}`}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((prev) => !prev)}
            >
              <span className="nav_menu-line nav-menu-line cc-bottom" />
              <span className="nav_menu-line nav-menu-line cc-middle" />
              <span className="nav_menu-line nav-menu-line cc-top" />
            </button>
          </div>

          <div className={`nav-mobile-panel${navOpen ? ' is-open' : ''}`}>
            {navItems.map((item) => (
              <a key={`mobile-${item.href}`} href={item.href} onClick={() => setNavOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="nav-mobile-cta" onClick={() => setNavOpen(false)}>
              Request appointment
            </a>
          </div>
        </div>
      </header>
      <button
        type="button"
        aria-label="Close navigation menu"
        className={`nav-mobile-backdrop${navOpen ? ' is-open' : ''}`}
        onClick={() => setNavOpen(false)}
      />

      <main id="top">
        <section className="hero-section">
          <motion.div className="hero-bg" style={{ y: heroLift, opacity: heroOpacity }}>
            <video src="/acg-assets/videos/heart-hero.mp4" autoPlay muted loop playsInline />
          </motion.div>
          <div className="hero-vein" />
          <div className="hero-content">
            <Reveal>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.58)' }}>Now Accepting Patients - Opening August 2026</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 style={{ color: '#fff' }}>Advanced Heart Care. Rooted in Community. Built on Trust.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-copy" style={{ color: 'rgba(255,255,255,0.72)' }}>
                ACG Heart &amp; Vascular is Gwinnett County's destination for expert cardiovascular care, combining precision
                diagnostics, evidence-based prevention, and 25+ years of physician leadership.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-actions">
                <a className="button primary" href="#contact" style={{ background: 'rgba(255,255,255,0.92)', color: '#111' }}>
                  Request appointment <ArrowIcon />
                </a>
                <a className="button secondary" href="#team" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.08)' }}>
                  Meet Dr. G
                </a>
              </div>
            </Reveal>
          </div>
          <HeartbeatLine className="hero-heartbeat" />
        </section>

        <section id="team" className="team-section">
          <div className="team-copy">
            <p className="eyebrow">About Your Cardiologist</p>
            <h2>Dr. Sreeni Gangasani, MD, FACC</h2>
            <div className="doctor-card doctor-card--mobile-inline">
              <img src="/acg-assets/dr-g-primary.jpg" alt="Dr. Sreeni Gangasani" />
              <div>
                <span>FACC</span>
                <strong>Founder & CEO</strong>
              </div>
            </div>
            <p>
              Known as Dr. G, he has spent 25+ years earning the trust of Metro Atlanta patients,
              families, and fellow physicians. Born in Hyderabad, India, he trained at Kurnool Medical
              College and William Beaumont Hospital before building ACG Heart &amp; Vascular around one
              conviction: better heart care begins before a crisis.
            </p>
            <p className="team-story-note">
              Patients come to him for answers, but they remember the steadiness: a physician who listens
              closely, explains clearly, and treats prevention as an act of protection.
            </p>
            <div className="founder-story-meta" aria-label="Dr. Gangasani practice highlights">
              <span><strong>25+</strong><small>Years serving Metro Atlanta</small></span>
              <span><strong>5x</strong><small>Board and fellowship credentials</small></span>
              <span><strong>16</strong><small>Years with GAPI Sewa Clinic</small></span>
            </div>
            <blockquote>
              My philosophy is simple: catch heart disease before it catches you.
            </blockquote>
            <div className="award-highlights" aria-label="Selected awards and recognition">
              {[
                { label: 'Circle of Hope', detail: '2012 & 2017' },
                { label: 'GAPI Physician', detail: 'of the Year' },
                { label: 'Top Doctor', detail: 'Gwinnett Health' },
              ].map((award) => (
                <span key={award.label}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
                  </svg>
                  <strong>{award.label}</strong>
                  <small>{award.detail}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="doctor-card doctor-card--desktop">
            <img src="/acg-assets/dr-g-primary.jpg" alt="Dr. Sreeni Gangasani" />
            <div>
              <span>FACC</span>
              <strong>Founder & CEO</strong>
            </div>
          </div>
          <div className="credential-intro">
            <p className="eyebrow">Credentials & Awards</p>
            <h3>Nationally respected expertise, brought home to Gwinnett County.</h3>
          </div>
          <div className="credential-strip">
            {[
              'Fellow, American College of Cardiology',
              'Board Certified, Cardiovascular Disease',
              'Board Certified, Heart Failure & Transplant',
              'Board Certified, Nuclear Cardiology',
              'Board Certified, Echocardiography',
              'Past Chair, Georgia Composite Medical Board',
              'Founder, GAPI Sewa Clinic (16 years)',
              'Gold Medalist, Kurnool Medical College',
            ].map((item) => (
              <span key={item}>
                <strong>{item}</strong>
              </span>
            ))}
          </div>
        </section>

        <section id="providers" className="providers-section">
          <div className="section-heading">
            <p className="eyebrow">Our Providers</p>
            <h2>Meet the ACG Heart &amp; Vascular team.</h2>
          </div>
          <div className="provider-grid">
            <article>
              <img alt="Dr. Sreeni Gangasani" src="/acg-assets/dr-g-secondary.webp" />
              <div>
                <span>Founder &amp; CEO</span>
                <h3>Dr. Sreeni Gangasani</h3>
                <p>MD, FACC. Board certified in cardiovascular disease, heart failure, nuclear cardiology, and echocardiography.</p>
              </div>
            </article>
            <article>
              <img alt="Rosa Garcia FNP-C" src="/acg-assets/rosa-garcia.jpg" />
              <div>
                <span>Advanced Practice Provider</span>
                <h3>Rosa Garcia</h3>
                <p>FNP-C. Focused on cardiovascular care, patient education, and chronic disease management.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ─── COMMUNITY IMPACT ─── */}
        <section id="community" className="community-section">
          <div className="section-heading">
            <p className="eyebrow">Beyond the Clinic</p>
            <h2>Community Impact & Leadership</h2>
            <p>From free clinics in Atlanta to healthcare summits in India — a physician with a mission beyond medicine.</p>
          </div>
          <div className="leadership-proof" aria-label="Community leadership highlights">
            <span><strong>Medical board leadership</strong><small>Past Chair, Georgia Composite Medical Board</small></span>
            <span><strong>Public health service</strong><small>Free cardiac care through GAPI Sewa Clinic</small></span>
            <span><strong>Global healthcare work</strong><small>AAPI leadership and international initiatives</small></span>
          </div>
          <div className="gal-grid">
            {[
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974664/SG_healthfair_ijn06e.webp', alt: 'Health Fair', tag: 'Community Health', cap: 'Bringing cardiovascular screenings and heart health education directly to the public at community health fairs.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974664/SG_India_ICD_program_b6bzgt.webp', alt: 'India ICD Program', tag: 'Global Health Initiative', cap: 'Leading the installation of 171 AEDs in emergency ambulances across Telangana, India — saving lives across two continents.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974663/SG_GHS_djx3uj.webp', alt: 'AAPI Global Healthcare Summit', tag: 'AAPI Leadership', cap: 'At the AAPI Global Healthcare Summit 2019 in Hyderabad as Chair — receiving recognition from India\'s Union Minister of Health.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974663/SG_GAPIclinic_opening_df1iuz.webp', alt: 'GAPI SEWA Clinic Opening', tag: 'GAPI SEWA Free Clinic', cap: 'Ribbon-cutting at the GAPI SEWA Clinic opening — bringing free cardiovascular care to the underserved in Metro Atlanta.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974663/SG_Gov_Kemp_ir4yxs.webp', alt: 'With Governor Brian Kemp', tag: 'Civic Engagement', cap: 'With Georgia Governor Brian Kemp — active voice in community health advocacy at the highest levels of state leadership.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974663/GCMB_team_2025_agnhby.webp', alt: 'GCMB Team 2025', tag: 'Medical Board Leadership', cap: 'With the Georgia Composite Medical Board team 2025 — protecting public health and elevating physician standards statewide.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778974664/SG_MG_Mayor_Dickens_sbqlsq.webp', alt: 'With Mayor Dickens', tag: 'Civic Engagement', cap: 'With Atlanta Mayor Andre Dickens — building bridges with city leadership to advance community health across Metro Atlanta.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/GCMB_2024_gtve63.jpg', alt: 'GCMB 2024', tag: 'Medical Board Leadership', cap: 'Georgia Composite Medical Board 2024 — Dr. Gangasani\'s historic tenure as Chair, protecting public health statewide.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/GAPISewa_Clinic_ox7bm0.jpg', alt: 'GAPI SEWA Clinic', tag: 'GAPI Sewa Clinic', cap: 'Serving the underserved community through the GAPI Sewa Clinic — 16+ years of compassionate free cardiac care in Metro Atlanta.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/SG_Cricketer_Virat_Kohli_cfjyrn.jpg', alt: 'Dr. Gangasani with Virat Kohli', tag: 'Community & Cricket', cap: 'With cricket legend Virat Kohli — Dr. Gangasani\'s passion for cricket connects him to communities across the world.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/GCMB_chair_recognition_jt9pag.jpg', alt: 'GCMB Chair Recognition', tag: 'Medical Board Leadership', cap: 'Recognized as Chair of the Georgia Composite Medical Board — a historic milestone for international medical graduates.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/Circle_of_Hope_Award_ivijti.jpg', alt: 'Circle of Hope Award', tag: 'Award', cap: 'Receiving the Circle of Hope Award — recognizing outstanding contributions to cardiovascular care and community health.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/GCMB_Oath_xrqpgp.jpg', alt: 'GCMB Oath of Office', tag: 'Medical Board Leadership', cap: 'Taking the oath of office as a Member of the Georgia Composite Medical Board — the beginning of a distinguished chapter.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1779624729/AAPI_Con2019_oun1sl.jpg', alt: 'AAPI Convention 2019', tag: 'AAPI Leadership', cap: 'At the AAPI Convention 2019 — representing 100,000+ physicians of Indian origin and championing health equity.' },
              { src: 'https://res.cloudinary.com/dpmznvg6o/image/upload/v1778977914/GAPI_Clinic_photo_z4uk71.jpg', alt: 'GAPI Sewa Clinic Patient Care', tag: 'GAPI Sewa Clinic', cap: 'Dr. Gangasani seeing patients at the GAPI Sewa Clinic — bringing compassionate cardiac care to those without insurance.' },
            ].map((item) => (
              <div className="gc" key={item.alt}>
                <img src={item.src} alt={item.alt} />
                <div className="gc-cap">
                  <div className="gc-tag">{item.tag}</div>
                  <p>{item.cap}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CardiovascularJourney />

        {/* ─── COMPREHENSIVE CARDIAC SERVICES (Embedded Mockup Rows) ─── */}
        <section id="services" className="offers-section">
          <div className="offers-header">
            <h2>
              <span>What We Offer</span>
              Comprehensive Cardiac Services
            </h2>
            <p>From advanced diagnostics to long-term prevention — all under one roof in Lawrenceville, Georgia.</p>
          </div>

          <div className="offers-container">
            <div className="offers-mobile-phone">
              <ServicePhoneMockup serviceId={cardiacServices[activeServiceIndex]?.id || 'diagnostics'} />
            </div>
            <div className="offers-left">
              {cardiacServices.map((svc, idx) => (
                <motion.article 
                  key={svc.id} 
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  data-index={idx}
                  className={`offer-scroll-card ${idx === activeServiceIndex ? 'is-active' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="offer-row-content">
                    <div className="offer-title-row">
                      <span className="offer-icon">{svc.icon}</span>
                    </div>
                    <h3>{svc.title}</h3>
                    <p className="offer-copy">{svc.copy}</p>
                    
                    {/* Detailed bullets for visual structure */}
                    <ul className="offer-details-list">
                      {svc.id === 'diagnostics' && (
                        <>
                          <li>Clarifies symptoms with imaging, stress testing, and rhythm data</li>
                          <li>Turns testing into a clear next-step plan</li>
                        </>
                      )}
                      {svc.id === 'prevention' && (
                        <>
                          <li>Finds risk early through labs, history, and blood pressure patterns</li>
                          <li>Builds a prevention plan patients can follow</li>
                        </>
                      )}
                      {svc.id === 'heartfailure' && (
                        <>
                          <li>Optimizes medications and symptom tracking</li>
                          <li>Coordinates advanced care when needed</li>
                        </>
                      )}
                      {svc.id === 'chronic' && (
                        <>
                          <li>Keeps complex conditions organized over time</li>
                          <li>Connects medications, rhythm, symptoms, and follow-up</li>
                        </>
                      )}
                      {svc.id === 'vascular' && (
                        <>
                          <li>Evaluates blood flow in the neck, legs, and major vessels</li>
                          <li>Uses non-invasive imaging to guide prevention</li>
                        </>
                      )}
                      {svc.id === 'wellness' && (
                        <>
                          <li>Creates an annual snapshot of cardiovascular health</li>
                          <li>Helps active patients reduce risk before symptoms</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="offer-card-phone">
                    <ServicePhoneMockup serviceId={svc.id} />
                  </div>

                </motion.article>
              ))}
            </div>

            <div className="offers-right">
              <div className="offers-phone-sticky">
                <ServicePhoneMockup serviceId={cardiacServices[activeServiceIndex]?.id || 'diagnostics'} />
              </div>
            </div>
          </div>
        </section>

        <section className="extra-section">
          <div className="extra-copy">
            <p className="eyebrow">And that's not all</p>
            <h2>More ways ACG connects the dots.</h2>
            <div className="extra-list">
              <button className="extra-item" id="extra-item-0">
                <span>
                  <strong>Annual cardiac wellness</strong>
                  <small>A proactive cardiovascular review for patients who want a clearer picture before symptoms escalate.</small>
                </span>
                <div className="extra-item-control">
                  <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--moss)" strokeWidth="8" style={{ strokeDasharray: 339.292, strokeDashoffset: 339.292, transformOrigin: 'center center', transform: 'rotate(-90deg)', transition: 'none' }} />
                  </svg>
                  <div className="control-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
              <button className="extra-item" id="extra-item-1">
                <span>
                  <strong>Vascular studies</strong>
                  <small>Non-invasive ultrasound and imaging to evaluate blood flow in the neck, legs, and major vessels.</small>
                </span>
                <div className="extra-item-control">
                  <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--moss)" strokeWidth="8" style={{ strokeDasharray: 339.292, strokeDashoffset: 339.292, transformOrigin: 'center center', transform: 'rotate(-90deg)', transition: 'none' }} />
                  </svg>
                  <div className="control-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
              <button className="extra-item is-active" id="extra-item-2">
                <span>
                  <strong>Rhythm monitoring</strong>
                  <small>Holter and extended monitoring to connect palpitations, dizziness, and symptoms to real rhythm data.</small>
                </span>
                <div className="extra-item-control">
                  <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--moss)" strokeWidth="8" style={{ strokeDasharray: 339.292, strokeDashoffset: 0, transformOrigin: 'center center', transform: 'rotate(-90deg)', transition: 'stroke-dashoffset 3.2s linear, stroke 0.3s' }} />
                  </svg>
                  <div className="control-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor" />
                      <rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </button>
              <button className="extra-item" id="extra-item-3">
                <span>
                  <strong>Preventive labs</strong>
                  <small>Cholesterol, blood pressure, diabetes risk, family history, and lifestyle translated into a prevention plan.</small>
                </span>
                <div className="extra-item-control">
                  <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--moss)" strokeWidth="8" style={{ strokeDasharray: 339.292, strokeDashoffset: 339.292, transformOrigin: 'center center', transform: 'rotate(-90deg)', transition: 'none' }} />
                  </svg>
                  <div className="control-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
              <button className="extra-item" id="extra-item-4">
                <span>
                  <strong>Heart failure care</strong>
                  <small>Medication optimization, longitudinal monitoring, and coordination for advanced cardiovascular needs.</small>
                </span>
                <div className="extra-item-control">
                  <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--moss)" strokeWidth="8" style={{ strokeDasharray: 339.292, strokeDashoffset: 339.292, transformOrigin: 'center center', transform: 'rotate(-90deg)', transition: 'none' }} />
                  </svg>
                  <div className="control-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="extra-phone-stage">
            <div className="phone-shell phone-shell--light" aria-label="Animated cardiovascular insight phone mockup">
              <div className="phone-sensor" />
              <div className="phone-screen phone-screen--light">
                <div className="phone-top"><span>ACG</span><span>Treatment Journey</span></div>
                <div className="vital-ring"><span>03</span><div className="ring-pulse" /></div>
                <div className="phone-copy">
                  <p>Every step feels connected.</p>
                  <span>Medication strategy, procedures, follow-up, and recovery guidance move together instead of feeling fragmented.</span>
                </div>
                <div className="phone-thread">
                  <span>Treatment Journey insight</span>
                  <p>Keep medication, follow-up, and recovery moving together.</p>
                </div>
                <div className="mini-chart">
                  <i style={{ height: '26%' }} /><i style={{ height: '39%' }} /><i style={{ height: '52%' }} /><i style={{ height: '65%' }} /><i style={{ height: '34%' }} /><i style={{ height: '47%' }} /><i style={{ height: '60%' }} /><i style={{ height: '29%' }} /><i style={{ height: '42%' }} /><i style={{ height: '55%' }} /><i style={{ height: '68%' }} /><i style={{ height: '37%' }} /><i style={{ height: '50%' }} /><i style={{ height: '63%' }} /><i style={{ height: '32%' }} /><i style={{ height: '45%' }} /><i style={{ height: '58%' }} /><i style={{ height: '27%' }} /><i style={{ height: '40%' }} /><i style={{ height: '53%' }} /><i style={{ height: '66%' }} /><i style={{ height: '35%' }} />
                </div>
              </div>
              <div className="phone-shadow" />
            </div>
          </div>
        </section>

        {/* ─── PRESS & RECOGNITION ─── */}
        <section id="news" className="news-section">
          <div className="section-heading">
            <p className="eyebrow">Press & Recognition</p>
            <h2>Trusted voices have taken notice.</h2>
            <p>National, regional, and global outlets have recognized Dr. Gangasani's leadership in medicine, service, and public health.</p>
          </div>
          <div className="news-grid">
            <a className="nc" href="https://edition.cnn.com/2021/05/09/us/india-covid-doctors-us-telehealth-help" target="_blank" rel="noreferrer" style={{ border: '2px solid rgba(196,30,30,.2)' }}>
              <div className="nc-body"><div className="ns"><span className="ns-tag cnn">CNN</span><span className="ns-yr">2021</span></div><h3>Indian American Doctors Provide Free Telehealth During India's Covid Crisis</h3><p>Dr. Gangasani featured as chairman of eGlobalDoctors, providing free telehealth to 1,500+ Covid-19 patients in India.</p><div className="nc-link">Read on CNN <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://www.fox5atlanta.com/news/georgia-cardiologist-part-of-team-working-to-help-india-covid-19-patients" target="_blank" rel="noreferrer">
              <div className="nc-body"><div className="ns"><span className="ns-tag fox">FOX 5 Atlanta</span><span className="ns-yr">2021</span></div><h3>Georgia Cardiologist Helping India Covid-19 Patients</h3><p>FOX 5 Atlanta profiled Dr. Gangasani's volunteer work through eGlobalDoctors, providing nightly virtual consultations.</p><div className="nc-link">Read Article <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://www.weforum.org/stories/2021/05/indian-doctors-living-abroad-are-helping-their-country-through-online-consultations/" target="_blank" rel="noreferrer">
              <div className="nc-body"><div className="ns"><span className="ns-tag def">World Economic Forum</span><span className="ns-yr">2021</span></div><h3>Indian Doctors Abroad Help Country Fight Covid-19</h3><p>The World Economic Forum highlighted Dr. Gangasani's eGlobalDoctors network of 120+ volunteer doctors.</p><div className="nc-link">Read Article <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://www.khabar.com/magazine/community-newsmakers/sreeni-gangasani-is-chairman-of-the-georgia-composite-medical-board" target="_blank" rel="noreferrer">
              <div className="nc-body"><div className="ns"><span className="ns-tag def">Khabar Magazine</span><span className="ns-yr">2024</span></div><h3>Dr. Gangasani Elected Chairman of Georgia Composite Medical Board</h3><p>Only the second international medical graduate to Chair the Board in over 100 years.</p><div className="nc-link">Read Article <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://www.khabar.com/magazine/features/spotlight-heart-to-heart-with-dr-sreeni-gangasani" target="_blank" rel="noreferrer">
              <div className="nc-body"><div className="ns"><span className="ns-tag def">Khabar Magazine</span><span className="ns-yr">Feature</span></div><h3>Spotlight: Heart-to-Heart with Dr. Sreeni Gangasani</h3><p>An in-depth profile on Dr. Gangasani's journey from Hyderabad to leading cardiology in Gwinnett County.</p><div className="nc-link">Read Article <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://nripulse.com/dr-sreeni-gangasanis-inspiring-journey-of-heart-and-community/" target="_blank" rel="noreferrer">
              <div className="nc-body"><div className="ns"><span className="ns-tag def">NRI Pulse</span><span className="ns-yr">2023</span></div><h3>Dr. Gangasani's Inspiring Journey of Heart and Service</h3><p>In-depth profile including Q&amp;A on heart health for patients across Metro Atlanta.</p><div className="nc-link">Read Article <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://youtu.be/c0A7XAUGTK4" target="_blank" rel="noreferrer">
              <div className="vid-thumb"><img src="https://img.youtube.com/vi/c0A7XAUGTK4/hqdefault.jpg" alt="NBC Interview" /><div className="play-btn"><div style={{ background: '#0b4ea2' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="10 8 16 12 10 16 10 8" /></svg></div></div></div>
              <div className="nc-body"><div className="ns"><span className="ns-tag nbc">NBC</span><span className="ns-yr">TV Interview</span></div><h3>NBC: Understanding & Controlling High Cholesterol</h3><p>Dr. Gangasani on NBC breaking down cholesterol management — risk factors, diet, and medication.</p><div className="nc-link">Watch Interview <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://youtu.be/4b1JBS__ClE" target="_blank" rel="noreferrer">
              <div className="vid-thumb"><img src="https://img.youtube.com/vi/4b1JBS__ClE/hqdefault.jpg" alt="Fox News Interview" /><div className="play-btn"><div style={{ background: '#003366' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="10 8 16 12 10 16 10 8" /></svg></div></div></div>
              <div className="nc-body"><div className="ns"><span className="ns-tag fox">FOX NEWS</span><span className="ns-yr">TV Interview</span></div><h3>Fox News: Pacemakers Explained — What Patients Need to Know</h3><p>Dr. Gangasani on Fox News explaining who needs a pacemaker and what life looks like afterward.</p><div className="nc-link">Watch Interview <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://youtu.be/kj116NfEXig" target="_blank" rel="noreferrer">
              <div className="vid-thumb"><img src="https://img.youtube.com/vi/kj116NfEXig/hqdefault.jpg" alt="TV Interview" /><div className="play-btn"><div style={{ background: '#C41E1E' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="10 8 16 12 10 16 10 8" /></svg></div></div></div>
              <div className="nc-body"><div className="ns"><span className="ns-tag def">TV Interview</span><span className="ns-yr">Media</span></div><h3>Dr. Gangasani — Television Interview</h3><p>Expert cardiovascular insights shared in this television appearance.</p><div className="nc-link">Watch Interview <ArrowIcon /></div></div>
            </a>
            <a className="nc" href="https://youtu.be/qQYb5s9Llmw" target="_blank" rel="noreferrer">
              <div className="vid-thumb"><img src="https://img.youtube.com/vi/qQYb5s9Llmw/hqdefault.jpg" alt="Fox News" /><div className="play-btn"><div style={{ background: '#003366' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="10 8 16 12 10 16 10 8" /></svg></div></div></div>
              <div className="nc-body"><div className="ns"><span className="ns-tag fox">FOX NEWS</span><span className="ns-yr">TV Feature</span></div><h3>Fox News Feature: Dr. Gangasani on Cardiovascular Health</h3><p>Dr. Gangasani featured on Fox News discussing heart health and cardiovascular disease prevention.</p><div className="nc-link">Watch on Fox News <ArrowIcon /></div></div>
            </a>
          </div>
        </section>

        <section id="why-amma" className="amma-section">
          <div className="amma-layout">
            <div className="amma-copy">
              <p className="eyebrow">The Meaning Behind the Name</p>
              <h2>Why Amma</h2>
              <p>
                In many languages, including many Indian languages, Amma means mother - the most sacred word,
                spoken first and felt forever. This practice carries that name as a tribute to the woman who
                made everything possible.
              </p>
              <p>
                Dr. Gangasani&apos;s mother saw something in her son long before he saw it in himself. Her quiet
                conviction - her belief that compassion and science together create a healer - set him on the
                path to medicine. When she passed away in 2026, she left behind a legacy that lives on in every
                patient he serves.
              </p>
              <p>
                Naming this practice Amma Cardiovascular Centers of Georgia is both gratitude and promise: every
                patient will be cared for with patience, warmth, and relentless commitment.
              </p>
              <blockquote className="amma-quote">
                &quot;My mother believed I could heal people before I ever held a stethoscope. Amma is named for
                her, and for every mother whose love has been the heartbeat behind someone else&apos;s greatness.&quot;
                <span>- Dr. Sreeni Gangasani, MD, FACC</span>
              </blockquote>
            </div>
            <div className="amma-awards">
              <h3>The Amma promise</h3>
              <ul>
                <li>Care that feels personal, never transactional.</li>
                <li>Clinical precision delivered with patience and warmth.</li>
                <li>A practice culture shaped by gratitude, family, and service.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="section-heading">
            <p className="eyebrow">Patient experience</p>
            <h2>Designed to earn trust before, during, and after the visit.</h2>
          </div>
          <div className="testimonial-marquee">
            {Array.from({ length: 2 }).map((_, group) => (
              <div className="testimonial-track" key={group}>
                {experienceNotes.map((note) => (
                  <article className="testimonial-card" key={`${group}-${note.title}`}>
                    <StarRow />
                    <h3>{note.title}</h3>
                    <p className="testimonial-meta">{note.meta}</p>
                    <p>{note.quote}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <div className="privacy-lock"></div>
            <p className="eyebrow">Built for trust</p>
            <h2>Secure, private, and intentionally calm.</h2>
            <p>Cardiovascular care is personal. The experience is designed to feel precise and protective from the first call to every follow-up.</p>
          </div>
        </section>
        <section id="contact" className="final-cta">
          <div className="final-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>Begin with a clearer heart plan.</h2>
            <p>
              Request a consultation with ACG Heart & Vascular and take the first step toward prevention,
              diagnostics, and long-term confidence.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="tel:6788418412">
                Call 678-841-8412 <ArrowIcon />
              </a>
              <a className="button secondary" href="mailto:info@acgheart.com">
                Email the clinic
              </a>
            </div>
          </div>
          <div className="final-visual" aria-label="Modern cardiovascular care essentials arranged on a clean white surface">
            <img src="/acg-assets/custom/cta-stethoscope.png" className="cta-object cta-object--stethoscope" alt="Stethoscope" />
            <img src="/acg-assets/custom/cta-bp-monitor.png" className="cta-object cta-object--bp" alt="Blood Pressure Monitor" />
            <img src="/acg-assets/custom/cta-phone-app.png" className="cta-object cta-object--phone" alt="ACG Prevention Plan App" />
            <img src="/acg-assets/custom/cta-smartwatch.png" className="cta-object cta-object--watch" alt="Smartwatch" />
          </div>
        </section>
      </main>

      <div className="footer-wrap">
        <footer className="site-footer">
          {/* Footer content grid */}
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="footer-logo">
                <img src="/acg-logo.png" alt="ACG Heart & Vascular" />
              </div>
              <p className="footer-tagline">Amma CardioVascular Centers of Georgia</p>
              <p className="footer-sub">Opening August 2026 · Lawrenceville, Georgia</p>
            </div>
            <div className="footer-col">
              <strong>Services</strong>
              <a href="#services">Diagnostics</a>
              <a href="#services">Prevention</a>
              <a href="#services">Heart Failure Care</a>
              <a href="#services">Chronic Disease Management</a>
              <a href="#services">Vascular Studies</a>
              <a href="#services">Annual Wellness</a>
            </div>
            <div className="footer-col">
              <strong>Visit</strong>
              <span>310 Philip Blvd, Suite 102</span>
              <span>Lawrenceville, GA 30046</span>
            </div>
            <div className="footer-col">
              <strong>Contact</strong>
              <a href="tel:6788418412">678-841-8412</a>
              <a href="mailto:info@acgheart.com">info@acgheart.com</a>
            </div>
            <div className="footer-col">
              <strong>Navigate</strong>
              <a href="#journey">Our Journey</a>
              <a href="#services">Services</a>
              <a href="#team">Team</a>
              <a href="#community">Community</a>
              <a href="#news">In the News</a>
              <a href="#contact">Request Appointment</a>
            </div>
          </div>

          <div className="footer-legal-bar">
            <p>Educational information only. Always consult a qualified healthcare provider for diagnosis and treatment.</p>
            <p>© {currentYear} Amma CardioVascular Centers of Georgia, LLC.</p>
          </div>
        </footer>
        <div className="footer-wordmark">
          <div className="footer-wordmark-inner">
            <span>ACG HEART &amp; VASCULAR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
