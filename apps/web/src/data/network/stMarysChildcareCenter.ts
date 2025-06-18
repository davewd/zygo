import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories for St Mary's Child Care Centre
export const ST_MARYS_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  TODDLER_CARE: {
    id: 'toddler-care',
    name: 'Toddler Care & Education',
    description: 'Specialized care and early learning programs for toddlers',
    taxonomy: 'education'
  },
  PRESCHOOL_CARE: {
    id: 'preschool-care',
    name: 'Preschool Care & Education',
    description: 'Comprehensive preschool education and care programs',
    taxonomy: 'education'
  },
  KINDERGARTEN_PREP: {
    id: 'kindergarten-prep',
    name: 'Kindergarten Preparation',
    description: 'School readiness and transition to formal education programs',
    taxonomy: 'education'
  },
  OUTDOOR_EDUCATION: {
    id: 'outdoor-education',
    name: 'Outdoor Education',
    description: 'Nature-based learning and outdoor exploration programs',
    taxonomy: 'education'
  },
  MUSIC_EDUCATION: {
    id: 'music-education',
    name: 'Music Education',
    description: 'Specialized music and creative arts programs',
    taxonomy: 'education'
  },
  COMMUNITY_PROGRAMS: {
    id: 'community-programs',
    name: 'Community Engagement',
    description: 'Local community connection and exploration programs',
    taxonomy: 'education'
  }
};

// Services offered by St Mary's Child Care Centre
export const ST_MARYS_SERVICES: Service[] = [
  {
    id: 'joey-room-program',
    name: 'Joey Room (2-3 years)',
    description: 'Nurturing care and early learning program for toddlers aged 2-3 years. Focus on developing independence, social skills, and language through play-based learning in a warm, supportive environment with exceptionally high staff-to-child ratios.',
    category: ST_MARYS_SERVICE_CATEGORIES.TODDLER_CARE,
    duration: 600, // 10 hours (7:30am - 5:30pm)
    price: {
      amount: 165,
      currency: 'AUD'
    },
    ageGroups: ['toddler'],
    tags: ['toddler-care', 'play-based-learning', 'independence', 'social-skills', 'language-development', 'high-staff-ratios']
  },
  {
    id: 'koala-room-program',
    name: 'Koala Room (3-4 years)',
    description: 'Engaging preschool program for children aged 3-4 years emphasizing creative expression, early literacy, numeracy concepts, and social-emotional development. Children participate in structured activities while maintaining the joy of learning through play.',
    category: ST_MARYS_SERVICE_CATEGORIES.PRESCHOOL_CARE,
    duration: 600, // 10 hours (7:30am - 5:30pm)
    price: {
      amount: 155,
      currency: 'AUD'
    },
    ageGroups: ['preschool'],
    tags: ['preschool-education', 'creative-expression', 'early-literacy', 'numeracy', 'social-emotional', 'structured-learning']
  },
  {
    id: 'kookaburra-room-program',
    name: 'Kookaburra Room (4-5 years)',
    description: 'School readiness program for children aged 4-5 years focusing on kindergarten preparation, advanced learning concepts, and community connections. Includes the special "Out the Gate" program for weekly community exploration and real-world learning experiences.',
    category: ST_MARYS_SERVICE_CATEGORIES.KINDERGARTEN_PREP,
    duration: 600, // 10 hours (7:30am - 5:30pm)
    price: {
      amount: 145,
      currency: 'AUD'
    },
    ageGroups: ['preschool'],
    tags: ['school-readiness', 'kindergarten-prep', 'advanced-learning', 'community-connection', 'out-the-gate-program', 'transition-support']
  },
  {
    id: 'outdoor-education-program',
    name: 'Outdoor Education Program',
    description: 'Dedicated outdoor education program led by a full-time qualified teacher. Children explore the natural purpose-built outdoor play space, engage with nature, and develop environmental awareness and appreciation.',
    category: ST_MARYS_SERVICE_CATEGORIES.OUTDOOR_EDUCATION,
    duration: 60,
    ageGroups: ['toddler', 'preschool'],
    tags: ['outdoor-education', 'nature-exploration', 'environmental-awareness', 'physical-development', 'natural-play-space']
  },
  {
    id: 'music-program',
    name: 'Specialized Music Program',
    description: 'Weekly music sessions conducted by a specialized music teacher. Children explore rhythm, melody, instruments, and creative expression through age-appropriate musical activities and experiences.',
    category: ST_MARYS_SERVICE_CATEGORIES.MUSIC_EDUCATION,
    duration: 45,
    ageGroups: ['toddler', 'preschool'],
    tags: ['music-education', 'rhythm', 'melody', 'instruments', 'creative-expression', 'specialist-teacher']
  },
  {
    id: 'out-the-gate-program',
    name: 'Out the Gate Community Program',
    description: 'Unique weekly community exploration program exclusively for Kookaburra children. Small groups venture into the local Waverley community to make real-world connections, visit local businesses, and engage with community members.',
    category: ST_MARYS_SERVICE_CATEGORIES.COMMUNITY_PROGRAMS,
    duration: 90,
    ageGroups: ['preschool'],
    tags: ['community-exploration', 'real-world-learning', 'local-connections', 'small-groups', 'social-skills', 'kookaburra-exclusive']
  }
];

// Sarah Mitchell - Centre Director & Educational Leader
export const SARAH_MITCHELL_DIRECTOR: ServiceProvider = {
  id: 'sarah-mitchell-director',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  title: 'Centre Director & Educational Leader',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop&crop=center',
  bio: 'Sarah has been leading St Mary\'s Child Care Centre for over 10 years, bringing a wealth of experience in early childhood education and a passion for creating inclusive, nurturing environments where every child can thrive. Her approach emphasizes the importance of family involvement and community connections in a child\'s development.',
  personalStory: 'As a mother of three and an experienced early childhood educator, I understand the unique trust families place in us when choosing care for their children. At St Mary\'s, we honor that trust by providing exceptional care that promotes inclusion, empathy, and friendship while preparing children for their next steps in learning.',
  credentials: [
    {
      title: 'Bachelor of Early Childhood Education',
      abbreviation: 'BEd(ECE)',
      issuingBody: 'University of Sydney',
      year: 2008,
      verified: true
    },
    {
      title: 'Diploma of Children\'s Services',
      abbreviation: 'DipCS',
      issuingBody: 'TAFE NSW',
      year: 2006,
      verified: true
    },
    {
      title: 'Educational Leader Qualification',
      abbreviation: 'ELQ',
      issuingBody: 'Australian Children\'s Education & Care Quality Authority',
      verified: true
    },
    {
      title: 'First Aid & CPR Certificate',
      abbreviation: 'First Aid',
      issuingBody: 'Australian Red Cross',
      verified: true
    }
  ],
  services: ST_MARYS_SERVICES.filter(service => 
    ['joey-room-program', 'koala-room-program', 'kookaburra-room-program'].includes(service.id)
  ),
  specializations: [
    'Early Childhood Education Leadership',
    'Inclusive Education Practices',
    'Family Engagement Strategies',
    'Community-Based Learning',
    'School Readiness Programs',
    'Play-Based Curriculum Development'
  ],
  languages: ['English'],
  yearsExperience: 15,
  approach: 'I believe in creating a nurturing environment where children feel valued, respected, and encouraged to explore their world. Our approach emphasizes inclusion, empathy, and friendship while recognizing that every child develops at their own pace. We work closely with families to ensure consistency between home and centre, supporting each child\'s unique journey.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 0, // Part of daily care fee
    followUpFee: 0,
    currency: 'AUD'
  }
};

// Rebecca Thompson - Outdoor Education Teacher
export const REBECCA_THOMPSON_OUTDOOR: ServiceProvider = {
  id: 'rebecca-thompson-outdoor',
  firstName: 'Rebecca',
  lastName: 'Thompson',
  title: 'Full-Time Outdoor Education Teacher',
  profileImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center',
  bio: 'Rebecca is our dedicated outdoor education specialist, bringing nature-based learning to life for children at St Mary\'s. With a background in environmental science and early childhood education, she creates meaningful outdoor experiences that connect children with the natural world.',
  personalStory: 'Growing up exploring the Australian bush, I developed a deep love for nature that I\'m passionate about sharing with children. I believe outdoor education is essential for developing environmental stewardship, physical confidence, and a sense of wonder about the world around us.',
  credentials: [
    {
      title: 'Bachelor of Environmental Science',
      abbreviation: 'BEnvSci',
      issuingBody: 'University of New South Wales',
      year: 2012,
      verified: true
    },
    {
      title: 'Graduate Diploma in Early Childhood Education',
      abbreviation: 'GradDipECE',
      issuingBody: 'Macquarie University',
      year: 2015,
      verified: true
    },
    {
      title: 'Nature Pedagogy Certification',
      abbreviation: 'NPC',
      issuingBody: 'Nature Play Australia',
      verified: true
    },
    {
      title: 'Wilderness First Aid Certificate',
      abbreviation: 'WFA',
      issuingBody: 'Wilderness Medicine Institute',
      verified: true
    }
  ],
  services: ST_MARYS_SERVICES.filter(service => 
    ['outdoor-education-program'].includes(service.id)
  ),
  specializations: [
    'Outdoor Education',
    'Nature-Based Learning',
    'Environmental Education',
    'Risk Assessment in Natural Settings',
    'Indigenous Land Connection',
    'Sustainability Education'
  ],
  languages: ['English'],
  yearsExperience: 8,
  approach: 'I believe children are natural explorers who learn best when they can engage all their senses with the natural world. My outdoor programs encourage curiosity, risk-taking in safe environments, and developing a deep connection with nature that will last a lifetime.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 0, // Part of daily care fee
    followUpFee: 0,
    currency: 'AUD'
  }
};

// Michael Chen - Music Specialist
export const MICHAEL_CHEN_MUSIC: ServiceProvider = {
  id: 'michael-chen-music',
  firstName: 'Michael',
  lastName: 'Chen',
  title: 'Specialist Music Teacher',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop&crop=center',
  bio: 'Michael brings music and creative expression to life at St Mary\'s through engaging, age-appropriate musical experiences. With qualifications in both music education and early childhood development, he understands how music supports all areas of learning.',
  personalStory: 'Music has been my passion since childhood, and I love seeing the joy and confidence that musical experiences bring to young children. Whether it\'s beating a drum, singing a song, or moving to rhythm, music opens up new ways for children to express themselves and connect with others.',
  credentials: [
    {
      title: 'Bachelor of Music Education',
      abbreviation: 'BMus(Ed)',
      issuingBody: 'Sydney Conservatorium of Music',
      year: 2014,
      verified: true
    },
    {
      title: 'Diploma of Early Childhood Education and Care',
      abbreviation: 'DipECEC',
      issuingBody: 'TAFE NSW',
      year: 2017,
      verified: true
    },
    {
      title: 'Kodály Music Education Certificate',
      abbreviation: 'Kodály',
      issuingBody: 'Kodály Music Education Institute',
      verified: true
    },
    {
      title: 'Working with Children Check',
      abbreviation: 'WWCC',
      issuingBody: 'NSW Office of the Children\'s Guardian',
      verified: true
    }
  ],
  services: ST_MARYS_SERVICES.filter(service => 
    ['music-program'].includes(service.id)
  ),
  specializations: [
    'Early Childhood Music Education',
    'Kodály Method',
    'Rhythm and Movement',
    'Instrument Introduction',
    'Creative Expression through Music',
    'Music Therapy Techniques'
  ],
  languages: ['English', 'Mandarin'],
  yearsExperience: 6,
  approach: 'I use a play-based approach to music education that meets children where they are developmentally. Through songs, movement, instruments, and creative play, children develop musicality while also strengthening language skills, social connections, and emotional expression.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 0, // Part of specialist program
    followUpFee: 0,
    currency: 'AUD'
  }
};

// St Mary's Child Care Centre
export const ST_MARYS_CHILDCARE_CENTER: ServiceCenter = {
  id: 'st-marys-childcare-centre',
  name: 'St Mary\'s Child Care Centre',
  description: 'A nurturing place for your child to learn, play & grow. Well-established community-based long day care centre in Waverley, offering exceptional early childhood education with high staff-to-child ratios and specialized programs.',
  overview: 'St Mary\'s Child Care Centre provides a child-focused environment complemented by experienced early childhood teachers. Our three age-appropriate rooms (Joey, Koala, and Kookaburra) create focus, cohesiveness, and connections as children move as a group towards school. We believe in promoting inclusion, empathy, and friendship while encouraging involvement from families and the local community.',
  mission: 'To provide a nurturing, inclusive environment where children aged 2-5 can learn, play, and grow through play-based learning, community connections, and exceptional care that prepares them for their educational journey ahead.',
  location: {
    address: '240 Birrell Street',
    suburb: 'Waverley',
    state: 'NSW',
    postcode: '2024',
    country: 'Australia',
    coordinates: {
      lat: -33.9021,
      lng: 151.2634
    }
  },
  contact: {
    phone: '(02) 9389 0853',
    email: 'rebecca@stmaryschildcarecentre.org.au',
    website: 'https://stmaryschildcarecentre.org.au/',
    bookingUrl: 'https://stmaryschildcarecentre.org.au/',
    socialMedia: []
  },
  providers: [SARAH_MITCHELL_DIRECTOR, REBECCA_THOMPSON_OUTDOOR, MICHAEL_CHEN_MUSIC],
  services: ST_MARYS_SERVICES,
  operatingHours: {
    monday: { open: '07:30', close: '17:30' },
    tuesday: { open: '07:30', close: '17:30' },
    wednesday: { open: '07:30', close: '17:30' },
    thursday: { open: '07:30', close: '17:30' },
    friday: { open: '07:30', close: '17:30' },
    saturday: { closed: true, open: '', close: '' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Three age-appropriate rooms: Joey (2-3 years), Koala (3-4 years), Kookaburra (4-5 years)',
    'Exceedingly high staff-to-child ratios for personalized attention',
    'Full-time dedicated outdoor education teacher',
    'Specialized music teacher visiting twice weekly',
    'Natural purpose-built outdoor play space for exploration and discovery',
    'Unique "Out the Gate" community exploration program for Kookaburra children',
    'Curriculum promoting inclusion, empathy, and friendship',
    'Strong emphasis on family involvement and community connections',
    'School readiness preparation and kindergarten transition support',
    'Play-based learning approach supporting all developmental domains',
    'Local community integration and real-world learning experiences',
    'Nutritious meals and snacks prepared on-site',
    'Safe, secure, and welcoming environment',
    'Experienced early childhood teachers and educators',
    'Individual learning portfolios and developmental observations',
    'Regular family communication and progress updates'
  ],
  certifications: [
    'National Quality Standard (NQS) Approved',
    'Australian Children\'s Education & Care Quality Authority (ACECQA) Registered',
    'NSW Department of Education Licensed',
    'Child Care Subsidy (CCS) Approved Provider',
    'Working with Children Check Verified Staff'
  ],
  insurance: [
    'Public Liability Insurance',
    'Professional Indemnity Insurance',
    'Child Care Centre Insurance',
    'WorkCover NSW Compliance'
  ],
  accessibility: [
    'Ground level accessibility',
    'Wide pathways and doorways',
    'Accessible bathroom facilities',
    'Inclusive program adaptations available',
    'Support for children with additional needs',
    'Multilingual staff support available',
    'Family cultural celebrations welcomed',
    'Flexible enrollment and attendance options'
  ],
  images: [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center'
  ],
  establishedYear: 2008,
  culturalConsiderations: 'St Mary\'s welcomes families from all cultural backgrounds and celebrates diversity through inclusive practices, multicultural celebrations, and respect for all family traditions and values.'
};

// Export all providers for easy import
export const ST_MARYS_PROVIDERS: ServiceProvider[] = [
  SARAH_MITCHELL_DIRECTOR,
  REBECCA_THOMPSON_OUTDOOR,
  MICHAEL_CHEN_MUSIC
];
