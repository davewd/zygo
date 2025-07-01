import { AchievementNode } from './AchievementNode';
import { AgeGroupNode } from './AgeGroupNode';
import { CategoryNode } from './CategoryNode';
import { KeyMilestoneNode } from './KeyMilestoneNode';
import { MilestoneNode } from './MilestoneNode';
import { StepNode } from './StepNode';

export const nodeTypes = {
  milestone: MilestoneNode,
  keyMilestone: KeyMilestoneNode,
  category: CategoryNode,
  ageGroup: AgeGroupNode,
  achievement: AchievementNode,
  step: StepNode,
};

export {
  AchievementNode,
  AgeGroupNode,
  CategoryNode,
  KeyMilestoneNode,
  MilestoneNode,
  StepNode
};

