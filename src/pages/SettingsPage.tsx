import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import Card, { CardBody, CardHeader, CardFooter } from '../components/common/Card';
import { Link } from 'react-router-dom';
import { 
  User, 
  Moon, 
  Sun, 
  Award, 
  Trash2, 
  AlarmClock,
  PenTool
} from 'lucide-react';
import { getUserSettings, saveUserSettings, resetAllData } from '../utils/localStorage';
import AchievementCard from '../components/achievements/AchievementCard';

const SettingsPage: React.FC = () => {
  const { userProfile, achievements } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Get user settings and initialize state
  const settings = getUserSettings();
  const [reminders, setReminders] = useState(settings.reminders);
  const [measurementUnit, setMeasurementUnit] = useState(settings.measurementUnit);
  
  // Save settings
  const handleSaveSettings = () => {
    const updatedSettings = {
      ...settings,
      reminders,
      measurementUnit
    };
    saveUserSettings(updatedSettings);
  };
  
  // Reset all data
  const handleResetAllData = () => {
    resetAllData();
    window.location.href = '/profile/setup';
  };
  
  return (
    <Layout title="Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
              <div className="flex items-center">
                <User className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Profile</h3>
              </div>
            </CardHeader>
            
            <CardBody>
              {userProfile && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userProfile.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{userProfile.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userProfile.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userProfile.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Fitness Level</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{userProfile.fitnessLevel}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
            
            <CardFooter>
              <Link to="/profile/edit" className="w-full">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<PenTool size={18} />}
                >
                  Edit Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* App Settings */}
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
              <div className="flex items-center">
                <Sun className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Preferences</h3>
              </div>
            </CardHeader>
            
            <CardBody>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      className="sr-only"
                    />
                    <label
                      htmlFor="toggle"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                        darkMode ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Workout Reminders</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive daily workout notifications</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="reminders"
                      id="reminders"
                      checked={reminders}
                      onChange={() => setReminders(!reminders)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="reminders"
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                        reminders ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Measurement Units</h4>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary-600 focus:ring-primary-500"
                        name="unit"
                        value="metric"
                        checked={measurementUnit === 'metric'}
                        onChange={() => setMeasurementUnit('metric')}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Metric (kg, cm)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary-600 focus:ring-primary-500"
                        name="unit"
                        value="imperial"
                        checked={measurementUnit === 'imperial'}
                        onChange={() => setMeasurementUnit('imperial')}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Imperial (lb, ft)</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardBody>
            
            <CardFooter>
              <Button
                variant="primary"
                fullWidth
                onClick={handleSaveSettings}
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Achievements Section */}
        <Card>
          <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Achievements</h3>
            </div>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </CardBody>
        </Card>
        
        {/* Danger Zone */}
        <Card className="border-error-200 dark:border-error-900">
          <CardHeader className="bg-error-50 dark:bg-error-900/30">
            <div className="flex items-center">
              <Trash2 className="h-5 w-5 text-error-600 dark:text-error-400 mr-2" />
              <h3 className="text-lg font-medium text-error-800 dark:text-error-300">Danger Zone</h3>
            </div>
          </CardHeader>
          
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Resetting your data will permanently delete all your profiles, workouts, progress, and achievements. This action cannot be undone.
            </p>
            
            {showResetConfirm ? (
              <div className="bg-error-50 dark:bg-error-900/20 p-4 rounded-md">
                <p className="text-error-800 dark:text-error-300 font-medium mb-3">
                  Are you sure you want to reset all your data?
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="danger"
                    onClick={handleResetAllData}
                  >
                    Yes, Reset Everything
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="danger"
                onClick={() => setShowResetConfirm(true)}
                icon={<Trash2 size={18} />}
              >
                Reset All Data
              </Button>
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;