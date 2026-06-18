import type { MutableRefObject, ReactNode } from 'react'
import { motion, type MotionValue, type Variants } from 'framer-motion'
import HeartbeatLine from '../components/HeartbeatLine'
import ServicePhoneMockup from '../components/ServicePhoneMockup'
import InternalLink from '../components/InternalLink'
import { ArrowIcon, MapPinIcon, PhoneIcon } from '../components/icons'
import { experienceNotes, physicianCards, serviceFeatures, whyChooseCards } from '../data/siteContent'
import { getDiagnosticTestingPath, getPhysicianPath } from '../lib/routing'
import { HeroPhysicianCollage } from './PhysicianProfilePage'

const reveal: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(16px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: 'easeOut' },
  },
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

function StarRow() {
  return (
    <div className="star-row" role="img" aria-label="Five star experience">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.2 14.9 8.4l6.7.8-4.9 4.7 1.3 6.6-6-3.3-6 3.3 1.3-6.6-4.9-4.7 6.7-.8L12 2.2Z" />
        </svg>
      ))}
    </div>
  )
}

type HomePageProps = {
  heroLift: MotionValue<number>
  heroOpacity: MotionValue<number>
  activeServiceIndex: number
  cardRefs: MutableRefObject<(HTMLElement | null)[]>
  onNavigate: (href: string) => void
  onOpenAppointment: () => void
}

export default function HomePage({
  heroLift,
  heroOpacity,
  activeServiceIndex,
  cardRefs,
  onNavigate,
  onOpenAppointment,
}: HomePageProps) {
  return (
    <>
      <section className="hero-section">
        <motion.div className="hero-bg" style={{ y: heroLift, opacity: heroOpacity }}>
          <video src="/sica-assets/videos/heart-hero.mp4" autoPlay muted loop playsInline />
        </motion.div>
        <div className="hero-vein" />
        <div className="hero-shell">
          <div className="hero-content">
            <Reveal delay={0.08}>
              <h1>
                <span>Expert Cardiovascular Care.</span>
                <span>Experienced Specialists.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-copy">
                Now welcoming new patients for comprehensive cardiovascular evaluation, treatment, and long-term heart
                health management.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-actions">
                <button type="button" className="button primary" onClick={onOpenAppointment}>
                  Request Appointment <ArrowIcon />
                </button>
                <InternalLink className="button secondary" href="#providers" onNavigate={onNavigate}>
                  Meet Our Physicians
                </InternalLink>
              </div>
            </Reveal>
          </div>
          <div className="hero-visual">
            <HeroPhysicianCollage />
          </div>
        </div>
        <HeartbeatLine className="hero-heartbeat" />
      </section>

      <section id="providers" className="providers-section">
        <div className="section-heading">
          <p className="eyebrow">Our Physicians</p>
          <h2>Meet the Southern Indiana Cardiology Associates team.</h2>
        </div>
        <div className="provider-grid">
          {physicianCards.map((physician) => (
            <article key={physician.name}>
              <img alt={physician.name} src={physician.image} />
              <div>
                <span>{physician.role}</span>
                <h3>{physician.cardName}</h3>
                <p>{physician.description}</p>
                <InternalLink className="provider-link" href={getPhysicianPath(physician.id)} onNavigate={onNavigate}>
                  View Full Profile <ArrowIcon />
                </InternalLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="offers-section">
        <div className="offers-header">
          <h2>
            <span>Services</span>
            Cardiology Care
          </h2>
          <p>
            Cardiology care organized around prevention, chronic management, and testing, with the right visit, the
            right follow-up, and the right diagnostic test for each question we need to answer.
          </p>
        </div>

        <div className="offers-container">
          <div className="offers-mobile-phone">
            <ServicePhoneMockup serviceId={serviceFeatures[activeServiceIndex]?.mockupId || 'cardiac-diagnostics'} />
          </div>

          <div className="offers-left">
            {serviceFeatures.map((service, index) => (
              <motion.article
                key={service.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                data-index={index}
                className={`offer-scroll-card ${index === activeServiceIndex ? 'is-active' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="offer-row-content">
                  <div className="offer-title-row">
                    <span className="offer-icon">{service.icon}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="offer-copy">{service.copy}</p>
                  <ul className="offer-details-list">
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {service.id === 'diagnostic-testing' && (
                    <InternalLink className="offer-education-link" href={getDiagnosticTestingPath()} onNavigate={onNavigate}>
                      Click here to know more about these tests <ArrowIcon />
                    </InternalLink>
                  )}
                </div>
                <div className="offer-card-phone">
                  <ServicePhoneMockup serviceId={service.mockupId} />
                </div>
              </motion.article>
            ))}
          </div>

          <div className="offers-right">
            <div className="offers-phone-sticky">
              <ServicePhoneMockup serviceId={serviceFeatures[activeServiceIndex]?.mockupId || 'cardiac-diagnostics'} />
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="news-section">
        <div className="section-heading">
          <p className="eyebrow">Why Choose SICA</p>
          <h2>Experienced cardiovascular care with clarity, precision, and follow-through.</h2>
          <p>Southern Indiana Cardiology Associates combines specialist expertise, advanced testing, and personalized care planning.</p>
        </div>
        <div className="news-grid">
          {whyChooseCards.map((card) => (
            <article className="nc" key={card.title}>
              <img className="nc-media" src={card.image} alt={card.imageAlt} loading="lazy" decoding="async" />
              <div className="nc-scrim" />
              <div className="nc-body">
                <div className="ns">
                  <span className="ns-tag def">{card.meta}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
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
              At Southern Indiana Cardiology Associates, our commitment is simple: provide compassionate, evidence-based
              cardiovascular care that helps patients live healthier lives through prevention, early detection, and
              effective treatment.
            </p>
            <p>
              Our physicians support patients with clear communication, advanced diagnostics, personalized treatment
              plans, and long-term management for heart and vascular health.
            </p>
            <blockquote className="amma-quote">
              &quot;Better heart health starts with prevention, accurate diagnosis, and care that stays connected over
              time.&quot;
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

      <section id="visit-us" className="office-section">
        <div className="office-section__content">
          <div>
            <p className="eyebrow office-section__eyebrow">Find Us</p>
            <h2>Visit Southern Indiana Cardiology Associates</h2>
            <p className="office-section__lead">
              Conveniently located in New Albany, Indiana, with easy access for patients across Southern Indiana.
            </p>
          </div>
          <dl className="office-section__details">
            <div>
              <dt>Office address</dt>
              <dd>
                <span>2109 Green Valley Road</span>
                <span>New Albany</span>
                <span>Indiana 47150</span>
              </dd>
            </div>
            <div>
              <dt>Telephone</dt>
              <dd>
                <a href="tel:8129247065">812-924-7065</a>
              </dd>
            </div>
          </dl>
          <div className="office-section__actions">
            <button type="button" className="button primary" onClick={onOpenAppointment}>
              Request Appointment <ArrowIcon />
            </button>
            <a
              href="https://maps.google.com/?q=2109+Green+Valley+Road+New+Albany+Indiana+47150"
              className="button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions <MapPinIcon />
            </a>
          </div>
        </div>
        <div className="office-section__map">
          <iframe
            title="Southern Indiana Cardiology Associates location"
            src="https://maps.google.com/maps?q=2109+Green+Valley+Road+New+Albany+Indiana+47150&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="privacy-section">
        <div className="privacy-card">
          <div className="privacy-lock" />
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
            Schedule a consultation with Southern Indiana Cardiology Associates and receive expert cardiovascular care
            tailored to your needs.
          </p>
          <div className="hero-actions">
            <button type="button" className="button primary" onClick={onOpenAppointment}>
              Request Appointment <ArrowIcon />
            </button>
            <a className="button secondary" href="tel:8129247065" aria-label="Call Southern Indiana Cardiology Associates at 812-924-7065">
              Contact Us <PhoneIcon />
            </a>
          </div>
        </div>
        <div className="final-visual final-visual--three" aria-label="Modern cardiovascular care essentials arranged on a clean white surface">
          <img src="/sica-assets/cta/stethoscope.png" className="cta-object cta-object--stethoscope" alt="Stethoscope" />
          <img src="/sica-assets/cta/bp-monitor-cutout.png" className="cta-object cta-object--bp" alt="Blood pressure monitor" />
          <img src="/sica-assets/cta/smartwatch.png" className="cta-object cta-object--watch" alt="Smartwatch" />
        </div>
      </section>
    </>
  )
}
