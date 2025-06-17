// Migration script to convert existing service provider credentials to PersonalCredential system
// and populate community member credential fields

import type {
  Credential as LegacyCredential,
  PersonalCredential
} from '@zygo/types';
import {
  getCredentialDefinitionByTitle,
  getCredentialProviderByName
} from '../lib/api/credentialProviders';
import {
  createPersonalCredential
} from '../lib/api/credentials';

// Import all service providers with their current credentials
import {
  EMILY_MCCONAGHY,
  JAKE_THOMPSON
} from '../data/network/active8KidsCenter';
import {
  KAREN_MCCLAY,
  PETER_JACKSON,
  SARAH_THOMPSON_EDUCATOR
} from '../data/network/calmbirthCenter';
import {
  EMMA_RODRIGUEZ,
  MARCUS_CHEN,
  SARAH_MITCHELL
} from '../data/network/elixrSwimSchoolCenter';
import { DR_SHELLEY_ROWLANDS } from '../data/network/emogCenter';
import { REBECCA_CAVALLARO } from '../data/network/fullCircleCenter';
import {
  JAMES_THOMPSON,
  MICHAEL_OCONNOR,
  SOFIA_MARTINEZ
} from '../data/network/kickeroosSoccerCenter';
import { JESSICA_DAWSON_DIETITIAN } from '../data/network/kidneyNutritionCenter';
import { CAROLINE_MATERNITY_CONSULTANT } from '../data/network/mummysWhispersCenter';
import {
  ANDREA_DUNNE,
  DR_JUSTIN_TUCKER,
  POLLY_DELANEY
} from '../data/network/prologueCenter';
import {
  DANIELLE_HARMSEN,
  LUCY_WOOD,
  STEVE_LOEFFLER
} from '../data/network/whiteCityTennisCenter';
import {
  DR_ALEXANDRA_THOMPSON,
  SARAH_DIGITAL_SPECIALIST
} from '../data/network/zygoAppCenter';

// Sample community members who might have relevant credentials
const COMMUNITY_MEMBERS_WITH_CREDENTIALS = [
  {
    id: 'consumer_005', // Jessica Chen - Speech pathologist
    handle: 'jessica_mama2',
    credentials: [
      {
        title: 'Bachelor of Speech Pathology',
        abbreviation: 'BSP',
        issuingBody: 'University of Sydney',
        verified: true,
        year: 2007
      },
      {
        title: 'Certified Practicing Speech Pathologist',
        abbreviation: 'CPSP',
        issuingBody: 'Speech Pathology Australia',
        verified: true,
        year: 2008
      }
    ]
  },
  {
    id: 'consumer_008', // John - Software engineer
    handle: 'software_engineer',
    credentials: [
      {
        title: 'Bachelor of Computer Science',
        abbreviation: 'BCS',
        issuingBody: 'University of New South Wales',
        verified: true,
        year: 2007
      },
      {
        title: 'AWS Certified Solutions Architect',
        abbreviation: 'AWS SAA',
        issuingBody: 'Amazon Web Services',
        verified: true,
        year: 2020,
        expiryDate: '2026-03-15'
      }
    ]
  },
  {
    id: 'consumer_004', // Mary Wilson - Retired teacher
    handle: 'mary_nana',
    credentials: [
      {
        title: 'Bachelor of Education',
        abbreviation: 'BEd',
        issuingBody: 'Macquarie University',
        verified: true,
        year: 1975
      },
      {
        title: 'NSW Teaching Certificate',
        abbreviation: 'NSW TC',
        issuingBody: 'NSW Education Standards Authority',
        verified: true,
        year: 1976
      }
    ]
  }
];

// Consolidated list of all service providers
const ALL_SERVICE_PROVIDERS = [
  REBECCA_CAVALLARO,
  DR_JUSTIN_TUCKER,
  ANDREA_DUNNE,
  POLLY_DELANEY,
  EMILY_MCCONAGHY,
  JAKE_THOMPSON,
  PETER_JACKSON,
  KAREN_MCCLAY,
  SARAH_THOMPSON_EDUCATOR,
  STEVE_LOEFFLER,
  LUCY_WOOD,
  DANIELLE_HARMSEN,
  SARAH_MITCHELL,
  MARCUS_CHEN,
  EMMA_RODRIGUEZ,
  JAMES_THOMPSON,
  SOFIA_MARTINEZ,
  MICHAEL_OCONNOR,
  CAROLINE_MATERNITY_CONSULTANT,
  DR_SHELLEY_ROWLANDS,
  JESSICA_DAWSON_DIETITIAN,
  SARAH_DIGITAL_SPECIALIST,
  DR_ALEXANDRA_THOMPSON
];

/**
 * Interface for migration tracking
 */
interface CredentialMigrationResult {
  success: boolean;
  totalCredentialsProcessed: number;
  personalCredentialsCreated: number;
  serviceProvidersUpdated: number;
  communityMembersUpdated: number;
  errors: string[];
  details: {
    serviceProviderCredentials: { [providerId: string]: string[] }; // PersonalCredential IDs
    communityMemberCredentials: { [consumerId: string]: string[] }; // PersonalCredential IDs
  };
}

/**
 * Helper function to categorize credentials by type
 */
function categorizeCredential(credential: LegacyCredential): {
  type: string;
  category: string;
} {
  const title = credential.title.toLowerCase();
  const issuingBody = credential.issuingBody.toLowerCase();

  // Medical credentials
  if (title.includes('medicine') || title.includes('mbbs') || title.includes('doctor')) {
    return { type: 'degree', category: 'medical' };
  }
  if (title.includes('nursing') || title.includes('nurse') || title.includes('midwife')) {
    return { type: 'registration', category: 'nursing' };
  }
  if (title.includes('lactation') || title.includes('ibclc')) {
    return { type: 'certification', category: 'allied-health' };
  }
  if (title.includes('obstetrics') || title.includes('gynaecology') || title.includes('franzcog')) {
    return { type: 'fellowship', category: 'medical' };
  }
  
  // Education credentials
  if (title.includes('education') || title.includes('teaching') || title.includes('calmbirth') && title.includes('educator')) {
    return { type: 'certification', category: 'education' };
  }
  
  // Fitness and sports
  if (title.includes('coach') || title.includes('tennis') || title.includes('gymnastics') || title.includes('swimming')) {
    return { type: 'certification', category: 'fitness' };
  }
  
  // Technology
  if (title.includes('computer') || title.includes('software') || title.includes('aws') || title.includes('digital')) {
    return { type: 'certification', category: 'technology' };
  }
  
  // Safety and regulatory
  if (title.includes('first aid') || title.includes('cpr') || title.includes('working with children')) {
    return { type: 'certification', category: 'safety' };
  }
  
  // Speech pathology and allied health
  if (title.includes('speech') || title.includes('pathology') || title.includes('dietitian')) {
    return { type: 'degree', category: 'allied-health' };
  }
  
  // Default
  return { type: 'certification', category: 'other' };
}

/**
 * Convert legacy credential to PersonalCredential format
 */
async function convertLegacyCredential(
  credential: LegacyCredential,
  ownerId: string,
  ownerType: 'service-provider' | 'community-member'
): Promise<PersonalCredential | null> {
  try {
    // Find or create credential definition
    let credentialDefinition = await getCredentialDefinitionByTitle(credential.title);
    if (!credentialDefinition) {
      console.warn(`No credential definition found for: ${credential.title}`);
      return null;
    }

    // Find or create credential provider
    let credentialProvider = await getCredentialProviderByName(credential.issuingBody);
    if (!credentialProvider) {
      console.warn(`No credential provider found for: ${credential.issuingBody}`);
      return null;
    }

    const { type, category } = categorizeCredential(credential);

    const personalCredential: Omit<PersonalCredential, 'id' | 'createdAt' | 'updatedAt'> = {
      ownerId,
      ownerType,
      credentialDefinitionId: credentialDefinition.id,
      credentialProviderId: credentialProvider.id,
      issueDate: credential.year ? `${credential.year}-01-01` : new Date().toISOString().split('T')[0],
      expiryDate: credential.expiryDate || undefined,
      verificationStatus: credential.verified ? 'verified' : 'self-reported',
      verificationDate: credential.verified ? new Date().toISOString().split('T')[0] : undefined,
      verificationReference: credential.verificationReference || undefined,
      isActive: true,
      isPublic: true,
      displayOrder: 0
    };

    return await createPersonalCredential(personalCredential);
  } catch (error) {
    console.error(`Error converting credential ${credential.title}:`, error);
    return null;
  }
}

/**
 * Process all service provider credentials
 */
async function migrateServiceProviderCredentials(): Promise<{
  success: boolean;
  processedCount: number;
  credentialIds: { [providerId: string]: string[] };
  errors: string[];
}> {
  const result = {
    success: true,
    processedCount: 0,
    credentialIds: {} as { [providerId: string]: string[] },
    errors: [] as string[]
  };

  console.log('🔄 Migrating service provider credentials...');

  for (const provider of ALL_SERVICE_PROVIDERS) {
    console.log(`Processing credentials for ${provider.firstName} ${provider.lastName}...`);
    
    const providerCredentialIds: string[] = [];

    for (const credential of provider.credentials) {
      try {
        const personalCredential = await convertLegacyCredential(
          credential,
          provider.id,
          'service-provider'
        );

        if (personalCredential) {
          providerCredentialIds.push(personalCredential.id);
          result.processedCount++;
        } else {
          result.errors.push(`Failed to convert credential "${credential.title}" for provider ${provider.id}`);
        }
      } catch (error) {
        const errorMsg = `Error processing credential "${credential.title}" for provider ${provider.id}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    if (providerCredentialIds.length > 0) {
      result.credentialIds[provider.id] = providerCredentialIds;
    }
  }

  console.log(`✅ Processed ${result.processedCount} service provider credentials`);
  return result;
}

/**
 * Process community member credentials
 */
async function migrateCommunityMemberCredentials(): Promise<{
  success: boolean;
  processedCount: number;
  credentialIds: { [consumerId: string]: string[] };
  errors: string[];
}> {
  const result = {
    success: true,
    processedCount: 0,
    credentialIds: {} as { [consumerId: string]: string[] },
    errors: [] as string[]
  };

  console.log('🔄 Migrating community member credentials...');

  for (const member of COMMUNITY_MEMBERS_WITH_CREDENTIALS) {
    console.log(`Processing credentials for community member ${member.handle}...`);
    
    const memberCredentialIds: string[] = [];

    for (const credential of member.credentials) {
      try {
        const personalCredential = await convertLegacyCredential(
          credential,
          member.id,
          'community-member'
        );

        if (personalCredential) {
          memberCredentialIds.push(personalCredential.id);
          result.processedCount++;
        } else {
          result.errors.push(`Failed to convert credential "${credential.title}" for member ${member.id}`);
        }
      } catch (error) {
        const errorMsg = `Error processing credential "${credential.title}" for member ${member.id}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    if (memberCredentialIds.length > 0) {
      result.credentialIds[member.id] = memberCredentialIds;
    }
  }

  console.log(`✅ Processed ${result.processedCount} community member credentials`);
  return result;
}

/**
 * Generate updated service provider files with PersonalCredential IDs
 */
function generateUpdatedProviderFiles(credentialMapping: { [providerId: string]: string[] }): {
  [filename: string]: string;
} {
  const updatedFiles: { [filename: string]: string } = {};

  // This would generate the updated provider files with credential IDs
  // For now, we'll log the mapping that needs to be applied
  console.log('📝 Credential ID mapping for service providers:');
  
  Object.entries(credentialMapping).forEach(([providerId, credentialIds]) => {
    console.log(`${providerId}: [${credentialIds.map(id => `"${id}"`).join(', ')}]`);
  });

  return updatedFiles;
}

/**
 * Generate updated community member files with PersonalCredential IDs
 */
function generateUpdatedCommunityFiles(credentialMapping: { [consumerId: string]: string[] }): {
  [filename: string]: string;
} {
  const updatedFiles: { [filename: string]: string } = {};

  // This would generate the updated community member files with credential IDs
  console.log('📝 Credential ID mapping for community members:');
  
  Object.entries(credentialMapping).forEach(([consumerId, credentialIds]) => {
    console.log(`${consumerId}: [${credentialIds.map(id => `"${id}"`).join(', ')}]`);
  });

  return updatedFiles;
}

/**
 * Main migration function
 */
export async function migrateAllProfileCredentials(): Promise<CredentialMigrationResult> {
  console.log('🚀 Starting profile credentials migration...');
  
  const result: CredentialMigrationResult = {
    success: false,
    totalCredentialsProcessed: 0,
    personalCredentialsCreated: 0,
    serviceProvidersUpdated: 0,
    communityMembersUpdated: 0,
    errors: [],
    details: {
      serviceProviderCredentials: {},
      communityMemberCredentials: {}
    }
  };

  try {
    // Step 1: Migrate service provider credentials
    console.log('\n📋 Step 1: Migrating service provider credentials');
    const serviceProviderResult = await migrateServiceProviderCredentials();
    
    result.totalCredentialsProcessed += serviceProviderResult.processedCount;
    result.personalCredentialsCreated += serviceProviderResult.processedCount;
    result.serviceProvidersUpdated = Object.keys(serviceProviderResult.credentialIds).length;
    result.details.serviceProviderCredentials = serviceProviderResult.credentialIds;
    result.errors.push(...serviceProviderResult.errors);

    // Step 2: Migrate community member credentials
    console.log('\n📋 Step 2: Migrating community member credentials');
    const communityMemberResult = await migrateCommunityMemberCredentials();
    
    result.totalCredentialsProcessed += communityMemberResult.processedCount;
    result.personalCredentialsCreated += communityMemberResult.processedCount;
    result.communityMembersUpdated = Object.keys(communityMemberResult.credentialIds).length;
    result.details.communityMemberCredentials = communityMemberResult.credentialIds;
    result.errors.push(...communityMemberResult.errors);

    // Step 3: Generate file updates
    console.log('\n📁 Step 3: Generating updated files');
    generateUpdatedProviderFiles(result.details.serviceProviderCredentials);
    generateUpdatedCommunityFiles(result.details.communityMemberCredentials);

    result.success = true;
    
    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`  - Total credentials processed: ${result.totalCredentialsProcessed}`);
    console.log(`  - PersonalCredentials created: ${result.personalCredentialsCreated}`);
    console.log(`  - Service providers updated: ${result.serviceProvidersUpdated}`);
    console.log(`  - Community members updated: ${result.communityMembersUpdated}`);
    console.log(`  - Errors encountered: ${result.errors.length}`);

    if (result.errors.length > 0) {
      console.log('\n⚠️ Errors encountered:');
      result.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

  } catch (error) {
    console.error('💥 Migration failed:', error);
    result.errors.push(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}

/**
 * Run migration if called directly
 */
if (require.main === module) {
  migrateAllProfileCredentials()
    .then((result) => {
      console.log('\n✅ Migration script completed');
      if (result.success) {
        process.exit(0);
      } else {
        console.error('❌ Migration failed with errors');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}
