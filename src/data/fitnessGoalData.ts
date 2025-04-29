interface FitnessGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const fitnessGoals: FitnessGoal[] = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    description: 'Focus on cardio and full-body exercises to burn calories and reduce body fat.',
    icon: 'scale'
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain',
    description: 'Emphasis on strength training to build muscle mass and increase strength.',
    icon: 'dumbbell'
  },
  {
    id: 'endurance',
    title: 'Endurance',
    description: 'Improve cardiovascular fitness and stamina with longer, sustained exercises.',
    icon: 'timer'
  },
  {
    id: 'general_fitness',
    title: 'General Fitness',
    description: 'Well-rounded approach to improve overall health and fitness levels.',
    icon: 'heart'
  }
];

export const fitnessLevels = [
  { id: 'beginner', title: 'Beginner' },
  { id: 'intermediate', title: 'Intermediate' },
  { id: 'advanced', title: 'Advanced' }
];