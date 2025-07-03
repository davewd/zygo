// Timeline-specific types and interfaces
import React from 'react';

export interface ZoomLevel {
  level: number;
  name: string;
  description: string;
  nodeTypes: ('milestone' | 'keyMilestone' | 'category' | 'ageGroup' | 'achievement' | 'step')[];
  timeSpan: {
    minAgeMonths: number;
    maxAgeMonths: number;
  };
}

export type DevelopmentCategory =
  | 'physical'
  | 'cognitive'
  | 'social_emotional'
  | 'language'
  | 'motor_skills'
  | 'sensory'
  | 'self_care'
  | 'academic';

export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'deferred' | 'not_applicable';

export interface TimelineNode {
  id: string;
  type: 'milestone' | 'keyMilestone' | 'category' | 'ageGroup' | 'achievement' | 'step';
  data: any;
  position: { x: number; y: number };
  style?: Record<string, any>;
  draggable?: boolean;
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  style?: Record<string, any>;
  label?: string;
  markerEnd?: {
    type: any;
    color?: string;
  };
}

export interface TimelineZoomLevel {
  level: number;
  name: string;
  description: string;
  nodeTypes: ('milestone' | 'keyMilestone' | 'category' | 'ageGroup' | 'achievement' | 'step')[];
  timeSpan: {
    minAgeMonths: number;
    maxAgeMonths: number;
  };
}

export interface PedagogyProfile {
  id: string;
  familyId: string;
  name: string;
  description: string;
  familyMembers: any[];
  milestones: any[];
  milestoneProgress: any[];
  customizations: any;
  createdDate: string;
  modifiedDate: string;
}

export interface MilestoneData {
  id: string;
  title: string;
  description: string;
  category: DevelopmentCategory;
  ageRange: string;
  ageRangeKey: string;
  months: [number, number];
  period: string;
  isTypical: boolean;
  isKeyMilestone?: boolean;
  importance: string;
  prerequisites?: string[];
  createdDate: string;
  modifiedDate: string;
  isCompleted: boolean;
  isCurrentGoal?: boolean;
}

export interface AgeRange {
  key: string;
  range: string;
  description: string;
  months: [number, number];
}

export interface TimelinePedagogyProps {
  pedagogyData?: PedagogyProfile;
  onNodeClick?: (nodeId: string, nodeData: any) => void;
  profileAvatarSelector?: React.ReactNode;
}

export interface ReactFlowInnerComponentProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onNodeClick: any;
  currentZoomLevel: number;
  zoomLevels: TimelineZoomLevel[];
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleFocusNode: (nodeId: string) => void;
  focusNodeId: string | null;
  focusArea: string | null;
  selectedCategories: DevelopmentCategory[];
  toggleCategoryFilter: (category: DevelopmentCategory) => void;
  clearAllFilters: () => void;
  selectedFamilyMembers: string[];
  setSelectedFamilyMembers: React.Dispatch<React.SetStateAction<string[]>>;
  pedagogyData?: PedagogyProfile;
  onCanvasWidthChange: (width: number) => void;
}

// Layout calculation types
export interface LayoutParams {
  centerX: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  padding: number;
}

export interface NodeDimensions {
  width: number;
  height: number;
}

export interface PositionCalculationResult {
  positions: Map<string, { x: number; y: number }>;
  nodeWidths: Map<string, number>;
  nodeHeights: Map<string, number>;
}
