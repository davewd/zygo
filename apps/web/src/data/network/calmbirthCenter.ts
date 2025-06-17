import type { Service, ServiceCategory, ServiceCenter, ServiceProvider, ServiceNetworkProvider } from '@zygo/types';

// Service Categories
export const CALMBIRTH_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  CHILDBIRTH_EDUCATION: {
    id: 'childbirth-education',
    name: 'Childbirth Education',
    description: 'Comprehensive antenatal education programs for expectant parents',
    taxonomy: 'education'
  },
  ANTENATAL_PREPARATION: {
    id: 'antenatal-preparation',
    name: 'Antenatal Preparation',
    description: 'Psychological and emotional preparation for childbirth',
    taxonomy: 'education'
  },
  FEAR_RELEASE: {
    id: 'fear-release',
    name: 'Fear Release & Relaxation',
    description: 'Guided relaxation and fear release techniques for birth preparation',
    taxonomy: 'therapy'
  },
  EDUCATOR_TRAINING: {
    id: 'educator-training',
    name: 'Educator Training',
    description: 'Professional training for childbirth educators',
    taxonomy: 'education'
  }
};

// Calmbirth Services
export const CALMBIRTH_SERVICES: Service[] = [
  {
    id: 'calmbirth-course',
    name: 'Calmbirth® Childbirth Education Course',
    description: 'Australia\'s most highly acclaimed childbirth education program. A comprehensive 12-hour face-to-face antenatal program that includes psychological and emotional preparation for childbirth. Learn to reframe birth, work with your body, and move past negative emotions through fear release techniques and guided relaxation.',
    category: CALMBIRTH_SERVICE_CATEGORIES.CHILDBIRTH_EDUCATION,
    duration: 720, // 12 hours (typically split over 2 days)
    price: {
      amount: 395,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['childbirth-education', 'antenatal', 'fear-release', 'relaxation', 'couples', 'weekend-intensive', 'mind-body-connection', 'birth-preparation']
  },
  {
    id: 'calmbirth-refresher',
    name: 'Calmbirth® Refresher Course',
    description: 'A condensed refresher course for couples who have previously completed Calmbirth or other childbirth education programs. Perfect for subsequent pregnancies or to reinforce key concepts and techniques.',
    category: CALMBIRTH_SERVICE_CATEGORIES.ANTENATAL_PREPARATION,
    duration: 240, // 4 hours
    price: {
      amount: 195,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['refresher', 'subsequent-pregnancy', 'review', 'condensed-program']
  },
  {
    id: 'private-calmbirth-session',
    name: 'Private Calmbirth® Session',
    description: 'One-on-one or private group Calmbirth education session tailored to your specific needs, concerns, and birth preferences. Perfect for couples wanting personalized attention or those with scheduling constraints.',
    category: CALMBIRTH_SERVICE_CATEGORIES.CHILDBIRTH_EDUCATION,
    duration: 480, // 8 hours (can be split)
    price: {
      amount: 650,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['private-session', 'personalized', 'flexible-scheduling', 'one-on-one', 'customized']
  },
  {
    id: 'birth-partner-workshop',
    name: 'Birth Partner Support Workshop',
    description: 'Specialized workshop focusing on the birth partner\'s role in supporting during labor and birth. Learn practical techniques for providing emotional and physical support throughout the birthing process.',
    category: CALMBIRTH_SERVICE_CATEGORIES.ANTENATAL_PREPARATION,
    duration: 180, // 3 hours
    price: {
      amount: 150,
      currency: 'AUD'
    },
    ageGroups: ['adult'],
    tags: ['birth-partner', 'support-techniques', 'labor-support', 'practical-skills']
  },
  {
    id: 'fear-release-session',
    name: 'Fear Release & Relaxation Session',
    description: 'Focused session on fear release techniques and guided relaxation for birth preparation. Ideal for those experiencing significant birth anxiety or wanting to deepen their relaxation practice.',
    category: CALMBIRTH_SERVICE_CATEGORIES.FEAR_RELEASE,
    duration: 120, // 2 hours
    price: {
      amount: 120,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['fear-release', 'anxiety-support', 'guided-relaxation', 'meditation', 'birth-anxiety']
  },
  {
    id: 'hospital-program',
    name: 'Hospital-Based Calmbirth® Program',
    description: 'Calmbirth program delivered within partner hospitals and birthing centers. Integrated into antenatal care pathways and often available through hospital antenatal education programs.',
    category: CALMBIRTH_SERVICE_CATEGORIES.CHILDBIRTH_EDUCATION,
    duration: 720, // 12 hours
    price: {
      amount: 295,
      currency: 'AUD'
    },
    ageGroups: ['prenatal', 'adult'],
    tags: ['hospital-based', 'integrated-care', 'medical-setting', 'antenatal-program']
  }
];

// Peter Jackson - Founder & Lead Educator
export const PETER_JACKSON: ServiceProvider = {
  id: 'peter-jackson-calmbirth',
  firstName: 'Peter',
  lastName: 'Jackson',
  title: 'Founder & Lead Calmbirth® Educator, Registered Midwife',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop&crop=center',
  bio: 'Peter Jackson is the founder and gifted architect behind the incredible Calmbirth program. A registered midwife for over 40 years with extensive experience in mental health, Peter revolutionized childbirth education in Australia in the late 1990s. He has been internationally recognized for his success in changing and improving childbirth education both in Australia and overseas.',
  personalStory: 'Peter\'s journey began with a passion for mind-body medicine, which he has practiced for over 20 years. His extensive knowledge of the mind and its impact on physical health and wellbeing, combined with his background in therapeutic medicine, means he understands the powerful connection between a woman\'s emotional state and how her body responds in birth. Peter believes that preparation is the precursor to the experience, and developed the Calmbirth Program to assist couples in preparing for birth confidently with evidence-based knowledge and tools.',
  credentials: [
    {
      title: 'Registered Midwife',
      abbreviation: 'RM',
      issuingBody: 'Australian Health Practitioner Regulation Agency',
      verified: true
    },
    {
      title: 'Bachelor of Health Science (Midwifery)',
      abbreviation: 'BHSc',
      issuingBody: 'University of Technology Sydney',
      verified: true
    },
    {
      title: 'Calmbirth® Program Developer',
      abbreviation: 'Founder',
      issuingBody: 'Calmbirth® Australia',
      verified: true
    },
    {
      title: 'Mind-Body Medicine Practitioner',
      abbreviation: 'MBM',
      issuingBody: 'International Association of Mind-Body Medicine',
      verified: true
    },
    {
      title: 'Mental Health Specialist Training',
      abbreviation: 'MH Spec',
      issuingBody: 'NSW Health',
      verified: true
    }
  ],
  services: CALMBIRTH_SERVICES,
  specializations: [
    'Childbirth Education',
    'Fear Release Techniques',
    'Mind-Body Medicine',
    'Antenatal Psychology',
    'Birth Preparation',
    'Educator Training',
    'Midwifery Care',
    'Birth Anxiety Management',
    'Couples Education',
    'Relaxation Techniques'
  ],
  languages: ['English'],
  yearsExperience: 40,
  approach: 'My approach is grounded in the understanding that preparation is the precursor to experience. I believe in empowering couples with evidence-based knowledge and practical tools while addressing the powerful mind-body connection in birth. The Calmbirth program focuses on reframing birth as a natural process, teaching couples to work with their bodies rather than against them, and providing fear release techniques that facilitate emotional healing and confidence building.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 395,
    followUpFee: 195,
    currency: 'AUD'
  }
};

// Karen McClay - Calmbirth Director
export const KAREN_MCCLAY: ServiceProvider = {
  id: 'karen-mcclay-calmbirth',
  firstName: 'Karen',
  lastName: 'McClay',
  title: 'Calmbirth® Director & Senior Educator',
  profileImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop&crop=center',
  bio: 'Karen McClay is the Director of Calmbirth® Australia and a highly experienced childbirth educator. She is passionate about empowering women to birth with confidence and fearlessness, believing strongly that women will birth best when they feel safe, undisturbed, and respected.',
  personalStory: 'Karen\'s dedication to improving birthing outcomes for women and their families goes beyond the physical aspects of birth to include emotional wellbeing. She works tirelessly to change the current birth culture to one that is talked about and experienced more positively, now and for future generations.',
  credentials: [
    {
      title: 'Calmbirth® Director Certification',
      abbreviation: 'Director',
      issuingBody: 'Calmbirth® Australia',
      verified: true
    },
    {
      title: 'Advanced Childbirth Educator',
      abbreviation: 'ACE',
      issuingBody: 'International Childbirth Education Association',
      verified: true
    },
    {
      title: 'Lamaze Certified Childbirth Educator',
      abbreviation: 'LCCE',
      issuingBody: 'Lamaze International',
      verified: true
    }
  ],
  services: CALMBIRTH_SERVICES.filter(service => 
    ['calmbirth-course', 'private-calmbirth-session', 'fear-release-session'].includes(service.id)
  ),
  specializations: [
    'Childbirth Education',
    'Birth Psychology',
    'Fear Release Techniques',
    'Antenatal Education',
    'Cultural Birth Change',
    'Women\'s Empowerment',
    'Birth Confidence Building'
  ],
  languages: ['English'],
  yearsExperience: 15,
  approach: 'I believe that women will birth best when they feel safe, undisturbed, and respected. My goal is to educate and improve birthing outcomes for all women and their families, not just physically but emotionally as well. I strive to be a leader in cultural change by empowering birthing couples to experience birth as a natural part of life with confidence and fearlessness.',
  availability: {
    inPerson: true,
    telehealth: false,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 395,
    followUpFee: 195,
    currency: 'AUD'
  }
};

// Sample Regional Educator - NSW
export const SARAH_THOMPSON_EDUCATOR: ServiceProvider = {
  id: 'sarah-thompson-calmbirth',
  firstName: 'Sarah',
  lastName: 'Thompson',
  title: 'Certified Calmbirth® Educator',
  profileImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=400&fit=crop&crop=face',
  bio: 'Sarah is a certified Calmbirth® educator based in Sydney\'s Northern Beaches. With a background in psychology and a passion for supporting families through their birthing journey, she creates a warm and supportive environment where couples can learn and grow together.',
  personalStory: 'After experiencing the transformative power of Calmbirth during her own pregnancies, Sarah was inspired to become an educator to share this valuable program with other families. She particularly enjoys helping couples overcome birth fears and build confidence for their upcoming birth experience.',
  credentials: [
    {
      title: 'Certified Calmbirth® Educator',
      abbreviation: 'CCE',
      issuingBody: 'Calmbirth® Australia',
      verified: true
    },
    {
      title: 'Bachelor of Psychology',
      abbreviation: 'BPsych',
      issuingBody: 'University of Sydney',
      verified: true
    },
    {
      title: 'First Aid Certificate',
      abbreviation: 'First Aid',
      issuingBody: 'St John Ambulance',
      verified: true
    }
  ],
  services: CALMBIRTH_SERVICES.filter(service => 
    ['calmbirth-course', 'calmbirth-refresher', 'birth-partner-workshop', 'fear-release-session'].includes(service.id)
  ),
  specializations: [
    'Childbirth Education',
    'Birth Psychology',
    'Couples Support',
    'Fear Release',
    'Northern Beaches Programs',
    'Weekend Intensives'
  ],
  languages: ['English'],
  yearsExperience: 8,
  approach: 'I create a safe, non-judgmental space where couples can explore their feelings about birth and learn practical techniques for managing the birthing process. My background in psychology helps me understand the emotional aspects of birth preparation, and I focus on building confidence and reducing anxiety through education and support.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 395,
    followUpFee: 195,
    currency: 'AUD'
  }
};

// Calmbirth® Australia Service Center
export const CALMBIRTH_CENTER: ServiceCenter = {
  id: 'calmbirth-australia',
  name: 'Calmbirth® Australia',
  description: 'Australia\'s most highly acclaimed and trusted childbirth education program. Calmbirth® protects emotional and mental wellbeing before, during, and after birth through evidence-based education and fear release techniques.',
  overview: 'Calmbirth® is a revolutionary 12-hour childbirth education program that focuses on psychological and emotional preparation for birth. With close to 100 registered educators throughout Australia, New Zealand, and France, we have successfully changed the birth culture for thousands of families. Our evidence-based approach combines mind-body medicine with practical birthing techniques to help couples experience birth as a natural, positive part of life.',
  mission: 'To change our current birth culture to one that is talked about and experienced far more positively, now and for future generations. We strive to be leaders in cultural change by empowering and enabling birthing couples to experience birth as a natural part of life with confidence and fearlessness.',
  location: {
    address: 'National Head Office',
    suburb: 'Blue Mountains',
    state: 'NSW',
    postcode: '2780',
    country: 'Australia',
    coordinates: {
      lat: -33.7774,
      lng: 150.3109
    }
  },
  contact: {
    phone: '(02) 4871 1806',
    email: 'info@calmbirth.com.au',
    website: 'https://calmbirth.com.au',
    bookingUrl: 'https://calmbirth.com.au/calmbirth-classes/',
    socialMedia: [
      {
        platform: 'Instagram',
        url: 'https://www.instagram.com/calmbirth_australia/'
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/calmbirth/'
      }
    ]
  },
  providers: [PETER_JACKSON, KAREN_MCCLAY, SARAH_THOMPSON_EDUCATOR],
  services: CALMBIRTH_SERVICES,
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '15:00' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Australia\'s most acclaimed childbirth education program',
    'Close to 100 registered educators across Australia, New Zealand & France',
    'Evidence-based 12-hour face-to-face program',
    'Multiple locations: ACT (1), NSW (43), QLD (13), SA (3), TAS (5), VIC (12), WA (4)',
    'Hospital partnerships with private and public maternity hospitals',
    'Founded by internationally recognized midwife Peter Jackson',
    'Over 50,000 couples trained since inception',
    'Psychological and emotional birth preparation focus',
    'Fear release techniques and guided relaxation',
    'Mind-body medicine approach',
    'Weekend intensive format available',
    'Private and group session options',
    'Hospital-based programs available',
    'Refresher courses for subsequent pregnancies',
    'Birth partner support workshops',
    'Educator training and certification programs',
    'Cultural change advocacy for positive birth experiences',
    'Inclusive approach welcoming all pregnant couples',
    'Gift vouchers available',
    'Podcast and educational resources',
    'International program delivery'
  ],
  certifications: [
    'Internationally Recognized Childbirth Education Program',
    'Australian Health Practitioner Regulation Agency Affiliated',
    'Professional Indemnity Insurance',
    'Continuous Professional Development Accredited'
  ],
  insurance: [
    'Some Private Health Insurance providers offer rebates',
    'Check with your provider for maternity and allied health coverage'
  ],
  accessibility: [
    'Multiple locations across Australia for accessibility',
    'Weekend programs to accommodate working couples',
    'Private sessions available for specific needs',
    'Online resources and podcast available',
    'Hospital-based programs in major cities',
    'Cultural diversity welcomed and respected',
    'LGBTQ+ inclusive approach',
    'Flexible scheduling options'
  ],
  images: [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2004,
  culturalConsiderations: 'Calmbirth® is an inclusive organisation that embraces cultural diversity and accepts all pregnant couples regardless of gender and sexuality. We acknowledge the Traditional Custodians of the land on which we live and teach our Calmbirth program, and pay our respects to their Elders past and present.'
};
