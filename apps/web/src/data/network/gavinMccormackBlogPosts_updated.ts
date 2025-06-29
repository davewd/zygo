// Blog posts from Gavin McCormack's website
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  authorId: string;
  publishDate: string;
  tags: string[];
  hasReferences: boolean;
  peerLikes: {
    count: number;
    likedBy: PeerLike[];
  };
  readingTime: number;
}

export interface PeerLike {
  providerId: string;
  providerName: string;
  credentials: string[];
  specializations: string[];
  dateLiked: string;
}

// Sample blog posts from Gavin McCormack's website (https://gavinmccormack.com.au/blog/)
export const GAVIN_MCCORMACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-detention-doesnt-work',
    title: 'Why Detention Doesn\'t—and Has Never—Worked',
    excerpt: 'A global, neuroscience-backed look at why isolating children does more harm than good.',
    content: `<p>Detention. It's one of the oldest tools in the behavioural toolkit—keeping children isolated from their peers as a consequence for their actions. Yet, despite decades of use, detention continues to fail our children and our educational systems.</p>

<p>From a neuroscience perspective, detention activates the brain's threat response system. When children feel isolated and punished, their stress hormones spike, making learning virtually impossible. The prefrontal cortex—responsible for decision-making and emotional regulation—goes offline, replaced by survival mode thinking.</p>

<h3>The Real Impact of Isolation</h3>
<p>Research consistently shows that punitive isolation:</p>
<ul>
  <li>Increases aggressive behaviour rather than reducing it</li>
  <li>Damages the teacher-student relationship</li>
  <li>Creates resentment and disconnection from school</li>
  <li>Fails to teach appropriate alternative behaviours</li>
</ul>

<h3>Better Alternatives</h3>
<p>Instead of detention, consider restorative approaches that help children understand the impact of their actions and develop better strategies for the future. Connection, not isolation, is what changes behaviour.</p>

<p><em>Read the full article at: <a href="https://gavinmccormack.com.au/why-detention-doesnt-and-has-never-worked/" target="_blank">https://gavinmccormack.com.au/why-detention-doesnt-and-has-never-worked/</a></em></p>`,
    imageUrl: '/images/blog/detention-alternatives.svg',
    authorId: 'gavin-mccormack',
    publishDate: '2025-05-19',
    tags: ['education', 'classroom-management', 'neuroscience', 'behaviour'],
    hasReferences: true,
    peerLikes: {
      count: 12,
      likedBy: [
        {
          providerId: 'sarah-mitchell-director',
          providerName: 'Sarah Mitchell',
          credentials: ['BEd', 'MEd'],
          specializations: ['Early Childhood Education', 'Educational Leadership'],
          dateLiked: '2025-05-20'
        }
      ]
    },
    readingTime: 6
  },
  {
    id: 'model-behaviour-children',
    title: 'Model the Behaviour You Wish to View in Your Child',
    excerpt: 'Children are a product of their environment. They are constantly watching, absorbing, and learning from the people they trust most.',
    content: `<p>Children are remarkable observers. They watch our every move, absorb our emotional responses, and mirror our behaviours—often when we least expect it. This gives us an incredible opportunity and responsibility as parents and educators.</p>

<h3>The Power of Modelling</h3>
<p>When we model:</p>
<ul>
  <li><strong>Kindness</strong> - our children learn compassion</li>
  <li><strong>Curiosity</strong> - they develop a love of learning</li>
  <li><strong>Patience</strong> - they learn emotional regulation</li>
  <li><strong>Respect</strong> - they understand healthy relationships</li>
</ul>

<h3>Practical Examples</h3>
<p>Instead of telling children to "be kind," show them kindness in action. Help a neighbor, listen without judgment, or offer encouragement to someone struggling. Children learn far more from what they see than what they hear.</p>

<p>Remember: you are your child's first and most influential teacher. What lessons are you teaching today?</p>

<p><em>Read the full article at: <a href="https://gavinmccormack.com.au/model-the-behaviour-you-wish-to-view-in-your-child-4/" target="_blank">https://gavinmccormack.com.au/model-the-behaviour-you-wish-to-view-in-your-child-4/</a></em></p>`,
    imageUrl: '/images/blog/model-behaviour.svg',
    authorId: 'gavin-mccormack',
    publishDate: '2025-04-29',
    tags: ['parenting', 'child-development', 'role-modeling', 'behaviour'],
    hasReferences: false,
    peerLikes: {
      count: 15,
      likedBy: [
        {
          providerId: 'rebecca-cavallaro',
          providerName: 'Rebecca Cavallaro',
          credentials: ['IBCLC', 'RM', 'RN'],
          specializations: ['Lactation Support', 'Postnatal Care'],
          dateLiked: '2025-04-30'
        }
      ]
    },
    readingTime: 4
  },
  {
    id: 'rethinking-classroom-engagement',
    title: 'Rethinking Engagement in the Classroom: 10 Simple Ways to Keep Children Interested in Learning',
    excerpt: 'The issue we\'re facing with school refusal and disengaged students is a complex one. Many children today find themselves in environments that don\'t connect with their natural learning style.',
    content: `<p>The issue we're facing with school refusal and disengaged students is a complex one, to say the least. Many children today find themselves in environments that don't match their natural learning patterns and curiosity.</p>

<h3>Understanding Disengagement</h3>
<p>When children disengage from learning, it's often because:</p>
<ul>
  <li>The content feels irrelevant to their lives</li>
  <li>They're not given choice or autonomy</li>
  <li>The pace doesn't match their learning style</li>
  <li>They feel unsafe or unsupported</li>
</ul>

<h3>10 Simple Engagement Strategies</h3>
<ol>
  <li><strong>Connect learning to real life</strong> - Show how skills apply outside the classroom</li>
  <li><strong>Offer choice</strong> - Let students choose topics, methods, or presentation styles</li>
  <li><strong>Use movement</strong> - Incorporate physical activity into lessons</li>
  <li><strong>Create collaborative projects</strong> - Learning is social</li>
  <li><strong>Ask questions that matter</strong> - Open-ended inquiries that spark curiosity</li>
  <li><strong>Celebrate effort over outcome</strong> - Process-focused praise</li>
  <li><strong>Use storytelling</strong> - Narrative makes everything more engaging</li>
  <li><strong>Incorporate technology meaningfully</strong> - Not just for the sake of it</li>
  <li><strong>Provide immediate feedback</strong> - Students need to know how they're progressing</li>
  <li><strong>Make it fun</strong> - Joy is a powerful learning accelerator</li>
</ol>

<p><em>Read the full article at: <a href="https://gavinmccormack.com.au/rethinking-engagement-in-the-classroom-10-simple-ways-to-keep-children-interested-in-learning/" target="_blank">https://gavinmccormack.com.au/rethinking-engagement-in-the-classroom-10-simple-ways-to-keep-children-interested-in-learning/</a></em></p>`,
    imageUrl: '/images/blog/classroom-engagement.svg',
    authorId: 'gavin-mccormack',
    publishDate: '2025-02-22',
    tags: ['education', 'classroom-management', 'student-engagement', 'teaching-strategies'],
    hasReferences: false,
    peerLikes: {
      count: 18,
      likedBy: [
        {
          providerId: 'emily-mcconaghy',
          providerName: 'Emily McConaghy',
          credentials: ['BExSc', 'CertIV'],
          specializations: ['Recreational Gymnastics', 'Early Childhood Movement'],
          dateLiked: '2025-02-23'
        }
      ]
    },
    readingTime: 7
  },
  {
    id: 'children-truly-loved',
    title: 'What Happens When Our Children Truly Know They\'re Loved—And How to Show It',
    excerpt: 'Love in Action: Small Gestures with a Big Impact. As parents, it\'s easy to assume that our children know we love them.',
    content: `<p>"Love in Action: Small Gestures with a Big Impact" As parents, it's easy to assume that our children know we love them. After all, we provide for them, keep them safe, and care for their needs. But knowing they're loved and feeling loved are two very different things.</p>

<h3>The Science of Felt Love</h3>
<p>When children feel genuinely loved and valued, amazing things happen:</p>
<ul>
  <li>Their stress levels decrease significantly</li>
  <li>They become more resilient in facing challenges</li>
  <li>Their capacity for empathy and connection grows</li>
  <li>They develop a secure sense of self-worth</li>
  <li>Academic performance often improves naturally</li>
</ul>

<h3>How to Show Love That Children Feel</h3>
<p><strong>Quality Time:</strong> Put down devices and be fully present. Even 10 minutes of undivided attention speaks volumes.</p>

<p><strong>Active Listening:</strong> Really hear what they're saying, not just their words but their emotions.</p>

<p><strong>Physical Affection:</strong> Hugs, high-fives, a hand on the shoulder - appropriate touch releases oxytocin.</p>

<p><strong>Words of Affirmation:</strong> "I see how hard you're trying," "You matter to me," "I'm proud of who you are."</p>

<p><strong>Acts of Service:</strong> Small gestures that show you're thinking of them.</p>

<p><em>Read the full article at: <a href="https://gavinmccormack.com.au/what-happens-when-our-children-truly-know-theyre-loved-and-how-to-show-it/" target="_blank">https://gavinmccormack.com.au/what-happens-when-our-children-truly-know-theyre-loved-and-how-to-show-it/</a></em></p>`,
    imageUrl: '/images/blog/children-loved.svg',
    authorId: 'gavin-mccormack',
    publishDate: '2025-01-14',
    tags: ['parenting', 'child-development', 'emotional-wellbeing', 'love-languages'],
    hasReferences: true,
    peerLikes: {
      count: 22,
      likedBy: [
        {
          providerId: 'andrea-dunne',
          providerName: 'Andrea Dunne',
          credentials: ['PhD', 'RN'],
          specializations: ['Clinical Psychology', 'Perinatal Mental Health'],
          dateLiked: '2025-01-15'
        }
      ]
    },
    readingTime: 5
  },
  {
    id: 'teachers-need-holidays',
    title: 'Why Do Teachers Need Their Holidays?',
    excerpt: 'Recharging, rediscovering inspiration, and why time off isn\'t a luxury—it\'s a necessity.',
    content: `<p>This Christmas, I spent my annual leave rowing a kayak through the Andaman Sea, completely disconnected from emails, lesson plans, and the endless demands of teaching. It was exactly what I needed—and it reminded me why teachers' holidays aren't just a perk, they're essential.</p>

<h3>The Myth of "Easy" Teacher Hours</h3>
<p>There's a persistent myth that teachers have it easy because of school holidays. This couldn't be further from the truth. Teaching is one of the most emotionally and mentally demanding professions:</p>
<ul>
  <li>We're "on" for 6-8 hours straight with minimal breaks</li>
  <li>We make hundreds of decisions every day</li>
  <li>We absorb the emotional needs of 20-30+ children daily</li>
  <li>We work evenings and weekends planning and marking</li>
</ul>

<h3>Why Rest Matters</h3>
<p>When teachers are rested and recharged:</p>
<ul>
  <li>We bring renewed energy and creativity to the classroom</li>
  <li>We're more patient and emotionally available for students</li>
  <li>We can think more clearly and make better educational decisions</li>
  <li>We model healthy work-life balance for our students</li>
</ul>

<p>So the next time someone comments on teachers' holidays, remind them: we're not resting because we're lazy—we're recharging because our students deserve our very best.</p>

<p><em>Read the full article at: <a href="https://gavinmccormack.com.au/why-do-teachers-need-their-holidays/" target="_blank">https://gavinmccormack.com.au/why-do-teachers-need-their-holidays/</a></em></p>`,
    imageUrl: '/images/blog/teacher-wellbeing.svg',
    authorId: 'gavin-mccormack',
    publishDate: '2025-01-12',
    tags: ['education', 'teacher-wellbeing', 'work-life-balance', 'self-care'],
    hasReferences: false,
    peerLikes: {
      count: 28,
      likedBy: [
        {
          providerId: 'james-thompson',
          providerName: 'James Thompson',
          credentials: ['BExSc', 'UEFA B'],
          specializations: ['Youth Coaching', 'Sports Development'],
          dateLiked: '2025-01-13'
        }
      ]
    },
    readingTime: 4
  }
];
