import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  LACTATION_SUPPORT: {
    id: 'lactation-support',
    name: 'Lactation Support',
    description: 'Professional breastfeeding support and consultation',
    taxonomy: 'healthcare'
  },
  ANTENATAL_CARE: {
    id: 'antenatal-care',
    name: 'Antenatal Care',
    description: 'Pregnancy and pre-birth preparation and support',
    taxonomy: 'healthcare'
  },
  MIDWIFERY: {
    id: 'midwifery',
    name: 'Midwifery Services',
    description: 'Professional midwifery care and support',
    taxonomy: 'healthcare'
  },
  EDUCATION: {
    id: 'education',
    name: 'Educational Workshops',
    description: 'Educational programs and training sessions',
    taxonomy: 'education'
  },
  SUPPORT_GROUPS: {
    id: 'support-groups',
    name: 'Support Groups',
    description: 'Peer support and group programs',
    taxonomy: 'support'
  }
};

// Services offered
export const FULL_CIRCLE_SERVICES: Service[] = [
  {
    id: 'initial-lactation-consultation',
    name: 'Initial Lactation Consultation',
    description: 'We\'ll work through your full history and gather an understanding of your lactation concerns and current challenges. After a full assessment of your unique mother-baby care, together we will make a forward plan. This plan will be aligned to your individual goals and feature evidence-based solutions that are tailored for you and your baby. Online, home visit or clinic consultations available. Bulk billed phone calls also included in this service.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 90, // 60-120 minutes
    price: {
      amount: 230,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 105.85
      }
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['breastfeeding', 'latching', 'milk-supply', 'positioning', 'mastitis', 'tongue-tie', 'initial-assessment', 'comprehensive-care']
  },
  {
    id: 'follow-up-lactation-consultation',
    name: 'Follow-Up Lactation Consultations',
    description: 'After your initial lactation consultation, there is often a need for further follow-up as \'the plan\' develops and changes. These follow up consultations help you and your family find your confidence with the many newfound skills in the postnatal period. Bulk billed phone calls also included in this service. Online, phone, home visit or clinic consultations available.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 90, // 60-120 minutes
    price: {
      amount: 210,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 105.85
      }
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['follow-up', 'adjustment', 'confidence-building', 'skill-development', 'postnatal-support']
  },
  {
    id: 'before-birth-consultation',
    name: '\'Before Birth\' Consultation',
    description: 'This \'before birth\' consultation is appropriate at any stage in a pregnancy or even preconception. However, we generally recommend you book this consult from 30 weeks onward. Together, we work through your full history and gather an understanding of any previous challenges and potential future concerns. After a thorough assessment, we\'ll make a forward plan to ensure you\'re confident to face your individual feeding desires, once baby arrives. This consultation also includes our signature Full Circle Antenatal Expressing Kit and all the necessary guidance to set you off to your best start breastfeeding.',
    category: SERVICE_CATEGORIES.ANTENATAL_CARE,
    duration: 105, // 90-120 minutes
    price: {
      amount: 230,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 107.95
      }
    },
    ageGroups: ['prenatal'],
    tags: ['preparation', 'antenatal', 'expressing', 'planning', 'antenatal-kit', 'preconception', 'feeding-goals']
  },
  {
    id: 'essential-knowledge-preparation',
    name: 'Essential Knowledge & Preparation Workshop',
    description: 'This nourishing workshop provides you with all the essential knowledge on: Newborn biological needs, typical newborn behaviour, getting breastfeeding off to the best start, newborn sleep behaviours and healthy expectations, the importance of responsive care and tuning into your baby\'s unique communication and cues... and SO much more! We\'ll support you in finding connection with yourself and each other through the journey of new parenthood, whilst also being realistic and honest about the unforeseeable potential challenges of this chapter of life. This workshop will also arm you with the essential \'red flags\' to know when things aren\'t quite going to plan and what to do about it.',
    category: SERVICE_CATEGORIES.EDUCATION,
    duration: 120,
    price: {
      amount: 250,
      currency: 'AUD'
    },
    ageGroups: ['prenatal'],
    tags: ['group-class', 'education', 'newborn-care', 'preparation', 'sleep-expectations', 'responsive-care', 'communication-cues', 'red-flags', 'couples-welcome']
  },
  {
    id: 'mastitis-support',
    name: 'Mastitis Support',
    description: 'Specialized care and treatment for mastitis including assessment, treatment planning, and prevention strategies. Full Circle offers IBCLC support in Brisbane for mastitis management.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['mastitis', 'infection', 'treatment', 'prevention', 'IBCLC-support']
  },
  {
    id: 'tongue-tie-assessment',
    name: 'Tongue Tie Assessment',
    description: 'Professional assessment of tongue tie and its impact on feeding, with referral pathways for treatment. Comprehensive evaluation of how tongue tie affects breastfeeding success.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['tongue-tie', 'assessment', 'feeding-difficulties', 'referral-pathways']
  },
  {
    id: 'jaundice-support',
    name: 'Jaundice Support',
    description: 'Expert lactation support for babies with jaundice, focusing on maintaining breastfeeding while managing the condition.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn'],
    tags: ['jaundice', 'newborn-complications', 'breastfeeding-maintenance', 'medical-support']
  },
  {
    id: 'cluster-feeding-support',
    name: 'Cluster Feeding Support',
    description: 'Guidance and support for managing cluster feeding patterns, helping families understand normal newborn behavior and feeding expectations.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['cluster-feeding', 'feeding-patterns', 'normal-behavior', 'expectations', 'support']
  },
  {
    id: 'nipple-thrush-treatment',
    name: 'Nipple Thrush Treatment',
    description: 'Professional assessment and treatment planning for nipple thrush, with ongoing support throughout recovery.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['nipple-thrush', 'thrush-treatment', 'fungal-infection', 'recovery-support']
  },
  {
    id: 'cracked-nipples-care',
    name: 'Cracked Nipples Care',
    description: 'Specialized care for cracked nipples including assessment of causes, treatment options, and prevention strategies.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['cracked-nipples', 'nipple-care', 'pain-management', 'healing', 'prevention']
  },
  {
    id: 'torticollis-feeding-support',
    name: 'Torticollis Feeding Support',
    description: 'Specialized feeding support for babies with torticollis, focusing on positioning and techniques to ensure successful breastfeeding.',
    category: SERVICE_CATEGORIES.LACTATION_SUPPORT,
    duration: 60,
    ageGroups: ['newborn', 'infant'],
    tags: ['torticollis', 'positioning', 'feeding-techniques', 'specialized-care']
  }
];

// Rebecca Cavallaro Provider
export const REBECCA_CAVALLARO: ServiceProvider = {
  id: 'rebecca-cavallaro',
  firstName: 'Rebecca',
  lastName: 'Cavallaro',
  title: 'IBCLC, Midwife, RN',
  bio: 'Rebecca is a registered nurse, medicare-endorsed midwife and International Board Certified Lactation Consultant (IBCLC) with over 17 years of Australian and UK experience in clinical midwifery care, women\'s health research, neonatal intensive care nursery and maternal fetal medicine. She specialises in gestational diabetes, pregnancy after loss, palliative pregnancies, neonatal complications, and breastfeeding trauma.',
  personalStory: 'As a mother of four (one angel baby), Rebecca has diverse first-hand experience in breastfeeding challenges. These challenges bring great depth of wisdom and empathy to her consultations. Her personal journey through the complexities of motherhood and breastfeeding fuels her passion for supporting other families.',
  credentials: [
    {
      title: 'Masters of Midwifery Graduate Certificate',
      issuingBody: 'Australian University',
      verified: true
    },
    {
      title: 'Registered Nurse',
      abbreviation: 'RN',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'Registered Endorsed Midwife',
      abbreviation: 'RM',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'International Board Certified Lactation Consultant',
      abbreviation: 'IBCLC',
      issuingBody: 'International Board of Lactation Consultant Examiners',
      verified: true
    }
  ],
  services: FULL_CIRCLE_SERVICES,
  specializations: [
    'Gestational diabetes',
    'Pregnancy after loss',
    'Palliative pregnancies',
    'Neonatal complications',
    'Breastfeeding trauma',
    'Mastitis management',
    'Tongue tie assessment',
    'Cluster feeding support',
    'Jaundice management',
    'Nipple thrush treatment',
    'Cracked nipples care',
    'Torticollis feeding support',
    'Responsive parenting',
    'Antenatal expressing'
  ],
  languages: ['English'],
  yearsExperience: 17,
  approach: 'Rebecca uses a holistic, evidence-based approach that is tailored to each family\'s unique needs. She believes in empowering parents to trust their intuition while providing the knowledge and support needed to build confidence. At Full Circle, we don\'t have any agenda for women to breastfeed specifically, although we wholeheartedly support it. We want families to receive the postnatal continuity of care they need to do the incredibly important job of responsive parenting and confidently transitioning to life with baby.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: true,
    emergency: true
  },
  pricing: {
    consultationFee: 230,
    followUpFee: 210,
    currency: 'AUD'
  }
};

// Full Circle Midwifery & Lactation Support Center
export const FULL_CIRCLE_CENTER: ServiceCenter = {
  id: 'full-circle-midwifery-lactation',
  name: 'Full Circle Midwifery & Lactation Support',
  description: 'Brisbane-based midwifery and lactation treatment and support service for mothers, babies, and families before and after birth. As experienced lactation consultants and private practice midwives, our services are personalised, using a holistic approach to identify solutions that work for you and your baby.',
  overview: 'Full Circle is a team of International Board Certified Lactation Consultants (IBCLC) and private practice midwives in Brisbane. We\'re passionate about continuity of care in the postpartum period and filling the gap of support that\'s missing for many mothers and babies. Every mother and baby is different and unique. Offering expert advice and experience, we guide and support you with birth, breastfeeding, and transitioning to life with baby. Our lactation consultations are tailored to you and your baby.',
  mission: 'We\'re here to change hearts and minds about how to offer true lactation support and critical postnatal care in Australia. Our research-based tools and techniques support you through the cycles of birth, breastfeeding and transitioning with your baby.',
  location: {
    address: '308 Lutwyche Road',
    suburb: 'Windsor',
    state: 'Queensland',
    postcode: '4030',
    country: 'Australia',
    coordinates: {
      lat: -27.4339,
      lng: 153.0281
    }
  },
  contact: {
    phone: '0455 042 222',
    email: 'fullcirclelactation@gmail.com',
    website: 'https://www.fullcirclemls.com',
    bookingUrl: 'https://full-circle-midwifery-and-lactation.au1.cliniko.com/bookings#service',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/fullcirclemls/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/fullcirclemls'
      }
    ]
  },
  providers: [REBECCA_CAVALLARO],
  services: FULL_CIRCLE_SERVICES,
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '15:00' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Family-friendly clinic environment',
    'Medicare rebates available (in first 6 weeks post birth)',
    'Private health insurance rebates',
    'Multiple consultation formats (in-person, online, home visits, phone)',
    'Urgent care available Monday-Saturday',
    'Bulk billed phone support included with consultations',
    'Cultural acknowledgment and respect',
    'No agenda approach - supportive of all feeding choices',
    'Continuity of postnatal care',
    'Evidence-based, personalized solutions',
    'Signature Full Circle Antenatal Expressing Kit included',
    'Red flags education and early intervention'
  ],
  certifications: [
    'IBCLC Certified',
    'Medicare Provider',
    'Australian Health Practitioner Regulation Agency Registered'
  ],
  insurance: [
    'Medicare',
    'Private Health Insurance (varies by provider)'
  ],
  accessibility: [
    'Family-friendly space',
    'Inner city location',
    'Public transport accessible',
    'Parking available'
  ],
  establishedYear: 2020,
  culturalConsiderations: 'Full Circle Midwifery & Lactation Support acknowledges and respects that the land we walk upon today has a dreaming that continues to connect people, country and culture. We honour the traditional custodians of this land, their spiritual and cultural belonging, and recognise their continuing connection to the land, waters and culture.'
};
