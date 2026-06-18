import type {
  AccessibilitySettings,
  CookiePreferences,
  DiagnosticTest,
  ExperienceNote,
  LegalPageContent,
  NavItem,
  Physician,
  ProfileSectionLink,
  ServiceFeature,
  ServicePhoneMeta,
  WhyChooseCard,
} from '../types/site'

export const navItems: NavItem[] = [
  { label: 'Physicians', href: '#providers' },
  { label: 'Services', href: '#services' },
  { label: 'Why SICA', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export const experienceNotes: ExperienceNote[] = [
  {
    title: 'Clear communication',
    meta: 'Patient experience',
    quote:
      'Each visit is shaped around clear explanations, practical next steps, and time for patients to understand their heart health.',
  },
  {
    title: 'Personalized care',
    meta: 'Treatment planning',
    quote:
      'Care plans are tailored to the patient, the diagnosis, the risk profile, and the goals that matter most in daily life.',
  },
  {
    title: 'Diagnostic accuracy',
    meta: 'Advanced testing',
    quote:
      'Symptoms, imaging, rhythm data, and clinical history are brought together so decisions are grounded in the clearest picture possible.',
  },
  {
    title: 'Long-term relationships',
    meta: 'Care continuity',
    quote:
      'Cardiology care continues beyond the first test, with follow-up that supports prevention, treatment, and healthier years ahead.',
  },
]

export const cookieStorageKey = 'sica-cookie-preferences'
export const accessibilityStorageKey = 'sica-accessibility-settings'

export const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
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

export const legalPages: LegalPageContent[] = [
  {
    path: '/terms-of-use',
    title: 'Terms of Use & Medical Disclaimer',
    effectiveDate: 'June 18, 2026',
    lastUpdated: 'June 18, 2026',
    intro:
      'How Southern Indiana Cardiology Associates defines the use of this website and the medical-information boundaries around it.',
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

export const servicePhoneMeta: Record<string, ServicePhoneMeta> = {
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

export const serviceFeatures: ServiceFeature[] = [
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
    details: [
      'Electrocardiogram (EKG)',
      'Echocardiogram',
      'Nuclear stress test',
      'Carotid ultrasound',
      'Holter and event monitoring',
      'Vascular testing',
    ],
  },
]

export const diagnosticTests: DiagnosticTest[] = [
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

export const profileSectionLinks: ProfileSectionLink[] = [
  { id: 'physician-overview', label: 'Overview' },
  { id: 'physician-philosophy', label: 'Philosophy of care' },
  { id: 'physician-conditions', label: 'Clinical focus and procedures' },
  { id: 'physician-education', label: 'Education' },
  { id: 'physician-certifications', label: 'Board certifications' },
  { id: 'physician-memberships', label: 'Professional memberships' },
  { id: 'physician-faq', label: 'FAQ' },
]

export const physicians: Physician[] = [
  {
    id: 'srinivas',
    name: 'Dr. Srini Manchi, MD, FACC',
    cardName: 'Dr. Srini Manchi, MD, FACC',
    role: 'Interventional Cardiologist',
    image: '/sica-assets/dr-bapineedu-gondi.jpeg',
    description:
      'Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology. Special expertise in coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, peripheral vascular disease, deep vein thrombosis (DVT), and pulmonary embolism management.',
    profileHeading: 'Dr. Srini Manchi, MD, FACC',
    specialtySummary:
      'Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology, including coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, peripheral vascular disease, DVT, and pulmonary embolism management.',
    homeHighlights: [
      'Board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology, with special expertise in PCI, advanced cardiac imaging, echocardiography, nuclear cardiology, peripheral vascular disease, DVT, and pulmonary embolism management.',
    ],
    experienceLabel: '25+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC and FSCAI', 'Coronary and vascular procedures'],
    biography: [
      'Dr. Srini Manchi is a board-certified interventional cardiologist with more than 25 years of experience in diagnostic and interventional cardiology.',
      'His special expertise includes coronary interventions (PCI), advanced cardiac imaging, echocardiography, nuclear cardiology, peripheral vascular disease, deep vein thrombosis (DVT), and pulmonary embolism management.',
    ],
    philosophy:
      'He approaches each visit with an emphasis on evidence-based care, clear communication, and careful follow-through so patients understand their diagnosis, procedure options, and long-term cardiovascular plan.',
    whyChoose: [
      'Coronary intervention expertise',
      'DVT and pulmonary embolism treatment',
      'Advanced cardiac imaging',
      'Board-certified interventional care',
    ],
    faqs: [
      {
        question: 'What procedures does Dr. Srini perform?',
        answer:
          'His procedures include cardiac catheterization, diagnostic coronary angiography, PCI, peripheral angiography and intervention, DVT and pulmonary embolism treatment, cardioversion, pericardiocentesis, endomyocardial biopsy, and temporary pacemaker placement.',
      },
      {
        question: 'What kinds of PCI techniques are part of his practice?',
        answer:
          'His PCI experience includes balloon angioplasty, stenting, rotational atherectomy, laser atherectomy, shockwave lithotripsy, IVUS, IFR, and FFR.',
      },
      {
        question: 'When might echocardiography be part of my visit?',
        answer:
          'Echocardiography may be used when the care team needs more information about heart structure, pumping function, valve performance, or the cause of symptoms. His imaging experience includes transthoracic, stress, and transesophageal echocardiography.',
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
      'Fellow, Society for Cardiovascular Angiography & Interventions (FSCAI)',
    ],
  },
  {
    id: 'gondi',
    name: 'Dr. Bapineedu Gondi, MD, FACC',
    cardName: 'Dr. Bapineedu Gondi, MD, FACC',
    role: 'Cardiologist',
    image: '/sica-assets/dr-srinivas-manchikalapudi.jpeg',
    description:
      'Board-certified cardiologist with fellowship training in cardiovascular disease from the University of Rochester. Special expertise in cardiac electrophysiology, cardiothoracic imaging, cardiac critical care, and comprehensive cardiovascular disease management.',
    profileHeading: 'Dr. Bapineedu Gondi, MD, FACC',
    specialtySummary:
      'Board-certified cardiologist with fellowship training in cardiovascular disease from the University of Rochester and special expertise in cardiac electrophysiology, cardiothoracic imaging, cardiac critical care, and comprehensive cardiovascular disease management.',
    homeHighlights: [
      'Board-certified cardiologist with fellowship training in cardiovascular disease from the University of Rochester, focused on cardiac electrophysiology, cardiothoracic imaging, cardiac critical care, and comprehensive cardiovascular disease management.',
    ],
    experienceLabel: '40+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC', 'Cardiac imaging and critical care'],
    biography: [
      'Dr. Bapineedu Gondi is a board-certified cardiologist with fellowship training in cardiovascular disease from the University of Rochester.',
      'His special expertise includes cardiac electrophysiology, cardiothoracic imaging, cardiac critical care, and comprehensive cardiovascular disease management. He is committed to delivering personalized, evidence-based care focused on long-term heart health and improved patient outcomes.',
    ],
    philosophy:
      'His care approach combines experience, clinical judgment, and direct patient communication so that treatment plans feel clear, informed, and tailored to the person in front of him.',
    whyChoose: [
      'FACC cardiology care',
      'Cardiac imaging expertise',
      'Cardiac critical care focus',
      'Board-certified cardiovascular care',
    ],
    faqs: [
      {
        question: 'What kinds of patients does Dr. Gondi commonly see?',
        answer:
          'He commonly sees patients with coronary artery disease, hypertension, heart failure, atrial fibrillation, and other cardiovascular concerns that need careful evaluation and follow-up.',
      },
      {
        question: 'Does Dr. Gondi support long-term cardiovascular care?',
        answer:
          'Yes. His care is centered on ongoing cardiovascular management, including symptoms, medications, risk factors, testing, and follow-up.',
      },
      {
        question: 'Will my visit include discussion of testing and next steps?',
        answer:
          'Yes. Visits are structured to explain findings clearly, review diagnostic options, and connect those results to the next step in treatment or follow-up.',
      },
    ],
    education: [
      'University of Rochester Medical Center, Fellowship in Cardiovascular Disease, 1979 - 1981',
      'Cook County Health and Hospitals System, Residency in Internal Medicine, 1976 - 1979',
      'Guntur Medical College NTR, Class of 1975',
    ],
    boardCertifications: ['Internal Medicine', 'Cardiovascular Disease'],
    specialInterests: [
      'Cardiac Electrophysiology',
      'Cardiothoracic Imaging',
      'Cardiac Critical Care',
      'Coronary Artery Disease',
      'Hypertension',
      'Heart Failure',
      'Atrial Fibrillation',
    ],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['Fellow, American College of Cardiology (FACC)'],
  },
  {
    id: 'sandella',
    name: 'Dr. Surender K. Sandella, MD, FACC',
    cardName: 'Dr. Surender K. Sandella, MD, FACC',
    role: 'Interventional Cardiologist',
    image: '/sica-assets/dr-surender-sandella.webp',
    description:
      'Board-certified interventional cardiologist with fellowship training in cardiovascular disease from the University of Louisville. Certified in pacemaker and implantable cardioverter-defibrillator (ICD) management. Clinical interests include adult congenital heart disease, cardiac electrophysiology, device therapy, and advanced interventional cardiology.',
    profileHeading: 'Dr. Surender K. Sandella, MD, FACC',
    specialtySummary:
      'Board-certified interventional cardiologist with fellowship training in cardiovascular disease from the University of Louisville, certified in pacemaker and ICD management, with clinical interests in adult congenital heart disease, cardiac electrophysiology, device therapy, and advanced interventional cardiology.',
    homeHighlights: [
      'Board-certified interventional cardiologist with fellowship training in cardiovascular disease from the University of Louisville, certified in pacemaker and ICD management, with clinical interests in adult congenital heart disease, cardiac electrophysiology, device therapy, and advanced interventional cardiology.',
    ],
    experienceLabel: '25+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'FACC', 'Electrophysiology and interventional care'],
    biography: [
      'Dr. Surender K. Sandella is a board-certified interventional cardiologist with fellowship training in cardiovascular disease from the University of Louisville.',
      'He is certified in pacemaker and implantable cardioverter-defibrillator (ICD) management. His clinical interests include adult congenital heart disease, cardiac electrophysiology, device therapy, and advanced interventional cardiology.',
    ],
    philosophy:
      'He emphasizes thoughtful diagnosis, patient education, and treatment plans that connect advanced testing with clear, practical follow-up care.',
    whyChoose: [
      'FACC interventional care',
      'Adult congenital heart disease focus',
      'Cardiac electrophysiology expertise',
      'Board-certified cardiovascular care',
    ],
    faqs: [
      {
        question: 'What is Dr. Surender’s clinical focus?',
        answer:
          'His focus includes adult congenital heart disease, cardiac electrophysiology, interventional cardiology, and comprehensive cardiovascular care.',
      },
      {
        question: 'Who may benefit from this kind of profile?',
        answer:
          'Patients who need interventional cardiology care, adult congenital heart disease evaluation, electrophysiology expertise, or long-term cardiovascular management often benefit from this care approach.',
      },
      {
        question: 'Can testing and prevention be discussed in the same visit?',
        answer:
          'Yes. The goal is to connect symptoms, risk factors, testing, and prevention into one organized treatment plan.',
      },
    ],
    education: [
      'University of Louisville School of Medicine, Fellowship in Cardiovascular Disease, 1995 - 1998',
      'Case Western Reserve University/University Hospitals Cleveland Medical Center, Residency in Internal Medicine, 1993 - 1995',
      'Zucker School of Medicine at Hofstra/Northwell, Internship in Internal Medicine, 1992 - 1993',
      'Osmania Medical College NTR UHS, Class of 1989',
    ],
    boardCertifications: ['Cardiovascular Disease', 'Interventional Cardiology'],
    specialInterests: [
      'Adult Congenital Heart Disease',
      'Cardiac Electrophysiology',
      'Interventional Cardiology',
      'Cardiovascular Disease',
    ],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['Fellow, American College of Cardiology (FACC)'],
  },
]

export const physicianCards = [...physicians].sort((a, b) => {
  const surnameA = a.name.split(',')[0].split(' ').at(-1) ?? a.name
  const surnameB = b.name.split(',')[0].split(' ').at(-1) ?? b.name
  return surnameA.localeCompare(surnameB)
})

export const whyChooseCards: WhyChooseCard[] = [
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
