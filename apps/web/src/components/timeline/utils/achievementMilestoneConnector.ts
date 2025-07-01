/**
 * Achievement-Milestone Connection Algorithm
 * 
 * This module provides algorithmic linking between achievements and milestones
 * to ensure the timeline shows proper development pathways and connections.
 */

import { MarkerType } from '@xyflow/react';
import type { TimelineEdge, TimelineNode } from '../types';

export interface ConnectionResult {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
}

export interface MilestoneAchievementMap {
  milestoneId: string;
  achievements: string[];
  incomingAchievements: string[];
  outgoingAchievements: string[];
}

/**
 * Creates a comprehensive mapping between milestones and achievements
 */
export function createMilestoneAchievementMapping(
  milestones: any[],
  achievements: any[]
): Map<string, MilestoneAchievementMap> {
  const mapping = new Map<string, MilestoneAchievementMap>();
  
  // Initialize all milestones in the map
  milestones.forEach(milestone => {
    mapping.set(milestone.id, {
      milestoneId: milestone.id,
      achievements: [],
      incomingAchievements: [],
      outgoingAchievements: []
    });
  });
  
  // Map achievements to milestones
  achievements.forEach(achievement => {
    const { fromMilestone, toMilestone, id } = achievement;
    
    // Add to fromMilestone's outgoing achievements
    if (fromMilestone && mapping.has(fromMilestone)) {
      const fromMapping = mapping.get(fromMilestone)!;
      fromMapping.outgoingAchievements.push(id);
      fromMapping.achievements.push(id);
    }
    
    // Add to toMilestone's incoming achievements
    if (toMilestone && mapping.has(toMilestone)) {
      const toMapping = mapping.get(toMilestone)!;
      toMapping.incomingAchievements.push(id);
      toMapping.achievements.push(id);
    }
  });
  
  return mapping;
}

/**
 * Automatically generates achievement-milestone connection edges
 */
export function generateAchievementMilestoneEdges(
  nodes: TimelineNode[],
  achievements: any[],
  milestones: any[]
): TimelineEdge[] {
  const edges: TimelineEdge[] = [];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  console.log(`   🔗 Generating achievement-milestone edges for ${achievements.length} achievements...`);
  
  achievements.forEach(achievement => {
    const achievementId = achievement.id.startsWith('achievement-') 
      ? achievement.id 
      : `achievement-${achievement.id}`;
    const achievementNode = nodeMap.get(achievementId);
    
    if (!achievementNode) {
      console.log(`   ⚠️  Achievement node not found: ${achievementId}`);
      return;
    }
    
    let connectionsCreated = 0;
    
    // Connect from fromMilestone to achievement
    if (achievement.fromMilestone) {
      const fromMilestoneId = `milestone-${achievement.fromMilestone}`;
      const fromMilestoneNode = nodeMap.get(fromMilestoneId);
      
      if (fromMilestoneNode) {
        const achievementIdForEdge = achievement.id.startsWith('achievement-') 
          ? achievement.id.replace('achievement-', '') 
          : achievement.id;
        edges.push({
          id: `milestone-to-achievement-${achievementIdForEdge}`,
          source: fromMilestoneId,
          target: achievementId,
          sourceHandle: 'bottom',
          targetHandle: 'top',
          type: 'smoothstep',
          style: {
            stroke: '#f59e0b', // Amber for achievement connections
            strokeWidth: 3,
            opacity: 0.8,
            zIndex: 5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#f59e0b',
          },
          label: 'develops into',
        });
        connectionsCreated++;
      } else {
        console.log(`   ⚠️  From milestone not found: ${fromMilestoneId} for achievement ${achievement.id}`);
      }
    }
    
    // Connect from achievement to toMilestone
    if (achievement.toMilestone) {
      const toMilestoneId = `milestone-${achievement.toMilestone}`;
      const toMilestoneNode = nodeMap.get(toMilestoneId);
      
      if (toMilestoneNode) {
        const achievementIdForEdge = achievement.id.startsWith('achievement-') 
          ? achievement.id.replace('achievement-', '') 
          : achievement.id;
        edges.push({
          id: `achievement-to-milestone-${achievementIdForEdge}`,
          source: achievementId,
          target: toMilestoneId,
          sourceHandle: 'bottom',
          targetHandle: 'top',
          type: 'smoothstep',
          style: {
            stroke: '#10b981', // Emerald for milestone achievement
            strokeWidth: 3,
            opacity: 0.8,
            zIndex: 5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#10b981',
          },
          label: 'achieves',
        });
        connectionsCreated++;
      } else {
        console.log(`   ⚠️  To milestone not found: ${toMilestoneId} for achievement ${achievement.id}`);
      }
    }
    
    if (connectionsCreated > 0) {
      console.log(`   ✅ Created ${connectionsCreated} connections for achievement: ${achievement.title}`);
    }
  });
  
  console.log(`   📊 Total achievement-milestone edges created: ${edges.length}`);
  return edges;
}

/**
 * Creates developmental pathway edges between related milestones
 */
export function generateDevelopmentalPathways(
  nodes: TimelineNode[],
  milestones: any[]
): TimelineEdge[] {
  const edges: TimelineEdge[] = [];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  // Group milestones by category and age
  const milestonesByCategory = new Map<string, any[]>();
  milestones.forEach(milestone => {
    if (!milestonesByCategory.has(milestone.category)) {
      milestonesByCategory.set(milestone.category, []);
    }
    milestonesByCategory.get(milestone.category)!.push(milestone);
  });
  
  // Create developmental sequences within each category
  milestonesByCategory.forEach((categoryMilestones, category) => {
    // Sort by age (startMonths)
    const sorted = categoryMilestones.sort((a, b) => a.startMonths - b.startMonths);
    
    // Connect consecutive milestones in the same category
    for (let i = 0; i < sorted.length - 1; i++) {
      const currentMilestone = sorted[i];
      const nextMilestone = sorted[i + 1];
      
      const currentNodeId = `milestone-${currentMilestone.id}`;
      const nextNodeId = `milestone-${nextMilestone.id}`;
      
      const currentNode = nodeMap.get(currentNodeId);
      const nextNode = nodeMap.get(nextNodeId);
      
      if (currentNode && nextNode) {
        // Only connect if they're within a reasonable age gap (12 months)
        const ageGap = nextMilestone.startMonths - currentMilestone.endMonths;
        if (ageGap <= 12) {
          edges.push({
            id: `developmental-${currentMilestone.id}-to-${nextMilestone.id}`,
            source: currentNodeId,
            target: nextNodeId,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'step',
            style: {
              stroke: getCategoryColor(category),
              strokeWidth: 2,
              strokeDasharray: '5,5',
              opacity: 0.6,
              zIndex: 3,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: getCategoryColor(category),
            },
            label: `${category} development`,
          });
        }
      }
    }
  });
  
  return edges;
}



/**
 * Gets category-specific color for edges
 */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    physical: '#ef4444',        // Red
    cognitive: '#3b82f6',       // Blue
    social_emotional: '#059669', // Green
    language: '#8b5cf6',        // Purple
    motor_skills: '#f59e0b',    // Amber
    sensory: '#06b6d4',         // Cyan
    self_care: '#84cc16',       // Lime
    academic: '#ec4899',        // Pink
  };
  
  return colors[category] || '#6b7280'; // Default gray
}

/**
 * Main function to enhance timeline with achievement-milestone connections
 */
export function enhanceTimelineWithConnections(
  nodes: TimelineNode[],
  edges: TimelineEdge[],
  milestones: any[],
  achievements: any[]
): ConnectionResult {
  console.log(`🔗 Starting achievement-milestone connection enhancement...`);
  console.log(`   Input: ${nodes.length} nodes, ${edges.length} edges`);
  console.log(`   Data: ${milestones.length} milestones, ${achievements.length} achievements`);
  
  // Use only the achievements from JSON file
  const allAchievements = achievements;
  
  // Remove redundant direct milestone edges that will be replaced by achievement paths
  const filteredEdges = removeRedundantDirectEdges(edges, allAchievements);
  
  // Generate all connection edges
  const achievementMilestoneEdges = generateAchievementMilestoneEdges(
    nodes, 
    allAchievements, 
    milestones
  );
  
  const developmentalPathwayEdges = generateDevelopmentalPathways(
    nodes, 
    milestones
  );
  
  const result = {
    nodes: nodes,
    edges: [...filteredEdges, ...achievementMilestoneEdges, ...developmentalPathwayEdges]
  };
  
  console.log(`✅ Enhancement complete:`);
  console.log(`   Output: ${result.nodes.length} nodes, ${result.edges.length} edges`);
  console.log(`   Original edges: ${edges.length} → Filtered: ${filteredEdges.length}`);
  console.log(`   Achievement-Milestone edges: ${achievementMilestoneEdges.length}`);
  console.log(`   Developmental pathway edges: ${developmentalPathwayEdges.length}`);
  
  return result;
}

/**
 * Removes direct milestone-to-milestone edges when achievements exist as intermediaries
 */
export function removeRedundantDirectEdges(
  edges: TimelineEdge[],
  achievements: any[]
): TimelineEdge[] {
  // Create a set of milestone pairs that have achievements connecting them
  const achievementConnections = new Set<string>();
  
  achievements.forEach(achievement => {
    if (achievement.fromMilestone && achievement.toMilestone) {
      const connectionKey = `milestone-${achievement.fromMilestone}-to-milestone-${achievement.toMilestone}`;
      achievementConnections.add(connectionKey);
    }
  });
  
  console.log(`   🔍 Found ${achievementConnections.size} achievement-mediated connections`);
  
  // Filter out direct milestone edges that are covered by achievements
  const filteredEdges = edges.filter(edge => {
    // Check if this is a direct milestone-to-milestone edge
    if (edge.source.startsWith('milestone-') && edge.target.startsWith('milestone-')) {
      const connectionKey = `${edge.source}-to-${edge.target}`;
      
      if (achievementConnections.has(connectionKey)) {
        console.log(`   🗑️  Removing redundant direct edge: ${edge.source} → ${edge.target} (covered by achievement)`);
        return false; // Remove this edge
      }
    }
    
    return true; // Keep this edge
  });
  
  const removedCount = edges.length - filteredEdges.length;
  if (removedCount > 0) {
    console.log(`   ✂️  Removed ${removedCount} redundant direct milestone edges`);
  }
  
  return filteredEdges;
}
