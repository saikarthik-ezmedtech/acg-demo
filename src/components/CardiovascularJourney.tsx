import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

// ECG bar heights simulating a real PQRST waveform pattern for the diagnostics card
const ECG_HEIGHTS = [
  12, 14, 12, 26, 44, 34, 16, 12, 10, 92, 15, 36, 22,
  14, 12, 34, 46, 33, 14, 16, 20, 18, 14, 12, 18, 22, 14, 12,
]

interface MedCard {
  id: string
  label: string
  value: string
  sub: string
  badge: string
  style: React.CSSProperties
  initialX: number
  initialY: number
  hasWave?: boolean
  wide?: boolean
  live?: boolean
}

interface Chapter {
  id: string
  kicker: string
  headline: string[]
  copy: string
  video: string
  overlay: string
  isLight?: boolean
  cards: MedCard[]
}

const chapters: Chapter[] = [
  // ─────────────────────────────────────────────
  // CHAPTER 1 — Prevention
  // ─────────────────────────────────────────────
  {
    id: 'prevention',
    kicker: '01 — Prevention',
    headline: ['Catch heart disease', 'before it catches you.'],
    copy: 'Risk assessment starts with the full picture: blood pressure, cholesterol, diabetes risk, family history, lifestyle, and symptoms translated into a plan before trouble escalates.',
    video: '/acg-assets/videos/prevention.mp4',
    overlay:
      'linear-gradient(128deg, rgba(12,24,20,0.92) 0%, rgba(14,26,22,0.72) 52%, rgba(49,95,82,0.62) 100%)',
    cards: [
      {
        id: 'bp',
        label: 'Blood Pressure',
        value: '118 / 74',
        sub: 'Optimal range · At rest',
        badge: '↓ Improving',
        style: { top: '13vh', right: '6%' },
        initialX: 58,
        initialY: -22,
      },
      {
        id: 'risk',
        label: '5-Year Risk Score',
        value: 'Low · 2.1%',
        sub: 'Calculated from 6 factors',
        badge: '↓ Trending down',
        style: { top: '40vh', right: '2%' },
        initialX: 68,
        initialY: 0,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // CHAPTER 2 — Diagnostics
  // ─────────────────────────────────────────────
  {
    id: 'diagnostics',
    kicker: '02 — Diagnostics',
    headline: ['Precision imaging.', 'Real rhythm.', 'Vascular clarity.'],
    copy: 'Testing should reduce uncertainty. Echo, stress testing, vascular ultrasound, and rhythm monitoring are organized into one clear clinical picture.',
    video: '/acg-assets/videos/diagnostics.mp4',
    overlay:
      'linear-gradient(152deg, rgba(6,12,16,0.96) 0%, rgba(18,28,38,0.78) 52%, rgba(185,106,98,0.48) 100%)',
    cards: [
      {
        id: 'ecg',
        label: 'ECG — Live Rhythm',
        value: 'Normal sinus',
        sub: '68 bpm · Regular pattern',
        badge: '● Live',
        style: { top: '9vh', right: '2%' },
        initialX: 68,
        initialY: -26,
        hasWave: true,
        wide: true,
        live: true,
      },
      {
        id: 'echo',
        label: 'Echocardiogram',
        value: 'EF 62%',
        sub: 'Normal LV function',
        badge: '✓ Clear',
        style: { bottom: '30vh', right: '16%' },
        initialX: 60,
        initialY: 22,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // CHAPTER 3 — Intervention
  // ─────────────────────────────────────────────
  {
    id: 'intervention',
    kicker: '03 — Intervention',
    headline: ['Treatment planning.', 'Human-centered care.'],
    copy: 'When treatment is needed, the plan stays specific: medication strategy, procedural guidance, vascular care, and follow-up matched to your cardiovascular story.',
    video: '/acg-assets/videos/intelligence.mp4',
    overlay:
      'linear-gradient(142deg, rgba(8,13,22,0.95) 0%, rgba(22,32,54,0.78) 52%, rgba(72,110,155,0.48) 100%)',
    cards: [
      {
        id: 'plan',
        label: 'Treatment Plan',
        value: 'Personalized',
        sub: '3 active protocols',
        badge: 'In progress',
        style: { top: '16vh', right: '4%' },
        initialX: 60,
        initialY: -22,
      },
      {
        id: 'med',
        label: 'Medication',
        value: 'Optimized',
        sub: 'Side-effect monitored',
        badge: '✓ Adjusted',
        style: { top: '43vh', right: '2%' },
        initialX: 70,
        initialY: 0,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // CHAPTER 4 — Long-Term Monitoring (light theme)
  // ─────────────────────────────────────────────
  {
    id: 'monitoring',
    kicker: '04 — Long-Term Monitoring',
    headline: ['Built for lifelong', 'heart health.'],
    copy: 'Ongoing care keeps your heart story visible. Symptoms, medications, trends, and follow-up are reviewed over time so subtle changes are not missed.',
    video: '/acg-assets/videos/followup.mp4',
    overlay:
      'linear-gradient(130deg, rgba(10,18,15,0.94) 0%, rgba(14,26,22,0.78) 52%, rgba(49,95,82,0.58) 100%)',
    cards: [
      {
        id: 'next',
        label: 'Next Review',
        value: 'June 2026',
        sub: 'Annual Cardiac Wellness',
        badge: 'Scheduled',
        style: { top: '15vh', right: '4%' },
        initialX: 55,
        initialY: -26,
      },
      {
        id: 'trend',
        label: 'Cardiac Trend',
        value: 'Stable',
        sub: '18-month trajectory',
        badge: '↔ Consistent',
        style: { top: '41vh', right: '2%' },
        initialX: 65,
        initialY: 0,
      },
    ],
  },
]

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function CardiovascularJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Per-segment progress fills — clamped 0→1 within each 25% slice
  const seg0 = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const seg1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const seg2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const seg3 = useTransform(scrollYProgress, [0.75, 1.0], [0, 1])
  const segFills = [seg0, seg1, seg2, seg3]

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(3, Math.floor(v * 4))
    setChapter(idx)
  })

  const current = chapters[chapter]
  const isLight = !!current.isLight

  return (
    <section
      ref={containerRef}
      className="cv-journey"
      id="journey"
      aria-label="Cardiovascular care journey — scroll to explore"
    >
      <div className="cv-stage">
        {/* ── Layer 0: Background videos (all play, only active visible) ── */}
        <div className="cv-bg-layer" aria-hidden="true">
          {chapters.map((ch, i) => (
            <video
              key={ch.id}
              src={ch.video}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
              className="cv-video"
              style={{ opacity: i === chapter ? 1 : 0 }}
            />
          ))}
        </div>

        {/* ── Layer 1: Film grain overlay ── */}
        <div className="cv-grain" aria-hidden="true" />

        {/* ── Layer 2: Atmospheric gradient (chapter-specific) ── */}
        <AnimatePresence>
          <motion.div
            key={`ov-${chapter}`}
            className="cv-overlay"
            style={{ background: current.overlay }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </AnimatePresence>

        {/* ── Layer 3: Giant background chapter number ── */}
        <AnimatePresence>
          <motion.div
            key={`bgnum-${chapter}`}
            className="cv-bg-number"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.9 }}
            aria-hidden="true"
          >
            0{chapter + 1}
          </motion.div>
        </AnimatePresence>

        {/* ── Layer 4: Editorial copy (kicker + headline + copy) ── */}
        <div className="cv-copy-region">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${chapter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              {/* Chapter kicker */}
              <motion.span
                className="cv-kicker"
                style={{ color: isLight ? 'rgba(23,25,28,0.50)' : 'rgba(255,255,255,0.52)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.48 }}
              >
                {current.kicker}
              </motion.span>

              {/* Main headline — word-by-line stagger */}
              <motion.h2
                className="cv-headline"
                style={{ color: isLight ? 'var(--ink)' : '#ffffff' }}
                initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.12, duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.headline.map((line, i) => (
                  <span key={i} className="cv-headline-line">{line}</span>
                ))}
              </motion.h2>

              {/* Sub-copy */}
              <motion.p
                className="cv-subtext"
                style={{ color: isLight ? 'rgba(23,25,28,0.60)' : 'rgba(255,255,255,0.60)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.62 }}
              >
                {current.copy}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Layer 5: Floating medical cards ── */}
        <AnimatePresence>
          {current.cards.map((card, i) => (
            <motion.article
              key={`${chapter}-${card.id}`}
              className={[
                'med-card',
                isLight ? 'med-card--light' : 'med-card--dark',
                card.wide ? 'med-card--wide' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                position: 'absolute',
                zIndex: 8,
                ...card.style,
              }}
              initial={{
                x: card.initialX,
                y: card.initialY,
                opacity: 0,
                filter: 'blur(12px)',
                scale: 0.96,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                filter: 'blur(8px)',
                transition: { duration: 0.22 },
              }}
              transition={{
                delay: 0.20 + i * 0.13,
                duration: 0.72,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.5 },
                filter: { duration: 0.55 },
              }}
            >
              <span className="med-card-label">{card.label}</span>
              <strong className="med-card-value">{card.value}</strong>
              {card.hasWave && (
                <div className="med-card-waveform" aria-hidden="true">
                  {ECG_HEIGHTS.map((h, j) => (
                    <i
                      key={j}
                      style={{
                        height: `${h}%`,
                        animationDelay: `${j * 0.045}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              <span className="med-card-sub">{card.sub}</span>
              <span
                className={[
                  'med-card-badge',
                  card.live ? 'med-card-badge--live' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {card.badge}
              </span>
            </motion.article>
          ))}
        </AnimatePresence>

        {/* ── Layer 6: Scroll hint (chapter 0 only) ── */}
        <motion.div
          className="cv-scroll-hint"
          animate={{ opacity: chapter === 0 ? 1 : 0 }}
          transition={{ duration: 0.55 }}
          aria-hidden="true"
        >
          <span>Explore</span>
          <div className="cv-scroll-arrow" />
        </motion.div>

        {/* ── Layer 7: Bottom progress bar ── */}
        <div
          className={['cv-progress', isLight ? 'cv-progress--light' : ''].filter(Boolean).join(' ')}
        >
          <div className="cv-progress-segs">
            {segFills.map((fill, i) => (
              <div key={i} className="cv-progress-seg">
                <motion.div
                  className="cv-progress-fill"
                  style={{ scaleX: fill, transformOrigin: 'left center' }}
                />
              </div>
            ))}
          </div>
          <motion.span
            key={`label-${chapter}`}
            className="cv-progress-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {current.kicker}
          </motion.span>
        </div>
      </div>
    </section>
  )
}
