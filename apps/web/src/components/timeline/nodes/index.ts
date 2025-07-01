import { AgeGroupNode } from './AgeGroupNode';
import { CategoryNode } from './CategoryNode';
import { MilestoneNode } from './MilestoneNode';
import { ConceptionNode } from './ConceptionNode';
import { AchievementNode } from './AchievementNode';
import { StepNode } from './StepNode';

export const nodeTypes = {
  milestone: MilestoneNode,
  category: CategoryNode,
  ageGroup: AgeGroupNode,
  conception: ConceptionNode,
  achievement: AchievementNode,
  step: StepNode,
};

export { AgeGroupNode, CategoryNode, MilestoneNode, ConceptionNode, AchievementNode, StepNode };

