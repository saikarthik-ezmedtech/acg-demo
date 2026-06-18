import { AnimatePresence, motion } from 'framer-motion'
import { servicePhoneMeta } from '../data/siteContent'

export default function ServicePhoneMockup({ serviceId }: { serviceId: string }) {
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
                    <i
                      key={j}
                      style={{
                        height: `${[12, 14, 12, 26, 44, 34, 16, 12, 10, 92, 15, 36, 22, 14, 12, 34, 46, 33, 14, 16, 20, 18][j]}%`,
                        animationDelay: `${j * 0.04}s`,
                      }}
                    />
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
                  <div className="screen-log-row">
                    <span>Morning Meds</span>
                    <span className="badge checked">✓ Taken</span>
                  </div>
                  <div className="screen-log-row">
                    <span>Evening Meds</span>
                    <span className="badge checked">✓ Taken</span>
                  </div>
                  <div className="screen-log-row">
                    <span>Symp. Log</span>
                    <span className="badge">No events</span>
                  </div>
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
                    <path
                      d="M 0 17 C 10 5, 20 5, 30 17 C 40 30, 50 30, 60 17 C 70 5, 80 5, 90 17"
                      fill="none"
                      stroke="#0A3A78"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
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
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: '82%' }} />
                  </div>
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
                  <div className="screen-log-row">
                    <span>Coronary anatomy</span>
                    <span className="badge checked">Reviewed</span>
                  </div>
                  <div className="screen-log-row">
                    <span>Procedure options</span>
                    <span className="badge checked">Discussed</span>
                  </div>
                  <div className="screen-log-row">
                    <span>Recovery plan</span>
                    <span className="badge">Next step</span>
                  </div>
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
