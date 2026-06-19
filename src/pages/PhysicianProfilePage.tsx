import { useEffect, useState } from 'react'
import { physicianCards, profileSectionLinks } from '../data/siteContent'
import { getPhysicianPath } from '../lib/routing'
import type { Physician } from '../types/site'
import InternalLink from '../components/InternalLink'
import { ArrowIcon, PhoneIcon } from '../components/icons'

function getPhysicianLastNameLabel(physician: Physician) {
  const [namePart] = physician.name.split(',')
  const lastName = namePart.trim().split(/\s+/).at(-1) ?? namePart.trim()
  return `Dr. ${lastName}`
}

function getPhysicianProfileHeading(physician: Physician) {
  const credentials = physician.name.split(',').slice(1).join(',').trim()
  const label = getPhysicianLastNameLabel(physician)
  return credentials ? `${label}, ${credentials}` : label
}

function getPhysicianCardNameParts(physician: Physician) {
  const [namePart, ...credentialParts] = physician.cardName.split(',')
  return {
    namePart: namePart.trim(),
    credentials: credentialParts.join(',').trim(),
  }
}

export default function PhysicianProfilePage({
  physician,
  onNavigate,
  onOpenAppointment,
}: {
  physician: Physician
  onNavigate: (href: string) => void
  onOpenAppointment: () => void
}) {
  const [activeSection, setActiveSection] = useState(profileSectionLinks[0].id)

  useEffect(() => {
    const sections = profileSectionLinks
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="physician-profile-page">
      <div className="physician-profile-shell">
        <div className="physician-profile-hero">
          <div className="physician-profile-hero__content">
            <h1>{getPhysicianProfileHeading(physician)}</h1>
            <span className="physician-profile-hero__role">{physician.role}</span>
            <p>{physician.description}</p>
            <div className="physician-profile-hero__actions">
              <button type="button" className="button primary" onClick={onOpenAppointment}>
                Request Appointment <ArrowIcon />
              </button>
              <a href="tel:8129482232" className="button secondary">
                Call Office <PhoneIcon />
              </a>
            </div>
            <div className="physician-profile-trust physician-profile-trust--hero">
              <span>Board Certified</span>
              <span>{physician.experienceLabel}</span>
              <span>{physician.role}</span>
            </div>
          </div>
          <div className="physician-profile-hero__media">
            <img src={physician.image} alt={physician.name} />
          </div>
        </div>

        <div className="physician-profile-layout">
          <main className="physician-profile-main">
            <section id="physician-overview" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Overview</h2>
              </div>
              <div className="physician-profile-copy">
                {physician.biography.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="physician-philosophy" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Philosophy of care</h2>
              </div>
              <div className="physician-profile-copy">
                <p>{physician.philosophy}</p>
              </div>
            </section>

            <section id="physician-conditions" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Clinical focus and procedures</h2>
              </div>
              <ul className="physician-simple-list">
                {physician.specialInterests.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="physician-education" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Education</h2>
              </div>
              <div className="physician-simple-timeline">
                {physician.education.map((item) => (
                  <div className="physician-simple-timeline__item" key={item}>
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="physician-certifications" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Board certifications</h2>
              </div>
              <ul className="physician-simple-list">
                {physician.boardCertifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="physician-memberships" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Professional memberships</h2>
              </div>
              <ul className="physician-simple-list">
                {physician.memberships.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="physician-faq" className="physician-profile-section">
              <div className="physician-section-heading physician-section-heading--left">
                <h2>Frequently asked questions</h2>
              </div>
              <div className="physician-faq-list physician-faq-list--simple">
                {physician.faqs.map((item) => (
                  <article className="physician-faq-card physician-faq-card--simple" key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <aside className="physician-profile-sidebar">
            <nav className="physician-profile-sidebar__nav" aria-label={`${getPhysicianProfileHeading(physician)} profile sections`}>
              <ol>
                {profileSectionLinks.map((item) => (
                  <li key={item.id}>
                    <InternalLink
                      href={`${window.location.pathname}#${item.id}`}
                      onNavigate={onNavigate}
                      className={activeSection === item.id ? 'is-current' : ''}
                    >
                      {item.label}
                    </InternalLink>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <section className="physician-profile-final-cta physician-profile-final-cta--simple">
          <div>
            <p className="eyebrow">Request an Appointment</p>
            <h2>Take the next step with trusted cardiovascular care.</h2>
            <p>
              Request a visit with {getPhysicianLastNameLabel(physician)} and our office will help coordinate the right next step
              for evaluation, treatment, or follow-up.
            </p>
          </div>
          <div className="physician-profile-final-cta__actions">
            <button type="button" className="button primary" onClick={onOpenAppointment}>
              Request Appointment <ArrowIcon />
            </button>
            <a href="tel:8129482232" className="button secondary">
              Call Office <PhoneIcon />
            </a>
          </div>
        </section>
      </div>
    </section>
  )
}

export function HeroPhysicianCollage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div id="providers" className="provider-grid hero-provider-grid" aria-label="Southern Indiana Cardiology Associates physician team">
      {physicianCards.map((physician) => (
        <article key={physician.name}>
          <img alt={physician.name} src={physician.image} loading={physician.id === 'gondi' ? 'eager' : 'lazy'} decoding="async" />
          <div>
            <span>{physician.role}</span>
            <h2>
              <span className="provider-name-main">{getPhysicianCardNameParts(physician).namePart}</span>
              {getPhysicianCardNameParts(physician).credentials && (
                <span className="provider-name-credentials">{getPhysicianCardNameParts(physician).credentials}</span>
              )}
            </h2>
            <p>{physician.description}</p>
            <InternalLink className="provider-link" href={getPhysicianPath(physician.id)} onNavigate={onNavigate}>
              View Full Profile <ArrowIcon />
            </InternalLink>
          </div>
        </article>
      ))}
    </div>
  )
}
