// Credential Management Hooks
// React hooks for interacting with the credential API

import type {
  CredentialCategory,
  CredentialDefinition,
  CredentialProvider,
  CredentialSearchFilters,
  CredentialSearchResult,
  CredentialSummary,
  CredentialType,
  CredentialVerificationRequest,
  PersonalCredential
} from '@zygo/types';
import { useCallback, useEffect, useState } from 'react';
import {
  getCredentialDefinitions,
  getCredentialDefinitionsByProvider,
  getCredentialProviders,
  getMostPopularCredentials,
  searchCredentialDefinitions
} from '../lib/api/credentialProviders';
import {
  createPersonalCredential,
  deletePersonalCredential,
  getCredentialSummary,
  getPersonalCredentialById,
  getPersonalCredentials,
  requestCredentialVerification,
  updatePersonalCredential
} from '../lib/api/credentials';
import {
  completeManualVerification,
  getVerificationRequests,
  getVerificationStatistics,
  initiateAutomatedVerification,
} from '../lib/api/credentialVerification';

// ==========================================
// PERSONAL CREDENTIALS HOOKS
// ==========================================

/**
 * Hook for managing personal credentials
 */
export function usePersonalCredentials(
  holderId: string,
  filters?: CredentialSearchFilters,
  options?: { page?: number; limit?: number }
) {
  const [credentials, setCredentials] = useState<CredentialSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  });

  const fetchCredentials = useCallback(async () => {
    if (!holderId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getPersonalCredentials(
        holderId,
        filters,
        options?.page || 1,
        options?.limit || 20
      );

      if (response.success && response.data) {
        setCredentials(response.data);
        setPagination(response.pagination);
      } else {
        setError(response.error || 'Failed to fetch credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [holderId, filters, options?.page, options?.limit]);

  const addCredential = useCallback(async (
    credentialData: Omit<PersonalCredential, 'id' | 'createdDate' | 'updatedDate'>
  ) => {
    try {
      const response = await createPersonalCredential(credentialData);
      if (response.success) {
        await fetchCredentials(); // Refresh the list
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create credential');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add credential');
      throw err;
    }
  }, [fetchCredentials]);

  const updateCredential = useCallback(async (
    credentialId: string,
    updates: Partial<PersonalCredential>
  ) => {
    try {
      const response = await updatePersonalCredential(credentialId, updates);
      if (response.success) {
        await fetchCredentials(); // Refresh the list
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update credential');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update credential');
      throw err;
    }
  }, [fetchCredentials]);

  const removeCredential = useCallback(async (credentialId: string) => {
    try {
      const response = await deletePersonalCredential(credentialId);
      if (response.success) {
        await fetchCredentials(); // Refresh the list
      } else {
        throw new Error(response.error || 'Failed to delete credential');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete credential');
      throw err;
    }
  }, [fetchCredentials]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  return {
    credentials,
    loading,
    error,
    pagination,
    refetch: fetchCredentials,
    addCredential,
    updateCredential,
    removeCredential,
  };
}

/**
 * Hook for getting a single credential with details
 */
export function useCredentialDetail(credentialId: string | null) {
  const [credential, setCredential] = useState<CredentialSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredential = useCallback(async () => {
    if (!credentialId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getPersonalCredentialById(credentialId);
      if (response.success && response.data) {
        setCredential(response.data);
      } else {
        setError(response.error || 'Failed to fetch credential');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [credentialId]);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  return {
    credential,
    loading,
    error,
    refetch: fetchCredential,
  };
}

/**
 * Hook for credential summary statistics
 */
export function useCredentialSummary(holderId: string) {
  const [summary, setSummary] = useState<CredentialSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!holderId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getCredentialSummary(holderId);
      if (response.success && response.data) {
        setSummary(response.data);
      } else {
        setError(response.error || 'Failed to fetch summary');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [holderId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
  };
}

// ==========================================
// CREDENTIAL DEFINITIONS HOOKS
// ==========================================

/**
 * Hook for credential definitions
 */
export function useCredentialDefinitions(
  filters?: {
    category?: CredentialCategory[];
    type?: CredentialType[];
    issuingProviderId?: string[];
    isActive?: boolean;
  }
) {
  const [definitions, setDefinitions] = useState<CredentialDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDefinitions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCredentialDefinitions(filters);
      if (response.success && response.data) {
        setDefinitions(response.data);
      } else {
        setError(response.error || 'Failed to fetch definitions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDefinitions();
  }, [fetchDefinitions]);

  return {
    definitions,
    loading,
    error,
    refetch: fetchDefinitions,
  };
}

/**
 * Hook for searching credential definitions
 */
export function useCredentialSearch() {
  const [results, setResults] = useState<CredentialDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (
    searchTerm: string,
    filters?: {
      category?: CredentialCategory[];
      type?: CredentialType[];
    }
  ) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchCredentialDefinitions(searchTerm, filters);
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setError(response.error || 'Search failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  };
}

// ==========================================
// CREDENTIAL PROVIDERS HOOKS
// ==========================================

/**
 * Hook for credential providers
 */
export function useCredentialProviders(
  filters?: {
    type?: string[];
    country?: string;
    isActive?: boolean;
  }
) {
  const [providers, setProviders] = useState<CredentialProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCredentialProviders(filters);
      if (response.success && response.data) {
        setProviders(response.data);
      } else {
        setError(response.error || 'Failed to fetch providers');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return {
    providers,
    loading,
    error,
    refetch: fetchProviders,
  };
}

/**
 * Hook for credentials by provider
 */
export function useCredentialsByProvider(providerId: string | null) {
  const [credentials, setCredentials] = useState<CredentialDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredentials = useCallback(async () => {
    if (!providerId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getCredentialDefinitionsByProvider(providerId);
      if (response.success && response.data) {
        setCredentials(response.data);
      } else {
        setError(response.error || 'Failed to fetch credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  return {
    credentials,
    loading,
    error,
    refetch: fetchCredentials,
  };
}

// ==========================================
// VERIFICATION HOOKS
// ==========================================

/**
 * Hook for credential verification
 */
export function useCredentialVerification(userId: string) {
  const [requests, setRequests] = useState<CredentialVerificationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getVerificationRequests(userId);
      if (response.success && response.data) {
        setRequests(response.data);
      } else {
        setError(response.error || 'Failed to fetch verification requests');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const requestVerification = useCallback(async (
    credentialId: string,
    method: 'automated' | 'manual' | 'third-party' = 'automated'
  ) => {
    try {
      let response;
      if (method === 'automated') {
        response = await initiateAutomatedVerification(credentialId, userId);
      } else {
        response = await requestCredentialVerification(credentialId, userId, method);
      }

      if (response.success) {
        await fetchRequests(); // Refresh the list
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to request verification');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request verification');
      throw err;
    }
  }, [userId, fetchRequests]);

  const completeVerification = useCallback(async (
    requestId: string,
    verified: boolean,
    notes?: string
  ) => {
    try {
      const response = await completeManualVerification(
        requestId,
        verified,
        userId,
        notes
      );

      if (response.success) {
        await fetchRequests(); // Refresh the list
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to complete verification');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete verification');
      throw err;
    }
  }, [userId, fetchRequests]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    requestVerification,
    completeVerification,
  };
}

/**
 * Hook for verification statistics (admin)
 */
export function useVerificationStatistics(
  timeRange?: { start: string; end: string }
) {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getVerificationStatistics(timeRange);
      if (response.success && response.data) {
        setStatistics(response.data);
      } else {
        setError(response.error || 'Failed to fetch statistics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
  };
}

// ==========================================
// POPULAR CREDENTIALS HOOK
// ==========================================

/**
 * Hook for popular credentials
 */
export function usePopularCredentials(limit: number = 10) {
  const [credentials, setCredentials] = useState<Array<{ definition: CredentialDefinition; count: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularCredentials = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMostPopularCredentials(limit);
      if (response.success && response.data) {
        setCredentials(response.data);
      } else {
        setError(response.error || 'Failed to fetch popular credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPopularCredentials();
  }, [fetchPopularCredentials]);

  return {
    credentials,
    loading,
    error,
    refetch: fetchPopularCredentials,
  };
}
