import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories for Active 8 Kids
export const ACTIVE8_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  KINDY_GYM: {
    id: 'kindy-gym',
    name: 'Kindy Gym',
    description: 'Early movement and gymnastics for toddlers and preschoolers',
    taxonomy: 'activities'
  },
  RECREATIONAL_GYMNASTICS: {
    id: 'recreational-gymnastics',
    name: 'Recreational Gymnastics',
    description: 'Fun gymnastics classes for children of all skill levels',
    taxonomy: 'activities'
  },
  NINJA_PARKOUR: {
    id: 'ninja-parkour',
    name: 'Ninja & Parkour',
    description: 'Ninja warrior and parkour training for kids',
    taxonomy: 'activities'
  },
  PLAYN_MOVE: {
    id: 'playn-move',
    name: 'Play\'n Move',
    description: 'Movement and play-based activities for young children',
    taxonomy: 'activities'
  },
  BIRTHDAY_PARTIES: {
    id: 'birthday-parties',
    name: 'Birthday Parties',
    description: 'Active birthday party experiences with gymnastics and games',
    taxonomy: 'recreation'
  },
  HOLIDAY_CAMPS: {
    id: 'holiday-camps',
    name: 'Holiday Camps',
    description: 'School holiday camps with varied physical activities',
    taxonomy: 'recreation'
  }
};

// Active 8 Kids Services
export const ACTIVE8_SERVICES: Service[] = [
  {
    id: 'kindy-gym-classes',
    name: 'Kindy Gym Classes',
    description: 'Early movement classes designed for children aged 0-5 years. Focus on fundamental movement skills, balance, coordination, and social interaction through structured play and gymnastics basics.',
    category: ACTIVE8_SERVICE_CATEGORIES.KINDY_GYM,
    duration: 45,
    price: {
      amount: 32,
      currency: 'AUD'
    },
    ageGroups: ['infant', 'toddler', 'preschool'],
    tags: ['movement', 'coordination', 'balance', 'social-skills', 'parent-child', 'early-development']
  },
  {
    id: 'recreational-gymnastics',
    name: 'Recreational Gymnastics',
    description: 'Fun and engaging gymnastics classes for children aged 5-12. Learn basic gymnastics skills on floor, beam, vault, and bars in a supportive environment that builds confidence and physical literacy.',
    category: ACTIVE8_SERVICE_CATEGORIES.RECREATIONAL_GYMNASTICS,
    duration: 60,
    price: {
      amount: 38,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child'],
    tags: ['gymnastics', 'strength', 'flexibility', 'confidence', 'skill-development', 'physical-literacy']
  },
  {
    id: 'ninja-gym-parkour',
    name: 'Ninja-Gym-Parkour',
    description: 'Dynamic classes combining gymnastics, ninja warrior obstacles, and parkour movements. Perfect for children who love adventure and challenge, focusing on agility, strength, and problem-solving.',
    category: ACTIVE8_SERVICE_CATEGORIES.NINJA_PARKOUR,
    duration: 60,
    price: {
      amount: 38,
      currency: 'AUD'
    },
    ageGroups: ['child', 'adolescent'],
    tags: ['ninja-warrior', 'parkour', 'agility', 'strength', 'problem-solving', 'adventure']
  },
  {
    id: 'playn-move',
    name: 'Play\'n Move',
    description: 'Early childhood movement program focusing on fundamental motor skills through play. Designed for children aged 2-4 years to develop gross motor skills, spatial awareness, and confidence.',
    category: ACTIVE8_SERVICE_CATEGORIES.PLAYN_MOVE,
    duration: 45,
    price: {
      amount: 32,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool'],
    tags: ['motor-skills', 'play-based', 'spatial-awareness', 'confidence', 'early-childhood']
  },
  {
    id: 'birthday-party-packages',
    name: 'Birthday Party Packages',
    description: 'Active birthday party experiences with gymnastics, games, and fun activities. Includes party host, equipment use, and celebration time. Perfect for children aged 3-12.',
    category: ACTIVE8_SERVICE_CATEGORIES.BIRTHDAY_PARTIES,
    duration: 90,
    price: {
      amount: 450,
      currency: 'AUD'
    },
    ageGroups: ['toddler', 'preschool', 'child'],
    tags: ['birthday-parties', 'celebrations', 'group-activities', 'games', 'fun']
  },
  {
    id: 'holiday-camps',
    name: 'School Holiday Camps',
    description: 'Full day or half day holiday camps combining gymnastics, ninja activities, games, and crafts. Designed to keep children active and engaged during school holidays.',
    category: ACTIVE8_SERVICE_CATEGORIES.HOLIDAY_CAMPS,
    duration: 360, // 6 hours
    price: {
      amount: 85,
      currency: 'AUD'
    },
    ageGroups: ['preschool', 'child'],
    tags: ['holiday-camps', 'school-holidays', 'full-day', 'varied-activities', 'active-play']
  }
];

// Emily McConaghy - Lead Gymnastics Coach
export const EMILY_MCCONAGHY: ServiceProvider = {
  id: 'emily-mcconaghy',
  firstName: 'Emily',
  lastName: 'McConaghy',
  title: 'Lead Gymnastics Coach & Program Director',
  profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  bio: 'Emily is a passionate gymnastics coach with over 8 years of experience working with children aged 0-12. She specializes in creating safe, nurturing environments where children can develop confidence, strength, and a love of movement through gymnastics, ninja warrior, and parkour activities.',
  personalStory: 'Growing up as a competitive gymnast, I discovered my love for coaching when I started helping younger athletes at my gym. There\'s nothing more rewarding than seeing a child\'s face light up when they master a new skill or overcome a fear. At Active8Kids, I focus on making every child feel valued and capable, regardless of their ability level.',
  credentials: [
    {
      title: 'Gymnastics Australia Level 2 Coaching Certification',
      abbreviation: 'GA L2',
      issuingBody: 'Gymnastics Australia',
      verified: true
    },
    {
      title: 'Working with Children Check',
      abbreviation: 'WWCC',
      issuingBody: 'NSW Government',
      verified: true
    },
    {
      title: 'First Aid and CPR Certification',
      abbreviation: 'First Aid',
      issuingBody: 'St John Ambulance',
      verified: true
    },
    {
      title: 'Certificate IV in Sport and Recreation',
      abbreviation: 'Cert IV',
      issuingBody: 'TAFE NSW',
      verified: true
    }
  ],
  services: ACTIVE8_SERVICES.filter(service => 
    ['recreational-gymnastics', 'kindy-gym-classes', 'birthday-party-packages'].includes(service.id)
  ),
  specializations: [
    'Recreational Gymnastics',
    'Early Childhood Movement',
    'Confidence Building',
    'Motor Skill Development',
    'Safe Coaching Practices',
    'Inclusive Programming',
    'Parent-Child Classes',
    'Birthday Party Coordination'
  ],
  languages: ['English'],
  yearsExperience: 8,
  approach: 'My coaching philosophy centers on creating a positive, inclusive environment where every child feels supported to reach their potential. I believe in celebrating small victories, encouraging effort over perfection, and making movement fun. Safety is always my top priority, and I work closely with parents to ensure each child\'s individual needs are met.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 32,
    followUpFee: 32,
    currency: 'AUD'
  }
};

// Jake Thompson - Ninja & Parkour Specialist
export const JAKE_THOMPSON: ServiceProvider = {
  id: 'jake-thompson',
  firstName: 'Jake',
  lastName: 'Thompson',
  title: 'Ninja & Parkour Specialist',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  bio: 'Jake brings high-energy enthusiasm to Active8Kids as our ninja warrior and parkour specialist. With a background in martial arts and parkour training, he creates exciting challenges that help children build strength, agility, and problem-solving skills while having fun.',
  personalStory: 'I started parkour as a teenager and it completely changed my perspective on movement and overcoming obstacles - both physical and mental. Now I love sharing that same sense of adventure and resilience with kids. Every obstacle course becomes a chance for children to discover they\'re stronger and braver than they thought.',
  credentials: [
    {
      title: 'Parkour Australia Instructor Certification',
      abbreviation: 'PA Instructor',
      issuingBody: 'Parkour Australia',
      verified: true
    },
    {
      title: 'Martial Arts Black Belt - Karate',
      abbreviation: 'Karate BB',
      issuingBody: 'Australian Karate Federation',
      verified: true
    },
    {
      title: 'Working with Children Check',
      abbreviation: 'WWCC',
      issuingBody: 'NSW Government',
      verified: true
    },
    {
      title: 'First Aid and CPR Certification',
      abbreviation: 'First Aid',
      issuingBody: 'St John Ambulance',
      verified: true
    }
  ],
  services: ACTIVE8_SERVICES.filter(service => 
    ['ninja-gym-parkour', 'holiday-camps'].includes(service.id)
  ),
  specializations: [
    'Ninja Warrior Training',
    'Parkour Movement',
    'Obstacle Course Design',
    'Agility Development',
    'Risk Assessment',
    'Adventure-Based Learning',
    'Problem-Solving Skills',
    'Confidence Through Challenge'
  ],
  languages: ['English'],
  yearsExperience: 6,
  approach: 'I believe every child is capable of amazing things when given the right encouragement and challenge. My classes focus on progressive skill building, where children learn to assess risks, solve movement problems, and push their limits safely. The goal is not just physical fitness, but building mental resilience and confidence.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 38,
    followUpFee: 38,
    currency: 'AUD'
  }
};

// Active 8 Kids Service Center
export const ACTIVE8_CENTER: ServiceCenter = {
  id: 'active8kids-bondi-junction',
  name: 'Active8Kids',
  description: 'Gymnastics, Ninja Warrior & Parkour classes for children aged 0-12 in Bondi Junction. We provide a safe, nurturing environment where children can play, learn, and gain confidence through physical activity.',
  overview: 'Active8Kids was founded in 2013 with a mission to provide girls and boys aged 0-12 with the opportunity to play, learn and gain confidence through classes that combine Gymnastics, Ninja Warrior and Parkour techniques. Our team of qualified coaches are dedicated to consistently providing a safe and nurturing environment for children of all abilities.',
  mission: 'To provide children aged 0-12 with the opportunity to play, learn and gain confidence through gymnastics, ninja warrior, and parkour activities in a safe, supportive, and fun environment.',
  location: {
    address: '70 Bronte Road',
    suburb: 'Bondi Junction',
    state: 'NSW',
    postcode: '2022',
    country: 'Australia',
    coordinates: {
      lat: -33.8915,
      lng: 151.2477
    }
  },
  contact: {
    phone: '0416 628 531',
    email: 'info@active8kids.com.au',
    website: 'https://www.active8kids.com.au',
    bookingUrl: 'https://www.active8kids.com.au/casual-booking',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/active8kids_bondi_junction/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/www.active8kids.com.au/'
      }
    ]
  },
  providers: [EMILY_MCCONAGHY, JAKE_THOMPSON],
  services: ACTIVE8_SERVICES,
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '08:00', close: '16:00' },
    sunday: { open: '09:00', close: '15:00' }
  },
  features: [
    'Purpose-built gymnastics facility',
    'Ninja warrior obstacle courses',
    'Parkour training areas',
    'Age-appropriate equipment',
    'Small class sizes for individual attention',
    'Qualified and experienced coaches',
    'Birthday party packages available',
    'School holiday camps',
    'Active Kids Voucher provider',
    'Family-friendly environment',
    'Spectator viewing areas',
    'Safe and secure facility'
  ],
  certifications: [
    'Gymnastics Australia Registered Gym',
    'Active Kids Voucher Provider',
    'Insured and Licensed Facility'
  ],
  insurance: [
    'Public Liability Insurance',
    'Professional Indemnity Insurance',
    'Active Kids Vouchers Accepted'
  ],
  accessibility: [
    'Ground floor facility',
    'Accessible parking available',
    'Wide entrance and doorways',
    'Accessible bathroom facilities',
    'Equipment suitable for various abilities',
    'Individual needs accommodated'
  ],
  images: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1594736797933-d0f06ba42ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2013,
  culturalConsiderations: 'Active8Kids welcomes children from all cultural backgrounds and abilities. We strive to create an inclusive environment where every child feels valued and supported in their physical development journey.'
};
