// Credential Providers API
// Functions for managing credential providers and their definitions

import type {
  CredentialCategory,
  CredentialDefinition,
  CredentialProvider
} from '@zygo/types';
import supabase from '../../clients/supabaseClient';
import { CredentialAPIError, CredentialAPIResponse } from './credentials';

// =====================================
// CREDENTIAL PROVIDER OPERATIONS
// =====================================

/**
 * Create a new credential provider
 */
export async function createCredentialProvider(
  provider: Omit<CredentialProvider, 'id'>
): Promise<CredentialAPIResponse<CredentialProvider>> {
  try {
    const providerData = mapCredentialProviderToDatabase(provider);

    const { data, error } = await supabase
      .from('credential_providers')
      .insert([providerData])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create credential provider', 400, error);
    }

    return {
      data: mapDatabaseToCredentialProvider(data),
      success: true,
    };
  } catch (error) {
    console.error('Error creating credential provider:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to create provider',
      success: false,
    };
  }
}

/**
 * Update a credential provider
 */
export async function updateCredentialProvider(
  providerId: string,
  updates: Partial<CredentialProvider>
): Promise<CredentialAPIResponse<CredentialProvider>> {
  try {
    const updateData = mapCredentialProviderToDatabase(updates);

    const { data, error } = await supabase
      .from('credential_providers')
      .update(updateData)
      .eq('id', providerId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update credential provider', 400, error);
    }

    return {
      data: mapDatabaseToCredentialProvider(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating credential provider:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update provider',
      success: false,
    };
  }
}

/**
 * Get credential provider by ID
 */
export async function getCredentialProviderById(
  providerId: string
): Promise<CredentialAPIResponse<CredentialProvider>> {
  try {
    const { data, error } = await supabase
      .from('credential_providers')
      .select('*')
      .eq('id', providerId)
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to fetch credential provider', 404, error);
    }

    return {
      data: mapDatabaseToCredentialProvider(data),
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential provider:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch provider',
      success: false,
    };
  }
}

/**
 * Search credential providers by name or description
 */
export async function searchCredentialProviders(
  searchTerm: string,
  filters?: {
    type?: string[];
    country?: string;
    isActive?: boolean;
  }
): Promise<CredentialAPIResponse<CredentialProvider[]>> {
  try {
    let query = supabase
      .from('credential_providers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

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

    const { data, error } = await query
      .order('name')
      .limit(50);

    if (error) {
      throw new CredentialAPIError('Failed to search credential providers', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialProvider) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error searching credential providers:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to search providers',
      success: false,
    };
  }
}

// =====================================
// CREDENTIAL DEFINITION OPERATIONS
// =====================================

/**
 * Create a new credential definition
 */
export async function createCredentialDefinition(
  definition: Omit<CredentialDefinition, 'id'>
): Promise<CredentialAPIResponse<CredentialDefinition>> {
  try {
    const definitionData = mapCredentialDefinitionToDatabase(definition);

    const { data, error } = await supabase
      .from('credential_definitions')
      .insert([definitionData])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create credential definition', 400, error);
    }

    return {
      data: mapDatabaseToCredentialDefinition(data),
      success: true,
    };
  } catch (error) {
    console.error('Error creating credential definition:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to create definition',
      success: false,
    };
  }
}

/**
 * Update a credential definition
 */
export async function updateCredentialDefinition(
  definitionId: string,
  updates: Partial<CredentialDefinition>
): Promise<CredentialAPIResponse<CredentialDefinition>> {
  try {
    const updateData = mapCredentialDefinitionToDatabase(updates);

    const { data, error } = await supabase
      .from('credential_definitions')
      .update(updateData)
      .eq('id', definitionId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update credential definition', 400, error);
    }

    return {
      data: mapDatabaseToCredentialDefinition(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating credential definition:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update definition',
      success: false,
    };
  }
}

/**
 * Get credential definition by ID
 */
export async function getCredentialDefinitionById(
  definitionId: string
): Promise<CredentialAPIResponse<CredentialDefinition>> {
  try {
    const { data, error } = await supabase
      .from('credential_definitions')
      .select('*')
      .eq('id', definitionId)
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to fetch credential definition', 404, error);
    }

    return {
      data: mapDatabaseToCredentialDefinition(data),
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential definition:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch definition',
      success: false,
    };
  }
}

/**
 * Get credential definitions by provider
 */
export async function getCredentialDefinitionsByProvider(
  providerId: string
): Promise<CredentialAPIResponse<CredentialDefinition[]>> {
  try {
    const { data, error } = await supabase
      .from('credential_definitions')
      .select('*')
      .eq('issuing_provider_id', providerId)
      .eq('is_active', true)
      .order('title');

    if (error) {
      throw new CredentialAPIError('Failed to fetch provider credentials', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialDefinition) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching provider credentials:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch provider credentials',
      success: false,
    };
  }
}

/**
 * Get credential definitions by category
 */
export async function getCredentialDefinitionsByCategory(
  category: CredentialCategory
): Promise<CredentialAPIResponse<CredentialDefinition[]>> {
  try {
    const { data, error } = await supabase
      .from('credential_definitions')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('title');

    if (error) {
      throw new CredentialAPIError('Failed to fetch credentials by category', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialDefinition) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credentials by category:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch credentials by category',
      success: false,
    };
  }
}

// =====================================
// BULK OPERATIONS
// =====================================

/**
 * Bulk import credential definitions
 */
export async function bulkImportCredentialDefinitions(
  definitions: Omit<CredentialDefinition, 'id'>[]
): Promise<CredentialAPIResponse<CredentialDefinition[]>> {
  try {
    const definitionData = definitions.map(mapCredentialDefinitionToDatabase);

    const { data, error } = await supabase
      .from('credential_definitions')
      .insert(definitionData)
      .select();

    if (error) {
      throw new CredentialAPIError('Failed to bulk import credential definitions', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialDefinition) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error bulk importing credential definitions:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to bulk import definitions',
      success: false,
    };
  }
}

/**
 * Bulk import credential providers
 */
export async function bulkImportCredentialProviders(
  providers: Omit<CredentialProvider, 'id'>[]
): Promise<CredentialAPIResponse<CredentialProvider[]>> {
  try {
    const providerData = providers.map(mapCredentialProviderToDatabase);

    const { data, error } = await supabase
      .from('credential_providers')
      .insert(providerData)
      .select();

    if (error) {
      throw new CredentialAPIError('Failed to bulk import credential providers', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToCredentialProvider) || [];

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error bulk importing credential providers:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to bulk import providers',
      success: false,
    };
  }
}

// =====================================
// ANALYTICS AND REPORTING
// =====================================

/**
 * Get credential statistics by category
 */
export async function getCredentialStatsByCategory(): Promise<CredentialAPIResponse<Record<CredentialCategory, number>>> {
  try {
    const { data, error } = await supabase
      .from('personal_credentials')
      .select(`
        credential_definitions!inner (category)
      `);

    if (error) {
      throw new CredentialAPIError('Failed to fetch credential statistics', 400, error);
    }

    const stats: Record<CredentialCategory, number> = {} as Record<CredentialCategory, number>;
    
    data?.forEach(item => {
      const category = item.credential_definitions.category as CredentialCategory;
      stats[category] = (stats[category] || 0) + 1;
    });

    return {
      data: stats,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching credential statistics:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch statistics',
      success: false,
    };
  }
}

/**
 * Get most popular credentials
 */
export async function getMostPopularCredentials(
  limit: number = 10
): Promise<CredentialAPIResponse<Array<{ definition: CredentialDefinition; count: number }>>> {
  try {
    const { data, error } = await supabase
      .from('personal_credentials')
      .select(`
        credential_definition_id,
        credential_definitions (*)
      `)
      .not('credential_definitions', 'is', null);

    if (error) {
      throw new CredentialAPIError('Failed to fetch popular credentials', 400, error);
    }

    // Count occurrences
    const counts: Record<string, { definition: any; count: number }> = {};
    
    data?.forEach(item => {
      const defId = item.credential_definition_id;
      if (counts[defId]) {
        counts[defId].count++;
      } else {
        counts[defId] = {
          definition: item.credential_definitions,
          count: 1,
        };
      }
    });

    // Sort by count and limit
    const sorted = Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map(item => ({
        definition: mapDatabaseToCredentialDefinition(item.definition),
        count: item.count,
      }));

    return {
      data: sorted,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching popular credentials:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch popular credentials',
      success: false,
    };
  }
}

// =====================================
// UTILITY MAPPERS
// =====================================

/**
 * Map CredentialProvider to database format
 */
function mapCredentialProviderToDatabase(provider: Partial<CredentialProvider>): any {
  return {
    name: provider.name,
    abbreviation: provider.abbreviation,
    description: provider.description,
    type: provider.type,
    country: provider.country,
    website: provider.website,
    logo: provider.logo,
    contact_info: provider.contactInfo,
    accreditation: provider.accreditation,
    verification_methods: provider.verificationMethods,
    is_active: provider.isActive,
    established_year: provider.establishedYear,
    credentials_issued: provider.credentialsIssued,
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
 * Map CredentialDefinition to database format
 */
function mapCredentialDefinitionToDatabase(definition: Partial<CredentialDefinition>): any {
  return {
    title: definition.title,
    abbreviation: definition.abbreviation,
    description: definition.description,
    type: definition.type,
    category: definition.category,
    issuing_provider_id: definition.issuingProviderId,
    level: definition.level,
    prerequisites: definition.prerequisites,
    validity_period: definition.validityPeriod,
    verification_required: definition.verificationRequired,
    recognized_in: definition.recognizedIn,
    equivalent_credentials: definition.equivalentCredentials,
    keywords: definition.keywords,
    is_active: definition.isActive,
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
