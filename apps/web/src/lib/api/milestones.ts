import Papa from 'papaparse';

// Types for milestone data
export interface MilestoneData {
  id: string;
  title: string;
  description: string;
  category: string;
  ageRangeKey: string;
  ageRange: string;
  startMonths: number;
  endMonths: number;
  period: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  isTypical: boolean;
  isKeyMilestone?: boolean;
  prerequisites?: string[];
  skills?: string[];
  observationTips?: string;
  supportStrategies?: string;
  redFlags?: string;
  resources?: string;
  createdDate: string;
  modifiedDate: string;
}

export interface AgeRange {
  range: string;
  key: string;
  description: string;
  months: [number, number];
  period: string;
}

export interface MilestoneFilters {
  categories?: string[];
  ageRanges?: string[];
  periods?: string[];
  importance?: string[];
  searchTerm?: string;
}

// Achievement and Step data types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  fromMilestone: string;
  toMilestone: string;
  ageRangeKey: string;
  stepCount: number;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  achievementId: string;
  achievementTitle: string;
  duration: string;
  completed: boolean;
  inProgress: boolean;
}

// Cache for parsed data
let cachedMilestones: MilestoneData[] | null = null;
let cachedAgeRanges: AgeRange[] | null = null;
let lastModified: number | null = null;
let ageRangesLastModified: number | null = null;

// Cache for achievements and steps
let cachedAchievements: Achievement[] | null = null;
let achievementsLastModified: number | null = null;
let cachedSteps: Step[] | null = null;
let stepsLastModified: number | null = null;

// Cache for JSON milestones
let cachedJsonMilestones: MilestoneData[] | null = null;
let jsonMilestonesLastModified: number | null = null;

/**
 * Load age ranges from JSON API
 */
export async function loadAgeRangesFromAPI(): Promise<AgeRange[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedAgeRanges && ageRangesLastModified && (now - ageRangesLastModified) < 5 * 60 * 1000) {
      return cachedAgeRanges;
    }

    console.log('🔄 Loading age ranges from API...');
    
    const response = await fetch('/data/age-ranges.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const ageRanges: AgeRange[] = await response.json();
    
    // Cache the results
    cachedAgeRanges = ageRanges;
    ageRangesLastModified = now;
    
    console.log(`✅ Loaded ${ageRanges.length} age ranges from API`);
    return ageRanges;
    
  } catch (error) {
    console.error('❌ Error loading age ranges from API:', error);
    
    // Fallback to generated age ranges if API fails
    console.log('🔄 Falling back to generated age ranges...');
    return generateAgeRangesFallback();
  }
}

/**
 * Fallback function to generate age ranges (original logic)
 */
export function generateAgeRangesFallback(): AgeRange[] {
  const ranges: AgeRange[] = [];
  
  // Prenatal period: -12 months to 0 months (1 range)
  ranges.push({
    range: '-12 to 0 months',
    key: 'prenatal',
    description: 'Prenatal development period',
    months: [-12, 0],
    period: 'prenatal'
  });
  
  // Generate age ranges from 0 to 18 years (216 months) in 12-month (yearly) intervals
  for (let months = 0; months <= 216; months += 12) {
    const endMonths = Math.min(months + 12, 216);
    const startYears = Math.floor(months / 12);
    const endYears = Math.floor(endMonths / 12);
    
    let period = 'unknown';
    let description = '';
    let key = '';
    
    if (months <= 12) {
      period = 'infancy';
      description = 'Infancy period with rapid development';
      key = `infancy_${months}_${endMonths}`;
    } else if (months <= 36) {
      period = 'early_childhood';
      description = 'Early childhood with major milestones';
      key = `early_childhood_${months}_${endMonths}`;
    } else if (months <= 60) {
      period = 'preschool';
      description = 'Preschool years with increasing independence';
      key = `preschool_${months}_${endMonths}`;
    } else if (months <= 144) {
      period = 'school_age';
      description = 'School age with formal learning';
      key = `school_age_${months}_${endMonths}`;
    } else {
      period = 'adolescence';
      description = 'Adolescence with identity formation';
      key = `adolescence_${months}_${endMonths}`;
    }
    
    // Format range display for yearly intervals
    const formatRange = (start: number, end: number) => {
      if (start === 0 && end === 12) return '0-1 year';
      
      const startYears = Math.floor(start / 12);
      const endYears = Math.floor(end / 12);
      
      if (startYears === 0) {
        return `${end} months`;
      } else if (endYears === startYears + 1 && end % 12 === 0) {
        return `${startYears + 1} year${startYears + 1 > 1 ? 's' : ''}`;
      } else {
        return `${startYears}-${endYears} years`;
      }
    };
    
    ranges.push({
      range: formatRange(months, endMonths),
      key: key,
      description: description,
      months: [months, endMonths],
      period: period
    });
  }
  
  return ranges;
}

/**
 * Load milestones from CSV file
 * @deprecated Use loadMilestonesFromJSON() instead. CSV support will be removed in a future version.
 */
export async function loadMilestonesFromCSV(): Promise<MilestoneData[]> {
  console.warn('loadMilestonesFromCSV is deprecated. Use loadMilestonesFromJSON() instead.');
  
  try {
    // Check cache first
    const now = Date.now();
    if (cachedMilestones && lastModified && (now - lastModified) < 5 * 60 * 1000) {
      return cachedMilestones;
    }

    // Try loading from comprehensive CSV first, then fallback to original
    let response: Response;
    let csvText: string;
    
    try {
      response = await fetch('/data/comprehensive-milestones.csv');
      if (!response.ok) throw new Error('Comprehensive CSV not found');
      csvText = await response.text();
    } catch {
      // Fallback to original CSV
      response = await fetch('/data/milestones.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      csvText = await response.text();
    }
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const milestones: MilestoneData[] = results.data.map((row: any) => ({
              id: row.id || `milestone_${Date.now()}_${Math.random()}`,
              title: row.title || '',
              description: row.description || '',
              category: row.category || 'physical',
              ageRangeKey: row.ageRangeKey || '',
              ageRange: row.ageRange || '',
              startMonths: parseInt(row.startMonths) || 0,
              endMonths: parseInt(row.endMonths) || 6,
              period: row.period || 'infancy',
              importance: (row.importance as 'low' | 'medium' | 'high' | 'critical') || 'medium',
              isTypical: row.isTypical === 'true' || row.isTypical === true,
              prerequisites: row.prerequisites ? row.prerequisites.split(',').map((p: string) => p.trim()) : [],
              skills: row.skills ? row.skills.split(',').map((s: string) => s.trim()) : [],
              observationTips: row.observationTips || '',
              supportStrategies: row.supportStrategies || '',
              redFlags: row.redFlags || '',
              resources: row.resources || '',
              createdDate: row.createdDate || new Date().toISOString(),
              modifiedDate: row.modifiedDate || new Date().toISOString(),
            }));
            
            // Cache the results
            cachedMilestones = milestones;
            lastModified = now;
            
            resolve(milestones);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading milestones from CSV:', error);
    
    // Return empty array if CSV fails
    return [];
  }
}

/**
 * Load achievements from JSON API
 */
export async function loadAchievementsFromAPI(): Promise<Achievement[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedAchievements && achievementsLastModified && (now - achievementsLastModified) < 5 * 60 * 1000) {
      return cachedAchievements;
    }

    console.log('🔄 Loading achievements from API...');
    
    const response = await fetch('/data/achievements.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const achievements: Achievement[] = await response.json();
    
    // Cache the results
    cachedAchievements = achievements;
    achievementsLastModified = now;
    
    console.log(`✅ Loaded ${achievements.length} achievements from API`);
    return achievements;
    
  } catch (error) {
    console.error('❌ Error loading achievements from API:', error);
    return [];
  }
}

/**
 * Load steps from JSON API
 */
export async function loadStepsFromAPI(): Promise<Step[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedSteps && stepsLastModified && (now - stepsLastModified) < 5 * 60 * 1000) {
      return cachedSteps;
    }

    console.log('🔄 Loading steps from API...');
    
    const response = await fetch('/data/steps.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const steps: Step[] = await response.json();
    
    // Cache the results
    cachedSteps = steps;
    stepsLastModified = now;
    
    console.log(`✅ Loaded ${steps.length} steps from API`);
    return steps;
    
  } catch (error) {
    console.error('❌ Error loading steps from API:', error);
    return [];
  }
}

/**
 * Load milestones from JSON API
 */
export async function loadMilestonesFromJSON(): Promise<MilestoneData[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedJsonMilestones && jsonMilestonesLastModified && (now - jsonMilestonesLastModified) < 5 * 60 * 1000) {
      return cachedJsonMilestones;
    }

    console.log('🔄 Loading milestones from JSON API...');
    
    const response = await fetch('/data/milestones.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawMilestones: any[] = await response.json();
    
    // Convert JSON format to timeline component format
    const milestones: MilestoneData[] = rawMilestones.map(milestone => ({
      ...milestone,
      // Convert startMonths/endMonths to months array for timeline compatibility
      months: [milestone.startMonths, milestone.endMonths] as [number, number]
    }));
    
    // Cache the results
    cachedJsonMilestones = milestones;
    jsonMilestonesLastModified = now;
    
    console.log(`✅ Loaded ${milestones.length} milestones from JSON API`);
    return milestones;
    
  } catch (error) {
    console.error('❌ Error loading milestones from JSON API:', error);
    return [];
  }
}

/**
 * Clear achievements cache
 */
export function clearAchievementsCache(): void {
  cachedAchievements = null;
  achievementsLastModified = null;
}

/**
 * Clear steps cache
 */
export function clearStepsCache(): void {
  cachedSteps = null;
  stepsLastModified = null;
}

/**
 * Clear JSON milestones cache
 */
export function clearJsonMilestonesCache(): void {
  cachedJsonMilestones = null;
  jsonMilestonesLastModified = null;
}

/**
 * Filter milestones based on criteria
 */
export function filterMilestones(
  milestones: MilestoneData[],
  filters: MilestoneFilters
): MilestoneData[] {
  return milestones.filter(milestone => {
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(milestone.category)) {
        return false;
      }
    }
    
    // Age range filter
    if (filters.ageRanges && filters.ageRanges.length > 0) {
      if (!filters.ageRanges.includes(milestone.ageRangeKey)) {
        return false;
      }
    }
    
    // Period filter
    if (filters.periods && filters.periods.length > 0) {
      if (!filters.periods.includes(milestone.period)) {
        return false;
      }
    }
    
    // Importance filter
    if (filters.importance && filters.importance.length > 0) {
      if (!filters.importance.includes(milestone.importance)) {
        return false;
      }
    }
    
    // Search term filter
    if (filters.searchTerm && filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      const searchableText = [
        milestone.title,
        milestone.description,
        milestone.observationTips,
        milestone.supportStrategies,
        ...(milestone.skills || []),
        ...(milestone.prerequisites || [])
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(term)) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Get milestones for a specific age range
 */
export function getMilestonesForAgeRange(
  milestones: MilestoneData[],
  startMonths: number,
  endMonths: number,
  categories?: string[]
): MilestoneData[] {
  return milestones.filter(milestone => {
    // Check if milestone overlaps with the requested age range
    const overlaps = milestone.startMonths < endMonths && milestone.endMonths > startMonths;
    
    if (!overlaps) return false;
    
    // Category filter if provided
    if (categories && categories.length > 0) {
      return categories.includes(milestone.category);
    }
    
    return true;
  });
}
