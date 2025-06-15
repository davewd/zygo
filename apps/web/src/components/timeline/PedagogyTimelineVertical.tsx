import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@zygo/ui';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Filter,
  Trophy,
  Users,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';

// For now, define types locally until the @zygo/types package is properly exported
interface PedagogyProfile {
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

type DevelopmentCategory =
  | 'physical'
  | 'cognitive'
  | 'social_emotional'
  | 'language'
  | 'motor_skills'
  | 'sensory'
  | 'self_care'
  | 'academic';
type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'deferred' | 'not_applicable';

interface TimelineNode {
  id: string;
  type: 'milestone' | 'category' | 'ageGroup';
  data: any;
  position: { x: number; y: number };
  style?: Record<string, any>;
}

interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  style?: Record<string, any>;
  label?: string;
}

interface TimelineZoomLevel {
  level: number;
  name: string;
  description: string;
  nodeTypes: ('milestone' | 'category' | 'ageGroup')[];
  timeSpan: {
    minAgeMonths: number;
    maxAgeMonths: number;
  };
}

const DEVELOPMENT_CATEGORIES: DevelopmentCategory[] = [
  'physical',
  'cognitive',
  'social_emotional',
  'language',
  'motor_skills',
  'sensory',
  'self_care',
  'academic',
];

// Custom Node Components
const MilestoneNode = ({ data }: { data: any }) => {
  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'not_started':
        return <Circle className="w-4 h-4 text-gray-400" />;
      case 'deferred':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: DevelopmentCategory) => {
    const colors = {
      physical: 'bg-red-100 border-red-300 text-red-800',
      cognitive: 'bg-blue-100 border-blue-300 text-blue-800',
      social_emotional: 'bg-green-100 border-green-300 text-green-800',
      language: 'bg-purple-100 border-purple-300 text-purple-800',
      motor_skills: 'bg-orange-100 border-orange-300 text-orange-800',
      sensory: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      self_care: 'bg-pink-100 border-pink-300 text-pink-800',
      academic: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const milestone = data.milestone;
  const progress = data.progress?.[0]; // Get first family member's progress
  const completion = data.completionPercentage || 0;

  return (
    <div
      className={`p-4 rounded-lg border-2 shadow-md min-w-64 max-w-80 ${getCategoryColor(
        milestone?.category
      )}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(progress?.status || 'not_started')}
          <h3 className="font-semibold text-sm">{data.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Trophy className="w-3 h-3" />
          <span className="text-xs">{milestone?.priority}</span>
        </div>
      </div>

      {data.description && <p className="text-xs mb-3 line-clamp-2">{data.description}</p>}

      {milestone?.ageRange && (
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-3 h-3" />
          <span className="text-xs">{milestone.ageRange.replace('_', ' ')}</span>
        </div>
      )}

      {data.familyMembers && data.familyMembers.length > 0 && (
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-3 h-3" />
          <div className="flex -space-x-1">
            {data.familyMembers.slice(0, 3).map((member: any, index: number) => (
              <div
                key={member.id}
                className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-medium"
                title={member.name}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {data.familyMembers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs">
                +{data.familyMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {completion > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div
              className="bg-current h-2 rounded-full transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryNode = ({ data }: { data: any }) => {
  const getCategoryColor = (category: DevelopmentCategory) => {
    const colors = {
      physical: 'bg-red-50 border-red-200 text-red-800',
      cognitive: 'bg-blue-50 border-blue-200 text-blue-800',
      social_emotional: 'bg-green-50 border-green-200 text-green-800',
      language: 'bg-purple-50 border-purple-200 text-purple-800',
      motor_skills: 'bg-orange-50 border-orange-200 text-orange-800',
      sensory: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      self_care: 'bg-pink-50 border-pink-200 text-pink-800',
      academic: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    };
    return colors[category] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div
      className={`p-6 rounded-xl border-2 shadow-lg min-w-80 ${getCategoryColor(data.category)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{data.title}</h2>
        <button className="p-1">
          {data.isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {data.description && <p className="text-sm mb-4">{data.description}</p>}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Progress:</span>
          <div className="mt-1">
            <div className="w-full bg-white rounded-full h-3">
              <div
                className="bg-current h-3 rounded-full transition-all duration-300"
                style={{ width: `${data.completionPercentage || 0}%` }}
              />
            </div>
          </div>
        </div>
        <div>
          <span className="font-medium">Milestones:</span>
          <div className="mt-1 text-lg font-bold">{data.milestoneCount || 0}</div>
        </div>
      </div>
    </div>
  );
};

const AgeGroupNode = ({ data }: { data: any }) => {
  return (
    <div className="p-6 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-lg min-w-96">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
        <Calendar className="w-6 h-6 text-gray-600" />
      </div>

      {data.description && <p className="text-gray-600 mb-4">{data.description}</p>}

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{data.totalMilestones || 0}</div>
          <div className="text-gray-600">Total Milestones</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{data.completedMilestones || 0}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{data.inProgressMilestones || 0}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  milestone: MilestoneNode,
  category: CategoryNode,
  ageGroup: AgeGroupNode,
};

interface TimelinePedagogyProps {
  pedagogyData?: PedagogyProfile;
  onNodeClick?: (nodeId: string, nodeData: any) => void;
}

const VerticalTimeLine: React.FC<TimelinePedagogyProps> = ({ pedagogyData, onNodeClick }) => {
  // Zoom levels configuration
  const zoomLevels: TimelineZoomLevel[] = [
    {
      level: 0,
      name: 'Overview',
      description: 'Age groups and major developmental periods (Vertical Flow)',
      nodeTypes: ['ageGroup'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 216 }, // 0-18 years
    },
    {
      level: 1,
      name: 'Categories',
      description: 'Development categories within age groups (1:2 relationships)',
      nodeTypes: ['ageGroup', 'category'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 60 }, // 0-5 years focus
    },
    {
      level: 2,
      name: 'Milestones',
      description: 'Individual milestones and detailed tracking (1:1 relationships)',
      nodeTypes: ['category', 'milestone'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 36 }, // 0-3 years focus
    },
  ];

  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<DevelopmentCategory[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Generate nodes and edges with vertical layout and proper parent-child relationships
  const { nodes, edges } = useMemo(() => {
    if (!pedagogyData) {
      // Default demo nodes in vertical layout
      const demoNodes: TimelineNode[] = [
        {
          id: 'demo-overview',
          type: 'ageGroup',
          data: {
            title: 'Early Childhood (0-2 years)',
            description: 'Critical foundational period',
            totalMilestones: 25,
            completedMilestones: 8,
            inProgressMilestones: 5,
          },
          position: { x: 300, y: 100 },
        },
        {
          id: 'demo-physical',
          type: 'category',
          data: {
            title: 'Physical Development',
            description: 'Gross and fine motor skills',
            category: 'physical' as DevelopmentCategory,
            completionPercentage: 65,
            milestoneCount: 8,
            isExpanded: false,
          },
          position: { x: 100, y: 400 },
        },
        {
          id: 'demo-cognitive',
          type: 'category',
          data: {
            title: 'Cognitive Development',
            description: 'Learning and problem-solving',
            category: 'cognitive' as DevelopmentCategory,
            completionPercentage: 40,
            milestoneCount: 10,
            isExpanded: false,
          },
          position: { x: 500, y: 400 },
        },
      ];

      const demoEdges: TimelineEdge[] = [
        {
          id: 'demo-edge-1',
          source: 'demo-overview',
          target: 'demo-physical',
          type: 'smoothstep',
          style: { stroke: '#10b981', strokeWidth: 3 },
          label: '1:2 Split',
        },
        {
          id: 'demo-edge-2',
          source: 'demo-overview',
          target: 'demo-cognitive',
          type: 'smoothstep',
          style: { stroke: '#10b981', strokeWidth: 3 },
        },
      ];

      return { nodes: demoNodes, edges: demoEdges };
    }

    const currentLevel = zoomLevels[currentZoomLevel];
    const generatedNodes: TimelineNode[] = [];
    const generatedEdges: TimelineEdge[] = [];

    // Vertical timeline configuration
    const baseX = 300; // Center column for main timeline
    const ySpacing = 400; // Vertical spacing between main nodes
    const lateralOffset = 250; // Horizontal offset for child nodes
    const childSpacing = 200; // Spacing between child nodes

    if (currentLevel.nodeTypes.includes('ageGroup')) {
      // Generate age group nodes vertically down the center
      const ageGroups = ['0-6 months', '6-12 months', '12-24 months', '2-3 years', '3-5 years'];
      ageGroups.forEach((ageGroup, index) => {
        const ageGroupId = `ageGroup-${index}`;
        generatedNodes.push({
          id: ageGroupId,
          type: 'ageGroup',
          data: {
            title: ageGroup,
            description: `Key developmental milestones for ${ageGroup}`,
            ageRange: ageGroup as any,
            totalMilestones: 15 + Math.floor(Math.random() * 20),
            completedMilestones: Math.floor(Math.random() * 10),
            inProgressMilestones: Math.floor(Math.random() * 5),
          },
          position: { x: baseX, y: 100 + index * ySpacing },
        });

        // Connect to previous age group to show timeline flow
        if (index > 0) {
          generatedEdges.push({
            id: `edge-timeline-${index - 1}-${index}`,
            source: `ageGroup-${index - 1}`,
            target: ageGroupId,
            type: 'straight',
            style: { stroke: '#6b7280', strokeWidth: 4, strokeDasharray: '10,5' },
            label: 'Timeline Flow',
          });
        }
      });
    }

    if (currentLevel.nodeTypes.includes('category')) {
      // For each age group, create category nodes with 1:2 relationships
      const ageGroups = ['0-6 months', '6-12 months', '12-24 months', '2-3 years', '3-5 years'];

      ageGroups.forEach((ageGroup, ageIndex) => {
        const ageGroupId = `ageGroup-${ageIndex}`;
        const ageGroupY = 100 + ageIndex * ySpacing;

        // Filter categories that have milestones for this age group
        const relevantCategories = DEVELOPMENT_CATEGORIES.filter((category) => {
          if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            return false;
          }
          return true; // Simplified - would filter by actual milestone data
        }).slice(0, 2); // Limit to 2 categories per age group for 1:2 relationship

        relevantCategories.forEach((category, catIndex) => {
          const categoryId = `category-${ageIndex}-${category}`;
          const isLeft = catIndex === 0;

          generatedNodes.push({
            id: categoryId,
            type: 'category',
            data: {
              title: category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
              description: `${category} development for ${ageGroup}`,
              category: category,
              completionPercentage: Math.random() * 100,
              milestoneCount: 5 + Math.floor(Math.random() * 10),
              isExpanded: false,
            },
            position: {
              x: baseX + (isLeft ? -lateralOffset : lateralOffset),
              y: ageGroupY + 50 + catIndex * 100,
            },
          });

          // Create 1:2 parent-child relationship
          generatedEdges.push({
            id: `edge-age-cat-${ageIndex}-${category}`,
            source: ageGroupId,
            target: categoryId,
            type: 'smoothstep',
            style: { stroke: '#10b981', strokeWidth: 2 },
            label: catIndex === 0 ? '1:2 Split' : undefined,
          });
        });
      });
    }

    if (currentLevel.nodeTypes.includes('milestone')) {
      // For each category, create milestone nodes with 1:1 or 1:2 relationships
      let globalMilestoneIndex = 0;

      DEVELOPMENT_CATEGORIES.forEach((category, catIndex) => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
          return;
        }

        const categoryMilestones = pedagogyData.milestones
          .filter((m: any) => m.category === category)
          .slice(0, 3); // Limit milestones for cleaner layout

        if (categoryMilestones.length === 0) return;

        const categoryId = `category-${Math.floor(catIndex / 2)}-${category}`;
        const categoryY = 100 + Math.floor(catIndex / 2) * ySpacing + 50 + (catIndex % 2) * 100;

        categoryMilestones.forEach((milestone: any, milestoneIndex) => {
          const milestoneId = `milestone-${milestone.id}`;
          const relevantProgress = pedagogyData.milestoneProgress.filter(
            (p: any) =>
              p.milestoneId === milestone.id &&
              (selectedFamilyMembers.length === 0 ||
                selectedFamilyMembers.includes(p.familyMemberId))
          );

          const relevantFamilyMembers = pedagogyData.familyMembers.filter(
            (fm: any) => selectedFamilyMembers.length === 0 || selectedFamilyMembers.includes(fm.id)
          );

          generatedNodes.push({
            id: milestoneId,
            type: 'milestone',
            data: {
              title: milestone.title,
              description: milestone.description,
              milestone: milestone,
              progress: relevantProgress,
              familyMembers: relevantFamilyMembers,
              completionPercentage:
                relevantProgress.length > 0
                  ? (relevantProgress.filter((p: any) => p.status === 'completed').length /
                      relevantProgress.length) *
                    100
                  : 0,
            },
            position: {
              x:
                baseX +
                (catIndex % 2 === 0 ? -lateralOffset : lateralOffset) +
                (milestoneIndex % 2 === 0 ? -150 : 150),
              y: categoryY + 200 + milestoneIndex * 120,
            },
          });

          // Create 1:1 parent-child relationship from category to milestone
          generatedEdges.push({
            id: `edge-cat-milestone-${category}-${milestone.id}`,
            source: categoryId,
            target: milestoneId,
            type: 'smoothstep',
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            label: milestoneIndex === 0 ? '1:1 Child' : undefined,
          });

          // Add prerequisite relationships between milestones
          if (milestone.prerequisites) {
            milestone.prerequisites.forEach((prereqId: string) => {
              generatedEdges.push({
                id: `edge-prereq-${prereqId}-${milestone.id}`,
                source: `milestone-${prereqId}`,
                target: milestoneId,
                type: 'bezier',
                style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5,5' },
                label: 'Prerequisite',
              });
            });
          }

          globalMilestoneIndex++;
        });
      });
    }

    return { nodes: generatedNodes, edges: generatedEdges };
  }, [currentZoomLevel, selectedCategories, selectedFamilyMembers, pedagogyData]);

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when generated nodes change
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      if (onNodeClick) {
        onNodeClick(node.id, node.data);
      }

      // Auto-zoom logic: drill down when clicking on parent nodes
      if (node.type === 'ageGroup' && currentZoomLevel === 0) {
        setCurrentZoomLevel(1);
      } else if (node.type === 'category' && currentZoomLevel === 1) {
        setCurrentZoomLevel(2);
      }
    },
    [onNodeClick, currentZoomLevel]
  );

  const handleZoomIn = useCallback(() => {
    if (currentZoomLevel < zoomLevels.length - 1) {
      setCurrentZoomLevel(currentZoomLevel + 1);
    }
  }, [currentZoomLevel, zoomLevels.length]);

  const handleZoomOut = useCallback(() => {
    if (currentZoomLevel > 0) {
      setCurrentZoomLevel(currentZoomLevel - 1);
    }
  }, [currentZoomLevel]);

  const toggleCategoryFilter = (category: DevelopmentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      <ReactFlowProvider>
        <ReactFlow
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          attributionPosition="bottom-left"
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'milestone':
                  return '#3b82f6';
                case 'category':
                  return '#10b981';
                case 'ageGroup':
                  return '#f59e0b';
                default:
                  return '#6b7280';
              }
            }}
          />

          {/* Custom Control Panel */}
          <Panel position="top-left" className="bg-white rounded-lg shadow-lg p-4 m-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Vertical Timeline</h3>
                <div className="text-sm text-gray-600 mb-3">
                  {zoomLevels[currentZoomLevel].description}
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleZoomOut}
                      disabled={currentZoomLevel === 0}
                    >
                      <ZoomOut className="w-4 h-4 mr-1" />
                      Zoom Out
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleZoomIn}
                      disabled={currentZoomLevel === zoomLevels.length - 1}
                    >
                      <ZoomIn className="w-4 h-4 mr-1" />
                      Zoom In
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Click age groups or categories to drill down
                  </div>
                </div>
              </div>

              <div>
                <Button size="sm" variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4 mr-1" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="space-y-3 border-t pt-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {DEVELOPMENT_CATEGORIES.map((category) => (
                        <label key={category} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategoryFilter(category)}
                            className="mr-2"
                          />
                          {category
                            .replace('_', ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </label>
                      ))}
                    </div>
                  </div>

                  {pedagogyData && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Family Members</h4>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {pedagogyData.familyMembers.map((member: any) => (
                          <label key={member.id} className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={selectedFamilyMembers.includes(member.id)}
                              onChange={() => {
                                setSelectedFamilyMembers((prev) =>
                                  prev.includes(member.id)
                                    ? prev.filter((id) => id !== member.id)
                                    : [...prev, member.id]
                                );
                              }}
                              className="mr-2"
                            />
                            {member.name} ({member.relationship})
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>

          {/* Relationship Legend */}
          <Panel position="bottom-right" className="bg-white rounded-lg shadow-lg p-4 m-4">
            <h4 className="font-semibold text-gray-800 mb-2">Relationships</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-gray-500" style={{ borderStyle: 'dashed' }}></div>
                <span>Timeline Flow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-green-500"></div>
                <span>1:2 Parent-Child</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span>1:1 Parent-Child</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-orange-500" style={{ borderStyle: 'dashed' }}></div>
                <span>Prerequisite</span>
              </div>
            </div>
          </Panel>

          {/* Status Legend */}
          <Panel position="bottom-left" className="bg-white rounded-lg shadow-lg p-4 m-4">
            <h4 className="font-semibold text-gray-800 mb-2">Status Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-gray-400" />
                <span>Not Started</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span>Deferred</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default VerticalTimeLine;
