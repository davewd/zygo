import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const MUMMYS_WHISPERS_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  MATERNITY_CARE: {
    id: 'maternity-care',
    name: 'Maternity Care',
    description: 'Comprehensive pre and post natal maternity services',
    taxonomy: 'healthcare'
  },
  SLEEP_CONSULTING: {
    id: 'sleep-consulting',
    name: 'Sleep Consulting',
    description: 'Professional sleep coaching and routine establishment',
    taxonomy: 'healthcare'
  },
  NEWBORN_CARE: {
    id: 'newborn-care',
    name: 'Newborn Care',
    description: 'Specialized care for newborns and infants',
    taxonomy: 'healthcare'
  },
  NURSERY_SETUP: {
    id: 'nursery-setup',
    name: 'Nursery Setup',
    description: 'Professional nursery preparation and setup services',
    taxonomy: 'support'
  },
  TRAVEL_ASSISTANCE: {
    id: 'travel-assistance',
    name: 'Travel Assistance',
    description: 'Infant and child travel support services',
    taxonomy: 'support'
  }
};

// Services offered
export const MUMMYS_WHISPERS_SERVICES: Service[] = [
  {
    id: 'in-home-consultation',
    name: 'In-Home Consultation',
    description: 'Comprehensive in-home assessment and consultation covering all aspects of newborn care, sleep routines, feeding support, and family transition guidance. Tailored to your family\'s specific needs.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.MATERNITY_CARE,
    duration: 120,
    price: {
      amount: 325,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['newborn-care', 'family-transition', 'personalized-care', 'home-visit']
  },
  {
    id: 'extended-in-home-consultation',
    name: 'Extended In-Home Consultation',
    description: 'Extended comprehensive consultation with detailed assessment, personalized care plan development, and follow-up support for complex situations or multiple births.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.MATERNITY_CARE,
    duration: 180,
    price: {
      amount: 445,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['comprehensive-assessment', 'multiples', 'complex-care', 'extended-support']
  },
  {
    id: '14-day-sleep-program-online',
    name: '14 Days of Sleep Training Program (Online)',
    description: 'Comprehensive online sleep training program using gentle methods, tailored specifically to your child\'s needs. Includes ongoing support and follow-up for 14 days.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.SLEEP_CONSULTING,
    duration: 2016, // 14 days program
    price: {
      amount: 1495,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant', 'toddler'],
    tags: ['sleep-training', 'gentle-methods', 'online-support', 'personalized-program']
  },
  {
    id: '14-day-sleep-program-premium',
    name: '14 Days of Sleep Training Program (Premium)',
    description: 'Premium sleep training program with additional support, personalized check-ins, and extended consultation time. Our most comprehensive sleep solution.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.SLEEP_CONSULTING,
    duration: 2016, // 14 days program
    price: {
      amount: 1750,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant', 'toddler'],
    tags: ['premium-support', 'sleep-training', 'intensive-program', 'one-on-one-support']
  },
  {
    id: 'maternity-nurse-service',
    name: 'Maternity Nurse Service',
    description: 'Professional maternity nurse care including 24-hour support, newborn care, feeding assistance, and family support. Available for short-term or extended periods.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.NEWBORN_CARE,
    duration: 1440, // 24 hours
    price: {
      amount: 280,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['24-hour-care', 'newborn-specialist', 'feeding-support', 'family-assistance']
  },
  {
    id: 'premium-maternity-nurse-service',
    name: 'Premium Maternity Nurse Service',
    description: 'Premium maternity nurse service with enhanced support, specialized care for complex situations, multiples, or high-needs families.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.NEWBORN_CARE,
    duration: 1440, // 24 hours
    price: {
      amount: 316,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['premium-care', 'specialized-support', 'multiples', 'complex-needs']
  },
  {
    id: 'nursery-setup-service',
    name: 'Nursery Setup & Preparation',
    description: 'Professional nursery setup and preparation service ensuring your baby\'s room is perfectly organized and equipped for their arrival.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.NURSERY_SETUP,
    duration: 240,
    price: {
      amount: 200,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'newborn'],
    tags: ['nursery-preparation', 'room-setup', 'baby-equipment', 'pre-arrival']
  },
  {
    id: 'infant-flight-assistance',
    name: 'Infant Flight Assistance',
    description: 'Professional assistance for flying with infants and children, both domestic and international. Includes support with settling, feeding, and managing jet lag.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.TRAVEL_ASSISTANCE,
    duration: 480, // Variable based on flight
    price: {
      amount: 150,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant', 'toddler', 'child'],
    tags: ['travel-support', 'flight-assistance', 'jet-lag-support', 'domestic-international']
  },
  {
    id: 'postpartum-support',
    name: 'Postpartum Support & Recovery',
    description: 'Comprehensive postpartum support including emotional guidance, practical assistance, and recovery support for new mothers and families.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.MATERNITY_CARE,
    duration: 180,
    price: {
      amount: 250,
      currency: 'AUD'
    },
    ageGroups: ['newborn'],
    tags: ['postpartum-care', 'recovery-support', 'emotional-guidance', 'new-mother-support']
  },
  {
    id: 'multiples-specialist-care',
    name: 'Multiples Specialist Care',
    description: 'Specialized care and support for families with twins, triplets, or higher-order multiples. Includes feeding coordination, sleep management, and logistics support.',
    category: MUMMYS_WHISPERS_SERVICE_CATEGORIES.MATERNITY_CARE,
    duration: 240,
    price: {
      amount: 350,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['twins', 'triplets', 'multiples', 'specialized-care', 'logistics-support']
  }
];

// Caroline - Lead Maternity Consultant
export const CAROLINE_MATERNITY_CONSULTANT: ServiceProvider = {
  id: 'caroline-maternity-consultant',
  firstName: 'Caroline',
  lastName: 'Johnson',
  title: 'Lead Maternity Consultant & Sleep Specialist',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  bio: 'Caroline is the founder and lead consultant at Mummy\'s Whispers, bringing over 16 years of experience in maternity care and infant sleep consulting. She specializes in supporting families through the transition to parenthood with gentle, evidence-based approaches tailored to each family\'s unique needs.',
  personalStory: 'As a mother herself and having worked with hundreds of families worldwide, Caroline understands the challenges of new parenthood. Her approach combines professional expertise with compassionate support, helping families feel confident and prepared for their journey with their new baby.',
  credentials: [
    {
      title: 'Certified Sleep Consultant',
      abbreviation: 'CSC',
      issuingBody: 'International Association of Professional Sleep Consultants',
      verified: true
    },
    {
      title: 'Maternity Care Specialist',
      abbreviation: 'MCS',
      issuingBody: 'Australian Nanny Association',
      verified: true
    },
    {
      title: 'Newborn Care Specialist',
      abbreviation: 'NCS',
      issuingBody: 'International Newborn Care Association',
      verified: true
    },
    {
      title: 'First Aid & CPR Certified',
      abbreviation: 'First Aid',
      issuingBody: 'Australian Red Cross',
      verified: true
    }
  ],
  services: MUMMYS_WHISPERS_SERVICES,
  specializations: [
    'Sleep Consulting',
    'Newborn Care',
    'Postpartum Support',
    'Multiples Care',
    'Travel Assistance',
    'Family Transition Support',
    'Gentle Sleep Methods',
    'LGBTQ+ Family Support',
    'Surrogacy Support',
    'International Services'
  ],
  languages: ['English'],
  yearsExperience: 16,
  approach: 'I believe in providing bespoke, family-centered care that respects each family\'s unique circumstances and goals. My approach is gentle, evidence-based, and always focused on supporting the natural bond between parents and their babies. Whether you\'re first-time parents or expanding your family, I\'m here to provide the knowledge, support, and confidence you need.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: true,
    emergency: true
  },
  pricing: {
    consultationFee: 325,
    followUpFee: 200,
    currency: 'AUD'
  }
};

// Mummy's Whispers Service Center
export const MUMMYS_WHISPERS_CENTER: ServiceCenter = {
  id: 'mummys-whispers',
  name: 'Mummy\'s Whispers',
  description: 'Premium maternity care for babies offering comprehensive pre and post natal services, sleep consulting, and specialized support for all family types including multiples, surrogacy, and same-sex couples.',
  overview: 'Mummy\'s Whispers provides an array of pre and post natal maternity services to completely support families for their new baby\'s arrival and ongoing development. From nursery setup to full 24-hour care, we provide confidential and premium care tailored bespoke to your family\'s requirements.',
  mission: 'To provide premium, personalized maternity care that supports families through every stage of their journey with confidence, knowledge, and compassionate care. We believe every family deserves expert support tailored to their unique needs.',
  location: {
    address: '14 Ocean Avenue',
    suburb: 'Double Bay',
    state: 'NSW',
    postcode: '2028',
    country: 'Australia',
    coordinates: {
      lat: -33.8770,
      lng: 151.2417
    }
  },
  contact: {
    phone: '+61 (0) 410 909 237',
    email: 'hello@mummyswhispers.com',
    website: 'https://mummyswhispers.com',
    bookingUrl: 'https://mummyswhispers.com/collections/maternity-care-programs',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/mummys_whispers/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/mummyswhispers/'
      }
    ]
  },
  providers: [CAROLINE_MATERNITY_CONSULTANT],
  services: MUMMYS_WHISPERS_SERVICES,
  operatingHours: {
    monday: { open: '08:00', close: '20:00' },
    tuesday: { open: '08:00', close: '20:00' },
    wednesday: { open: '08:00', close: '20:00' },
    thursday: { open: '08:00', close: '20:00' },
    friday: { open: '08:00', close: '20:00' },
    saturday: { open: '09:00', close: '18:00' },
    sunday: { open: '10:00', close: '16:00' }
  },
  features: [
    'Premium personalized maternity care',
    '24-hour newborn care services available',
    'Gentle sleep consulting methods',
    'Specialist support for multiples (twins, triplets)',
    'LGBTQ+ and surrogacy-friendly services',
    'International travel assistance',
    'Bespoke family-centered approach',
    'Home visit and online consultation options',
    '16+ years of professional experience',
    'Nursery setup and preparation services',
    'Postpartum recovery support',
    'Evidence-based gentle methods',
    'Confidential and discrete services',
    'Emergency support available',
    'Multi-language support available',
    'Partnership with international organizations'
  ],
  certifications: [
    'International Association of Professional Sleep Consultants Member',
    'Australian Nanny Association Certified',
    'International Newborn Care Association Accredited',
    'First Aid & CPR Certified',
    'Fully Insured Services'
  ],
  insurance: [
    'Professional Indemnity Insurance',
    'Public Liability Insurance'
  ],
  accessibility: [
    'Home visit services available',
    'Online consultation options',
    'Flexible scheduling including evenings and weekends',
    'Emergency support available',
    'Multi-location service coverage',
    'International service availability'
  ],
  images: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2008,
  culturalConsiderations: 'Mummy\'s Whispers welcomes and supports families of all backgrounds, including LGBTQ+ families, surrogacy arrangements, single parents, and multicultural families. We provide culturally sensitive care and respect diverse family structures and parenting approaches. Our services are inclusive and tailored to honor each family\'s unique journey and values.'
};
