import { navItems } from '../data/siteContent'
import { isHomePath } from '../lib/routing'
import InternalLink from './InternalLink'
import { ArrowIcon, PhoneIcon } from './icons'

type SiteHeaderProps = {
  pathname: string
  navOpen: boolean
  onToggleNav: () => void
  onCloseNav: () => void
  onNavigate: (href: string) => void
  onOpenAppointment: () => void
}

export default function SiteHeader({
  pathname,
  navOpen,
  onToggleNav,
  onCloseNav,
  onNavigate,
  onOpenAppointment,
}: SiteHeaderProps) {
  return (
    <>
      <header className="navigation">
        <div className={`nav_layout-2${navOpen ? ' is-open' : ''}`}>
          <InternalLink className="nav_home" href="/" onNavigate={onNavigate} aria-label="Southern Indiana Cardiology Associates home">
            <div className="nav_logo-container">
              <div className="logo brand-mark">
                <img src="/sica-assets/sica-symbol.png" alt="Southern Indiana Cardiology Associates" />
                <span className="nav-brand-copy">
                  <strong>
                    <span>Southern Indiana</span>
                    <span>Cardiology Associates</span>
                  </strong>
                </span>
              </div>
            </div>
            <span className="u-sr-only">Southern Indiana Cardiology Associates Home</span>
          </InternalLink>

          <div className="nav_main-wrapper">
            <div className="nav_main">
              <div className="nav_main-inner">
                {navItems.map((item) => (
                  <InternalLink
                    key={item.href}
                    href={isHomePath(pathname) ? item.href : `/${item.href}`}
                    className="navigation_link"
                    onClick={onCloseNav}
                    onNavigate={onNavigate}
                  >
                    {item.label}
                  </InternalLink>
                ))}
              </div>
              <div className="nav-actions">
                <a className="nav-phone" href="tel:8129247065" aria-label="Call Southern Indiana Cardiology Associates at 812-924-7065">
                  <PhoneIcon />
                  <span>812-924-7065</span>
                </a>
                <button type="button" className="nav-cta btn cc-navigation" onClick={onOpenAppointment}>
                  Request Appointment <ArrowIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="nav_right">
            <a className="nav-mobile-phone" href="tel:8129247065" aria-label="Call Southern Indiana Cardiology Associates at 812-924-7065">
              <PhoneIcon />
            </a>
            <button
              className={`nav_menu-2 nav-menu-btn${navOpen ? ' is-open' : ''}`}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={navOpen}
              onClick={onToggleNav}
            >
              <span className="nav_menu-line nav-menu-line cc-bottom" />
              <span className="nav_menu-line nav-menu-line cc-middle" />
              <span className="nav_menu-line nav-menu-line cc-top" />
            </button>
          </div>

          <div className={`nav-mobile-panel${navOpen ? ' is-open' : ''}`}>
            {navItems.map((item) => (
              <InternalLink
                key={`mobile-${item.href}`}
                href={isHomePath(pathname) ? item.href : `/${item.href}`}
                onClick={onCloseNav}
                onNavigate={onNavigate}
              >
                {item.label}
              </InternalLink>
            ))}
            <button
              type="button"
              className="nav-mobile-cta"
              onClick={() => {
                onCloseNav()
                onOpenAppointment()
              }}
            >
              Request appointment
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation menu"
        className={`nav-mobile-backdrop${navOpen ? ' is-open' : ''}`}
        onClick={onCloseNav}
      />
    </>
  )
}
