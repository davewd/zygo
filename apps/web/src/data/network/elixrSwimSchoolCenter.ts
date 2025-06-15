import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const ELIXR_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  BABY_SWIMMING: {
    id: 'baby-swimming',
    name: 'Baby Swimming',
    description: 'Swimming programs for babies and toddlers with parent participation',
    taxonomy: 'activities'
  },
  LEARN_TO_SWIM: {
    id: 'learn-to-swim',
    name: 'Learn to Swim',
    description: 'Progressive swimming lessons for children and beginners',
    taxonomy: 'activities'
  },
  SQUAD_TRAINING: {
    id: 'squad-training',
    name: 'Squad Training',
    description: 'Advanced swimming training and stroke development',
    taxonomy: 'activities'
  },
  ADULT_LESSONS: {
    id: 'adult-lessons',
    name: 'Adult Lessons',
    description: 'Swimming lessons and fitness programs for adults',
    taxonomy: 'activities'
  },
  PRIVATE_COACHING: {
    id: 'private-coaching',
    name: 'Private Coaching',
    description: 'One-on-one swimming instruction and coaching',
    taxonomy: 'activities'
  },
  WATER_SAFETY: {
    id: 'water-safety',
    name: 'Water Safety',
    description: 'Water safety education and survival skills',
    taxonomy: 'activities'
  }
};

// Services offered
export const ELIXR_SERVICES: Service[] = [
  {
    id: 'splash-tribe-program',
    name: 'Splash Tribe (8-36 months)',
    description: 'Parent and baby swimming programs designed to introduce infants and toddlers to water in a safe, nurturing environment. Programs progress from 8 months through to 36 months with age-appropriate activities.',
    category: ELIXR_SERVICE_CATEGORIES.BABY_SWIMMING,
    duration: 30,
    price: {
      amount: 33,
      currency: 'AUD'
    },
    ageGroups: ['infant', 'toddler'],
    tags: ['parent-baby', 'water-introduction', 'development', 'safety', 'bonding']
  },
  {
    id: 'little-rockets-program',
    name: 'Little Rockets (3-5 years)',
    description: 'Independent swimming lessons for preschoolers. Children learn fundamental water skills, basic strokes, and water safety in small group settings with qualified instructors.',
    category: ELIXR_SERVICE_CATEGORIES.LEARN_TO_SWIM,
    duration: 30,
    price: {
      amount: 33,
      currency: 'AUD'
    },
    ageGroups: ['preschool'],
    tags: ['independent-swimming', 'fundamentals', 'water-skills', 'small-groups']
  },
  {
    id: 'swim-stars-program',
    name: 'Swim Stars (School Age)',
    description: 'Progressive swimming lessons for school-age children. Structured program focusing on stroke development, technique refinement, and distance building from 0 to 75+ metres.',
    category: ELIXR_SERVICE_CATEGORIES.LEARN_TO_SWIM,
    duration: 30,
    price: {
      amount: 33,
      currency: 'AUD'
    },
    ageGroups: ['child'],
    tags: ['stroke-development', 'technique', 'progressive', 'school-age', 'distance-building']
  },
  {
    id: 'elixr-squad',
    name: 'Elixr Squad Training',
    description: 'Advanced swimming training for competent swimmers. Available in 30, 45, and 60-minute sessions for primary and high school students focusing on stroke refinement and fitness.',
    category: ELIXR_SERVICE_CATEGORIES.SQUAD_TRAINING,
    duration: 45,
    price: {
      amount: 45,
      currency: 'AUD'
    },
    ageGroups: ['child', 'adolescent'],
    tags: ['advanced-training', 'stroke-refinement', 'fitness', 'competitive-prep']
  },
  {
    id: 'adult-private-lessons',
    name: 'Adult Private Swimming Lessons',
    description: 'One-on-one or one-on-two private swimming lessons for adults. Tailored to individual needs whether learning to swim, improving technique, or building fitness.',
    category: ELIXR_SERVICE_CATEGORIES.ADULT_LESSONS,
    duration: 30,
    price: {
      amount: 80,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['private-coaching', 'adult-learning', 'technique-improvement', 'fitness']
  },
  {
    id: 'water-safety-program',
    name: 'Water Safety & Survival Skills',
    description: 'Specialized programs teaching essential water safety skills including floating, treading water, and emergency response techniques for all age groups.',
    category: ELIXR_SERVICE_CATEGORIES.WATER_SAFETY,
    duration: 30,
    price: {
      amount: 35,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child', 'adolescent'],
    tags: ['water-safety', 'survival-skills', 'emergency-response', 'floating', 'treading-water']
  },
  {
    id: 'intensive-lessons',
    name: 'Intensive Swimming Lessons',
    description: 'Concentrated swimming programs for rapid skill development. Ideal for children who need to catch up quickly or adults wanting accelerated learning.',
    category: ELIXR_SERVICE_CATEGORIES.PRIVATE_COACHING,
    duration: 45,
    price: {
      amount: 95,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child', 'adolescent', 'adult'],
    tags: ['intensive', 'rapid-development', 'accelerated-learning', 'catch-up']
  },
  {
    id: 'stroke-correction',
    name: 'Stroke Correction & Technique',
    description: 'Specialized coaching focused on correcting swimming technique and improving stroke efficiency. Perfect for swimmers who want to refine their skills.',
    category: ELIXR_SERVICE_CATEGORIES.PRIVATE_COACHING,
    duration: 30,
    price: {
      amount: 85,
      currency: 'AUD'
    },
    ageGroups: ['child', 'adolescent', 'adult'],
    tags: ['stroke-correction', 'technique-improvement', 'efficiency', 'specialized-coaching']
  }
];

// Sarah Mitchell - Head Swim Instructor
export const SARAH_MITCHELL: ServiceProvider = {
  id: 'sarah-mitchell',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  title: 'Head Swim Instructor & Program Director',
  profileImage: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Sarah has been leading aquatic programs at Elixr for over 8 years and brings extensive experience in swimming instruction and water safety. She specializes in developing progressive curricula that make learning to swim enjoyable and effective.',
  credentials: [
    {
      title: 'Swimming and Water Safety Instructor',
      abbreviation: 'SWSI',
      issuingBody: 'Swimming Australia',
      verified: true
    },
    {
      title: 'Pool Lifeguard Certification',
      abbreviation: 'Lifeguard',
      issuingBody: 'Royal Life Saving Society Australia',
      verified: true
    },
    {
      title: 'First Aid & CPR Certification',
      abbreviation: 'First Aid',
      issuingBody: 'Australian Red Cross',
      verified: true
    }
  ],
  services: ELIXR_SERVICES.filter(service => 
    ['adult-private-lessons', 'stroke-correction', 'intensive-lessons', 'elixr-squad'].includes(service.id)
  ),
  specializations: [
    'Adult Swimming Instruction',
    'Stroke Technique Analysis',
    'Water Safety Training',
    'Program Development',
    'Instructor Training',
    'Aquatic Fitness'
  ],
  languages: ['English'],
  yearsExperience: 8,
  approach: 'I believe in creating a supportive and encouraging environment where students feel safe to learn and challenge themselves. My teaching focuses on building confidence in the water while developing proper technique from the beginning.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 85,
    followUpFee: 85,
    currency: 'AUD'
  }
};

// Marcus Chen - Senior Swim Coach
export const MARCUS_CHEN: ServiceProvider = {
  id: 'marcus-chen',
  firstName: 'Marcus',
  lastName: 'Chen',
  title: 'Senior Swim Coach',
  profileImage: 'https://images.unsplash.com/photo-1566771297-36ff5e3a8b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Marcus is a former competitive swimmer who competed at state level and now brings his passion for swimming to teaching. He specializes in squad training and competitive stroke development.',
  credentials: [
    {
      title: 'Level 2 Swimming Coach',
      abbreviation: 'Level 2',
      issuingBody: 'Swimming Australia',
      verified: true
    },
    {
      title: 'Bronze Medallion',
      abbreviation: 'Bronze',
      issuingBody: 'Surf Life Saving Australia',
      verified: true
    },
    {
      title: 'Sports Coaching Certification',
      abbreviation: 'Sports Coach',
      issuingBody: 'Australian Sports Commission',
      verified: true
    }
  ],
  services: ELIXR_SERVICES.filter(service => 
    ['elixr-squad', 'swim-stars-program', 'stroke-correction', 'intensive-lessons'].includes(service.id)
  ),
  specializations: [
    'Competitive Swimming',
    'Squad Training',
    'Stroke Development',
    'Race Preparation',
    'Youth Coaching',
    'Performance Analysis'
  ],
  languages: ['English', 'Mandarin'],
  yearsExperience: 6,
  approach: 'Having been a competitive swimmer myself, I understand the dedication required to excel in swimming. I focus on building both technical skills and mental resilience while keeping training enjoyable and motivating.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 75,
    followUpFee: 75,
    currency: 'AUD'
  }
};

// Emma Rodriguez - Children's Specialist
export const EMMA_RODRIGUEZ: ServiceProvider = {
  id: 'emma-rodriguez',
  firstName: 'Emma',
  lastName: 'Rodriguez',
  title: 'Children\'s Swimming Specialist',
  profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Emma specializes in working with young children and has a gift for making swimming lessons fun and engaging. She has particular expertise in parent-baby programs and helping nervous children build confidence in the water.',
  credentials: [
    {
      title: 'Kids Aquatic Instructor',
      abbreviation: 'Kids Aquatic',
      issuingBody: 'Swimming Australia',
      verified: true
    },
    {
      title: 'Early Childhood Development Certificate',
      abbreviation: 'ECD',
      issuingBody: 'TAFE NSW',
      verified: true
    },
    {
      title: 'Water Safety Instructor',
      abbreviation: 'WSI',
      issuingBody: 'Royal Life Saving Society',
      verified: true
    }
  ],
  services: ELIXR_SERVICES.filter(service => 
    ['splash-tribe-program', 'little-rockets-program', 'water-safety-program', 'swim-stars-program'].includes(service.id)
  ),
  specializations: [
    'Early Childhood Swimming',
    'Parent-Baby Programs',
    'Nervous Swimmer Support',
    'Water Familiarization',
    'Developmental Swimming',
    'Child Psychology in Water'
  ],
  languages: ['English', 'Spanish'],
  yearsExperience: 5,
  approach: 'I believe every child can learn to love the water when they feel safe and supported. My approach uses play-based learning and positive reinforcement to build confidence and swimming skills naturally.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 70,
    followUpFee: 70,
    currency: 'AUD'
  }
};

// Elixr Swim School
export const ELIXR_SWIM_SCHOOL_CENTER: ServiceCenter = {
  id: 'elixr-swim-school',
  name: 'Elixr Swim School',
  description: 'A premier swim school operating for over 15 years in the heart of the Eastern Suburbs. Offering effective learn-to-swim programs and engaging classes in a safe, nurturing environment.',
  overview: 'Elixr Swim School has been a trusted name in swimming education for over 15 years, providing comprehensive aquatic programs from babies to adults. Located within the tranquil Elixr Health Club in Bondi Junction, our swim school offers a unique learning environment with qualified instructors, small class sizes, and proven teaching methods.',
  mission: 'To provide a safe haven for all our students to enjoy carefully designed swimming lessons that focus on nurture, enjoyment, and our unique teaching techniques. We are committed to building water confidence, ensuring safety, and fostering individual growth in every swimmer.',
  location: {
    address: 'C2/9 Bronte Road',
    suburb: 'Bondi Junction',
    state: 'NSW',
    postcode: '2022',
    country: 'Australia',
    coordinates: {
      lat: -33.8930,
      lng: 151.2493
    }
  },
  contact: {
    phone: '(02) 8113 1109',
    email: 'swimschool@elixr.com.au',
    website: 'https://elixr.com.au/swim-school/',
    bookingUrl: 'https://elixr.com.au/swim-school/',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/elixrhealthclubs'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/elixrhealthclubs'
      }
    ]
  },
  providers: [SARAH_MITCHELL, MARCUS_CHEN, EMMA_RODRIGUEZ],
  services: ELIXR_SERVICES,
  operatingHours: {
    monday: { open: '06:00', close: '19:00' },
    tuesday: { open: '06:00', close: '19:00' },
    wednesday: { open: '06:00', close: '19:00' },
    thursday: { open: '06:00', close: '19:00' },
    friday: { open: '06:00', close: '19:00' },
    saturday: { open: '07:00', close: '17:00' },
    sunday: { open: '07:00', close: '17:00' }
  },
  features: [
    'Operating for over 15 years with proven track record',
    'Tranquil health club environment ideal for learning',
    'Nationally qualified swim school instructors',
    'Small class sizes below recommended participant numbers',
    'Technique-focused approach before distance progression',
    'Programs from 8 months to adults',
    'Active Kids and First Lap Swim Vouchers accepted',
    '10-week term structure with automatic re-enrollment',
    'Flexible weekday and weekend scheduling',
    'Parent-baby programs for early water introduction',
    'Progressive learning pathway through all skill levels',
    'Private and semi-private lesson options',
    'Water safety and survival skills emphasis',
    'Stroke correction and technique refinement',
    'Competitive squad training available',
    'Adult learn-to-swim and fitness programs',
    'Modern indoor heated pool facilities',
    'Comprehensive child protection policies'
  ],
  certifications: [
    'Swimming Australia Approved Programs',
    'Royal Life Saving Society Accredited',
    'Australian Sports Commission Recognized',
    'Child Safe Organization Certified'
  ],
  accessibility: [
    'Indoor heated pool facilities',
    'Wheelchair accessible entry and facilities',
    'Public transport accessible location',
    'On-site parking available',
    'Family change rooms and amenities',
    'Modern safety equipment and protocols'
  ],
  images: [
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
    'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80'
  ],
  establishedYear: 2009,
  culturalConsiderations: 'Elixr Swim School welcomes families from all cultural backgrounds and provides inclusive aquatic education. We acknowledge the traditional custodians of the land and are committed to creating a respectful and welcoming environment for all community members.'
};
