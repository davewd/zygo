import { AchievementNode } from './AchievementNode';
import { AgeGroupNode } from './AgeGroupNode';
import { CategoryNode } from './CategoryNode';
import { ConceptionNode } from './ConceptionNode';
import { MilestoneNode } from './MilestoneNode';
import { StepNode } from './StepNode';

export const nodeTypes = {
  milestone: MilestoneNode,
  category: CategoryNode,
  ageGroup: AgeGroupNode,
  conception: ConceptionNode,
  achievement: AchievementNode,
  step: StepNode,
};

export { AchievementNode, AgeGroupNode, CategoryNode, ConceptionNode, MilestoneNode, StepNode };

