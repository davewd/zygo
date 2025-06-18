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

// Cache for parsed data
let cachedMilestones: MilestoneData[] | null = null;
let lastModified: number | null = null;

/**
 * Generate comprehensive age ranges from -12 months to 18 years
 */
export function generateAgeRanges(): AgeRange[] {
  const ranges: AgeRange[] = [];
  
  // Prenatal period: -12 months to 0 months (2 ranges)
  ranges.push(
    {
      range: '-12 to -6 months',
      key: 'prenatal_early',
      description: 'Early prenatal development',
      months: [-12, -6],
      period: 'prenatal'
    },
    {
      range: '-6 to 0 months',
      key: 'prenatal_late',
      description: 'Late prenatal development',
      months: [-6, 0],
      period: 'prenatal'
    }
  );
  
  // Generate age ranges from 0 to 18 years (216 months) in 6-month intervals
  for (let months = 0; months <= 216; months += 6) {
    const endMonths = Math.min(months + 6, 216);
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
    
    // Format range display
    const formatRange = (start: number, end: number) => {
      if (start === 0 && end === 6) return '0-6 months';
      if (start < 12 && end <= 12) return `${start}-${end} months`;
      
      const startYears = Math.floor(start / 12);
      const endYears = Math.floor(end / 12);
      
      if (startYears === endYears) {
        const startRemainder = start % 12;
        const endRemainder = end % 12;
        
        if (startRemainder === 0 && endRemainder === 0) {
          return `${startYears} years`;
        } else {
          return `${startYears}y ${startRemainder}m - ${startYears}y ${endRemainder}m`;
        }
      } else {
        const startRemainder = start % 12;
        const endRemainder = end % 12;
        
        if (startRemainder === 0 && endRemainder === 0) {
          return `${startYears}-${endYears} years`;
        } else {
          return `${startYears}y ${startRemainder}m - ${endYears}y ${endRemainder}m`;
        }
      }
    };
    
    ranges.push({
      range: formatRange(months, endMonths),
      key: key,
      description: description,
      months: [months, endMonths]
    });
  }
  
  return ranges;
}

/**
 * Load milestones from CSV file
 */
export async function loadMilestonesFromCSV(): Promise<MilestoneData[]> {
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
    
    // Return fallback comprehensive milestones if CSV fails
    return generateFallbackMilestones();
  }
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

/**
 * Get milestone statistics
 */
export function getMilestoneStatistics(milestones: MilestoneData[]) {
  const stats = {
    total: milestones.length,
    byCategory: {} as Record<string, number>,
    byPeriod: {} as Record<string, number>,
    byImportance: {} as Record<string, number>,
    ageRangeCoverage: {
      min: Math.min(...milestones.map(m => m.startMonths)),
      max: Math.max(...milestones.map(m => m.endMonths))
    }
  };
  
  milestones.forEach(milestone => {
    // Count by category
    stats.byCategory[milestone.category] = (stats.byCategory[milestone.category] || 0) + 1;
    
    // Count by period
    stats.byPeriod[milestone.period] = (stats.byPeriod[milestone.period] || 0) + 1;
    
    // Count by importance
    stats.byImportance[milestone.importance] = (stats.byImportance[milestone.importance] || 0) + 1;
  });
  
  return stats;
}

/**
 * Generate fallback milestones if CSV loading fails
 */
export function generateFallbackMilestones(): MilestoneData[] {
  const ageRanges = generateAgeRanges();
  const categories = ['physical', 'cognitive', 'social_emotional', 'language'];
  const milestones: MilestoneData[] = [];
  
  // Milestone templates by period and category
  const templates = {
    prenatal: {
      physical: [
        'Neural tube formation and early brain development',
        'Organ formation and basic body structure development'
      ],
      cognitive: [
        'Basic neural pathway formation',
        'Sensory organ development and initial response capabilities'
      ],
      social_emotional: [
        'Response to maternal stress and emotions',
        'Initial bonding preparation through maternal interactions'
      ],
      language: [
        'Auditory system development for hearing',
        'Vocal cord formation and preparation for sound production'
      ]
    },
    infancy: {
      physical: [
        'Head control and neck strength',
        'Rolling over and basic mobility',
        'Sitting with and without support',
        'Crawling and pulling to stand',
        'First steps and independent walking'
      ],
      cognitive: [
        'Visual tracking and focus',
        'Object permanence understanding',
        'Cause and effect recognition',
        'Problem-solving with toys',
        'Memory development and recognition'
      ],
      social_emotional: [
        'Social smiling and interaction',
        'Attachment formation with caregivers',
        'Stranger awareness and anxiety',
        'Emotional regulation development',
        'Basic social play and interaction'
      ],
      language: [
        'Cooing and early vocalizations',
        'Babbling and sound experimentation',
        'First words and meaningful sounds',
        'Understanding simple commands',
        'Basic vocabulary development'
      ]
    },
    early_childhood: {
      physical: [
        'Running and advanced mobility',
        'Climbing and playground skills',
        'Fine motor development and tool use',
        'Toilet training and self-care',
        'Advanced coordination and balance'
      ],
      cognitive: [
        'Symbolic thinking and pretend play',
        'Basic counting and number concepts',
        'Pattern recognition and sorting',
        'Memory games and recall',
        'Problem-solving strategies'
      ],
      social_emotional: [
        'Parallel play with other children',
        'Emotional expression and labeling',
        'Sharing and turn-taking',
        'Independence and autonomy',
        'Empathy and caring behaviors'
      ],
      language: [
        'Two-word phrases and combinations',
        'Vocabulary expansion and naming',
        'Following multi-step instructions',
        'Asking questions and curiosity',
        'Story understanding and retelling'
      ]
    },
    preschool: {
      physical: [
        'Advanced gross motor skills',
        'Pre-writing and drawing skills',
        'Sports and recreational activities',
        'Self-care and hygiene independence',
        'Complex playground navigation'
      ],
      cognitive: [
        'Pre-academic skills development',
        'Mathematical concepts and operations',
        'Scientific thinking and exploration',
        'Memory strategies and learning',
        'Abstract thinking introduction'
      ],
      social_emotional: [
        'Cooperative play and friendship',
        'Emotional self-regulation',
        'Conflict resolution skills',
        'Leadership and following',
        'Cultural awareness and diversity'
      ],
      language: [
        'Complex sentence formation',
        'Reading readiness and phonics',
        'Storytelling and narrative skills',
        'Conversational abilities',
        'Early literacy development'
      ]
    },
    school_age: {
      physical: [
        'Team sports participation',
        'Advanced fine motor precision',
        'Physical endurance development',
        'Coordination and athletic skills',
        'Health and fitness awareness'
      ],
      cognitive: [
        'Academic subject mastery',
        'Critical thinking development',
        'Research and study skills',
        'Technology literacy',
        'Creative problem solving'
      ],
      social_emotional: [
        'Peer relationship navigation',
        'Moral reasoning development',
        'Self-concept and identity',
        'Responsibility and accountability',
        'Community involvement'
      ],
      language: [
        'Advanced reading comprehension',
        'Written communication skills',
        'Vocabulary expansion',
        'Multiple language exposure',
        'Communication across contexts'
      ]
    },
    adolescence: {
      physical: [
        'Puberty and physical changes',
        'Advanced athletic performance',
        'Body image and health awareness',
        'Physical independence',
        'Health decision making'
      ],
      cognitive: [
        'Abstract reasoning mastery',
        'Future planning and goal setting',
        'Complex problem solving',
        'Academic specialization',
        'Career exploration'
      ],
      social_emotional: [
        'Identity formation and exploration',
        'Peer influence and independence',
        'Romantic relationships',
        'Values and belief development',
        'Social responsibility'
      ],
      language: [
        'Advanced communication skills',
        'Professional presentation abilities',
        'Creative expression',
        'Multilingual competency',
        'Digital communication literacy'
      ]
    }
  };
  
  ageRanges.forEach((ageRange, rangeIndex) => {
    const period = ageRange.period;
    const periodTemplates = templates[period as keyof typeof templates];
    
    if (periodTemplates) {
      categories.forEach((category, categoryIndex) => {
        const categoryTemplates = periodTemplates[category as keyof typeof periodTemplates];
        
        if (categoryTemplates && categoryTemplates.length > 0) {
          // Create 1-2 milestones per category per age range
          const milestonesToCreate = Math.min(categoryTemplates.length, 2);
          
          for (let i = 0; i < milestonesToCreate; i++) {
            const template = categoryTemplates[i];
            const milestoneId = `${period}_${category}_${ageRange.key}_${i}`;
            
            milestones.push({
              id: milestoneId,
              title: template,
              description: `Important developmental milestone for ${category} development during ${period}`,
              category: category,
              ageRangeKey: ageRange.key,
              ageRange: ageRange.range,
              startMonths: ageRange.months[0],
              endMonths: ageRange.months[1],
              period: period,
              importance: categoryIndex === 0 ? 'high' : 'medium',
              isTypical: true,
              prerequisites: rangeIndex > 0 ? [`${templates[period as keyof typeof templates] ? Object.keys(templates)[Math.max(0, Object.keys(templates).indexOf(period) - 1)] : 'infancy'}_${category}_milestone`] : [],
              skills: [template.split(' ').slice(0, 3).join(' ')],
              observationTips: `Observe child's progress with ${template.toLowerCase()}`,
              supportStrategies: `Encourage practice and provide support for ${template.toLowerCase()}`,
              redFlags: `Significant delays or regression in ${template.toLowerCase()}`,
              resources: `Educational activities for ${template.toLowerCase()}`,
              createdDate: new Date().toISOString(),
              modifiedDate: new Date().toISOString(),
            });
          }
        }
      });
    }
  });
  
  return milestones;
}

/**
 * Export milestones to CSV format
 */
export function exportMilestonesToCSV(milestones: MilestoneData[]): string {
  const headers = [
    'id', 'title', 'description', 'category', 'ageRangeKey', 'ageRange',
    'startMonths', 'endMonths', 'period', 'importance', 'isTypical',
    'prerequisites', 'skills', 'observationTips', 'supportStrategies',
    'redFlags', 'resources', 'createdDate', 'modifiedDate'
  ];
  
  const csvData = milestones.map(milestone => [
    milestone.id,
    milestone.title,
    milestone.description,
    milestone.category,
    milestone.ageRangeKey,
    milestone.ageRange,
    milestone.startMonths,
    milestone.endMonths,
    milestone.period,
    milestone.importance,
    milestone.isTypical,
    (milestone.prerequisites || []).join(','),
    (milestone.skills || []).join(','),
    milestone.observationTips,
    milestone.supportStrategies,
    milestone.redFlags,
    milestone.resources,
    milestone.createdDate,
    milestone.modifiedDate
  ]);
  
  return Papa.unparse({
    fields: headers,
    data: csvData
  });
}

/**
 * Clear cached data (useful for development/testing)
 */
export function clearMilestoneCache(): void {
  cachedMilestones = null;
  lastModified = null;
}
