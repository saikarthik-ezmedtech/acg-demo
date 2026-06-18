import { diagnosticTests } from '../data/siteContent'
import InternalLink from '../components/InternalLink'
import { ArrowIcon, PhoneIcon } from '../components/icons'

function DiagnosticMedia({ test }: { test: (typeof diagnosticTests)[number] }) {
  return (
    <figure className={`diagnostic-zigzag-card__media diagnostic-zigzag-card__media--${test.id}`}>
      <img src={test.media.src} alt={test.media.label} loading="lazy" decoding="async" />
    </figure>
  )
}

export default function DiagnosticTestingPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section className="diagnostic-page">
      <div className="diagnostic-page-shell">
        <div className="diagnostic-page-hero">
          <div>
            <p className="eyebrow">Diagnostic Testing</p>
            <h1>Heart testing explained in a clearer, more patient-friendly way.</h1>
            <p>
              When symptoms, risk factors, or prior findings need a closer look, testing helps answer a specific
              question. Each study below is used to improve clarity around rhythm, blood flow, heart structure, or
              circulation and to help guide the next step in care.
            </p>
            <div className="diagnostic-page-hero__actions">
              <InternalLink href="/#contact" onNavigate={onNavigate} className="button primary">
                Request Appointment <ArrowIcon />
              </InternalLink>
              <a href="tel:8129482232" className="button secondary">
                Call Office <PhoneIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="diagnostic-zigzag-list">
          {diagnosticTests.map((test, index) => (
            <article className={`diagnostic-zigzag-card${index % 2 === 1 ? ' is-reversed' : ''}`} key={test.id}>
              <DiagnosticMedia test={test} />
              <div className="diagnostic-zigzag-card__content">
                <p className="diagnostic-kicker">{test.visualLabel}</p>
                <h2>{test.title}</h2>
                <div className="diagnostic-zigzag-card__copy">
                  <div>
                    <h3>What is it?</h3>
                    <p>{test.what}</p>
                  </div>
                  <div>
                    <h3>Why is it performed?</h3>
                    <p>{test.why}</p>
                  </div>
                  <div>
                    <h3>What to expect?</h3>
                    <p>{test.expect}</p>
                  </div>
                  <div>
                    <h3>Preparation</h3>
                    <p>{test.prep}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="physician-profile-final-cta diagnostic-page-final-cta">
          <div>
            <p className="eyebrow">Need Help Deciding?</p>
            <h2>We can help determine which test makes sense for your symptoms.</h2>
            <p>
              Diagnostic testing is most useful when it answers a clear clinical question. Our team can help match
              symptoms, history, and risk factors to the right next step.
            </p>
          </div>
          <div className="physician-profile-final-cta__actions">
            <InternalLink href="/#contact" onNavigate={onNavigate} className="button primary">
              Request Appointment <ArrowIcon />
            </InternalLink>
            <InternalLink href={`/#services`} onNavigate={onNavigate} className="button secondary">
              Back to Services
            </InternalLink>
          </div>
        </section>
      </div>
    </section>
  )
}
