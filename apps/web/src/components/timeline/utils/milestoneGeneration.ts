import { DEVELOPMENT_CATEGORIES } from '../constants';
import { AgeRange, MilestoneData } from '../types';

export const generateAgeRanges = (): AgeRange[] => {
  const ranges: AgeRange[] = [];
  
  // Prenatal periods
  ranges.push({
    key: 'prenatal-first',
    range: 'Prenatal (First Trimester)',
    description: 'Initial fetal development',
    months: [-9, -6],
  });
  
  ranges.push({
    key: 'prenatal-second',
    range: 'Prenatal (Second Trimester)',
    description: 'Organ development and growth',
    months: [-6, -3],
  });
  
  ranges.push({
    key: 'prenatal-third',
    range: 'Prenatal (Third Trimester)',
    description: 'Rapid brain development and preparation for birth',
    months: [-3, 0],
  });

  // Infancy and early childhood (0-60 months / 5 years) - every 6 months
  for (let months = 0; months < 60; months += 6) {
    const endMonth = months + 6;
    const startYear = Math.floor(months / 12);
    const endYear = Math.floor(endMonth / 12);
    
    let rangeLabel: string;
    let description: string;
    
    if (endMonth <= 12) {
      rangeLabel = `${months}-${endMonth} months`;
      description = 'Early infancy development';
    } else if (endMonth <= 24) {
      rangeLabel = `${startYear === 0 ? months + ' months' : startYear + ' year'} - ${Math.floor(endMonth / 12) === 1 ? '1 year' : endMonth + ' months'}`;
      description = 'Toddler development milestones';
    } else {
      const startLabel = startYear === 0 ? `${months} months` : `${startYear} year${startYear > 1 ? 's' : ''}`;
      const endLabel = endYear === 0 ? `${endMonth} months` : `${endYear} year${endYear > 1 ? 's' : ''}`;
      rangeLabel = `${startLabel} - ${endLabel}`;
      description = 'Early childhood development';
    }
    
    ranges.push({
      key: `months-${months}-${endMonth}`,
      range: rangeLabel,
      description,
      months: [months, endMonth],
    });
  }

  // School age (5-12 years) - yearly
  for (let year = 5; year < 12; year++) {
    ranges.push({
      key: `year-${year}-${year + 1}`,
      range: `${year}-${year + 1} years`,
      description: 'School age development',
      months: [year * 12, (year + 1) * 12],
    });
  }

  // Adolescence (12-18 years) - every 2 years
  for (let year = 12; year < 18; year += 2) {
    const endYear = Math.min(year + 2, 18);
    ranges.push({
      key: `teen-${year}-${endYear}`,
      range: `${year}-${endYear} years`,
      description: 'Adolescent development',
      months: [year * 12, endYear * 12],
    });
  }

  return ranges;
};

export const generateComprehensiveMilestones = (): MilestoneData[] => {
  const milestones: MilestoneData[] = [];
  const ageRanges = generateAgeRanges();

  // Milestone templates by category and age period
  const milestoneTemplates = {
    prenatal: {
      physical: [
        'Neural tube formation',
        'Heart development begins', 
        'Limb bud formation',
        'Organ system development',
        'Fetal movement begins',
        'Rapid brain growth',
      ],
      cognitive: [
        'Basic neural connections',
        'Sensory system development',
        'Early brain wave activity',
        'Memory pathway formation',
        'Sleep-wake cycles develop',
        'Response to external stimuli',
      ],
      social_emotional: [
        'Maternal bonding begins',
        'Stress response system',
        'Emotional regulation foundation',
        'Attachment preparation',
        'Recognition of maternal voice',
        'Emotional circuitry development',
      ],
      language: [
        'Auditory system formation',
        'Sound processing development',
        'Vocal cord formation',
        'Language area brain development',
        'Maternal voice recognition',
        'Sound discrimination ability',
      ],
      motor_skills: [
        'Basic motor pathway formation',
        'Reflexive movement development',
        'Limb coordination begins',
        'Muscle tone development',
        'Movement coordination',
        'Motor control preparation',
      ],
      sensory: [
        'Visual system formation',
        'Hearing development',
        'Touch sensitivity',
        'Taste bud formation',
        'Smell receptor development',
        'Sensory integration begins',
      ],
      self_care: [
        'Basic survival reflexes',
        'Feeding preparation',
        'Temperature regulation',
        'Sleep pattern formation',
        'Breathing coordination',
        'Digestive system maturation',
      ],
      academic: [
        'Foundation for learning',
        'Memory system development',
        'Pattern recognition begins',
        'Information processing',
        'Attention system formation',
        'Learning readiness preparation',
      ],
    },
    infancy: {
      physical: [
        'Head control',
        'Rolling over',
        'Sitting without support',
        'Crawling/creeping',
        'Standing with support',
        'Walking independently',
        'Running and jumping',
        'Climbing up stairs',
      ],
      cognitive: [
        'Tracking objects with eyes',
        'Object permanence',
        'Cause and effect understanding',
        'Simple problem solving',
        'Imitation of actions',
        'Symbolic thinking begins',
        'Memory development',
        'Attention span increases',
      ],
      social_emotional: [
        'Social smiling',
        'Stranger anxiety',
        'Separation anxiety',
        'Attachment formation',
        'Emotional expression',
        'Empathy development',
        'Self-awareness begins',
        'Peer interest',
      ],
      language: [
        'Cooing and babbling',
        'First words',
        'Vocabulary growth',
        'Two-word combinations',
        'Understanding simple commands',
        'Gesture communication',
        'Story comprehension',
        'Question asking begins',
      ],
      motor_skills: [
        'Grasping reflex',
        'Pincer grasp',
        'Hand-eye coordination',
        'Fine motor control',
        'Throwing objects',
        'Stacking blocks',
        'Scribbling motions',
        'Tool use begins',
      ],
      sensory: [
        'Visual tracking',
        'Sound localization',
        'Texture exploration',
        'Taste preferences',
        'Sensory integration',
        'Multi-sensory processing',
        'Environmental awareness',
        'Sensory preferences',
      ],
      self_care: [
        'Feeding coordination',
        'Sleep routines',
        'Basic hygiene awareness',
        'Clothing recognition',
        'Self-soothing',
        'Independence attempts',
        'Personal preferences',
        'Routine participation',
      ],
      academic: [
        'Visual attention',
        'Pattern recognition',
        'Sorting behaviors',
        'Cause-effect learning',
        'Imitation learning',
        'Sequential understanding',
        'Problem-solving attempts',
        'Learning through play',
      ],
    },
    earlyChildhood: {
      physical: [
        'Pedaling tricycle',
        'Throwing and catching',
        'Balance beam walking',
        'Fine motor precision',
        'Drawing shapes',
        'Cutting with scissors',
        'Dressing independently',
        'Coordinated movements',
      ],
      cognitive: [
        'Pretend play',
        'Classification skills',
        'Number recognition',
        'Letter recognition',
        'Problem-solving strategies',
        'Memory games',
        'Logical thinking',
        'Abstract concepts',
      ],
      social_emotional: [
        'Parallel play',
        'Cooperative play',
        'Emotional regulation',
        'Friendship formation',
        'Rule following',
        'Conflict resolution',
        'Self-control',
        'Emotional intelligence',
      ],
      language: [
        'Complex sentences',
        'Story telling',
        'Conversation skills',
        'Reading readiness',
        'Phonemic awareness',
        'Vocabulary expansion',
        'Grammar mastery',
        'Narrative skills',
      ],
      motor_skills: [
        'Precise hand movements',
        'Tool manipulation',
        'Drawing and writing',
        'Construction skills',
        'Sports basics',
        'Coordination games',
        'Balance activities',
        'Strength development',
      ],
      sensory: [
        'Sensory discrimination',
        'Cross-modal processing',
        'Sensory preferences',
        'Environmental adaptation',
        'Sensory seeking/avoiding',
        'Multi-sensory learning',
        'Sensory memory',
        'Perceptual skills',
      ],
      self_care: [
        'Independent toileting',
        'Self-feeding mastery',
        'Dressing skills',
        'Personal hygiene',
        'Safety awareness',
        'Responsibility taking',
        'Choice making',
        'Self-advocacy',
      ],
      academic: [
        'Pre-reading skills',
        'Number concepts',
        'Scientific thinking',
        'Creative expression',
        'Following instructions',
        'Task completion',
        'Learning strategies',
        'Academic readiness',
      ],
    },
    schoolAge: {
      physical: [
        'Sports participation',
        'Complex motor skills',
        'Physical endurance',
        'Coordination mastery',
        'Team sports',
        'Fine motor precision',
        'Physical fitness',
        'Body awareness',
      ],
      cognitive: [
        'Academic skills',
        'Critical thinking',
        'Study strategies',
        'Mathematical reasoning',
        'Scientific thinking',
        'Research skills',
        'Complex problem solving',
        'Abstract reasoning',
      ],
      social_emotional: [
        'Peer relationships',
        'Group dynamics',
        'Leadership skills',
        'Moral reasoning',
        'Self-concept',
        'Achievement motivation',
        'Social skills',
        'Emotional maturity',
      ],
      language: [
        'Advanced vocabulary',
        'Writing skills',
        'Reading fluency',
        'Communication skills',
        'Language arts',
        'Multiple languages',
        'Public speaking',
        'Literary appreciation',
      ],
      motor_skills: [
        'Specialized skills',
        'Athletic performance',
        'Artistic abilities',
        'Technical skills',
        'Competitive sports',
        'Precision tasks',
        'Endurance activities',
        'Skill refinement',
      ],
      sensory: [
        'Sensory expertise',
        'Environmental mastery',
        'Sensory strategies',
        'Perceptual learning',
        'Sensory integration',
        'Adaptive responses',
        'Sensory preferences',
        'Multi-modal learning',
      ],
      self_care: [
        'Personal organization',
        'Time management',
        'Health maintenance',
        'Safety judgment',
        'Independence',
        'Responsibility',
        'Self-monitoring',
        'Life skills',
      ],
      academic: [
        'Subject mastery',
        'Study skills',
        'Research abilities',
        'Critical analysis',
        'Creative projects',
        'Technology use',
        'Learning independence',
        'Academic excellence',
      ],
    },
    adolescence: {
      physical: [
        'Puberty completion',
        'Adult body proportions',
        'Physical maturity',
        'Athletic peak',
        'Body image acceptance',
        'Health awareness',
        'Physical independence',
        'Adult coordination',
      ],
      cognitive: [
        'Abstract thinking',
        'Future planning',
        'Identity formation',
        'Career exploration',
        'Independent learning',
        'Complex reasoning',
        'Decision making',
        'Life skills mastery',
      ],
      social_emotional: [
        'Identity development',
        'Intimate relationships',
        'Value system',
        'Independence',
        'Social responsibility',
        'Emotional maturity',
        'Peer influence balance',
        'Adult relationships',
      ],
      language: [
        'Advanced communication',
        'Professional language',
        'Academic writing',
        'Debate skills',
        'Multiple registers',
        'Cultural communication',
        'Technology communication',
        'Lifelong learning',
      ],
      motor_skills: [
        'Peak performance',
        'Specialized expertise',
        'Professional skills',
        'Athletic mastery',
        'Technical precision',
        'Artistic mastery',
        'Complex coordination',
        'Skill teaching',
      ],
      sensory: [
        'Sensory mastery',
        'Environmental expertise',
        'Sensory careers',
        'Aesthetic appreciation',
        'Sensory teaching',
        'Professional use',
        'Sensory research',
        'Lifelong adaptation',
      ],
      self_care: [
        'Adult self-care',
        'Health management',
        'Life planning',
        'Financial literacy',
        'Relationship skills',
        'Career preparation',
        'Independence',
        'Life mastery',
      ],
      academic: [
        'Higher education',
        'Specialized knowledge',
        'Research skills',
        'Career preparation',
        'Lifelong learning',
        'Teaching others',
        'Innovation',
        'Expertise development',
      ],
    },
  };

  // Generate milestones for each age range and category
  ageRanges.forEach((ageRange, rangeIndex) => {
    const { months, key } = ageRange;
    const [startMonth] = months;

    // Determine age period
    let period = 'infancy';
    if (startMonth < 0) period = 'prenatal';
    else if (startMonth >= 24 && startMonth < 60) period = 'earlyChildhood';
    else if (startMonth >= 60 && startMonth < 144) period = 'schoolAge';
    else if (startMonth >= 144) period = 'adolescence';

    // Generate milestones for each category
    DEVELOPMENT_CATEGORIES.forEach((category) => {
      const templates = milestoneTemplates[period]?.[category] || [];
      const milestoneIndex = rangeIndex % templates.length;

      if (templates[milestoneIndex]) {
        milestones.push({
          id: `milestone-${key}-${category}-${milestoneIndex}`,
          title: templates[milestoneIndex],
          description: `${templates[milestoneIndex]} development milestone for ${ageRange.range}`,
          category: category,
          ageRange: ageRange.range,
          ageRangeKey: key,
          months: months,
          period: period,
          isTypical: true,
          importance: 'high',
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
        });
      }
    });
  });

  return milestones;
};
