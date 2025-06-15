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
}

const TimeLine: React.FC<TimelinePedagogyProps> = ({ pedagogyData }) => {
  // Zoom levels configuration
  const zoomLevels: TimelineZoomLevel[] = [
    {
      level: 0,
      name: 'Overview',
      description: 'Age groups and major developmental periods',
      nodeTypes: ['ageGroup'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 216 }, // 0-18 years
    },
    {
      level: 1,
      name: 'Categories',
      description: 'Development categories within age groups',
      nodeTypes: ['category'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 60 }, // 0-5 years focus
    },
    {
      level: 2,
      name: 'Milestones',
      description: 'Individual milestones and detailed tracking',
      nodeTypes: ['milestone'],
      timeSpan: { minAgeMonths: 0, maxAgeMonths: 36 }, // 0-3 years focus
    },
  ];

  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<DevelopmentCategory[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Generate nodes and edges based on current zoom level and pedagogy data
  const { nodes, edges } = useMemo(() => {
    if (!pedagogyData) {
      // Default demo nodes when no data is provided
      const demoNodes: TimelineNode[] = [
        {
          id: 'demo-overview',
          type: 'ageGroup',
          data: {
            title: 'Early Childhood (0-5 years)',
            description: 'Critical developmental period covering all major domains',
            totalMilestones: 45,
            completedMilestones: 12,
            inProgressMilestones: 8,
            ageRange: 'newborn' as any,
          },
          position: { x: 250, y: 100 },
        },
        {
          id: 'demo-physical',
          type: 'category',
          data: {
            title: 'Physical Development',
            description: 'Gross and fine motor skills, physical growth',
            category: 'physical' as DevelopmentCategory,
            completionPercentage: 65,
            milestoneCount: 12,
            isExpanded: false,
          },
          position: { x: 50, y: 300 },
        },
        {
          id: 'demo-cognitive',
          type: 'category',
          data: {
            title: 'Cognitive Development',
            description: 'Thinking, learning, problem-solving skills',
            category: 'cognitive' as DevelopmentCategory,
            completionPercentage: 40,
            milestoneCount: 15,
            isExpanded: false,
          },
          position: { x: 450, y: 300 },
        },
      ];

      const demoEdges: TimelineEdge[] = [
        {
          id: 'demo-edge-1',
          source: 'demo-overview',
          target: 'demo-physical',
          type: 'smoothstep',
        },
        {
          id: 'demo-edge-2',
          source: 'demo-overview',
          target: 'demo-cognitive',
          type: 'smoothstep',
        },
      ];

      return { nodes: demoNodes, edges: demoEdges };
    }

    const currentLevel = zoomLevels[currentZoomLevel];
    const generatedNodes: TimelineNode[] = [];
    const generatedEdges: TimelineEdge[] = [];

    let yPosition = 100;
    const xSpacing = 400;
    let nodeIndex = 0;

    if (currentLevel.nodeTypes.includes('ageGroup')) {
      // Generate age group nodes
      const ageGroups = ['newborn', 'infant', 'toddler', 'preschool'];
      ageGroups.forEach((ageGroup, index) => {
        const relevantMilestones = pedagogyData.milestones.filter((m) => m.ageRange === ageGroup);

        generatedNodes.push({
          id: `age-${ageGroup}`,
          type: 'ageGroup',
          data: {
            title: ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1),
            description: `Key developmental milestones for ${ageGroup} stage`,
            ageRange: ageGroup as any,
            totalMilestones: relevantMilestones.length,
            completedMilestones: 0, // Would calculate from progress
            inProgressMilestones: 0,
          },
          position: { x: index * xSpacing, y: yPosition },
        });
      });
    }

    if (currentLevel.nodeTypes.includes('category')) {
      // Generate category nodes
      DEVELOPMENT_CATEGORIES.forEach((category, index) => {
        const relevantMilestones = pedagogyData.milestones.filter(
          (m: any) =>
            m.category === category &&
            (selectedCategories.length === 0 || selectedCategories.includes(category))
        );

        if (relevantMilestones.length > 0) {
          generatedNodes.push({
            id: `category-${category}`,
            type: 'category',
            data: {
              title: category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
              description: `Development milestones for ${category}`,
              category: category,
              completionPercentage: Math.random() * 100, // Would calculate from actual progress
              milestoneCount: relevantMilestones.length,
              isExpanded: false,
            },
            position: { x: (index % 3) * xSpacing, y: yPosition + Math.floor(index / 3) * 200 },
          });
        }
      });
    }

    if (currentLevel.nodeTypes.includes('milestone')) {
      // Generate milestone nodes
      pedagogyData.milestones.forEach((milestone: any, index: number) => {
        if (selectedCategories.length === 0 || selectedCategories.includes(milestone.category)) {
          const relevantProgress = pedagogyData.milestoneProgress.filter(
            (p: any) =>
              selectedFamilyMembers.length === 0 || selectedFamilyMembers.includes(p.familyMemberId)
          );

          const relevantFamilyMembers = pedagogyData.familyMembers.filter(
            (fm: any) => selectedFamilyMembers.length === 0 || selectedFamilyMembers.includes(fm.id)
          );

          generatedNodes.push({
            id: `milestone-${milestone.id}`,
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
            position: { x: (index % 2) * xSpacing, y: yPosition + Math.floor(index / 2) * 250 },
          });

          // Add edges for prerequisites
          if (milestone.prerequisites) {
            milestone.prerequisites.forEach((prereqId: string) => {
              generatedEdges.push({
                id: `edge-${prereqId}-${milestone.id}`,
                source: `milestone-${prereqId}`,
                target: `milestone-${milestone.id}`,
                type: 'smoothstep',
                style: { stroke: '#94a3b8' },
              });
            });
          }
        }
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
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          attributionPosition="bottom-left"
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
                <h3 className="font-semibold text-gray-800 mb-2">Timeline View</h3>
                <div className="text-sm text-gray-600 mb-3">
                  {zoomLevels[currentZoomLevel].description}
                </div>
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
                    <div className="space-y-1">
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
                      <div className="space-y-1">
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

          {/* Legend Panel */}
          <Panel position="bottom-right" className="bg-white rounded-lg shadow-lg p-4 m-4">
            <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
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

export default TimeLine;
