// Services API functions
import servicesData from './data/services.json';

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  duration?: number;
  price?: {
    amount: number;
    currency: string;
    rebate?: {
      provider: string;
      amount: number;
    };
  };
  ageGroups?: string[];
  tags?: string[];
}

export async function getAllServices(): Promise<Service[]> {
  return servicesData.services as Service[];
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  return servicesData.services.find(service => service.id === id) as Service | undefined;
}

export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  return servicesData.services.filter(service => service.categoryId === categoryId) as Service[];
}

export async function getServicesByAgeGroup(ageGroup: string): Promise<Service[]> {
  return servicesData.services.filter(service => 
    service.ageGroups?.includes(ageGroup)
  ) as Service[];
}

export async function getServicesByTag(tag: string): Promise<Service[]> {
  return servicesData.services.filter(service => 
    service.tags?.includes(tag)
  ) as Service[];
}

export async function searchServices(query: string): Promise<Service[]> {
  const lowerQuery = query.toLowerCase();
  return servicesData.services.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  ) as Service[];
}
