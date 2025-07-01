// Quick test of the new timeline API
import { getAllMilestones, getKeyMilestones, validateTimelineIntegrity } from './src/lib/api/timeline';

async function testAPI() {
  console.log('Testing Timeline API...');
  
  const milestones = await getAllMilestones();
  console.log(`✅ Loaded ${milestones.length} milestones`);
  
  const keyMilestones = await getKeyMilestones();
  console.log(`✅ Found ${keyMilestones.length} key milestones:`, keyMilestones.map(m => m.id));
  
  const validation = await validateTimelineIntegrity();
  console.log('✅ Validation results:', {
    milestones: validation.milestonesCount,
    achievements: validation.achievementsCount,
    steps: validation.stepsCount,
    invalidPrereqs: validation.invalidPrerequisites.length,
    invalidAchievementRefs: validation.invalidAchievementRefs.length,
    invalidStepRefs: validation.invalidStepRefs.length
  });
}

testAPI().catch(console.error);
