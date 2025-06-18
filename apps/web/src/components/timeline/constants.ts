import { DevelopmentCategory, TimelineZoomLevel } from './types';

export const DEVELOPMENT_CATEGORIES: DevelopmentCategory[] = [
  'physical',
  'cognitive',
  'social_emotional',
  'language',
  'motor_skills',
  'sensory',
  'self_care',
  'academic',
];

export const ZOOM_LEVELS: TimelineZoomLevel[] = [
  {
    level: 0,
    name: 'Overview',
    description: 'Complete timeline overview from prenatal to 18 years',
    nodeTypes: ['ageGroup'],
    timeSpan: { minAgeMonths: -12, maxAgeMonths: 216 }, // -12 months to 18 years
  },
  {
    level: 1,
    name: 'Age Group Focus',
    description: 'Focused view on specific age groups and milestones',
    nodeTypes: ['ageGroup', 'milestone'],
    timeSpan: { minAgeMonths: -12, maxAgeMonths: 60 }, // Prenatal to 5 years focus
  },
  {
    level: 2,
    name: 'Milestone Deep Dive',
    description: 'Detailed view of individual milestones and progress',
    nodeTypes: ['milestone'],
    timeSpan: { minAgeMonths: -12, maxAgeMonths: 36 }, // Prenatal to 3 years focus
  },
];

export const CATEGORY_COLORS = {
  physical: {
    light: 'bg-red-100 border-red-300 text-red-800',
    lighter: 'bg-red-50 border-red-200 text-red-800',
    stroke: '#ef4444',
  },
  cognitive: {
    light: 'bg-blue-100 border-blue-300 text-blue-800',
    lighter: 'bg-blue-50 border-blue-200 text-blue-800',
    stroke: '#3b82f6',
  },
  social_emotional: {
    light: 'bg-green-100 border-green-300 text-green-800',
    lighter: 'bg-green-50 border-green-200 text-green-800',
    stroke: '#10b981',
  },
  language: {
    light: 'bg-purple-100 border-purple-300 text-purple-800',
    lighter: 'bg-purple-50 border-purple-200 text-purple-800',
    stroke: '#8b5cf6',
  },
  motor_skills: {
    light: 'bg-orange-100 border-orange-300 text-orange-800',
    lighter: 'bg-orange-50 border-orange-200 text-orange-800',
    stroke: '#f97316',
  },
  sensory: {
    light: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    lighter: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    stroke: '#eab308',
  },
  self_care: {
    light: 'bg-pink-100 border-pink-300 text-pink-800',
    lighter: 'bg-pink-50 border-pink-200 text-pink-800',
    stroke: '#ec4899',
  },
  academic: {
    light: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    lighter: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    stroke: '#6366f1',
  },
} as const;

export const DEFAULT_CATEGORY_COLORS = {
  light: 'bg-gray-100 border-gray-300 text-gray-800',
  lighter: 'bg-gray-50 border-gray-200 text-gray-800',
  stroke: '#6b7280',
};

export const NODE_DIMENSIONS = {
  ageGroup: { width: 400, height: 200 },
  category: { width: 340, height: 180 },
  milestone: { width: 300, height: 160 },
  default: { width: 200, height: 120 },
} as const;
