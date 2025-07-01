import { Handle, Position } from '@xyflow/react';

interface VerticalHandlesProps {
  showTarget?: boolean;
  showSource?: boolean;
  includeHorizontalHandles?: boolean; // For backward compatibility
}

export const VerticalHandles = ({
  showTarget = true,
  showSource = true,
  includeHorizontalHandles = false,
}: VerticalHandlesProps) => {
  return (
    <>
      {/* Top handle for incoming connections */}
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          style={{
            opacity: 0, // Hide the handle visually but keep it functional
            top: -8,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#3b82f6',
            border: '2px solid white',
          }}
        />
      )}

      {/* Bottom handle for outgoing connections */}
      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          style={{
            opacity: 0, // Hide the handle visually but keep it functional
            bottom: -8,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#3b82f6',
            border: '2px solid white',
          }}
        />
      )}

      {/* Optional horizontal handles for backward compatibility */}
      {includeHorizontalHandles && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            id="left"
            style={{
              opacity: 0, // Hidden like vertical handles
              left: -8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#6b7280',
              border: '1px solid white',
            }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="right"
            style={{
              opacity: 0, // Hidden like vertical handles
              right: -8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#6b7280',
              border: '1px solid white',
            }}
          />
        </>
      )}
    </>
  );
};

// Optional: Component for nodes that need all four handles but prioritize vertical
export const AllHandlesWithVerticalPriority = () => {
  return (
    <>
      {/* Primary vertical handles */}
      <VerticalHandles />

      {/* Secondary horizontal handles (less prominent) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
          opacity: 0.3, // More transparent to de-emphasize
          left: -6,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#6b7280',
          border: '1px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          opacity: 0.3, // More transparent to de-emphasize
          right: -6,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#6b7280',
          border: '1px solid white',
        }}
      />
    </>
  );
};
