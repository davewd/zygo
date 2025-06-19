import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories for Start Training & Sports Nutrition
export const START_TRAINING_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  SPORTS_NUTRITION: {
    id: 'sports-nutrition',
    name: 'Sports Nutrition',
    description: 'Performance nutrition for athletes and active individuals',
    taxonomy: 'healthcare'
  },
  PERFORMANCE_NUTRITION: {
    id: 'performance-nutrition',
    name: 'Performance Nutrition',
    description: 'Nutritional strategies to maximize athletic performance',
    taxonomy: 'healthcare'
  },
  MEAL_PLANNING: {
    id: 'meal-planning',
    name: 'Meal Planning',
    description: 'Customized meal plans for training and recovery',
    taxonomy: 'healthcare'
  },
  CORPORATE_NUTRITION: {
    id: 'corporate-nutrition',
    name: 'Corporate Nutrition',
    description: 'Workplace nutrition education and presentations',
    taxonomy: 'education'
  },
  GENERAL_NUTRITION: {
    id: 'general-nutrition',
    name: 'General Nutrition',
    description: 'Comprehensive nutrition and dietetic services',
    taxonomy: 'healthcare'
  }
};

// Services offered by Peta Carige at Start Training
export const START_TRAINING_SERVICES: Service[] = [
  {
    id: 'performance-nutrition-consultation',
    name: 'Performance Nutrition Consultation',
    description: 'Comprehensive nutrition assessment for athletes and active individuals. Focus on optimizing training adaptations, recovery, and competition performance through evidence-based nutrition strategies.',
    category: START_TRAINING_SERVICE_CATEGORIES.PERFORMANCE_NUTRITION,
    duration: 60,
    price: {
      amount: 180,
      currency: 'AUD',
      rebate: {
        provider: 'Private Health',
        amount: 50
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['sports-nutrition', 'performance', 'training', 'recovery', 'elite-athletes', 'competition-prep']
  },
  {
    id: 'general-nutrition-consultation',
    name: 'General Nutrition & Lifestyle Consultation',
    description: 'Personalized nutrition advice for everyday Australians looking to build healthier lifestyles. Simple, practical nutrition solutions tailored to individual needs and goals.',
    category: START_TRAINING_SERVICE_CATEGORIES.GENERAL_NUTRITION,
    duration: 60,
    price: {
      amount: 150,
      currency: 'AUD',
      rebate: {
        provider: 'Private Health',
        amount: 45
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['lifestyle', 'healthy-eating', 'weight-management', 'practical-nutrition', 'family-nutrition']
  },
  {
    id: 'customized-meal-plans',
    name: 'Customized Meal Plans',
    description: 'Nutritious weekly meal plans that optimize training adaptations, support injury rehabilitation, or help achieve body composition goals. Practical and easy-to-follow meal solutions.',
    category: START_TRAINING_SERVICE_CATEGORIES.MEAL_PLANNING,
    duration: 45,
    price: {
      amount: 120,
      currency: 'AUD'
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['meal-plans', 'training-nutrition', 'body-composition', 'injury-recovery', 'practical-meals']
  },
  {
    id: 'team-sport-nutrition',
    name: 'Team Sport Nutrition Program',
    description: 'Specialized nutrition programs for team sports including rugby league, rugby sevens, and other team-based activities. Group and individual sessions available.',
    category: START_TRAINING_SERVICE_CATEGORIES.SPORTS_NUTRITION,
    duration: 90,
    price: {
      amount: 250,
      currency: 'AUD'
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['team-sports', 'rugby-league', 'rugby-sevens', 'group-nutrition', 'team-performance']
  },
  {
    id: 'corporate-nutrition-presentation',
    name: 'Corporate Nutrition Presentations',
    description: 'Expert commentary and presentations on nutrition, performance, sports nutrition, and nutrition for mental health. Brand partnerships and workplace wellness programs.',
    category: START_TRAINING_SERVICE_CATEGORIES.CORPORATE_NUTRITION,
    duration: 60,
    price: {
      amount: 300,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['corporate', 'presentations', 'workplace-wellness', 'mental-health', 'brand-partnerships']
  },
  {
    id: 'online-nutrition-consultation',
    name: 'Online Nutrition Consultation',
    description: 'Virtual nutrition consultations available for clients who prefer remote sessions or cannot attend in-person. Full assessment and personalized nutrition planning via video call.',
    category: START_TRAINING_SERVICE_CATEGORIES.GENERAL_NUTRITION,
    duration: 60,
    price: {
      amount: 160,
      currency: 'AUD',
      rebate: {
        provider: 'Private Health',
        amount: 45
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['telehealth', 'remote-consultation', 'online-nutrition', 'virtual-care', 'convenience']
  }
];

// Peta Carige - Advanced Sports Dietitian
export const PETA_CARIGE: ServiceProvider = {
  id: 'peta-carige',
  firstName: 'Peta',
  lastName: 'Carige',
  title: 'Advanced Sports Dietitian, APD',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
  bio: 'Peta is one of Australia\'s leading Sports Dietitians, specializing in maximizing performance through simple, practical, and individualized nutrition advice. With over 15 years of experience working with elite athletes, including Olympic Gold Medalists and Premiership winning players, Peta brings unparalleled expertise to both high-performance sport and everyday nutrition.',
  personalStory: 'As a mother to two young boys and someone with a personal background in team sport, Peta understands the importance of juggling work, training goals, family, and a love of good food. Her varied, yet heavily practical work experience enables her to give relevant, realistic, and practical nutrition messages to her patients. This real-world perspective is what makes her stand out among dietitians.',
  credentials: [
    {
      title: 'Bachelor of Science (Exercise Physiology)',
      abbreviation: 'BSc(ExPhys)',
      issuingBody: 'Australian University',
      year: 2006,
      verified: true
    },
    {
      title: 'Bachelor of Science (Nutrition and Dietetics)',
      abbreviation: 'BSc(NutDiet)',
      issuingBody: 'Australian University',
      year: 2006,
      verified: true
    },
    {
      title: 'Accredited Practicing Dietitian',
      abbreviation: 'APD',
      issuingBody: 'Dietitians Australia',
      verified: true
    },
    {
      title: 'Sports Dietitian Certification',
      abbreviation: 'Sports Dietitian',
      issuingBody: 'Sports Dietitians Australia',
      verified: true
    }
  ],
  services: START_TRAINING_SERVICES,
  specializations: [
    'Sports Nutrition',
    'Performance Nutrition',
    'Team Sport Nutrition',
    'Elite Athlete Support',
    'Rugby League Nutrition',
    'Rugby Sevens Nutrition',
    'Olympic Sport Nutrition',
    'Injury Recovery Nutrition',
    'Body Composition Management',
    'Practical Lifestyle Nutrition',
    'Corporate Wellness',
    'Mental Health Nutrition'
  ],
  languages: ['English'],
  yearsExperience: 18,
  approach: 'Nutrition has become complex, but my goal is to work towards a clearer vision together. I believe in providing simple, practical, and individualized nutrition advice that fits into real life. My approach combines evidence-based sports nutrition science with practical applications that athletes and everyday people can actually implement and maintain.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 180,
    followUpFee: 150,
    currency: 'AUD'
  }
};

// Start Training Stafford Service Center
export const START_TRAINING_CENTER: ServiceCenter = {
  id: 'start-training-stafford',
  name: 'Start Training Stafford',
  description: 'A premium allied health clinic offering high-quality sports nutrition, exercise physiology, physiotherapy, and sports therapy services. Home to advanced sports dietitian Peta Carige and a team of experienced practitioners.',
  overview: 'Start Training Stafford believes everyone should have access to the same high quality of allied health service delivery irrespective of level of competition or ability. Our approach is built upon the foundational values of going above and beyond, being passionate, supportive, and people-centric.',
  mission: 'To provide exceptional allied health services that support athletes and community members in achieving their health, performance, and lifestyle goals through evidence-based practice and personalized care.',
  location: {
    address: 'Hickey Park, 35 Babarra Street',
    suburb: 'Stafford',
    state: 'QLD',
    postcode: '4053',
    country: 'Australia',
    coordinates: {
      lat: -27.4038,
      lng: 153.0175
    }
  },
  contact: {
    phone: '0428 080 028',
    email: 'info@starttrainingstafford.com.au',
    website: 'https://starttrainingstafford.com.au',
    bookingUrl: 'https://starttrainingstafford.com.au/book-online-now',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/starttrainingstafford/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/starttrainingstafford/'
      },
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/petacarige_dietitian/'
      }
    ]
  },
  providers: [PETA_CARIGE],
  services: START_TRAINING_SERVICES,
  operatingHours: {
    monday: { open: '08:00', close: '18:00' },
    tuesday: { open: '08:00', close: '18:00' },
    wednesday: { open: '08:00', close: '18:00' },
    thursday: { open: '08:00', close: '18:00' },
    friday: { open: '08:00', close: '17:00' },
    saturday: { open: '08:00', close: '14:00' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Advanced Sports Nutrition with Elite Athlete Experience',
    'Olympic and Paralympic Sport Support',
    'Team Sport Nutrition Programs (Rugby League, Rugby Sevens)',
    'Individual Performance Nutrition Consultations',
    'Corporate Wellness and Nutrition Presentations',
    'Online and In-Person Consultations Available',
    'Practical, Evidence-Based Nutrition Advice',
    'Family-Friendly Lifestyle Nutrition Support',
    'Elite Athlete Track Record (Olympic Gold Medal Support)',
    'Professional Team Experience (NRL, Australian Rugby Teams)',
    'Injury Recovery Nutrition Support',
    'Body Composition and Weight Management',
    'Meal Planning and Practical Food Solutions',
    'Mental Health and Nutrition Integration',
    'Exercise Physiology Services',
    'Physiotherapy and Sports Therapy'
  ],
  certifications: [
    'Accredited Practicing Dietitian (APD) Certified',
    'Sports Dietitians Australia Member',
    'Dietitians Australia Registered',
    'Allied Health Professions Australia Member',
    'Australian Health Practitioner Regulation Agency Registered'
  ],
  insurance: [
    'Private Health Insurance (varies by provider)',
    'WorkCover Queensland',
    'DVA (Department of Veterans Affairs)',
    'Medicare (for eligible services)'
  ],
  accessibility: [
    'Ground floor clinic access',
    'Accessible parking available',
    'Wide entrance and doorways',
    'Accessible bathroom facilities',
    'Online consultations for remote access',
    'Flexible scheduling for various needs',
    'Family consultation rooms available',
    'Multiple consultation formats (in-person, online, phone)'
  ],
  images: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  ],
  establishedYear: 2018,
  culturalConsiderations: 'Start Training Stafford welcomes athletes and community members from all backgrounds. We understand the diverse nutritional needs across different cultures and sports, providing inclusive and culturally sensitive nutrition advice that respects individual preferences and requirements.'
};

// Export providers for easy import
export const START_TRAINING_PROVIDERS: ServiceProvider[] = [
  PETA_CARIGE
];
