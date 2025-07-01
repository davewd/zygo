import { Handle, Position } from '@xyflow/react';
import { Trophy, Target } from 'lucide-react';

export interface AchievementNodeProps {
  data: any;
}

export const AchievementNode = ({ data }: AchievementNodeProps) => {
  const getAchievementColor = (category: string) => {
    const colors = {
      'physical': 'from-blue-100 to-blue-200 border-blue-400',
      'cognitive': 'from-green-100 to-green-200 border-green-400', 
      'social': 'from-orange-100 to-orange-200 border-orange-400',
      'emotional': 'from-red-100 to-red-200 border-red-400',
      'language': 'from-purple-100 to-purple-200 border-purple-400',
      'default': 'from-gray-100 to-gray-200 border-gray-400'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 shadow-lg min-w-56 max-w-72 bg-gradient-to-br ${getAchievementColor(data.category || 'default')} transform-gpu pointer-events-auto`}
      style={{
        zIndex: 15,
        cursor: 'default',
      }}
    >
      {/* Add handles for edge connections */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
      />

      <div className="flex items-start space-x-3">
        <Trophy className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-gray-800 mb-2">{data.title}</h4>
          {data.description && (
            <p className="text-xs text-gray-600 mb-3 opacity-90">{data.description}</p>
          )}
          
          {data.fromMilestone && data.toMilestone && (
            <div className="text-xs text-gray-500 mb-2">
              <span className="font-medium">Progress:</span> {data.fromMilestone} → {data.toMilestone}
            </div>
          )}

          {data.stepCount && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Target className="w-3 h-3" />
              <span>{data.stepCount} steps</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
