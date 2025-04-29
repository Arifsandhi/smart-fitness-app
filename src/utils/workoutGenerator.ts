import { Exercise, ExerciseCategory, UserProfile } from './types';
import { exerciseLibrary } from '../data/exerciseData';
import { format } from 'date-fns';

// Helper: Get exercises by category and fitness level
const getExercisesByCategory = (
  category: ExerciseCategory, 
  fitnessLevel: UserProfile['fitnessLevel'],
  count: number
): Exercise[] => {
  const difficulty = fitnessLevel === 'beginner' 
    ? 'easy' 
    : fitnessLevel === 'intermediate' 
      ? 'medium' 
      : 'hard';
  
  // Filter exercises that match category and are at or below user's difficulty level
  const filteredExercises = exerciseLibrary.filter(exercise => 
    exercise.category === category && 
    (
      (fitnessLevel === 'beginner' && exercise.difficulty === 'easy') ||
      (fitnessLevel === 'intermediate' && ['easy', 'medium'].includes(exercise.difficulty)) ||
      (fitnessLevel === 'advanced')
    )
  );
  
  // Shuffle the filtered exercises
  const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
  
  // Return the requested number of exercises or all available if less than requested
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Generate workout based on user profile
export const generateWorkout = (profile: UserProfile): Exercise[] => {
  const { fitnessGoal, fitnessLevel } = profile;
  let workout: Exercise[] = [];
  
  // Always include warm-up and cool-down
  const warmupExercises = getExercisesByCategory('warmup', fitnessLevel, 2);
  const cooldownExercises = getExercisesByCategory('cooldown', fitnessLevel, 2);
  
  // Build the main workout based on fitness goal
  switch (fitnessGoal) {
    case 'weight_loss': {
      // High cardio, moderate strength
      const cardioExercises = getExercisesByCategory('cardio', fitnessLevel, 3);
      const coreExercises = getExercisesByCategory('core', fitnessLevel, 2);
      const fullBodyExercises = getExercisesByCategory('fullBody', fitnessLevel, 2);
      workout = [
        ...warmupExercises,
        ...cardioExercises,
        ...coreExercises,
        ...fullBodyExercises,
        ...cooldownExercises
      ];
      break;
    }
    case 'muscle_gain': {
      // Focus on strength training
      const armsExercises = getExercisesByCategory('arms', fitnessLevel, 2);
      const legsExercises = getExercisesByCategory('legs', fitnessLevel, 2);
      const coreExercises = getExercisesByCategory('core', fitnessLevel, 2);
      const fullBodyExercises = getExercisesByCategory('fullBody', fitnessLevel, 1);
      const cardioExercise = getExercisesByCategory('cardio', fitnessLevel, 1);
      workout = [
        ...warmupExercises,
        ...armsExercises,
        ...legsExercises,
        ...coreExercises,
        ...fullBodyExercises,
        ...cardioExercise,
        ...cooldownExercises
      ];
      break;
    }
    case 'endurance': {
      // Mix of cardio and full body exercises
      const cardioExercises = getExercisesByCategory('cardio', fitnessLevel, 3);
      const fullBodyExercises = getExercisesByCategory('fullBody', fitnessLevel, 3);
      const coreExercises = getExercisesByCategory('core', fitnessLevel, 1);
      workout = [
        ...warmupExercises,
        ...cardioExercises,
        ...fullBodyExercises,
        ...coreExercises,
        ...cooldownExercises
      ];
      break;
    }
    case 'general_fitness':
    default: {
      // Balanced workout
      const cardioExercises = getExercisesByCategory('cardio', fitnessLevel, 2);
      const armsExercises = getExercisesByCategory('arms', fitnessLevel, 1);
      const legsExercises = getExercisesByCategory('legs', fitnessLevel, 1);
      const coreExercises = getExercisesByCategory('core', fitnessLevel, 2);
      const fullBodyExercises = getExercisesByCategory('fullBody', fitnessLevel, 1);
      workout = [
        ...warmupExercises,
        ...cardioExercises,
        ...armsExercises,
        ...legsExercises,
        ...coreExercises,
        ...fullBodyExercises,
        ...cooldownExercises
      ];
    }
  }
  
  return workout;
};

// Create a daily workout with ID and date
export const createDailyWorkout = (profile: UserProfile) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const exercises = generateWorkout(profile);
  
  return {
    id: `workout-${today}-${Math.random().toString(36).substr(2, 9)}`,
    date: today,
    exercises,
    completed: false
  };
};

// Estimate calories burned based on workout and user profile
export const estimateCaloriesBurned = (
  exercises: Exercise[], 
  profile: UserProfile
): number => {
  // MET (Metabolic Equivalent of Task) estimates
  const metValues = {
    warmup: 2.5,
    cooldown: 2.0,
    arms: 3.5,
    legs: 4.0,
    core: 3.5,
    cardio: 6.0,
    fullBody: 5.0
  };
  
  // Formula: Calories = MET × weight (kg) × duration (hours)
  let totalCalories = 0;
  
  exercises.forEach(exercise => {
    const met = metValues[exercise.category];
    const durationInHours = exercise.duration / 60;
    const caloriesBurned = met * profile.weight * durationInHours;
    totalCalories += caloriesBurned;
  });
  
  return Math.round(totalCalories);
};