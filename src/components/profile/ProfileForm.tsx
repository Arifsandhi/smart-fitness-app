import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../utils/types';
import Button from '../common/Button';
import { fitnessGoals, fitnessLevels } from '../../data/fitnessGoalData';
import { useUser } from '../../context/UserContext';
import Card, { CardBody, CardHeader, CardFooter } from '../common/Card';
import { Activity, UserCircle } from 'lucide-react';

interface ProfileFormProps {
  initialData?: UserProfile | null;
  isEditing?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  initialData = null,
  isEditing = false
}) => {
  const navigate = useNavigate();
  const { saveProfile } = useUser();
  
  const [formData, setFormData] = useState<Partial<UserProfile>>(
    initialData || {
      name: '',
      age: 30,
      gender: 'male',
      height: 170,
      weight: 70,
      fitnessGoal: 'general_fitness',
      fitnessLevel: 'beginner'
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle number inputs
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create full profile data
    const profileData: UserProfile = {
      ...formData as UserProfile,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };
    
    // Save profile
    saveProfile(profileData);
    
    // Navigate to dashboard
    navigate('/');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {isEditing ? 'Update Your Profile' : 'Welcome to FitMate!'}
            </h2>
          </div>
          {!isEditing && (
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Let's set up your fitness profile to get personalized workouts.
            </p>
          )}
        </CardHeader>
        
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="13"
                  max="100"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="100"
                  max="250"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="30"
                  max="300"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fitness Goal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fitnessGoals.map((goal) => (
                  <label
                    key={goal.id}
                    className={`relative flex items-start p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                      formData.fitnessGoal === goal.id 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="fitnessGoal"
                        id={`goal-${goal.id}`}
                        value={goal.id}
                        checked={formData.fitnessGoal === goal.id}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label htmlFor={`goal-${goal.id}`} className="font-medium text-gray-800 dark:text-white">
                        {goal.title}
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{goal.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fitness Level
              </label>
              <div className="flex flex-wrap gap-3">
                {fitnessLevels.map((level) => (
                  <label
                    key={level.id}
                    className={`flex-1 relative flex items-center justify-center p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer min-w-[100px] ${
                      formData.fitnessLevel === level.id 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="fitnessLevel"
                        id={`level-${level.id}`}
                        value={level.id}
                        checked={formData.fitnessLevel === level.id}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-2">
                      <label htmlFor={`level-${level.id}`} className="font-medium text-gray-800 dark:text-white">
                        {level.title}
                      </label>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          
          </form>
        </CardBody>
        
        <CardFooter className="flex justify-end space-x-3">
          {isEditing && (
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={<Activity size={18} />}
          >
            {isEditing ? 'Update Profile' : 'Start My Fitness Journey'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileForm;