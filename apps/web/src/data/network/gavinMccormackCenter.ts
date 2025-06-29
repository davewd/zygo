// Local type definitions for this file - matching existing pattern in the codebase
interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  taxonomy: 'healthcare' | 'education' | 'support' | 'therapy' | 'wellness' | 'emergency' | 'activities' | 'recreation';
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration?: number;
  price?: {
    amount: number;
    currency: string;
    rebate?: {
      provider: string;
      amount: number;
    };
  };
  ageGroups?: ('prenatal' | 'newborn' | 'infant' | 'toddler' | 'preschool' | 'child' | 'adolescent' | 'adult')[];
  tags?: string[];
}

interface Credential {
  title: string;
  abbreviation?: string;
  issuingBody: string;
  year?: number;
  verified: boolean;
  credentialDefinitionId?: string;
  personalCredentialId?: string;
  expiryDate?: string;
  verificationReference?: string;
}

interface Location {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
  socialMedia?: {
    platform: string;
    url: string;
  }[];
}

interface ServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
  headerBackgroundImage?: string;
  bio: string;
  personalStory?: string;
  credentials: Credential[];
  services: Service[];
  specializations: string[];
  languages: string[];
  yearsExperience: number;
  approach?: string;
  availability: {
    inPerson: boolean;
    telehealth: boolean;
    homeVisits: boolean;
    emergency: boolean;
  };
  pricing?: {
    consultationFee?: number;
    followUpFee?: number;
    currency: string;
  };
}

interface ServiceCenter {
  id: string;
  name: string;
  description: string;
  overview: string;
  mission?: string;
  location: Location;
  contact: ContactInfo;
  providers: ServiceProvider[];
  services: Service[];
  operatingHours: {
    [key: string]: {
      open?: string;
      close?: string;
      closed?: boolean;
    };
  };
  features: string[];
  certifications?: string[];
  insurance?: string[];
  accessibility?: string[];
  images?: string[];
  establishedYear?: number;
  culturalConsiderations?: string;
}

// Service Categories for Gavin McCormack's offerings
export const GAVIN_MCCORMACK_SERVICE_CATEGORIES = {
  EDUCATIONAL_CONTENT: {
    id: 'educational-content',
    name: 'Educational Content',
    description: 'Blog posts and articles on child development, education, and parenting',
    taxonomy: 'education' as const
  },
  BOOKS_RESOURCES: {
    id: 'books-resources', 
    name: 'Books & Resources',
    description: 'Educational books, guides, and resources for parents and teachers',
    taxonomy: 'education' as const
  },
  SPEAKING_CONSULTATION: {
    id: 'speaking-consultation',
    name: 'Speaking & Consultation',
    description: 'Keynote speaking and educational consultation services',
    taxonomy: 'education' as const
  }
};

// Services offered by Gavin McCormack
export const GAVIN_MCCORMACK_SERVICES: Service[] = [
  {
    id: 'educational-blog',
    name: 'Educational Blog Content',
    description: 'Regular blog posts covering child development, progressive education, Montessori methods, and practical parenting advice.',
    category: GAVIN_MCCORMACK_SERVICE_CATEGORIES.EDUCATIONAL_CONTENT,
    duration: 0, // Reading time varies
    price: {
      amount: 0,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'newborn', 'infant', 'toddler', 'preschool', 'child', 'adolescent', 'adult'],
    tags: ['education', 'blog', 'free-content', 'child-development', 'montessori', 'parenting']
  },
  {
    id: 'educational-books',
    name: 'Educational Books & Publications', 
    description: 'Comprehensive books on child development, education, and parenting available through Regarded publishing.',
    category: GAVIN_MCCORMACK_SERVICE_CATEGORIES.BOOKS_RESOURCES,
    duration: 0,
    price: {
      amount: 25,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'newborn', 'infant', 'toddler', 'preschool', 'child', 'adolescent', 'adult'],
    tags: ['books', 'education', 'child-development', 'parenting-guidance']
  },
  {
    id: 'free-educational-resources',
    name: 'Free Educational Resources',
    description: 'Downloadable PDFs, guides, and resources covering various aspects of child development and education, available at no cost.',
    category: GAVIN_MCCORMACK_SERVICE_CATEGORIES.BOOKS_RESOURCES,
    duration: 0,
    price: {
      amount: 0,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'newborn', 'infant', 'toddler', 'preschool', 'child', 'adolescent', 'adult'],
    tags: ['free-resources', 'PDF-guides', 'education-tips', 'parenting']
  },
  {
    id: 'keynote-speaking',
    name: 'Keynote Speaking Services',
    description: 'Inspiring keynote presentations on education, child development, and unlocking potential in children for conferences and events.',
    category: GAVIN_MCCORMACK_SERVICE_CATEGORIES.SPEAKING_CONSULTATION,
    duration: 90,
    price: {
      amount: 2500,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['keynote-speaking', 'education-consultation', 'professional-development', 'conferences']
  }
];

// Gavin McCormack - Educator & Author
export const GAVIN_MCCORMACK: ServiceProvider = {
  id: 'gavin-mccormack',
  firstName: 'Gavin',
  lastName: 'McCormack',
  title: 'Educator, Author & Child Development Specialist',
  profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=1200&h=400&fit=crop',
  bio: 'Gavin is a passionate educator and author with over 25 years of teaching experience worldwide. Named one of the Most Influential Educators for 2022, he specializes in Montessori education, child development, and progressive teaching methods. Through his blog, books, and educational resources, he empowers parents and teachers to unlock the potential in every child.',
  personalStory: 'Having worked as a teacher and principal for more than 25 years in countries throughout the world, including building schools in the Himalayan regions, Gavin discovered his passion for progressive education and child development. He believes that education should be engaging, child-centered, and focused on developing the whole child.',
  credentials: [
    {
      title: 'Bachelor of Education',
      abbreviation: 'BEd',
      issuingBody: 'Australian University',
      verified: true
    },
    {
      title: 'Master of Education (Montessori)',
      abbreviation: 'MEd',
      issuingBody: 'Montessori Education Institute',
      verified: true
    },
    {
      title: 'Principal Qualification',
      abbreviation: 'PQ',
      issuingBody: 'Australian Institute for Teaching and School Leadership',
      verified: true
    }
  ],
  services: GAVIN_MCCORMACK_SERVICES,
  specializations: [
    'Montessori Education',
    'Child Development',
    'Progressive Teaching Methods',
    'Educational Leadership',
    'Parent Education',
    'Classroom Management',
    'Student Engagement',
    'Educational Content Creation'
  ],
  languages: ['English'],
  yearsExperience: 25,
  approach: 'I believe that education should be child-centered, engaging, and focused on developing the whole child. My approach combines Montessori principles with modern progressive teaching methods, emphasizing the importance of creating safe, nurturing environments where children can discover their potential. Every child is unique and deserves an education that honors their individual learning style and pace.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 2500, // Keynote speaking fee
    followUpFee: 0,
    currency: 'AUD'
  }
};

// Gavin McCormack Educational Services (Online Platform)
export const GAVIN_MCCORMACK_CENTER: ServiceCenter = {
  id: 'gavin-mccormack-education',
  name: 'Gavin McCormack Educational Services',
  description: 'Progressive education resources and content delivered through digital platforms, books, and speaking engagements. Empowering parents and teachers to unlock the potential in every child.',
  overview: 'Gavin McCormack Educational Services is a comprehensive platform focused on delivering high-quality educational content through blog posts, published books, free resources, and inspiring keynote presentations. Our mission is to make progressive education and child development knowledge accessible to parents and teachers worldwide.',
  mission: 'To empower parents and teachers with evidence-based knowledge and practical tools that support child development and progressive education.',
  location: {
    address: 'Digital Platform',
    suburb: 'Online',
    state: 'Australia',
    postcode: '0000',
    country: 'Australia',
    coordinates: {
      lat: -25.2744,
      lng: 133.7751
    }
  },
  contact: {
    email: 'regarded.com.au@gmail.com',
    website: 'https://gavinmccormack.com.au',
    bookingUrl: 'https://gavinmccormack.com.au/book-gavin-as-your-next-keynote-speaker',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/gavinmccormack'
      },
      {
        platform: 'Facebook', 
        url: 'https://www.facebook.com/booksbygavinmccormack'
      },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/gavinmccormack'
      }
    ]
  },
  providers: [GAVIN_MCCORMACK],
  services: GAVIN_MCCORMACK_SERVICES,
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '15:00' },
    saturday: { closed: true },
    sunday: { closed: true }
  },
  features: [
    'Educational Blog Content',
    'Published Books & Resources',
    'Free Educational Downloads',
    'Keynote Speaking Services',
    'Progressive Education Focus',
    'Montessori Method Expertise',
    'Child Development Guidance',
    'Teacher Professional Development'
  ],
  certifications: [
    'Australian Institute for Teaching and School Leadership',
    'Montessori Education Institute Certified',
    'Named Most Influential Educator 2022'
  ],
  insurance: ['Professional Indemnity Insurance'],
  accessibility: [
    'Online Platform Access',
    'Mobile-Friendly Website',
    'Downloadable Resources',
    'Multiple Language Support Options'
  ],
  images: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
  ],
  establishedYear: 2010,
  culturalConsiderations: 'Gavin McCormack Educational Services welcomes educators and families from all cultural backgrounds and provides educational content that respects diverse learning approaches and cultural perspectives. Resources and content can be adapted to incorporate various cultural values and educational traditions.'
};

// Export for easy import
export const GAVIN_MCCORMACK_PROVIDERS: ServiceProvider[] = [
  GAVIN_MCCORMACK
];
