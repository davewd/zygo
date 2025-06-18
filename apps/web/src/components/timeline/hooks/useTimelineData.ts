import { MarkerType } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';
import { generateAgeRanges, loadMilestonesFromCSV } from '../../../lib/api/milestones';
import { CATEGORY_COLORS, DEVELOPMENT_CATEGORIES, ZOOM_LEVELS } from '../constants';
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
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  const [milestonesError, setMilestonesError] = useState<string | null>(null);

  // Generate age ranges (this is still needed for the timeline structure)
  const [allAgeRanges] = useState(() => generateAgeRanges());

  // Load milestone data from CSV on component mount
  useEffect(() => {
    const loadMilestoneData = async () => {
      try {
        setMilestonesLoading(true);
        setMilestonesError(null);
        
        // Load milestones from CSV using the API
        const milestones = await loadMilestonesFromCSV();
        setCsvMilestones(milestones);
        setAgeRanges(allAgeRanges);
        
        console.log(`✅ Loaded ${milestones.length} milestones from CSV`);
      } catch (error) {
        console.error('Error loading milestone data:', error);
        setMilestonesError(error instanceof Error ? error.message : 'Failed to load milestone data');
        
        // Fallback to empty data or could use fallback generation
        setCsvMilestones([]);
        setAgeRanges(allAgeRanges);
      } finally {
        setMilestonesLoading(false);
      }
    };

    loadMilestoneData();
  }, []); // Load once on mount

  // Generate nodes and edges based on current state
  const { nodes, edges } = useMemo(() => {
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

    // Generate age groups
    if (shouldIncludeNode('ageGroup')) {
      const ageGroups = allAgeRanges.slice(0, Math.min(12, allAgeRanges.length));

      ageGroups.forEach((ageGroup, index) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;
        const milestoneCountForRange = csvMilestones.filter(
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
          generatedEdges.push({
            id: `timeline-flow-${index}`,
            source: `ageGroup-${ageGroups[index - 1].key}`,
            target: ageGroupId,
            type: 'smoothstep',
            style: {
              stroke: '#6b7280',
              strokeWidth: 4,
              strokeDasharray: '15,10',
            },
            label: 'Timeline Progression',
            markerEnd: { type: MarkerType.ArrowClosed, color: '#6b7280' },
          });
        }
      });
    }

    // Generate milestones
    if (shouldIncludeNode('milestone')) {
      const ageGroups = allAgeRanges.slice(0, Math.min(12, allAgeRanges.length));

      ageGroups.forEach((ageGroup) => {
        const ageGroupId = `ageGroup-${ageGroup.key}`;

        DEVELOPMENT_CATEGORIES.forEach((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return;
          }

          const categoryMilestones = csvMilestones.filter(
            (m) => m.ageRangeKey === ageGroup.key && m.category === category
          );

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

            // Enhanced directional edges from age group to milestones
            generatedEdges.push({
              id: `age-to-milestone-${milestone.id}`,
              source: ageGroupId,
              target: milestoneId,
              type: 'smoothstep',
              style: {
                stroke: CATEGORY_COLORS[category]?.stroke || '#6b7280',
                strokeWidth: 2,
                opacity: 0.7,
              },
              label: milestoneIndex === 0 ? 'Contains' : undefined,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: CATEGORY_COLORS[category]?.stroke || '#6b7280',
              },
            });
          });
        });
      });
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
