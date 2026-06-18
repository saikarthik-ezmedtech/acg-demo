import { isHomePath } from '../lib/routing'
import InternalLink from './InternalLink'

type SiteFooterProps = {
  pathname: string
  currentYear: number
  onNavigate: (href: string) => void
  onOpenCookiePreferences: () => void
}

export default function SiteFooter({
  pathname,
  currentYear,
  onNavigate,
  onOpenCookiePreferences,
}: SiteFooterProps) {
  return (
    <div className="footer-wrap">
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img alt="Southern Indiana Cardiology Associates" src="/sica-assets/sica-logo-full.png" />
            </div>
            <p className="footer-tagline">Southern Indiana Cardiology Associates</p>
            <p className="footer-sub">Comprehensive cardiovascular care for Southern Indiana.</p>
          </div>
          <div className="footer-col footer-col--services">
            <strong>Services</strong>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Preventive Cardiology</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Cardiac Diagnostics</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Interventional Cardiology</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Heart Failure Management</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Vascular Studies</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Hypertension Management</InternalLink>
          </div>
          <div className="footer-col footer-col--visit">
            <strong>Visit</strong>
            <div className="footer-mini-stack">
              <span className="footer-inline-text">Southern Indiana</span>
              <span className="footer-inline-text">Office details available by appointment</span>
            </div>
          </div>
          <div className="footer-col footer-col--contact">
            <strong>Contact</strong>
            <InternalLink href={isHomePath(pathname) ? '#contact' : '/#contact'} onNavigate={onNavigate}>Request Appointment</InternalLink>
            <a className="footer-inline-text" href="tel:8129247065">Contact Us</a>
            <span className="footer-inline-text">Fax: 812-924-7094</span>
          </div>
          <div className="footer-col footer-col--navigate">
            <strong>Navigate</strong>
            <InternalLink href={isHomePath(pathname) ? '#services' : '/#services'} onNavigate={onNavigate}>Services</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#providers' : '/#providers'} onNavigate={onNavigate}>Physicians</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#community' : '/#community'} onNavigate={onNavigate}>Clinical Care</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#news' : '/#news'} onNavigate={onNavigate}>Why SICA</InternalLink>
            <InternalLink href={isHomePath(pathname) ? '#contact' : '/#contact'} onNavigate={onNavigate}>Request Appointment</InternalLink>
          </div>
          <div className="footer-col footer-col--legal">
            <strong>Legal</strong>
            <InternalLink href="/terms-of-use" onNavigate={onNavigate}>Terms of Use</InternalLink>
            <InternalLink href="/privacy-policy" onNavigate={onNavigate}>Privacy Policy</InternalLink>
            <InternalLink href="/cookie-policy" onNavigate={onNavigate}>Cookie Policy</InternalLink>
            <div className="footer-secondary-row">
              <button type="button" className="footer-link-button" onClick={onOpenCookiePreferences}>
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>

        <div className="footer-legal-bar">
          <p>
            Educational information only. Always consult a qualified healthcare provider for diagnosis and treatment.{' '}
            <InternalLink href="/terms-of-use" onNavigate={onNavigate}>Terms</InternalLink>
            {' · '}
            <InternalLink href="/privacy-policy" onNavigate={onNavigate}>Privacy</InternalLink>
            {' · '}
            <InternalLink href="/cookie-policy" onNavigate={onNavigate}>Cookies</InternalLink>
          </p>
          <p>© {currentYear} Southern Indiana Cardiology Associates.</p>
        </div>
      </footer>
    </div>
  )
}
