import React from 'react';
import Card, { CardBody } from '../common/Card';
import { UserStreak, UserProgress } from '../../utils/types';
import { Flame, Calendar, TrendingUp, Medal } from 'lucide-react';

interface StatsCardProps {
  streak: UserStreak;
  progress: UserProgress;
}

const StatsCard: React.FC<StatsCardProps> = ({ streak, progress }) => {
  // Calculate total workouts completed
  const totalWorkoutsCompleted = progress.workouts.filter(workout => workout.completed).length;
  
  // Calculate total calories burned
  const totalCaloriesBurned = progress.workouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );
  
  // Calculate weight change if we have at least two weight entries
  let weightChange = 0;
  if (progress.weights.length >= 2) {
    const sortedWeights = [...progress.weights].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const firstWeight = sortedWeights[0].weight;
    const lastWeight = sortedWeights[sortedWeights.length - 1].weight;
    weightChange = lastWeight - firstWeight;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border border-primary-100 dark:border-primary-900/30">
        <CardBody className="flex items-center p-4">
          <div className="rounded-full p-3 bg-primary-100 dark:bg-primary-900/30 mr-4">
            <Flame className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak.currentStreak}</p>
              <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">days</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <Card className="border border-secondary-100 dark:border-secondary-900/30">
        <CardBody className="flex items-center p-4">
          <div className="rounded-full p-3 bg-secondary-100 dark:bg-secondary-900/30 mr-4">
            <Medal className="h-7 w-7 text-secondary-600 dark:text-secondary-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Best Streak</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak.bestStreak}</p>
              <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">days</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <Card className="border border-accent-100 dark:border-accent-900/30">
        <CardBody className="flex items-center p-4">
          <div className="rounded-full p-3 bg-accent-100 dark:bg-accent-900/30 mr-4">
            <Calendar className="h-7 w-7 text-accent-600 dark:text-accent-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Workouts Completed</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalWorkoutsCompleted}</p>
              <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">total</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <Card className="border border-success-100 dark:border-success-900/30">
        <CardBody className="flex items-center p-4">
          <div className="rounded-full p-3 bg-success-100 dark:bg-success-900/30 mr-4">
            <TrendingUp className="h-7 w-7 text-success-600 dark:text-success-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {weightChange > 0 ? 'Weight Gained' : 'Weight Lost'}
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.abs(weightChange).toFixed(1)}
              </p>
              <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">kg</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StatsCard;