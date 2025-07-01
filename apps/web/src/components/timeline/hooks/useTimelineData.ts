import { MarkerType } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';
import {
  loadAchievementsFromAPI,
  loadAgeRangesFromAPI,
  loadMilestonesFromCSV,
  loadMilestonesFromJSON,
  loadStepsFromAPI,
  type Achievement,
  type Step
} from '../../../lib/api/milestones';
import { DEVELOPMENT_CATEGORIES, ZOOM_LEVELS } from '../constants';
import {
  AgeRange,
  DevelopmentCategory,
  MilestoneData,
  PedagogyProfile,
  TimelineEdge,
  TimelineNode
} from '../types';
import { calculateNodePositions } from '../utils/layoutCalculation';

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
        const [csvMilestones, jsonMilestones, ageRanges, achievementsData, stepsData] = await Promise.all([
          loadMilestonesFromCSV(),
          loadMilestonesFromJSON(),
          loadAgeRangesFromAPI(),
          loadAchievementsFromAPI(),
          loadStepsFromAPI()
        ]);
        
        setCsvMilestones(csvMilestones as any); // TODO: Fix type mismatch between API and component types
        setJsonMilestones(jsonMilestones as any); // TODO: Fix type mismatch between API and component types
        setAllAgeRanges(ageRanges);
        setAgeRanges(ageRanges);
        setAchievements(achievementsData);
        setSteps(stepsData);
        
        console.log(`✅ Loaded ${csvMilestones.length} CSV milestones, ${jsonMilestones.length} JSON milestones, ${ageRanges.length} age ranges, ${achievementsData.length} achievements, ${stepsData.length} steps`);
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
    // Combine CSV and JSON milestones
    const allMilestones = [...csvMilestones, ...jsonMilestones];
    
    if (!pedagogyData) {
      // Demo nodes
      const demoNodesData = [{ id: 'demo-overview', type: 'ageGroup' }];
      const demoEdgesData: any[] = [];

      const { positions } = calculateNodePositions(
        demoNodesData,
        demoEdgesData,
        currentZoomLevel,
        focusArea,
        canvasWidth
      );

      const demoNodes: TimelineNode[] = [
        {
          id: 'demo-overview',
          type: 'ageGroup',
          data: {
            title: 'Early Childhood (0-2 years)',
            description: 'Critical foundational period for development',
            totalMilestones: 25,
            completedMilestones: 8,
            inProgressMilestones: 5,
          },
          position: positions.get('demo-overview') || { x: 0, y: 100 },
          draggable: false,
        },
      ];

      return { nodes: demoNodes, edges: [] };
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

    // Generate conception node (starting point)
    if (shouldIncludeNode('conception')) {
      generatedNodes.push({
        id: 'conception',
        type: 'conception',
        data: {
          title: 'Conception',
          description: 'The beginning of human development',
          date: 'Day 0',
        },
        position: { x: 0, y: 0 },
        draggable: false,
      });
    }

    // Generate age groups
    if (shouldIncludeNode('ageGroup')) {
      // Show all age groups in granular view (no slice limitation)
      const ageGroups = allAgeRanges;

      ageGroups.forEach((ageGroup, index) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;
        const milestoneCountForRange = allMilestones.filter(
          (m) => m.ageRangeKey === ageGroup.key
        ).length;

        generatedNodes.push({
          id: ageGroupId,
          type: 'ageGroup',
          data: {
            title: ageGroup.range,
            description: ageGroup.description,
            ageRange: ageGroup.range,
            totalMilestones: milestoneCountForRange,
            completedMilestones: Math.floor(milestoneCountForRange * 0.3),
            inProgressMilestones: Math.floor(milestoneCountForRange * 0.2),
            months: ageGroup.months,
            key: ageGroup.key,
          },
          position: { x: 0, y: 0 },
          draggable: false,
        });

        // Connect age groups with timeline flow
        if (index > 0) {
          const previousAgeGroup = ageGroups[index - 1];
          const sourceKey = previousAgeGroup?.key;
          
          // Only create edge if both source and target keys exist
          if (sourceKey && ageGroup.key) {
            generatedEdges.push({
              id: `timeline-flow-${index}`,
              source: `ageGroup-${sourceKey}`,
              target: ageGroupId,
              sourceHandle: 'bottom', // Connect from bottom of previous age group
              targetHandle: 'top', // Connect to top of current age group
              type: 'smoothstep', // Use smoothstep for better curves
              style: {
                stroke: '#6b7280',
                strokeWidth: 3,
                strokeDasharray: '10,5',
              },
              markerEnd: { type: MarkerType.ArrowClosed, color: '#6b7280' },
            });
          }
        }
      });
    }

    // Generate milestones
    if (shouldIncludeNode('milestone')) {
      // Show all age groups for milestone generation in granular view
      const ageGroups = allAgeRanges;

      ageGroups.forEach((ageGroup) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;

        DEVELOPMENT_CATEGORIES.forEach((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return;
          }

          const categoryMilestones = allMilestones.filter(
            (m) => m.ageRangeKey === ageGroup.key && m.category === category
          );

          // Debug logging for milestones per category (only if > 0)
          if (categoryMilestones.length > 0) {
            // console.log(`📍 Found ${categoryMilestones.length} milestones for ${ageGroup.key} - ${category}`);
          }

          if (categoryMilestones.length === 0) return;

          categoryMilestones.forEach((milestone, milestoneIndex) => {
            const milestoneId = `milestone-${milestone.id}`;

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

            generatedNodes.push({
              id: milestoneId,
              type: 'milestone',
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
              },
              position: { x: 0, y: 0 },
            });

            // Add prerequisite edges between milestones (only if valid prerequisite exists)
            const milestoneAny = milestone as any; // TODO: Fix type definition to include prerequisites
            
            // Handle prerequisites as either string (CSV format) or array (JSON format)
            let prerequisiteIds: string[] = [];
            if (milestoneAny.prerequisites) {
              if (typeof milestoneAny.prerequisites === 'string' && milestoneAny.prerequisites.trim()) {
                prerequisiteIds = milestoneAny.prerequisites.split(',').map((p: string) => p.trim());
              } else if (Array.isArray(milestoneAny.prerequisites)) {
                prerequisiteIds = milestoneAny.prerequisites.filter((p: string) => p && p.trim());
              }
            }
            
            prerequisiteIds.forEach((prereqId: string) => {
              // Only create edge if prerequisite milestone exists in our generated nodes
              const prereqExists = generatedNodes.some(node => node.id === `milestone-${prereqId}`);
              if (prereqId && prereqExists) {
                generatedEdges.push({
                  id: `prerequisite-${prereqId}-to-${milestone.id}`,
                  source: `milestone-${prereqId}`,
                  target: milestoneId,
                  sourceHandle: 'right', // Connect from right of prerequisite
                  targetHandle: 'left', // Connect to left of dependent milestone
                  type: 'smoothstep', // Use smoothstep for better curves
                  style: {
                    stroke: '#059669', // Green for prerequisites
                    strokeWidth: 2,
                    strokeDasharray: '8,4',
                    opacity: 0.7,
                  },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#059669',
                  },
                });
              }
            });
          });
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
        });

        // Connect achievements to related milestones
        const fromMilestoneNode = generatedNodes.find(n => n.id === `milestone-${achievement.fromMilestone}`);
        const toMilestoneNode = generatedNodes.find(n => n.id === `milestone-${achievement.toMilestone}`);
        
        if (fromMilestoneNode) {
          generatedEdges.push({
            id: `milestone-to-achievement-${achievement.id}`,
            source: fromMilestoneNode.id,
            target: achievementId,
            sourceHandle: 'right',
            targetHandle: 'left',
            type: 'smoothstep',
            style: {
              stroke: '#f59e0b', // Amber for achievements
              strokeWidth: 2,
              opacity: 0.8,
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
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#10b981',
            },
          });
        }
      });
    }

    // Connect conception to the earliest milestones
    if (shouldIncludeNode('conception') && shouldIncludeNode('milestone')) {
      const conceptionNode = generatedNodes.find(n => n.type === 'conception');
      if (conceptionNode) {
        // Find milestones in the earliest age ranges
        const earlyMilestones = generatedNodes.filter(n => 
          n.type === 'milestone' && 
          (n.data.ageRangeKey === '0_1_months' || n.data.ageRangeKey === 'prenatal')
        );

        earlyMilestones.forEach((milestone) => {
          generatedEdges.push({
            id: `conception-to-${milestone.id}`,
            source: conceptionNode.id,
            target: milestone.id,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'smoothstep',
            style: {
              stroke: '#8b5cf6', // Purple for conception connections
              strokeWidth: 3,
              opacity: 0.9,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#8b5cf6',
            },
          });
        });
      }
    }

    // Calculate positions
    const { positions } = calculateNodePositions(
      generatedNodes,
      generatedEdges,
      currentZoomLevel,
      focusArea,
      canvasWidth
    );

    // Apply calculated positions
    generatedNodes.forEach((node) => {
      const pos = positions.get(node.id);
      if (pos) {
        node.position = pos;
      }
    });

    // Debug total node counts
    // Simple summary logging
    const ageGroupNodes = generatedNodes.filter(n => n.type === 'ageGroup').length;
    const milestoneNodes = generatedNodes.filter(n => n.type === 'milestone').length;
    
    console.log(`🎯 Timeline: ${ageGroupNodes} age groups, ${milestoneNodes} milestones, ${generatedEdges.length} edges`);

    return { nodes: generatedNodes, edges: generatedEdges };
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