import { Handle, Position } from '@xyflow/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface StepNodeProps {
  data: any;
}

export const StepNode = ({ data }: StepNodeProps) => {
  const getStepStatus = () => {
    if (data.completed) return 'completed';
    if (data.inProgress) return 'inProgress';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-50 to-green-100 border-green-300 text-green-800';
      case 'inProgress':
        return 'from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-800';
      case 'pending':
        return 'from-gray-50 to-gray-100 border-gray-300 text-gray-600';
      default:
        return 'from-gray-50 to-gray-100 border-gray-300 text-gray-600';
    }
  };

  const status = getStepStatus();

  return (
    <div
      className={`p-3 rounded-md border shadow-sm min-w-48 max-w-64 bg-gradient-to-r ${getStepColor(
        status
      )} transform-gpu pointer-events-auto`}
      style={{
        zIndex: 12,
        cursor: 'default',
      }}
    >
      {/* Add handles for edge connections */}
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />

      <div className="flex items-start space-x-2">
        {status === 'completed' ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
        ) : (
          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
        )}

        <div className="flex-1">
          <h5 className="font-medium text-xs mb-1">{data.title}</h5>
          {data.description && (
            <p className="text-xs opacity-80 leading-relaxed">{data.description}</p>
          )}

          {data.duration && (
            <div className="text-xs opacity-70 mt-1">
              <span className="font-medium">Duration:</span> {data.duration}
            </div>
          )}

          {data.achievementId && (
            <div className="text-xs opacity-60 mt-1">Part of: {data.achievementTitle}</div>
          )}
        </div>
      </div>
    </div>
  );
};
