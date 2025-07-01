import { Sparkles } from 'lucide-react';
import { VerticalHandles } from '../shared/VerticalHandles';

export interface ConceptionNodeProps {
  data: any;
}

export const ConceptionNode = ({ data }: ConceptionNodeProps) => {
  return (
    <div
      className="p-6 rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-100 to-purple-100 shadow-xl min-w-48 max-w-48 transform-gpu"
      style={{
        zIndex: 15, // High priority
        cursor: 'default',
      }}
    >
      {/* Use standardized vertical handles */}
      <VerticalHandles showTarget={false} showSource={true} />

      <div className="flex flex-col items-center text-center">
        <Sparkles className="w-8 h-8 text-pink-600 mb-3" />
        <h3 className="font-bold text-lg text-pink-800 mb-2">{data.title}</h3>
        {data.description && <p className="text-sm text-pink-600 opacity-90">{data.description}</p>}
        {data.date && <div className="text-xs text-pink-500 mt-2 font-medium">{data.date}</div>}
      </div>
    </div>
  );
};
