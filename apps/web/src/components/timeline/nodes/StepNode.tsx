import { ArrowRight, CheckCircle2, Target } from 'lucide-react';
import { VerticalHandles } from '../shared/VerticalHandles';
import '../styles/goal-milestone.css';

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
  
  // Check for new flags
  const isCompleted = data.isCompleted || false;
  const isCurrentGoal = data.isCurrentGoal || false;
  
  // Determine styling classes
  const getContainerClasses = () => {
    let classes = `p-3 rounded-md border shadow-sm min-w-48 max-w-64 bg-gradient-to-r ${getStepColor(
      status
    )} transform-gpu pointer-events-auto relative`;
    
    if (isCurrentGoal) {
      classes += ' zygo-goal-milestone';
    } else if (isCompleted) {
      classes += ' zygo-completed-milestone';
    }
    
    return classes;
  };

  return (
    <div
      className={getContainerClasses()}
      style={{
        zIndex: 12,
        cursor: 'default',
      }}
    >
      {/* Use standardized vertical handles for Y-axis layout */}
      <VerticalHandles />
      
      {/* Goal Icon */}
      {isCurrentGoal && (
        <div className={`zygo-goal-icon ${isCurrentGoal ? 'zygo-goal-icon--selected' : 'zygo-goal-icon--unselected'}`}>
          <Target className="w-3 h-3" />
        </div>
      )}

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
