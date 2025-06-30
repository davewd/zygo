/**
 * Service Centers API
 * Provides access to service center data
 */

import type { ServiceCenter } from '@zygo/types';
import serviceCentersData from './data/serviceCenters.json';

// Mock delay for API simulation
const API_DELAY = 300;

export interface ServiceCentersResponse {
  serviceCenters: ServiceCenter[];
  total: number;
}

export interface ServiceCenterFilters {
  features?: string[];
  location?: string;
  services?: string[];
  certifications?: string[];
}

/**
 * Get all service centers
 */
export async function getAllServiceCenters(
  filters?: ServiceCenterFilters
): Promise<ServiceCentersResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let centers = serviceCentersData.serviceCenters as ServiceCenter[];
  
  // Apply filters if provided
  if (filters) {
    if (filters.location) {
      centers = centers.filter(center => 
        center.location.suburb.toLowerCase().includes(filters.location!.toLowerCase()) ||
        center.location.state.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.services && filters.services.length > 0) {
      centers = centers.filter(center =>
        center.services?.some(service =>
          filters.services!.some(filterService =>
            service.name.toLowerCase().includes(filterService.toLowerCase())
          )
        )
      );
    }
    
    if (filters.features && filters.features.length > 0) {
      centers = centers.filter(center =>
        center.features?.some(feature =>
          filters.features!.some(filterFeature =>
            feature.toLowerCase().includes(filterFeature.toLowerCase())
          )
        )
      );
    }
    
    if (filters.certifications && filters.certifications.length > 0) {
      centers = centers.filter(center =>
        center.certifications?.some(cert =>
          filters.certifications!.some(filterCert =>
            cert.toLowerCase().includes(filterCert.toLowerCase())
          )
        )
      );
    }
  }
  
  return {
    serviceCenters: centers,
    total: centers.length
  };
}

/**
 * Get service center by ID
 */
export async function getServiceCenterById(id: string): Promise<ServiceCenter | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const center = serviceCentersData.serviceCenters.find(
    center => center.id === id
  ) as ServiceCenter | undefined;
  
  return center || null;
}

/**
 * Get service centers by feature
 */
export async function getServiceCentersByFeature(feature: string): Promise<ServiceCenter[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  return serviceCentersData.serviceCenters.filter(
    center => center.features?.includes(feature)
  ) as ServiceCenter[];
}

/**
 * Search service centers
 */
export async function searchServiceCenters(
  query: string,
  filters?: ServiceCenterFilters
): Promise<ServiceCentersResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let centers = serviceCentersData.serviceCenters as ServiceCenter[];
  
  // Apply text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    centers = centers.filter(center =>
      center.name.toLowerCase().includes(searchTerm) ||
      center.description.toLowerCase().includes(searchTerm) ||
      center.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      center.services?.some(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
      )
    );
  }
  
  // Apply additional filters
  if (filters) {
    if (filters.location) {
      centers = centers.filter(center => 
        center.location.suburb.toLowerCase().includes(filters.location!.toLowerCase()) ||
        center.location.state.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
  }
  
  return {
    serviceCenters: centers,
    total: centers.length
  };
}

/**
 * Get service centers with pagination
 */
export async function getServiceCentersPaginated(
  page: number = 1,
  limit: number = 10,
  filters?: ServiceCenterFilters
): Promise<ServiceCentersResponse & { page: number; totalPages: number }> {
  // Get all centers first
  const allCenters = await getAllServiceCenters(filters);
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCenters = allCenters.serviceCenters.slice(startIndex, endIndex);
  
  return {
    serviceCenters: paginatedCenters,
    total: allCenters.total,
    page,
    totalPages: Math.ceil(allCenters.total / limit)
  };
}

// Export commonly used service center features
export const SERVICE_CENTER_FEATURES = {
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  RECREATION: 'recreation',
  WELLNESS: 'wellness',
  THERAPY: 'therapy'
} as const;

export type ServiceCenterFeature = typeof SERVICE_CENTER_FEATURES[keyof typeof SERVICE_CENTER_FEATURES];
