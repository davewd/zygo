import type { CredentialDefinition, CredentialProvider } from '@zygo/types';

// Major credential providers used in the Zygo app ecosystem

export const CREDENTIAL_PROVIDERS: CredentialProvider[] = [
  // Australian Health Practitioner Regulation Agency
  {
    id: 'ahpra',
    name: 'Australian Health Practitioner Regulation Agency',
    abbreviation: 'AHPRA',
    description: 'The national regulator for health practitioners in Australia, responsible for registration and standards.',
    type: 'government',
    country: 'Australia',
    website: 'https://www.ahpra.gov.au',
    contactInfo: {
      email: 'info@ahpra.gov.au',
      phone: '1300 419 495'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: true,
      verificationUrl: 'https://www.ahpra.gov.au/registration/registers-of-practitioners.aspx'
    },
    isActive: true,
    establishedYear: 2010,
    credentialsIssued: ['rn-registration', 'rm-registration', 'medical-registration']
  },

  // International Board of Lactation Consultant Examiners
  {
    id: 'iblce',
    name: 'International Board of Lactation Consultant Examiners',
    abbreviation: 'IBLCE',
    description: 'The international certification body for lactation consultants worldwide.',
    type: 'certification-body',
    country: 'International',
    website: 'https://iblce.org',
    contactInfo: {
      email: 'iblce@iblce.org'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false,
      verificationUrl: 'https://iblce.org/verify-an-ibclc/'
    },
    isActive: true,
    establishedYear: 1985,
    credentialsIssued: ['ibclc-certification']
  },

  // Royal Australian and New Zealand College of Obstetricians and Gynaecologists
  {
    id: 'ranzcog',
    name: 'Royal Australian and New Zealand College of Obstetricians and Gynaecologists',
    abbreviation: 'RANZCOG',
    description: 'The peak medical college for obstetrics and gynaecology in Australia and New Zealand.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://ranzcog.edu.au',
    contactInfo: {
      email: 'ranzcog@ranzcog.edu.au',
      phone: '+61 3 9417 1699'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1929,
    credentialsIssued: ['franzcog-fellowship']
  },

  // University of Sydney
  {
    id: 'usyd',
    name: 'University of Sydney',
    abbreviation: 'USYD',
    description: 'Australia\'s first university and a leading institution for medical and health education.',
    type: 'university',
    country: 'Australia',
    website: 'https://sydney.edu.au',
    contactInfo: {
      email: 'info@sydney.edu.au',
      phone: '+61 2 9351 2222'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1850,
    credentialsIssued: ['usyd-bpsych', 'usyd-mhi', 'usyd-mbbs']
  },

  // University of New South Wales
  {
    id: 'unsw',
    name: 'University of New South Wales',
    abbreviation: 'UNSW',
    description: 'Leading Australian university with strong programs in medicine, engineering, and business.',
    type: 'university',
    country: 'Australia',
    website: 'https://unsw.edu.au',
    contactInfo: {
      email: 'info@unsw.edu.au',
      phone: '+61 2 9385 1000'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1949,
    credentialsIssued: ['unsw-bcs', 'unsw-mrepmed']
  },

  // University of Technology Sydney
  {
    id: 'uts',
    name: 'University of Technology Sydney',
    abbreviation: 'UTS',
    description: 'Modern Australian university known for innovation and practical education.',
    type: 'university',
    country: 'Australia',
    website: 'https://uts.edu.au',
    contactInfo: {
      email: 'info@uts.edu.au',
      phone: '+61 2 9514 2000'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1988,
    credentialsIssued: ['uts-gradcert', 'uts-midwifery-masters', 'uts-bhsc-midwifery']
  },

  // University of Melbourne
  {
    id: 'unimelb',
    name: 'University of Melbourne',
    abbreviation: 'UniMelb',
    description: 'One of Australia\'s leading universities with strong programs in medicine and health sciences.',
    type: 'university',
    country: 'Australia',
    website: 'https://unimelb.edu.au',
    contactInfo: {
      email: 'info@unimelb.edu.au',
      phone: '+61 3 9035 5511'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1853,
    credentialsIssued: ['unimelb-mbbs', 'unimelb-mdh']
  },

  // Tennis Australia
  {
    id: 'tennis-australia',
    name: 'Tennis Australia',
    abbreviation: 'TA',
    description: 'The governing body for tennis in Australia, providing coaching certifications and programs.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://tennis.com.au',
    contactInfo: {
      email: 'info@tennis.com.au',
      phone: '+61 3 9914 4000'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1904,
    credentialsIssued: ['ta-coaching-cert', 'ta-hotshots-cert']
  },

  // Football Australia
  {
    id: 'football-australia',
    name: 'Football Australia',
    abbreviation: 'FA',
    description: 'The governing body for football (soccer) in Australia, providing coaching and officiating certifications.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://footballaustralia.com.au',
    contactInfo: {
      email: 'info@footballaustralia.com.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1961,
    credentialsIssued: ['fa-coaching-cert', 'fa-grassroots-cert']
  },

  // Gymnastics Australia
  {
    id: 'gymnastics-australia',
    name: 'Gymnastics Australia',
    abbreviation: 'GA',
    description: 'The national governing body for gymnastics in Australia.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://gymnastics.org.au',
    contactInfo: {
      email: 'info@gymnastics.org.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1949,
    credentialsIssued: ['ga-coaching-cert-l1', 'ga-coaching-cert-l2']
  },

  // Swimming Australia
  {
    id: 'swimming-australia',
    name: 'Swimming Australia',
    abbreviation: 'SA',
    description: 'The national governing body for swimming in Australia.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://swimming.org.au',
    contactInfo: {
      email: 'info@swimming.org.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1909,
    credentialsIssued: ['sa-coaching-cert', 'sa-teacher-cert']
  },

  // Calmbirth Australia
  {
    id: 'calmbirth-australia',
    name: 'Calmbirth® Australia',
    abbreviation: 'Calmbirth',
    description: 'Provider of Australia\'s leading childbirth education program.',
    type: 'training-organization',
    country: 'Australia',
    website: 'https://calmbirth.com.au',
    contactInfo: {
      email: 'info@calmbirth.com.au',
      phone: '+61 2 4871 1806'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 2004,
    credentialsIssued: ['calmbirth-educator-cert', 'calmbirth-director-cert']
  },

  // Dietitians Australia
  {
    id: 'dietitians-australia',
    name: 'Dietitians Australia',
    abbreviation: 'DA',
    description: 'The national professional association for dietitians in Australia.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://dietitiansaustralia.org.au',
    contactInfo: {
      email: 'info@dietitiansaustralia.org.au',
      phone: '+61 2 6163 1271'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1976,
    credentialsIssued: ['da-apd-accreditation', 'da-specialist-cert']
  },

  // Australian Red Cross
  {
    id: 'australian-red-cross',
    name: 'Australian Red Cross',
    abbreviation: 'ARC',
    description: 'Provider of first aid and emergency response training in Australia.',
    type: 'training-organization',
    country: 'Australia',
    website: 'https://redcross.org.au',
    contactInfo: {
      email: 'info@redcross.org.au',
      phone: '1800 733 276'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1914,
    credentialsIssued: ['arc-first-aid', 'arc-cpr-cert']
  },

  // St John Ambulance Australia
  {
    id: 'st-john-ambulance',
    name: 'St John Ambulance Australia',
    abbreviation: 'SJA',
    description: 'Provider of first aid training and emergency medical services.',
    type: 'training-organization',
    country: 'Australia',
    website: 'https://stjohn.org.au',
    contactInfo: {
      email: 'info@stjohn.org.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1883,
    credentialsIssued: ['sja-first-aid', 'sja-cpr-cert']
  },

  // TAFE NSW
  {
    id: 'tafe-nsw',
    name: 'TAFE NSW',
    abbreviation: 'TAFE NSW',
    description: 'Technical and Further Education NSW - Australia\'s largest vocational education and training provider.',
    type: 'training-organization',
    country: 'Australia',
    website: 'https://tafensw.edu.au',
    contactInfo: {
      email: 'info@tafensw.edu.au',
      phone: '131 601'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1974,
    credentialsIssued: ['tafe-cert-iv-sport-rec', 'tafe-early-childhood-cert']
  },

  // NSW Government
  {
    id: 'nsw-government',
    name: 'NSW Government',
    abbreviation: 'NSW Gov',
    description: 'Government of New South Wales - issuer of various government certifications and licenses.',
    type: 'government',
    country: 'Australia',
    website: 'https://nsw.gov.au',
    contactInfo: {
      email: 'info@nsw.gov.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: true
    },
    isActive: true,
    establishedYear: 1901,
    credentialsIssued: ['nsw-wwcc', 'nsw-teaching-cert']
  },

  // Australian Government
  {
    id: 'australian-government',
    name: 'Australian Government',
    abbreviation: 'AU Gov',
    description: 'Commonwealth Government of Australia - issuer of various federal certifications and licenses.',
    type: 'government',
    country: 'Australia',
    website: 'https://australia.gov.au',
    contactInfo: {
      email: 'info@australia.gov.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: true
    },
    isActive: true,
    establishedYear: 1901,
    credentialsIssued: ['medicare-provider']
  },

  // Royal Australasian College of Physicians
  {
    id: 'royal-australasian-college-physicians',
    name: 'Royal Australasian College of Physicians',
    abbreviation: 'RACP',
    description: 'Professional medical college for physicians in Australia and New Zealand.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://racp.edu.au',
    contactInfo: {
      email: 'info@racp.edu.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1938,
    credentialsIssued: ['racp-fellowship']
  },

  // Australian Digital Health Agency
  {
    id: 'australian-digital-health-agency',
    name: 'Australian Digital Health Agency',
    abbreviation: 'ADHA',
    description: 'Government agency responsible for digital health initiatives and certifications.',
    type: 'government',
    country: 'Australia',
    website: 'https://digitalhealth.gov.au',
    contactInfo: {
      email: 'info@digitalhealth.gov.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: true
    },
    isActive: true,
    establishedYear: 2016,
    credentialsIssued: ['adha-digital-health-specialist']
  },

  // Australian Fertility Society
  {
    id: 'australian-fertility-society',
    name: 'Australian Fertility Society',
    abbreviation: 'AFS',
    description: 'Professional society for fertility specialists and reproductive medicine.',
    type: 'professional-body',
    country: 'Australia',
    website: 'https://fertilitysociety.com.au',
    contactInfo: {
      email: 'info@fertilitysociety.com.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1970,
    credentialsIssued: ['afs-specialist-cert']
  },

  // Royal Prince Alfred Hospital
  {
    id: 'royal-prince-alfred-hospital',
    name: 'Royal Prince Alfred Hospital',
    abbreviation: 'RPA',
    description: 'Major teaching hospital in Sydney providing medical training and fellowships.',
    type: 'employer',
    country: 'Australia',
    website: 'https://rpa.health.nsw.gov.au',
    contactInfo: {
      email: 'info@rpa.health.nsw.gov.au'
    },
    verificationMethods: {
      online: false,
      manual: true,
      api: false
    },
    isActive: true,
    establishedYear: 1882,
    credentialsIssued: ['rpa-fellowship']
  },

  // NSW Health
  {
    id: 'nsw-health',
    name: 'NSW Health',
    abbreviation: 'NSW Health',
    description: 'New South Wales state health department providing health professional training.',
    type: 'government',
    country: 'Australia',
    website: 'https://health.nsw.gov.au',
    contactInfo: {
      email: 'info@health.nsw.gov.au'
    },
    verificationMethods: {
      online: true,
      manual: true,
      api: true
    },
    isActive: true,
    establishedYear: 1982,
    credentialsIssued: ['nsw-health-specialist']
  }
];

// Credential definitions for the various credentials that can be issued
export const CREDENTIAL_DEFINITIONS: CredentialDefinition[] = [
  // Nursing and Midwifery
  {
    id: 'rn-registration',
    title: 'Registered Nurse',
    abbreviation: 'RN',
    description: 'Registration as a nurse with AHPRA, enabling practice as a registered nurse in Australia.',
    type: 'registration',
    category: 'nursing',
    issuingProviderId: 'ahpra',
    level: 'basic',
    validityPeriod: {
      years: 1,
      requiresRenewal: true,
      renewalRequirements: ['continuing-professional-development', 'practice-hours']
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['nursing', 'healthcare', 'registered nurse', 'medical'],
    isActive: true
  },

  {
    id: 'rm-registration',
    title: 'Registered Midwife',
    abbreviation: 'RM',
    description: 'Registration as a midwife with AHPRA, enabling practice as a registered midwife in Australia.',
    type: 'registration',
    category: 'nursing',
    issuingProviderId: 'ahpra',
    level: 'advanced',
    prerequisites: ['rn-registration'],
    validityPeriod: {
      years: 1,
      requiresRenewal: true,
      renewalRequirements: ['continuing-professional-development', 'practice-hours']
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['midwifery', 'healthcare', 'birth', 'pregnancy'],
    isActive: true
  },

  // Lactation Support
  {
    id: 'ibclc-certification',
    title: 'International Board Certified Lactation Consultant',
    abbreviation: 'IBCLC',
    description: 'International certification for lactation consultants, the gold standard in lactation care.',
    type: 'certification',
    category: 'allied-health',
    issuingProviderId: 'iblce',
    level: 'expert',
    validityPeriod: {
      years: 5,
      requiresRenewal: true,
      renewalRequirements: ['continuing-education', 'recertification-exam']
    },
    verificationRequired: true,
    recognizedIn: ['International'],
    keywords: ['lactation', 'breastfeeding', 'infant feeding', 'consultation'],
    isActive: true
  },

  // Medical Specialties
  {
    id: 'franzcog-fellowship',
    title: 'Fellowship in Obstetrics and Gynaecology',
    abbreviation: 'FRANZCOG',
    description: 'Fellowship of the Royal Australian and New Zealand College of Obstetricians and Gynaecologists.',
    type: 'fellowship',
    category: 'medical',
    issuingProviderId: 'ranzcog',
    level: 'expert',
    prerequisites: ['medical-registration'],
    verificationRequired: true,
    recognizedIn: ['Australia', 'New Zealand'],
    keywords: ['obstetrics', 'gynaecology', 'women\'s health', 'specialist'],
    isActive: true
  },

  // University Degrees
  {
    id: 'usyd-bpsych',
    title: 'Bachelor of Psychology',
    abbreviation: 'BPsych',
    description: 'Undergraduate degree in psychology from the University of Sydney.',
    type: 'degree',
    category: 'mental-health',
    issuingProviderId: 'usyd',
    level: 'basic',
    verificationRequired: true,
    recognizedIn: ['Australia', 'International'],
    keywords: ['psychology', 'mental health', 'behaviour'],
    isActive: true
  },

  {
    id: 'usyd-mhi',
    title: 'Master of Health Informatics',
    abbreviation: 'MHI',
    description: 'Postgraduate degree in health informatics from the University of Sydney.',
    type: 'degree',
    category: 'technology',
    issuingProviderId: 'usyd',
    level: 'advanced',
    prerequisites: ['bachelor-degree'],
    verificationRequired: true,
    recognizedIn: ['Australia', 'International'],
    keywords: ['health informatics', 'digital health', 'technology'],
    isActive: true
  },

  {
    id: 'usyd-mbbs',
    title: 'Bachelor of Medicine, Bachelor of Surgery',
    abbreviation: 'MBBS',
    description: 'Medical degree from The University of Sydney.',
    type: 'degree',
    category: 'medical',
    issuingProviderId: 'usyd',
    level: 'advanced',
    verificationRequired: true,
    recognizedIn: ['Australia', 'International'],
    keywords: ['medicine', 'doctor', 'medical degree', 'MBBS'],
    isActive: true
  },

  // Sports and Fitness
  {
    id: 'ta-coaching-cert',
    title: 'Tennis Australia Coaching Certification',
    abbreviation: 'TA Coach',
    description: 'Professional tennis coaching certification from Tennis Australia.',
    type: 'certification',
    category: 'fitness',
    issuingProviderId: 'tennis-australia',
    level: 'intermediate',
    validityPeriod: {
      years: 2,
      requiresRenewal: true,
      renewalRequirements: ['continuing-education', 'practice-hours']
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['tennis', 'coaching', 'sports', 'fitness'],
    isActive: true
  },

  {
    id: 'fa-grassroots-cert',
    title: 'Football Australia Grassroots Certificate',
    abbreviation: 'FA Grassroots',
    description: 'Entry-level football coaching certification for grassroots programs.',
    type: 'certification',
    category: 'fitness',
    issuingProviderId: 'football-australia',
    level: 'basic',
    validityPeriod: {
      years: 3,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['football', 'soccer', 'coaching', 'grassroots'],
    isActive: true
  },

  // Childbirth Education
  {
    id: 'calmbirth-educator-cert',
    title: 'Certified Calmbirth® Educator',
    abbreviation: 'CCE',
    description: 'Certification to teach the Calmbirth childbirth education program.',
    type: 'certification',
    category: 'education',
    issuingProviderId: 'calmbirth-australia',
    level: 'intermediate',
    validityPeriod: {
      years: 2,
      requiresRenewal: true,
      renewalRequirements: ['continuing-education', 'practice-requirements']
    },
    verificationRequired: true,
    recognizedIn: ['Australia', 'New Zealand', 'France'],
    keywords: ['childbirth', 'education', 'calmbirth', 'antenatal'],
    isActive: true
  },

  // Nutrition
  {
    id: 'da-apd-accreditation',
    title: 'Accredited Practicing Dietitian',
    abbreviation: 'APD',
    description: 'Professional accreditation for practicing dietitians in Australia.',
    type: 'certification',
    category: 'nutrition',
    issuingProviderId: 'dietitians-australia',
    level: 'advanced',
    prerequisites: ['nutrition-degree'],
    validityPeriod: {
      years: 1,
      requiresRenewal: true,
      renewalRequirements: ['continuing-professional-development']
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['nutrition', 'dietitian', 'food', 'health'],
    isActive: true
  },

  // First Aid and Safety
  {
    id: 'arc-first-aid',
    title: 'First Aid Certificate',
    abbreviation: 'First Aid',
    description: 'Basic first aid certification from Australian Red Cross.',
    type: 'certification',
    category: 'safety',
    issuingProviderId: 'australian-red-cross',
    level: 'basic',
    validityPeriod: {
      years: 3,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['first aid', 'emergency', 'safety', 'cpr'],
    isActive: true
  },

  {
    id: 'arc-cpr-cert',
    title: 'CPR Certificate',
    abbreviation: 'CPR',
    description: 'Cardiopulmonary resuscitation certification from Australian Red Cross.',
    type: 'certification',
    category: 'safety',
    issuingProviderId: 'australian-red-cross',
    level: 'basic',
    validityPeriod: {
      years: 1,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['cpr', 'emergency', 'safety', 'resuscitation'],
    isActive: true
  },

  // Working with Children Check
  {
    id: 'nsw-wwcc',
    title: 'Working with Children Check',
    abbreviation: 'WWCC',
    description: 'NSW Government background check for people working with children.',
    type: 'license',
    category: 'regulatory',
    issuingProviderId: 'nsw-government',
    level: 'basic',
    validityPeriod: {
      years: 5,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['children', 'background check', 'safety', 'regulatory'],
    isActive: true
  },

  // Certificate IV in Sport and Recreation
  {
    id: 'tafe-cert-iv-sport-rec',
    title: 'Certificate IV in Sport and Recreation',
    abbreviation: 'Cert IV',
    description: 'TAFE NSW qualification in sport and recreation management.',
    type: 'qualification',
    category: 'fitness',
    issuingProviderId: 'tafe-nsw',
    level: 'intermediate',
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['sport', 'recreation', 'fitness', 'management'],
    isActive: true
  },

  // Digital Health and Technology
  {
    id: 'adha-digital-health-specialist',
    title: 'Certified Digital Health Specialist',
    abbreviation: 'CDHS',
    description: 'Digital health specialist certification from Australian Digital Health Agency.',
    type: 'certification',
    category: 'technology',
    issuingProviderId: 'australian-digital-health-agency',
    level: 'advanced',
    validityPeriod: {
      years: 2,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['digital health', 'technology', 'healthcare'],
    isActive: true
  },

  // Medicare Provider
  {
    id: 'medicare-provider',
    title: 'Medicare Provider',
    abbreviation: 'Medicare',
    description: 'Australian Government Medicare provider registration.',
    type: 'registration',
    category: 'regulatory',
    issuingProviderId: 'australian-government',
    level: 'basic',
    validityPeriod: {
      years: 1,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['medicare', 'provider', 'government', 'healthcare'],
    isActive: true
  },

  // Fertility Specialist
  {
    id: 'afs-specialist-cert',
    title: 'Fertility Specialist Certification',
    abbreviation: 'Fertility Spec',
    description: 'Fertility specialist certification from Australian Fertility Society.',
    type: 'certification',
    category: 'medical',
    issuingProviderId: 'australian-fertility-society',
    level: 'expert',
    prerequisites: ['medical-registration'],
    validityPeriod: {
      years: 3,
      requiresRenewal: true
    },
    verificationRequired: true,
    recognizedIn: ['Australia'],
    keywords: ['fertility', 'reproductive', 'specialist', 'medicine'],
    isActive: true
  }
];

// Helper functions for working with credentials
export const getCredentialProvider = (id: string): CredentialProvider | undefined => {
  return CREDENTIAL_PROVIDERS.find(provider => provider.id === id);
};

export const getCredentialDefinition = (id: string): CredentialDefinition | undefined => {
  return CREDENTIAL_DEFINITIONS.find(definition => definition.id === id);
};

export const getCredentialsByProvider = (providerId: string): CredentialDefinition[] => {
  return CREDENTIAL_DEFINITIONS.filter(credential => credential.issuingProviderId === providerId);
};

export const getCredentialsByCategory = (category: string): CredentialDefinition[] => {
  return CREDENTIAL_DEFINITIONS.filter(credential => credential.category === category);
};

export const searchCredentials = (query: string): CredentialDefinition[] => {
  const lowercaseQuery = query.toLowerCase();
  return CREDENTIAL_DEFINITIONS.filter(credential => 
    credential.title.toLowerCase().includes(lowercaseQuery) ||
    credential.abbreviation?.toLowerCase().includes(lowercaseQuery) ||
    credential.description.toLowerCase().includes(lowercaseQuery) ||
    credential.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};
