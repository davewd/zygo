# Timeline Component Architecture Refactoring

## Overview

The PedagogyTimelineVertical component has been refactored into a modular, maintainable architecture with clear separation of concerns.

## New Structure

```
components/timeline/
├── index.ts                          # Main exports
├── types.ts                          # TypeScript interfaces and types
├── constants.ts                      # Static data and configuration
├── VerticalTimeline.tsx              # Main timeline component
├── ReactFlowTimeline.tsx             # ReactFlow wrapper component
├── PedagogyTimelineVertical.tsx      # Legacy wrapper (deprecated)
├── nodes/                            # Node components
│   ├── index.ts                      # Node exports
│   ├── MilestoneNode.tsx             # Milestone node component
│   ├── CategoryNode.tsx              # Category node component
│   └── AgeGroupNode.tsx              # Age group node component
├── panels/                           # Control panels
│   ├── TimelineControlPanel.tsx      # Zoom and navigation controls
│   └── TimelineFilterPanel.tsx      # Filtering controls
├── hooks/                            # Custom hooks
│   ├── useTimelineData.ts            # Data management hook
│   ├── useTimelineFilters.ts         # Filter state hook
│   └── useTimelineZoom.ts            # Zoom state hook
└── utils/                            # Utility functions
    ├── milestoneGeneration.ts        # Milestone data generation
    └── layoutCalculation.ts          # Node positioning algorithms
```

## Key Improvements

### 1. **Separation of Concerns**
- **Data Logic**: Extracted into custom hooks (`useTimelineData`, `useTimelineFilters`, `useTimelineZoom`)
- **UI Components**: Split into focused, reusable components
- **Business Logic**: Separated into utility functions
- **Configuration**: Centralized in constants and types files

### 2. **Component Hierarchy**
- **VerticalTimeline**: Main component that orchestrates everything
- **ReactFlowTimeline**: Handles ReactFlow-specific logic and rendering
- **Node Components**: Individual components for different node types
- **Panel Components**: Reusable control panels

### 3. **Type Safety**
- Comprehensive TypeScript interfaces in `types.ts`
- Proper typing for all components and hooks
- Clear contracts between components

### 4. **Maintainability**
- Small, focused files (each under 200 lines)
- Clear naming conventions
- Consistent code organization
- Easy to test individual components

### 5. **Reusability**
- Modular components can be used independently
- Custom hooks can be reused in other contexts
- Utility functions are pure and testable

## Usage

### Basic Usage
```tsx
import { VerticalTimeline } from './components/timeline';

function App() {
  const handleNodeClick = (nodeId: string, nodeData: any) => {
    console.log('Node clicked:', nodeId, nodeData);
  };

  return (
    <VerticalTimeline 
      pedagogyData={pedagogyData}
      onNodeClick={handleNodeClick}
    />
  );
}
```

### Legacy Compatibility
The original `PedagogyTimelineVertical` component is still available as a deprecated wrapper:

```tsx
import VerticalTimeLine from './components/timeline/PedagogyTimelineVertical';
// Still works, but shows deprecation warning
```

## Key Components

### VerticalTimeline
Main component that:
- Manages overall timeline state
- Coordinates between hooks and subcomponents
- Provides the ReactFlow context

### Custom Hooks

#### useTimelineData
- Manages milestone and node data
- Handles data generation and filtering
- Calculates node positions

#### useTimelineFilters
- Manages category and family member filters
- Provides filter toggle functions

#### useTimelineZoom
- Manages zoom levels and focus states
- Handles zoom controls and node focusing

### Node Components
- **MilestoneNode**: Displays individual milestones with progress
- **CategoryNode**: Groups milestones by development category  
- **AgeGroupNode**: Represents age ranges and periods

### Panel Components
- **TimelineControlPanel**: Zoom controls and level information
- **TimelineFilterPanel**: Category and family member filters

## Configuration

### Zoom Levels
Defined in `constants.ts`:
- **Overview**: Age groups only (prenatal to 18 years)
- **Age Group Focus**: Age groups with milestones
- **Milestone Deep Dive**: Detailed milestone view

### Development Categories
Support for 8 development categories:
- Physical, Cognitive, Social/Emotional, Language
- Motor Skills, Sensory, Self Care, Academic

### Layout Algorithm
Advanced positioning system:
- Collision detection and avoidance
- Radial positioning around age groups
- Responsive layout based on canvas size
- Horizontal centering with vertical scrolling

## Migration Notes

### From Legacy Component
1. Import the new component: `import { VerticalTimeline } from './components/timeline'`
2. Props remain the same: `pedagogyData` and `onNodeClick`
3. All functionality is preserved with improved performance

### Customization Points
- **Node Rendering**: Override node components in `nodes/`
- **Layout**: Modify algorithms in `utils/layoutCalculation.ts`
- **Data Generation**: Extend `utils/milestoneGeneration.ts`
- **Styling**: Update constants in `constants.ts`

## Performance Improvements

1. **Reduced Bundle Size**: Smaller, tree-shakeable components
2. **Better Memoization**: React.memo and useMemo in appropriate places
3. **Optimized Renders**: Separated concerns reduce unnecessary re-renders
4. **Lazy Loading**: Components can be lazy-loaded as needed

## Testing Strategy

Each component can be tested independently:
- **Unit Tests**: Individual components and hooks
- **Integration Tests**: Component interactions
- **Visual Tests**: Layout and positioning algorithms
- **Performance Tests**: Large dataset rendering

## Future Enhancements

The modular architecture enables easy addition of:
- New node types
- Additional zoom levels  
- Custom layout algorithms
- Different data sources
- Alternative rendering engines
- Animation systems
- Accessibility features

## Dependencies

- `@xyflow/react`: ^12.7.0 (ReactFlow for graph rendering)
- `lucide-react`: Icons
- `@zygo/ui`: UI components
- `react`: Standard React hooks and patterns

## Files Changed

### New Files Created
- All files in the new timeline structure (21 new files)

### Modified Files  
- `PedagogyTimelineVertical.tsx`: Converted to legacy wrapper

### Deprecated
- Original monolithic `PedagogyTimelineVertical.tsx` implementation

This refactoring maintains full backward compatibility while providing a much more maintainable and extensible codebase for future development.
