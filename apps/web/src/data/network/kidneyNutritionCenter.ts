import type { Service, ServiceCategory, ServiceCenter, ServiceProvider } from '@zygo/types';

// Service Categories
export const KIDNEY_NUTRITION_SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  KIDNEY_HEALTH: {
    id: 'kidney-health',
    name: 'Kidney Health',
    description: 'Nutrition for kidney disease prevention and management',
    taxonomy: 'healthcare'
  },
  HEART_HEALTH: {
    id: 'heart-health',
    name: 'Heart Health',
    description: 'Cardiovascular nutrition and dietary management',
    taxonomy: 'healthcare'
  },
  KIDNEY_STONES: {
    id: 'kidney-stones',
    name: 'Kidney Stone Prevention',
    description: 'Specialized nutrition for kidney stone prevention',
    taxonomy: 'healthcare'
  },
  DIALYSIS_NUTRITION: {
    id: 'dialysis-nutrition',
    name: 'Dialysis Nutrition',
    description: 'Nutritional support for dialysis patients',
    taxonomy: 'healthcare'
  },
  TRANSPLANT_NUTRITION: {
    id: 'transplant-nutrition',
    name: 'Transplant Nutrition',
    description: 'Nutrition support for kidney transplant recipients',
    taxonomy: 'healthcare'
  }
};

// Services offered
export const KIDNEY_NUTRITION_SERVICES: Service[] = [
  {
    id: 'kidney-disease-nutrition',
    name: 'Kidney Disease Nutrition Consultation',
    description: 'Comprehensive nutrition assessment and dietary planning for individuals with chronic kidney disease, including stages 1-5 CKD management and dietary modifications.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.KIDNEY_HEALTH,
    duration: 60,
    price: {
      amount: 180,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['kidney-disease', 'chronic-kidney-disease', 'dietary-planning', 'nutrition-assessment']
  },
  {
    id: 'kidney-prevention-nutrition',
    name: 'Kidney Disease Prevention',
    description: 'Preventive nutrition strategies to maintain kidney health and reduce risk of kidney disease development through evidence-based dietary approaches.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.KIDNEY_HEALTH,
    duration: 45,
    price: {
      amount: 150,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adult'],
    tags: ['prevention', 'kidney-health', 'lifestyle-medicine', 'dietary-advice']
  },
  {
    id: 'dialysis-nutrition-support',
    name: 'Dialysis Nutrition Support',
    description: 'Specialized nutrition guidance for people receiving hemodialysis or peritoneal dialysis, including meal planning and nutrient management.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.DIALYSIS_NUTRITION,
    duration: 60,
    price: {
      amount: 190,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['dialysis', 'hemodialysis', 'peritoneal-dialysis', 'meal-planning']
  },
  {
    id: 'kidney-transplant-nutrition',
    name: 'Kidney Transplant Nutrition',
    description: 'Pre and post-transplant nutrition support including preparation for transplant surgery and ongoing dietary management for transplant recipients.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.TRANSPLANT_NUTRITION,
    duration: 60,
    price: {
      amount: 190,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['kidney-transplant', 'post-transplant', 'pre-transplant', 'immunosuppression']
  },
  {
    id: 'kidney-stone-prevention',
    name: 'Kidney Stone Prevention Program',
    description: 'Individualized dietary therapy for preventing calcium stones, uric acid stones, and other types of kidney stones based on stone analysis and medical history.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.KIDNEY_STONES,
    duration: 45,
    price: {
      amount: 170,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['kidney-stones', 'stone-prevention', 'calcium-stones', 'uric-acid-stones']
  },
  {
    id: 'heart-kidney-health',
    name: 'Heart & Kidney Health Program',
    description: 'Integrated nutrition approach addressing both cardiovascular and kidney health, managing blood pressure, cholesterol, and kidney function through diet.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.HEART_HEALTH,
    duration: 60,
    price: {
      amount: 180,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 65
      }
    },
    ageGroups: ['adult'],
    tags: ['heart-health', 'cardiovascular', 'blood-pressure', 'cholesterol']
  },
  {
    id: 'follow-up-consultation',
    name: 'Follow-Up Nutrition Consultation',
    description: 'Ongoing nutrition support and dietary adjustments, progress monitoring, and meal plan modifications based on lab results and health changes.',
    category: KIDNEY_NUTRITION_SERVICE_CATEGORIES.KIDNEY_HEALTH,
    duration: 30,
    price: {
      amount: 120,
      currency: 'AUD',
      rebate: {
        provider: 'Medicare',
        amount: 35
      }
    },
    ageGroups: ['adolescent', 'adult'],
    tags: ['follow-up', 'progress-monitoring', 'dietary-adjustments', 'meal-planning']
  }
];

// Jessica Dawson - Renal Dietitian
export const JESSICA_DAWSON_DIETITIAN: ServiceProvider = {
  id: 'jessica-dawson-dietitian',
  firstName: 'Jessica',
  lastName: 'Dawson',
  title: 'PhD, Accredited Practicing Dietitian - Renal Specialist',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  headerBackgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  bio: 'Dr. Jessica Dawson is an Accredited Practicing Dietitian with a PhD in nutrition science and over 10 years of specialized experience in renal nutrition. She works with people to prevent kidney disease and supports those with existing kidney disease, including dialysis patients and kidney transplant recipients.',
  personalStory: 'My passion for renal nutrition began during my early career when I witnessed firsthand how proper nutrition can dramatically improve quality of life for people with kidney disease. Through my PhD research and clinical practice, I\'ve dedicated my career to helping people understand how nutrition can be a powerful tool in managing kidney health.',
  credentials: [
    {
      title: 'Doctor of Philosophy in Nutrition Science',
      abbreviation: 'PhD',
      issuingBody: 'University of Sydney',
      verified: true
    },
    {
      title: 'Accredited Practicing Dietitian',
      abbreviation: 'APD',
      issuingBody: 'Dietitians Australia',
      verified: true
    },
    {
      title: 'Renal Nutrition Specialist',
      abbreviation: 'RNS',
      issuingBody: 'Dietitians Australia',
      verified: true
    },
    {
      title: 'Medicare Provider',
      abbreviation: 'Medicare',
      issuingBody: 'Australian Government',
      verified: true
    }
  ],
  services: KIDNEY_NUTRITION_SERVICES,
  specializations: [
    'Chronic Kidney Disease Management',
    'Kidney Disease Prevention',
    'Dialysis Nutrition Support',
    'Kidney Transplant Nutrition',
    'Kidney Stone Prevention',
    'Heart-Kidney Health',
    'Hypertension Management',
    'Diabetes & Kidney Health',
    'Fluid & Electrolyte Balance',
    'Phosphorus & Potassium Management'
  ],
  languages: ['English'],
  yearsExperience: 12,
  approach: 'I believe nutrition should be practical, sustainable, and tailored to each person\'s lifestyle and cultural preferences. My approach combines evidence-based practice with compassionate support, helping people understand their condition and empowering them to make informed dietary choices that support their kidney health and overall wellbeing.',
  availability: {
    inPerson: true,
    telehealth: true,
    homeVisits: false,
    emergency: false
  },
  pricing: {
    consultationFee: 180,
    followUpFee: 120,
    currency: 'AUD'
  }
};

// Kidney Nutrition Service Center
export const KIDNEY_NUTRITION_CENTER: ServiceCenter = {
  id: 'kidney-nutrition-center',
  name: 'Kidney Nutrition',
  description: 'Specialized renal nutrition services providing expert dietary guidance for kidney health, kidney disease management, and prevention through evidence-based nutrition therapy.',
  overview: 'Kidney Nutrition specializes in renal dietetics, offering comprehensive nutrition services for people with kidney disease, those at risk of kidney disease, and kidney transplant recipients. Our evidence-based approach helps optimize kidney health through personalized nutrition strategies.',
  mission: 'To improve kidney health and quality of life through expert nutrition guidance, helping people prevent kidney disease and effectively manage existing kidney conditions with evidence-based dietary strategies.',
  location: {
    address: 'Via Forum Specialists',
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'Australia',
    coordinates: {
      lat: -33.8688,
      lng: 151.2093
    }
  },
  contact: {
    phone: '02 9188 2325',
    email: 'info@kidneynutrition.com.au',
    website: 'https://kidneynutrition.com.au',
    bookingUrl: 'https://kidneynutrition.com.au/contact',
    socialMedia: []
  },
  providers: [JESSICA_DAWSON_DIETITIAN],
  services: KIDNEY_NUTRITION_SERVICES,
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '16:00' },
    saturday: { closed: true, open: '', close: '' },
    sunday: { closed: true, open: '', close: '' }
  },
  features: [
    'Specialized renal nutrition expertise',
    'PhD-qualified dietitian',
    'Over 10 years renal nutrition experience',
    'Kidney disease prevention programs',
    'Dialysis nutrition support',
    'Kidney transplant nutrition care',
    'Kidney stone prevention therapy',
    'Heart-kidney health integration',
    'Telehealth consultations available',
    'Medicare rebates available',
    'Evidence-based practice',
    'Personalized meal planning',
    'Cultural dietary considerations',
    'Ongoing nutrition support'
  ],
  certifications: [
    'Accredited Practicing Dietitian (APD)',
    'Renal Nutrition Specialist',
    'Medicare Provider',
    'Dietitians Australia Member'
  ],
  insurance: [
    'Medicare',
    'Private Health Insurance (varies by provider)'
  ],
  accessibility: [
    'Telehealth consultations available',
    'Flexible appointment scheduling',
    'Phone consultations',
    'Email support available'
  ],
  images: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  establishedYear: 2015,
  culturalConsiderations: 'Kidney Nutrition recognizes that food is deeply connected to culture and personal preferences. We work with people from all cultural backgrounds to develop nutrition plans that respect dietary traditions while supporting kidney health. Our approach considers cultural foods, cooking methods, and family meal patterns.'
};
