import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { 
  UserProfile, 
  UserProgress, 
  DailyWorkout,
  UserStreak,
  Achievement 
} from '../utils/types';
import { 
  getUserProfile, 
  getUserProgress, 
  saveUserProfile, 
  saveUserProgress,
  getDailyWorkoutByDate,
  saveDailyWorkout,
  getUserStreak
} from '../utils/localStorage';
import { createDailyWorkout } from '../utils/workoutGenerator';
import { format } from 'date-fns';
import { initializeAchievements, checkAchievements } from '../utils/achievementTracker';

interface UserContextType {
  userProfile: UserProfile | null;
  userProgress: UserProgress;
  todayWorkout: DailyWorkout | null;
  userStreak: UserStreak;
  achievements: Achievement[];
  saveProfile: (profile: UserProfile) => void;
  updateProgress: (date: string, weight?: number, caloriesBurned?: number, workoutCompleted?: boolean) => void;
  generateWorkout: () => void;
  completeWorkout: (completed: boolean) => void;
  hasProfileSetup: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({ weights: [], workouts: [] });
  const [todayWorkout, setTodayWorkout] = useState<DailyWorkout | null>(null);
  const [userStreak, setUserStreak] = useState<UserStreak>({ currentStreak: 0, bestStreak: 0, lastWorkoutDate: null });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load user data on initial render
  useEffect(() => {
    const profile = getUserProfile();
    const progress = getUserProgress();
    const streak = getUserStreak();
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayWorkout = getDailyWorkoutByDate(today);
    
    // Initialize achievements
    const achievements = initializeAchievements();
    
    setUserProfile(profile);
    setUserProgress(progress);
    setUserStreak(streak);
    setTodayWorkout(todayWorkout);
    setAchievements(achievements);
    setLoading(false);
    
    // If user profile exists but no workout for today, generate one
    if (profile && !todayWorkout) {
      const newWorkout = createDailyWorkout(profile);
      saveDailyWorkout(newWorkout);
      setTodayWorkout(newWorkout);
    }
    
    // Check for new achievements if user profile exists
    if (profile) {
      checkAchievements(profile, progress, streak);
    }
  }, []);
  
  // Save user profile and generate first workout if needed
  const saveProfile = (profile: UserProfile) => {
    saveUserProfile(profile);
    setUserProfile(profile);
    
    // Generate initial workout if profile is new
    const today = format(new Date(), 'yyyy-MM-dd');
    const existingWorkout = getDailyWorkoutByDate(today);
    
    if (!existingWorkout) {
      const newWorkout = createDailyWorkout(profile);
      saveDailyWorkout(newWorkout);
      setTodayWorkout(newWorkout);
    }
  };
  
  // Update progress data (weight, calories, workout completion)
  const updateProgress = (
    date: string, 
    weight?: number, 
    caloriesBurned?: number, 
    workoutCompleted?: boolean
  ) => {
    const updatedProgress = { ...userProgress };
    
    // Update weight data if provided
    if (weight) {
      const existingWeightIndex = updatedProgress.weights.findIndex(entry => entry.date === date);
      
      if (existingWeightIndex >= 0) {
        updatedProgress.weights[existingWeightIndex].weight = weight;
      } else {
        updatedProgress.weights.push({ date, weight });
        // Sort by date
        updatedProgress.weights.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
    }
    
    // Update workout data if provided
    if (typeof workoutCompleted === 'boolean' || typeof caloriesBurned === 'number') {
      const existingWorkoutIndex = updatedProgress.workouts.findIndex(entry => entry.date === date);
      const existingEntry = existingWorkoutIndex >= 0 ? updatedProgress.workouts[existingWorkoutIndex] : { date, completed: false, caloriesBurned: 0 };
      
      const updatedEntry = {
        ...existingEntry,
        ...(typeof workoutCompleted === 'boolean' ? { completed: workoutCompleted } : {}),
        ...(typeof caloriesBurned === 'number' ? { caloriesBurned } : {})
      };
      
      if (existingWorkoutIndex >= 0) {
        updatedProgress.workouts[existingWorkoutIndex] = updatedEntry;
      } else {
        updatedProgress.workouts.push(updatedEntry);
        // Sort by date
        updatedProgress.workouts.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
    }
    
    // Save updated progress
    saveUserProgress(updatedProgress);
    setUserProgress(updatedProgress);
    
    // Check for new achievements
    if (userProfile) {
      const updatedAchievements = checkAchievements(userProfile, updatedProgress, userStreak);
      setAchievements(updatedAchievements);
    }
  };
  
  // Generate new workout for current user profile
  const generateWorkout = () => {
    if (userProfile) {
      const newWorkout = createDailyWorkout(userProfile);
      saveDailyWorkout(newWorkout);
      setTodayWorkout(newWorkout);
      return newWorkout;
    }
    return null;
  };
  
  // Mark today's workout as complete/incomplete
  const completeWorkout = (completed: boolean) => {
    if (todayWorkout) {
      const updatedWorkout = { ...todayWorkout, completed };
      saveDailyWorkout(updatedWorkout);
      setTodayWorkout(updatedWorkout);
      
      // Update progress for today
      const today = format(new Date(), 'yyyy-MM-dd');
      updateProgress(today, undefined, undefined, completed);
      
      // Update streak
      // Note: Streak update logic is handled in the updateProgress function via checkAchievements
    }
  };
  
  return (
    <UserContext.Provider 
      value={{
        userProfile,
        userProgress,
        todayWorkout,
        userStreak,
        achievements,
        saveProfile,
        updateProgress,
        generateWorkout,
        completeWorkout,
        hasProfileSetup: userProfile !== null,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};