
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  authorId: string;
  publishDate: string;
  tags: string[];
  isReferenced: boolean;
  referenceBadge?: string;
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

// Blog posts from Full Circle MLS website for Rebecca Cavallaro
export const REBECCA_CAVALLARO_BLOG_POSTS: BlogPost[] = [
  {
    id: 'jaundice-breastfeeding',
    title: 'Jaundice & Breastfeeding',
    excerpt: 'Jaundice is the most common diagnosis in full-term infants during the immediate post-natal period, occurring in approximately 60 percent',
    content: `<p>Jaundice is the most common diagnosis in full-term infants during the immediate post-natal period, occurring in approximately 60 percent of all babies (3 in every 5 babies approximately). It usually occurs during those really important first few weeks where we are establishing breastmilk supply and can greatly impact a breastfeeding journey for a variety of reasons.</p>

<p>Here, we will explore the effects of jaundice on breastfeeding and offer practical tips for parents struggling to breastfeed a jaundice baby.</p>

<p>Jaundice is a common condition in newborns, characterised by a yellowing of the skin and eyes due to elevated bilirubin levels. While jaundice itself does not typically affect a baby's ability to breastfeed, some factors associated with jaundice often do pose challenges:</p>

<ul>
  <li><strong>Lethargy:</strong> Jaundiced babies may exhibit lethargy and decreased energy levels, making it more challenging for them to actively engage in breastfeeding.</li>
  <li><strong>Poor Sucking Reflex:</strong> In some cases, jaundiced newborns may have a weaker sucking reflex, leading to difficulties in latching onto the breast and effectively extracting milk.</li>
  <li><strong>Sleepiness:</strong> Jaundice can make babies sleepier then usual, which may result in decreased feeding frequency and shorter feeding sessions.</li>
</ul>

<p>It's important to remember that breastfeeding remains important for your baby's overall health, even if they have jaundice and there are many way to navigate this short term challenge. Support with a International Board Certified Lactation Consultant (IBCLC) is key.</p>

<h3>Here are some tips to support breastfeeding whilst jaundice is influencing things:</h3>

<ul>
  <li><strong>Frequent Feeds:</strong> Ensure you feed your baby at least 8-12 times a day by waking them approx 3hrs after the start of the previous feed. Frequent feeding stimulates milk production, helps prevent dehydration, and promotes the elimination of bilirubin through bowel movements.</li>
  <li><strong>Wakefulness Techniques:</strong> If your baby is sleepy or less interested in feeding, try gentle techniques to awaken them before breastfeeding. Skin-to-skin is a gentle but very effective way to stimulate their senses and help them breastfeed.</li>
  <li><strong>Comfortable & Effective Latch:</strong> Helping your stably and effectively latch to breastfeed will optimize milk transfer. Seek guidance from a International Board Certified Lactation Consultant (IBCLC) who can help you achieve a deep and effective latch. This is our bread and butter here at Full Circle!</li>
  <li><strong>Breast Compression:</strong> Consider some gentle breast compressions during breastfeeding, to encourage a continuous flow of milk.</li>
</ul>

<p>Overall, while jaundice in newborns can be a very common occurrence, it's crucial to know that you do not need to navigate this alone. Having timely intervention and support is key to protecting a breastfeeding journey and ensuring the wellbeing of your little one.</p>

<h4>References & further resources:</h4>
<ol>
  <li>La Leche League International: <a href="https://llli.org/breastfeeding-info/jaundice/" target="_blank">https://llli.org/breastfeeding-info/jaundice/</a></li>
  <li>Academy for Breastfeeding Medicine: <a href="https://abm.memberclicks.net/assets/DOCUMENTS/PROTOCOLS/22-jaundice-protocol-english.pdf" target="_blank">Jaundice Protocol</a></li>
  <li>American Academy of Pediatrics: <a href="https://www.healthychildren.org/English/ages-stages/baby/Pages/Jaundice.aspx" target="_blank">Jaundice Information</a></li>
  <li>CDC: <a href="https://www.cdc.gov/breastfeeding/disease/jaundice.htm" target="_blank">Breastfeeding and Jaundice</a></li>
</ol>`,
    imageUrl: '/images/blog/jaundice-breastfeeding.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-11-15',
    tags: ['jaundice', 'breastfeeding', 'newborn-care', 'lactation-support'],
    isReferenced: true,
    referenceBadge: 'Referenced in La Leche League International Guidelines',
    peerLikes: {
      count: 12,
      likedBy: [
        {
          providerId: 'dr-justin-tucker',
          providerName: 'Dr. Justin Tucker',
          credentials: ['FRANZCOG', 'CREI'],
          specializations: ['Fertility', 'Obstetrics'],
          dateLiked: '2024-11-16'
        },
        {
          providerId: 'polly-delaney',
          providerName: 'Polly Delaney',
          credentials: ['RM', 'RN'],
          specializations: ['Midwifery', 'Lactation Support'],
          dateLiked: '2024-11-17'
        },
        {
          providerId: 'dr-shelley-rowlands',
          providerName: 'Dr. Shelley Rowlands',
          credentials: ['FRANZCOG', 'MBBS'],
          specializations: ['Obstetrics', 'Gynaecology'],
          dateLiked: '2024-11-18'
        }
      ]
    },
    readingTime: 4
  },
  {
    id: 'mastitis-whole-body-experience',
    title: 'Mastitis… A whole body experience',
    excerpt: 'Mastitis is not just a breast problem, it\'s a whole body problem. New research from the Norwegian Mother, Father and Child Cohort Study',
    content: `<p><strong>Mastitis is not just a breast problem, it's a whole body problem.</strong></p>

<p>Mastitis is a common and distressing maternal postpartum condition, but the relationship between: (1) mastitis timing and antibiotic treatment and; (2) breastfeeding outcomes and postnatal mental health, is somewhat unclear.</p>

<p>The Norwegian Mother, Father and Child Cohort Study (MoBa), based on 79,985 mother-infant dyads looked at the incidence of mastitis and treatment with antibiotics in first 6 months postpartum. The MoBa study wanted to investigate the impact of mastitis timing and antibiotic treatment on breastfeeding practices and postnatal mental health.</p>

<p>Women were classified according to self-reported mastitis within first month ('early') or 1-6 months ('later') postpartum and antibiotic treatment. Breastfeeding outcomes included (1) predominant or (2) any breastfeeding or (3) abrupt breastfeeding cessation, until 6 months postpartum. Maternal mental health was also assessed by self-report at 6 months postpartum.</p>

<h3>The results being:</h3>

<ul>
  <li>The incidence of mastitis was 18.8%, with 36.8% reporting treatment with antibiotics …that's no small percentage.</li>
  <li>Women reporting early mastitis were less likely to report predominant breastfeeding and any breastfeeding for 6 months than women who did not report mastitis…so mastitis can potentially derail a breastfeeding journey.</li>
  <li>The women reporting early mastitis were also more likely to report abrupt breastfeeding cessation - almost 40% more likely!</li>
  <li>Late-onset mastitis was not associated with poorer breastfeeding outcomes.</li>
  <li>Among women reporting mastitis, the risk of abrupt breastfeeding cessation was higher in those also reported antibiotic use.</li>
  <li>Mastitis was associated with an increased risk of mental health problems postpartum.</li>
</ul>

<p><em>(Link to study: <a href="https://pubmed.ncbi.nlm.nih.gov/34841537/" target="_blank">MoBa Study</a>)</em></p>

<p>Here at Full Circle, we understand the impact of mastitis on new mothers and provide timely holistic support to enable women to meet their breastfeeding goals. We consider breastfeeding support 'urgent care', and the MoBa study exemplifies exactly why is it urgent - as poorly managed mastitis can derail an entire breastfeeding journey.</p>

<p>We have supported so many mothers with mastitis over the years at Full Circle, and whilst the MoBa study has very compelling results with a very large cohort of women, we do not see the same level of detrimental outcomes of mastitis as the study found. What we have seen is that by triaging our referrals quickly and providing holistic support that includes consideration of the mental health impacts of mastitis, we can enable women to recover quickly and continue their breastfeeding journey.</p>`,
    imageUrl: '/images/blog/mastitis-experience.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-10-28',
    tags: ['mastitis', 'breastfeeding', 'research', 'mental-health'],
    isReferenced: true,
    referenceBadge: 'Cited in Australian Breastfeeding Association Guidelines',
    peerLikes: {
      count: 18,
      likedBy: [
        {
          providerId: 'dr-alexandra-thompson',
          providerName: 'Dr. Alexandra Thompson',
          credentials: ['MBBS', 'FRACP'],
          specializations: ['Pediatrics', 'Digital Health'],
          dateLiked: '2024-10-29'
        },
        {
          providerId: 'andrea-dunne',
          providerName: 'Andrea Dunne',
          credentials: ['RN', 'FNS'],
          specializations: ['Fertility Nursing', 'Reproductive Medicine'],
          dateLiked: '2024-10-30'
        }
      ]
    },
    readingTime: 5
  },
  {
    id: 'tummy-time-breastfeeding',
    title: 'What does Tummy Time have to do with Breastfeeding?',
    excerpt: 'At first glance, tummy time and breastfeeding might seem unrelated, but they are more connected than you might think. Both play crucial',
    content: `<p>At first glance, tummy time and breastfeeding might seem unrelated, but they are more connected than you might think. Both play crucial roles in your baby's development and can actually support each other in wonderful ways.</p>

<p>Tummy time strengthens the muscles in your baby's neck, shoulders, and core - the same muscles that are essential for effective breastfeeding. When babies have good neck and shoulder strength, they can maintain better positioning at the breast, leading to more efficient milk transfer and less discomfort for both mother and baby.</p>

<p>Additionally, tummy time promotes proper oral motor development. The movements and positions during tummy time help strengthen the muscles around the mouth and jaw, which are crucial for a strong, effective latch during breastfeeding.</p>

<p>For babies who struggle with reflux or prefer one side during feeding, tummy time can help address these asymmetries. The varied positions and movements encourage balanced muscle development and can reduce the impact of positioning preferences that might affect breastfeeding.</p>

<h3>Here are some practical ways to incorporate tummy time to support breastfeeding:</h3>

<ul>
  <li>Start with short sessions right after feeding when baby is content but alert</li>
  <li>Use different surfaces and positions to encourage varied muscle engagement</li>
  <li>Place yourself at baby's eye level during tummy time to encourage neck strengthening</li>
  <li>Watch for signs of fatigue and always supervise tummy time sessions</li>
</ul>

<p>Remember, every baby develops at their own pace. If you're experiencing challenges with either tummy time or breastfeeding, don't hesitate to reach out for support. At Full Circle, we understand how these early developmental milestones work together to support your baby's overall wellbeing.</p>`,
    imageUrl: '/images/blog/tummy-time-breastfeeding.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-11-28',
    tags: ['tummy-time', 'breastfeeding', 'development', 'infant-care'],
    isReferenced: false,
    peerLikes: {
      count: 8,
      likedBy: [
        {
          providerId: 'emily-mcconaghy',
          providerName: 'Emily McConaghy',
          credentials: ['Child Development Specialist'],
          specializations: ['Toddler Development', 'Motor Skills'],
          dateLiked: '2024-11-29'
        }
      ]
    },
    readingTime: 3
  },
  {
    id: 'understanding-oversupply',
    title: 'Understanding Oversupply',
    excerpt: 'Oversupply of breast milk might sound like a good problem to have, but for many mothers, it can create significant challenges for both',
    content: `<p>Oversupply of breast milk might sound like a good problem to have, but for many mothers, it can create significant challenges for both mother and baby. Understanding oversupply is crucial for maintaining a successful breastfeeding relationship.</p>

<p>Oversupply occurs when your body produces more milk than your baby needs. While this might seem beneficial, it can lead to several complications:</p>

<h3>For mothers:</h3>
<ul>
  <li>Engorgement and discomfort</li>
  <li>Increased risk of mastitis and blocked ducts</li>
  <li>Nipple pain from forceful letdown</li>
  <li>Emotional stress from constant leaking</li>
</ul>

<h3>For babies:</h3>
<ul>
  <li>Difficulty managing fast milk flow</li>
  <li>Frequent pulling off the breast or fussiness during feeds</li>
  <li>Green, frothy stools from getting too much foremilk</li>
  <li>Inadequate weight gain despite frequent feeding</li>
</ul>

<p>The key to managing oversupply is gradual reduction rather than sudden changes. Here are some gentle strategies:</p>

<ul>
  <li>Feed from one breast per session to allow the unused breast to get the message to reduce production</li>
  <li>Express just enough for comfort rather than completely emptying</li>
  <li>Use cold compresses between feeds to reduce inflammation</li>
  <li>Consider block feeding under professional guidance</li>
</ul>

<p>It's important to work with an IBCLC when managing oversupply, as the strategies need to be tailored to your specific situation. What works for one mother-baby pair may not work for another.</p>

<p>At Full Circle, we see many mothers struggling with oversupply, and we're here to provide the individualized support you need to find balance and comfort in your breastfeeding journey.</p>`,
    imageUrl: '/images/blog/understanding-oversupply.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-09-15',
    tags: ['oversupply', 'breastfeeding', 'lactation-management', 'ibclc-support'],
    isReferenced: true,
    referenceBadge: 'Featured in International Lactation Consultant Association Resources',
    peerLikes: {
      count: 15,
      likedBy: [
        {
          providerId: 'sarah-digital-specialist',
          providerName: 'Sarah Williams',
          credentials: ['IBCLC', 'Digital Health Specialist'],
          specializations: ['Lactation Support', 'Digital Health'],
          dateLiked: '2024-09-16'
        }
      ]
    },
    readingTime: 4
  },
  {
    id: 'let-go-enable-letdown',
    title: 'Let go to enable the \'let down\'.',
    excerpt: 'For some mums, especially those breastfeeding for the first time - establishing an effective latch at the breast can be really difficult.',
    content: `<h4>Be kind to yourself.</h4>

<p>For some mums, especially those breastfeeding for the first time - establishing an effective latch at the breast can be really difficult. This in turn has an impact on establishing breastmilk supply and a mother's milk 'coming in'.</p>

<p>When a baby is born it may take up to a few weeks for the mother to experience the letdown sensation. But once baby starts to effectively suckle at the breast, the mother's oxytocin levels rise which enables her breastmilk to flow.</p>

<p>Our bodies are so incredible that we just need to think about our baby or hear baby cry to enable the letdown reflex! This means what's going on in our brains is powerful. And when we feel stressed, observed or anxious, amongst many other adrenaline stimulating emotions, our primal breastfeeding instincts and milk producing hormones can be negatively impacted.</p>

<p>But don't feel hopeless or helpless, you are not alone and we would love to share our expert tips and tricks with you. <a href="https://full-circle-midwifery-and-lactation.au1.cliniko.com/bookings#service" target="_blank">Book a consultation</a> if you are needing extra support.</p>

<p><strong>Remember to be kind to yourself and most of all, let go.</strong></p>`,
    imageUrl: '/images/blog/let-go-enable-letdown.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-08-20',
    tags: ['let-down-reflex', 'oxytocin', 'mindfulness', 'breastfeeding-support'],
    isReferenced: false,
    peerLikes: {
      count: 11,
      likedBy: [
        {
          providerId: 'caroline-maternity-consultant',
          providerName: 'Caroline Thompson',
          credentials: ['Maternity Care Specialist'],
          specializations: ['Maternity Care', 'Newborn Support'],
          dateLiked: '2024-08-21'
        }
      ]
    },
    readingTime: 2
  },
  {
    id: 'sherpa-medicare-rebates',
    title: 'The Sherpa & Medicare Rebates',
    excerpt: 'Medicare eligible private practice midwives AND International Board Certified Lactation Consultants (IBCLCs)…What does that even mean?!?',
    content: `<p>Medicare eligible private practice midwives AND International Board Certified Lactation Consultants (IBCLCs)…What does that even mean?!?</p>

<p>It means Medicare rebates and a Midwife who can prescribe, as required, combined with the expertise of an IBCLC when it comes to the nuances and complexities of breastfeeding - the best of both worlds.</p>

<p><strong>Midwives journey with their women, with their families.</strong></p>

<p>They are like the sherpa on the mountains that new mothers climb - guiding them, supporting them, as they carve out their unique path.</p>

<p>IBCLCs typically don't get the same journey with their families. IBCLCs are considered experts in their field, and just like the orthopaedic surgeon you see for the broken bones, but not for the rehabilitation; the IBCLCs are usually seen for the crisis moments and then the mother will return to her 'sherpa' - (midwife, obstetrician, GP or perhaps child health nurse).</p>

<p>However, here at Full Circle, we are both Medicare Eligible private practice midwives (sherpa's) and IBCLCs (experts in breastfeeding). So in our humble opinion, this union of the breath and the depth of knowledge and skills allows families to get the best of both worlds. We get to journey with our families both antenatally and postnatally. We see those high postnatal mountains ahead and provide the tailored support to get our unique families to their top…and we celebrate your unique summit together.</p>

<p><strong>So consider your postnatal journey as important as your pregnancy journey.</strong></p>

<p>Know that when you come with a referral letter for an antenatal consultation or a postnatal consultation (in the first 6 weeks following the birth), you can receive substantial Medicare rebates for our support.</p>

<p>The Medicare rebates can make all the difference when it comes to affording the continuity and expert care that any mother needs and deserves. Additionally, you can receive private health rebates (depending if you have private health and the type of coverage) for our lactation support services beyond the 6 week postnatal mark.</p>

<p>For further details to understand pricing and health rebate benefits, please shoot us an email at <a href="mailto:fullcirclelactation@gmail.com">fullcirclelactation@gmail.com</a>. Please see our service link on our website for Medicare rebate prices alongside our service prices.</p>

<p>For an example of a referral letter, please see our website (under the tab referrals) or simply email us for the template.</p>

<p><strong>We look forward to supporting you on your unique journey.</strong></p>`,
    imageUrl: '/images/blog/sherpa-medicare-rebates.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-11-20',
    tags: ['medicare-rebates', 'midwife', 'ibclc', 'healthcare-funding'],
    isReferenced: true,
    referenceBadge: 'Referenced in Australian Health Insurance Guidelines',
    peerLikes: {
      count: 9,
      likedBy: [
        {
          providerId: 'dr-justin-tucker',
          providerName: 'Dr. Justin Tucker',
          credentials: ['FRANZCOG', 'CREI'],
          specializations: ['Fertility', 'Obstetrics'],
          dateLiked: '2024-11-21'
        }
      ]
    },
    readingTime: 4
  },
  {
    id: 'returning-work-breastfeeding',
    title: 'A new chapter…Returning to work while breastfeeding',
    excerpt: 'Returning to work whilst breastfeeding… It can be quite a daunting prospect for many. How do we do this? How do we protect our right',
    content: `<p><strong>Returning to work whilst breastfeeding…</strong></p>

<p>It can be quite a daunting prospect for many.</p>

<p>How do we do this? How do we protect our right to breastfeed our babies, whilst also protecting our professional roles and incomes?</p>

<p>We have many incredible 'Full Circle' families conquer their initial breastfeeding challenges and then after some time, return to us for support on how to continue breastfeeding in the context of 'returning to work'. It really is a very 'Full Circle' journey.</p>

<p>Combining breastfeeding and work can be done in a vast variety of ways. Whether you will express and / or breastfeed your baby during your workday, or even spend some days working from home will depend on the work situation and childcare arrangements.</p>

<p>We combine the many options available with the important unique history that is yours, alongside your preferences and values.</p>

<p>At Full Circle, we tune in… we provide the 'infrastructure' of informed choices to navigate this enormous shift in chapters.</p>

<p>However, these consultations also have a ripple effect and go well beyond that one family. The support we receive as mums to allow us to VALUE the WORK of motherhood sends a silent signal to other mothers. It's a secret whisper; a subtle wink, to say…</p>

<blockquote>
<p>"This is important. I see what you do. You can do this. Your motherhood work is valuable".</p>
</blockquote>

<p>We supported this beautiful Full Circle mother-baby-dyad to initially establish breastfeeding early on, and then again around 12 months later to support the transition to work whilst continuing to breastfeed.</p>

<p>Here are some reflections from this mum, (shared with consent), us after returning to work:</p>

<blockquote>
<p>"I think a big thing for me is I found myself apologising for needing to have lactation breaks, but in fact I shouldn't need to do this - I shouldn't need to feel that I am an inconvenience for wanting to continue to give my child nourishment through my breastmilk.</p>

<p>I know how fortunate I am to be able to do this and the fact I am still doing it after all our ups and downs - I should be so proud of myself for going the extra mile so my son can still have the milk he wants - and needs.</p>

<p>I have already found that I've been able to be an example to other Mama's at my work who just thought they'd have to stop breastfeeding to return to work. But instead I've been able to trouble shoot some things and lead the way where I know they'll feel more comfortable and confident in making sure they get the breaks they deserve.</p>

<p>I've also been able to speak up for how our workplace needs to up their game with our parents room with not being adequate enough, either. Changes haven't occurred yet, but I feel like it wouldn't have ever been on managements radar if I didn't mention something. It's a start, that's for sure..</p>

<p>I think it's really important for Mama's to know this journey CAN continue and it CAN work for you and your family".</p>
</blockquote>

<p>All mothers deserve support and encouragement to understand their rights. They have a right to continue to feed their baby as they so wish for the entire duration of their individual breastfeeding journey.</p>

<p><strong>Our workplaces and society need to catch up to mothers VALUING their important WORK.</strong></p>

<h4>Additional Resources:</h4>
<ul>
  <li><a href="https://www.breastfeeding.asn.au/resources/going-back-work" target="_blank">Australian Breastfeeding Association - Going Back to Work</a></li>
  <li><a href="https://www.wgea.gov.au/parental-leave" target="_blank">Workplace Gender Equality Agency - Parental Leave</a></li>
  <li><a href="https://www.breastfeeding.asn.au/sites/default/files/2022-08/RES-Breastfeeding%20and%20Work%20-%20Your%20rights%20at%20work-V2_1.pdf" target="_blank">Breastfeeding and Work - Your Rights at Work (PDF)</a></li>
</ul>`,
    imageUrl: '/images/blog/returning-work-breastfeeding.svg',
    authorId: 'rebecca-cavallaro',
    publishDate: '2024-10-10',
    tags: ['returning-to-work', 'breastfeeding', 'workplace-rights', 'pumping'],
    isReferenced: true,
    referenceBadge: 'Cited in Australian Breastfeeding Association Guidelines',
    peerLikes: {
      count: 16,
      likedBy: [
        {
          providerId: 'sarah-digital-specialist',
          providerName: 'Sarah Williams',
          credentials: ['IBCLC', 'Digital Health Specialist'],
          specializations: ['Lactation Support', 'Digital Health'],
          dateLiked: '2024-10-11'
        },
        {
          providerId: 'emily-mcconaghy',
          providerName: 'Emily McConaghy',
          credentials: ['Child Development Specialist'],
          specializations: ['Toddler Development', 'Motor Skills'],
          dateLiked: '2024-10-12'
        }
      ]
    },
    readingTime: 6
  }
];
