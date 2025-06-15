
export enum DevelopmentCategory {
  PHYSICAL = 'physical',
  COGNITIVE = 'cognitive',
  SOCIAL_EMOTIONAL = 'social_emotional',
  LANGUAGE = 'language',
  MOTOR_SKILLS = 'motor_skills',
  SENSORY = 'sensory',
  SELF_CARE = 'self_care',
  ACADEMIC = 'academic',
  CREATIVE = 'creative',
  PLAY_BASED = 'play_based',
  RECREATIONAL = 'recreational'
}

export enum AgeRange {
  NEWBORN = '0-3months',
  INFANT = '3-12months',
  TODDLER = '1-3years',
  PRESCHOOL = '3-5years',
  SCHOOL_AGE = '5-12years',
  ADOLESCENT = '12-18years',
  ADULT = '18+years'
}

export enum MilestoneStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DEFERRED = 'deferred',
  NOT_APPLICABLE = 'not_applicable'
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string; // parent, child, grandparent, etc.
  dateOfBirth: string;
  profileImage?: string;
  isActive: boolean; // current vs historic
  joinedDate: string;
  leftDate?: string;
}

export interface MilestoneEvidence {
  id: string;
  type: 'photo' | 'video' | 'audio' | 'text' | 'document';
  url?: string;
  description: string;
  dateRecorded: string;
  recordedBy: string; // FamilyMember id
}

export interface MilestoneProgress {
  familyMemberId: string;
  status: MilestoneStatus;
  dateStarted?: string;
  dateCompleted?: string;
  notes?: string;
  evidence: MilestoneEvidence[];
  customAdaptations?: string; // How the milestone was adapted for this family member
}

export interface BaseMilestone {
  id: string;
  title: string;
  description: string;
  category: DevelopmentCategory;
  ageRange: AgeRange;
  minAgeMonths: number;
  maxAgeMonths: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  prerequisites?: string[]; // Milestone IDs that should be completed first
  resources?: {
    type: 'article' | 'video' | 'book' | 'activity' | 'tool';
    title: string;
    url?: string;
    description: string;
  }[];
  tags: string[];
  createdDate: string;
  modifiedDate: string;
  version: number;
}

// Polymorphic milestone types
export interface CompositeMilestone extends BaseMilestone {
  type: 'composite';
  subMilestones: string[]; // IDs of child milestones
  completionCriteria: 'all' | 'majority' | 'any'; // How many sub-milestones need completion
}

export interface SimpleMilestone extends BaseMilestone {
  type: 'simple';
  criteria: string; // Specific criteria for completion
  measurable?: {
    metric: string;
    target: number;
    unit: string;
  };
}

export interface AdaptiveMilestone extends BaseMilestone {
  type: 'adaptive';
  baseTemplate: string; // Reference to a base milestone
  adaptations: {
    condition: string; // e.g., "hearing_impaired", "premature_birth"
    modifications: {
      title?: string;
      description?: string;
      criteria?: string;
      ageAdjustment?: number; // months to add/subtract
      additionalResources?: BaseMilestone['resources'];
    };
  }[];
}

export type Milestone = SimpleMilestone | CompositeMilestone | AdaptiveMilestone;

export interface PedagogyProfile {
  id: string;
  familyId: string;
  name: string;
  description: string;
  basedOnTemplate?: string; // Reference to a standard pedagogy template
  milestones: Milestone[];
  familyMembers: FamilyMember[];
  milestoneProgress: MilestoneProgress[];
  customizations: {
    categoryWeights: Partial<Record<DevelopmentCategory, number>>;
    priorityAdjustments: { milestoneId: string; newPriority: BaseMilestone['priority'] }[];
    hiddenCategories: DevelopmentCategory[];
    additionalMilestones: Milestone[];
  };
  createdDate: string;
  modifiedDate: string;
}

export interface TimelineNode {
  id: string;
  type: 'milestone' | 'category' | 'ageGroup';
  data: {
    milestone?: Milestone;
    category?: DevelopmentCategory;
    ageRange?: AgeRange;
    title: string;
    description?: string;
    progress?: MilestoneProgress[];
    familyMembers?: FamilyMember[];
    completionPercentage?: number;
    isExpanded?: boolean;
  };
  position: { x: number; y: number };
  style?: Record<string, any>;
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  style?: Record<string, any>;
  label?: string;
}

export interface TimelineZoomLevel {
  level: number;
  name: string;
  description: string;
  nodeTypes: ('milestone' | 'category' | 'ageGroup')[];
  timeSpan: {
    minAgeMonths: number;
    maxAgeMonths: number;
  };
}

export interface TimelineView {
  id: string;
  name: string;
  zoomLevels: TimelineZoomLevel[];
  currentZoomLevel: number;
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  filters: {
    categories: DevelopmentCategory[];
    ageRanges: AgeRange[];
    familyMembers: string[];
    statuses: MilestoneStatus[];
  };
  viewportBounds: {
    x: number;
    y: number;
    zoom: number;
  };
}
