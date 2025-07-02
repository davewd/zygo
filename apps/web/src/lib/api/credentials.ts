// Credential Management API
// Functions for managing personal credentials, credential definitions, and providers

import type {
  CredentialCategory,
  CredentialDefinition,
  CredentialDisplayInfo,
  CredentialProvider,
  CredentialSearchFilters,
  CredentialSearchResult,
  CredentialSummary,
  CredentialType,
  CredentialVerificationRequest,
  PersonalCredential,
  VerificationStatus
} from '@zygo/types/src/credentials';
import supabase from '../../clients/supabaseClient';

// Import JSON data for mock/fallback
import { CREDENTIAL_PROVIDERS as newCredentialProviders } from '../../data/credentials/credentialProviders_new';
import credentialsData from './data/credentials.json';

// Legacy compatibility exports
export const CREDENTIAL_PROVIDERS = newCredentialProviders; // Use the typed data instead of JSON
export const CREDENTIAL_DEFINITIONS = credentialsData.credentialDefinitions;

// Mock delay for fallback mode
const mockDelay = (ms: number = 100): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Fallback function to get credential definition by title
export async function getCredentialDefinition(title: string): Promise<any> {
  await mockDelay();
  
  const definition = credentialsData.credentialDefinitions.find(d => 
    d.title.toLowerCase() === title.toLowerCase() ||
    d.abbreviation.toLowerCase() === title.toLowerCase()
  );
  
  return definition || null;
}

// Error types
export class CredentialAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'CredentialAPIError';
  }
}

// API Response types
export interface CredentialAPIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedCredentialResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  error?: string;
  success: boolean;
}

// =====================================
// PERSONAL CREDENTIALS CRUD OPERATIONS
// =====================================

/**
 * Create a new personal credential
 */
export async function createPersonalCredential(
  credential: Omit<PersonalCredential, 'id' | 'createdDate' | 'updatedDate'>
): Promise<CredentialAPIResponse<PersonalCredential>> {
  try {
    const now = new Date().toISOString();
    const credentialData = {
      ...credential,
      created_date: now,
      updated_date: now,
    };

    const { data, error } = await supabase
      .from('personal_credentials')
      .insert([credentialData])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create personal credential', 400, error);
    }

    return {
      data: mapDatabaseToPersonalCredential(data),
      success: true,
    };
  } catch (error) {
    console.error('Error creating personal credential:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to create credential',
      success: false,
    };
  }
}

/**
 * Get personal credentials for a specific holder
 */
export async function getPersonalCredentials(
  holderId: string,
  filters?: CredentialSearchFilters,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedCredentialResponse<CredentialSearchResult>> {
  try {
    let query = supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (*),
        credential_providers (*)
      `)
      .eq('holder_id', holderId);

    // Apply filters
    if (filters) {
      if (filters.verificationStatus?.length) {
        query = query.in('verification_status', filters.verificationStatus);
      }
      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }
      if (filters.isExpiredOrExpiring) {
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        query = query.lt('expiry_date', sixMonthsFromNow.toISOString());
      }
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (*),
        credential_providers (*)
      `, { count: 'exact' })
      .eq('holder_id', holderId);

    if (error) {
      throw new CredentialAPIError('Failed to fetch personal credentials', 400, error);
    }

    const mappedData = data?.map(item => ({
      credential: mapDatabaseToPersonalCredential(item),
      definition: mapDatabaseToCredentialDefinition(item.credential_definitions),
      provider: mapDatabaseToCredentialProvider(item.credential_providers),
    })) || [];

    return {
      data: mappedData,
      pagination: {
        page,
        limit,
        total: count || 0,
        hasMore: (count || 0) > page * limit,
      },
      success: true,
    };
  } catch (error) {
    console.error('Error fetching personal credentials:', error);
    return {
      data: [],
      pagination: { page, limit, total: 0, hasMore: false },
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch credentials',
      success: false,
    };
  }
}

/**
 * Get a single personal credential by ID
 */
export async function getPersonalCredentialById(
  credentialId: string
): Promise<CredentialAPIResponse<CredentialSearchResult>> {
  try {
    const { data, error } = await supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (*),
        credential_providers (*)
      `)
      .eq('id', credentialId)
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to fetch personal credential', 404, error);
    }

    const result = {
      credential: mapDatabaseToPersonalCredential(data),
      definition: mapDatabaseToCredentialDefinition(data.credential_definitions),
      provider: mapDatabaseToCredentialProvider(data.credential_providers),
    };

    return {
      data: result,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching personal credential:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch credential',
      success: false,
    };
  }
}

/**
 * Update a personal credential
 */
export async function updatePersonalCredential(
  credentialId: string,
  updates: Partial<PersonalCredential>
): Promise<CredentialAPIResponse<PersonalCredential>> {
  try {
    const updateData = {
      ...mapPersonalCredentialToDatabase(updates),
      updated_date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('personal_credentials')
      .update(updateData)
      .eq('id', credentialId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update personal credential', 400, error);
    }

    return {
      data: mapDatabaseToPersonalCredential(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating personal credential:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update credential',
      success: false,
    };
  }
}

/**
 * Delete a personal credential
 */
export async function deletePersonalCredential(
  credentialId: string
): Promise<CredentialAPIResponse<void>> {
  try {
    const { error } = await supabase
      .from('personal_credentials')
      .delete()
      .eq('id', credentialId);

    if (error) {
      throw new CredentialAPIError('Failed to delete personal credential', 400, error);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting personal credential:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to delete credential',
      success: false,
    };
  }
}

// ========================================
// CREDENTIAL DEFINITIONS CRUD OPERATIONS
// ========================================

/**
 * Get all credential definitions with optional filtering
 */
export async function getCredentialDefinitions(
  filters?: {
    category?: CredentialCategory[];
    type?: CredentialType[];
    issuingProviderId?: string[];
    isActive?: boolean;
  },
  page: number = 1,
  limit: number = 50
): Promise<PaginatedCredentialResponse<CredentialDefinition>> {
  try {
    let query = supabase
      .from('credential_definitions')
      .select('*');

    // Apply filters
    if (filters) {
      if (filters.category?.length) {
        query = query.in('category', filters.category);
      }
      if (filters.type?.length) {
        query = query.in('type', filters.type);
      }
      if (filters.issuingProviderId?.length) {
        query = query.in('issuing_provider_id', filters.issuingProviderId);
      }
      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }
    }

    // Pagination
    const offset = (page - 1) * limit;
    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('title');

    if (error) {
      throw new CredentialAPIError('Failed to fetch credential definitions', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialDefinition) || [];

    return {
      data: mappedData,
      pagination: {
        page,
        limit,
        total: count || 0,
        hasMore: (count || 0) > page * limit,
      },
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential definitions:', error);
    return {
      data: [],
      pagination: { page, limit, total: 0, hasMore: false },
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch definitions',
      success: false,
    };
  }
}

/**
 * Search credential definitions by keyword
 */
export async function searchCredentialDefinitions(
  searchTerm: string,
  filters?: {
    category?: CredentialCategory[];
    type?: CredentialType[];
  }
): Promise<CredentialAPIResponse<CredentialDefinition[]>> {
  try {
    let query = supabase
      .from('credential_definitions')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,keywords.cs.{${searchTerm}}`)
      .eq('is_active', true);

    // Apply filters
    if (filters) {
      if (filters.category?.length) {
        query = query.in('category', filters.category);
      }
      if (filters.type?.length) {
        query = query.in('type', filters.type);
      }
    }

    const { data, error } = await query
      .order('title')
      .limit(50);

    if (error) {
      throw new CredentialAPIError('Failed to search credential definitions', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialDefinition) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error searching credential definitions:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to search definitions',
      success: false,
    };
  }
}

// ====================================
// CREDENTIAL PROVIDERS CRUD OPERATIONS
// ====================================

/**
 * Get all credential providers
 */
export async function getCredentialProviders(
  filters?: {
    type?: string[];
    country?: string;
    isActive?: boolean;
  }
): Promise<CredentialAPIResponse<CredentialProvider[]>> {
  try {
    let query = supabase
      .from('credential_providers')
      .select('*');

    // Apply filters
    if (filters) {
      if (filters.type?.length) {
        query = query.in('type', filters.type);
      }
      if (filters.country) {
        query = query.eq('country', filters.country);
      }
      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }
    }

    const { data, error } = await query.order('name');

    if (error) {
      // Fallback to JSON data if database query fails
      console.log('Database query failed, using fallback data:', error.message);
      await mockDelay();
      
      let fallbackData = [...CREDENTIAL_PROVIDERS];
      
      // Apply filters to fallback data
      if (filters) {
        if (filters.type?.length) {
          fallbackData = fallbackData.filter(p => filters.type!.includes(p.type));
        }
        if (filters.country) {
          fallbackData = fallbackData.filter(p => p.country === filters.country);
        }
        if (filters.isActive !== undefined) {
          fallbackData = fallbackData.filter(p => p.isActive === filters.isActive);
        }
      }
      
      return {
        data: fallbackData.sort((a, b) => a.name.localeCompare(b.name)),
        success: true,
      };
    }

    const mappedData = data?.map(mapDatabaseToCredentialProvider) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential providers:', error);
    
    // Fallback to JSON data as last resort
    try {
      await mockDelay();
      let fallbackData = [...CREDENTIAL_PROVIDERS];
      
      // Apply filters to fallback data
      if (filters) {
        if (filters.type?.length) {
          fallbackData = fallbackData.filter(p => filters.type!.includes(p.type));
        }
        if (filters.country) {
          fallbackData = fallbackData.filter(p => p.country === filters.country);
        }
        if (filters.isActive !== undefined) {
          fallbackData = fallbackData.filter(p => p.isActive === filters.isActive);
        }
      }
      
      return {
        data: fallbackData.sort((a, b) => a.name.localeCompare(b.name)),
        success: true,
      };
    } catch (fallbackError) {
      return {
        error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch providers',
        success: false,
      };
    }
  }
}

// ==========================================
// CREDENTIAL SUMMARY AND ANALYTICS
// ==========================================

/**
 * Get credential summary for a specific holder
 */
export async function getCredentialSummary(
  holderId: string
): Promise<CredentialAPIResponse<CredentialSummary>> {
  try {
    const { data, error } = await supabase
      .from('personal_credentials')
      .select(`
        *,
        credential_definitions (category, type)
      `)
      .eq('holder_id', holderId);

    if (error) {
      throw new CredentialAPIError('Failed to fetch credential summary', 400, error);
    }

    const credentials = data?.map(item => ({
      ...mapDatabaseToPersonalCredential(item),
      definition: mapDatabaseToCredentialDefinition(item.credential_definitions),
    })) || [];

    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    const summary: CredentialSummary = {
      totalCredentials: credentials.length,
      verifiedCredentials: credentials.filter(c => c.verificationStatus === 'verified').length,
      expiringCredentials: credentials.filter(c => 
        c.expiryDate && new Date(c.expiryDate) < sixMonthsFromNow && new Date(c.expiryDate) > now
      ).length,
      expiredCredentials: credentials.filter(c => 
        c.expiryDate && new Date(c.expiryDate) < now
      ).length,
      byCategory: {} as Record<CredentialCategory, number>,
      byType: {} as Record<CredentialType, number>,
      mostRecentCredential: credentials.sort((a, b) => 
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      )[0],
      highestLevelCredentials: credentials.filter(c => 
        c.definition && c.definition.level === 'expert'
      ),
    };

    // Calculate category and type distributions
    credentials.forEach(credential => {
      if (credential.definition) {
        const category = credential.definition.category;
        const type = credential.definition.type;
        
        summary.byCategory[category] = (summary.byCategory[category] || 0) + 1;
        summary.byType[type] = (summary.byType[type] || 0) + 1;
      }
    });

    return {
      data: summary,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential summary:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch summary',
      success: false,
    };
  }
}

// ==========================================
// VERIFICATION OPERATIONS
// ==========================================

/**
 * Request verification for a personal credential
 */
export async function requestCredentialVerification(
  credentialId: string,
  requestedBy: string,
  verificationMethod: 'automated' | 'manual' | 'third-party' = 'automated'
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const verificationRequest: Omit<CredentialVerificationRequest, 'id'> = {
      personalCredentialId: credentialId,
      requestedBy,
      requestDate: new Date().toISOString(),
      verificationMethod,
      status: 'pending',
      estimatedCompletionDate: getEstimatedCompletionDate(verificationMethod),
    };

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .insert([mapVerificationRequestToDatabase(verificationRequest)])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create verification request', 400, error);
    }

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error requesting credential verification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to request verification',
      success: false,
    };
  }
}

/**
 * Update verification status
 */
export async function updateVerificationStatus(
  credentialId: string,
  status: VerificationStatus,
  verifiedBy?: string,
  notes?: string
): Promise<CredentialAPIResponse<PersonalCredential>> {
  try {
    const updateData = {
      verification_status: status,
      verification_date: status === 'verified' ? new Date().toISOString() : undefined,
      verified_by: verifiedBy,
      updated_date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('personal_credentials')
      .update(updateData)
      .eq('id', credentialId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update verification status', 400, error);
    }

    return {
      data: mapDatabaseToPersonalCredential(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating verification status:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update verification',
      success: false,
    };
  }
}

// ==========================================
// UTILITY FUNCTIONS AND MAPPERS
// ==========================================

/**
 * Map database record to PersonalCredential interface
 */
function mapDatabaseToPersonalCredential(data: any): PersonalCredential {
  return {
    id: data.id,
    credentialDefinitionId: data.credential_definition_id,
    holderId: data.holder_id,
    holderType: data.holder_type,
    issueDate: data.issue_date,
    issuingProviderId: data.issuing_provider_id,
    certificateNumber: data.certificate_number,
    grade: data.grade,
    expiryDate: data.expiry_date,
    verificationStatus: data.verification_status,
    verificationDate: data.verification_date,
    verifiedBy: data.verified_by,
    verificationReference: data.verification_reference,
    attachments: data.attachments,
    notes: data.notes,
    isPublic: data.is_public,
    isForProfessionalUse: data.is_for_professional_use,
    createdDate: data.created_date,
    updatedDate: data.updated_date,
    createdBy: data.created_by,
  };
}

/**
 * Map PersonalCredential to database format
 */
function mapPersonalCredentialToDatabase(credential: Partial<PersonalCredential>): any {
  return {
    credential_definition_id: credential.credentialDefinitionId,
    holder_id: credential.holderId,
    holder_type: credential.holderType,
    issue_date: credential.issueDate,
    issuing_provider_id: credential.issuingProviderId,
    certificate_number: credential.certificateNumber,
    grade: credential.grade,
    expiry_date: credential.expiryDate,
    verification_status: credential.verificationStatus,
    verification_date: credential.verificationDate,
    verified_by: credential.verifiedBy,
    verification_reference: credential.verificationReference,
    attachments: credential.attachments,
    notes: credential.notes,
    is_public: credential.isPublic,
    is_for_professional_use: credential.isForProfessionalUse,
    created_by: credential.createdBy,
  };
}

/**
 * Map database record to CredentialDefinition interface
 */
function mapDatabaseToCredentialDefinition(data: any): CredentialDefinition {
  return {
    id: data.id,
    title: data.title,
    abbreviation: data.abbreviation,
    description: data.description,
    type: data.type,
    category: data.category,
    issuingProviderId: data.issuing_provider_id,
    level: data.level,
    prerequisites: data.prerequisites,
    validityPeriod: data.validity_period,
    verificationRequired: data.verification_required,
    recognizedIn: data.recognized_in,
    equivalentCredentials: data.equivalent_credentials,
    keywords: data.keywords,
    isActive: data.is_active,
  };
}

/**
 * Map database record to CredentialProvider interface
 */
function mapDatabaseToCredentialProvider(data: any): CredentialProvider {
  return {
    id: data.id,
    name: data.name,
    abbreviation: data.abbreviation,
    description: data.description,
    type: data.type,
    country: data.country,
    website: data.website,
    logo: data.logo,
    contactInfo: data.contact_info,
    accreditation: data.accreditation,
    verificationMethods: data.verification_methods,
    isActive: data.is_active,
    establishedYear: data.established_year,
    credentialsIssued: data.credentials_issued,
  };
}

/**
 * Map verification request to database format
 */
function mapVerificationRequestToDatabase(request: Omit<CredentialVerificationRequest, 'id'>): any {
  return {
    personal_credential_id: request.personalCredentialId,
    requested_by: request.requestedBy,
    request_date: request.requestDate,
    verification_method: request.verificationMethod,
    status: request.status,
    result: request.result,
    estimated_completion_date: request.estimatedCompletionDate,
  };
}

/**
 * Map database record to VerificationRequest interface
 */
function mapDatabaseToVerificationRequest(data: any): CredentialVerificationRequest {
  return {
    id: data.id,
    personalCredentialId: data.personal_credential_id,
    requestedBy: data.requested_by,
    requestDate: data.request_date,
    verificationMethod: data.verification_method,
    status: data.status,
    result: data.result,
    estimatedCompletionDate: data.estimated_completion_date,
  };
}

/**
 * Calculate estimated completion date based on verification method
 */
function getEstimatedCompletionDate(method: 'automated' | 'manual' | 'third-party'): string {
  const now = new Date();
  const daysToAdd = method === 'automated' ? 1 : method === 'manual' ? 7 : 14;
  now.setDate(now.getDate() + daysToAdd);
  return now.toISOString();
}

/**
 * Generate credential display information
 */
export function generateCredentialDisplayInfo(
  credential: PersonalCredential,
  definition: CredentialDefinition,
  provider: CredentialProvider
): CredentialDisplayInfo {
  const now = new Date();
  const expiryDate = credential.expiryDate ? new Date(credential.expiryDate) : null;
  const isExpired = expiryDate ? expiryDate < now : false;
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const isExpiringSoon = expiryDate ? expiryDate < sixMonthsFromNow && expiryDate > now : false;

  const displayBadge = getVerificationBadge(credential.verificationStatus);

  return {
    title: definition.title,
    abbreviation: definition.abbreviation,
    issuingProvider: provider.name,
    issueYear: new Date(credential.issueDate).getFullYear(),
    expiryDate: credential.expiryDate,
    verificationStatus: credential.verificationStatus,
    category: definition.category,
    type: definition.type,
    isExpired,
    isExpiringSoon,
    canRenew: Boolean(definition.validityPeriod?.requiresRenewal),
    displayBadge,
  };
}

/**
 * Get verification badge information
 */
function getVerificationBadge(status: VerificationStatus) {
  const badges = {
    verified: { color: 'green', icon: 'check', text: 'Verified' },
    pending: { color: 'yellow', icon: 'clock', text: 'Pending' },
    expired: { color: 'red', icon: 'x', text: 'Expired' },
    invalid: { color: 'red', icon: 'x', text: 'Invalid' },
    'self-reported': { color: 'gray', icon: 'user', text: 'Self-Reported' },
  };

  return badges[status] || badges['self-reported'];
}
