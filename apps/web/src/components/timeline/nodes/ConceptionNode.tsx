import { Handle, Position } from '@xyflow/react';
import { Sparkles } from 'lucide-react';

export interface ConceptionNodeProps {
  data: any;
}

export const ConceptionNode = ({ data }: ConceptionNodeProps) => {
  return (
    <div
      className="p-8 rounded-full border-4 border-purple-400 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl min-w-48 max-w-48 transform-gpu pointer-events-auto"
      style={{
        zIndex: 20, // Highest priority
        cursor: 'default',
      }}
    >
      {/* Add handles for edge connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0 }} // Hide the handle visually
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
      />

      <div className="flex flex-col items-center text-center">
        <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
        <h3 className="font-bold text-xl text-purple-800 mb-2">{data.title}</h3>
        {data.description && (
          <p className="text-sm text-purple-600 opacity-90">{data.description}</p>
        )}
        {data.date && (
          <div className="text-xs text-purple-500 mt-2 font-medium">{data.date}</div>
        )}
      </div>
    </div>
  );
};
