import serviceProvidersData from '../data/serviceProviders.json';
import { getAllServiceProviders } from '../serviceProviders';

describe('Service Providers API', () => {
  describe('getAllServiceProviders', () => {
    it('should fetch and console.log all service providers', async () => {
      try {
        const providers = await getAllServiceProviders();
        
        console.log('=== ALL SERVICE PROVIDERS ===');
        console.log('Total providers found:', providers.length);
        console.log('Providers data:', JSON.stringify(providers, null, 2));
        
        // Basic assertions
        expect(providers).toBeDefined();
        expect(Array.isArray(providers)).toBe(true);
        expect(providers.length).toBeGreaterThanOrEqual(0);
        
        // Log individual provider details if any exist
        if (providers.length > 0) {
          console.log('=== FIRST PROVIDER DETAILS ===');
          console.log(providers[0]);
             // Check structure of first provider
        expect(providers[0]).toHaveProperty('id');
        expect(providers[0]).toHaveProperty('firstName');
        expect(providers[0]).toHaveProperty('lastName');
        }
        
      } catch (error) {
        console.error('Error fetching service providers:', error);
        throw error;
      }
    });

    it('should fetch service providers with service centers included', async () => {
      try {
        const providersWithCenters = await getAllServiceProviders(true);
        
        console.log('=== SERVICE PROVIDERS WITH CENTERS ===');
        console.log('Total providers with centers found:', providersWithCenters.length);
        console.log('Providers with centers data:', JSON.stringify(providersWithCenters, null, 2));
        
        expect(providersWithCenters).toBeDefined();
        expect(Array.isArray(providersWithCenters)).toBe(true);
        
      } catch (error) {
        console.error('Error fetching service providers with centers:', error);
        throw error;
      }
    });
  });

  describe('Data Validation', () => {
    it('should validate raw JSON data structure', () => {
      console.log('=== RAW JSON DATA VALIDATION ===');
      console.log('Service providers data structure:', {
        hasServiceProviders: !!serviceProvidersData.serviceProviders,
        isArray: Array.isArray(serviceProvidersData.serviceProviders),
        count: serviceProvidersData.serviceProviders?.length || 0
      });
      
      // Sample first provider structure
      if (serviceProvidersData.serviceProviders?.length > 0) {
        const firstProvider = serviceProvidersData.serviceProviders[0];
        console.log('=== FIRST PROVIDER STRUCTURE ===');
        console.log('Keys:', Object.keys(firstProvider));
        console.log('Sample provider:', JSON.stringify(firstProvider, null, 2));
        
        // Check for missing required fields
        const requiredFields = ['id', 'firstName', 'lastName', 'bio', 'credentials', 'services', 'specializations', 'languages', 'yearsExperience', 'availability'];
        const missingFields = requiredFields.filter(field => !(field in firstProvider));
        
        if (missingFields.length > 0) {
          console.log('❌ Missing required fields in first provider:', missingFields);
        } else {
          console.log('✅ All required fields present in first provider');
        }
      }
      
      expect(serviceProvidersData).toBeDefined();
      expect(serviceProvidersData.serviceProviders).toBeDefined();
      expect(Array.isArray(serviceProvidersData.serviceProviders)).toBe(true);
    });
  });
});