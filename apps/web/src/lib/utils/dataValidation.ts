/**
 * Utility functions for data validation and classification
 * These functions simplify complex conditional logic across the application
 */

/**
 * Checks if a handle represents a community member based on naming patterns
 * 
 * @param handle - The user handle to check (e.g., "emma_mom", "john_dad")
 * @returns true if the handle matches community member patterns
 * 
 * @example
 * ```ts
 * isCommunityMemberHandle("emma_mom") // true
 * isCommunityMemberHandle("dr_smith") // false
 * ```
 */
export function isCommunityMemberHandle(handle: string): boolean {
  const communityIndicators = ['_mom', '_dad', '_mama', '_nana'];
  return communityIndicators.some(indicator => handle.includes(indicator));
}

/**
 * Checks if a handle represents a service provider based on naming patterns
 * 
 * @param handle - The user handle to check (e.g., "rainbow_school", "wellness_center")
 * @returns true if the handle matches service provider patterns
 */
export function isServiceProviderHandle(handle: string): boolean {
  return handle.includes('_school') || handle.includes('_center');
}

/**
 * Checks if a handle is a system/app handle that should be excluded from validation
 */
export function isSystemHandle(handle: string): boolean {
  const systemHandles = ['zygo_app', 'family_events', 'kambala_school'];
  return systemHandles.includes(handle);
}

/**
 * Determines the suggested actor type based on handle patterns
 */
export function suggestActorType(handle: string, hasProviderId: boolean): string {
  if (isSystemHandle(handle)) {
    return 'system';
  }
  
  if (hasProviderId || isServiceProviderHandle(handle)) {
    return 'service-provider';
  }
  
  if (isCommunityMemberHandle(handle)) {
    return 'community-member';
  }
  
  return 'unknown';
}

/**
 * Validates that a filter array has items and a value is included
 * This helper reduces complex conditional logic for filtering operations
 * 
 * @param filters - Array of filter values (undefined/null means no filter applied)
 * @param value - Value to check against the filter
 * @returns true if no filter is applied or if value is included in filters
 * 
 * @example
 * ```ts
 * isFilterMatch(['admin', 'user'], 'admin') // true
 * isFilterMatch([], 'admin') // true (no filter)
 * isFilterMatch(['user'], 'admin') // false
 * isFilterMatch(undefined, 'admin') // true (no filter)
 * ```
 */
export function isFilterMatch<T>(filters: T[] | undefined, value: T): boolean {
  return !filters || filters.length === 0 || filters.includes(value);
}

/**
 * Checks if a value is non-empty string or non-empty array
 */
export function hasValue(value: string | string[] | undefined | null): boolean {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
}

/**
 * Safely splits a string by delimiter and filters empty values
 */
export function splitAndClean(value: string, delimiter: string = ','): string[] {
  if (!value || typeof value !== 'string') return [];
  return value.split(delimiter).map(item => item.trim()).filter(item => item.length > 0);
}
