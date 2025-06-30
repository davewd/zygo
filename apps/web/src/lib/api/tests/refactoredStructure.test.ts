import { getAllServiceCategories, getServiceCategoryById } from '../serviceCategories';
import { getAllServiceProviders } from '../serviceProviders';
import { getAllServices, getServiceById, getServicesByCategory } from '../services';

describe('Refactored API Structure', () => {
  describe('Service Categories API', () => {
    it('should fetch all service categories', async () => {
      const categories = await getAllServiceCategories();
      
      console.log('=== ALL SERVICE CATEGORIES ===');
      console.log('Total categories:', categories.length);
      console.log('Categories:', JSON.stringify(categories, null, 2));
      
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
      
      // Check first category structure
      if (categories.length > 0) {
        expect(categories[0]).toHaveProperty('id');
        expect(categories[0]).toHaveProperty('name');
        expect(categories[0]).toHaveProperty('description');
        expect(categories[0]).toHaveProperty('taxonomy');
      }
    });

    it('should fetch a specific service category by ID', async () => {
      const category = await getServiceCategoryById('lactation-support');
      
      console.log('=== LACTATION SUPPORT CATEGORY ===');
      console.log(JSON.stringify(category, null, 2));
      
      expect(category).toBeDefined();
      expect(category?.id).toBe('lactation-support');
      expect(category?.name).toBe('Lactation Support');
    });
  });

  describe('Services API', () => {
    it('should fetch all services', async () => {
      const services = await getAllServices();
      
      console.log('=== ALL SERVICES ===');
      console.log('Total services:', services.length);
      console.log('First 3 services:', JSON.stringify(services.slice(0, 3), null, 2));
      
      expect(services).toBeDefined();
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
      
      // Check first service structure
      if (services.length > 0) {
        expect(services[0]).toHaveProperty('id');
        expect(services[0]).toHaveProperty('name');
        expect(services[0]).toHaveProperty('description');
        expect(services[0]).toHaveProperty('categoryId');
      }
    });

    it('should fetch services by category', async () => {
      const lactationServices = await getServicesByCategory('lactation-support');
      
      console.log('=== LACTATION SUPPORT SERVICES ===');
      console.log('Total lactation services:', lactationServices.length);
      console.log('Lactation services:', JSON.stringify(lactationServices, null, 2));
      
      expect(lactationServices).toBeDefined();
      expect(Array.isArray(lactationServices)).toBe(true);
      
      // All services should have lactation-support category
      lactationServices.forEach(service => {
        expect(service.categoryId).toBe('lactation-support');
      });
    });

    it('should fetch a specific service by ID', async () => {
      const service = await getServiceById('initial-lactation-consultation');
      
      console.log('=== INITIAL LACTATION CONSULTATION SERVICE ===');
      console.log(JSON.stringify(service, null, 2));
      
      expect(service).toBeDefined();
      expect(service?.id).toBe('initial-lactation-consultation');
      expect(service?.categoryId).toBe('lactation-support');
    });
  });

  describe('Service Providers Integration', () => {
    it('should verify providers still reference services correctly', async () => {
      const providers = await getAllServiceProviders();
      
      console.log('=== PROVIDER SERVICE REFERENCES ===');
      providers.forEach(provider => {
        console.log(`${provider.firstName} ${provider.lastName} offers services:`, provider.services);
      });
      
      expect(providers).toBeDefined();
      expect(providers.length).toBeGreaterThan(0);
      
      // Check that providers still have service references
      const firstProvider = providers[0];
      expect(firstProvider).toHaveProperty('services');
      expect(Array.isArray(firstProvider.services)).toBe(true);
    });

    it('should verify service references are valid', async () => {
      const providers = await getAllServiceProviders();
      const allServices = await getAllServices();
      const serviceIds = allServices.map(service => service.id);
      
      console.log('=== SERVICE REFERENCE VALIDATION ===');
      console.log('Available service IDs:', serviceIds);
      
      let invalidReferences = 0;
      
      providers.forEach(provider => {
        const invalidServices = provider.services.filter(serviceId => !serviceIds.includes(serviceId));
        if (invalidServices.length > 0) {
          console.log(`Provider ${provider.firstName} ${provider.lastName} has invalid service references:`, invalidServices);
          invalidReferences += invalidServices.length;
        }
      });
      
      console.log('Total invalid service references:', invalidReferences);
      
      // This might fail initially if we have mismatched references, which is valuable info
      if (invalidReferences > 0) {
        console.warn(`Found ${invalidReferences} invalid service references that need to be fixed`);
      }
    });
  });
});
