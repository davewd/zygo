import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories for Zygo App
export const ZYGO_APP_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  BREASTFEEDING_APP: {
    id: 'breastfeeding-app',
    name: 'Breastfeeding App Services',
    description: 'Digital breastfeeding support and tracking application',
    taxonomy: 'digital-health'
  },
  DIGITAL_LACTATION: {
    id: 'digital-lactation',
    name: 'Digital Lactation Support',
    description: 'Technology-enabled lactation consultation and support',
    taxonomy: 'digital-health'
  },
  MOBILE_TRACKING: {
    id: 'mobile-tracking',
    name: 'Mobile Health Tracking',
    description: 'Mobile application-based health and feeding tracking',
    taxonomy: 'digital-health'
  },
  VIRTUAL_CONSULTATION: {
    id: 'virtual-consultation',
    name: 'Virtual Consultation Services',
    description: 'Remote consultation through digital platforms',
    taxonomy: 'digital-health'
  }
};

// Services offered by Zygo App
export const ZYGO_APP_SERVICES: Service[] = [
  {
    id: 'breastfeeding-tracking-app',
    name: 'Breastfeeding Tracking & Support App',
    description: 'Comprehensive mobile application for tracking breastfeeding sessions, pump schedules, baby growth, and accessing expert lactation support. Includes personalized recommendations, milestone tracking, and 24/7 support chat.',
    category: ZYGO_APP_SERVICE_CATEGORIES.BREASTFEEDING_APP,
    duration: 0, // Always available
    price: {
      amount: 19.99,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['breastfeeding-tracking', 'digital-support', 'mobile-app', 'lactation-guidance', '24/7-support']
  },
  {
    id: 'virtual-lactation-consultation',
    name: 'Virtual Lactation Consultation',
    description: 'Professional lactation consultation delivered through secure video platform integrated with the Zygo App. Receive expert guidance from certified lactation consultants with session recordings and follow-up care plans.',
    category: ZYGO_APP_SERVICE_CATEGORIES.VIRTUAL_CONSULTATION,
    duration: 60,
    price: {
      amount: 180,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 105.85
      }
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['virtual-consultation', 'lactation-support', 'video-call', 'expert-guidance', 'follow-up-care']
  },
  {
    id: 'digital-feeding-plan',
    name: 'Personalized Digital Feeding Plan',
    description: 'AI-powered personalized feeding plan created based on your baby\'s unique needs, feeding patterns, and growth data. Includes automated reminders, progress tracking, and adaptive recommendations.',
    category: ZYGO_APP_SERVICE_CATEGORIES.DIGITAL_LACTATION,
    duration: 0, // Ongoing service
    price: {
      amount: 49.99,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['personalized-plan', 'AI-powered', 'feeding-schedule', 'automated-reminders', 'progress-tracking']
  },
  {
    id: 'pump-schedule-optimization',
    name: 'Smart Pump Schedule Optimization',
    description: 'Intelligent pumping schedule optimization using machine learning algorithms to maximize milk production. Includes pump tracking, supply analysis, and personalized timing recommendations.',
    category: ZYGO_APP_SERVICE_CATEGORIES.MOBILE_TRACKING,
    duration: 0, // Ongoing service
    price: {
      amount: 29.99,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['pump-optimization', 'machine-learning', 'supply-tracking', 'scheduling', 'production-analysis']
  },
  {
    id: 'emergency-lactation-support',
    name: '24/7 Emergency Lactation Support',
    description: 'Round-the-clock emergency lactation support through the app\'s chat feature. Connect instantly with certified lactation consultants for urgent breastfeeding concerns and crisis intervention.',
    category: ZYGO_APP_SERVICE_CATEGORIES.VIRTUAL_CONSULTATION,
    duration: 30,
    price: {
      amount: 95,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant'],
    tags: ['emergency-support', '24/7-availability', 'crisis-intervention', 'instant-chat', 'urgent-care']
  },
  {
    id: 'milestone-tracking-analytics',
    name: 'Baby Milestone Tracking & Analytics',
    description: 'Comprehensive milestone tracking with detailed analytics and insights. Monitor growth patterns, feeding progress, sleep development, and receive personalized recommendations for optimal baby development.',
    category: ZYGO_APP_SERVICE_CATEGORIES.MOBILE_TRACKING,
    duration: 0, // Ongoing service
    price: {
      amount: 15.99,
      currency: 'AUD'
    },
    ageGroups: ['newborn', 'infant', 'toddler'],
    tags: ['milestone-tracking', 'analytics', 'growth-monitoring', 'development-insights', 'progress-reports']
  }
];

// Zygo App Lead Lactation Specialist
export const SARAH_DIGITAL_SPECIALIST: ServiceProvider = {
  id: 'sarah-digital-specialist',
  firstName: 'Sarah',
  lastName: 'Chen',
  title: 'Lead Digital Lactation Specialist & App Developer',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Sarah is a certified International Board Certified Lactation Consultant (IBCLC) and technology innovator who pioneered digital lactation support through the Zygo App platform. With a background in both healthcare and software development, she combines clinical expertise with cutting-edge technology to revolutionize breastfeeding support.',
  personalStory: 'After struggling with breastfeeding my own twins and feeling isolated despite having access to traditional support, I realized that modern families need accessible, technology-enabled care that fits their digital lifestyle. The Zygo App was born from my passion to make expert lactation support available anytime, anywhere, through the devices we already use every day.',
  credentials: [
    {
      title: 'International Board Certified Lactation Consultant',
      abbreviation: 'IBCLC',
      issuingBody: 'International Board of Lactation Consultant Examiners',
      verified: true
    },
    {
      title: 'Master of Health Informatics',
      abbreviation: 'MHI',
      issuingBody: 'University of Sydney',
      verified: true
    },
    {
      title: 'Bachelor of Computer Science',
      abbreviation: 'BCS',
      issuingBody: 'University of New South Wales',
      verified: true
    },
    {
      title: 'Certified Digital Health Specialist',
      abbreviation: 'CDHS',
      issuingBody: 'Australian Digital Health Agency',
      verified: true
    },
    {
      title: 'Registered Nurse',
      abbreviation: 'RN',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    }
  ],
  services: ZYGO_APP_SERVICES,
  specializations: [
    'Digital Lactation Support',
    'Breastfeeding Technology Solutions',
    'Virtual Consultation Delivery',
    'Mobile Health Applications',
    'AI-Powered Feeding Analytics',
    'Emergency Remote Support',
    'Digital Health Innovation',
    'Technology-Enabled Care',
    'Data-Driven Lactation Insights',
    'Remote Patient Monitoring'
  ],
  languages: ['English', 'Mandarin', 'Cantonese'],
  yearsExperience: 12,
  approach: 'I believe in leveraging technology to make expert lactation support more accessible, personalized, and responsive to modern family needs. My approach combines evidence-based lactation science with innovative digital health solutions, ensuring that every family has access to high-quality support regardless of location, time, or circumstances.',
  availability: {
    inPerson: false,
    telehealth: true,
    homeVisits: false,
    emergency: true
  },
  pricing: {
    consultationFee: 180,
    followUpFee: 120,
    currency: 'AUD'
  }
};

// Dr. Alexandra Thompson - Chief Medical Officer
export const DR_ALEXANDRA_THOMPSON: ServiceProvider = {
  id: 'dr-alexandra-thompson',
  firstName: 'Dr. Alexandra',
  lastName: 'Thompson',
  title: 'Chief Medical Officer & Pediatric Specialist',
  profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  bio: 'Dr. Alexandra Thompson is a pediatrician and digital health expert who oversees the medical aspects of the Zygo App platform. She ensures all digital health recommendations meet the highest clinical standards while pioneering innovative approaches to remote infant care.',
  personalStory: 'Having worked in neonatal intensive care for over a decade, I witnessed firsthand how technology could bridge gaps in care and support families during their most vulnerable moments. The Zygo App represents the future of pediatric care - where expert medical guidance is always within reach.',
  credentials: [
    {
      title: 'Fellowship in Neonatal-Perinatal Medicine',
      abbreviation: 'FNPM',
      issuingBody: 'Royal Australasian College of Physicians',
      verified: true
    },
    {
      title: 'Bachelor of Medicine, Bachelor of Surgery',
      abbreviation: 'MBBS',
      issuingBody: 'University of Melbourne',
      verified: true
    },
    {
      title: 'Master of Digital Health',
      abbreviation: 'MDH',
      issuingBody: 'University of Sydney',
      verified: true
    },
    {
      title: 'Certificate in Health Innovation',
      abbreviation: 'CHI',
      issuingBody: 'Stanford Medicine 25',
      verified: true
    }
  ],
  services: ZYGO_APP_SERVICES.filter(service => 
    ['virtual-lactation-consultation', 'emergency-lactation-support', 'milestone-tracking-analytics'].includes(service.id)
  ),
  specializations: [
    'Neonatal Medicine',
    'Digital Pediatric Care',
    'Remote Patient Monitoring',
    'Virtual Health Delivery',
    'Infant Development Analytics',
    'Medical App Development',
    'Telehealth Innovation',
    'Evidence-Based Digital Health'
  ],
  languages: ['English', 'French'],
  yearsExperience: 15,
  approach: 'I focus on ensuring that digital health solutions maintain the same clinical rigor and safety standards as traditional in-person care. My approach emphasizes evidence-based medicine delivered through innovative technology platforms that enhance rather than replace the human connection in healthcare.',
  availability: {
    inPerson: false,
    telehealth: true,
    homeVisits: false,
    emergency: true
  },
  pricing: {
    consultationFee: 220,
    followUpFee: 150,
    currency: 'AUD'
  }
};

// Zygo App Service Center
export const ZYGO_APP_CENTER: ServiceCenter = {
  id: 'zygo-app-bondi-beach',
  name: 'Zygo_App',
  description: 'Revolutionary digital breastfeeding support platform combining cutting-edge technology with expert lactation care. Our award-winning mobile application provides 24/7 support, personalized feeding plans, and virtual consultations to modern families.',
  overview: 'Zygo_App is Australia\'s leading digital health platform for breastfeeding support, headquartered in the vibrant beachside community of Bondi Beach. We\'ve revolutionized lactation care by making expert support accessible through innovative mobile technology, AI-powered insights, and virtual consultation capabilities.',
  mission: 'To democratize access to expert lactation support through innovative technology solutions that meet modern families where they are - on their mobile devices, at any time, anywhere.',
  location: {
    address: '45 Hall Street',
    suburb: 'Bondi Beach',
    state: 'NSW',
    postcode: '2026',
    country: 'Australia',
    coordinates: {
      lat: -33.8915,
      lng: 151.2767
    }
  },
  contact: {
    phone: '+61 2 9130 4500',
    email: 'support@zygoapp.com.au',
    website: 'https://zygoapp.com.au',
    bookingUrl: 'https://app.zygoapp.com.au/book-consultation',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/zygoapp_official/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/ZygoAppAU'
      },
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/company/zygo-app'
      },
      {
        platform: 'TikTok',
        url: 'https://www.tiktok.com/@zygoapp'
      }
    ]
  },
  providers: [SARAH_DIGITAL_SPECIALIST, DR_ALEXANDRA_THOMPSON],
  services: ZYGO_APP_SERVICES,
  operatingHours: {
    monday: { open: '24/7', close: '24/7' },
    tuesday: { open: '24/7', close: '24/7' },
    wednesday: { open: '24/7', close: '24/7' },
    thursday: { open: '24/7', close: '24/7' },
    friday: { open: '24/7', close: '24/7' },
    saturday: { open: '24/7', close: '24/7' },
    sunday: { open: '24/7', close: '24/7' }
  },
  features: [
    'Award-winning mobile application with 4.9-star rating',
    '24/7 emergency lactation support chat',
    'AI-powered personalized feeding recommendations',
    'Secure video consultation platform',
    'Real-time milestone tracking and analytics',
    'Integration with wearable devices and smart breast pumps',
    'Multi-language support (English, Mandarin, Arabic, Spanish)',
    'HIPAA-compliant data security and privacy',
    'Offline mode functionality for remote areas',
    'Family sharing features for partner involvement',
    'Postpartum depression screening and support referrals',
    'Evidence-based educational content library',
    'Push notification reminders and encouragement',
    'Export capabilities for healthcare provider visits',
    'Community support forums moderated by experts',
    'Integration with electronic health records',
    'Telehealth prescription capabilities',
    'Machine learning-powered supply optimization'
  ],
  certifications: [
    'TGA (Therapeutic Goods Administration) Approved Medical Device Software',
    'ISO 13485 Medical Device Quality Management',
    'ISO 27001 Information Security Management',
    'ACMA (Australian Communications and Media Authority) Compliant',
    'Australian Privacy Principles Certified',
    'Medicare Telehealth Provider',
    'Digital Health Agency Registered'
  ],
  insurance: [
    'Medicare Telehealth Rebates Available',
    'Private Health Insurance (select providers)',
    'Professional Indemnity Insurance',
    'Cyber Liability Insurance',
    'Product Liability Insurance'
  ],
  accessibility: [
    'WCAG 2.1 AA accessibility compliant',
    'Voice control compatibility',
    'High contrast mode for vision impairment',
    'Screen reader optimization',
    'Multiple language support',
    'Simplified interface for cognitive accessibility',
    'Large text options',
    'One-handed operation design',
    'Offline functionality for low connectivity areas',
    'Integration with assistive technologies'
  ],
  images: [
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2019,
  culturalConsiderations: 'Zygo_App recognizes and celebrates the diverse cultural approaches to infant feeding and family care. Our platform is designed to be culturally sensitive and inclusive, supporting families from all backgrounds with respect for traditional practices while providing evidence-based guidance. We acknowledge the Traditional Custodians of the land on which our Bondi Beach headquarters operates and pay our respects to Elders past and present.'
};

// Awards and Recognition for the platform
export const ZYGO_APP_AWARDS = [
  {
    title: 'Australian Good Design Award - Digital Design Excellence',
    year: 2023,
    issuingBody: 'Good Design Australia'
  },
  {
    title: 'Digital Health Innovation Award',
    year: 2023,
    issuingBody: 'Australian Digital Health Agency'
  },
  {
    title: 'Best Mobile Health App - Maternity Category',
    year: 2022,
    issuingBody: 'Australian Mobile Awards'
  },
  {
    title: 'Excellence in Telehealth Delivery',
    year: 2022,
    issuingBody: 'Royal Australian College of General Practitioners'
  },
  {
    title: 'Innovation in Women\'s Health Technology',
    year: 2021,
    issuingBody: 'Women\'s Health Innovation Australia'
  },
  {
    title: 'Startup of the Year - HealthTech Category',
    year: 2021,
    issuingBody: 'Australian Information Industry Association'
  },
  {
    title: 'People\'s Choice Award - Best Parenting App',
    year: 2020,
    issuingBody: 'Australian App Awards'
  }
];
