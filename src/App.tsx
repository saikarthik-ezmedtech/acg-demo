import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import Lenis from 'lenis'
import { createPortal } from 'react-dom'
import HeartbeatLine from './components/HeartbeatLine'
import AppointmentModal from './components/AppointmentModal'

const navItems = [
  { label: 'Physicians', href: '#providers' },
  { label: 'Services', href: '#services' },
  { label: 'Why SICA', href: '#news' },
  { label: 'Contact', href: '#contact' },
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

type Physician = {
  id: string
  name: string
  role: string
  image: string
  cardName: string
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
  heroName?: string
  heroRole?: string
  heroCredentials?: string
}

type LegalSection = {
  title: string
  paragraphs: string[]
  listItems?: string[]
  tone?: 'default' | 'notice' | 'warning'
}

type LegalPageContent = {
  path: string
  title: string
  lastUpdated: string
  intro: string
  effectiveDate?: string
  notice?: string
  sections: LegalSection[]
}

type CookiePreferences = {
  essential: true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

type AccessibilitySettings = {
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

const cookieStorageKey = 'sica-cookie-preferences'
const accessibilityStorageKey = 'sica-accessibility-settings'

const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  fontScale: 1,
  keyboardNavigation: false,
  readableFont: false,
  underlineLinks: false,
  highlightLinks: false,
  grayscaleImages: false,
  invertColors: false,
  removeAnimations: false,
  highContrast: false,
}

const legalPages: LegalPageContent[] = [
  {
    path: '/terms-of-use',
    title: 'Terms of Use & Medical Disclaimer',
    effectiveDate: 'June 18, 2026',
    lastUpdated: 'June 18, 2026',
    intro: 'How Southern Indiana Cardiology Associates defines the use of this website and the medical-information boundaries around it.',
    notice: 'Attorney review is recommended before publishing or relying on this page as final legal copy.',
    sections: [
      {
        title: 'Acceptance of Terms',
        paragraphs: [
          'By accessing or using the Southern Indiana Cardiology Associates website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.',
          'These Terms of Use apply to all visitors, users, and others who access or use this website.',
        ],
      },
      {
        title: 'Medical Disclaimer',
        tone: 'warning',
        paragraphs: [
          'The content on this website is provided for general informational purposes only. It does not constitute medical advice, diagnosis, or treatment.',
          'Nothing on this website should be used as a substitute for professional medical advice from a licensed healthcare provider who has evaluated you and understands your medical history and circumstances.',
        ],
        listItems: [
          'Information on this website is general in nature and may not apply to your individual health situation.',
          'Reading information on this website does not establish a patient-provider relationship with Southern Indiana Cardiology Associates.',
          'You should not delay seeking professional medical advice, disregard medical advice, or discontinue treatment based on information found on this website.',
          'If you are experiencing a medical emergency, call 911 or go to the nearest emergency room immediately.',
        ],
      },
      {
        title: 'No Patient-Provider Relationship',
        paragraphs: [
          'Use of this website, including any appointment request or contact inquiry, does not by itself establish a patient-provider relationship.',
          'A patient-provider relationship is established only after the practice has accepted you as a patient and appropriate clinical care has begun.',
        ],
      },
      {
        title: 'Third-Party Services and Links',
        paragraphs: [
          'This website may contain links to third-party websites, maps, patient tools, or external resources for convenience.',
          'Southern Indiana Cardiology Associates does not control or guarantee the content, availability, privacy practices, or accuracy of those third-party services.',
        ],
      },
      {
        title: 'Intellectual Property',
        paragraphs: [
          'All content on this website, including text, graphics, images, logos, and overall site design, is owned by Southern Indiana Cardiology Associates or its content providers and is protected by applicable intellectual property laws.',
          'You may not reproduce, distribute, modify, or republish content from this website without prior written permission.',
        ],
      },
      {
        title: 'Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by applicable law, Southern Indiana Cardiology Associates and its providers, staff, and agents are not liable for damages arising from your use of or reliance on this website or its content.',
          'This includes damages arising from errors or omissions, interruptions in service, or use of third-party resources linked from this website.',
        ],
      },
      {
        title: 'Accessibility',
        paragraphs: [
          'Southern Indiana Cardiology Associates is committed to making this website more accessible and usable for all visitors.',
          'If you experience difficulty accessing any content on this website, please contact our office at 812-924-7065 so we can help.',
        ],
      },
      {
        title: 'Governing Law',
        paragraphs: [
          'These Terms of Use are governed by the laws of the State of Indiana, without regard to conflict-of-law principles.',
          'Any disputes related to the use of this website will be handled in the appropriate courts serving Southern Indiana.',
        ],
      },
      {
        title: 'Changes to These Terms',
        paragraphs: [
          'We may update these Terms of Use when site features, legal requirements, or practice operations change.',
          'Revised versions will be posted on this page with an updated effective date and last-updated date.',
        ],
      },
      {
        title: 'Contact Us',
        paragraphs: [
          'If you have questions about these Terms of Use, please contact Southern Indiana Cardiology Associates at 812-924-7065 or visit us at 2109 Green Valley Road, New Albany, Indiana 47150.',
        ],
      },
    ],
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy',
    lastUpdated: 'April 27, 2021',
    intro: 'How Southern Indiana Cardiology Associates uses cookies and similar technologies on this website.',
    sections: [
      {
        title: 'What Are Cookies?',
        paragraphs: [
          'Cookies are small text files placed on your device when you visit a website. They help websites work properly, remember preferences, and provide insights into how the site is used.',
        ],
      },
      {
        title: 'How We Use Cookies',
        paragraphs: [
          'Essential cookies are required for core website functions such as page navigation, security, and remembering basic preferences.',
          'Performance cookies help us understand how visitors use the site so we can improve speed, usability, and content quality.',
          'Functional cookies remember certain choices, such as region or form preferences, to provide a smoother browsing experience.',
          'Third-party cookies may be used by embedded services, maps, or tools provided by trusted third parties that support website functionality.',
        ],
      },
      {
        title: 'Managing Cookie Preferences',
        paragraphs: [
          'Most browsers allow you to review, block, or delete cookies. Disabling certain cookies may affect how parts of this website function.',
          'If cookie preference controls are available on our website, you can use those controls to update your choices at any time.',
        ],
      },
      {
        title: 'Third-Party Services',
        paragraphs: [
          'Some website features may rely on third-party services. Those services may set their own cookies based on their privacy and cookie practices.',
        ],
      },
      {
        title: 'Policy Updates',
        paragraphs: [
          'We may update this Cookie Policy when website features or legal requirements change. Revised versions will be posted on this page with a new last-updated date.',
        ],
      },
      {
        title: 'Contact Us',
        paragraphs: [
          'For questions about this Cookie Policy, contact Southern Indiana Cardiology Associates at 812-924-7065.',
        ],
      },
    ],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'June 18, 2026',
    intro: 'How Southern Indiana Cardiology Associates collects, uses, and protects website information.',
    sections: [
      {
        title: 'Information We Collect',
        paragraphs: [
          'We may collect information you choose to provide through appointment requests, contact forms, phone calls, and other direct communications with our office.',
          'We may also collect limited website usage information through cookies, analytics, and basic technical logs such as browser type, device information, and general traffic patterns.',
        ],
      },
      {
        title: 'How We Use Information',
        paragraphs: [
          'Information submitted through this website may be used to respond to inquiries, coordinate appointments, improve website performance, and support practice operations.',
          'We use reasonable administrative and technical safeguards to protect information handled through our website and office workflows.',
        ],
      },
      {
        title: 'Cookies and Analytics',
        paragraphs: [
          'This website may use essential, functional, analytics, and other optional cookies to support site performance and improve visitor experience.',
          'You can review or change your cookie settings through the cookie preferences controls available on this website.',
        ],
      },
      {
        title: 'Third-Party Services',
        paragraphs: [
          'Some website features, including maps, embedded media, or external tools, may be provided by third parties that maintain their own privacy practices.',
          'When you interact with those services, their terms and privacy policies may apply in addition to ours.',
        ],
      },
      {
        title: 'Your Choices',
        paragraphs: [
          'You may contact our office if you have questions about information submitted through this website or if you need help with your website privacy preferences.',
          'You can also manage cookies through your browser settings, although disabling some cookies may affect site functionality.',
        ],
      },
      {
        title: 'Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy, contact Southern Indiana Cardiology Associates at 812-924-7065 or visit 2109 Green Valley Road, New Albany, Indiana 47150.',
        ],
      },
    ],
  },
]

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

const serviceFeatures = [
  {
    id: 'preventive-cardiology',
    mockupId: 'preventive-cardiology',
    icon: '⬡',
    title: 'Preventive Cardiology',
    copy: 'Risk reduction, lifestyle guidance, and long-term planning before symptoms escalate.',
    details: ['Heart disease prevention', 'Cholesterol management', 'Risk assessments'],
  },
  {
    id: 'hypertension',
    mockupId: 'hypertension-management',
    icon: '✦',
    title: 'Hypertension',
    copy: 'Diagnosis and treatment plans built around office and home blood pressure patterns.',
    details: ['Home and office trend review', 'Medication adjustment', 'Long-term risk reduction'],
  },
  {
    id: 'cholesterol-management',
    mockupId: 'preventive-cardiology',
    icon: '◌',
    title: 'Cholesterol Management',
    copy: 'Lipid strategy and follow-up to reduce cardiovascular risk over time.',
    details: ['Prevention-focused planning', 'Medication review', 'Ongoing monitoring'],
  },
  {
    id: 'heart-disease-prevention',
    mockupId: 'preventive-cardiology',
    icon: '◎',
    title: 'Heart Disease Prevention',
    copy: 'Practical care that focuses on keeping disease from progressing.',
    details: ['Lifestyle guidance', 'Risk-factor control', 'Prevention planning'],
  },
  {
    id: 'risk-assessments',
    mockupId: 'cardiac-diagnostics',
    icon: '∞',
    title: 'Risk Assessments',
    copy: 'A fuller view of family history, medications, symptoms, and test results.',
    details: ['Clearer cardiovascular picture', 'Visit-based planning', 'Targeted next steps'],
  },
  {
    id: 'cardiac-conditions',
    mockupId: 'coronary-artery-disease',
    icon: '♡',
    title: 'Cardiac Conditions',
    copy: 'Support for the broad spectrum of ongoing cardiovascular concerns.',
    details: ['Chronic disease management', 'Symptoms and testing aligned', 'Treatment follow-through'],
  },
  {
    id: 'coronary-artery-disease',
    mockupId: 'coronary-artery-disease',
    icon: '◎',
    title: 'Coronary Artery Disease',
    copy: 'Chest pain, prior stents, and coronary risk tracked in one plan.',
    details: ['Coronary interventions', 'Medication strategy', 'Long-term follow-up'],
  },
  {
    id: 'heart-failure',
    mockupId: 'heart-failure-management',
    icon: '♡',
    title: 'Heart Failure',
    copy: 'Medication optimization, monitoring, and follow-up for heart failure care.',
    details: ['Fluid and symptom monitoring', 'Care stability', 'Coordinated management'],
  },
  {
    id: 'arrhythmias',
    mockupId: 'holter-monitoring',
    icon: '⌁',
    title: 'Arrhythmias',
    copy: 'Management for irregular rhythms, palpitations, and rhythm-related symptoms.',
    details: ['Rhythm data review', 'Holter and event monitoring', 'Symptom correlation'],
  },
  {
    id: 'atrial-fibrillation',
    mockupId: 'holter-monitoring',
    icon: '▵',
    title: 'Atrial Fibrillation',
    copy: 'AFib care focused on rate, rhythm, stroke prevention, and follow-up.',
    details: ['Rhythm control planning', 'Stroke-risk review', 'Ongoing management'],
  },
  {
    id: 'diagnostic-testing',
    mockupId: 'cardiac-diagnostics',
    icon: '∞',
    title: 'Diagnostic Testing',
    copy: 'Testing arranged to answer a specific clinical question with clarity.',
    details: ['Electrocardiogram (EKG)', 'Echocardiogram', 'Nuclear stress test', 'Carotid ultrasound', 'Holter and event monitoring', 'Vascular testing'],
  },
]

const diagnosticTests = [
  {
    id: 'ekg',
    title: 'Electrocardiogram (EKG)',
    visualLabel: 'Electrical activity tracing',
    media: {
      src: '/sica-assets/diagnostic-ekg-real.png',
      label: 'Electrocardiogram test in progress with leads and heart rhythm monitor',
    },
    what: 'A quick, non-invasive test that records the electrical activity of your heart using small stickers placed on the chest.',
    why: 'Used to check heart rhythm, look for signs of heart strain, and help evaluate symptoms such as chest discomfort, palpitations, or dizziness.',
    expect: 'You will lie still while leads record the tracing. The test is painless and usually takes only a few minutes.',
    prep: 'No special preparation is usually needed.',
  },
  {
    id: 'echo',
    title: 'Echocardiogram',
    visualLabel: 'Ultrasound heart imaging',
    media: {
      src: '/sica-assets/diagnostic-echo-room.png',
      label: 'Echocardiogram exam with ultrasound imaging in a cardiology clinic',
    },
    what: 'An ultrasound test that creates moving images of the heart to show structure, pumping function, and valve performance.',
    why: 'Used to evaluate heart muscle function, valve disease, murmurs, fluid around the heart, and how blood is moving through the chambers.',
    expect: 'A technician moves an ultrasound probe over the chest with gel while images are recorded on a monitor. The test is painless and commonly takes 30 to 60 minutes.',
    prep: 'Resting echocardiograms usually require no preparation.',
  },
  {
    id: 'nuclear-stress',
    title: 'Nuclear Stress Test',
    visualLabel: 'Stress imaging equipment',
    media: {
      src: '/sica-assets/diagnostic-stress-room.png',
      label: 'Stress testing room with treadmill and cardiac monitoring equipment',
    },
    what: 'A stress test combined with imaging that helps show blood flow to the heart during exertion or medication-induced stress.',
    why: 'Used to look for reduced blood flow, assess symptoms such as chest pain or shortness of breath, and help evaluate coronary artery disease risk.',
    expect: 'You may walk on a treadmill or receive medicine through an IV if exercise is not possible. Imaging is done before and after the stress portion.',
    prep: 'Preparation varies, but patients are often asked to avoid caffeine for a period before testing and to follow medication instructions from the office.',
  },
  {
    id: 'carotid',
    title: 'Carotid Ultrasound',
    visualLabel: 'Blood flow and plaque screening',
    media: {
      src: '/sica-assets/diagnostic-carotid-ultrasound.png',
      label: 'Ultrasound testing used to evaluate blood flow and circulation',
    },
    what: 'An ultrasound of the carotid arteries in the neck to assess blood flow and look for narrowing or plaque buildup.',
    why: 'Used when clinicians need more information about stroke risk, circulation to the brain, or possible carotid artery narrowing.',
    expect: 'A handheld ultrasound probe is placed gently on the neck to capture images. The test is non-invasive and usually comfortable.',
    prep: 'Usually no special preparation is needed.',
  },
  {
    id: 'calcium-score',
    title: 'Calcium Score Screening',
    visualLabel: 'CT coronary calcium scan',
    media: {
      src: '/sica-assets/diagnostic-calcium-ct-real.png',
      label: 'CT coronary calcium scoring scanner in a cardiology imaging setting',
    },
    what: 'A CT scan that measures calcified plaque in the coronary arteries and helps estimate long-term coronary risk.',
    why: 'Useful for refining cardiovascular risk in selected patients and helping guide prevention planning.',
    expect: 'You lie on a CT table for a very short scan, sometimes with brief breath-holds. The scan itself usually takes only a few minutes.',
    prep: 'Preparation is minimal, and the office will review whether the test is appropriate for your situation.',
  },
  {
    id: 'holter',
    title: 'Holter Monitoring',
    visualLabel: 'Continuous rhythm recording',
    media: {
      src: '/sica-assets/diagnostic-holter-monitor.png',
      label: 'clinician placing electrodes for a holter monitor in a cardiology exam room',
    },
    what: 'A portable monitor worn over a day or longer to continuously record the heart rhythm during normal daily activity.',
    why: 'Used when symptoms such as palpitations, skipped beats, dizziness, or fainting may come and go and are not always captured during an office EKG.',
    expect: 'Small electrodes attach to the chest and connect to a compact recorder that you wear home.',
    prep: 'You may be asked to avoid getting the monitor wet and to keep a simple symptom diary while wearing it.',
  },
  {
    id: 'event',
    title: 'Event Monitoring',
    visualLabel: 'Longer-term symptom capture',
    media: {
      src: '/sica-assets/diagnostic-event-monitor.png',
      label: 'patient wearing an event monitor patch during a cardiology follow-up visit',
    },
    what: 'A rhythm monitor used over a longer period when symptoms happen less often and need more time to capture.',
    why: 'Helps match intermittent symptoms with the heart rhythm at that exact time.',
    expect: 'Depending on the device, you may press a button during symptoms or wear a monitor that records automatically.',
    prep: 'The office will explain how long to wear it and how to mark symptoms when they happen.',
  },
  {
    id: 'vascular',
    title: 'Vascular Testing',
    visualLabel: 'Circulation and vessel studies',
    media: {
      src: '/sica-assets/diagnostic-vascular-testing.png',
      label: 'Clinical vascular and circulation testing image in a cardiology setting',
    },
    what: 'A group of circulation studies that check blood flow in the arteries and veins.',
    why: 'Used to help evaluate circulation problems, vascular symptoms, and prevention or treatment planning.',
    expect: 'Testing may include blood pressure cuffs, ultrasound probes, or waveform measurements depending on the study being ordered.',
    prep: 'Preparation depends on the exact study, and your care team will give instructions ahead of time.',
  },
]

const profileSectionLinks = [
  { id: 'physician-overview', label: 'Overview' },
  { id: 'physician-philosophy', label: 'Philosophy of care' },
  { id: 'physician-conditions', label: 'Clinical focus and procedures' },
  { id: 'physician-education', label: 'Education' },
  { id: 'physician-certifications', label: 'Board certifications' },
  { id: 'physician-memberships', label: 'Professional memberships' },
  { id: 'physician-faq', label: 'FAQ' },
]

const physicians: Physician[] = [
  {
    id: 'srinivas',
    name: 'Dr. Srini Manchi, MD, FACC, FSCAI',
    cardName: 'Dr. Srini Manchi, MD, FACC, FSCAI',
    role: 'Board-Certified Interventional Cardiologist',
    heroName: 'Dr. Srini Manchi',
    heroRole: 'Board-Certified Interventional Cardiologist',
    heroCredentials: 'MD, FACC, FSCAI',
    image: '/sica-assets/dr-bapineedu-gondi.jpeg',
    description:
      'Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology. Special expertise in coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, Peripheral Vascular Disease, deep vein thrombosis (DVT), pulmonary embolism management, Atrial Fibrillation, and Congestive Heart Failure.',
    profileHeading: 'Dr. Srini Manchi, MD, FACC, FSCAI',
    specialtySummary:
      'Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology, including coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, Peripheral Vascular Disease, DVT, pulmonary embolism management, Atrial Fibrillation, and Congestive Heart Failure.',
    homeHighlights: ['Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology, with special expertise in PCI, advanced cardiac imaging, echocardiography, nuclear cardiology, Peripheral Vascular Disease, DVT, pulmonary embolism management, Atrial Fibrillation, and Congestive Heart Failure.'],
    experienceLabel: '25+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC and FSCAI', 'Coronary and vascular procedures'],
    biography: [
      'Dr. Srini Manchi is a board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology.',
      'His special expertise includes coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, Peripheral Vascular Disease, deep vein thrombosis (DVT), pulmonary embolism management, Atrial Fibrillation, and Congestive Heart Failure.',
    ],
    philosophy:
      'He approaches each visit with an emphasis on evidence-based care, clear communication, and careful follow-through so patients understand their diagnosis, procedure options, and long-term cardiovascular plan.',
    whyChoose: ['Coronary intervention expertise', 'DVT and pulmonary embolism treatment', 'Advanced cardiac imaging', 'Board-certified interventional care'],
    faqs: [
      {
        question: 'What procedures does Dr. Manchi perform?',
        answer: 'His procedures include cardiac catheterization, diagnostic coronary angiography, PCI, peripheral angiography and intervention, DVT and pulmonary embolism treatment, cardioversion, pericardiocentesis, endomyocardial biopsy, and temporary pacemaker placement.',
      },
      {
        question: 'What kinds of PCI techniques are part of his practice?',
        answer: 'His PCI experience includes balloon angioplasty, stenting, rotational atherectomy, laser atherectomy, shockwave lithotripsy, IVUS, IFR, and FFR.',
      },
      {
        question: 'When might echocardiography be part of my visit?',
        answer: 'Echocardiography may be used when the care team needs more information about heart structure, pumping function, valve performance, or the cause of symptoms. His imaging experience includes transthoracic, stress, and transesophageal echocardiography.',
      },
    ],
    education: [
      'Fellowship, Interventional Cardiology - University of Louisville - Louisville, KY, July 2000 - June 2001',
      'Fellowship, Cardiology - University of Louisville - Louisville, KY, July 1997 - June 2000',
      'Basic Research Fellowship, Cardiology - University of Louisville - Louisville, KY, July 1996 - June 1997',
      'Residency, Internal Medicine - University of Louisville - Louisville, KY, July 1993 - June 1996',
    ],
    boardCertifications: [
      'Interventional Cardiology - Certified 2001; recertified 2011 and 2022',
      'Cardiovascular Diseases - Certified 2000; recertified 2010 and 2021',
      'Board of Nuclear Cardiology - Certified 1999',
      'American Board of Internal Medicine - Certified 1996',
    ],
    specialInterests: [
      'Percutaneous coronary interventions (PCI), including balloon angioplasty, stenting, rotational atherectomy, laser atherectomy, shockwave lithotripsy, IVUS, IFR, and FFR',
      'Treatment of DVT and pulmonary embolism using INARI and Penumbra',
      'Right and left heart catheterization and diagnostic coronary angiography',
      'Peripheral angiography and intervention',
      'Cardioversions',
      'Pericardiocentesis',
      'Endomyocardial biopsy',
      'Nuclear cardiology stress testing and scan interpretation',
      'Transthoracic, stress, and transesophageal echocardiography',
      'Temporary pacemakers',
    ],
    languages: ['Please contact the office for current language support options.'],
    memberships: [
      'Fellow, American College of Cardiology (FACC)',
    ],
  },
  {
    id: 'gondi',
    name: 'Dr. Bapineedu Gondi, MD, FACC',
    cardName: 'Dr. Bapineedu Gondi, MD, FACC',
    role: 'Board-Certified Cardiologist',
    heroName: 'Dr. Bapineedu Gondi',
    heroRole: 'Board-Certified Cardiologist',
    heroCredentials: 'MD, FACC',
    image: '/sica-assets/dr-srinivas-manchikalapudi.jpeg',
    description:
      'Board-certified cardiologist with fellowship training in Cardiovascular Disease from the University of Rochester. Special expertise in cardiothoracic imaging, cardiac critical care, comprehensive Cardiovascular Disease management, and Atrial Fibrillation treatment.',
    profileHeading: 'Dr. Bapineedu Gondi, MD, FACC',
    specialtySummary:
      'Board-certified cardiologist with fellowship training in Cardiovascular Disease from the University of Rochester and special expertise in cardiothoracic imaging, cardiac critical care, comprehensive Cardiovascular Disease management, and Atrial Fibrillation treatment.',
    homeHighlights: ['Board-certified cardiologist with fellowship training in Cardiovascular Disease from the University of Rochester, focused on cardiothoracic imaging, cardiac critical care, comprehensive Cardiovascular Disease management, and Atrial Fibrillation treatment.'],
    experienceLabel: '40+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC', 'Cardiac imaging and critical care'],
    biography: [
      'Dr. Bapineedu Gondi is a board-certified cardiologist with fellowship training in Cardiovascular Disease from the University of Rochester.',
      'His special expertise includes cardiothoracic imaging, cardiac critical care, comprehensive Cardiovascular Disease management, and Atrial Fibrillation treatment. He is committed to delivering personalized, evidence-based care focused on long-term heart health and improved patient outcomes.',
    ],
    philosophy:
      'His care approach combines experience, clinical judgment, and direct patient communication so that treatment plans feel clear, informed, and tailored to the person in front of him.',
    whyChoose: ['FACC cardiology care', 'Cardiac imaging expertise', 'Cardiac critical care focus', 'Board-certified cardiovascular care'],
    faqs: [
      {
        question: 'What kinds of patients does Dr. Gondi commonly see?',
        answer: 'He commonly sees patients with coronary artery disease, hypertension, Heart Failure, Atrial Fibrillation, and other cardiovascular concerns that need careful evaluation and follow-up.',
      },
      {
        question: 'Does Dr. Gondi support long-term cardiovascular care?',
        answer: 'Yes. His care is centered on ongoing cardiovascular management, including symptoms, medications, risk factors, testing, and follow-up.',
      },
      {
        question: 'Will my visit include discussion of testing and next steps?',
        answer: 'Yes. Visits are structured to explain findings clearly, review diagnostic options, and connect those results to the next step in treatment or follow-up.',
      },
    ],
    education: [
      'University of Rochester Medical Center, Fellowship in Cardiovascular Disease, 1979 - 1981',
      'Cook County Health and Hospitals System, Residency in Internal Medicine, 1976 - 1979',
      'Guntur Medical College NTR, Class of 1975',
    ],
    boardCertifications: ['Internal Medicine', 'Cardiovascular Disease'],
    specialInterests: ['Cardiothoracic Imaging', 'Cardiac Critical Care', 'Coronary Artery Disease', 'Hypertension', 'Heart Failure', 'Atrial Fibrillation'],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['Fellow, American College of Cardiology (FACC)'],
  },
  {
    id: 'sandella',
    name: 'Dr. Surender Sandella, MD, FACC, FSCAI',
    cardName: 'Dr. Surender Sandella, MD, FACC, FSCAI',
    role: 'Board-Certified Interventional Cardiologist',
    heroName: 'Dr. Surender Sandella',
    heroRole: 'Board-Certified Interventional Cardiologist',
    heroCredentials: 'MD, FACC, FSCAI',
    image: '/sica-assets/dr-surender-sandella.webp',
    description:
      'Board certified interventional cardiologist. Special expertise in coronary interventions, peripheral interventions, pacemakers, ICD, Atrial Fibrillation management, advanced cardiac imaging, echo, nuclear cardiology, Watchman, PFO/ASD closure, DVT, and PE.',
    profileHeading: 'Dr. Surender Sandella, MD, FACC, FSCAI',
    specialtySummary:
      'Board certified interventional cardiologist with special expertise in coronary interventions, peripheral interventions, pacemakers, ICD, Atrial Fibrillation management, advanced cardiac imaging, echo, nuclear cardiology, Watchman, PFO/ASD closure, DVT, and PE.',
    homeHighlights: ['Board certified interventional cardiologist with special expertise in coronary interventions, peripheral interventions, pacemakers, ICD, Atrial Fibrillation management, advanced cardiac imaging, echo, nuclear cardiology, Watchman, PFO/ASD closure, DVT, and PE.'],
    experienceLabel: '25+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC and FSCAI', 'Atrial fibrillation and interventional care'],
    biography: [
      'Dr. Surender Sandella is a board certified interventional cardiologist with special expertise in coronary interventions, peripheral interventions, pacemakers, ICD, Atrial Fibrillation management, advanced cardiac imaging, echo, nuclear cardiology, Watchman, PFO/ASD closure, DVT, and PE.',
      'His clinical focus includes Interventional Cardiology procedures, Device Therapy, echocardiography, Atrial Fibrillation management, Peripheral Vascular Disease treatment, endomyocardial biopsy, Congestive Heart Failure, and Cardiovascular Disease care.',
    ],
    philosophy:
      'He emphasizes thoughtful diagnosis, patient education, and treatment plans that connect advanced testing with clear, practical follow-up care.',
    whyChoose: ['Interventional Cardiology expertise', 'Atrial Fibrillation and Device Therapy', 'Peripheral Vascular Intervention', 'Board-certified cardiovascular care'],
    faqs: [
      {
        question: 'What is Dr. Sandella’s clinical focus?',
        answer: 'His focus includes Interventional Cardiology, Device Therapy, echocardiography, Atrial Fibrillation management, Peripheral Vascular Intervention, Congestive Heart Failure, and comprehensive Cardiovascular Disease care.',
      },
      {
        question: 'Who may benefit from this kind of profile?',
        answer: 'Patients who need coronary or peripheral interventions, pacemaker or ICD management, Atrial Fibrillation treatment, vascular procedures, or long-term cardiovascular follow-up often benefit from this care approach.',
      },
      {
        question: 'Can testing and prevention be discussed in the same visit?',
        answer: 'Yes. The goal is to connect symptoms, risk factors, testing, and prevention into one organized treatment plan.',
      },
    ],
    education: [
      'University Of Louisville school of medicine, fellowship in interventional cardiology, 1999-2000',
      'Case Western Reserve University/University Hospitals Cleveland Medical Center, Residency in Internal Medicine, 1993 - 1995',
      'Zucker School of Medicine at Hofstra/Northwell, Internship in Internal Medicine, 1992 - 1993',
      'Osmania Medical College NTR UHS, Class of 1989',
    ],
    boardCertifications: ['Cardiovascular Disease', 'Interventional Cardiology'],
    specialInterests: [
      'Interventional cardiology - cath, PCI',
      'Device therapy - pacemaker, ICD, BiV',
      'Echocardiography and transesophageal echocardiography',
      'Atrial fibrillation - cardioversion, Watchman',
      'Peripheral vascular disease - peripheral balloon angioplasty, atherectomy, and stents',
      'Endomyocardial biopsy',
      'CHF',
      'Cardiovascular disease',
    ],
    languages: ['Please contact the office for current language support options.'],
    memberships: [
      'Fellow of the Society for Cardiovascular Angiography and Interventions ( FSCAI )',
      'Fellow, American College of Cardiology (FACC)',
    ],
  },
]

const physicianCards = [...physicians].sort((a, b) => {
  const surnameA = a.name.split(',')[0].split(' ').at(-1) ?? a.name
  const surnameB = b.name.split(',')[0].split(' ').at(-1) ?? b.name
  return surnameA.localeCompare(surnameB)
})

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

function getRouteState() {
  return {
    pathname: window.location.pathname || '/',
    hash: window.location.hash || '',
  }
}

function getPhysicianPath(id: string) {
  return `/physicians/${id}`
}

function getDiagnosticTestingPath() {
  return '/diagnostic-testing'
}

function getPhysicianFromPath(pathname: string) {
  const match = pathname.match(/^\/physicians\/([^/]+)$/)
  if (!match) return null

  return physicians.find((physician) => physician.id === match[1]) ?? null
}

function isDiagnosticTestingPath(pathname: string) {
  return pathname === getDiagnosticTestingPath()
}

function getLegalPage(pathname: string) {
  return legalPages.find((page) => page.path === pathname) ?? null
}

function isHomePath(pathname: string) {
  return pathname === '/' || pathname === ''
}

function HeroPhysicianCollage({ onNavigate }: { onNavigate: (href: string) => void }) {
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

const whyChooseCards = [
  {
    title: 'Experienced Specialists',
    meta: 'Expert Care',
    copy: 'Board-certified cardiologists delivering expert heart care and long-term cardiovascular management.',
    image: '/sica-assets/diagnostic-monitoring-visit.png',
    imageAlt: 'Cardiology consultation visit between clinician and patient',
  },
  {
    title: 'Advanced Diagnostics',
    meta: 'Advanced Testing',
    copy: 'Comprehensive cardiac testing with advanced imaging, stress testing, and rhythm monitoring.',
    image: '/sica-assets/diagnostic-echo-room.png',
    imageAlt: 'Echocardiography exam in a cardiology clinic',
  },
  {
    title: 'Personalized Treatment Plans',
    meta: 'Personalized Care',
    copy: 'Care plans tailored to your symptoms, medical history, and long-term heart health goals.',
    image: '/sica-assets/diagnostic-event-monitor.png',
    imageAlt: 'Clinician reviewing heart rhythm information with a cardiology patient',
  },
  {
    title: 'Long-Term Heart Health',
    meta: 'Long-Term Management',
    copy: 'Ongoing prevention, monitoring, and treatment to support lifelong cardiovascular wellness.',
    image: '/sica-assets/diagnostic-holter-monitor.png',
    imageAlt: 'Holter monitor placement for long-term heart rhythm tracking',
  },
  {
    title: 'Convenient Testing Access',
    meta: 'Convenient Access',
    copy: 'In-office diagnostic testing designed for timely evaluations and faster care decisions.',
    image: '/sica-assets/diagnostic-ekg-room.png',
    imageAlt: 'Cardiology diagnostic room with ECG monitor and treadmill equipment',
  },
  {
    title: 'Clear Follow-Through',
    meta: 'Coordinated Follow-Up',
    copy: 'Coordinated follow-up care with clear guidance at every stage of treatment.',
    image: '/sica-assets/diagnostic-carotid-ultrasound.png',
    imageAlt: 'Cardiology clinic performing vascular ultrasound follow-up testing',
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
      animate="visible"
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />
      <path d="M14 2a8 8 0 0 1 8 8" />
      <path d="M14 6a4 4 0 0 1 4 4" />
    </svg>
  )
}

function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '1em', height: '1em' }}>
      <circle cx="16" cy="4" r="1.5" fill="currentColor" />
      <path d="M12 12h5" />
      <path d="M8 16a4 4 0 1 0 8 0v-4" />
      <path d="M12 5v7a2 2 0 0 1-2 2H4" />
    </svg>
  )
}


function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-4.35 6-11a6 6 0 0 0-12 0c0 6.65 6 11 6 11" />
      <path d="M12 10a2 2 0 1 0 0.01 0" />
    </svg>
  )
}

function InternalLink({
  href,
  onNavigate,
  className,
  children,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  onNavigate: (href: string) => void
}) {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      onClick={(event) => {
        if (href.startsWith('#') || href.startsWith('/')) {
          event.preventDefault()
          onNavigate(href)
        }

        onClick?.(event)
      }}
    >
      {children}
    </a>
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

function DiagnosticMedia({ test }: { test: (typeof diagnosticTests)[number] }) {
  return (
    <figure className={`diagnostic-zigzag-card__media diagnostic-zigzag-card__media--${test.id}`}>
      <img
        src={test.media.src}
        alt={test.media.label}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}

function PhysicianProfilePage({
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

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]?.target?.id) {
        setActiveSection(visible[0].target.id)
      }
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0.15, 0.35, 0.55],
    })

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

function DiagnosticTestingPage({ onNavigate }: { onNavigate: (href: string) => void }) {
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
            <InternalLink href="/#services" onNavigate={onNavigate} className="button secondary">
              Back to Services
            </InternalLink>
          </div>
        </section>
      </div>
    </section>
  )
}

function LegalPage({
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

export default function App() {
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, -90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.35])

  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const [route, setRoute] = useState(getRouteState)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    const saved = window.localStorage.getItem(cookieStorageKey)
    if (!saved) return defaultCookiePreferences

    try {
      const parsed = JSON.parse(saved) as Partial<CookiePreferences>
      return {
        essential: true,
        functional: parsed.functional ?? defaultCookiePreferences.functional,
        analytics: parsed.analytics ?? defaultCookiePreferences.analytics,
        marketing: parsed.marketing ?? defaultCookiePreferences.marketing,
      }
    } catch {
      return defaultCookiePreferences
    }
  })
  const [cookiePanelOpen, setCookiePanelOpen] = useState(() => !window.localStorage.getItem(cookieStorageKey))
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(() => {
    const saved = window.localStorage.getItem(accessibilityStorageKey)
    if (!saved) return defaultAccessibilitySettings

    try {
      const parsed = JSON.parse(saved) as Partial<AccessibilitySettings>
      return {
        fontScale: typeof parsed.fontScale === 'number' ? parsed.fontScale : defaultAccessibilitySettings.fontScale,
        keyboardNavigation: parsed.keyboardNavigation ?? defaultAccessibilitySettings.keyboardNavigation,
        readableFont: parsed.readableFont ?? defaultAccessibilitySettings.readableFont,
        underlineLinks: parsed.underlineLinks ?? defaultAccessibilitySettings.underlineLinks,
        highlightLinks: parsed.highlightLinks ?? defaultAccessibilitySettings.highlightLinks,
        grayscaleImages: parsed.grayscaleImages ?? defaultAccessibilitySettings.grayscaleImages,
        invertColors: parsed.invertColors ?? defaultAccessibilitySettings.invertColors,
        removeAnimations: parsed.removeAnimations ?? defaultAccessibilitySettings.removeAnimations,
        highContrast: parsed.highContrast ?? defaultAccessibilitySettings.highContrast,
      }
    } catch {
      return defaultAccessibilitySettings
    }
  })
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const lenisRef = useRef<Lenis | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!bannerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBannerHeight(entry.contentRect.height)
      }
    })
    observer.observe(bannerRef.current)
    return () => observer.disconnect()
  }, [])
  const activePhysician = useMemo(() => getPhysicianFromPath(route.pathname), [route.pathname])
  const diagnosticTestingOpen = useMemo(() => isDiagnosticTestingPath(route.pathname), [route.pathname])
  const activeLegalPage = useMemo(() => getLegalPage(route.pathname), [route.pathname])

  useEffect(() => {
    if (activePhysician || diagnosticTestingOpen || activeLegalPage) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          if (!Number.isNaN(index)) setActiveServiceIndex(index)
        }
      })
    }, {
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.15,
    })

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [activePhysician, diagnosticTestingOpen, activeLegalPage])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const offset = -88
    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset, duration: 0.9 })
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const navigateTo = (href: string) => {
    setNavOpen(false)

    if (href.startsWith('#')) {
      const destination = `/${href}`
      window.history.pushState({}, '', destination)
      setRoute(getRouteState())
      requestAnimationFrame(() => scrollToSection(href.slice(1)))
      return
    }

    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.toString())
      return
    }

    window.history.pushState({}, '', `${url.pathname}${url.hash}`)
    setRoute(getRouteState())

    requestAnimationFrame(() => {
      if (url.hash) {
        scrollToSection(url.hash.slice(1))
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true })
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
  }

  useEffect(() => {
    if (accessibilitySettings.removeAnimations) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 1.0,
      syncTouch: true,
    })
    lenisRef.current = lenis
    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [accessibilitySettings.removeAnimations])

  useEffect(() => {
    const handlePopState = () => {
      setNavOpen(false)
      setRoute(getRouteState())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (route.hash) {
      const frame = requestAnimationFrame(() => scrollToSection(route.hash.slice(1)))
      return () => cancelAnimationFrame(frame)
    }

    lenisRef.current?.scrollTo(0, { immediate: true })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.hash, route.pathname])

  useEffect(() => {
    window.localStorage.setItem(cookieStorageKey, JSON.stringify(cookiePreferences))
  }, [cookiePreferences])

  useEffect(() => {
    window.localStorage.setItem(accessibilityStorageKey, JSON.stringify(accessibilitySettings))

    const root = document.documentElement
    root.style.setProperty('--accessibility-font-scale', String(accessibilitySettings.fontScale))
    root.classList.toggle('accessible-keyboard-navigation', accessibilitySettings.keyboardNavigation)
    root.classList.toggle('accessible-readable-font', accessibilitySettings.readableFont)
    root.classList.toggle('accessible-underline-links', accessibilitySettings.underlineLinks)
    root.classList.toggle('accessible-highlight-links', accessibilitySettings.highlightLinks)
    root.classList.toggle('accessible-grayscale-images', accessibilitySettings.grayscaleImages)
    root.classList.toggle('accessible-invert-colors', accessibilitySettings.invertColors)
    root.classList.toggle('accessible-remove-animations', accessibilitySettings.removeAnimations)
    root.classList.toggle('accessible-high-contrast', accessibilitySettings.highContrast)

    return () => {
      root.style.removeProperty('--accessibility-font-scale')
      root.classList.remove(
        'accessible-readable-font',
        'accessible-keyboard-navigation',
        'accessible-underline-links',
        'accessible-highlight-links',
        'accessible-grayscale-images',
        'accessible-invert-colors',
        'accessible-remove-animations',
        'accessible-high-contrast',
      )
    }
  }, [accessibilitySettings])

  const updateCookiePreference = (key: Exclude<keyof CookiePreferences, 'essential'>, value: boolean) => {
    setCookiePreferences((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const saveCookiePreferences = () => {
    setCookiePanelOpen(false)
  }

  const acceptAllCookies = () => {
    setCookiePreferences(defaultCookiePreferences)
    setCookiePanelOpen(false)
  }

  const rejectOptionalCookies = () => {
    setCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    })
    setCookiePanelOpen(false)
  }

  const setAccessibilityToggle = (key: Exclude<keyof AccessibilitySettings, 'fontScale'>) => {
    setAccessibilitySettings((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const adjustFontScale = (delta: number) => {
    setAccessibilitySettings((current) => ({
      ...current,
      fontScale: Math.min(1.3, Math.max(0.9, Number((current.fontScale + delta).toFixed(2)))),
    }))
  }

  const resetAccessibilitySettings = () => {
    setAccessibilitySettings(defaultAccessibilitySettings)
    setAccessibilityOpen(false)
  }

  const clearCookieSettings = () => {
    setCookiePreferences(defaultCookiePreferences)
    window.localStorage.removeItem(cookieStorageKey)
    document.cookie.split(';').forEach((cookie) => {
      const [rawName] = cookie.split('=')
      const name = rawName?.trim()
      if (!name) return
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
    setCookiePanelOpen(true)
  }

  const scrollToPageTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.8 })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const floatingControls = (
    <>
      {accessibilityOpen ? (
        <aside className="accessibility-sidebar" aria-label="Accessibility settings">
          <div className="accessibility-sidebar__header">
            <p>Accessibility</p>
            <button type="button" aria-label="Close accessibility sidebar" onClick={() => setAccessibilityOpen(false)}>
              ×
            </button>
          </div>
          <div className="accessibility-sidebar__font" aria-label="Text size controls">
            <button type="button" onClick={() => adjustFontScale(-0.05)} disabled={accessibilitySettings.fontScale <= 0.9}>
              A-
            </button>
            <span>{Math.round(accessibilitySettings.fontScale * 100)}%</span>
            <button type="button" onClick={() => adjustFontScale(0.05)} disabled={accessibilitySettings.fontScale >= 1.3}>
              A+
            </button>
          </div>
          <div className="accessibility-sidebar__controls">
            <button
              type="button"
              aria-pressed={accessibilitySettings.readableFont}
              onClick={() => setAccessibilityToggle('readableFont')}
            >
              Readable Font
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.keyboardNavigation}
              onClick={() => setAccessibilityToggle('keyboardNavigation')}
            >
              Keyboard Navigation
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.underlineLinks}
              onClick={() => setAccessibilityToggle('underlineLinks')}
            >
              Underline Links
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.highlightLinks}
              onClick={() => setAccessibilityToggle('highlightLinks')}
            >
              Highlight Links
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.grayscaleImages}
              onClick={() => setAccessibilityToggle('grayscaleImages')}
            >
              Images Greyscale
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.invertColors}
              onClick={() => setAccessibilityToggle('invertColors')}
            >
              Invert Colors
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.removeAnimations}
              onClick={() => setAccessibilityToggle('removeAnimations')}
            >
              Remove Animations
            </button>
            <button
              type="button"
              aria-pressed={accessibilitySettings.highContrast}
              onClick={() => setAccessibilityToggle('highContrast')}
            >
              High Contrast
            </button>
            <button type="button" onClick={clearCookieSettings}>Clear Cookies</button>
          </div>
          <button type="button" className="accessibility-sidebar__reset" onClick={resetAccessibilitySettings}>
            Reset
          </button>
        </aside>
      ) : (
        <button
          type="button"
          aria-label="Accessibility Helper sidebar"
          title="Accessibility Helper sidebar"
          className="accessibility-fab"
          onClick={() => setAccessibilityOpen(true)}
        >
          <span className="accessibility-fab__icon" aria-hidden="true"><AccessibilityIcon /></span>
        </button>
      )}

      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          title="Scroll to top"
          className="scroll-top-fab"
          onClick={scrollToPageTop}
        >
          <span className="scroll-top-fab__icon" aria-hidden="true">↑</span>
        </button>
      )}
    </>
  )

  return (
    <div className="site-shell">
      <div className="site-shell__viewport">
      <div className="page-wipe" aria-hidden="true" />
      <aside ref={bannerRef} className="w-full top-banner border-b border-[rgba(255,255,255,0.08)] text-center relative z-[60]" aria-label="Announcement">
        <div className="mx-auto max-w-7xl px-4 text-[13px] font-medium text-white">
          Trusted heart care from experienced cardiology specialists.{" "}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 underline underline-offset-2 hover:opacity-70 font-semibold text-[#E8F3FF]"
            onClick={() => setAppointmentOpen(true)}
          >
            <span>Request an appointment</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="tabler-icon tabler-icon-arrow-right shrink-0">
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </button>
        </div>
      </aside>
      <header className={`navigation${scrolled ? ' is-scrolled' : ''}`} style={scrolled ? {} : { top: `${bannerHeight + 20}px` }}>
        <div className={`nav_layout-2${navOpen ? ' is-open' : ''}`}>
          <InternalLink className="nav_home" href="/" onNavigate={navigateTo} aria-label="Southern Indiana Cardiology Associates home">
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
                    href={isHomePath(route.pathname) ? item.href : `/${item.href}`}
                    className="navigation_link"
                    onClick={() => setNavOpen(false)}
                    onNavigate={navigateTo}
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
                <button type="button" className="nav-cta btn cc-navigation" onClick={() => setAppointmentOpen(true)}>
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
              onClick={() => setNavOpen((prev) => !prev)}
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
                href={isHomePath(route.pathname) ? item.href : `/${item.href}`}
                onClick={() => setNavOpen(false)}
                onNavigate={navigateTo}
              >
                {item.label}
              </InternalLink>
            ))}
            <button
              type="button"
              className="nav-mobile-cta"
              onClick={() => {
                setNavOpen(false)
                setAppointmentOpen(true)
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
        onClick={() => setNavOpen(false)}
      />

      <main id="top">
        {activePhysician ? (
          <PhysicianProfilePage physician={activePhysician} onNavigate={navigateTo} onOpenAppointment={() => setAppointmentOpen(true)} />
        ) : diagnosticTestingOpen ? (
          <DiagnosticTestingPage onNavigate={navigateTo} />
        ) : activeLegalPage ? (
          <LegalPage page={activeLegalPage} onNavigate={navigateTo} onOpenCookiePreferences={() => setCookiePanelOpen(true)} />
        ) : (
          <>
        <section className="hero-section">
          <motion.div className="hero-bg" style={{ y: heroLift, opacity: heroOpacity }}>
            <video src="/sica-assets/videos/heart-hero.mp4" autoPlay muted loop playsInline />
          </motion.div>
          <div className="hero-vein" />
          <div className="hero-shell">
            <div className="hero-content">
              <Reveal delay={0.08}>
                <h1>Expert Cardiovascular Care. Experienced Specialists.</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="hero-copy">
                  Comprehensive cardiovascular care focused on diagnosis, treatment, and long-term heart health.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <HeroPhysicianCollage onNavigate={navigateTo} />
              </Reveal>
            </div>
          </div>
          <HeartbeatLine className="hero-heartbeat" />
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
                  ref={(el) => { cardRefs.current[index] = el }}
                  data-index={index}
                  className={`offer-scroll-card ${index === activeServiceIndex ? 'is-active' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      <InternalLink className="offer-education-link" href={getDiagnosticTestingPath()} onNavigate={navigateTo}>
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

        {/* ─── WHY CHOOSE SICA ─── */}
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
              <div>
                <dt>Fax</dt>
                <dd>
                  <a href="tel:8129247094">812-924-7094</a>
                </dd>
              </div>
            </dl>
            <div className="office-section__actions">
              <button type="button" className="button primary" onClick={() => setAppointmentOpen(true)}>
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
            <div className="privacy-content">
              <h2>Your Health Data, Secure & Protected</h2>
              <p>
                We maintain strict HIPAA compliance and use industry-standard encryption to protect your personal health
                information. You can trust that your medical records and communication are always safe with us.
              </p>
            </div>
            <div className="privacy-lock"></div>
          </div>
        </section>
        <section id="contact" className="final-cta">
          <div className="final-copy">
            <h2>Ready to Take Control of Your Heart Health?</h2>
            <p>
              Schedule a consultation with Southern Indiana Cardiology Associates and receive expert cardiovascular
              care tailored to your needs.
            </p>
            <div className="hero-actions">
              <button type="button" className="button primary" onClick={() => setAppointmentOpen(true)}>
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
        )}
      </main>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />

      {cookiePanelOpen && (
        <div className="cookie-preferences" role="dialog" aria-live="polite" aria-label="Cookie preferences">
          <div className="cookie-preferences__panel">
            <div className="cookie-preferences__grid">
              <div>
                <h2>Cookie Preferences</h2>
                <p>
                  We use essential cookies to keep this website secure and accessible. Optional cookies help us improve
                  site performance and understand how visitors use the website.
                </p>
                <p className="cookie-preferences__links">
                  Read more in our{' '}
                  <InternalLink href="/cookie-policy" onNavigate={navigateTo}>
                    Cookie Policy
                  </InternalLink>{' '}
                  and{' '}
                  <InternalLink href="/privacy-policy" onNavigate={navigateTo}>
                    Privacy Policy
                  </InternalLink>.
                </p>

                <div className="cookie-preferences__options">
                  <label>
                    <input type="checkbox" checked disabled />
                    <span>
                      <strong>Essential cookies</strong>
                      <small>Always active for core site functionality.</small>
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.functional}
                      onChange={(event) => updateCookiePreference('functional', event.target.checked)}
                    />
                    <span>
                      <strong>Functional cookies</strong>
                      <small>Remember selected preferences for future visits.</small>
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={(event) => updateCookiePreference('analytics', event.target.checked)}
                    />
                    <span>
                      <strong>Analytics cookies</strong>
                      <small>Help us measure traffic and improve pages.</small>
                    </span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={(event) => updateCookiePreference('marketing', event.target.checked)}
                    />
                    <span>
                      <strong>Marketing cookies</strong>
                      <small>Support relevant outreach and campaign reporting.</small>
                    </span>
                  </label>
                </div>
              </div>

              <div className="cookie-preferences__actions">
                <button type="button" className="button secondary" onClick={() => setCookiePanelOpen(false)}>
                  Hide Settings
                </button>
                <button type="button" className="button secondary" onClick={rejectOptionalCookies}>
                  Reject Optional
                </button>
                <button type="button" className="button primary" onClick={saveCookiePreferences}>
                  Save Choices
                </button>
                <button type="button" className="button primary button-primary-alt" onClick={acceptAllCookies}>
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer-wrap">
        <footer className="site-footer">
          {/* Footer content grid */}
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
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Preventive Cardiology</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Cardiac Diagnostics</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Interventional Cardiology</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Heart Failure Management</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Vascular Studies</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Hypertension Management</InternalLink>
            </div>
            <div className="footer-col footer-col--contact">
              <strong>Contact</strong>
              <InternalLink href={isHomePath(route.pathname) ? '#contact' : '/#contact'} onNavigate={navigateTo}>Request Appointment</InternalLink>
              <a className="footer-inline-text" href="tel:8129247065">Contact Us</a>
              <span className="footer-inline-text">Fax: 812-924-7094</span>
            </div>
            <div className="footer-col footer-col--navigate">
              <strong>Navigate</strong>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Services</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#providers' : '/#providers'} onNavigate={navigateTo}>Physicians</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#community' : '/#community'} onNavigate={navigateTo}>Clinical Care</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#news' : '/#news'} onNavigate={navigateTo}>Why SICA</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#contact' : '/#contact'} onNavigate={navigateTo}>Request Appointment</InternalLink>
            </div>
            <div className="footer-col footer-col--legal">
              <strong>Legal</strong>
              <InternalLink href="/terms-of-use" onNavigate={navigateTo}>Terms of Use</InternalLink>
              <InternalLink href="/privacy-policy" onNavigate={navigateTo}>Privacy Policy</InternalLink>
              <InternalLink href="/cookie-policy" onNavigate={navigateTo}>Cookie Policy</InternalLink>
              <div className="footer-secondary-row">
                <button type="button" className="footer-link-button" onClick={() => setCookiePanelOpen(true)}>Cookie Preferences</button>
              </div>
            </div>
          </div>

          <div className="footer-legal-bar">
            <p>
              Educational information only. Always consult a qualified healthcare provider for diagnosis and treatment.
              {' '}
              <InternalLink href="/terms-of-use" onNavigate={navigateTo}>Terms</InternalLink>
              {' · '}
              <InternalLink href="/privacy-policy" onNavigate={navigateTo}>Privacy</InternalLink>
              {' · '}
              <InternalLink href="/cookie-policy" onNavigate={navigateTo}>Cookies</InternalLink>
            </p>
            <p>© {currentYear} Southern Indiana Cardiology Associates.</p>
          </div>
        </footer>
      </div>
      </div>

      {typeof document !== 'undefined' ? createPortal(floatingControls, document.body) : floatingControls}
    </div>
  )
}
