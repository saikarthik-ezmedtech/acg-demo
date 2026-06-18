export type ServiceVariant =
  | 'diagnostics'
  | 'prevention'
  | 'heartfailure'
  | 'chronic'
  | 'vascular'
  | 'wellness'
  | 'interventional'

export type Physician = {
  id: string
  name: string
  role: string
  image: string
  cardName: string
  heroName?: string
  heroRole?: string
  heroCredentials?: string
  description: string
  profileHeading: string
  specialtySummary: string
  homeHighlights: string[]
  experienceLabel: string
  trustHighlights: string[]
  biography: string[]
  philosophy: string
  whyChoose: string[]
  faqs: Array<{ question: string; answer: string }>
  education: string[]
  boardCertifications: string[]
  specialInterests: string[]
  languages: string[]
  memberships: string[]
}

export type LegalSection = {
  title: string
  paragraphs: string[]
  listItems?: string[]
  tone?: 'default' | 'notice' | 'warning'
}

export type LegalPageContent = {
  path: string
  title: string
  lastUpdated: string
  intro: string
  effectiveDate?: string
  notice?: string
  sections: LegalSection[]
}

export type CookiePreferences = {
  essential: true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export type AccessibilitySettings = {
  fontScale: number
  keyboardNavigation: boolean
  readableFont: boolean
  underlineLinks: boolean
  highlightLinks: boolean
  grayscaleImages: boolean
  invertColors: boolean
  removeAnimations: boolean
  highContrast: boolean
}

export type NavItem = {
  label: string
  href: string
}

export type ExperienceNote = {
  title: string
  meta: string
  quote: string
}

export type ServicePhoneMeta = {
  label: string
  title: string
  score: string
  variant: ServiceVariant
}

export type ServiceFeature = {
  id: string
  mockupId: string
  icon: string
  title: string
  copy: string
  details: string[]
}

export type DiagnosticTest = {
  id: string
  title: string
  visualLabel: string
  media: {
    src: string
    label: string
  }
  what: string
  why: string
  expect: string
  prep: string
}

export type ProfileSectionLink = {
  id: string
  label: string
}

export type WhyChooseCard = {
  title: string
  meta: string
  copy: string
  image: string
  imageAlt: string
}

export type RouteState = {
  pathname: string
  hash: string
}
