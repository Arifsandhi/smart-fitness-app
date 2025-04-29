import { Achievement, UserProfile, UserProgress, UserStreak } from './types';
import { getUserAchievements, saveUserAchievements } from './localStorage';
import { format } from 'date-fns';

// Define all possible achievements
const AVAILABLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-workout',
    name: 'First Step',
    description: 'Complete your first workout',
    icon: 'award',
    earned: false
  },
  {
    id: 'three-day-streak',
    name: 'Consistency',
    description: 'Complete workouts for 3 days in a row',
    icon: 'flame',
    earned: false
  },
  {
    id: 'seven-day-streak',
    name: 'Week Warrior',
    description: 'Complete workouts for 7 days in a row',
    icon: 'trophy',
    earned: false
  },
  {
    id: 'weight-goal',
    name: 'Goal Getter',
    description: 'Reach your target weight',
    icon: 'target',
    earned: false
  },
  {
    id: 'ten-workouts',
    name: 'Dedicated',
    description: 'Complete 10 workouts',
    icon: 'medal',
    earned: false
  }
];

// Initialize achievements if they don't exist
export const initializeAchievements = (): Achievement[] => {
  const existingAchievements = getUserAchievements();
  
  if (existingAchievements.length === 0) {
    saveUserAchievements(AVAILABLE_ACHIEVEMENTS);
    return AVAILABLE_ACHIEVEMENTS;
  }
  
  return existingAchievements;
};

// Check for new achievements
export const checkAchievements = (
  profile: UserProfile | null, 
  progress: UserProgress,
  streak: UserStreak
): Achievement[] => {
  const achievements = getUserAchievements();
  let hasChanges = false;
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // First workout achievement
  const firstWorkoutAchievement = achievements.find(a => a.id === 'first-workout');
  if (firstWorkoutAchievement && !firstWorkoutAchievement.earned) {
    const completedWorkouts = progress.workouts.filter(w => w.completed);
    if (completedWorkouts.length > 0) {
      firstWorkoutAchievement.earned = true;
      firstWorkoutAchievement.earnedDate = today;
      hasChanges = true;
    }
  }
  
  // Streak achievements
  const threeDayStreakAchievement = achievements.find(a => a.id === 'three-day-streak');
  if (threeDayStreakAchievement && !threeDayStreakAchievement.earned && streak.currentStreak >= 3) {
    threeDayStreakAchievement.earned = true;
    threeDayStreakAchievement.earnedDate = today;
    hasChanges = true;
  }
  
  const sevenDayStreakAchievement = achievements.find(a => a.id === 'seven-day-streak');
  if (sevenDayStreakAchievement && !sevenDayStreakAchievement.earned && streak.currentStreak >= 7) {
    sevenDayStreakAchievement.earned = true;
    sevenDayStreakAchievement.earnedDate = today;
    hasChanges = true;
  }
  
  // Weight goal achievement (if profile exists and has weight data)
  if (profile && profile.fitnessGoal === 'weight_loss' && progress.weights.length > 1) {
    const weightGoalAchievement = achievements.find(a => a.id === 'weight-goal');
    if (weightGoalAchievement && !weightGoalAchievement.earned) {
      const initialWeight = progress.weights[0].weight;
      const currentWeight = progress.weights[progress.weights.length - 1].weight;
      
      // Assuming a 5% weight loss goal for this achievement
      if (initialWeight > 0 && currentWeight <= initialWeight * 0.95) {
        weightGoalAchievement.earned = true;
        weightGoalAchievement.earnedDate = today;
        hasChanges = true;
      }
    }
  }
  
  // Completed 10 workouts achievement
  const tenWorkoutsAchievement = achievements.find(a => a.id === 'ten-workouts');
  if (tenWorkoutsAchievement && !tenWorkoutsAchievement.earned) {
    const completedWorkouts = progress.workouts.filter(w => w.completed);
    if (completedWorkouts.length >= 10) {
      tenWorkoutsAchievement.earned = true;
      tenWorkoutsAchievement.earnedDate = today;
      hasChanges = true;
    }
  }
  
  if (hasChanges) {
    saveUserAchievements(achievements);
  }
  
  return achievements;
};

// Get newly earned achievements (for notifications)
export const getNewlyEarnedAchievements = (
  previousAchievements: Achievement[], 
  currentAchievements: Achievement[]
): Achievement[] => {
  return currentAchievements.filter(
    current => {
      const previous = previousAchievements.find(p => p.id === current.id);
      return current.earned && previous && !previous.earned;
    }
  );
};