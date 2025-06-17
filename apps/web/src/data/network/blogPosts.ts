
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
    content: `Jaundice is the most common diagnosis in full-term infants during the immediate post-natal period, occurring in approximately 60 percent of all babies (3 in every 5 babies approximately). It usually occurs during those really important first few weeks where we are establishing breastmilk supply and can greatly impact a breastfeeding journey for a variety of reasons.

Here, we will explore the effects of jaundice on breastfeeding and offer practical tips for parents struggling to breastfeed a jaundice baby.

Jaundice is a common condition in newborns, characterised by a yellowing of the skin and eyes due to elevated bilirubin levels. While jaundice itself does not typically affect a baby's ability to breastfeed, some factors associated with jaundice often do pose challenges:

• Lethargy: Jaundiced babies may exhibit lethargy and decreased energy levels, making it more challenging for them to actively engage in breastfeeding.

• Poor Sucking Reflex: In some cases, jaundiced newborns may have a weaker sucking reflex, leading to difficulties in latching onto the breast and effectively extracting milk.

• Sleepiness: Jaundice can make babies sleepier then usual, which may result in decreased feeding frequency and shorter feeding sessions.

It's important to remember that breastfeeding remains important for your baby's overall health, even if they have jaundice and there are many way to navigate this short term challenge. Support with a International Board Certified Lactation Consultant (IBCLC) is key.

Here are some tips to support breastfeeding whilst jaundice is influencing things:

• Frequent Feeds: Ensure you feed your baby at least 8-12 times a day by waking them approx 3hrs after the start of the previous feed. Frequent feeding stimulates milk production, helps prevent dehydration, and promotes the elimination of bilirubin through bowel movements.

• Wakefulness Techniques: If your baby is sleepy or less interested in feeding, try gentle techniques to awaken them before breastfeeding. Skin-to-skin is a gentle but very effective way to stimulate their senses and help them breastfeed.

• Comfortable & Effective Latch: Helping your stably and effectively latch to breastfeed will optimize milk transfer. Seek guidance from a International Board Certified Lactation Consultant (IBCLC) who can help you achieve a deep and effective latch. This is our bread and butter here at Full Circle!

• Breast Compression: Consider some gentle breast compressions during breastfeeding, to encourage a continuous flow of milk.

Overall, while jaundice in newborns can be a very common occurrence, it's crucial to know that you do not need to navigate this alone. Having timely intervention and support is key to protecting a breastfeeding journey and ensuring the wellbeing of your little one.`,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    content: `Mastitis is not just a breast problem, it's a whole body problem.

Mastitis is a common and distressing maternal postpartum condition, but the relationship between: (1) mastitis timing and antibiotic treatment and; (2) breastfeeding outcomes and postnatal mental health, is somewhat unclear.

The Norwegian Mother, Father and Child Cohort Study (MoBa), based on 79,985 mother-infant dyads looked at the incidence of mastitis and treatment with antibiotics in first 6 months postpartum. The MoBa study wanted to investigate the impact of mastitis timing and antibiotic treatment on breastfeeding practices and postnatal mental health.

Women were classified according to self-reported mastitis within first month ('early') or 1-6 months ('later') postpartum and antibiotic treatment. Breastfeeding outcomes included (1) predominant or (2) any breastfeeding or (3) abrupt breastfeeding cessation, until 6 months postpartum. Maternal mental health was also assessed by self-report at 6 months postpartum.

The results being:

• The incidence of mastitis was 18.8%, with 36.8% reporting treatment with antibiotics …that's no small percentage.
• Women reporting early mastitis were less likely to report predominant breastfeeding and any breastfeeding for 6 months than women who did not report mastitis…so mastitis can potentially derail a breastfeeding journey.
• The women reporting early mastitis were also more likely to report abrupt breastfeeding cessation - almost 40% more likely!
• Late-onset mastitis was not associated with poorer breastfeeding outcomes.
• Among women reporting mastitis, the risk of abrupt breastfeeding cessation was higher in those also reported antibiotic use.
• Mastitis was associated with an increased risk of mental health problems postpartum.

Here at Full Circle, we understand the impact of mastitis on new mothers and provide timely holistic support to enable women to meet their breastfeeding goals. We consider breastfeeding support 'urgent care', and the MoBa study exemplifies exactly why is it urgent - as poorly managed mastitis can derail an entire breastfeeding journey.

We have supported so many mothers with mastitis over the years at Full Circle, and whilst the MoBa study has very compelling results with a very large cohort of women, we do not see the same level of detrimental outcomes of mastitis as the study found. What we have seen is that by triaging our referrals quickly and providing holistic support that includes consideration of the mental health impacts of mastitis, we can enable women to recover quickly and continue their breastfeeding journey.`,
    imageUrl: 'https://images.unsplash.com/photo-1583389082906-c0c79e51ba5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    content: `At first glance, tummy time and breastfeeding might seem unrelated, but they are more connected than you might think. Both play crucial roles in your baby's development and can actually support each other in wonderful ways.

Tummy time strengthens the muscles in your baby's neck, shoulders, and core - the same muscles that are essential for effective breastfeeding. When babies have good neck and shoulder strength, they can maintain better positioning at the breast, leading to more efficient milk transfer and less discomfort for both mother and baby.

Additionally, tummy time promotes proper oral motor development. The movements and positions during tummy time help strengthen the muscles around the mouth and jaw, which are crucial for a strong, effective latch during breastfeeding.

For babies who struggle with reflux or prefer one side during feeding, tummy time can help address these asymmetries. The varied positions and movements encourage balanced muscle development and can reduce the impact of positioning preferences that might affect breastfeeding.

Here are some practical ways to incorporate tummy time to support breastfeeding:

• Start with short sessions right after feeding when baby is content but alert
• Use different surfaces and positions to encourage varied muscle engagement  
• Place yourself at baby's eye level during tummy time to encourage neck strengthening
• Watch for signs of fatigue and always supervise tummy time sessions

Remember, every baby develops at their own pace. If you're experiencing challenges with either tummy time or breastfeeding, don't hesitate to reach out for support. At Full Circle, we understand how these early developmental milestones work together to support your baby's overall wellbeing.`,
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    content: `Oversupply of breast milk might sound like a good problem to have, but for many mothers, it can create significant challenges for both mother and baby. Understanding oversupply is crucial for maintaining a successful breastfeeding relationship.

Oversupply occurs when your body produces more milk than your baby needs. While this might seem beneficial, it can lead to several complications:

For mothers:
• Engorgement and discomfort
• Increased risk of mastitis and blocked ducts
• Nipple pain from forceful letdown
• Emotional stress from constant leaking

For babies:
• Difficulty managing fast milk flow
• Frequent pulling off the breast or fussiness during feeds
• Green, frothy stools from getting too much foremilk
• Inadequate weight gain despite frequent feeding

The key to managing oversupply is gradual reduction rather than sudden changes. Here are some gentle strategies:

• Feed from one breast per session to allow the unused breast to get the message to reduce production
• Express just enough for comfort rather than completely emptying
• Use cold compresses between feeds to reduce inflammation
• Consider block feeding under professional guidance

It's important to work with an IBCLC when managing oversupply, as the strategies need to be tailored to your specific situation. What works for one mother-baby pair may not work for another.

At Full Circle, we see many mothers struggling with oversupply, and we're here to provide the individualized support you need to find balance and comfort in your breastfeeding journey.`,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    excerpt: 'The let-down reflex is a beautiful example of how our minds and bodies work together during breastfeeding. Understanding this connection',
    content: `The let-down reflex is a beautiful example of how our minds and bodies work together during breastfeeding. Understanding this connection can transform your breastfeeding experience from one of stress to one of calm connection.

The let-down reflex, also known as the milk ejection reflex, is triggered by the hormone oxytocin. This "love hormone" is released not just through physical stimulation, but also through emotional and mental states. When we feel relaxed, connected, and at peace, oxytocin flows more freely.

However, stress, anxiety, and tension can inhibit this natural process. The phrase "let go to enable the let down" captures this beautifully - sometimes we need to consciously release our worries and expectations to allow our bodies to do what they know how to do.

Here are some practical ways to support your let-down reflex:

• Create a calm feeding environment with dim lighting and comfortable seating
• Practice deep breathing or gentle meditation before feeds
• Use visualization techniques - imagine milk flowing easily to your baby
• Address any underlying stress or anxiety with professional support
• Trust your body's natural ability to nourish your baby

Remember that the let-down reflex can be conditioned over time. As you develop positive associations with feeding times, your body will respond more readily. Be patient with yourself and your baby as you both learn this beautiful dance together.

Some mothers feel their let-down as a tingling sensation, while others feel nothing at all - both are completely normal. What matters is that your baby is getting the milk they need and that you feel supported in your breastfeeding journey.

If you're struggling with let-down or any aspect of breastfeeding, know that support is available. At Full Circle, we understand the intricate connection between mind and body in breastfeeding, and we're here to help you find your rhythm.`,
    imageUrl: 'https://images.unsplash.com/photo-1516528387618-afa90b13e000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    readingTime: 3
  }
];
