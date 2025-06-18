// filepath: /Users/daviddawson/Library/Mobile Documents/com~apple~CloudDocs/Documents/projects/zygo/apps/web/src/components/timeline/PedagogyTimelineVertical.tsx

/**
 * @deprecated This file is being refactored. Use the new VerticalTimeline component instead.
 * @see /components/timeline/VerticalTimeline.tsx
 */

import { VerticalTimeline } from './VerticalTimeline';
import { TimelinePedagogyProps } from './types';

/**
 * Legacy component wrapper for backwards compatibility
 * @deprecated Use VerticalTimeline instead
 */
const VerticalTimeLine = (props: TimelinePedagogyProps) => {
  return <VerticalTimeline {...props} />;
};

export default VerticalTimeLine;
