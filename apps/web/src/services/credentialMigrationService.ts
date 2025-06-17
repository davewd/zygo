import type { Credential, CredentialDefinition, PersonalCredential } from '@zygo/types';
import {
  CREDENTIAL_DEFINITIONS,
  CREDENTIAL_PROVIDERS,
  getCredentialDefinition,
  getCredentialProvider
} from '../data/credentials/credentialProviders';

/**
 * Utility class for migrating existing credentials to the new credential system
 */
export class CredentialMigrationService {
  
  /**
   * Convert an existing network credential to the new PersonalCredential format
   */
  static migrateNetworkCredential(
    oldCredential: Credential, 
    holderId: string,
    holderType: 'service-provider' | 'community-member' | 'staff' = 'service-provider'
  ): PersonalCredential | null {
    
    // Try to find a matching credential definition
    const matchingDefinition = this.findMatchingCredentialDefinition(oldCredential);
    
    if (!matchingDefinition) {
      console.warn(`Could not find matching credential definition for: ${oldCredential.title}`);
      return null;
    }
    
    const now = new Date().toISOString();
    
    return {
      id: this.generateCredentialId(holderId, matchingDefinition.id),
      credentialDefinitionId: matchingDefinition.id,
      holderId,
      holderType,
      
      // Issue details
      issueDate: oldCredential.year ? `${oldCredential.year}-01-01` : now,
      issuingProviderId: matchingDefinition.issuingProviderId,
      certificateNumber: undefined,
      grade: undefined,
      
      // Verification
      verificationStatus: oldCredential.verified ? 'verified' : 'self-reported',
      verificationDate: oldCredential.verified ? now : undefined,
      verifiedBy: oldCredential.verified ? 'system-migration' : undefined,
      verificationReference: undefined,
      
      // Calculate expiry if the credential has a validity period
      expiryDate: this.calculateExpiryDate(oldCredential, matchingDefinition),
      
      // Metadata
      attachments: {},
      notes: `Migrated from existing credential: ${oldCredential.issuingBody}`,
      isPublic: true,
      isForProfessionalUse: true,
      
      // Tracking
      createdDate: now,
      updatedDate: now,
      createdBy: 'system-migration'
    };
  }
  
  /**
   * Find a matching credential definition for an existing credential
   */
  static findMatchingCredentialDefinition(oldCredential: Credential): CredentialDefinition | null {
    // First try exact title match
    let match = CREDENTIAL_DEFINITIONS.find(def => 
      def.title.toLowerCase() === oldCredential.title.toLowerCase()
    );
    
    if (match) return match;
    
    // Try abbreviation match
    if (oldCredential.abbreviation) {
      match = CREDENTIAL_DEFINITIONS.find(def => 
        def.abbreviation?.toLowerCase() === oldCredential.abbreviation?.toLowerCase()
      );
      if (match) return match;
    }
    
    // Try issuing body + title combination
    match = CREDENTIAL_DEFINITIONS.find(def => {
      const provider = getCredentialProvider(def.issuingProviderId);
      return provider && (
        provider.name.toLowerCase().includes(oldCredential.issuingBody.toLowerCase()) ||
        provider.abbreviation?.toLowerCase() === oldCredential.issuingBody.toLowerCase() ||
        oldCredential.issuingBody.toLowerCase().includes(provider.name.toLowerCase())
      );
    });
    
    if (match) return match;
    
    // Try keyword matching
    const keywords = this.extractKeywords(oldCredential.title);
    match = CREDENTIAL_DEFINITIONS.find(def => 
      keywords.some(keyword => 
        def.keywords.some(defKeyword => 
          defKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
    
    return match || null;
  }
  
  /**
   * Extract keywords from a credential title for matching
   */
  static extractKeywords(title: string): string[] {
    return title
      .toLowerCase()
      .split(/[\s\-\_\(\)]+/)
      .filter(word => word.length > 2)
      .filter(word => !['and', 'the', 'for', 'of', 'in', 'to', 'with'].includes(word));
  }
  
  /**
   * Calculate expiry date based on credential definition validity period
   */
  static calculateExpiryDate(
    oldCredential: Credential, 
    definition: CredentialDefinition
  ): string | undefined {
    if (!definition.validityPeriod) return undefined;
    
    const issueDate = oldCredential.year ? 
      new Date(`${oldCredential.year}-01-01`) : 
      new Date();
    
    const expiryDate = new Date(issueDate);
    
    if (definition.validityPeriod.years) {
      expiryDate.setFullYear(expiryDate.getFullYear() + definition.validityPeriod.years);
    }
    
    if (definition.validityPeriod.months) {
      expiryDate.setMonth(expiryDate.getMonth() + definition.validityPeriod.months);
    }
    
    return expiryDate.toISOString().split('T')[0]; // Return date only
  }
  
  /**
   * Generate a unique credential ID
   */
  static generateCredentialId(holderId: string, credentialDefinitionId: string): string {
    const timestamp = Date.now();
    return `cred_${holderId}_${credentialDefinitionId}_${timestamp}`.replace(/[^a-zA-Z0-9_]/g, '_');
  }
  
  /**
   * Create suggested mappings for unmapped credentials
   */
  static createCredentialDefinitionSuggestions(oldCredential: Credential): CredentialDefinition[] {
    const now = new Date().toISOString();
    
    // Try to find the provider first
    const provider = CREDENTIAL_PROVIDERS.find(p => 
      p.name.toLowerCase().includes(oldCredential.issuingBody.toLowerCase()) ||
      oldCredential.issuingBody.toLowerCase().includes(p.name.toLowerCase()) ||
      p.abbreviation?.toLowerCase() === oldCredential.issuingBody.toLowerCase()
    );
    
    const issuingProviderId = provider?.id || 'unknown-provider';
    
    // Guess the credential type and category based on title and issuing body
    const { type, category } = this.guessCredentialTypeAndCategory(oldCredential);
    
    const suggestion: CredentialDefinition = {
      id: `suggested_${oldCredential.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      title: oldCredential.title,
      abbreviation: oldCredential.abbreviation,
      description: `Auto-generated definition for ${oldCredential.title}`,
      type,
      category,
      issuingProviderId,
      level: 'basic',
      verificationRequired: oldCredential.verified,
      recognizedIn: ['Australia'], // Default assumption
      keywords: this.extractKeywords(oldCredential.title),
      isActive: true
    };
    
    return [suggestion];
  }
  
  /**
   * Guess credential type and category from title and issuing body
   */
  static guessCredentialTypeAndCategory(oldCredential: Credential): { 
    type: 'degree' | 'certification' | 'license' | 'registration' | 'fellowship' | 'membership' | 'training' | 'award' | 'qualification',
    category: 'medical' | 'nursing' | 'allied-health' | 'education' | 'fitness' | 'childcare' | 'mental-health' | 'nutrition' | 'technology' | 'business' | 'safety' | 'regulatory'
  } {
    const title = oldCredential.title.toLowerCase();
    const issuer = oldCredential.issuingBody.toLowerCase();
    
    // Determine type
    let type: any = 'certification';
    if (title.includes('bachelor') || title.includes('master') || title.includes('doctorate') || title.includes('phd')) {
      type = 'degree';
    } else if (title.includes('fellowship') || title.includes('fellow')) {
      type = 'fellowship';
    } else if (title.includes('registration') || title.includes('registered')) {
      type = 'registration';
    } else if (title.includes('license') || title.includes('licensed')) {
      type = 'license';
    } else if (title.includes('member') || title.includes('membership')) {
      type = 'membership';
    } else if (title.includes('training') || title.includes('course')) {
      type = 'training';
    } else if (title.includes('award')) {
      type = 'award';
    }
    
    // Determine category
    let category: any = 'business';
    if (title.includes('nurse') || title.includes('nursing') || title.includes('midwife') || title.includes('midwifery')) {
      category = 'nursing';
    } else if (title.includes('doctor') || title.includes('medical') || title.includes('medicine') || title.includes('physician')) {
      category = 'medical';
    } else if (title.includes('lactation') || title.includes('nutrition') || title.includes('dietitian')) {
      category = 'nutrition';
    } else if (title.includes('psychology') || title.includes('counselling') || title.includes('therapy')) {
      category = 'mental-health';
    } else if (title.includes('tennis') || title.includes('football') || title.includes('gymnastics') || title.includes('swimming') || title.includes('coach') || title.includes('fitness')) {
      category = 'fitness';
    } else if (title.includes('first aid') || title.includes('cpr') || title.includes('safety')) {
      category = 'safety';
    } else if (title.includes('education') || title.includes('teaching') || title.includes('childbirth') || title.includes('calmbirth')) {
      category = 'education';
    } else if (title.includes('childcare') || title.includes('child care') || title.includes('children')) {
      category = 'childcare';
    } else if (title.includes('computer') || title.includes('technology') || title.includes('informatics') || title.includes('digital')) {
      category = 'technology';
    } else if (issuer.includes('health') || issuer.includes('medical') || issuer.includes('hospital')) {
      category = 'allied-health';
    }
    
    return { type, category };
  }
  
  /**
   * Batch migrate multiple credentials
   */
  static batchMigrateCredentials(
    credentials: { credential: Credential, holderId: string, holderType?: 'service-provider' | 'community-member' | 'staff' }[]
  ): { 
    migrated: PersonalCredential[], 
    failed: { credential: Credential, reason: string }[],
    suggestions: { credential: Credential, suggestions: CredentialDefinition[] }[]
  } {
    const migrated: PersonalCredential[] = [];
    const failed: { credential: Credential, reason: string }[] = [];
    const suggestions: { credential: Credential, suggestions: CredentialDefinition[] }[] = [];
    
    credentials.forEach(({ credential, holderId, holderType = 'service-provider' }) => {
      const migrated_credential = this.migrateNetworkCredential(credential, holderId, holderType);
      
      if (migrated_credential) {
        migrated.push(migrated_credential);
      } else {
        failed.push({ credential, reason: 'No matching credential definition found' });
        
        // Create suggestions for failed migrations
        const credentialSuggestions = this.createCredentialDefinitionSuggestions(credential);
        suggestions.push({ credential, suggestions: credentialSuggestions });
      }
    });
    
    return { migrated, failed, suggestions };
  }
  
  /**
   * Generate migration report
   */
  static generateMigrationReport(
    results: { 
      migrated: PersonalCredential[], 
      failed: { credential: Credential, reason: string }[],
      suggestions: { credential: Credential, suggestions: CredentialDefinition[] }[]
    }
  ): string {
    const { migrated, failed, suggestions } = results;
    
    let report = `Credential Migration Report\n`;
    report += `========================\n\n`;
    
    report += `Total Credentials Processed: ${migrated.length + failed.length}\n`;
    report += `Successfully Migrated: ${migrated.length}\n`;
    report += `Failed Migrations: ${failed.length}\n`;
    report += `Suggestions Generated: ${suggestions.length}\n\n`;
    
    if (migrated.length > 0) {
      report += `Successfully Migrated Credentials:\n`;
      report += `----------------------------------\n`;
      migrated.forEach(cred => {
        const definition = getCredentialDefinition(cred.credentialDefinitionId);
        report += `- ${definition?.title || 'Unknown'} (${cred.holderType})\n`;
      });
      report += `\n`;
    }
    
    if (failed.length > 0) {
      report += `Failed Migrations:\n`;
      report += `------------------\n`;
      failed.forEach(({ credential, reason }) => {
        report += `- ${credential.title} from ${credential.issuingBody}: ${reason}\n`;
      });
      report += `\n`;
    }
    
    if (suggestions.length > 0) {
      report += `Suggestions for New Credential Definitions:\n`;
      report += `-------------------------------------------\n`;
      suggestions.forEach(({ credential, suggestions: credSuggestions }) => {
        report += `For "${credential.title}" from ${credential.issuingBody}:\n`;
        credSuggestions.forEach(suggestion => {
          report += `  - ${suggestion.title} (${suggestion.type}, ${suggestion.category})\n`;
        });
        report += `\n`;
      });
    }
    
    return report;
  }
}
