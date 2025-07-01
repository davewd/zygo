/**
 * Milestone Prerequisites Cleanup Utility
 * 
 * This utility detects and removes transitive redundancy in milestone prerequisites.
 * For example, if milestone A has prerequisites [B, C] and B has prerequisite C,
 * then A's prerequisite C is redundant and should be removed.
 */

export interface MilestoneForCleanup {
  id: string;
  title: string;
  prerequisites: string[];
  startMonths: number;
  endMonths: number;
}

export interface CleanupResult {
  milestone: MilestoneForCleanup;
  removedPrerequisites: string[];
  reasons: string[];
}

/**
 * Detects transitive redundancy in milestone prerequisites
 */
export function detectTransitiveRedundancy(
  milestones: MilestoneForCleanup[]
): CleanupResult[] {
  const milestoneMap = new Map(milestones.map(m => [m.id, m]));
  const results: CleanupResult[] = [];
  
  milestones.forEach(milestone => {
    const removedPrerequisites: string[] = [];
    const reasons: string[] = [];
    const cleanPrerequisites: string[] = [];
    
    milestone.prerequisites.forEach(prereqId => {
      const prereqMilestone = milestoneMap.get(prereqId);
      if (!prereqMilestone) {
        // Keep invalid references for now - they'll be caught by validation
        cleanPrerequisites.push(prereqId);
        return;
      }
      
      // Check if this prerequisite is already covered by another prerequisite
      let isRedundant = false;
      let redundancyReason = '';
      
      milestone.prerequisites.forEach(otherPrereqId => {
        if (otherPrereqId === prereqId) return;
        
        const otherPrereq = milestoneMap.get(otherPrereqId);
        if (!otherPrereq) return;
        
        // Check if otherPrereq has prereqId as a direct prerequisite
        if (otherPrereq.prerequisites.includes(prereqId)) {
          isRedundant = true;
          redundancyReason = `${prereqId} is already a prerequisite of ${otherPrereqId}`;
        }
        
        // Check if otherPrereq has prereqId as a transitive prerequisite
        if (hasTransitivePrerequisite(otherPrereq, prereqId, milestoneMap, new Set())) {
          isRedundant = true;
          redundancyReason = `${prereqId} is transitively included via ${otherPrereqId}`;
        }
      });
      
      if (isRedundant) {
        removedPrerequisites.push(prereqId);
        reasons.push(redundancyReason);
      } else {
        cleanPrerequisites.push(prereqId);
      }
    });
    
    if (removedPrerequisites.length > 0) {
      results.push({
        milestone: {
          ...milestone,
          prerequisites: cleanPrerequisites
        },
        removedPrerequisites,
        reasons
      });
    }
  });
  
  return results;
}

/**
 * Checks if a milestone has a transitive prerequisite
 */
function hasTransitivePrerequisite(
  milestone: MilestoneForCleanup,
  targetPrereqId: string,
  milestoneMap: Map<string, MilestoneForCleanup>,
  visited: Set<string>
): boolean {
  if (visited.has(milestone.id)) {
    return false; // Avoid cycles
  }
  
  visited.add(milestone.id);
  
  for (const prereqId of milestone.prerequisites) {
    if (prereqId === targetPrereqId) {
      return true;
    }
    
    const prereqMilestone = milestoneMap.get(prereqId);
    if (prereqMilestone && hasTransitivePrerequisite(prereqMilestone, targetPrereqId, milestoneMap, new Set(visited))) {
      return true;
    }
  }
  
  return false;
}

/**
 * Applies cleanup results to milestone data
 */
export function applyCleanupResults(
  milestones: any[],
  cleanupResults: CleanupResult[]
): any[] {
  const cleanupMap = new Map(cleanupResults.map(r => [r.milestone.id, r.milestone.prerequisites]));
  
  return milestones.map(milestone => {
    if (cleanupMap.has(milestone.id)) {
      return {
        ...milestone,
        prerequisites: cleanupMap.get(milestone.id)
      };
    }
    return milestone;
  });
}

/**
 * Main function to clean up milestone prerequisites on-the-fly
 * This can be applied to any filtered subset of milestones
 */
export function cleanupMilestonePrerequisites(milestones: any[]): {
  cleanedMilestones: any[];
  changes: CleanupResult[];
} {
  const milestonesForCleanup: MilestoneForCleanup[] = milestones.map(m => ({
    id: m.id,
    title: m.title,
    prerequisites: m.prerequisites || [],
    startMonths: m.startMonths,
    endMonths: m.endMonths
  }));
  
  const cleanupResults = detectTransitiveRedundancy(milestonesForCleanup);
  const cleanedMilestones = applyCleanupResults(milestones, cleanupResults);
  
  return {
    cleanedMilestones,
    changes: cleanupResults
  };
}

/**
 * Lightweight version that just returns cleaned milestones without detailed change tracking
 * Useful for performance-critical filtering operations
 */
export function removeTransitiveRedundancy<T extends { id: string; prerequisites?: string[] }>(
  milestones: T[]
): T[] {
  const { cleanedMilestones } = cleanupMilestonePrerequisites(milestones);
  return cleanedMilestones;
}

/**
 * Validates milestone data structure and returns detailed error information
 */
export function validateMilestoneStructure(milestones: any[]): {
  isValid: boolean;
  errors: Array<{
    milestoneId: string;
    type: 'missing_prerequisite' | 'circular_dependency' | 'invalid_structure';
    message: string;
    details?: any;
  }>;
} {
  const errors: Array<{
    milestoneId: string;
    type: 'missing_prerequisite' | 'circular_dependency' | 'invalid_structure';
    message: string;
    details?: any;
  }> = [];
  
  const milestoneIds = new Set(milestones.map(m => m.id));
  
  // Check for missing prerequisites
  milestones.forEach(milestone => {
    if (!milestone.id) {
      errors.push({
        milestoneId: 'unknown',
        type: 'invalid_structure',
        message: 'Milestone missing id property',
        details: milestone
      });
      return;
    }
    
    if (!Array.isArray(milestone.prerequisites)) {
      return; // Skip if no prerequisites
    }
    
    milestone.prerequisites.forEach((prereqId: string) => {
      if (!milestoneIds.has(prereqId)) {
        errors.push({
          milestoneId: milestone.id,
          type: 'missing_prerequisite',
          message: `Missing prerequisite milestone: ${prereqId}`,
          details: { prerequisite: prereqId }
        });
      }
    });
  });
  
  // Check for circular dependencies
  const milestoneMap = new Map(milestones.map(m => [m.id, m]));
  milestones.forEach(milestone => {
    if (hasCircularDependency(milestone, milestoneMap, new Set())) {
      errors.push({
        milestoneId: milestone.id,
        type: 'circular_dependency',
        message: `Circular dependency detected in milestone: ${milestone.id}`,
        details: { milestoneId: milestone.id }
      });
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Checks for circular dependencies in milestone prerequisites
 */
function hasCircularDependency(
  milestone: any,
  milestoneMap: Map<string, any>,
  visited: Set<string>,
  path: Set<string> = new Set()
): boolean {
  if (path.has(milestone.id)) {
    return true; // Circular dependency found
  }
  
  if (visited.has(milestone.id)) {
    return false; // Already processed this path
  }
  
  visited.add(milestone.id);
  path.add(milestone.id);
  
  if (milestone.prerequisites) {
    for (const prereqId of milestone.prerequisites) {
      const prereqMilestone = milestoneMap.get(prereqId);
      if (prereqMilestone && hasCircularDependency(prereqMilestone, milestoneMap, visited, new Set(path))) {
        return true;
      }
    }
  }
  
  path.delete(milestone.id);
  return false;
}
