import type { PersonalCredential } from '@zygo/types';
import { CredentialMigrationService } from '../../services/credentialMigrationService';
import { REBECCA_CAVALLARO } from '../network/fullCircleCenter';

/**
 * Example of migrating credentials from the existing provider system
 * to the new comprehensive credential system
 */

// Example: Migrate Rebecca Cavallaro's credentials
export const migrateRebeccaCavallaroCredentials = (): PersonalCredential[] => {
  const credentials = REBECCA_CAVALLARO.credentials.map(cred => ({
    credential: cred,
    holderId: REBECCA_CAVALLARO.id,
    holderType: 'service-provider' as const
  }));
  
  const migrationResult = CredentialMigrationService.batchMigrateCredentials(credentials);
  
  console.log('Rebecca Cavallaro Credential Migration:');
  console.log(CredentialMigrationService.generateMigrationReport(migrationResult));
  
  return migrationResult.migrated;
};

// Example personal credentials that would be created for Rebecca
export const REBECCA_CAVALLARO_PERSONAL_CREDENTIALS: PersonalCredential[] = [
  {
    id: 'cred_rebecca-cavallaro_rn-registration_1703123456789',
    credentialDefinitionId: 'rn-registration',
    holderId: 'rebecca-cavallaro',
    holderType: 'service-provider',
    
    issueDate: '2010-03-15',
    issuingProviderId: 'ahpra',
    certificateNumber: 'NMW0001234567',
    
    verificationStatus: 'verified',
    verificationDate: '2024-01-15T10:30:00Z',
    verifiedBy: 'ahpra-api',
    verificationReference: 'NMW0001234567',
    
    expiryDate: '2025-05-31',
    
    attachments: {
      certificateUrl: 'https://example.com/certificates/rebecca-rn.pdf'
    },
    notes: 'Current AHPRA registration, renewed annually',
    isPublic: true,
    isForProfessionalUse: true,
    
    createdDate: '2024-01-15T10:30:00Z',
    updatedDate: '2024-01-15T10:30:00Z',
    createdBy: 'rebecca-cavallaro'
  },
  
  {
    id: 'cred_rebecca-cavallaro_rm-registration_1703123456790',
    credentialDefinitionId: 'rm-registration',
    holderId: 'rebecca-cavallaro',
    holderType: 'service-provider',
    
    issueDate: '2015-06-20',
    issuingProviderId: 'ahpra',
    certificateNumber: 'NMW0007654321',
    
    verificationStatus: 'verified',
    verificationDate: '2024-01-15T10:30:00Z',
    verifiedBy: 'ahpra-api',
    verificationReference: 'NMW0007654321',
    
    expiryDate: '2025-05-31',
    
    attachments: {
      certificateUrl: 'https://example.com/certificates/rebecca-rm.pdf'
    },
    notes: 'Registered Midwife with AHPRA, specializing in lactation support',
    isPublic: true,
    isForProfessionalUse: true,
    
    createdDate: '2024-01-15T10:30:00Z',
    updatedDate: '2024-01-15T10:30:00Z',
    createdBy: 'rebecca-cavallaro'
  },
  
  {
    id: 'cred_rebecca-cavallaro_ibclc-certification_1703123456791',
    credentialDefinitionId: 'ibclc-certification',
    holderId: 'rebecca-cavallaro',
    holderType: 'service-provider',
    
    issueDate: '2018-07-15',
    issuingProviderId: 'iblce',
    certificateNumber: 'L-123456',
    grade: 'Pass',
    
    verificationStatus: 'verified',
    verificationDate: '2024-01-15T10:30:00Z',
    verifiedBy: 'iblce-verification',
    verificationReference: 'L-123456',
    
    expiryDate: '2028-07-15',
    
    attachments: {
      certificateUrl: 'https://example.com/certificates/rebecca-ibclc.pdf'
    },
    notes: 'International Board Certified Lactation Consultant, renewed every 5 years',
    isPublic: true,
    isForProfessionalUse: true,
    
    createdDate: '2024-01-15T10:30:00Z',
    updatedDate: '2024-01-15T10:30:00Z',
    createdBy: 'rebecca-cavallaro'
  }
];

// Example: Community member credentials (parent with some qualifications)
export const EXAMPLE_COMMUNITY_MEMBER_CREDENTIALS: PersonalCredential[] = [
  {
    id: 'cred_sarah_johnson_arc-first-aid_1703123456792',
    credentialDefinitionId: 'arc-first-aid',
    holderId: 'user_sarah_johnson',
    holderType: 'community-member',
    
    issueDate: '2023-03-10',
    issuingProviderId: 'australian-red-cross',
    certificateNumber: 'FA-2023-001234',
    
    verificationStatus: 'verified',
    verificationDate: '2023-03-10T14:00:00Z',
    verifiedBy: 'australian-red-cross',
    
    expiryDate: '2026-03-10',
    
    notes: 'First aid certificate obtained for child safety',
    isPublic: false, // Community member chooses to keep private
    isForProfessionalUse: false,
    
    createdDate: '2023-03-10T14:00:00Z',
    updatedDate: '2023-03-10T14:00:00Z',
    createdBy: 'user_sarah_johnson'
  },
  
  {
    id: 'cred_sarah_johnson_calmbirth-attendee_1703123456793',
    credentialDefinitionId: 'calmbirth-course-completion', // Would need to add this definition
    holderId: 'user_sarah_johnson',
    holderType: 'community-member',
    
    issueDate: '2022-11-15',
    issuingProviderId: 'calmbirth-australia',
    certificateNumber: 'CB-SYD-2022-456',
    
    verificationStatus: 'verified',
    verificationDate: '2022-11-15T16:30:00Z',
    verifiedBy: 'calmbirth-educator',
    
    notes: 'Completed Calmbirth course in preparation for first child',
    isPublic: true,
    isForProfessionalUse: false,
    
    createdDate: '2022-11-15T16:30:00Z',
    updatedDate: '2022-11-15T16:30:00Z',
    createdBy: 'user_sarah_johnson'
  }
];

// Example usage in a component or service
export const getProviderCredentialSummary = (providerId: string) => {
  // In a real implementation, this would fetch from a database
  // For now, we'll use the example data
  
  if (providerId === 'rebecca-cavallaro') {
    return REBECCA_CAVALLARO_PERSONAL_CREDENTIALS;
  }
  
  return [];
};

export const getCommunityMemberCredentials = (userId: string) => {
  // In a real implementation, this would fetch from a database
  // For now, we'll use the example data
  
  if (userId === 'user_sarah_johnson') {
    return EXAMPLE_COMMUNITY_MEMBER_CREDENTIALS;
  }
  
  return [];
};

// Example of credential verification workflow
export const initiateCredentialVerification = async (credentialId: string) => {
  // This would be implemented as an API call
  console.log(`Initiating verification for credential: ${credentialId}`);
  
  // Mock verification process
  return {
    verificationRequestId: `vr_${Date.now()}`,
    status: 'pending',
    estimatedCompletionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  };
};

// Example of credential search across all users
export const searchAllCredentials = (query: string) => {
  // In a real implementation, this would search across all user credentials
  const allCredentials = [
    ...REBECCA_CAVALLARO_PERSONAL_CREDENTIALS,
    ...EXAMPLE_COMMUNITY_MEMBER_CREDENTIALS
  ];
  
  return allCredentials.filter(cred => {
    // Simple search implementation
    const searchTerm = query.toLowerCase();
    return cred.notes?.toLowerCase().includes(searchTerm) ||
           cred.certificateNumber?.toLowerCase().includes(searchTerm);
  });
};
