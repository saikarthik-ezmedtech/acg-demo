import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import Lenis from 'lenis'
import HeartbeatLine from './components/HeartbeatLine'

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
}

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
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Electrical activity tracing',
    what: 'A quick, non-invasive test that records the electrical activity of your heart using small stickers placed on the chest.',
    why: 'Used to check heart rhythm, look for signs of heart strain, and help evaluate symptoms such as chest discomfort, palpitations, or dizziness.',
    expect: 'You will lie still while leads record the tracing. The test is painless and usually takes only a few minutes.',
    prep: 'No special preparation is usually needed.',
  },
  {
    id: 'echo',
    title: 'Echocardiogram',
    image: 'https://images.unsplash.com/photo-1666214277657-b0bdb84dfd1f?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Ultrasound heart imaging',
    what: 'An ultrasound test that creates moving images of the heart to show structure, pumping function, and valve performance.',
    why: 'Used to evaluate heart muscle function, valve disease, murmurs, fluid around the heart, and how blood is moving through the chambers.',
    expect: 'A technician moves an ultrasound probe over the chest with gel while images are recorded on a monitor. The test is painless and commonly takes 30 to 60 minutes.',
    prep: 'Resting echocardiograms usually require no preparation.',
  },
  {
    id: 'nuclear-stress',
    title: 'Nuclear Stress Test',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Stress imaging equipment',
    what: 'A stress test combined with imaging that helps show blood flow to the heart during exertion or medication-induced stress.',
    why: 'Used to look for reduced blood flow, assess symptoms such as chest pain or shortness of breath, and help evaluate coronary artery disease risk.',
    expect: 'You may walk on a treadmill or receive medicine through an IV if exercise is not possible. Imaging is done before and after the stress portion.',
    prep: 'Preparation varies, but patients are often asked to avoid caffeine for a period before testing and to follow medication instructions from the office.',
  },
  {
    id: 'carotid',
    title: 'Carotid Ultrasound',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Blood flow and plaque screening',
    what: 'An ultrasound of the carotid arteries in the neck to assess blood flow and look for narrowing or plaque buildup.',
    why: 'Used when clinicians need more information about stroke risk, circulation to the brain, or possible carotid artery narrowing.',
    expect: 'A handheld ultrasound probe is placed gently on the neck to capture images. The test is non-invasive and usually comfortable.',
    prep: 'Usually no special preparation is needed.',
  },
  {
    id: 'calcium-score',
    title: 'Calcium Score Screening',
    image: 'https://images.unsplash.com/photo-1580281657527-47d3a94ac6ca?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'CT coronary calcium scan',
    what: 'A CT scan that measures calcified plaque in the coronary arteries and helps estimate long-term coronary risk.',
    why: 'Useful for refining cardiovascular risk in selected patients and helping guide prevention planning.',
    expect: 'You lie on a CT table for a very short scan, sometimes with brief breath-holds. The scan itself usually takes only a few minutes.',
    prep: 'Preparation is minimal, and the office will review whether the test is appropriate for your situation.',
  },
  {
    id: 'holter',
    title: 'Holter Monitoring',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Continuous rhythm recording',
    what: 'A portable monitor worn over a day or longer to continuously record the heart rhythm during normal daily activity.',
    why: 'Used when symptoms such as palpitations, skipped beats, dizziness, or fainting may come and go and are not always captured during an office EKG.',
    expect: 'Small electrodes attach to the chest and connect to a compact recorder that you wear home.',
    prep: 'You may be asked to avoid getting the monitor wet and to keep a simple symptom diary while wearing it.',
  },
  {
    id: 'event',
    title: 'Event Monitoring',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Longer-term symptom capture',
    what: 'A rhythm monitor used over a longer period when symptoms happen less often and need more time to capture.',
    why: 'Helps match intermittent symptoms with the heart rhythm at that exact time.',
    expect: 'Depending on the device, you may press a button during symptoms or wear a monitor that records automatically.',
    prep: 'The office will explain how long to wear it and how to mark symptoms when they happen.',
  },
  {
    id: 'vascular',
    title: 'Vascular Testing',
    image: 'https://images.unsplash.com/photo-1579684453377-58fe1adf2b05?auto=format&fit=crop&w=1400&q=80',
    visualLabel: 'Circulation and vessel studies',
    what: 'A group of circulation studies that check blood flow in the arteries and veins.',
    why: 'Used to help evaluate circulation problems, vascular symptoms, and prevention or treatment planning.',
    expect: 'Testing may include blood pressure cuffs, ultrasound probes, or waveform measurements depending on the study being ordered.',
    prep: 'Preparation depends on the exact study, and your care team will give instructions ahead of time.',
  },
]

const profileSectionLinks = [
  { id: 'physician-overview', label: 'Overview' },
  { id: 'physician-philosophy', label: 'Philosophy of care' },
  { id: 'physician-conditions', label: 'Conditions treated' },
  { id: 'physician-education', label: 'Education' },
  { id: 'physician-certifications', label: 'Board certifications' },
  { id: 'physician-memberships', label: 'Professional memberships' },
  { id: 'physician-faq', label: 'FAQ' },
]

const physicians: Physician[] = [
  {
    id: 'srinivas',
    name: 'Dr. Srinivas Manchikalapudi, MD',
    cardName: 'Dr. Srini Manchi',
    role: 'Cardiologist',
    image: '/sica-assets/dr-srinivas-manchikalapudi.jpeg',
    description:
      'Experienced cardiologist specializing in cardiovascular disease management, preventive cardiology, hypertension, coronary artery disease, and heart failure.',
    profileHeading: 'Dr. Srini Manchi',
    specialtySummary: 'Board Certified Cardiologist. Echocardiography, preventive cardiology, and cardiovascular disease management are central to his clinical focus.',
    homeHighlights: ['Board-certified cardiologist with expertise in echocardiography, preventive cardiology, and comprehensive cardiovascular disease management, dedicated to delivering personalized heart care and long-term wellness solutions.'],
    experienceLabel: 'Long-standing cardiology experience',
    trustHighlights: ['Board Certified', 'Preventive cardiology focus', 'Cardiovascular disease management'],
    biography: [
      'Dr. Srinivas Manchikalapudi cares for patients across prevention, diagnosis, and long-term cardiovascular management. His practice emphasizes careful evaluation, practical treatment planning, and follow-up that stays connected over time.',
      'His clinical focus includes echocardiography, hypertension, coronary artery disease, preventive cardiology, and ongoing management for chronic heart conditions. Patients benefit from a steady, relationship-based approach that balances day-to-day symptoms with long-term heart health goals.',
    ],
    philosophy:
      'He approaches each visit with an emphasis on clarity, prevention, and continuity, helping patients understand what the findings mean, what the next step should be, and how to protect heart health over time.',
    whyChoose: ['Long-term cardiovascular management', 'Preventive cardiology focus', 'Echocardiography expertise', 'Board-certified heart care'],
    faqs: [
      {
        question: 'What kinds of patients does Dr. Srini commonly see?',
        answer: 'He commonly sees patients for prevention, blood pressure concerns, coronary artery disease, heart failure follow-up, and broader cardiovascular disease management.',
      },
      {
        question: 'Does this profile support long-term heart care?',
        answer: 'Yes. His care approach is especially suited to patients who need a clear long-term plan, ongoing follow-up, and coordinated chronic cardiovascular management.',
      },
      {
        question: 'When might echocardiography be part of my visit?',
        answer: 'Echocardiography may be used when the care team needs more information about heart structure, pumping function, valve performance, or the cause of symptoms.',
      },
    ],
    education: ['Long-standing cardiology practice centered on prevention, diagnostics, and chronic cardiovascular management.'],
    boardCertifications: ['Board Certified Cardiologist'],
    specialInterests: ['Echocardiography', 'Preventive Cardiology', 'Cardiovascular Disease Management'],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['Additional professional membership details are available through the office.'],
  },
  {
    id: 'gondi',
    name: 'Dr. Bapineedu Gondi, MD',
    cardName: 'Dr. Bapineedu Gondi, MD',
    role: 'Interventional Cardiologist',
    image: '/sica-assets/dr-bapineedu-gondi.jpeg',
    description:
      'Interventional cardiologist specializing in coronary interventions, cardiac catheterization, vascular disease treatment, and advanced cardiovascular procedures.',
    profileHeading: 'Dr. Gondi',
    specialtySummary: 'Interventional cardiologist specializing in coronary interventions, coronary artery disease, hypertension, heart failure, and atrial fibrillation.',
    homeHighlights: ['Interventional cardiologist specializing in coronary interventions and the treatment of coronary artery disease, hypertension, heart failure, and atrial fibrillation, with a focus on advanced cardiovascular care and improved patient outcomes.'],
    experienceLabel: '40+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'Advanced procedures', 'Coronary and vascular expertise'],
    biography: [
      'Dr. Bapineedu Gondi is an interventional cardiologist focused on coronary interventions, cardiac catheterization, vascular disease treatment, and complex cardiovascular evaluation. His profile is especially suited to patients who need both diagnostic clarity and procedure-based treatment planning.',
      'He also cares for patients with coronary artery disease, hypertension, heart failure, and atrial fibrillation. His visits center on understanding the full cardiovascular picture, reviewing symptoms carefully, and helping patients move through testing, procedures, and follow-up with confidence.',
    ],
    philosophy:
      'His care approach combines experience, technical precision, and direct patient communication so that treatment plans feel clear, informed, and tailored to the person in front of him.',
    whyChoose: ['Interventional expertise', 'Coronary artery disease management', 'Advanced cardiovascular procedures', 'Board-certified cardiovascular care'],
    faqs: [
      {
        question: 'When would I see an interventional cardiologist?',
        answer: 'Patients often see an interventional cardiologist when symptoms, test findings, or coronary artery disease concerns may require advanced evaluation, cardiac catheterization, or procedure-based treatment planning.',
      },
      {
        question: 'Does Dr. Gondi treat conditions beyond procedures?',
        answer: 'Yes. He also manages hypertension, heart failure, atrial fibrillation, and broader coronary artery disease follow-up as part of ongoing cardiovascular care.',
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
    specialInterests: ['Coronary Interventions', 'Coronary Artery Disease', 'Hypertension', 'Heart Failure', 'Atrial Fibrillation'],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['American College of Cardiology (ACC)'],
  },
  {
    id: 'sandella',
    name: 'Dr. Surender K. Sandella, MD',
    cardName: 'Dr. Surender K. Sandella, MD',
    role: 'Board-Certified Cardiologist',
    image: '/sica-assets/dr-surender-sandella.webp',
    description:
      'Board-certified cardiologist focused on comprehensive heart care, cardiovascular prevention, diagnostics, and long-term patient management.',
    profileHeading: 'Dr. Surender',
    specialtySummary: 'Board-certified cardiologist specializing in nuclear cardiology, echocardiography, and cardiovascular diagnostics.',
    homeHighlights: ['Board-certified cardiologist specializing in nuclear cardiology, echocardiography, and advanced cardiovascular diagnostics, dedicated to delivering accurate evaluations and comprehensive heart care for optimal patient outcomes.'],
    experienceLabel: '25+ years of cardiovascular experience',
    trustHighlights: ['Board Certified', 'Diagnostic expertise', 'Comprehensive heart care'],
    biography: [
      'Dr. Surender K. Sandella provides comprehensive heart care with a strong focus on cardiovascular prevention, diagnostics, and long-term management. His work often supports patients who need a detailed understanding of test findings and a structured path forward.',
      'His clinical interests include nuclear cardiology, echocardiography, and cardiovascular diagnostics. Patients benefit from a balanced approach that combines careful interpretation, prevention planning, and ongoing support for changing cardiovascular needs.',
    ],
    philosophy:
      'He emphasizes thoughtful diagnosis, patient education, and treatment plans that connect advanced testing with clear, practical follow-up care.',
    whyChoose: ['Nuclear cardiology expertise', 'Diagnostic clarity', 'Prevention and long-term care', 'Board-certified cardiovascular care'],
    faqs: [
      {
        question: 'What is Dr. Surender’s clinical focus?',
        answer: 'His focus includes comprehensive heart care, cardiovascular prevention, nuclear cardiology, echocardiography, and broader diagnostic evaluation.',
      },
      {
        question: 'Who may benefit from this kind of profile?',
        answer: 'Patients who need detailed cardiovascular testing, clearer interpretation of symptoms, or long-term management often benefit from this diagnostic-centered care approach.',
      },
      {
        question: 'Can testing and prevention be discussed in the same visit?',
        answer: 'Yes. The goal is to connect symptoms, risk factors, testing, and prevention into one organized treatment plan.',
      },
    ],
    education: [
      'University of Louisville School of Medicine, Fellowship in Cardiovascular Disease, 1995 - 1998',
      'Case Western Reserve University/University Hospitals Cleveland Medical Center, Residency in Internal Medicine, 1993 - 1995',
      'Zucker School of Medicine at Hofstra/Northwell, Internship in Internal Medicine, 1992 - 1993',
      'Osmania Medical College NTR UHS, Class of 1989',
    ],
    boardCertifications: ['Cardiovascular Disease', 'Interventional Cardiology'],
    specialInterests: ['Nuclear Cardiology', 'Echocardiography', 'Cardiovascular Diagnostics'],
    languages: ['Please contact the office for current language support options.'],
    memberships: ['American College of Cardiology (ACC)'],
  },
]

const physicianCards = [...physicians].sort((a, b) => {
  const surnameA = a.name.replace(/, MD$/, '').split(' ').at(-1) ?? a.name
  const surnameB = b.name.replace(/, MD$/, '').split(' ').at(-1) ?? b.name
  return surnameA.localeCompare(surnameB)
})

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

function isHomePath(pathname: string) {
  return pathname === '/' || pathname === ''
}

function HeroPhysicianCollage() {
  return (
    <div className="hero-physician-collage" aria-label="Southern Indiana Cardiology Associates physician team">
      {physicianCards.map((physician, index) => (
        <figure className={`hero-portrait hero-portrait--${index + 1}`} key={`hero-${physician.name}`}>
          <img src={physician.image} alt={physician.name} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          <figcaption>
            <span>{physician.role}</span>
            <strong>{physician.cardName.replace(', MD', '')}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

const clinicalGallery = [
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Cardiovascular imaging suite',
    tag: 'Imaging and procedures',
    cap: 'Testing and procedures are used when they help answer a clear clinical question.',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    alt: 'Cardiology office visit with physician and patient',
    tag: 'Office visits',
    cap: 'Visits start with symptoms, history, medications, and the questions patients bring in.',
  },
  {
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80',
    alt: 'Physician and patient reviewing treatment options',
    tag: 'Treatment planning',
    cap: 'When treatment is needed, options are reviewed with attention to safety and follow-up.',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    alt: 'Stethoscope on a clean clinical surface',
    tag: 'Exam room basics',
    cap: 'Good cardiology still begins with listening carefully and checking the fundamentals.',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1400&q=80',
    alt: 'Blood pressure monitor',
    tag: 'Everyday prevention',
    cap: 'Blood pressure trends, home readings, and risk factors help guide long-term prevention.',
  },
  {
    src: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=1400&q=80',
    alt: 'Follow-up heart health discussion',
    tag: 'Follow-up care',
    cap: 'Ongoing visits keep symptoms, medications, testing, and prevention goals connected over time.',
  },
]

const whyChooseCards = [
  {
    title: 'Experienced Specialists',
    meta: 'Physician-led care',
    copy: 'Patients are cared for by cardiology specialists with experience across prevention, diagnosis, intervention, and chronic disease management.',
  },
  {
    title: 'Advanced Diagnostics',
    meta: 'Better clarity',
    copy: 'Echo, stress testing, rhythm monitoring, vascular studies, and imaging help create a more complete cardiovascular picture.',
  },
  {
    title: 'Personalized Treatment Plans',
    meta: 'Care built around you',
    copy: "Treatment recommendations are tailored to each patient's symptoms, history, risk factors, and long-term health goals.",
  },
  {
    title: 'Long-Term Heart Health',
    meta: 'Ongoing management',
    copy: 'SICA supports patients through prevention, follow-up, medication optimization, and long-term cardiovascular care.',
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
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
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
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.1 3.3 7.6 6.7 5.9 8.1c.8 1.8 2.2 3.2 4 4l1.4-1.7 3.4 1.5-.5 2.9c-.2.9-1 1.5-1.9 1.4C7.7 15.7 4.3 12.3 3.8 7.7c-.1-.9.5-1.7 1.4-1.9l.9-2.5Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M11 15h1" />
      <path d="M12 15v3" />
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

function AppointmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="appointment-modal" role="presentation" onClick={onClose}>
      <div
        className="appointment-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" aria-label="Close appointment form" className="appointment-modal__close" onClick={onClose}>
          ×
        </button>
        <div className="appointment-modal__header">
          <div className="appointment-modal__eyebrow">
            <CalendarIcon />
            <span>Request an Appointment</span>
          </div>
          <h3 id="appointment-modal-title">Tell us a little about you</h3>
          <p>Office requests are reviewed by our team, and we will follow up to confirm the next step.</p>
        </div>
        <form className="appointment-form" onSubmit={(event) => event.preventDefault()}>
          <div className="appointment-form__row">
            <label>
              First name
              <input type="text" name="firstName" autoComplete="given-name" />
            </label>
            <label>
              Last name
              <input type="text" name="lastName" autoComplete="family-name" />
            </label>
          </div>
          <label>
            Phone
            <input type="tel" name="phone" autoComplete="tel" placeholder="812-924-7065" />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" placeholder="you@email.com" />
          </label>
          <label>
            Reason for visit
            <textarea name="reason" rows={4} placeholder="Briefly describe your symptoms or what you'd like to discuss." />
          </label>
          <button type="submit" className="button primary appointment-form__submit">
            Send Request
          </button>
        </form>
      </div>
    </div>
  )
}

function StarRow() {
  return (
    <div className="star-row" aria-label="Five star experience">
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
        <div className="physician-profile-breadcrumbs">
          <InternalLink href="/#providers" onNavigate={onNavigate}>
            Physicians
          </InternalLink>
          <span>/</span>
          <strong>{physician.profileHeading}</strong>
        </div>

        <div className="physician-profile-hero">
          <div className="physician-profile-hero__content">
            <h1>{physician.profileHeading}</h1>
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
                <h2>Conditions treated</h2>
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
            <nav className="physician-profile-sidebar__nav" aria-label={`${physician.profileHeading} profile sections`}>
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
            <div className="physician-profile-sidebar__cta">
              <button type="button" className="button primary" onClick={onOpenAppointment}>
                Request Appointment <ArrowIcon />
              </button>
            </div>
          </aside>
        </div>

        <section className="physician-profile-final-cta physician-profile-final-cta--simple">
          <div>
            <p className="eyebrow">Request an Appointment</p>
            <h2>Take the next step with trusted cardiovascular care.</h2>
            <p>
              Request a visit with {physician.profileHeading} and our office will help coordinate the right next step
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
        <div className="physician-profile-breadcrumbs">
          <InternalLink href="/#services" onNavigate={onNavigate}>
            Services
          </InternalLink>
          <span>/</span>
          <strong>Diagnostic Testing</strong>
        </div>

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
              <div className="diagnostic-zigzag-card__image">
                <img src={test.image} alt={test.title} loading="lazy" decoding="async" />
              </div>
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

export default function App() {
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, -90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.35])

  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const [route, setRoute] = useState(getRouteState)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const lenisRef = useRef<Lenis | null>(null)
  const activePhysician = useMemo(() => getPhysicianFromPath(route.pathname), [route.pathname])
  const diagnosticTestingOpen = useMemo(() => isDiagnosticTestingPath(route.pathname), [route.pathname])

  useEffect(() => {
    if (activePhysician || diagnosticTestingOpen) return

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
  }, [activePhysician, diagnosticTestingOpen])

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
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
  }

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85 })
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
  }, [])

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

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.hash, route.pathname])

  return (
    <div className="site-shell">
      <div className="page-wipe" aria-hidden="true" />
      <header className="navigation">
        <div className={`nav_layout-2${navOpen ? ' is-open' : ''}`}>
          <InternalLink className="nav_home" href="/" onNavigate={navigateTo} aria-label="Southern Indiana Cardiology Associates home">
            <div className="nav_logo-container">
              <div className="logo brand-mark">
                <img src="/sica-assets/sica-symbol.png" alt="Southern Indiana Cardiology Associates" />
                <span className="nav-brand-copy">
                  <strong>Southern Indiana Cardiology Associates</strong>
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
                <h1>
                  <span>Expert Cardiovascular Care.</span>
                  <span>Experienced Specialists.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="hero-copy">
                  Now welcoming new patients for comprehensive cardiovascular evaluation, treatment, and long-term heart health management.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="hero-actions">
                  <button type="button" className="button primary" onClick={() => setAppointmentOpen(true)}>
                    Request Appointment <ArrowIcon />
                  </button>
                  <InternalLink className="button secondary" href="#providers" onNavigate={navigateTo}>
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
                  <InternalLink className="provider-link" href={getPhysicianPath(physician.id)} onNavigate={navigateTo}>
                    View Full Profile <ArrowIcon />
                  </InternalLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CLINICAL CARE GALLERY ─── */}
        <section id="community" className="community-section">
          <div className="section-heading">
            <p className="eyebrow">What Care Looks Like</p>
            <h2>Straightforward heart care, from the first conversation to follow-up.</h2>
            <p>SICA visits are built around practical details: what symptoms mean, which tests are useful, and what the next step should be.</p>
          </div>
          <div className="leadership-proof" aria-label="SICA clinical care highlights">
            <span><strong>Plain-language visits</strong><small>Results are explained clearly, without making the visit feel rushed.</small></span>
            <span><strong>Care built around you</strong><small>Plans are based on symptoms, history, test results, and health goals.</small></span>
            <span><strong>Organized follow-up</strong><small>Medications, testing, and next steps stay connected over time.</small></span>
          </div>
          <div className="gal-grid">
            {clinicalGallery.map((item) => (
              <div className="gc" key={item.alt}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <div className="gc-cap">
                  <div className="gc-tag">{item.tag}</div>
                  <p>{item.cap}</p>
                </div>
              </div>
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
                  ref={(el) => { cardRefs.current[index] = el }}
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
                <div className="nc-body">
                  <div className="ns">
                    <span className="ns-tag def">SICA</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                  <div className="nc-link">{card.meta} <ArrowIcon /></div>
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
            <div className="privacy-lock"></div>
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
              Schedule a consultation with Southern Indiana Cardiology Associates and receive expert cardiovascular
              care tailored to your needs.
            </p>
            <div className="hero-actions">
              <button type="button" className="button primary" onClick={() => setAppointmentOpen(true)}>
                Request Appointment <ArrowIcon />
              </button>
              <InternalLink className="button secondary" href="#contact" onNavigate={navigateTo}>
                Contact Us
              </InternalLink>
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
            <div className="footer-col">
              <strong>Services</strong>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Preventive Cardiology</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Cardiac Diagnostics</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Interventional Cardiology</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Heart Failure Management</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Vascular Studies</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Hypertension Management</InternalLink>
            </div>
            <div className="footer-col">
              <strong>Visit</strong>
              <span>Southern Indiana</span>
              <span>Office details available by appointment</span>
            </div>
            <div className="footer-col">
              <strong>Contact</strong>
              <InternalLink href={isHomePath(route.pathname) ? '#contact' : '/#contact'} onNavigate={navigateTo}>Request Appointment</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#contact' : '/#contact'} onNavigate={navigateTo}>Contact Us</InternalLink>
            </div>
            <div className="footer-col">
              <strong>Navigate</strong>
              <InternalLink href={isHomePath(route.pathname) ? '#services' : '/#services'} onNavigate={navigateTo}>Services</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#providers' : '/#providers'} onNavigate={navigateTo}>Physicians</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#community' : '/#community'} onNavigate={navigateTo}>Clinical Care</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#news' : '/#news'} onNavigate={navigateTo}>Why SICA</InternalLink>
              <InternalLink href={isHomePath(route.pathname) ? '#contact' : '/#contact'} onNavigate={navigateTo}>Request Appointment</InternalLink>
            </div>
          </div>

          <div className="footer-legal-bar">
            <p>Educational information only. Always consult a qualified healthcare provider for diagnosis and treatment.</p>
            <p>© {currentYear} Southern Indiana Cardiology Associates.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
