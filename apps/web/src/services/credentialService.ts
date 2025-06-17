import type {
  CredentialDefinition,
  CredentialDisplayInfo,
  CredentialSearchFilters,
  CredentialSearchResult,
  CredentialSummary,
  PersonalCredential,
  VerificationStatus
} from '@zygo/types';
import {
  CREDENTIAL_DEFINITIONS,
  getCredentialDefinition,
  getCredentialProvider
} from '../data/credentials/credentialProviders';

export class CredentialService {
  
  /**
   * Convert a PersonalCredential to display information for UI
   */
  static getCredentialDisplayInfo(credential: PersonalCredential): CredentialDisplayInfo {
    const definition = getCredentialDefinition(credential.credentialDefinitionId);
    const provider = definition ? getCredentialProvider(definition.issuingProviderId) : null;
    
    const now = new Date();
    const expiryDate = credential.expiryDate ? new Date(credential.expiryDate) : null;
    const isExpired = expiryDate ? expiryDate < now : false;
    const isExpiringSoon = expiryDate ? 
      expiryDate > now && expiryDate <= new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000) : false;
    
    const canRenew = definition?.validityPeriod?.requiresRenewal && (isExpired || isExpiringSoon);
    
    return {
      title: definition?.title || 'Unknown Credential',
      abbreviation: definition?.abbreviation,
      issuingProvider: provider?.name || 'Unknown Provider',
      issueYear: credential.issueDate ? new Date(credential.issueDate).getFullYear() : undefined,
      expiryDate: credential.expiryDate,
      verificationStatus: credential.verificationStatus,
      category: definition?.category || 'other',
      type: definition?.type || 'certification',
      isExpired,
      isExpiringSoon,
      canRenew,
      displayBadge: this.getCredentialBadge(credential.verificationStatus, isExpired, isExpiringSoon)
    };
  }
  
  /**
   * Get credential badge information for UI display
   */
  static getCredentialBadge(status: VerificationStatus, isExpired: boolean, isExpiringSoon: boolean) {
    if (isExpired) {
      return {
        color: 'red',
        icon: '⚠️',
        text: 'Expired'
      };
    }
    
    if (isExpiringSoon) {
      return {
        color: 'orange',
        icon: '⏰',
        text: 'Expiring Soon'
      };
    }
    
    switch (status) {
      case 'verified':
        return {
          color: 'green',
          icon: '✓',
          text: 'Verified'
        };
      case 'pending':
        return {
          color: 'blue',
          icon: '⏳',
          text: 'Pending'
        };
      case 'expired':
        return {
          color: 'red',
          icon: '⚠️',
          text: 'Expired'
        };
      case 'invalid':
        return {
          color: 'red',
          icon: '❌',
          text: 'Invalid'
        };
      case 'self-reported':
        return {
          color: 'gray',
          icon: '📝',
          text: 'Self-Reported'
        };
      default:
        return {
          color: 'gray',
          icon: '?',
          text: 'Unknown'
        };
    }
  }
  
  /**
   * Generate a summary of credentials for a person
   */
  static generateCredentialSummary(credentials: PersonalCredential[]): CredentialSummary {
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
    
    const totalCredentials = credentials.length;
    const verifiedCredentials = credentials.filter(c => c.verificationStatus === 'verified').length;
    
    const expiringCredentials = credentials.filter(c => {
      if (!c.expiryDate) return false;
      const expiryDate = new Date(c.expiryDate);
      return expiryDate > now && expiryDate <= sixMonthsFromNow;
    }).length;
    
    const expiredCredentials = credentials.filter(c => {
      if (!c.expiryDate) return false;
      return new Date(c.expiryDate) < now;
    }).length;
    
    // Group by category
    const byCategory: Record<string, number> = {};
    const byType: Record<string, number> = {};
    
    credentials.forEach(credential => {
      const definition = getCredentialDefinition(credential.credentialDefinitionId);
      if (definition) {
        byCategory[definition.category] = (byCategory[definition.category] || 0) + 1;
        byType[definition.type] = (byType[definition.type] || 0) + 1;
      }
    });
    
    // Find most recent and highest level credentials
    const sortedByDate = [...credentials].sort((a, b) => 
      new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );
    const mostRecentCredential = sortedByDate[0];
    
    const levelOrder = ['basic', 'intermediate', 'advanced', 'expert'];
    const highestLevelCredentials = credentials
      .map(c => ({ credential: c, definition: getCredentialDefinition(c.credentialDefinitionId) }))
      .filter(({ definition }) => definition?.level)
      .sort((a, b) => {
        const aLevel = levelOrder.indexOf(a.definition!.level!);
        const bLevel = levelOrder.indexOf(b.definition!.level!);
        return bLevel - aLevel;
      })
      .slice(0, 3)
      .map(({ credential }) => credential);
    
    return {
      totalCredentials,
      verifiedCredentials,
      expiringCredentials,
      expiredCredentials,
      byCategory: byCategory as any,
      byType: byType as any,
      mostRecentCredential,
      highestLevelCredentials
    };
  }
  
  /**
   * Search credentials based on filters
   */
  static searchCredentials(
    credentials: PersonalCredential[], 
    filters: CredentialSearchFilters
  ): CredentialSearchResult[] {
    let filtered = credentials;
    
    // Apply filters
    if (filters.verificationStatus?.length) {
      filtered = filtered.filter(c => filters.verificationStatus!.includes(c.verificationStatus));
    }
    
    if (filters.isActive !== undefined) {
      const activeCredentials = filtered.filter(c => {
        const definition = getCredentialDefinition(c.credentialDefinitionId);
        return definition?.isActive === filters.isActive;
      });
      filtered = activeCredentials;
    }
    
    if (filters.hasExpiry !== undefined) {
      filtered = filtered.filter(c => filters.hasExpiry ? !!c.expiryDate : !c.expiryDate);
    }
    
    if (filters.isExpiredOrExpiring !== undefined && filters.isExpiredOrExpiring) {
      const now = new Date();
      const sixMonthsFromNow = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
      
      filtered = filtered.filter(c => {
        if (!c.expiryDate) return false;
        const expiryDate = new Date(c.expiryDate);
        return expiryDate <= sixMonthsFromNow;
      });
    }
    
    // Apply category and type filters
    if (filters.category?.length || filters.type?.length) {
      filtered = filtered.filter(c => {
        const definition = getCredentialDefinition(c.credentialDefinitionId);
        if (!definition) return false;
        
        const matchesCategory = !filters.category?.length || 
          filters.category.includes(definition.category);
        const matchesType = !filters.type?.length || 
          filters.type.includes(definition.type);
          
        return matchesCategory && matchesType;
      });
    }
    
    // Convert to search results with additional data
    return filtered.map(credential => {
      const definition = getCredentialDefinition(credential.credentialDefinitionId)!;
      const provider = getCredentialProvider(definition.issuingProviderId)!;
      
      return {
        credential,
        definition,
        provider,
        relevanceScore: this.calculateRelevanceScore(credential, definition)
      };
    }).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }
  
  /**
   * Calculate relevance score for search results
   */
  static calculateRelevanceScore(credential: PersonalCredential, definition: CredentialDefinition): number {
    let score = 0;
    
    // Verified credentials get higher score
    if (credential.verificationStatus === 'verified') score += 10;
    
    // Recent credentials get higher score
    const issueDate = new Date(credential.issueDate);
    const yearsSinceIssue = (Date.now() - issueDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    score += Math.max(0, 5 - yearsSinceIssue);
    
    // Higher level credentials get higher score
    const levelScores = { basic: 1, intermediate: 2, advanced: 3, expert: 4 };
    score += levelScores[definition.level as keyof typeof levelScores] || 0;
    
    // Active credentials get higher score
    if (definition.isActive) score += 2;
    
    // Non-expired credentials get higher score
    if (!credential.expiryDate || new Date(credential.expiryDate) > new Date()) {
      score += 3;
    }
    
    return score;
  }
  
  /**
   * Check if a credential needs renewal
   */
  static needsRenewal(credential: PersonalCredential): boolean {
    if (!credential.expiryDate) return false;
    
    const now = new Date();
    const expiryDate = new Date(credential.expiryDate);
    const threeMonthsFromNow = new Date(now.getTime() + 3 * 30 * 24 * 60 * 60 * 1000);
    
    return expiryDate <= threeMonthsFromNow;
  }
  
  /**
   * Get prerequisites for a credential
   */
  static getPrerequisites(credentialDefinitionId: string): CredentialDefinition[] {
    const definition = getCredentialDefinition(credentialDefinitionId);
    if (!definition?.prerequisites) return [];
    
    return definition.prerequisites
      .map(id => getCredentialDefinition(id))
      .filter(Boolean) as CredentialDefinition[];
  }
  
  /**
   * Check if a person meets prerequisites for a credential
   */
  static meetsPrerequisites(
    targetCredentialId: string, 
    currentCredentials: PersonalCredential[]
  ): boolean {
    const prerequisites = this.getPrerequisites(targetCredentialId);
    if (prerequisites.length === 0) return true;
    
    const currentCredentialIds = currentCredentials
      .filter(c => c.verificationStatus === 'verified')
      .map(c => c.credentialDefinitionId);
    
    return prerequisites.every(prereq => 
      currentCredentialIds.includes(prereq.id) ||
      prereq.equivalentCredentials?.some(equiv => currentCredentialIds.includes(equiv))
    );
  }
  
  /**
   * Get credential recommendations based on current credentials
   */
  static getRecommendations(currentCredentials: PersonalCredential[]): CredentialDefinition[] {
    const currentCredentialIds = currentCredentials
      .filter(c => c.verificationStatus === 'verified')
      .map(c => c.credentialDefinitionId);
    
    // Find credentials that build on current ones
    const recommendations = CREDENTIAL_DEFINITIONS.filter(def => {
      // Skip if already have this credential
      if (currentCredentialIds.includes(def.id)) return false;
      
      // Include if meets prerequisites
      return this.meetsPrerequisites(def.id, currentCredentials);
    });
    
    // Sort by relevance (same category as existing credentials gets priority)
    const currentCategories = currentCredentials
      .map(c => getCredentialDefinition(c.credentialDefinitionId)?.category)
      .filter(Boolean);
    
    return recommendations.sort((a, b) => {
      const aMatches = currentCategories.includes(a.category);
      const bMatches = currentCategories.includes(b.category);
      
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      
      // Secondary sort by level
      const levelOrder = ['basic', 'intermediate', 'advanced', 'expert'];
      const aLevel = levelOrder.indexOf(a.level || 'basic');
      const bLevel = levelOrder.indexOf(b.level || 'basic');
      
      return aLevel - bLevel;
    });
  }
  
  /**
   * Generate a credential verification URL
   */
  static getVerificationUrl(credential: PersonalCredential): string | null {
    const definition = getCredentialDefinition(credential.credentialDefinitionId);
    const provider = definition ? getCredentialProvider(definition.issuingProviderId) : null;
    
    if (!provider?.verificationMethods.verificationUrl) return null;
    
    // If credential has verification reference, append it to URL
    let url = provider.verificationMethods.verificationUrl;
    if (credential.verificationReference) {
      url += url.includes('?') ? '&' : '?';
      url += `ref=${encodeURIComponent(credential.verificationReference)}`;
    }
    
    return url;
  }
}
