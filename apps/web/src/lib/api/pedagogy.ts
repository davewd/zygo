/**
 * Pedagogy API
 * 
 * Mock API functions for accessing pedagogy data.
 * This provides a clean interface for accessing pedagogy data as if it were coming from an API.
 */

import pedagogyData from './data/pedagogy.json';

// Type definitions based on actual data structure
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  profileImage: string;
  isActive: boolean;
  joinedDate: string;
}

export interface MilestoneResource {
  type: string;
  title: string;
  url?: string;
  description: string;
}

export interface MilestoneMeasurable {
  metric: string;
  target: number;
  unit: string;
}

export interface Milestone {
  id: string;
  type: 'simple' | 'composite';
  title: string;
  description: string;
  category: string;
  ageRange: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  priority: string;
  subMilestones?: string[];
  completionCriteria?: string;
  criteria?: string;
  prerequisites?: string[];
  resources: MilestoneResource[];
  tags: string[];
  createdDate: string;
  modifiedDate: string;
  version: number;
  measurable?: MilestoneMeasurable;
  baseTemplate?: string;
  adaptations?: any[];
}

export interface MilestoneProgress {
  familyMemberId: string;
  status: string;
  dateStarted?: string;
  dateCompleted?: string;
  notes?: string;
  evidence?: any[];
}

export interface PersonalizationSettings {
  categoryWeights: {
    language: number;
    cognitive: number;
    physical: number;
    social_emotional: number;
  };
  priorityAdjustments: Array<{
    milestoneId: string;
    newPriority: string;
  }>;
  hiddenCategories: string[];
  additionalMilestones: any[];
}

export interface Pedagogy {
  id: string;
  familyId: string;
  name: string;
  description: string;
  basedOnTemplate: string;
  familyMembers: FamilyMember[];
  milestones: Milestone[];
  milestoneProgress: MilestoneProgress[];
  customizations: PersonalizationSettings;
  personalizationSettings: PersonalizationSettings;
  createdDate: string;
  modifiedDate: string;
}

// API Functions

/**
 * Get complete pedagogy data
 */
export async function getPedagogyData(): Promise<Pedagogy> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData as unknown as Pedagogy;
}

/**
 * Get family members
 */
export async function getFamilyMembers(): Promise<FamilyMember[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.familyMembers as FamilyMember[];
}

/**
 * Get family member by ID
 */
export async function getFamilyMemberById(id: string): Promise<FamilyMember | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const member = pedagogyData.familyMembers.find(m => m.id === id);
  return member ? member as FamilyMember : null;
}

/**
 * Get children from family members (filter by relationship)
 */
export async function getChildren(): Promise<FamilyMember[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.familyMembers.filter(member => member.relationship === 'child') as FamilyMember[];
}

/**
 * Get child by ID
 */
export async function getChildById(id: string): Promise<FamilyMember | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const child = pedagogyData.familyMembers.find(m => m.id === id && m.relationship === 'child');
  return child ? child as FamilyMember : null;
}

/**
 * Get active children
 */
export async function getActiveChildren(): Promise<FamilyMember[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.familyMembers.filter(member => 
    member.relationship === 'child' && member.isActive
  ) as FamilyMember[];
}

/**
 * Get all milestones
 */
export async function getMilestones(): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones as Milestone[];
}

/**
 * Get milestone by ID
 */
export async function getMilestoneById(id: string): Promise<Milestone | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const milestone = pedagogyData.milestones.find(m => m.id === id);
  return milestone ? milestone as Milestone : null;
}

/**
 * Get milestones by category
 */
export async function getMilestonesByCategory(category: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => 
    m.category.toLowerCase() === category.toLowerCase()
  ) as Milestone[];
}

/**
 * Get milestones by age range
 */
export async function getMilestonesByAgeRange(minMonths: number, maxMonths: number): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => 
    m.minAgeMonths <= maxMonths && m.maxAgeMonths >= minMonths
  ) as Milestone[];
}

/**
 * Get composite milestones (those with sub-milestones)
 */
export async function getCompositeMilestones(): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => m.type === 'composite') as Milestone[];
}

/**
 * Get simple milestones
 */
export async function getSimpleMilestones(): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => m.type === 'simple') as Milestone[];
}

/**
 * Get milestones by priority
 */
export async function getMilestonesByPriority(priority: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => 
    m.priority.toLowerCase() === priority.toLowerCase()
  ) as Milestone[];
}

/**
 * Get milestones with prerequisites
 */
export async function getMilestonesWithPrerequisites(): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return pedagogyData.milestones.filter(m => m.prerequisites && m.prerequisites.length > 0) as Milestone[];
}

/**
 * Get personalization settings
 */
export async function getPersonalizationSettings(): Promise<PersonalizationSettings> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return (pedagogyData as any).personalizationSettings as PersonalizationSettings;
}

/**
 * Search milestones by title or description
 */
export async function searchMilestones(query: string): Promise<Milestone[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const lowercaseQuery = query.toLowerCase();
  return pedagogyData.milestones.filter(m => 
    m.title.toLowerCase().includes(lowercaseQuery) || 
    m.description.toLowerCase().includes(lowercaseQuery) ||
    m.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  ) as Milestone[];
}

/**
 * Get milestone resources by milestone ID
 */
export async function getMilestoneResources(milestoneId: string): Promise<MilestoneResource[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const milestone = pedagogyData.milestones.find(m => m.id === milestoneId);
  return milestone ? milestone.resources as MilestoneResource[] : [];
}

/**
 * Get available categories
 */
export async function getCategories(): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const categories = new Set(pedagogyData.milestones.map(m => m.category));
  return Array.from(categories);
}
