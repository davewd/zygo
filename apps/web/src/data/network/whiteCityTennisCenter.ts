import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const WHITE_CITY_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  TENNIS_COACHING: {
    id: 'tennis-coaching',
    name: 'Tennis Coaching',
    description: 'Professional tennis instruction and coaching programs',
    taxonomy: 'activities'
  },
  JUNIOR_PROGRAMS: {
    id: 'junior-programs',
    name: 'Junior Programs',
    description: 'Age-appropriate tennis programs for children and teenagers',
    taxonomy: 'activities'
  },
  ADULT_PROGRAMS: {
    id: 'adult-programs',
    name: 'Adult Programs',
    description: 'Tennis programs designed for adult players',
    taxonomy: 'activities'
  },
  COMPETITIONS: {
    id: 'competitions',
    name: 'Competitions',
    description: 'Competitive tennis programs and tournaments',
    taxonomy: 'activities'
  },
  HOLIDAY_CAMPS: {
    id: 'holiday-camps',
    name: 'Holiday Camps',
    description: 'School holiday tennis camps and intensive programs',
    taxonomy: 'activities'
  },
  COURT_HIRE: {
    id: 'court-hire',
    name: 'Court Hire',
    description: 'Tennis court rental for private use',
    taxonomy: 'recreation'
  }
};

// Services offered
export const WHITE_CITY_SERVICES: Service[] = [
  {
    id: 'private-tennis-lessons',
    name: 'Private Tennis Lessons',
    description: 'One-on-one tennis coaching with professional instructors. Tailored to your skill level and goals, these sessions focus on technique, strategy, and skill development.',
    category: WHITE_CITY_SERVICE_CATEGORIES.TENNIS_COACHING,
    duration: 60,
    price: {
      amount: 120,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child', 'adolescent', 'adult'],
    tags: ['private-coaching', 'technique', 'personalized', 'skill-development']
  },
  {
    id: 'junior-squads',
    name: 'Junior Squad Programs',
    description: 'Age and skill-appropriate group tennis programs for children. From red ball beginners to tournament players, our squads provide progressive skill development in a fun environment.',
    category: WHITE_CITY_SERVICE_CATEGORIES.JUNIOR_PROGRAMS,
    duration: 60,
    price: {
      amount: 35,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child', 'adolescent'],
    tags: ['group-coaching', 'age-appropriate', 'progressive', 'fun', 'social']
  },
  {
    id: 'adult-group-coaching',
    name: 'Adult Group Coaching',
    description: 'Social tennis coaching for adults of all skill levels. Improve your game while staying fit and making new friends in our supportive group environment.',
    category: WHITE_CITY_SERVICE_CATEGORIES.ADULT_PROGRAMS,
    duration: 60,
    price: {
      amount: 40,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['adult-coaching', 'fitness', 'social', 'skill-improvement']
  },
  {
    id: 'hotshots-programs',
    name: 'Tennis Australia Hot Shots',
    description: 'Official Tennis Australia programs using modified courts, nets, and balls designed for children. Progressive pathway from red ball to green ball.',
    category: WHITE_CITY_SERVICE_CATEGORIES.JUNIOR_PROGRAMS,
    duration: 45,
    price: {
      amount: 30,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child'],
    tags: ['hotshots', 'modified-equipment', 'tennis-australia', 'beginner-friendly']
  },
  {
    id: 'competition-training',
    name: 'Competition Training',
    description: 'High-performance training for competitive players. Focuses on match play, tournament preparation, and advanced technical and tactical development.',
    category: WHITE_CITY_SERVICE_CATEGORIES.COMPETITIONS,
    duration: 90,
    price: {
      amount: 60,
      currency: 'AUD'
    },
    ageGroups: ['child', 'adolescent', 'adult'],
    tags: ['competition', 'high-performance', 'tournament-prep', 'advanced']
  },
  {
    id: 'holiday-tennis-camps',
    name: 'Holiday Tennis Camps',
    description: 'Multi-day tennis camps during school holidays. Combines skill development, games, and fun activities. Available for all skill levels from beginners to advanced players.',
    category: WHITE_CITY_SERVICE_CATEGORIES.HOLIDAY_CAMPS,
    duration: 240,
    price: {
      amount: 80,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child', 'adolescent'],
    tags: ['holiday-camp', 'multi-day', 'skill-development', 'fun-activities']
  },
  {
    id: 'cardio-tennis',
    name: 'Cardio Tennis',
    description: 'High-energy fitness workout that combines tennis drills with cardiovascular exercise. Perfect for adults looking to stay fit while improving their tennis skills.',
    category: WHITE_CITY_SERVICE_CATEGORIES.ADULT_PROGRAMS,
    duration: 60,
    price: {
      amount: 25,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['cardio', 'fitness', 'workout', 'tennis-drills']
  },
  {
    id: 'court-hire',
    name: 'Court Hire',
    description: 'Rent our professional tennis courts for private play. Courts available for casual games, practice, or private lessons with external coaches.',
    category: WHITE_CITY_SERVICE_CATEGORIES.COURT_HIRE,
    duration: 60,
    price: {
      amount: 35,
      currency: 'AUD'
    },
    ageGroups: ['child', 'adolescent', 'adult'],
    tags: ['court-rental', 'private-play', 'practice', 'casual']
  }
];

// Steve Loeffler - Head Coach
export const STEVE_LOEFFLER: ServiceProvider = {
  id: 'steve-loeffler',
  firstName: 'Steve',
  lastName: 'Loeffler',
  title: 'Head Coach & Centre Manager',
  profileImage: 'https://images.unsplash.com/photo-1566771297-36ff5e3a8b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Steve has been running tennis centres for over 25 years and brings a wealth of experience to White City Tennis. As a former professional player, he combines high-level tennis knowledge with exceptional coaching and management skills.',
  credentials: [
    {
      title: 'Tennis Australia Professional Coach',
      abbreviation: 'TA Pro',
      issuingBody: 'Tennis Australia',
      verified: true
    },
    {
      title: 'Club Professional Certification',
      abbreviation: 'Club Pro',
      issuingBody: 'Professional Tennis Registry',
      verified: true
    }
  ],
  services: WHITE_CITY_SERVICES.filter(service => 
    ['private-tennis-lessons', 'competition-training', 'adult-group-coaching'].includes(service.id)
  ),
  specializations: [
    'Professional Player Development',
    'Competition Training',
    'Adult Tennis Programs',
    'Centre Management',
    'High Performance Coaching',
    'Tournament Preparation'
  ],
  languages: ['English'],
  yearsExperience: 25,
  approach: 'I believe in developing both the technical and mental aspects of tennis. My coaching philosophy focuses on building confidence, improving technique, and helping players reach their potential whether they\'re playing for fun or competing at the highest levels.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 120,
    followUpFee: 120,
    currency: 'AUD'
  }
};

// Lucy Wood - Senior Coach
export const LUCY_WOOD: ServiceProvider = {
  id: 'lucy-wood',
  firstName: 'Lucy',
  lastName: 'Wood',
  title: 'Senior Coach',
  profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Lucy has been professionally involved in tennis since her junior career and brings over 20 years of coaching experience. She specializes in junior development and women\'s tennis programs.',
  credentials: [
    {
      title: 'Tennis Australia Coach Accreditation',
      abbreviation: 'TA Coach',
      issuingBody: 'Tennis Australia',
      verified: true
    },
    {
      title: 'Hot Shots Specialist Certification',
      abbreviation: 'Hot Shots',
      issuingBody: 'Tennis Australia',
      verified: true
    }
  ],
  services: WHITE_CITY_SERVICES.filter(service => 
    ['junior-squads', 'hotshots-programs', 'holiday-tennis-camps', 'private-tennis-lessons'].includes(service.id)
  ),
  specializations: [
    'Junior Development',
    'Hot Shots Programs',
    'Women\'s Tennis',
    'Beginner Coaching',
    'Youth Programs',
    'Technical Development'
  ],
  languages: ['English'],
  yearsExperience: 20,
  approach: 'I focus on making tennis fun and accessible for players of all ages. My coaching emphasizes proper technique from the beginning while ensuring every lesson is enjoyable and engaging.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 100,
    followUpFee: 100,
    currency: 'AUD'
  }
};

// Danielle Harmsen - Former WTA Professional
export const DANIELLE_HARMSEN: ServiceProvider = {
  id: 'danielle-harmsen',
  firstName: 'Danielle',
  lastName: 'Harmsen',
  title: 'Former WTA Professional & Coach',
  profileImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Danielle is a former WTA tour professional who was ranked in the top 200 in the world in doubles and 400 in singles. She brings elite-level experience and knowledge to her coaching.',
  credentials: [
    {
      title: 'Former WTA Professional Player',
      abbreviation: 'WTA Pro',
      issuingBody: 'Women\'s Tennis Association',
      verified: true
    },
    {
      title: 'High Performance Coach Certification',
      abbreviation: 'HP Coach',
      issuingBody: 'Tennis Australia',
      verified: true
    }
  ],
  services: WHITE_CITY_SERVICES.filter(service => 
    ['private-tennis-lessons', 'competition-training', 'adult-group-coaching'].includes(service.id)
  ),
  specializations: [
    'Professional Player Development',
    'Competition Preparation',
    'High Performance Training',
    'Mental Toughness',
    'WTA Tour Experience',
    'Elite Coaching'
  ],
  languages: ['English'],
  yearsExperience: 10,
  approach: 'Drawing from my professional playing experience, I help players understand the mental and physical demands of competitive tennis. I focus on developing match-winning strategies and building resilience.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 140,
    followUpFee: 140,
    currency: 'AUD'
  }
};

// White City Tennis Centre
export const WHITE_CITY_TENNIS_CENTER: ServiceCenter = {
  id: 'white-city-tennis',
  name: 'White City Tennis',
  description: 'An award-winning tennis complex and coaching team in Sydney, minutes from the heart of the city and the eastern suburb beaches. Offering comprehensive tennis programs for all ages and skill levels.',
  overview: 'White City Tennis is Sydney\'s premier tennis destination, featuring state-of-the-art facilities and a world-class coaching team. With programs ranging from toddlers to professional players, we provide the perfect environment for tennis development and enjoyment. Our award-winning coaches bring international experience and proven teaching methods to help every player reach their potential.',
  mission: 'To provide exceptional tennis coaching and facilities that inspire players of all ages and abilities to develop their skills, stay active, and enjoy the lifelong sport of tennis. We are committed to creating a welcoming community where everyone can experience the joy and benefits of tennis.',
  location: {
    address: '30 Alma Street',
    suburb: 'Paddington',
    state: 'NSW',
    postcode: '2021',
    country: 'Australia',
    coordinates: {
      lat: -33.8839,
      lng: 151.2261
    }
  },
  contact: {
    phone: '(02) 9332 3622',
    email: 'info@whitecitytennis.com.au',
    website: 'https://www.whitecitytennis.com.au',
    bookingUrl: 'https://whitecity.intennis.com.au/secure/customer/login',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/whitecitytennis'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/Whitecitytennis'
      }
    ]
  },
  providers: [STEVE_LOEFFLER, LUCY_WOOD, DANIELLE_HARMSEN],
  services: WHITE_CITY_SERVICES,
  operatingHours: {
    monday: { open: '06:00', close: '22:00' },
    tuesday: { open: '06:00', close: '22:00' },
    wednesday: { open: '06:00', close: '22:00' },
    thursday: { open: '06:00', close: '22:00' },
    friday: { open: '06:00', close: '22:00' },
    saturday: { open: '07:00', close: '19:00' },
    sunday: { open: '07:00', close: '19:00' }
  },
  features: [
    'Award-winning coaching team with international experience',
    'State-of-the-art tennis facilities undergoing $10m redevelopment',
    'Programs for all ages from toddlers to adults',
    'Tennis Australia Hot Shots certified programs',
    'Former WTA and professional players on coaching staff',
    'Sydney\'s largest local tennis competition',
    'Holiday camps and intensive training programs',
    'Cardio Tennis fitness programs',
    'Professional court hire available',
    'Minutes from Sydney CBD and eastern beaches',
    'Comprehensive junior development pathways',
    'Adult social and competitive programs',
    'Modern facilities with professional-grade courts',
    'Online booking system for easy scheduling',
    'Established tennis community and club culture'
  ],
  certifications: [
    'Tennis Australia Certified Coaching Staff',
    'Hot Shots Program Provider',
    'Professional Tennis Registry Member',
    'Club Professional Accreditation'
  ],
  accessibility: [
    'Public transport accessible',
    'On-site parking available',
    'Wheelchair accessible facilities',
    'Multiple court surfaces',
    'Professional lighting for evening play',
    'Modern amenities and clubhouse'
  ],
  images: [
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2066&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 1998,
  culturalConsiderations: 'White City Tennis welcomes players from all cultural backgrounds and promotes inclusive tennis participation. We recognize the traditional custodians of the land on which our facilities are located and pay respect to elders past, present, and emerging.'
};
