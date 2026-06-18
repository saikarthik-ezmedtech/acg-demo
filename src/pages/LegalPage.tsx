import type { LegalPageContent } from '../types/site'
import InternalLink from '../components/InternalLink'

export default function LegalPage({
  page,
  onNavigate,
  onOpenCookiePreferences,
}: {
  page: LegalPageContent
  onNavigate: (href: string) => void
  onOpenCookiePreferences: () => void
}) {
  return (
    <section className="legal-page">
      <div className="legal-page-shell">
        <div className="legal-page-hero">
          <p className="eyebrow">Legal</p>
          <h1>{page.title}</h1>
          <p className="legal-page-meta">
            {page.effectiveDate ? `Effective date: ${page.effectiveDate} | ` : ''}
            Last updated: {page.lastUpdated}
          </p>
          <p className="legal-page-intro">{page.intro}</p>
          {page.notice && <p className="legal-page-notice">{page.notice}</p>}
        </div>

        <article className="legal-card">
          <div className="legal-card__stack">
            {page.sections.map((section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                <div className={`legal-section__copy${section.tone ? ` is-${section.tone}` : ''}`}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.listItems && (
                    <ul>
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        {page.path === '/cookie-policy' && (
          <div className="legal-page-actions">
            <button type="button" className="button primary" onClick={onOpenCookiePreferences}>
              Change Cookie Preferences
            </button>
            <InternalLink className="button secondary" href="/privacy-policy" onNavigate={onNavigate}>
              Privacy Policy
            </InternalLink>
          </div>
        )}
      </div>
    </section>
  )
}
