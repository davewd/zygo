import { MarkerType } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';
import {
  getAllAchievements,
  getAllAgeRanges,
  getAllMilestones,
  getAllSteps,
  type Achievement,
  type Step
} from '../../../lib/api/timeline';
import { removeTransitiveRedundancy } from '../../../lib/utils/milestonePrerequisiteCleanup';
import { DEVELOPMENT_CATEGORIES, ZOOM_LEVELS } from '../constants';
import {
  AgeRange,
  DevelopmentCategory,
  MilestoneData,
  PedagogyProfile,
  TimelineEdge,
  TimelineNode
} from '../types';

/**
 * Z-Index Layer System:
 * - Layer 1 (z-index: 1): Age ranges and their edges (bottom layer)
 * - Layer 2 (z-index: 2): Steps and their edges
 * - Layer 3 (z-index: 3): Achievements and their edges  
 * - Layer 4 (z-index: 4): Milestones, key milestones, and their edges (top layer)
 */
import { getVerticalTimelineLayout } from '../utils/dagreLayout';

interface UseTimelineDataProps {
  pedagogyData?: PedagogyProfile;
  currentZoomLevel: number;
  selectedCategories: DevelopmentCategory[];
  selectedFamilyMembers: string[];
  focusArea: string | null;
  canvasWidth?: number;
}

export const useTimelineData = ({
  pedagogyData,
  currentZoomLevel,
  selectedCategories,
  selectedFamilyMembers,
  focusArea,
  canvasWidth,
}: UseTimelineDataProps) => {
  // State for CSV-based milestones
  const [csvMilestones, setCsvMilestones] = useState<MilestoneData[]>([]);
  const [jsonMilestones, setJsonMilestones] = useState<MilestoneData[]>([]);
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  const [milestonesError, setMilestonesError] = useState<string | null>(null);

  // State for age ranges
  const [allAgeRanges, setAllAgeRanges] = useState<AgeRange[]>([]);

  // State for achievements and steps
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  // Load milestone and age range data from APIs on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setMilestonesLoading(true);
        setMilestonesError(null);
        
        // Load all data concurrently
        const [milestones, ageRanges, achievementsData, stepsData] = await Promise.all([
          getAllMilestones(),
          getAllAgeRanges(),
          getAllAchievements(),
          getAllSteps()
        ]);
        
        // Convert Milestone[] to MilestoneData[] format expected by the component
        const milestonesData: MilestoneData[] = milestones.map(milestone => ({
          id: milestone.id,
          title: milestone.title,
          description: milestone.description,
          category: milestone.category as DevelopmentCategory,
          ageRange: milestone.ageRange,
          ageRangeKey: milestone.ageRangeKey,
          months: [milestone.startMonths, milestone.endMonths],
          period: milestone.period,
          isTypical: milestone.isTypical,
          isKeyMilestone: milestone.isKeyMilestone,
          importance: milestone.importance,
          prerequisites: milestone.prerequisites,
          createdDate: milestone.createdDate,
          modifiedDate: milestone.modifiedDate
        }));
        setCsvMilestones(milestonesData);
        setAllAgeRanges(ageRanges);
        setAgeRanges(ageRanges);
        setAchievements(achievementsData);
        setSteps(stepsData);
        
        console.log(`✅ Loaded ${milestones.length} milestones, ${ageRanges.length} age ranges, ${achievementsData.length} achievements, ${stepsData.length} steps`);
      } catch (error) {
        console.error('Error loading data:', error);
        setMilestonesError(error instanceof Error ? error.message : 'Failed to load data');
        
        // Fallback to empty data
        setCsvMilestones([]);
        setAllAgeRanges([]);
        setAgeRanges([]);
      } finally {
        setMilestonesLoading(false);
      }
    };

    loadData();
  }, []); // Load once on mount

  // Generate nodes and edges based on current state
  const { nodes, edges } = useMemo(() => {
    // Use milestones from JSON (now stored in csvMilestones for backward compatibility)
    const allMilestones = [...csvMilestones];
    
    // Apply transitive redundancy cleanup to the milestone data based on current filters
    // This ensures that when users apply filters, redundant edges are removed dynamically
    const filteredMilestones = selectedCategories.length > 0 
      ? allMilestones.filter(m => selectedCategories.includes(m.category))
      : allMilestones;
    
    // Remove transitive redundancy from the filtered milestone set
    const cleanedMilestones = removeTransitiveRedundancy(filteredMilestones);
    
    // Log cleanup results if any changes were made
    if (cleanedMilestones.length !== filteredMilestones.length) {
      console.log(`🧹 Applied milestone prerequisite cleanup: ${filteredMilestones.length - cleanedMilestones.length} redundant edges removed`);
    }

    const currentLevel = ZOOM_LEVELS[currentZoomLevel];
    const generatedNodes: TimelineNode[] = [];
    const generatedEdges: TimelineEdge[] = [];

    // Filter nodes based on zoom level and focus area
    const shouldIncludeNode = (nodeType: string, nodeData?: any) => {
      if (!currentLevel.nodeTypes.includes(nodeType as any)) return false;
      if (focusArea && nodeData && !nodeData.id?.includes(focusArea)) return false;
      return true;
    };

    // Age groups are now handled by the sidebar ruler, so we skip generating the large age group cards
    // This provides a cleaner timeline focused on milestones while the sidebar shows age context

    // Generate milestones
    if (shouldIncludeNode('milestone')) {
      // Track created milestone IDs to avoid duplicates
      const createdMilestones = new Set<string>();

      DEVELOPMENT_CATEGORIES.forEach((category) => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
          return;
        }

        const categoryMilestones = cleanedMilestones.filter(
          (m) => m.category === category
        );

        // Debug logging for milestones per category (only if > 0)
        if (categoryMilestones.length > 0) {
          // console.log(`📍 Found ${categoryMilestones.length} milestones for ${category}`);
        }

        if (categoryMilestones.length === 0) return;

        categoryMilestones.forEach((milestone, milestoneIndex) => {
          const milestoneId = `milestone-${milestone.id}`;

          createdMilestones.add(milestoneId);

          // Create mock progress data
          const relevantProgress =
            pedagogyData?.milestoneProgress?.filter(
              (p: any) =>
                p.milestoneId === milestone.id &&
                (selectedFamilyMembers.length === 0 ||
                  selectedFamilyMembers.includes(p.familyMemberId))
            ) || [];

          const relevantFamilyMembers =
            pedagogyData?.familyMembers?.filter(
              (fm: any) =>
                selectedFamilyMembers.length === 0 || selectedFamilyMembers.includes(fm.id)
            ) || [];

          // Calculate completion percentage
          const completionPercentage =
            relevantProgress.length > 0
              ? (relevantProgress.filter((p: any) => p.status === 'completed').length /
                  relevantProgress.length) *
                100
              : Math.floor((milestoneIndex * 13 + category.length * 7) % 100);

          // Check if this milestone is a key milestone using the data property
          const isKeyMilestone = milestone.isKeyMilestone === true;
          const nodeType = isKeyMilestone ? 'keyMilestone' : 'milestone';

          generatedNodes.push({
            id: milestoneId,
            type: nodeType,
            data: {
              title: milestone.title,
              description: milestone.description,
              milestone: milestone,
              progress: relevantProgress,
              familyMembers: relevantFamilyMembers,
              completionPercentage: completionPercentage,
              category: category,
              ageRange: milestone.ageRange,
              period: milestone.period,
              importance: milestone.importance,
              months: milestone.months,
              milestoneType: isKeyMilestone ? milestone.id : undefined, // Pass milestone ID as type for key milestones
            },
            position: { x: 0, y: 0 },
            draggable: true, // Enable dragging for horizontal movement
            style: {
              zIndex: nodeType === 'keyMilestone' ? 5 : 4, // Key milestones get highest priority
            },
          });
        });
      });
    }

    // Generate prerequisite edges after all milestones have been created
    // Use the cleaned milestones to ensure no redundant edges are created
    if (shouldIncludeNode('milestone')) {
      cleanedMilestones.forEach((milestone) => {
        const milestoneId = `milestone-${milestone.id}`;
        
        // Skip if milestone wasn't created (duplicate check)
        if (!generatedNodes.some(node => node.id === milestoneId)) {
          return;
        }

        // Add prerequisite edges between milestones (only if valid prerequisite exists)
        
        // Handle prerequisites from the milestone data
        let prerequisiteIds: string[] = [];
        if (milestone.prerequisites && milestone.prerequisites.length > 0) {
          prerequisiteIds = milestone.prerequisites;
        }
        
        prerequisiteIds.forEach((prereqId: string) => {
          // Only create edge if prerequisite milestone exists in our generated nodes
          const prereqExists = generatedNodes.some(node => node.id === `milestone-${prereqId}`);
          if (prereqId && prereqExists) {
            generatedEdges.push({
              id: `prerequisite-${prereqId}-to-${milestone.id}`,
              source: `milestone-${prereqId}`,
              target: milestoneId,
              sourceHandle: 'bottom', // Connect from bottom of prerequisite milestone
              targetHandle: 'top', // Connect to top of dependent milestone
              type: 'smoothstep', // Use smoothstep for better curves
              style: {
                stroke: '#059669', // Green for prerequisites
                strokeWidth: 2,
                strokeDasharray: '8,4',
                opacity: 0.7,
                zIndex: 4, // Top layer - milestone edges
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#059669',
              },
            });
          }
        });
      });
    }

    // Generate achievement nodes
    if (shouldIncludeNode('achievement')) {
      achievements.forEach((achievement) => {
        const achievementId = `achievement-${achievement.id}`;
        
        generatedNodes.push({
          id: achievementId,
          type: 'achievement',
          data: {
            title: achievement.title,
            description: achievement.description,
            category: achievement.category,
            fromMilestone: achievement.fromMilestone,
            toMilestone: achievement.toMilestone,
            stepCount: achievement.stepCount,
            ageRangeKey: achievement.ageRangeKey,
          },
          position: { x: 0, y: 0 },
          draggable: false,
          style: {
            zIndex: 3, // Third layer - achievements (below milestones, above steps)
          },
        });

        // Connect achievements to related milestones
        const fromMilestoneNode = generatedNodes.find(n => n.id === `milestone-${achievement.fromMilestone}`);
        const toMilestoneNode = generatedNodes.find(n => n.id === `milestone-${achievement.toMilestone}`);
        
        if (fromMilestoneNode) {
          generatedEdges.push({
            id: `milestone-to-achievement-${achievement.id}`,
            source: fromMilestoneNode.id,
            target: achievementId,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'smoothstep',
            style: {
              stroke: '#f59e0b', // Amber for achievements
              strokeWidth: 2,
              opacity: 0.8,
              zIndex: 3, // Third layer - achievement edges
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#f59e0b',
            },
          });
        }
      });
    }

    // Generate step nodes
    if (shouldIncludeNode('step')) {
      steps.forEach((step) => {
        const stepId = `step-${step.id}`;
        
        generatedNodes.push({
          id: stepId,
          type: 'step',
          data: {
            title: step.title,
            description: step.description,
            achievementId: step.achievementId,
            achievementTitle: step.achievementTitle,
            duration: step.duration,
            completed: step.completed,
            inProgress: step.inProgress,
          },
          position: { x: 0, y: 0 },
          draggable: false,
          style: {
            zIndex: 2, // Second layer - steps (above age ranges, below achievements)
          },
        });

        // Connect steps to their achievements
        const achievementNode = generatedNodes.find(n => n.id === `achievement-${step.achievementId}`);
        if (achievementNode) {
          generatedEdges.push({
            id: `achievement-to-step-${step.id}`,
            source: achievementNode.id,
            target: stepId,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'smoothstep',
            style: {
              stroke: '#10b981', // Emerald for steps
              strokeWidth: 1.5,
              opacity: 0.7,
              zIndex: 2, // Second layer - step edges
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#10b981',
            },
          });
        }
      });
    }

    // Calculate positions using Dagre layout with Y-axis vertical flow
    const isTimelineView = currentZoomLevel >= 2; // Use timeline layout for detailed views
    
    const layoutedElements = isTimelineView 
      ? getVerticalTimelineLayout(generatedNodes, generatedEdges, {
          ranksep: 400,  // Increased for better vertical spacing
          nodesep: 150,  // Improved horizontal spacing
          marginx: canvasWidth ? canvasWidth * 0.1 : 150,
          marginy: 150,  // Better vertical margins
        })
      : getVerticalTimelineLayout(generatedNodes, generatedEdges, {
          ranksep: 350,  // Consistent vertical layout
          nodesep: 180,  // Good node separation
          marginx: canvasWidth ? canvasWidth * 0.1 : 120,
          marginy: 120,  // Proper margins
        });

    // Use the layouted nodes and edges
    const finalNodes = layoutedElements.nodes;
    const finalEdges = layoutedElements.edges;

    // Debug total node counts
    // Simple summary logging
    const ageGroupNodes = finalNodes.filter(n => n.type === 'ageGroup').length;
    const milestoneNodes = finalNodes.filter(n => n.type === 'milestone').length;
    
    console.log(`🎯 Timeline (Dagre): ${ageGroupNodes} age groups, ${milestoneNodes} milestones, ${finalEdges.length} edges`);

    return { nodes: finalNodes, edges: finalEdges };
  }, [
    currentZoomLevel,
    selectedCategories,
    selectedFamilyMembers,
    pedagogyData,
    focusArea,
    canvasWidth,
    allAgeRanges,
    csvMilestones,
  ]);

  return {
    nodes,
    edges,
    csvMilestones,
    ageRanges,
    milestonesLoading,
    milestonesError,
    allAgeRanges,
    milestones: csvMilestones, // Provide milestones as an alias for backward compatibility
  };
};