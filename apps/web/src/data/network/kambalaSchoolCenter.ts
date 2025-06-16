import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories for Kambala School
export const KAMBALA_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  EARLY_LEARNING: {
    id: 'early-learning',
    name: 'Early Learning',
    description: 'Early childhood education and development programs',
    taxonomy: 'education'
  },
  PRIMARY_EDUCATION: {
    id: 'primary-education',
    name: 'Primary Education',
    description: 'Foundation years education programs',
    taxonomy: 'education'
  },
  SECONDARY_EDUCATION: {
    id: 'secondary-education',
    name: 'Secondary Education',
    description: 'Senior school education and university preparation',
    taxonomy: 'education'
  },
  ENRICHMENT_PROGRAMS: {
    id: 'enrichment-programs',
    name: 'Enrichment Programs',
    description: 'Co-curricular and enrichment activities',
    taxonomy: 'education'
  },
  STUDENT_WELLBEING: {
    id: 'student-wellbeing',
    name: 'Student Wellbeing',
    description: 'Pastoral care and student support services',
    taxonomy: 'support'
  }
};

// Services offered by Kambala School
export const KAMBALA_SERVICES: Service[] = [
  {
    id: 'early-learning-program',
    name: 'Early Learning Centre (Prep - Year 2)',
    description: 'Nurturing early childhood education program focused on play-based learning, literacy development, and social-emotional growth in a safe and supportive environment.',
    category: KAMBALA_SERVICE_CATEGORIES.EARLY_LEARNING,
    duration: 360, // 6 hours per day
    ageGroups: ['preschool', 'child'],
    tags: ['play-based-learning', 'literacy', 'numeracy', 'social-development', 'early-childhood']
  },
  {
    id: 'primary-education-program',
    name: 'Primary School (Years 3-6)',
    description: 'Comprehensive primary education program developing academic excellence, critical thinking, and creativity through innovative teaching practices and personalized learning approaches.',
    category: KAMBALA_SERVICE_CATEGORIES.PRIMARY_EDUCATION,
    duration: 360, // 6 hours per day
    ageGroups: ['child'],
    tags: ['academic-excellence', 'critical-thinking', 'creativity', 'personalized-learning', 'primary-education']
  },
  {
    id: 'secondary-education-program',
    name: 'Secondary School (Years 7-12)',
    description: 'Rigorous secondary education program preparing students for university and beyond, with strong focus on academic achievement, leadership development, and global citizenship.',
    category: KAMBALA_SERVICE_CATEGORIES.SECONDARY_EDUCATION,
    duration: 360, // 6 hours per day
    ageGroups: ['adolescent'],
    tags: ['university-preparation', 'academic-achievement', 'leadership', 'global-citizenship', 'secondary-education']
  },
  {
    id: 'enrichment-activities',
    name: 'Co-Curricular & Enrichment Programs',
    description: 'Diverse range of co-curricular activities including sports, arts, music, drama, debating, and community service programs to develop well-rounded individuals.',
    category: KAMBALA_SERVICE_CATEGORIES.ENRICHMENT_PROGRAMS,
    duration: 90, // 1.5 hours after school
    ageGroups: ['child', 'adolescent'],
    tags: ['co-curricular', 'sports', 'arts', 'music', 'drama', 'community-service', 'well-rounded-development']
  },
  {
    id: 'student-wellbeing-support',
    name: 'Student Wellbeing & Pastoral Care',
    description: 'Comprehensive student wellbeing program including counseling, pastoral care, learning support, and social-emotional development initiatives.',
    category: KAMBALA_SERVICE_CATEGORIES.STUDENT_WELLBEING,
    duration: 60,
    ageGroups: ['preschool', 'child', 'adolescent'],
    tags: ['wellbeing', 'pastoral-care', 'counseling', 'learning-support', 'social-emotional-development']
  }
];

// Principal / Educational Leader
export const KAMBALA_PRINCIPAL: ServiceProvider = {
  id: 'jane-danvers',
  firstName: 'Jane',
  lastName: 'Danvers',
  title: 'Principal, Kambala Independent Girls School',
  profileImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&h=150&fit=crop&crop=center',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  bio: 'Kambala School is a leading independent Anglican day and boarding school for girls, providing exceptional education from Prep to Year 12. Located in Rose Bay, we have been nurturing young women for over 135 years, combining academic excellence with strong pastoral care and a commitment to developing confident, compassionate global citizens.',
  personalStory: 'Founded in 1887, Kambala has a proud heritage of educating girls to become leaders, innovators, and change-makers. Our beautiful harbourside campus provides an inspiring environment where students thrive academically, socially, and personally, supported by dedicated teachers and a strong community spirit.',
  credentials: [
    {
      title: 'Independent Schools NSW Member',
      abbreviation: 'ISNSW',
      issuingBody: 'Association of Independent Schools NSW',
      verified: true
    },
    {
      title: 'Anglican Schools Corporation',
      abbreviation: 'ASC',
      issuingBody: 'Anglican Church',
      verified: true
    },
    {
      title: 'NESA Registered School',
      abbreviation: 'NESA',
      issuingBody: 'NSW Education Standards Authority',
      verified: true
    },
    {
      title: 'International Baccalaureate World School',
      abbreviation: 'IB World School',
      issuingBody: 'International Baccalaureate Organization',
      verified: true
    }
  ],
  services: KAMBALA_SERVICES,
  specializations: [
    'Girls Education',
    'Academic Excellence',
    'Leadership Development',
    'International Baccalaureate',
    'Pastoral Care',
    'STEAM Education',
    'Global Citizenship',
    'Character Development',
    'University Preparation',
    'Co-curricular Programs'
  ],
  languages: ['English'],
  yearsExperience: 137, // Founded in 1887
  approach: 'At Kambala, we believe in empowering girls to think critically, act with integrity, and lead with confidence. Our holistic approach to education combines rigorous academics with strong pastoral care, ensuring each student develops not only intellectual capacity but also emotional intelligence, resilience, and a strong sense of purpose.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 0, // School fees handled separately
    followUpFee: 0,
    currency: 'AUD'
  }
};

// Kambala School Service Center
export const KAMBALA_SCHOOL_CENTER: ServiceCenter = {
  id: 'kambala-school',
  name: 'Kambala School',
  description: 'A leading independent Anglican day and boarding school for girls from Prep to Year 12, located in the heart of Rose Bay. Kambala combines academic excellence with strong pastoral care in a supportive and inspiring environment.',
  overview: 'Kambala School has been providing exceptional education for girls for over 135 years. Our beautiful harbourside campus offers state-of-the-art facilities, innovative teaching practices, and a strong sense of community. We prepare confident, compassionate young women who are ready to make a positive impact in the world.',
  mission: 'To provide an exceptional education that empowers girls to think critically, act with integrity, and lead with confidence. We are committed to nurturing each student\'s intellectual, emotional, and spiritual development in a supportive Christian community.',
  location: {
    address: '794 New South Head Road',
    suburb: 'Rose Bay',
    state: 'NSW',
    postcode: '2029',
    country: 'Australia',
    coordinates: {
      lat: -33.8669,
      lng: 151.2827
    }
  },
  contact: {
    phone: '(02) 9388 6777',
    email: 'office@kambala.nsw.edu.au',
    website: 'https://www.kambala.nsw.edu.au',
    bookingUrl: 'https://www.kambala.nsw.edu.au/enrolments',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/kambalaschool/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/KambalaSchool'
      },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/school/kambala-school/'
      }
    ]
  },
  providers: [KAMBALA_PRINCIPAL],
  services: KAMBALA_SERVICES,
  operatingHours: {
    monday: { open: '08:00', close: '15:30' },
    tuesday: { open: '08:00', close: '15:30' },
    wednesday: { open: '08:00', close: '15:30' },
    thursday: { open: '08:00', close: '15:30' },
    friday: { open: '08:00', close: '15:30' },
    saturday: { closed: true, open: '', close: '' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Prep to Year 12 education for girls',
    'Day and boarding options available',
    'International Baccalaureate Diploma Programme',
    'State-of-the-art facilities and technology',
    'Comprehensive co-curricular programs',
    'Strong pastoral care and wellbeing support',
    'University preparation and career guidance',
    'Global education and exchange programs',
    'STEAM (Science, Technology, Engineering, Arts, Mathematics) focus',
    'Chapel and spiritual development programs',
    'Alumni network and mentoring',
    'Scholarship and bursary programs available'
  ],
  certifications: [
    'Independent Schools NSW Member',
    'Anglican Schools Corporation',
    'NESA Registered School',
    'IB World School Authorization',
    'Child Safe Standards Compliant'
  ],
  insurance: [
    'Professional Indemnity Insurance',
    'Public Liability Insurance',
    'Student Accident Insurance'
  ],
  accessibility: [
    'Wheelchair accessible facilities',
    'Learning support programs',
    'EAL/D (English as an Additional Language) support',
    'Disability access and inclusion',
    'Public transport accessible',
    'On-site parking available'
  ],
  images: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 1887,
  culturalConsiderations: 'Kambala welcomes students from diverse cultural backgrounds and celebrates the richness of our multicultural community. We acknowledge the traditional custodians of the land on which our school stands and are committed to fostering understanding and respect for all cultures and beliefs.'
};
