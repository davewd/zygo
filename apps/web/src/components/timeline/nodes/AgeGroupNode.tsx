import { Handle, Position } from '@xyflow/react';

interface AgeGroupNodeProps {
  data: any;
}

export const AgeGroupNode = ({ data }: { data: any }) => {
  return (
    <div
      className="p-6 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-lg min-w-96 max-w-96 transform-gpu pointer-events-auto"
      style={{
        zIndex: 10, // Keep age groups above other elements
        cursor: 'default', // Indicate non-draggable
      }}
    >
      {/* Add handles for vertical timeline flow */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ 
          opacity: 0, // Hide the handle visually but keep functional
          top: -5, // Position slightly outside the node
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ 
          opacity: 0, // Hide the handle visually but keep functional
          bottom: -5, // Position slightly outside the node
        }}
      />
      
      {/* Add side handles for milestone connections */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ 
          opacity: 0, // Hide the handle visually
          left: -5,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ 
          opacity: 0, // Hide the handle visually
          right: -5,
        }}
      />
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
        </div>
      </div>

      {data.description && <p className="text-gray-600">{data.description}</p>}
    </div>
  );
};
