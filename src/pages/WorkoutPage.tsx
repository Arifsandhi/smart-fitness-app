import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import ExerciseCard from '../components/workouts/ExerciseCard';
import WorkoutSummary from '../components/workouts/WorkoutSummary';
import Button from '../components/common/Button';
import { RefreshCw, CheckCircle, Dumbbell } from 'lucide-react';
import Card, { CardBody } from '../components/common/Card';

const WorkoutPage: React.FC = () => {
  const { 
    userProfile, 
    todayWorkout, 
    completeWorkout, 
    generateWorkout
  } = useUser();
  
  const [exerciseStatus, setExerciseStatus] = useState<Record<string, boolean>>(
    todayWorkout?.exercises.reduce((acc, exercise) => {
      acc[exercise.id] = false;
      return acc;
    }, {} as Record<string, boolean>) || {}
  );
  
  // Toggle completion status for an exercise
  const toggleExercise = (id: string) => {
    setExerciseStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Check if all exercises are completed
  const allExercisesCompleted = () => {
    if (!todayWorkout) return false;
    return todayWorkout.exercises.every(ex => exerciseStatus[ex.id]);
  };
  
  // Mark entire workout as complete
  const handleCompleteWorkout = () => {
    if (todayWorkout) {
      completeWorkout(true);
    }
  };
  
  // Generate a new workout
  const handleGenerateNewWorkout = () => {
    if (userProfile) {
      const newWorkout = generateWorkout();
      if (newWorkout) {
        setExerciseStatus(
          newWorkout.exercises.reduce((acc, exercise) => {
            acc[exercise.id] = false;
            return acc;
          }, {} as Record<string, boolean>)
        );
      }
    }
  };
  
  return (
    <Layout title="Today's Workout">
      <div className="space-y-6">
        {userProfile && todayWorkout ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Workout Plan
              </h1>
              
              <div className="flex space-x-3 mt-3 md:mt-0">
                <Button
                  variant="outline"
                  icon={<RefreshCw size={18} />}
                  onClick={handleGenerateNewWorkout}
                >
                  New Workout
                </Button>
                
                <Button
                  variant="primary"
                  icon={<CheckCircle size={18} />}
                  onClick={handleCompleteWorkout}
                  disabled={todayWorkout.completed}
                >
                  {todayWorkout.completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 space-y-4">
                {todayWorkout.exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index + 1}
                    isCompleted={exerciseStatus[exercise.id] || todayWorkout.completed}
                    onToggleComplete={() => toggleExercise(exercise.id)}
                  />
                ))}
              </div> 
              
              <div className="space-y-4 md:col-span-2">
                <WorkoutSummary workout={todayWorkout} profile={userProfile} />
                
                <Card className={`${
                  todayWorkout.completed 
                    ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800'
                    : 'bg-white dark:bg-gray-800'
                }`}>
                  <CardBody className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                      Workout Progress
                    </h3>
                    
                    {todayWorkout.completed ? (
                      <div className="flex items-center text-success-600 dark:text-success-400">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Workout completed!</span>
                      </div>
                    ) : (
                      <>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                                {Object.values(exerciseStatus).filter(Boolean).length} / {todayWorkout.exercises.length} exercises
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                                {Math.round((Object.values(exerciseStatus).filter(Boolean).length / todayWorkout.exercises.length) * 100)}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200 dark:bg-primary-900/30">
                            <div style={{ width: `${(Object.values(exerciseStatus).filter(Boolean).length / todayWorkout.exercises.length) * 100}%` }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500">
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="primary"
                          fullWidth
                          icon={<Dumbbell size={18} />}
                          disabled={!allExercisesCompleted()}
                          onClick={handleCompleteWorkout}
                          className="mt-2"
                        >
                          Complete Workout
                        </Button>
                      </>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No workout available. Please complete your profile setup.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WorkoutPage;