export const motivationalTips = [
  {
    id: 1,
    tip: "Consistency over intensity. It's better to work out for 20 minutes every day than 2 hours once a week.",
    category: "motivation"
  },
  {
    id: 2,
    tip: "Stay hydrated! Drink water before, during, and after your workout for optimal performance.",
    category: "nutrition"
  },
  {
    id: 3,
    tip: "Focus on your breath during exercise. Proper breathing improves performance and reduces injury risk.",
    category: "technique"
  },
  {
    id: 4,
    tip: "Rest days are growth days. Your muscles need time to recover and grow stronger.",
    category: "recovery"
  },
  {
    id: 5,
    tip: "Small progress is still progress. Celebrate the little victories on your fitness journey.",
    category: "motivation"
  },
  {
    id: 6,
    tip: "Proper form prevents injury. It's better to do fewer reps correctly than many with poor form.",
    category: "technique"
  },
  {
    id: 7,
    tip: "Fuel your body with whole foods. Think of food as fuel, not reward or punishment.",
    category: "nutrition"
  },
  {
    id: 8,
    tip: "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound.",
    category: "planning"
  },
  {
    id: 9,
    tip: "Find workout buddies. Social support increases adherence to fitness routines by 95%.",
    category: "motivation"
  },
  {
    id: 10,
    tip: "Sleep is essential for recovery. Aim for 7-9 hours of quality sleep each night.",
    category: "recovery"
  },
  {
    id: 11,
    tip: "Your only competition is yourself. Focus on beating your previous best.",
    category: "motivation"
  },
  {
    id: 12,
    tip: "Stretching improves flexibility and reduces risk of injury. Don't skip it!",
    category: "technique"
  },
  {
    id: 13,
    tip: "Protein helps repair muscles after workouts. Aim for 1.6-2.2g per kg of bodyweight daily.",
    category: "nutrition"
  },
  {
    id: 14,
    tip: "Mental fitness is as important as physical. Practice mindfulness during exercise.",
    category: "mental"
  },
  {
    id: 15,
    tip: "Change your routine every 4-6 weeks to prevent plateaus and maintain progress.",
    category: "planning"
  },
  {
    id: 16,
    tip: "Track your progress. What gets measured, gets managed.",
    category: "planning"
  },
  {
    id: 17,
    tip: "The best workout is the one you'll actually do consistently. Find activities you enjoy!",
    category: "motivation"
  },
  {
    id: 18,
    tip: "Warm up properly to prepare your body for exercise and reduce injury risk.",
    category: "technique"
  },
  {
    id: 19,
    tip: "Remember your 'why' when motivation fades. Connect with your deeper purpose.",
    category: "mental"
  },
  {
    id: 20,
    tip: "Balanced nutrition supports optimal performance. Aim for a variety of colorful foods.",
    category: "nutrition"
  },
  {
    id: 21,
    tip: "Stress management is crucial for fitness. High stress can impair recovery.",
    category: "recovery"
  },
  {
    id: 22,
    tip: "Listen to your body. There's a difference between challenging yourself and risking injury.",
    category: "technique"
  },
  {
    id: 23,
    tip: "Focus on progress, not perfection. Fitness is a lifelong journey.",
    category: "motivation"
  },
  {
    id: 24,
    tip: "Prioritize compound exercises that work multiple muscle groups for efficient workouts.",
    category: "planning"
  },
  {
    id: 25,
    tip: "Visualize success. Mental rehearsal can improve physical performance.",
    category: "mental"
  },
  {
    id: 26,
    tip: "Post-workout nutrition is key. Consume protein and carbs within 30-60 minutes after exercise.",
    category: "nutrition"
  },
  {
    id: 27,
    tip: "Challenge yourself but be realistic. Gradual progression leads to sustainable results.",
    category: "planning"
  },
  {
    id: 28,
    tip: "Foam rolling can help release muscle tension and improve mobility.",
    category: "recovery"
  },
  {
    id: 29,
    tip: "Create a dedicated workout space to minimize distractions and excuses.",
    category: "planning"
  },
  {
    id: 30,
    tip: "Fitness is 20% exercise and 80% nutrition. You can't out-train a poor diet.",
    category: "nutrition"
  }
];

// Function to get a tip based on the day of the year (to avoid repetition)
export const getDailyTip = (): { tip: string; category: string } => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  // Use the day of year to select a tip (cycling through the available tips)
  const tipIndex = dayOfYear % motivationalTips.length;
  const tipData = motivationalTips[tipIndex];
  
  return { tip: tipData.tip, category: tipData.category };
};