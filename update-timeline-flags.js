const fs = require('fs');
const path = require('path');

// Update milestones.json
const milestonesPath = './apps/web/src/lib/api/data/timeline/milestones.json';
const milestones = JSON.parse(fs.readFileSync(milestonesPath, 'utf8'));

// Find the birth milestone index
const birthIndex = milestones.findIndex(milestone => milestone.id === 'birth');
console.log('Birth milestone found at index:', birthIndex);

// Add flags to all milestones
milestones.forEach((milestone, index) => {
  // Add isCompleted flag - true for milestones up to and including birth
  milestone.isCompleted = index <= birthIndex;
  
  // Add isCurrentGoal flag - false by default, keep existing true values
  if (!milestone.hasOwnProperty('isCurrentGoal')) {
    milestone.isCurrentGoal = false;
  }
});

// Set a few additional goal milestones for demo
const goalMilestones = ['months_6_12_physical_1', 'months_12_18_physical_1', 'months_18_24_cognitive_1'];
goalMilestones.forEach(id => {
  const milestone = milestones.find(m => m.id === id);
  if (milestone) {
    milestone.isCurrentGoal = true;
  }
});

// Write back to file
fs.writeFileSync(milestonesPath, JSON.stringify(milestones, null, 2));
console.log('Updated milestones.json with isCompleted and isCurrentGoal flags');
console.log('Completed milestones:', milestones.filter(m => m.isCompleted).length);
console.log('Goal milestones:', milestones.filter(m => m.isCurrentGoal).length);

// Update achievements.json
const achievementsPath = './apps/web/src/lib/api/data/timeline/achievements.json';
const achievements = JSON.parse(fs.readFileSync(achievementsPath, 'utf8'));

achievements.forEach(achievement => {
  // Check if the fromMilestone is completed to determine if this achievement is completed
  const fromMilestone = milestones.find(m => m.id === achievement.fromMilestone);
  achievement.isCompleted = fromMilestone ? fromMilestone.isCompleted : false;
  achievement.isCurrentGoal = false; // Default to false for achievements
});

fs.writeFileSync(achievementsPath, JSON.stringify(achievements, null, 2));
console.log('Updated achievements.json with isCompleted and isCurrentGoal flags');
console.log('Completed achievements:', achievements.filter(a => a.isCompleted).length);

// Update steps.json
const stepsPath = './apps/web/src/lib/api/data/timeline/steps.json';
const steps = JSON.parse(fs.readFileSync(stepsPath, 'utf8'));

steps.forEach(step => {
  // For steps, we'll use the existing completed field as isCompleted
  step.isCompleted = step.completed || false;
  step.isCurrentGoal = false; // Default to false for steps
});

fs.writeFileSync(stepsPath, JSON.stringify(steps, null, 2));
console.log('Updated steps.json with isCompleted and isCurrentGoal flags');
console.log('Completed steps:', steps.filter(s => s.isCompleted).length);

console.log('\nAll timeline files updated successfully!');
