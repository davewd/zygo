import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const PROLOGUE_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  FERTILITY: {
    id: 'fertility',
    name: 'Fertility Services',
    description: 'Comprehensive fertility assessment, treatment and support',
    taxonomy: 'healthcare'
  },
  OBSTETRICS: {
    id: 'obstetrics',
    name: 'Obstetrics',
    description: 'Complete obstetric care and pregnancy support',
    taxonomy: 'healthcare'
  },
  EGG_FREEZING: {
    id: 'egg-freezing',
    name: 'Egg Freezing',
    description: 'Fertility preservation through egg freezing',
    taxonomy: 'healthcare'
  },
  INTEGRATIVE_CARE: {
    id: 'integrative-care',
    name: 'Integrative Care',
    description: 'Holistic approach combining medical care with complementary therapies',
    taxonomy: 'wellness'
  },
  NURSING_SUPPORT: {
    id: 'nursing-support',
    name: 'Nursing Support',
    description: 'Specialized nursing care and patient coordination',
    taxonomy: 'healthcare'
  }
};

// Prologue Services
export const PROLOGUE_SERVICES: Service[] = [
  {
    id: 'fertility-consultation',
    name: 'Fertility Consultation & Assessment',
    description: 'Comprehensive fertility assessment including hormone testing, imaging, and personalized treatment planning. Our approach pays attention to every detail of your unique journey.',
    category: PROLOGUE_SERVICE_CATEGORIES.FERTILITY,
    duration: 60,
    price: {
      amount: 450,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 150
      }
    },
    ageGroups: ['adult'],
    tags: ['fertility-testing', 'hormone-assessment', 'treatment-planning', 'personalized-care']
  },
  {
    id: 'ivf-treatment',
    name: 'IVF Treatment Cycles',
    description: 'Complete IVF treatment with state-of-the-art facilities at Monash IVF. Includes monitoring, egg retrieval, embryo transfer, and comprehensive support throughout.',
    category: PROLOGUE_SERVICE_CATEGORIES.FERTILITY,
    duration: 120,
    ageGroups: ['adult'],
    tags: ['IVF', 'assisted-reproduction', 'embryo-transfer', 'monitoring']
  },
  {
    id: 'egg-freezing-consultation',
    name: 'Egg Freezing Consultation',
    description: 'Expert guidance on fertility preservation through egg freezing. Comprehensive assessment, timing recommendations, and ongoing support through the process.',
    category: PROLOGUE_SERVICE_CATEGORIES.EGG_FREEZING,
    duration: 45,
    price: {
      amount: 350,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 120
      }
    },
    ageGroups: ['adult'],
    tags: ['fertility-preservation', 'egg-freezing', 'future-planning', 'consultation']
  },
  {
    id: 'obstetric-care',
    name: 'Complete Obstetric Care',
    description: 'Comprehensive pregnancy care from conception to birth. Regular monitoring, personalized birthing plans, and exceptional support in our thoughtfully designed spaces.',
    category: PROLOGUE_SERVICE_CATEGORIES.OBSTETRICS,
    duration: 45,
    price: {
      amount: 380,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 85
      }
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['pregnancy-care', 'birthing-plan', 'monitoring', 'prenatal-support']
  },
  {
    id: 'pregnancy-support',
    name: 'Pregnancy Support & Monitoring',
    description: 'Regular pregnancy check-ups in our calming, nurturing environment. Includes ultrasounds, monitoring, and emotional support throughout your pregnancy journey.',
    category: PROLOGUE_SERVICE_CATEGORIES.OBSTETRICS,
    duration: 30,
    ageGroups: ['prenatal', 'adult'],
    tags: ['pregnancy-monitoring', 'ultrasound', 'emotional-support', 'check-ups']
  },
  {
    id: 'integrative-approach',
    name: 'Integrative Approach Consultation',
    description: 'Combining medical excellence with complementary therapies for holistic care. Personalized treatment plans that address your physical, emotional, and spiritual wellbeing.',
    category: PROLOGUE_SERVICE_CATEGORIES.INTEGRATIVE_CARE,
    duration: 90,
    price: {
      amount: 420,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['holistic-care', 'complementary-therapy', 'wellness', 'personalized-treatment']
  },
  {
    id: 'fertility-nursing-support',
    name: 'Fertility Nursing Support',
    description: 'Specialized nursing care throughout your fertility journey. Includes treatment coordination, emotional support, and practical guidance from experienced fertility nurses.',
    category: PROLOGUE_SERVICE_CATEGORIES.NURSING_SUPPORT,
    duration: 45,
    ageGroups: ['adult'],
    tags: ['nursing-care', 'treatment-coordination', 'emotional-support', 'fertility-journey']
  }
];

// Dr. Justin Tucker - Founder
export const DR_JUSTIN_TUCKER: ServiceProvider = {
  id: 'dr-justin-tucker',
  firstName: 'Justin',
  lastName: 'Tucker',
  title: 'Obstetrician & Fertility Specialist, Founder of Prologue',
  profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  bio: 'Dr. Justin Tucker is the visionary founder of Prologue, an Obstetrician and Fertility Specialist committed to providing exceptional, personalized care. His constant reference point is ensuring patients receive the type of care he would want his sister to receive - a place that honestly nurtures, advocates, protects and cares in every way possible.',
  personalStory: 'Growing up in outer suburbs of Melbourne, I never initially intended to be a doctor. After completing science at The University of Melbourne, I moved to Sydney for medical school. My journey led me through Emergency Medicine before finding my true calling in Obstetrics and Gynaecology. I believe that providing exceptional medical care is just our base - at Prologue, we go far beyond this. Every touchpoint in your experience has been heavily considered because we pay attention to EVERY detail.',
  credentials: [
    {
      title: 'Bachelor of Medicine, Bachelor of Surgery',
      abbreviation: 'MBBS',
      issuingBody: 'The University of Sydney',
      verified: true
    },
    {
      title: 'Fellowship in Obstetrics and Gynaecology',
      abbreviation: 'FRANZCOG',
      issuingBody: 'Royal Australian and New Zealand College of Obstetricians and Gynaecologists',
      verified: true
    },
    {
      title: 'Masters in Reproductive Medicine',
      abbreviation: 'MRepMed',
      issuingBody: 'The University of New South Wales',
      verified: true
    },
    {
      title: 'Fellowship in Obstetrics',
      abbreviation: 'Fellowship',
      issuingBody: 'Royal Prince Alfred Hospital',
      verified: true
    }
  ],
  services: PROLOGUE_SERVICES.filter(service => 
    ['fertility-consultation', 'ivf-treatment', 'obstetric-care', 'pregnancy-support', 'integrative-approach'].includes(service.id)
  ),
  specializations: [
    'Fertility Assessment & Treatment',
    'IVF & Assisted Reproduction',
    'Obstetric Care',
    'Pregnancy Management',
    'Fertility Preservation',
    'Integrative Medicine',
    'Patient-Centered Care',
    'Holistic Treatment Approaches'
  ],
  languages: ['English'],
  yearsExperience: 15,
  approach: 'At Prologue, I have created a world where exceptional medical care meets unparalleled service. My approach is grounded in gestalt psychology - caring for you as a whole person, not just a medical case. I believe in collaboration, listening to your instincts, and ensuring you understand and are happy with your care plan. There is no tolerance of confusion, no acceptance of unease, and no underestimation of the power of your instinct.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: false,
    emergency: true
  },
  pricing: {
    consultationFee: 450,
    followUpFee: 280,
    currency: 'AUD'
  }
};

// Andrea Dunne - Head Fertility Nurse
export const ANDREA_DUNNE: ServiceProvider = {
  id: 'andrea-dunne',
  firstName: 'Andrea',
  lastName: 'Dunne',
  title: 'Head Fertility Nurse',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  bio: 'Andrea is an incredibly talented Fertility Nurse who brings depth and experience that is a major asset to the Prologue fertility team. As Head Fertility Nurse, Andrea remembers who you are, what we are doing, and why we are doing it.',
  personalStory: 'With years of experience in fertility nursing, I understand the emotional and physical challenges of the fertility journey. My priority is helping you feel understood, comfortable, and confident as you move forward. I bring my experience to anticipate issues before you have to experience them, and I work to make sure your fertility journey is tailored to suit what is going on in the bigger picture of your life.',
  credentials: [
    {
      title: 'Registered Nurse',
      abbreviation: 'RN',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'Fertility Nursing Specialist',
      abbreviation: 'FNS',
      issuingBody: 'Australian Fertility Society',
      verified: true
    },
    {
      title: 'Graduate Certificate in Reproductive Medicine',
      abbreviation: 'GradCert',
      issuingBody: 'University of Technology Sydney',
      verified: true
    }
  ],
  services: PROLOGUE_SERVICES.filter(service => 
    ['fertility-nursing-support', 'fertility-consultation', 'ivf-treatment'].includes(service.id)
  ),
  specializations: [
    'Fertility Treatment Coordination',
    'IVF Cycle Management',
    'Patient Education',
    'Emotional Support',
    'Treatment Planning',
    'Monash IVF Integration'
  ],
  languages: ['English'],
  yearsExperience: 12,
  approach: 'I believe in providing personalized, compassionate care that addresses both the medical and emotional aspects of fertility treatment. Working closely with Monash IVF, I ensure we integrate their resources into your care when needed. At Prologue, we offer after-hours support so you\'re never alone when questions or unexpected needs arise.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: false,
    emergency: true
  },
  pricing: {
    consultationFee: 220,
    followUpFee: 150,
    currency: 'AUD'
  }
};

// Polly Delaney - Registered Midwife
export const POLLY_DELANEY: ServiceProvider = {
  id: 'polly-delaney',
  firstName: 'Polly',
  lastName: 'Delaney',
  title: 'Registered Midwife & Lactation Support',
  profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  bio: 'Polly is a brilliant asset to the Prologue team and a wonderful resource for our obstetric patients. She is an experienced midwife who works on the Delivery Suite at the Mater Hospital and is also a Registered Nurse and mother to 3 children.',
  personalStory: 'As a mother of three children and experienced midwife, I understand the challenges and joys of pregnancy, birth, and early motherhood firsthand. My personal experience, combined with my professional expertise, allows me to provide truly empathetic and practical support during those crucial first months of caring for and feeding a newborn.',
  credentials: [
    {
      title: 'Registered Midwife',
      abbreviation: 'RM',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'Registered Nurse',
      abbreviation: 'RN',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'Lactation Support Certification',
      abbreviation: 'LC',
      issuingBody: 'Australian Lactation Consultants Association',
      verified: true
    }
  ],
  services: PROLOGUE_SERVICES.filter(service => 
    ['obstetric-care', 'pregnancy-support'].includes(service.id)
  ),
  specializations: [
    'Obstetric Care',
    'Lactation Support',
    'Newborn Care',
    'Postpartum Support',
    'Delivery Suite Care',
    'Breastfeeding Support'
  ],
  languages: ['English'],
  yearsExperience: 8,
  approach: 'I believe in providing holistic support that extends beyond birth. My approach focuses on empowering mothers and families through education, practical support, and emotional care during pregnancy and those challenging first months with a newborn.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: true,
    emergency: false
  },
  pricing: {
    consultationFee: 180,
    followUpFee: 120,
    currency: 'AUD'
  }
};

// Prologue Service Center
export const PROLOGUE_CENTER: ServiceCenter = {
  id: 'prologue-fertility-obstetrics',
  name: 'Prologue',
  description: 'A collaboration of talented professionals who together have curated a modern and unique approach to fertility and obstetric care. We pay attention to every detail, especially YOUR detail, offering a level of understanding, options, opportunities and an experience that is like no other.',
  overview: 'When you engage Prologue, you are stepping into a world of exceptional creation. Located in the historic BMA House on Macquarie Street, our sanctuary offers a complete departure from the cold and clinical feel of traditional medical practices. Every touchpoint has been carefully curated to provide the type of care you deserve - safe, considered, exceptional, and deeply caring.',
  mission: 'To provide a "complete experience" that goes far beyond exceptional medical care. We are here FOR YOU, offering service akin to staying at a high-end hotel. Our shared love is to collaborate - within our team, with health professionals, with other creative industries, and most importantly, WITH YOU. We create care plans you understand and are happy with, with flexibility to address your unique needs and desires.',
  location: {
    address: 'Suite G01 & Suite G02, 135 Macquarie Street',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'Australia',
    coordinates: {
      lat: -33.8688,
      lng: 151.2093
    }
  },
  contact: {
    phone: '(02) 9519 4114',
    email: 'hello@prologue.com.au',
    website: 'https://www.prologue.com.au',
    bookingUrl: 'https://www.prologue.com.au/contact',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/prologue.au/'
      }
    ]
  },
  providers: [DR_JUSTIN_TUCKER, ANDREA_DUNNE, POLLY_DELANEY],
  services: PROLOGUE_SERVICES,
  operatingHours: {
    monday: { open: '08:00', close: '17:00' },
    tuesday: { open: '08:00', close: '17:00' },
    wednesday: { open: '08:00', close: '17:00' },
    thursday: { open: '08:00', close: '17:00' },
    friday: { open: '08:00', close: '16:00' },
    saturday: { closed: true, open: '', close: '' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Historic BMA House location with rich heritage',
    'Completely curated interiors designed for calming and nurturing',
    'Custom seasonal playlists and curated scents',
    'Sanctuary-like environment for staff and clients',
    'High-end hotel level service experience',
    'Multiple location options (CBD, Bondi Junction, North Sydney)',
    'Monash IVF clinic partnership',
    'Gestalt psychology-based approach',
    'Collaboration with health professionals and creative industries',
    'Personalized care plans with flexibility',
    'No tolerance for confusion - we sort it out',
    'Emotional intelligence and instinct honoring',
    'Complete experience beyond medical care'
  ],
  certifications: [
    'FRANZCOG Certified',
    'Medicare Provider',
    'Australian Health Practitioner Regulation Agency Registered',
    'Monash IVF Affiliated'
  ],
  insurance: [
    'Medicare',
    'Private Health Insurance (most major providers)',
    'Medibank',
    'Bupa',
    'HCF',
    'NIB'
  ],
  accessibility: [
    'Heritage building with modern accessibility features',
    'Central Sydney CBD location',
    'Public transport accessible',
    'Parking available nearby',
    'Multiple clinic locations',
    'Elevator access'
  ],
  images: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2018,
  culturalConsiderations: 'Prologue acknowledges and respects the traditional custodians of the land on which our practice stands. We honour the spiritual and cultural belonging of Aboriginal and Torres Strait Islander peoples and recognise their continuing connection to land, waters, and culture. Our approach is inclusive and respectful of all cultural backgrounds, values, and beliefs.'
};
