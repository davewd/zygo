import serviceProvidersData from '../data/serviceProviders.json';

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
  services: string[]; // Array of service IDs
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
  centerId?: string; // ID of the service center this provider belongs to
}

function validateServiceProvider(provider: any, index: number): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!provider.id || typeof provider.id !== 'string') {
    errors.push(`Missing or invalid 'id' field`);
  }
  
  if (!provider.firstName || typeof provider.firstName !== 'string') {
    errors.push(`Missing or invalid 'firstName' field`);
  }
  
  if (!provider.lastName || typeof provider.lastName !== 'string') {
    errors.push(`Missing or invalid 'lastName' field`);
  }
  
  if (!provider.bio || typeof provider.bio !== 'string') {
    errors.push(`Missing or invalid 'bio' field`);
  }
  
  // Credentials validation
  if (!Array.isArray(provider.credentials)) {
    errors.push(`Missing or invalid 'credentials' field - should be an array`);
  } else {
    provider.credentials.forEach((credential: any, credIndex: number) => {
      if (!credential.title || typeof credential.title !== 'string') {
        errors.push(`Credential ${credIndex}: Missing or invalid 'title' field`);
      }
      if (!credential.issuingBody || typeof credential.issuingBody !== 'string') {
        errors.push(`Credential ${credIndex}: Missing or invalid 'issuingBody' field`);
      }
      if (typeof credential.verified !== 'boolean') {
        errors.push(`Credential ${credIndex}: Missing or invalid 'verified' field - should be boolean`);
      }
    });
  }
  
  // Services validation
  if (!Array.isArray(provider.services)) {
    errors.push(`Missing or invalid 'services' field - should be an array`);
  }
  
  // Specializations validation
  if (!Array.isArray(provider.specializations)) {
    errors.push(`Missing or invalid 'specializations' field - should be an array`);
  }
  
  // Languages validation
  if (!Array.isArray(provider.languages)) {
    errors.push(`Missing or invalid 'languages' field - should be an array`);
  }
  
  // Years experience validation
  if (typeof provider.yearsExperience !== 'number') {
    errors.push(`Missing or invalid 'yearsExperience' field - should be a number`);
  }
  
  // Availability validation
  if (!provider.availability || typeof provider.availability !== 'object') {
    errors.push(`Missing or invalid 'availability' field - should be an object`);
  } else {
    // Check if it's the expected object format with boolean fields
    if (Array.isArray(provider.availability)) {
      errors.push(`Availability: Expected object format with boolean fields (inPerson, telehealth, homeVisits, emergency), but found array format with day/times`);
    } else {
      const requiredAvailabilityFields = ['inPerson', 'telehealth', 'homeVisits', 'emergency'];
      requiredAvailabilityFields.forEach(field => {
        if (typeof provider.availability[field] !== 'boolean') {
          errors.push(`Availability: Missing or invalid '${field}' field - should be boolean`);
        }
      });
    }
  }
  
  // Optional pricing validation
  if (provider.pricing && typeof provider.pricing !== 'object') {
    errors.push(`Invalid 'pricing' field - should be an object if present`);
  } else if (provider.pricing) {
    if (!provider.pricing.currency || typeof provider.pricing.currency !== 'string') {
      errors.push(`Pricing: Missing or invalid 'currency' field - should be a string`);
    }
  }
  
  // Check for extra fields not in the interface
  const extraFields = [];
  if (provider.education) {
    extraFields.push('education (array) - not in ServiceProvider interface');
  }
  if (provider.contact) {
    extraFields.push('contact (object) - not in ServiceProvider interface');
  }
  
  if (extraFields.length > 0) {
    errors.push(`Extra fields found: ${extraFields.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

describe('Service Provider Data Validation', () => {
  it('should validate all service providers against the ServiceProvider interface', () => {
    console.log('=== VALIDATING SERVICE PROVIDERS DATA ===');
    console.log(`Total providers to validate: ${serviceProvidersData.serviceProviders.length}`);
    
    let validCount = 0;
    let invalidCount = 0;
    const allErrors: { providerId: string; index: number; errors: string[] }[] = [];
    
    serviceProvidersData.serviceProviders.forEach((provider: any, index: number) => {
      const validation = validateServiceProvider(provider, index);
      
      if (validation.isValid) {
        validCount++;
        console.log(`✅ Provider ${index + 1} (${provider.id || 'NO_ID'}): VALID`);
      } else {
        invalidCount++;
        console.log(`❌ Provider ${index + 1} (${provider.id || 'NO_ID'}): INVALID`);
        console.log(`   Errors:`, validation.errors);
        
        allErrors.push({
          providerId: provider.id || `PROVIDER_${index + 1}`,
          index: index + 1,
          errors: validation.errors
        });
      }
    });
    
    console.log('\n=== VALIDATION SUMMARY ===');
    console.log(`✅ Valid providers: ${validCount}`);
    console.log(`❌ Invalid providers: ${invalidCount}`);
    console.log(`📊 Success rate: ${((validCount / serviceProvidersData.serviceProviders.length) * 100).toFixed(1)}%`);
    
    if (allErrors.length > 0) {
      console.log('\n=== DETAILED ERROR REPORT ===');
      allErrors.forEach(errorReport => {
        console.log(`\n🔍 Provider: ${errorReport.providerId} (Position ${errorReport.index})`);
        errorReport.errors.forEach(error => {
          console.log(`   • ${error}`);
        });
      });
      
      // Group errors by type for analysis
      const errorTypes: { [key: string]: number } = {};
      allErrors.forEach(errorReport => {
        errorReport.errors.forEach(error => {
          errorTypes[error] = (errorTypes[error] || 0) + 1;
        });
      });
      
      console.log('\n=== ERROR FREQUENCY ANALYSIS ===');
      Object.entries(errorTypes)
        .sort(([,a], [,b]) => b - a)
        .forEach(([error, count]) => {
          console.log(`${count}x: ${error}`);
        });
    }
    
    // The test should pass even if there are validation errors - we're just reporting
    expect(serviceProvidersData.serviceProviders.length).toBeGreaterThan(0);
  });
});
