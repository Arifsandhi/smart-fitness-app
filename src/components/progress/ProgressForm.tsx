import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '../common/Button';
import Card, { CardBody, CardHeader, CardFooter } from '../common/Card';
import { useUser } from '../../context/UserContext';
import { Save, Scale, Flame } from 'lucide-react';

const ProgressForm: React.FC = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { userProfile, updateProgress, userProgress } = useUser();
  
  // Find existing entries for today
  const todayWeightEntry = userProgress.weights.find(entry => entry.date === today);
  const todayWorkoutEntry = userProgress.workouts.find(entry => entry.date === today);
  
  const [weight, setWeight] = useState<number>(
    todayWeightEntry?.weight || userProfile?.weight || 70
  );
  const [caloriesBurned, setCaloriesBurned] = useState<number>(
    todayWorkoutEntry?.caloriesBurned || 0
  );
  const [workoutCompleted, setWorkoutCompleted] = useState<boolean>(
    todayWorkoutEntry?.completed || false
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProgress(today, weight, caloriesBurned, workoutCompleted);
  };
  
  return (
    <Card>
      <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          Log Today's Progress
        </h3>
      </CardHeader>
      
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Scale size={16} className="mr-1" />
                Today's Weight (kg)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Flame size={16} className="mr-1" />
                Calories Burned (estimate)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="workoutCompleted"
                checked={workoutCompleted}
                onChange={(e) => setWorkoutCompleted(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="workoutCompleted" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I completed today's workout
              </label>
            </div>
          </div>
        </form>
      </CardBody>
      
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="primary"
          fullWidth
          icon={<Save size={18} />}
        >
          Save Progress
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgressForm;