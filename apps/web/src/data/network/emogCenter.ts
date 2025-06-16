import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const EMOG_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  OBSTETRICS: {
    id: 'obstetrics',
    name: 'Obstetrics',
    description: 'Comprehensive pregnancy care and delivery services',
    taxonomy: 'healthcare'
  },
  GYNAECOLOGY: {
    id: 'gynaecology',
    name: 'Gynaecology',
    description: 'Women\'s reproductive health and gynecological services',
    taxonomy: 'healthcare'
  },
  FERTILITY: {
    id: 'fertility',
    name: 'Fertility Services',
    description: 'Fertility assessment and reproductive medicine',
    taxonomy: 'healthcare'
  },
  ULTRASOUND: {
    id: 'ultrasound',
    name: 'Ultrasound Services',
    description: 'Diagnostic imaging and monitoring services',
    taxonomy: 'healthcare'
  }
};

// Services offered
export const EMOG_SERVICES: Service[] = [
  {
    id: 'pregnancy-care',
    name: 'Comprehensive Pregnancy Care',
    description: 'Complete obstetric care from early pregnancy through delivery, including regular monitoring, ultrasounds, and birth planning with experienced obstetricians.',
    category: EMOG_SERVICE_CATEGORIES.OBSTETRICS,
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
    tags: ['pregnancy-care', 'delivery', 'monitoring', 'ultrasound', 'birth-planning']
  },
  {
    id: 'high-risk-pregnancy',
    name: 'High-Risk Pregnancy Management',
    description: 'Specialized care for complex pregnancies including multiple births, medical conditions, and pregnancy complications with expert maternal-fetal medicine.',
    category: EMOG_SERVICE_CATEGORIES.OBSTETRICS,
    duration: 60,
    price: {
      amount: 450,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 85
      }
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['high-risk', 'complex-pregnancy', 'multiples', 'maternal-fetal-medicine']
  },
  {
    id: 'gynaecological-consultation',
    name: 'Gynaecological Consultation',
    description: 'Comprehensive women\'s health assessments including routine examinations, contraceptive advice, and treatment of gynecological conditions.',
    category: EMOG_SERVICE_CATEGORIES.GYNAECOLOGY,
    duration: 30,
    price: {
      amount: 280,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 75
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['womens-health', 'contraception', 'routine-examination', 'gynecological-care']
  },
  {
    id: 'fertility-assessment',
    name: 'Fertility Assessment & Counseling',
    description: 'Comprehensive fertility evaluation and counseling for couples trying to conceive, including diagnostic testing and treatment planning.',
    category: EMOG_SERVICE_CATEGORIES.FERTILITY,
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
    tags: ['fertility-assessment', 'infertility', 'conception', 'diagnostic-testing']
  },
  {
    id: 'pregnancy-ultrasound',
    name: 'Pregnancy Ultrasound & Imaging',
    description: 'Detailed pregnancy ultrasounds including dating scans, morphology scans, and growth monitoring throughout pregnancy.',
    category: EMOG_SERVICE_CATEGORIES.ULTRASOUND,
    duration: 30,
    price: {
      amount: 220,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 105
      }
    },
    ageGroups: ['prenatal'],
    tags: ['ultrasound', 'pregnancy-monitoring', 'dating-scan', 'morphology-scan']
  },
  {
    id: 'menopause-management',
    name: 'Menopause Management',
    description: 'Comprehensive menopause care including hormone therapy, symptom management, and long-term health planning for women transitioning through menopause.',
    category: EMOG_SERVICE_CATEGORIES.GYNAECOLOGY,
    duration: 45,
    price: {
      amount: 320,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 75
      }
    },
    ageGroups: ['adult'],
    tags: ['menopause', 'hormone-therapy', 'symptom-management', 'womens-health']
  }
];

// Dr. Shelley Rowlands - Lead Obstetrician & Gynaecologist
export const DR_SHELLEY_ROWLANDS: ServiceProvider = {
  id: 'dr-shelley-rowlands',
  firstName: 'Shelley',
  lastName: 'Rowlands',
  title: 'Obstetrician & Gynaecologist',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  bio: 'Dr. Shelley Rowlands is an experienced obstetrician and gynaecologist providing comprehensive women\'s healthcare services in Eastern Melbourne. She specializes in pregnancy care, gynecological conditions, and reproductive health with a focus on personalized, compassionate care.',
  personalStory: 'As a mother and practicing obstetrician, I understand the importance of feeling supported and informed throughout your healthcare journey. I believe in building strong relationships with my patients and providing care that is tailored to each woman\'s unique needs and circumstances.',
  credentials: [
    {
      title: 'Fellow of the Royal Australian and New Zealand College of Obstetricians and Gynaecologists',
      abbreviation: 'FRANZCOG',
      issuingBody: 'RANZCOG',
      verified: true
    },
    {
      title: 'Bachelor of Medicine, Bachelor of Surgery',
      abbreviation: 'MBBS',
      issuingBody: 'University of Melbourne',
      verified: true
    },
    {
      title: 'Medicare Provider',
      abbreviation: 'Medicare',
      issuingBody: 'Australian Government',
      verified: true
    }
  ],
  services: EMOG_SERVICES,
  specializations: [
    'Obstetrics & Pregnancy Care',
    'Gynecological Conditions',
    'High-Risk Pregnancy Management',
    'Fertility Assessment',
    'Menopause Management',
    'Women\'s Reproductive Health',
    'Pregnancy Ultrasound',
    'Family Planning'
  ],
  languages: ['English'],
  yearsExperience: 15,
  approach: 'I believe in providing comprehensive, personalized care that empowers women to make informed decisions about their health. My approach combines clinical expertise with compassionate support, ensuring that each patient feels heard, understood, and well-cared for throughout their healthcare journey.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: true
  },
  pricing: {
    consultationFee: 280,
    followUpFee: 180,
    currency: 'AUD'
  }
};

// EMOG Service Center
export const EMOG_CENTER: ServiceCenter = {
  id: 'emog-eastern-melbourne',
  name: 'EMOG - Eastern Melbourne Obstetrics & Gynaecology',
  description: 'Comprehensive obstetric and gynecological care providing expert women\'s health services throughout pregnancy, reproductive health, and beyond.',
  overview: 'EMOG provides specialized obstetric and gynecological services with a focus on comprehensive women\'s healthcare. Our experienced team offers personalized care from pregnancy planning through menopause, ensuring continuity of care and excellence in women\'s health services.',
  mission: 'To provide exceptional obstetric and gynecological care that supports women through all stages of their reproductive health journey with expertise, compassion, and personalized attention.',
  location: {
    address: 'Suite 123, Medical Center',
    suburb: 'East Melbourne',
    state: 'VIC',
    postcode: '3002',
    country: 'Australia',
    coordinates: {
      lat: -37.8136,
      lng: 144.9775
    }
  },
  contact: {
    phone: '+61 3 9654 3210',
    email: 'reception@emog.com.au',
    website: 'https://emog.com.au',
    bookingUrl: 'https://emog.com.au/appointments',
    socialMedia: [
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/emogmelbourne'
      }
    ]
  },
  providers: [DR_SHELLEY_ROWLANDS],
  services: EMOG_SERVICES,
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
    'Comprehensive obstetric care',
    'Expert gynecological services',
    'High-risk pregnancy management',
    'Fertility assessment and counseling',
    'Pregnancy ultrasound and imaging',
    'Menopause management',
    'Medicare rebates available',
    'Experienced FRANZCOG specialists',
    'Personalized care plans',
    'Emergency obstetric support',
    'Family planning services',
    'Women\'s reproductive health focus'
  ],
  certifications: [
    'FRANZCOG Certified',
    'Medicare Provider',
    'Australian Health Practitioner Regulation Agency Registered'
  ],
  insurance: [
    'Medicare',
    'Private Health Insurance'
  ],
  accessibility: [
    'Wheelchair accessible',
    'Public transport accessible',
    'Parking available',
    'Lift access'
  ],
  images: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2010,
  culturalConsiderations: 'EMOG welcomes women from all cultural backgrounds and provides culturally sensitive care. We respect diverse beliefs and practices around pregnancy, birth, and women\'s health, and work with patients to ensure care aligns with their cultural and personal values.'
};
