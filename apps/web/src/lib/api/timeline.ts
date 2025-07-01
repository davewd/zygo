/**
 * Timeline API
 * 
 * Mock API functions for accessing timeline data (milestones, achievements, steps).
 * This provides a clean interface for accessing timeline data as if it were coming from an API.
 */

import achievementsData from './data/timeline/achievements.json';
import ageRangesData from './data/timeline/age-ranges.json';
import milestonesData from './data/timeline/milestones.json';
import stepsData from './data/timeline/steps.json';

// Type definitions
export type MilestoneImportance = 'low' | 'medium' | 'high' | 'critical';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: string;
  ageRangeKey: string;
  ageRange: string;
  startMonths: number;
  endMonths: number;
  period: string;
  importance: MilestoneImportance;
  isTypical: boolean;
  prerequisites: string[];
  skills: string[];
  observationTips: string;
  supportStrategies: string;
  redFlags: string;
  resources: string;
  createdDate: string;
  modifiedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  fromMilestone: string;
  toMilestone: string;
  ageRangeKey: string;
  stepCount: number;
  prerequisites: string[];
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

export interface AgeRange {
  range: string;
  key: string;
  description: string;
  months: [number, number];
  period: string;
}

// API Functions

/**
 * Get all milestones
 */
export async function getAllMilestones(): Promise<Milestone[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 10));
  return milestonesData as Milestone[];
}

/**
 * Get milestone by ID
 */
export async function getMilestoneById(id: string): Promise<Milestone | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const milestone = milestonesData.find(m => m.id === id);
  return milestone ? milestone as Milestone : null;
}

/**
 * Get milestones by category
 */
export async function getMilestonesByCategory(category: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return milestonesData.filter(m => m.category === category) as Milestone[];
}

/**
 * Get milestones by period
 */
export async function getMilestonesByPeriod(period: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return milestonesData.filter(m => m.period === period) as Milestone[];
}

/**
 * Get milestones by age range
 */
export async function getMilestonesByAgeRange(startMonths: number, endMonths: number): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return milestonesData.filter(m => 
    m.startMonths >= startMonths && m.endMonths <= endMonths
  ) as Milestone[];
}

/**
 * Get key milestones
 */
export async function getKeyMilestones(): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const keyMilestoneIds = ['conception', 'birth', 'puberty', 'legal_adult'];
  return milestonesData.filter(m => 
    keyMilestoneIds.includes(m.id) ||
    keyMilestoneIds.some(key => m.id.includes(key) || m.title.toLowerCase().includes(key))
  ) as Milestone[];
}

/**
 * Get all achievements
 */
export async function getAllAchievements(): Promise<Achievement[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return achievementsData as Achievement[];
}

/**
 * Get achievement by ID
 */
export async function getAchievementById(id: string): Promise<Achievement | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const achievement = achievementsData.find(a => a.id === id);
  return achievement ? achievement as Achievement : null;
}

/**
 * Get achievements by category
 */
export async function getAchievementsByCategory(category: string): Promise<Achievement[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return achievementsData.filter(a => a.category === category) as Achievement[];
}

/**
 * Get all steps
 */
export async function getAllSteps(): Promise<Step[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return stepsData as Step[];
}

/**
 * Get step by ID
 */
export async function getStepById(id: string): Promise<Step | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const step = stepsData.find(s => s.id === id);
  return step ? step as Step : null;
}

/**
 * Get steps by achievement ID
 */
export async function getStepsByAchievementId(achievementId: string): Promise<Step[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return stepsData.filter(s => s.achievementId === achievementId) as Step[];
}

/**
 * Get all age ranges
 */
export async function getAllAgeRanges(): Promise<AgeRange[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return ageRangesData as AgeRange[];
}

/**
 * Get age range by key
 */
export async function getAgeRangeByKey(key: string): Promise<AgeRange | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const ageRange = ageRangesData.find(ar => ar.key === key);
  return ageRange ? ageRange as AgeRange : null;
}

/**
 * Get timeline data for a specific age range
 */
export async function getTimelineDataForAge(startMonths: number, endMonths: number) {
  const [milestones, achievements, steps] = await Promise.all([
    getMilestonesByAgeRange(startMonths, endMonths),
    getAllAchievements(),
    getAllSteps()
  ]);

  // Filter achievements and steps that relate to the milestones in this age range
  const milestoneIds = milestones.map(m => m.id);
  const relevantAchievements = achievements.filter(a => 
    milestoneIds.includes(a.fromMilestone) || milestoneIds.includes(a.toMilestone)
  );
  const achievementIds = relevantAchievements.map(a => a.id);
  const relevantSteps = steps.filter(s => achievementIds.includes(s.achievementId));

  return {
    milestones,
    achievements: relevantAchievements,
    steps: relevantSteps
  };
}

/**
 * Validate timeline data integrity
 */
export async function validateTimelineIntegrity() {
  const [milestones, achievements, steps] = await Promise.all([
    getAllMilestones(),
    getAllAchievements(),
    getAllSteps()
  ]);

  const milestoneIds = milestones.map(m => m.id);
  const achievementIds = achievements.map(a => a.id);

  const validation = {
    milestonesCount: milestones.length,
    achievementsCount: achievements.length,
    stepsCount: steps.length,
    
    // Check prerequisite references
    invalidPrerequisites: milestones.filter(m => 
      m.prerequisites.some(prereq => !milestoneIds.includes(prereq))
    ).map(m => ({ id: m.id, invalidPrereqs: m.prerequisites.filter(p => !milestoneIds.includes(p)) })),
    
    // Check achievement references
    invalidAchievementRefs: achievements.filter(a => 
      !milestoneIds.includes(a.fromMilestone) || !milestoneIds.includes(a.toMilestone)
    ).map(a => ({ 
      id: a.id, 
      invalidFrom: !milestoneIds.includes(a.fromMilestone), 
      invalidTo: !milestoneIds.includes(a.toMilestone) 
    })),
    
    // Check step references
    invalidStepRefs: steps.filter(s => 
      !achievementIds.includes(s.achievementId)
    ).map(s => ({ id: s.id, invalidAchievement: s.achievementId })),
    
    keyMilestones: await getKeyMilestones()
  };

  return validation;
}
