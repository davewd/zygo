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
    description: 'Specialist obstetric care providing medical management of pregnancy from conception to delivery. Includes advanced monitoring protocols, diagnostic ultrasounds, and evidence-based interventions with FRANZCOG-certified specialists.',
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
    description: 'Subspecialist management of high-risk pregnancies requiring advanced medical intervention. Includes maternal-fetal medicine consultation, complex monitoring protocols, and multidisciplinary care coordination for optimal outcomes.',
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
    description: 'Specialist women\'s health consultations providing medical assessment and treatment of gynaecological conditions. Includes clinical examination, diagnostic procedures, and evidence-based management plans.',
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
    description: 'Medical fertility assessment utilizing advanced reproductive endocrinology and diagnostic technologies. Includes comprehensive testing protocols, specialist consultation, and evidence-based treatment pathways for infertility.',
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
  bio: 'Dr. Shelley Rowlands is a FRANZCOG-certified obstetrician and gynaecologist with subspecialist expertise in maternal-fetal medicine and reproductive health. Based in Eastern Melbourne, she provides advanced medical care for complex pregnancies, fertility disorders, and challenging gynaecological conditions, combining clinical excellence with cutting-edge medical technology.',
  personalStory: 'My passion for women\'s health began during my medical training when I witnessed the profound impact that specialist care can have on women and families facing complex health challenges. As both a medical specialist and a mother, I understand the importance of providing expert clinical care while maintaining the human connection that makes all the difference in healthcare.',
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
  approach: 'My practice is built on evidence-based medicine and subspecialist expertise. I take a comprehensive approach to women\'s health, utilizing advanced diagnostic techniques and innovative treatment protocols. Every patient receives individualized medical care based on the latest research and clinical guidelines, ensuring optimal outcomes for even the most complex conditions.',
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
  description: 'Leading specialist obstetric and gynaecological practice offering advanced medical care for women. Our FRANZCOG-certified specialists provide evidence-based treatment for complex pregnancies, reproductive health conditions, and comprehensive women\'s medical services.',
  overview: 'EMOG is a specialist medical practice focused on advanced obstetric and gynaecological care in Eastern Melbourne. Led by Dr. Shelley Rowlands, our practice delivers expert medical management for high-risk pregnancies, fertility challenges, and complex gynaecological conditions. We combine state-of-the-art medical technology with specialist expertise to provide comprehensive women\'s healthcare from adolescence through menopause.',
  mission: 'To deliver excellence in specialist women\'s healthcare through advanced medical expertise, innovative treatment approaches, and evidence-based practice. We are committed to providing the highest standard of obstetric and gynaecological care for women facing complex health challenges.',
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
    'FRANZCOG-certified specialist care',
    'Advanced maternal-fetal medicine',
    'High-risk pregnancy management',
    'Subspecialist fertility assessment',
    'State-of-the-art ultrasound technology',
    'Evidence-based treatment protocols',
    'Medicare specialist rebates',
    'Complex gynaecological procedures',
    'Multidisciplinary care coordination',
    'Emergency obstetric intervention',
    'Advanced reproductive medicine',
    'Specialist referral pathways'
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
  culturalConsiderations: 'EMOG provides culturally responsive medical care, understanding that health beliefs and practices vary across communities. Our specialist team works collaboratively with patients from diverse backgrounds to ensure medical decisions align with cultural values while maintaining the highest standards of clinical care.'
};
