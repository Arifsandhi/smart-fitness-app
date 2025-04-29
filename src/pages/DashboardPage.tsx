import React from 'react';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { format } from 'date-fns';
import WorkoutSummary from '../components/workouts/WorkoutSummary';
import ExerciseCard from '../components/workouts/ExerciseCard';
import DailyTip from '../components/tips/DailyTip';
import StatsCard from '../components/progress/StatsCard';
import Button from '../components/common/Button';
import { Dumbbell, RefreshCw, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardBody, CardHeader } from '../components/common/Card';
import AchievementCard from '../components/achievements/AchievementCard';

const DashboardPage: React.FC = () => {
  const { 
    userProfile, 
    todayWorkout, 
    completeWorkout, 
    generateWorkout,
    userStreak,
    userProgress,
    achievements
  } = useUser();
  
  // Get earned achievements for display
  const earnedAchievements = achievements.filter(a => a.earned);
  const recentAchievements = earnedAchievements.slice(0, 2);
  
  return (
    <Layout title="Dashboard">
      {userProfile && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userProfile.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Today is {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              {todayWorkout && todayWorkout.completed ? (
                <div className="bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300 px-4 py-2 rounded-md inline-flex items-center">
                  <span className="mr-2">✓</span>
                  Today's workout completed!
                </div>
              ) : (
                <Button 
                  variant="primary"
                  icon={<Dumbbell size={18} />}
                  onClick={() => {}}
                >
                  <Link to="/workout">Start Today's Workout</Link>
                </Button>
              )}
            </div>
          </div>
          
          <StatsCard streak={userStreak} progress={userProgress} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {todayWorkout && userProfile && (
                <>
                  <WorkoutSummary workout={todayWorkout} profile={userProfile} />
                  
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Today's Exercises
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<RefreshCw size={16} />}
                      onClick={generateWorkout}
                    >
                      New Workout
                    </Button>
                  </div>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {todayWorkout.exercises.slice(0, 4).map((exercise, index) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={index + 1}
                        isCompleted={todayWorkout.completed}
                      />
                    ))}
                    {todayWorkout.exercises.length > 4 && (
                      <div className="text-center">
                        <Link 
                          to="/workout"
                          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                        >
                          View all {todayWorkout.exercises.length} exercises →
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-6">
              <DailyTip />
              
              {recentAchievements.length > 0 && (
                <Card>
                  <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Achievements</h3>
                    </div>
                  </CardHeader>
                  <CardBody className="p-4 space-y-3">
                    {recentAchievements.map(achievement => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                    <div className="text-center pt-2">
                      <Link 
                        to="/settings" 
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        View all achievements →
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;