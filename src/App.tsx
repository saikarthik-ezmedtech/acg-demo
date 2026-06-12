import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import Lenis from 'lenis'
import CardiovascularJourney from './components/CardiovascularJourney'
import HeartbeatLine from './components/HeartbeatLine'

const navItems = [
  { label: 'About', href: '#team' },
  { label: 'Physicians', href: '#providers' },
  { label: 'Journey', href: '#journey' },
  { label: 'Services', href: '#services' },
  { label: 'Why SICA', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

const cardiacServices = [
  {
    id: 'preventive-cardiology',
    title: 'Preventive Cardiology',
    copy: 'Risk assessment, lipid management, blood pressure control, and lifestyle guidance to reduce cardiovascular risk before symptoms escalate.',
    details: ['Identifies risk factors early', 'Turns prevention into a practical long-term plan'],
    icon: '⬡',
  },
  {
    id: 'coronary-artery-disease',
    title: 'Coronary Artery Disease',
    copy: 'Evaluation and ongoing management for chest pain, blocked arteries, prior stents, and long-term coronary risk reduction.',
    details: ['Connects symptoms, testing, and treatment history', 'Supports medication and follow-up decisions'],
    icon: '◎',
  },
  {
    id: 'heart-failure-management',
    title: 'Heart Failure Management',
    copy: 'Careful monitoring, medication optimization, symptom tracking, and coordination for patients living with heart failure.',
    details: ['Tracks fluid status, symptoms, and daily stability', 'Refines treatment as needs change'],
    icon: '♡',
  },
  {
    id: 'cardiac-diagnostics',
    title: 'Cardiac Diagnostics',
    copy: 'Advanced cardiovascular testing to clarify symptoms, measure heart function, and guide an accurate care plan.',
    details: ['Brings imaging, rhythm, and clinical findings together', 'Helps patients understand the next best step'],
    icon: '∞',
  },
  {
    id: 'echocardiography',
    title: 'Echocardiography',
    copy: 'Ultrasound imaging that evaluates heart structure, valve function, chamber size, and pumping strength.',
    details: ['Assesses heart function without invasive testing', 'Supports diagnosis and long-term monitoring'],
    icon: '◌',
  },
  {
    id: 'stress-testing',
    title: 'Stress Testing',
    copy: 'Exercise and medically supervised stress testing to evaluate blood flow, symptoms, rhythm, and exercise response.',
    details: ['Pairs symptoms with measurable cardiac response', 'Helps identify ischemia and exercise tolerance'],
    icon: '▵',
  },
  {
    id: 'holter-monitoring',
    title: 'Holter Monitoring',
    copy: 'Ambulatory rhythm monitoring to connect palpitations, dizziness, fainting, or irregular heartbeat symptoms to real data.',
    details: ['Captures rhythm patterns outside the office', 'Clarifies symptom-to-rhythm relationships'],
    icon: '⌁',
  },
  {
    id: 'interventional-cardiology',
    title: 'Interventional Cardiology',
    copy: 'Specialized procedural expertise for coronary interventions, cardiac catheterization, and advanced cardiovascular treatment.',
    details: ['Supports catheterization and coronary intervention planning', 'Coordinates procedure decisions with follow-up care'],
    icon: '✦',
  },
  {
    id: 'vascular-studies',
    title: 'Vascular Studies',
    copy: 'Non-invasive imaging to evaluate blood flow, circulation, and vascular health in the neck, legs, and major vessels.',
    details: ['Evaluates circulation with targeted imaging', 'Guides prevention and treatment decisions'],
    icon: '〜',
  },
  {
    id: 'hypertension-management',
    title: 'Hypertension Management',
    copy: 'Diagnosis, treatment, and follow-up for high blood pressure with attention to long-term cardiovascular risk.',
    details: ['Uses trends to guide treatment decisions', 'Protects heart, kidney, and vascular health over time'],
    icon: '✦',
  },
]


const experienceNotes = [
  {
    title: 'Clear communication',
    meta: 'Patient experience',
    quote: 'Each visit is shaped around clear explanations, practical next steps, and time for patients to understand their heart health.',
  },
  {
    title: 'Personalized care',
    meta: 'Treatment planning',
    quote: 'Care plans are tailored to the patient, the diagnosis, the risk profile, and the goals that matter most in daily life.',
  },
  {
    title: 'Diagnostic accuracy',
    meta: 'Advanced testing',
    quote: 'Symptoms, imaging, rhythm data, and clinical history are brought together so decisions are grounded in the clearest picture possible.',
  },
  {
    title: 'Long-term relationships',
    meta: 'Care continuity',
    quote: 'Cardiology care continues beyond the first test, with follow-up that supports prevention, treatment, and healthier years ahead.',
  },
]

type ServiceVariant = 'diagnostics' | 'prevention' | 'heartfailure' | 'chronic' | 'vascular' | 'wellness' | 'interventional'

const servicePhoneMeta: Record<string, { label: string; title: string; score: string; variant: ServiceVariant }> = {
  'preventive-cardiology': {
    label: 'Prevention plan',
    title: 'Risk markers trending in range',
    score: '2.1%',
    variant: 'prevention',
  },
  'coronary-artery-disease': {
    label: 'CAD review',
    title: 'Symptoms, history, and testing aligned',
    score: 'CAD',
    variant: 'chronic',
  },
  'heart-failure-management': {
    label: 'Care stability',
    title: 'Weight, fluid, and symptoms synced',
    score: '0',
    variant: 'heartfailure',
  },
  'cardiac-diagnostics': {
    label: 'Diagnostic review',
    title: 'Echo, stress, and rhythm data aligned',
    score: '98%',
    variant: 'diagnostics',
  },
  echocardiography: {
    label: 'Echo study',
    title: 'Valve and ventricular function reviewed',
    score: 'EF 62%',
    variant: 'diagnostics',
  },
  'stress-testing': {
    label: 'Stress test',
    title: 'Exercise response and symptoms measured',
    score: '9.4',
    variant: 'wellness',
  },
  'holter-monitoring': {
    label: 'Rhythm monitor',
    title: 'Palpitations matched with rhythm data',
    score: '48h',
    variant: 'chronic',
  },
  'interventional-cardiology': {
    label: 'Procedure plan',
    title: 'Cath, intervention, and follow-up coordinated',
    score: '3D',
    variant: 'interventional',
  },
  'vascular-studies': {
    label: 'Vascular flow',
    title: 'Bilateral arterial signals reviewed',
    score: '1.06',
    variant: 'vascular',
  },
  'hypertension-management': {
    label: 'BP trend',
    title: 'Home and office readings reviewed',
    score: '118',
    variant: 'prevention',
  },
}

const physicians = [
  {
    name: 'Dr. Bapineedu Gondi, MD',
    role: 'Cardiologist',
    image: '/sica-assets/dr-bapineedu-gondi.jpeg',
    description:
      'Experienced cardiologist specializing in cardiovascular disease management, preventive cardiology, hypertension, coronary artery disease, and heart failure.',
  },
  {
    name: 'Dr. Srinivas Manchikalapudi, MD',
    role: 'Interventional Cardiologist',
    image: '/sica-assets/dr-srinivas-manchikalapudi.jpeg',
    description:
      'Interventional cardiologist specializing in coronary interventions, cardiac catheterization, vascular disease treatment, and advanced cardiovascular procedures.',
  },
  {
    name: 'Dr. Surender K. Sandella, MD',
    role: 'Board-Certified Cardiologist',
    image: '/sica-assets/dr-surender-sandella.webp',
    description:
      'Board-certified cardiologist focused on comprehensive heart care, cardiovascular prevention, diagnostics, and long-term patient management.',
  },
]

const clinicalGallery = [
  {
    src: '/sica-assets/cardiovascular-imaging-suite.jpeg',
    alt: 'Cardiovascular imaging suite',
    tag: 'Imaging and procedures',
    cap: 'Testing and procedures are used when they help answer a clear clinical question.',
  },
  {
    src: '/sica-assets/dr-bapineedu-gondi.jpeg',
    alt: 'Dr. Bapineedu Gondi',
    tag: 'Office visits',
    cap: 'Visits start with symptoms, history, medications, and the questions patients bring in.',
  },
  {
    src: '/sica-assets/dr-srinivas-manchikalapudi.jpeg',
    alt: 'Dr. Srinivas Manchikalapudi',
    tag: 'Treatment planning',
    cap: 'When treatment is needed, options are reviewed with attention to safety and follow-up.',
  },
  {
    src: '/sica-assets/medical/stethoscope.png',
    alt: 'Stethoscope on a clean clinical surface',
    tag: 'Exam room basics',
    cap: 'Good cardiology still begins with listening carefully and checking the fundamentals.',
  },
  {
    src: '/sica-assets/medical/bp-monitor.png',
    alt: 'Blood pressure monitor',
    tag: 'Everyday prevention',
    cap: 'Blood pressure trends, home readings, and risk factors help guide long-term prevention.',
  },
]

const whyChooseCards = [
  {
    title: 'Experienced Specialists',
    meta: 'Physician-led care',
    copy: 'Patients are cared for by cardiology specialists with experience across prevention, diagnosis, intervention, and chronic disease management.',
  },
  {
    title: 'Advanced Diagnostics',
    meta: 'Better clarity',
    copy: 'Echo, stress testing, rhythm monitoring, vascular studies, and imaging help create a more complete cardiovascular picture.',
  },
  {
    title: 'Personalized Treatment Plans',
    meta: 'Care built around you',
    copy: "Treatment recommendations are tailored to each patient's symptoms, history, risk factors, and long-term health goals.",
  },
  {
    title: 'Long-Term Heart Health',
    meta: 'Ongoing management',
    copy: 'SICA supports patients through prevention, follow-up, medication optimization, and long-term cardiovascular care.',
  },
]

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
  const meta = servicePhoneMeta[serviceId] || servicePhoneMeta['cardiac-diagnostics']
  const variant = meta.variant

  return (
    <div className="phone-shell phone-shell--light" aria-label="Animated cardiovascular service mockup">
      <div className="phone-sensor" />
      <div className="phone-screen phone-screen--light service-phone-screen">
        <div className="phone-top">
          <span>SICA Digital Portal</span>
          <span>Live Sync</span>
        </div>
        <div className={`phone-service-hero phone-service-hero--${variant}`}>
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
            {variant === 'diagnostics' && (
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

            {variant === 'prevention' && (
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

            {variant === 'heartfailure' && (
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

            {variant === 'chronic' && (
              <div className="screen-content chronic-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>Rhythm Burden</span>
                    <strong>0% events</strong>
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
                  <span>Rhythm clear</span>
                  <span>CAD follow-up</span>
                </div>
              </div>
            )}

            {variant === 'vascular' && (
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
                    <path d="M 0 17 C 10 5, 20 5, 30 17 C 40 30, 50 30, 60 17 C 70 5, 80 5, 90 17" fill="none" stroke="#0A3A78" strokeWidth="2.5" strokeLinecap="round" />
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

            {variant === 'wellness' && (
              <div className="screen-content wellness-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric" style={{ gridColumn: 'span 2' }}>
                    <span>Stress Response</span>
                    <strong>Target achieved</strong>
                  </div>
                </div>
                <div className="screen-wellness-meter">
                  <div className="meter-track"><div className="meter-fill" style={{ width: '82%' }} /></div>
                  <div className="meter-label">Exercise response: reviewed</div>
                </div>
                <div className="screen-pill-row">
                  <span>Symptoms</span>
                  <span>ECG trend</span>
                </div>
                <p className="screen-subtext">Reviewed for cardiovascular risk and symptoms</p>
              </div>
            )}
            {variant === 'interventional' && (
              <div className="screen-content chronic-screen">
                <div className="offers-metric-grid">
                  <div className="offer-metric">
                    <span>Cath review</span>
                    <strong>Planned</strong>
                  </div>
                  <div className="offer-metric">
                    <span>Follow-up</span>
                    <strong>Coordinated</strong>
                  </div>
                </div>
                <div className="screen-logs">
                  <div className="screen-log-row"><span>Coronary anatomy</span><span className="badge checked">Reviewed</span></div>
                  <div className="screen-log-row"><span>Procedure options</span><span className="badge checked">Discussed</span></div>
                  <div className="screen-log-row"><span>Recovery plan</span><span className="badge">Next step</span></div>
                </div>
                <div className="screen-pill-row">
                  <span>Cath lab</span>
                  <span>Vascular care</span>
                </div>
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
          <a className="nav_home" href="#top" aria-label="Southern Indiana Cardiology Associates home">
            <div className="nav_logo-container">
              <div className="logo brand-mark">
                <img src="/sica-assets/sica-mark.png" alt="" />
                <span>SICA</span>
              </div>
            </div>
            <span className="u-sr-only">Southern Indiana Cardiology Associates Home</span>
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
            <video src="/sica-assets/videos/heart-hero.mp4" autoPlay muted loop playsInline />
          </motion.div>
          <div className="hero-vein" />
          <div className="hero-content">
            <Reveal>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.58)' }}>Southern Indiana Cardiology Associates (SICA)</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 style={{ color: '#fff' }}>Advanced Cardiovascular Care. Experienced Specialists. Personalized Treatment.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-copy" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Southern Indiana Cardiology Associates provides comprehensive cardiovascular care through advanced diagnostics,
                preventive cardiology, interventional expertise, and long-term heart health management.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-actions">
                <a className="button primary" href="#contact" style={{ background: 'rgba(255,255,255,0.92)', color: '#111' }}>
                  Request Appointment <ArrowIcon />
                </a>
                <a className="button secondary" href="#providers" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.08)' }}>
                  Meet Our Physicians
                </a>
              </div>
            </Reveal>
          </div>
          <HeartbeatLine className="hero-heartbeat" />
        </section>

        <section id="team" className="team-section">
          <div className="team-copy">
            <p className="eyebrow">About Southern Indiana Cardiology Associates</p>
            <h2>Comprehensive heart care built around prevention, diagnosis, treatment, and long-term management.</h2>
            <div className="doctor-card doctor-card--mobile-inline">
              <img src="/sica-assets/cardiovascular-imaging-suite.jpeg" alt="Cardiovascular imaging suite" />
              <div>
                <span>SICA</span>
                <strong>Patient-centered cardiology</strong>
              </div>
            </div>
            <p>
              Southern Indiana Cardiology Associates is dedicated to delivering comprehensive cardiovascular care
              through prevention, diagnosis, treatment, and long-term disease management. Our physicians combine
              clinical expertise with compassionate care to help patients achieve better heart health and improved
              quality of life.
            </p>
            <p className="team-story-note">
              From first symptoms to ongoing follow-up, SICA focuses on clear communication, diagnostic accuracy,
              practical treatment planning, and lasting patient relationships.
            </p>
            <div className="founder-story-meta" aria-label="SICA care priorities">
              <span><strong>01</strong><small>Prevention and risk reduction</small></span>
              <span><strong>02</strong><small>Advanced diagnostics</small></span>
              <span><strong>03</strong><small>Long-term heart health</small></span>
            </div>
            <blockquote>
              Prevention, early detection, and effective treatment guide every patient relationship.
            </blockquote>
          </div>
          <div className="doctor-card doctor-card--desktop">
            <img src="/sica-assets/cardiovascular-imaging-suite.jpeg" alt="Cardiovascular imaging suite" />
            <div>
              <span>SICA</span>
              <strong>Personalized cardiovascular care</strong>
            </div>
          </div>
          <div className="credential-intro">
            <p className="eyebrow">Clinical Focus</p>
            <h3>Experienced specialists, advanced diagnostics, and care plans built around each patient.</h3>
          </div>
          <div className="credential-strip">
            {[
              'Preventive cardiology',
              'Cardiac diagnostics',
              'Interventional expertise',
              'Heart failure management',
              'Vascular studies',
              'Hypertension management',
              'Long-term monitoring',
              'Patient education',
            ].map((item) => (
              <span key={item}>
                <strong>{item}</strong>
              </span>
            ))}
          </div>
        </section>

        <section id="providers" className="providers-section">
          <div className="section-heading">
            <p className="eyebrow">Our Physicians</p>
            <h2>Meet the Southern Indiana Cardiology Associates team.</h2>
          </div>
          <div className="provider-grid">
            {physicians.map((physician) => (
              <article key={physician.name}>
                <img alt={physician.name} src={physician.image} />
                <div>
                  <span>{physician.role}</span>
                  <h3>{physician.name}</h3>
                  <p>{physician.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CLINICAL CARE GALLERY ─── */}
        <section id="community" className="community-section">
          <div className="section-heading">
            <p className="eyebrow">What Care Looks Like</p>
            <h2>Straightforward heart care, from the first conversation to follow-up.</h2>
            <p>SICA visits are built around practical details: what symptoms mean, which tests are useful, and what the next step should be.</p>
          </div>
          <div className="leadership-proof" aria-label="SICA clinical care highlights">
            <span><strong>Plain-language visits</strong><small>Results are explained clearly, without making the visit feel rushed.</small></span>
            <span><strong>Care built around you</strong><small>Plans are based on symptoms, history, test results, and health goals.</small></span>
            <span><strong>Organized follow-up</strong><small>Medications, testing, and next steps stay connected over time.</small></span>
          </div>
          <div className="gal-grid">
            {clinicalGallery.map((item) => (
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
            <p>From advanced diagnostics to long-term prevention, SICA provides cardiovascular care tailored to each patient&apos;s needs.</p>
          </div>

          <div className="offers-container">
            <div className="offers-mobile-phone">
              <ServicePhoneMockup serviceId={cardiacServices[activeServiceIndex]?.id || 'cardiac-diagnostics'} />
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
                    
                    <ul className="offer-details-list">
                      {svc.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
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
                <ServicePhoneMockup serviceId={cardiacServices[activeServiceIndex]?.id || 'cardiac-diagnostics'} />
              </div>
            </div>
          </div>
        </section>

        <section className="extra-section">
          <div className="extra-copy">
            <p className="eyebrow">Coordinated Care</p>
            <h2>Support that connects diagnosis, treatment, and long-term heart health.</h2>
            <div className="extra-list">
              <button className="extra-item" id="extra-item-0">
                <span>
                  <strong>Stress testing</strong>
                  <small>Exercise and monitored testing to evaluate symptoms, rhythm, blood flow, and cardiac response.</small>
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
                  <strong>Holter monitoring</strong>
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
                  <strong>Preventive cardiology</strong>
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
                  <strong>Heart failure management</strong>
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
                <div className="phone-top"><span>SICA</span><span>Treatment Journey</span></div>
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

        {/* ─── WHY CHOOSE SICA ─── */}
        <section id="news" className="news-section">
          <div className="section-heading">
            <p className="eyebrow">Why Choose SICA</p>
            <h2>Experienced cardiovascular care with clarity, precision, and follow-through.</h2>
            <p>Southern Indiana Cardiology Associates combines specialist expertise, advanced testing, and personalized care planning.</p>
          </div>
          <div className="news-grid">
            {whyChooseCards.map((card, index) => (
              <article className="nc" key={card.title}>
                <div className="nc-body">
                  <div className="ns">
                    <span className="ns-tag def">SICA</span>
                    <span className="ns-yr">0{index + 1}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <div className="nc-link">{card.meta} <ArrowIcon /></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="commitment" className="amma-section">
          <div className="amma-layout">
            <div className="amma-copy">
              <p className="eyebrow">Our Commitment</p>
              <h2>Compassionate, evidence-based cardiovascular care for healthier lives.</h2>
              <p>
                At Southern Indiana Cardiology Associates, our commitment is simple: provide compassionate,
                evidence-based cardiovascular care that helps patients live healthier lives through prevention,
                early detection, and effective treatment.
              </p>
              <p>
                Our physicians support patients with clear communication, advanced diagnostics, personalized
                treatment plans, and long-term management for heart and vascular health.
              </p>
              <blockquote className="amma-quote">
                &quot;Better heart health starts with prevention, accurate diagnosis, and care that stays connected over time.&quot;
                <span>Southern Indiana Cardiology Associates</span>
              </blockquote>
            </div>
            <div className="amma-awards">
              <h3>The SICA promise</h3>
              <ul>
                <li>Listen carefully and communicate clearly.</li>
                <li>Use diagnostics to guide accurate care decisions.</li>
                <li>Build treatment plans around each patient&apos;s needs.</li>
                <li>Support prevention and long-term heart health.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="section-heading">
            <p className="eyebrow">Patient experience</p>
            <h2>Clear communication, personalized care, diagnostic accuracy, and long-term relationships.</h2>
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
            <p>Cardiovascular care is personal. SICA creates a visit experience built around privacy, clarity, accuracy, and steady follow-up.</p>
          </div>
        </section>
        <section id="contact" className="final-cta">
          <div className="final-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>Ready to Take Control of Your Heart Health?</h2>
            <p>
              Schedule a consultation with Southern Indiana Cardiology Associates and receive expert cardiovascular
              care tailored to your needs.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Request Appointment <ArrowIcon />
              </a>
              <a className="button secondary" href="#contact">
                Contact Us
              </a>
            </div>
          </div>
          <div className="final-visual final-visual--three" aria-label="Modern cardiovascular care essentials arranged on a clean white surface">
            <img src="/sica-assets/cta/stethoscope.png" className="cta-object cta-object--stethoscope" alt="Stethoscope" />
            <img src="/sica-assets/cta/bp-monitor-cutout.png" className="cta-object cta-object--bp" alt="Blood pressure monitor" />
            <img src="/sica-assets/cta/smartwatch.png" className="cta-object cta-object--watch" alt="Smartwatch" />
          </div>
        </section>
      </main>

      <div className="footer-wrap">
        <footer className="site-footer">
          {/* Footer content grid */}
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="footer-logo">
                <img src="/sica-assets/sica-logo.jpeg" alt="Southern Indiana Cardiology Associates" />
              </div>
              <p className="footer-tagline">Southern Indiana Cardiology Associates</p>
              <p className="footer-sub">Comprehensive cardiovascular care for Southern Indiana.</p>
            </div>
            <div className="footer-col">
              <strong>Services</strong>
              <a href="#services">Preventive Cardiology</a>
              <a href="#services">Cardiac Diagnostics</a>
              <a href="#services">Interventional Cardiology</a>
              <a href="#services">Heart Failure Management</a>
              <a href="#services">Vascular Studies</a>
              <a href="#services">Hypertension Management</a>
            </div>
            <div className="footer-col">
              <strong>Visit</strong>
              <span>Southern Indiana</span>
              <span>Office details available by appointment</span>
            </div>
            <div className="footer-col">
              <strong>Contact</strong>
              <a href="#contact">Request Appointment</a>
              <a href="#contact">Contact Us</a>
            </div>
            <div className="footer-col">
              <strong>Navigate</strong>
              <a href="#journey">Our Journey</a>
              <a href="#services">Services</a>
              <a href="#providers">Physicians</a>
              <a href="#community">Clinical Care</a>
              <a href="#news">Why SICA</a>
              <a href="#contact">Request Appointment</a>
            </div>
          </div>

          <div className="footer-legal-bar">
            <p>Educational information only. Always consult a qualified healthcare provider for diagnosis and treatment.</p>
            <p>© {currentYear} Southern Indiana Cardiology Associates.</p>
          </div>
        </footer>
        <div className="footer-wordmark">
          <div className="footer-wordmark-inner">
            <span>SICA</span>
          </div>
        </div>
      </div>
    </div>
  )
}
