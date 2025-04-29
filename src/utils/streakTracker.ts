import { UserStreak, WorkoutEntry } from './types';
import { getUserStreak, saveUserStreak } from './localStorage';
import { isYesterday, parseISO } from 'date-fns';

// Update streak based on completion of today's workout
export const updateStreak = (date: string, completed: boolean): UserStreak => {
  const streak = getUserStreak();
  
  if (completed) {
    // If this is the first workout or the last workout was yesterday, increment streak
    if (!streak.lastWorkoutDate || isYesterday(parseISO(streak.lastWorkoutDate))) {
      streak.currentStreak += 1;
      streak.bestStreak = Math.max(streak.currentStreak, streak.bestStreak);
    } 
    // If this is the same day as last workout, don't increment
    else if (streak.lastWorkoutDate === date) {
      // Do nothing, already counted
    } 
    // If there was a gap, reset streak to 1
    else {
      streak.currentStreak = 1;
    }
    
    streak.lastWorkoutDate = date;
  }
  
  // Save updated streak
  saveUserStreak(streak);
  return streak;
};

// Calculate and update streak based on workout history
export const recalculateStreak = (workouts: WorkoutEntry[]): UserStreak => {
  if (workouts.length === 0) {
    return { currentStreak: 0, bestStreak: 0, lastWorkoutDate: null };
  }
  
  // Sort workouts by date
  const sortedWorkouts = [...workouts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let currentStreak = 0;
  let bestStreak = 0;
  let lastWorkoutDate: string | null = null;
  
  // Find completed workouts
  const completedWorkouts = sortedWorkouts.filter(w => w.completed);
  
  if (completedWorkouts.length > 0) {
    let consecutiveDays = 1;
    lastWorkoutDate = completedWorkouts[completedWorkouts.length - 1].date;
    
    for (let i = completedWorkouts.length - 1; i > 0; i--) {
      const current = parseISO(completedWorkouts[i].date);
      const prev = parseISO(completedWorkouts[i - 1].date);
      const diffDays = Math.round((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        consecutiveDays++;
      } else if (diffDays === 0) {
        // Same day (should not happen with proper data)
        continue;
      } else {
        // Break in streak
        break;
      }
    }
    
    currentStreak = consecutiveDays;
    bestStreak = Math.max(currentStreak, bestStreak);
  }
  
  const streak = { currentStreak, bestStreak, lastWorkoutDate };
  saveUserStreak(streak);
  return streak;
};