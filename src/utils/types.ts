// User Profile Types
export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

// Workout Types
export type ExerciseCategory = 'arms' | 'legs' | 'core' | 'cardio' | 'fullBody' | 'warmup' | 'cooldown';
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  duration: number; // in minutes
  imageUrl: string;
  targetMuscles: string[];
  instructions: string[];
}

export interface DailyWorkout {
  id: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

// Progress Types
export interface WeightEntry {
  date: string;
  weight: number;
}

export interface WorkoutEntry {
  date: string;
  completed: boolean;
  caloriesBurned: number;
}

export interface UserProgress {
  weights: WeightEntry[];
  workouts: WorkoutEntry[];
}

// Settings Types
export interface UserSettings {
  darkMode: boolean;
  reminders: boolean;
  measurementUnit: 'metric' | 'imperial';
}

// Streak and Achievements
export interface UserStreak {
  currentStreak: number;
  bestStreak: number;
  lastWorkoutDate: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}