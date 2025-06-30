// Example: How to access Calmbirth data from the generic API
// This file demonstrates how to filter and access Calmbirth-specific data
// using the generic service provider and service center API functions

import {
    getServiceCenterById
} from '../serviceCenters';
import {
    getServiceProviderById,
    searchServiceProviders
} from '../serviceProviders';

// Get all Calmbirth providers
export async function getCalmbirthProviders() {
  return await searchServiceProviders({
    searchTerm: 'calmbirth'
  });
}

// Get specific Calmbirth providers by ID
export async function getPeterJackson() {
  return await getServiceProviderById('peter-jackson-calmbirth');
}

export async function getKarenMcClay() {
  return await getServiceProviderById('karen-mcclay-calmbirth');
}

export async function getSarahThompson() {
  return await getServiceProviderById('sarah-thompson-calmbirth');
}

// Get the Calmbirth center
export async function getCalmbirthCenter() {
  return await getServiceCenterById('calmbirth-australia');
}

// Get providers by center
export async function getCalmbirthCenterProviders() {
  const center = await getCalmbirthCenter();
  if (center?.providers) {
    const providers = [];
    for (const providerId of center.providers) {
      const provider = await getServiceProviderById(providerId);
      if (provider) providers.push(provider);
    }
    return providers;
  }
  return [];
}

// Get Calmbirth services from the center
export async function getCalmbirthServices() {
  const center = await getCalmbirthCenter();
  return center?.services || [];
}

// Filter services by category
export async function getCalmbirthServicesByCategory(categoryId: string) {
  const services = await getCalmbirthServices();
  return services.filter(service => service.category.id === categoryId);
}

// Get childbirth education services
export async function getCalmbirthChildbirthEducationServices() {
  return await getCalmbirthServicesByCategory('childbirth-education');
}

// Get fear release services
export async function getCalmbirthFearReleaseServices() {
  return await getCalmbirthServicesByCategory('fear-release');
}
