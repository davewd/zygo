// Service Categories API functions
import serviceCategoriesData from './data/serviceCategories.json';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  taxonomy: 'healthcare' | 'education' | 'support' | 'therapy' | 'wellness' | 'emergency' | 'activities' | 'recreation';
}

export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  return serviceCategoriesData.serviceCategories as ServiceCategory[];
}

export async function getServiceCategoryById(id: string): Promise<ServiceCategory | undefined> {
  return serviceCategoriesData.serviceCategories.find(category => category.id === id) as ServiceCategory | undefined;
}

export async function getServiceCategoriesByTaxonomy(taxonomy: ServiceCategory['taxonomy']): Promise<ServiceCategory[]> {
  return serviceCategoriesData.serviceCategories.filter(category => category.taxonomy === taxonomy) as ServiceCategory[];
}
