import React from 'react';
import { DailyWorkout, UserProfile } from '../../utils/types';
import { estimateCaloriesBurned } from '../../utils/workoutGenerator';
import { format } from 'date-fns';
import Card, { CardBody, CardHeader } from '../common/Card';
import { Flame, Calendar, Clock, Dumbbell } from 'lucide-react';

interface WorkoutSummaryProps {
  workout: DailyWorkout;
  profile: UserProfile;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, profile }) => {
  // Calculate workout stats
  const exerciseCount = workout.exercises.length;
  const totalDuration = workout.exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
  const estimatedCalories = estimateCaloriesBurned(workout.exercises, profile);
  
  // Categorize exercises
  const categories = workout.exercises.reduce((acc, exercise) => {
    const category = exercise.category;
    if (!acc[category]) acc[category] = 0;
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <Card>
      <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Dumbbell className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Workout Summary
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {format(new Date(workout.date), 'MMM d, yyyy')}
          </span>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 flex items-center">
            <Dumbbell className="h-8 w-8 text-primary-500 dark:text-primary-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Exercises</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{exerciseCount}</p>
            </div>
          </div>
          
          <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4 flex items-center">
            <Clock className="h-8 w-8 text-secondary-500 dark:text-secondary-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalDuration} min</p>
            </div>
          </div>
          
          <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 flex items-center">
            <Flame className="h-8 w-8 text-accent-500 dark:text-accent-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Est. Calories</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{estimatedCalories}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white mb-3">Exercise Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(categories).map(([category, count]) => (
              <div key={category} className="flex items-center">
                <div className="w-32 text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {category}
                </div>
                <div className="flex-1">
                  <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary-500 dark:bg-primary-400 rounded-full"
                      style={{ width: `${(count / exerciseCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-10 text-right text-sm font-medium text-gray-800 dark:text-white">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WorkoutSummary;