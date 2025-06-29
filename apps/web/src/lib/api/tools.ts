// Tools API
// Functions for managing tool categories and tool data

import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  route: string;
  comingSoon: boolean;
}

export interface ToolCategory {
  title: string;
  description: string;
  tools: Tool[];
}

export interface ToolsAPIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Note: Since we can't import Lucide icons in a JSON/API context, 
// we'll return the icon names as strings and let the component handle the imports
interface ToolData {
  id: string;
  name: string;
  description: string;
  iconName: string;
  iconColor: string;
  bgColor: string;
  route: string;
  comingSoon: boolean;
}

interface ToolCategoryData {
  title: string;
  description: string;
  tools: ToolData[];
}

// Mock data for tool categories
const MOCK_TOOL_CATEGORIES: ToolCategoryData[] = [
  {
    title: 'Planning & Organization',
    description: 'Tools to help you plan and organize family activities',
    tools: [
      {
        id: 'holiday-planner',
        name: 'Holiday Planner',
        description: 'Plan activities and playdates for your children during holiday weeks',
        iconName: 'Calendar',
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        route: '/tools/holiday-planner',
        comingSoon: false,
      },
    ],
  },
  {
    title: 'Postnatal & Early Development',
    description: "Tools to support the early stages of your baby's life",
    tools: [
      {
        id: 'breastfeeding-timer',
        name: 'Breastfeeding Timer',
        description: 'Track feeding sessions with dual-breast timers and session history',
        iconName: 'Baby',
        iconColor: 'text-pink-600',
        bgColor: 'bg-pink-50',
        route: '/tools/postnatal/breastfeeding-timer',
        comingSoon: false,
      },
      {
        id: 'sleep-tracker',
        name: 'Sleep Tracker',
        description: 'Monitor sleep patterns and nap schedules',
        iconName: 'Clock',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        route: '/tools/postnatal/sleep-tracker',
        comingSoon: true,
      },
    ],
  },
  {
    title: 'Health & Wellness',
    description: 'Tools to monitor and support family health',
    tools: [
      {
        id: 'growth-tracker',
        name: 'Growth Tracker',
        description: 'Record height, weight, and development milestones',
        iconName: 'Heart',
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50',
        route: '/tools/health/growth-tracker',
        comingSoon: true,
      },
      {
        id: 'medication-reminder',
        name: 'Medication Reminder',
        description: 'Set reminders for medications and supplements',
        iconName: 'Timer',
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50',
        route: '/tools/health/medication-reminder',
        comingSoon: true,
      },
    ],
  },
  {
    title: 'Resources & Library',
    description: 'Access educational materials, guides, and expert content',
    tools: [
      {
        id: 'resource-library',
        name: 'Resource Library',
        description:
          'Browse books, guides, meal plans, and educational materials from our expert providers',
        iconName: 'Library',
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        route: '/library',
        comingSoon: false,
      },
    ],
  },
];

/**
 * Fetch all tool categories
 */
export async function getToolCategories(): Promise<ToolsAPIResponse<ToolCategoryData[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      data: MOCK_TOOL_CATEGORIES,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching tool categories:', error);
    return {
      error: 'Failed to fetch tool categories',
      success: false,
    };
  }
}

/**
 * Fetch a specific tool by ID
 */
export async function getToolById(toolId: string): Promise<ToolsAPIResponse<ToolData | null>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Find the tool across all categories
    for (const category of MOCK_TOOL_CATEGORIES) {
      const tool = category.tools.find(t => t.id === toolId);
      if (tool) {
        return {
          data: tool,
          success: true,
        };
      }
    }
    
    return {
      data: null,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching tool by ID:', error);
    return {
      error: 'Failed to fetch tool',
      success: false,
    };
  }
}

/**
 * Fetch available tools (non-coming-soon)
 */
export async function getAvailableTools(): Promise<ToolsAPIResponse<ToolData[]>> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 180));
    
    const availableTools: ToolData[] = [];
    MOCK_TOOL_CATEGORIES.forEach(category => {
      category.tools.forEach(tool => {
        if (!tool.comingSoon) {
          availableTools.push(tool);
        }
      });
    });
    
    return {
      data: availableTools,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching available tools:', error);
    return {
      error: 'Failed to fetch available tools',
      success: false,
    };
  }
}

// Export the type for use in components
export type { ToolCategoryData, ToolData };

