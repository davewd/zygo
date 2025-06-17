// Credential Verification API
// Functions for managing credential verification workflows and processes

import type {
  CredentialVerificationRequest,
  VerificationStatus
} from '@zygo/types';
import supabase from '../../clients/supabaseClient';
import { CredentialAPIError, CredentialAPIResponse, PaginatedCredentialResponse } from './credentials';

// =====================================
// VERIFICATION REQUEST OPERATIONS
// =====================================

/**
 * Get verification requests for a user
 */
export async function getVerificationRequests(
  userId: string,
  status?: 'pending' | 'in-progress' | 'completed' | 'failed',
  page: number = 1,
  limit: number = 20
): Promise<PaginatedCredentialResponse<CredentialVerificationRequest>> {
  try {
    let query = supabase
      .from('credential_verification_requests')
      .select('*')
      .eq('requested_by', userId);

    if (status) {
      query = query.eq('status', status);
    }

    // Pagination
    const offset = (page - 1) * limit;
    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('request_date', { ascending: false });

    if (error) {
      throw new CredentialAPIError('Failed to fetch verification requests', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToVerificationRequest) || [];

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
    console.error('Error fetching verification requests:', error);
    return {
      data: [],
      pagination: { page, limit, total: 0, hasMore: false },
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch verification requests',
      success: false,
    };
  }
}

/**
 * Get a specific verification request by ID
 */
export async function getVerificationRequestById(
  requestId: string
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const { data, error } = await supabase
      .from('credential_verification_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to fetch verification request', 404, error);
    }

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error fetching verification request:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch verification request',
      success: false,
    };
  }
}

/**
 * Update verification request status
 */
export async function updateVerificationRequestStatus(
  requestId: string,
  status: 'pending' | 'in-progress' | 'completed' | 'failed',
  result?: {
    verified: boolean;
    verificationDate: string;
    verifiedBy: string;
    notes?: string;
    confidence: 'high' | 'medium' | 'low';
  }
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const updateData: any = {
      status,
      updated_date: new Date().toISOString(),
    };

    if (result) {
      updateData.result = result;
    }

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .update(updateData)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to update verification request', 400, error);
    }

    // If verification is completed, update the personal credential
    if (status === 'completed' && result) {
      await updatePersonalCredentialVerification(
        data.personal_credential_id,
        result.verified ? 'verified' : 'invalid',
        result.verifiedBy,
        result.notes
      );
    }

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error updating verification request:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to update verification request',
      success: false,
    };
  }
}

/**
 * Cancel a verification request
 */
export async function cancelVerificationRequest(
  requestId: string,
  reason?: string
): Promise<CredentialAPIResponse<void>> {
  try {
    const { error } = await supabase
      .from('credential_verification_requests')
      .update({
        status: 'failed',
        result: {
          verified: false,
          verificationDate: new Date().toISOString(),
          verifiedBy: 'system',
          notes: reason || 'Request cancelled by user',
          confidence: 'low' as const,
        },
        updated_date: new Date().toISOString(),
      })
      .eq('id', requestId);

    if (error) {
      throw new CredentialAPIError('Failed to cancel verification request', 400, error);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error cancelling verification request:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to cancel verification request',
      success: false,
    };
  }
}

// =====================================
// AUTOMATED VERIFICATION OPERATIONS
// =====================================

/**
 * Initiate automated verification for a credential
 */
export async function initiateAutomatedVerification(
  credentialId: string,
  requestedBy: string
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    // Create verification request
    const verificationRequest: Omit<CredentialVerificationRequest, 'id'> = {
      personalCredentialId: credentialId,
      requestedBy,
      requestDate: new Date().toISOString(),
      verificationMethod: 'automated',
      status: 'pending',
      estimatedCompletionDate: getEstimatedCompletionDate('automated'),
    };

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .insert([mapVerificationRequestToDatabase(verificationRequest)])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create verification request', 400, error);
    }

    // Start automated verification process
    await processAutomatedVerification(data.id);

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error initiating automated verification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to initiate automated verification',
      success: false,
    };
  }
}

/**
 * Process automated verification (simulated)
 */
async function processAutomatedVerification(requestId: string): Promise<void> {
  try {
    // Update status to in-progress
    await supabase
      .from('credential_verification_requests')
      .update({
        status: 'in-progress',
        updated_date: new Date().toISOString(),
      })
      .eq('id', requestId);

    // Simulate automated verification process
    // In a real implementation, this would:
    // 1. Query external verification APIs
    // 2. Check against provider databases
    // 3. Validate certificate numbers and dates
    // 4. Cross-reference with known credential databases

    // For demo purposes, we'll simulate a successful verification after a short delay
    setTimeout(async () => {
      try {
        const verificationResult = {
          verified: true,
          verificationDate: new Date().toISOString(),
          verifiedBy: 'automated_system',
          notes: 'Automatically verified through provider API',
          confidence: 'high' as const,
        };

        await updateVerificationRequestStatus(requestId, 'completed', verificationResult);
      } catch (error) {
        console.error('Error completing automated verification:', error);
        await updateVerificationRequestStatus(requestId, 'failed');
      }
    }, 2000); // 2 second delay to simulate processing

  } catch (error) {
    console.error('Error processing automated verification:', error);
    throw error;
  }
}

// =====================================
// MANUAL VERIFICATION OPERATIONS
// =====================================

/**
 * Assign manual verification to an admin
 */
export async function assignManualVerification(
  requestId: string,
  assignedToUserId: string,
  notes?: string
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const updateData = {
      status: 'in-progress',
      assigned_to: assignedToUserId,
      assignment_date: new Date().toISOString(),
      notes: notes,
      updated_date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .update(updateData)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to assign manual verification', 400, error);
    }

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error assigning manual verification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to assign manual verification',
      success: false,
    };
  }
}

/**
 * Complete manual verification
 */
export async function completeManualVerification(
  requestId: string,
  verified: boolean,
  verifiedBy: string,
  notes?: string,
  confidence: 'high' | 'medium' | 'low' = 'high'
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const verificationResult = {
      verified,
      verificationDate: new Date().toISOString(),
      verifiedBy,
      notes: notes || (verified ? 'Manually verified by admin' : 'Unable to verify credential'),
      confidence,
    };

    return await updateVerificationRequestStatus(requestId, 'completed', verificationResult);
  } catch (error) {
    console.error('Error completing manual verification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to complete manual verification',
      success: false,
    };
  }
}

// =====================================
// THIRD-PARTY VERIFICATION OPERATIONS
// =====================================

/**
 * Initiate third-party verification
 */
export async function initiateThirdPartyVerification(
  credentialId: string,
  requestedBy: string,
  verificationServiceId: string
): Promise<CredentialAPIResponse<CredentialVerificationRequest>> {
  try {
    const verificationRequest: Omit<CredentialVerificationRequest, 'id'> = {
      personalCredentialId: credentialId,
      requestedBy,
      requestDate: new Date().toISOString(),
      verificationMethod: 'third-party',
      status: 'pending',
      estimatedCompletionDate: getEstimatedCompletionDate('third-party'),
    };

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .insert([{
        ...mapVerificationRequestToDatabase(verificationRequest),
        verification_service_id: verificationServiceId,
      }])
      .select()
      .single();

    if (error) {
      throw new CredentialAPIError('Failed to create third-party verification request', 400, error);
    }

    // In a real implementation, this would integrate with third-party services
    // such as credential verification companies or blockchain verification systems

    return {
      data: mapDatabaseToVerificationRequest(data),
      success: true,
    };
  } catch (error) {
    console.error('Error initiating third-party verification:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to initiate third-party verification',
      success: false,
    };
  }
}

// =====================================
// BULK VERIFICATION OPERATIONS
// =====================================

/**
 * Bulk verify credentials for a user
 */
export async function bulkVerifyCredentials(
  credentialIds: string[],
  requestedBy: string,
  verificationMethod: 'automated' | 'manual' | 'third-party' = 'automated'
): Promise<CredentialAPIResponse<CredentialVerificationRequest[]>> {
  try {
    const verificationRequests = credentialIds.map(credentialId => ({
      personal_credential_id: credentialId,
      requested_by: requestedBy,
      request_date: new Date().toISOString(),
      verification_method: verificationMethod,
      status: 'pending',
      estimated_completion_date: getEstimatedCompletionDate(verificationMethod),
    }));

    const { data, error } = await supabase
      .from('credential_verification_requests')
      .insert(verificationRequests)
      .select();

    if (error) {
      throw new CredentialAPIError('Failed to create bulk verification requests', 400, error);
    }

    const mappedData = data?.map(mapDatabaseToVerificationRequest) || [];

    // Process automated verifications
    if (verificationMethod === 'automated') {
      mappedData.forEach(request => {
        processAutomatedVerification(request.id);
      });
    }

    return {
      data: mappedData,
      success: true,
    };
  } catch (error) {
    console.error('Error creating bulk verification requests:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to create bulk verification requests',
      success: false,
    };
  }
}

// =====================================
// VERIFICATION ANALYTICS
// =====================================

/**
 * Get verification statistics
 */
export async function getVerificationStatistics(
  timeRange?: { start: string; end: string }
): Promise<CredentialAPIResponse<{
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  successfulVerifications: number;
  failedVerifications: number;
  averageProcessingTime: number;
  verificationsByMethod: Record<string, number>;
}>> {
  try {
    let query = supabase
      .from('credential_verification_requests')
      .select('*');

    if (timeRange) {
      query = query
        .gte('request_date', timeRange.start)
        .lte('request_date', timeRange.end);
    }

    const { data, error } = await query;

    if (error) {
      throw new CredentialAPIError('Failed to fetch verification statistics', 400, error);
    }

    const requests = data || [];
    const completed = requests.filter(r => r.status === 'completed');
    const successful = completed.filter(r => r.result?.verified === true);

    // Calculate average processing time for completed requests
    const processingTimes = completed
      .filter(r => r.result?.verificationDate)
      .map(r => {
        const start = new Date(r.request_date).getTime();
        const end = new Date(r.result.verificationDate).getTime();
        return end - start;
      });

    const averageProcessingTime = processingTimes.length > 0
      ? processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length
      : 0;

    // Count verifications by method
    const verificationsByMethod: Record<string, number> = {};
    requests.forEach(r => {
      verificationsByMethod[r.verification_method] = (verificationsByMethod[r.verification_method] || 0) + 1;
    });

    const statistics = {
      totalRequests: requests.length,
      completedRequests: completed.length,
      pendingRequests: requests.filter(r => r.status === 'pending').length,
      successfulVerifications: successful.length,
      failedVerifications: completed.length - successful.length,
      averageProcessingTime: Math.round(averageProcessingTime / (1000 * 60 * 60)), // Convert to hours
      verificationsByMethod,
    };

    return {
      data: statistics,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching verification statistics:', error);
    return {
      error: error instanceof CredentialAPIError ? error.message : 'Failed to fetch verification statistics',
      success: false,
    };
  }
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Update personal credential verification status
 */
async function updatePersonalCredentialVerification(
  credentialId: string,
  status: VerificationStatus,
  verifiedBy: string,
  notes?: string
): Promise<void> {
  const updateData = {
    verification_status: status,
    verification_date: new Date().toISOString(),
    verified_by: verifiedBy,
    updated_date: new Date().toISOString(),
  };

  await supabase
    .from('personal_credentials')
    .update(updateData)
    .eq('id', credentialId);
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
