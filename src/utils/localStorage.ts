import { 
  UserProfile, 
  DailyWorkout, 
  UserProgress, 
  UserSettings,
  UserStreak,
  Achievement,
  Exercise,
  WeightEntry,
  WorkoutEntry
} from './types';

// User Profile
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem('fitmate-user-profile', JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const profile = localStorage.getItem('fitmate-user-profile');
  return profile ? JSON.parse(profile) : null;
};

// Workout Data
export const saveDailyWorkout = (workout: DailyWorkout): void => {
  const workouts = getDailyWorkouts();
  const existingIndex = workouts.findIndex(w => w.date === workout.date);
  
  if (existingIndex >= 0) {
    workouts[existingIndex] = workout;
  } else {
    workouts.push(workout);
  }
  
  localStorage.setItem('fitmate-daily-workouts', JSON.stringify(workouts));
};

export const getDailyWorkouts = (): DailyWorkout[] => {
  const workouts = localStorage.getItem('fitmate-daily-workouts');
  return workouts ? JSON.parse(workouts) : [];
};

export const getDailyWorkoutByDate = (date: string): DailyWorkout | null => {
  const workouts = getDailyWorkouts();
  const workout = workouts.find(w => w.date === date);
  return workout || null;
};

// Progress Data
export const saveWeightEntry = (entry: WeightEntry): void => {
  const progress = getUserProgress();
  const existingIndex = progress.weights.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    progress.weights[existingIndex] = entry;
  } else {
    progress.weights.push(entry);
  }
  
  progress.weights.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  saveUserProgress(progress);
};

export const saveWorkoutEntry = (entry: WorkoutEntry): void => {
  const progress = getUserProgress();
  const existingIndex = progress.workouts.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    progress.workouts[existingIndex] = entry;
  } else {
    progress.workouts.push(entry);
  }
  
  progress.workouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  saveUserProgress(progress);
};

export const getUserProgress = (): UserProgress => {
  const progress = localStorage.getItem('fitmate-user-progress');
  return progress ? JSON.parse(progress) : { weights: [], workouts: [] };
};

export const saveUserProgress = (progress: UserProgress): void => {
  localStorage.setItem('fitmate-user-progress', JSON.stringify(progress));
};

// User Settings
export const saveUserSettings = (settings: UserSettings): void => {
  localStorage.setItem('fitmate-user-settings', JSON.stringify(settings));
};

export const getUserSettings = (): UserSettings => {
  const settings = localStorage.getItem('fitmate-user-settings');
  return settings 
    ? JSON.parse(settings) 
    : { darkMode: false, reminders: true, measurementUnit: 'metric' };
};

// Streak Tracking
export const getUserStreak = (): UserStreak => {
  const streak = localStorage.getItem('fitmate-user-streak');
  return streak 
    ? JSON.parse(streak) 
    : { currentStreak: 0, bestStreak: 0, lastWorkoutDate: null };
};

export const saveUserStreak = (streak: UserStreak): void => {
  localStorage.setItem('fitmate-user-streak', JSON.stringify(streak));
};

// Achievements
export const getUserAchievements = (): Achievement[] => {
  const achievements = localStorage.getItem('fitmate-user-achievements');
  return achievements ? JSON.parse(achievements) : [];
};

export const saveUserAchievements = (achievements: Achievement[]): void => {
  localStorage.setItem('fitmate-user-achievements', JSON.stringify(achievements));
};

// Custom Exercise Library
export const saveCustomExercise = (exercise: Exercise): void => {
  const exercises = getCustomExercises();
  exercises.push(exercise);
  localStorage.setItem('fitmate-custom-exercises', JSON.stringify(exercises));
};

export const getCustomExercises = (): Exercise[] => {
  const exercises = localStorage.getItem('fitmate-custom-exercises');
  return exercises ? JSON.parse(exercises) : [];
};

// Reset All Data
export const resetAllData = (): void => {
  localStorage.removeItem('fitmate-user-profile');
  localStorage.removeItem('fitmate-daily-workouts');
  localStorage.removeItem('fitmate-user-progress');
  localStorage.removeItem('fitmate-user-streak');
  localStorage.removeItem('fitmate-user-achievements');
  localStorage.removeItem('fitmate-custom-exercises');
  // Keep settings for user convenience
};