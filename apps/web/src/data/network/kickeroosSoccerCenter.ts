import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const KICKEROOS_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  KIDS_SOCCER: {
    id: 'kids-soccer',
    name: 'Kids Soccer Programs',
    description: 'Age-appropriate soccer programs for children',
    taxonomy: 'activities'
  },
  DEVELOPMENT_SQUADS: {
    id: 'development-squads',
    name: 'Development Squads',
    description: 'Advanced soccer training and skill development programs',
    taxonomy: 'activities'
  },
  GIRLS_PROGRAMS: {
    id: 'girls-programs',
    name: 'Girls Soccer Programs',
    description: 'Specialized soccer programs designed for girls',
    taxonomy: 'activities'
  },
  HOLIDAY_PROGRAMS: {
    id: 'holiday-programs',
    name: 'Holiday Programs',
    description: 'School holiday soccer camps and activities',
    taxonomy: 'activities'
  },
  BIRTHDAY_PARTIES: {
    id: 'birthday-parties',
    name: 'Birthday Parties',
    description: 'Soccer-themed birthday party programs',
    taxonomy: 'recreation'
  },
  PRIVATE_COACHING: {
    id: 'private-coaching',
    name: 'Private Coaching',
    description: 'One-on-one soccer coaching and skill development',
    taxonomy: 'activities'
  }
};

// Services offered
export const KICKEROOS_SERVICES: Service[] = [
  {
    id: 'weekly-classes',
    name: 'Weekly Soccer Classes (18M - 8 Years)',
    description: 'Age-appropriate weekly soccer classes designed to develop fundamental movement skills, ball skills, and social interaction. Classes progress from toddler introduction to advanced skill development.',
    category: KICKEROOS_SERVICE_CATEGORIES.KIDS_SOCCER,
    duration: 45,
    price: {
      amount: 30,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child'],
    tags: ['weekly-classes', 'fundamental-skills', 'age-appropriate', 'social-development']
  },
  {
    id: 'development-squads',
    name: 'Development Squads (U6-U12)',
    description: 'Advanced training programs for children showing soccer potential. Focus on technical skills, tactical awareness, and competitive preparation in a structured environment.',
    category: KICKEROOS_SERVICE_CATEGORIES.DEVELOPMENT_SQUADS,
    duration: 60,
    price: {
      amount: 45,
      currency: 'AUD'
    },
    ageGroups: ['child'],
    tags: ['advanced-training', 'technical-skills', 'tactical-awareness', 'competitive-prep']
  },
  {
    id: 'premier-squads',
    name: 'Premier Squads (U8-U12)',
    description: 'Elite level training for highly skilled young players. Focuses on advanced techniques, game intelligence, and preparation for representative soccer.',
    category: KICKEROOS_SERVICE_CATEGORIES.DEVELOPMENT_SQUADS,
    duration: 75,
    price: {
      amount: 55,
      currency: 'AUD'
    },
    ageGroups: ['child'],
    tags: ['elite-training', 'advanced-techniques', 'game-intelligence', 'representative-prep']
  },
  {
    id: 'shekicks-program',
    name: 'SheKicks All Girls Academy',
    description: 'Specialized soccer program designed exclusively for girls. Creates a supportive environment for girls to develop soccer skills, confidence, and leadership abilities.',
    category: KICKEROOS_SERVICE_CATEGORIES.GIRLS_PROGRAMS,
    duration: 60,
    price: {
      amount: 35,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child', 'adolescent'],
    tags: ['girls-only', 'confidence-building', 'leadership', 'supportive-environment']
  },
  {
    id: 'holiday-camps',
    name: 'Holiday Soccer Camps',
    description: 'Multi-day soccer camps during school holidays combining skill development, games, and fun activities. Available for various age groups and skill levels.',
    category: KICKEROOS_SERVICE_CATEGORIES.HOLIDAY_PROGRAMS,
    duration: 240,
    price: {
      amount: 65,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child'],
    tags: ['holiday-camp', 'multi-day', 'skill-development', 'games', 'fun-activities']
  },
  {
    id: 'birthday-parties',
    name: 'Soccer Birthday Parties',
    description: 'Exciting soccer-themed birthday parties with professional coaches leading age-appropriate games, skills activities, and fun competitions for the birthday child and guests.',
    category: KICKEROOS_SERVICE_CATEGORIES.BIRTHDAY_PARTIES,
    duration: 90,
    price: {
      amount: 350,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child'],
    tags: ['birthday-party', 'celebrations', 'games', 'group-activities', 'professional-coaches']
  },
  {
    id: 'private-coaching',
    name: '1-on-1 Private Coaching',
    description: 'Personalized soccer coaching sessions focusing on individual skill development, technique improvement, and specific areas of need identified by qualified coaches.',
    category: KICKEROOS_SERVICE_CATEGORIES.PRIVATE_COACHING,
    duration: 60,
    price: {
      amount: 90,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child', 'adolescent'],
    tags: ['private-coaching', 'personalized', 'skill-development', 'technique-improvement']
  },
  {
    id: 'trial-class',
    name: 'Trial Soccer Class',
    description: 'Complimentary trial class allowing children to experience our coaching methods and programs before enrolling. Perfect introduction to Kickeroos soccer.',
    category: KICKEROOS_SERVICE_CATEGORIES.KIDS_SOCCER,
    duration: 45,
    price: {
      amount: 0,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child'],
    tags: ['trial-class', 'complimentary', 'introduction', 'experience']
  },
  {
    id: 'academy-league',
    name: 'Academy League Competition',
    description: 'Competitive soccer league for development squad players. Provides match experience, team play opportunities, and pathway to representative soccer.',
    category: KICKEROOS_SERVICE_CATEGORIES.DEVELOPMENT_SQUADS,
    duration: 90,
    price: {
      amount: 40,
      currency: 'AUD'
    },
    ageGroups: ['child'],
    tags: ['competition', 'match-experience', 'team-play', 'representative-pathway']
  }
];

// James Thompson - Head Coach
export const JAMES_THOMPSON: ServiceProvider = {
  id: 'james-thompson-kickeroos',
  firstName: 'James',
  lastName: 'Thompson',
  title: 'Head Coach & Academy Director',
  profileImage: 'https://images.unsplash.com/photo-1566771297-36ff5e3a8b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'James is the founder and head coach of Kickeroos Soccer Academy with over 12 years of experience in youth soccer development. He holds advanced coaching qualifications and has a passion for developing young players\' technical skills and love for the game.',
  credentials: [
    {
      title: 'AFC C Licence',
      abbreviation: 'AFC C',
      issuingBody: 'Asian Football Confederation',
      verified: true
    },
    {
      title: 'FFA/FA Level 2 Coaching Certificate',
      abbreviation: 'FA Level 2',
      issuingBody: 'Football Australia',
      verified: true
    },
    {
      title: 'Youth Development Specialization',
      abbreviation: 'Youth Dev',
      issuingBody: 'Football Australia',
      verified: true
    }
  ],
  services: KICKEROOS_SERVICES.filter(service => 
    ['development-squads', 'premier-squads', 'private-coaching', 'academy-league'].includes(service.id)
  ),
  specializations: [
    'Youth Soccer Development',
    'Technical Skills Training',
    'Academy Program Development',
    'Competitive Preparation',
    'Coaching Education',
    'Player Pathway Development'
  ],
  languages: ['English'],
  yearsExperience: 12,
  approach: 'I believe in developing the whole player - technically, tactically, physically, and mentally. My coaching philosophy emphasizes fun while building strong fundamental skills that will serve players throughout their soccer journey.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 90,
    followUpFee: 90,
    currency: 'AUD'
  }
};

// Sofia Martinez - Girls Program Specialist
export const SOFIA_MARTINEZ: ServiceProvider = {
  id: 'sofia-martinez',
  firstName: 'Sofia',
  lastName: 'Martinez',
  title: 'SheKicks Program Director',
  profileImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Sofia is a former semi-professional player who specializes in girls\' soccer development. She is passionate about creating inclusive environments where girls can develop confidence, leadership skills, and a lifelong love of soccer.',
  credentials: [
    {
      title: 'FFA/FA Level 1 Coaching Certificate',
      abbreviation: 'FA Level 1',
      issuingBody: 'Football Australia',
      verified: true
    },
    {
      title: 'Women\'s Football Development Certificate',
      abbreviation: 'Women\'s Dev',
      issuingBody: 'Football Australia',
      verified: true
    },
    {
      title: 'Child Development in Sport',
      abbreviation: 'Child Dev',
      issuingBody: 'Australian Sports Commission',
      verified: true
    }
  ],
  services: KICKEROOS_SERVICES.filter(service => 
    ['shekicks-program', 'weekly-classes', 'holiday-camps', 'private-coaching'].includes(service.id)
  ),
  specializations: [
    'Girls Soccer Development',
    'Confidence Building',
    'Leadership Development',
    'Inclusive Coaching',
    'Youth Mentoring',
    'Female Athlete Development'
  ],
  languages: ['English', 'Spanish'],
  yearsExperience: 7,
  approach: 'I focus on creating a supportive and empowering environment where girls feel confident to express themselves through soccer. My coaching emphasizes teamwork, leadership, and personal growth alongside technical development.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 80,
    followUpFee: 80,
    currency: 'AUD'
  }
};

// Michael O'Connor - Early Years Specialist
export const MICHAEL_OCONNOR: ServiceProvider = {
  id: 'michael-oconnor',
  firstName: 'Michael',
  lastName: 'O\'Connor',
  title: 'Early Years Soccer Specialist',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Michael specializes in working with toddlers and young children, making soccer fun and accessible through play-based learning. He has a natural ability to engage young minds and develop their fundamental movement skills.',
  credentials: [
    {
      title: 'Football Australia Grassroots Certificate',
      abbreviation: 'FA Grassroots',
      issuingBody: 'Football Australia',
      verified: true
    },
    {
      title: 'Early Childhood Sports Development',
      abbreviation: 'EC Sports',
      issuingBody: 'Play Soccer Australia',
      verified: true
    },
    {
      title: 'First Aid & Child Protection',
      abbreviation: 'First Aid',
      issuingBody: 'Australian Red Cross',
      verified: true
    }
  ],
  services: KICKEROOS_SERVICES.filter(service => 
    ['weekly-classes', 'birthday-parties', 'trial-class', 'holiday-camps'].includes(service.id)
  ),
  specializations: [
    'Early Childhood Development',
    'Fundamental Movement Skills',
    'Play-Based Learning',
    'Toddler Soccer Programs',
    'Parent Engagement',
    'Motor Skills Development'
  ],
  languages: ['English'],
  yearsExperience: 5,
  approach: 'I believe that soccer should be fun first and foremost for young children. My sessions focus on developing fundamental movement skills through play, games, and positive encouragement that builds confidence and enjoyment.',
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

// Kickeroos Soccer Academy
export const KICKEROOS_SOCCER_CENTER: ServiceCenter = {
  id: 'kickeroos-soccer-academy',
  name: 'Kickeroos Soccer Academy',
  description: 'Sydney\'s premier kids soccer coaching academy offering professional programs for children aged 18 months to 12 years. Specializing in skill development, confidence building, and creating a lifelong love of soccer.',
  overview: 'Kickeroos Soccer Academy has been developing young soccer players across Sydney\'s eastern suburbs with age-appropriate programs that focus on fun, skill development, and building confidence. Our qualified coaches create inclusive environments where every child can thrive, from first-time players to those with representative aspirations.',
  mission: 'To provide the best kids soccer coaching in Sydney through professional, fun, and engaging programs that develop technical skills, build confidence, and foster a lifelong love of the beautiful game. We are committed to creating inclusive environments where every child can succeed.',
  location: {
    address: 'Multiple Locations',
    suburb: 'Eastern Suburbs',
    state: 'NSW',
    postcode: '2021',
    country: 'Australia',
    coordinates: {
      lat: -33.8839,
      lng: 151.2421
    }
  },
  contact: {
    phone: '0416 628 531',
    email: 'info@kickeroos.com.au',
    website: 'https://www.kickeroos.com.au',
    bookingUrl: 'https://www.kickeroos.com.au/trial-class',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/kickeroos_soccer_academy/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/kickeroos/'
      }
    ]
  },
  providers: [JAMES_THOMPSON, SOFIA_MARTINEZ, MICHAEL_OCONNOR],
  services: KICKEROOS_SERVICES,
  operatingHours: {
    monday: { open: '16:00', close: '18:00' },
    tuesday: { open: '16:00', close: '18:00' },
    wednesday: { open: '16:00', close: '18:00' },
    thursday: { open: '16:00', close: '18:00' },
    friday: { open: '16:00', close: '18:00' },
    saturday: { open: '08:00', close: '16:00' },
    sunday: { open: '08:00', close: '16:00' }
  },
  features: [
    'Professional soccer coaching for ages 18 months to 12 years',
    'Multiple convenient locations across Eastern Suburbs',
    'Qualified coaches with Football Australia certifications',
    'Age-appropriate programs using modified equipment',
    'SheKicks all-girls academy promoting female participation',
    'Development and Premier squad pathways',
    'Academy League competitive opportunities',
    'Holiday camps and school vacation programs',
    'Soccer-themed birthday party packages',
    'Free trial classes for new participants',
    'Active Kids and Creative Kids voucher acceptance',
    'Small group sizes ensuring individual attention',
    'Focus on fundamental movement skills development',
    'Positive coaching philosophy emphasizing fun',
    'Progressive skill development pathways',
    'Parent communication and involvement encouraged',
    'Wet weather alternative venue arrangements',
    'Professional equipment and training aids',
    'Regular coach training and development programs'
  ],
  certifications: [
    'Football Australia Approved Programs',
    'AFC Coaching Accreditation',
    'Australian Sports Commission Recognition',
    'Child Safe Organization Certification',
    'Active Kids Provider Status'
  ],
  accessibility: [
    'Multiple accessible venue locations',
    'Public transport accessible sites',
    'Parking available at all venues',
    'Modified programs for different abilities',
    'Inclusive coaching approaches',
    'Equipment suitable for all skill levels'
  ],
  images: [
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1606936021121-d17faccb57b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2012,
  culturalConsiderations: 'Kickeroos Soccer Academy celebrates diversity and welcomes families from all cultural backgrounds. We acknowledge soccer as a universal language that brings communities together and are committed to creating an inclusive environment where every child feels valued and supported.'
};
