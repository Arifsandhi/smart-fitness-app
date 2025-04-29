import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import Card, { CardBody, CardHeader } from '../common/Card';
import { Activity } from 'lucide-react';

const BmiCalculator: React.FC = () => {
  const { userProfile } = useUser();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [bmiColor, setBmiColor] = useState<string>('');
  
  useEffect(() => {
    if (userProfile) {
      calculateBmi(userProfile.height, userProfile.weight);
    }
  }, [userProfile]);
  
  const calculateBmi = (heightCm: number, weightKg: number) => {
    // Convert height from cm to meters
    const heightM = heightCm / 100;
    // BMI formula: weight (kg) / height^2 (m)
    const calculatedBmi = weightKg / (heightM * heightM);
    const roundedBmi = parseFloat(calculatedBmi.toFixed(1));
    
    setBmi(roundedBmi);
    
    // Determine BMI category and color
    if (roundedBmi < 18.5) {
      setBmiCategory('Underweight');
      setBmiColor('text-blue-500');
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      setBmiCategory('Normal weight');
      setBmiColor('text-green-500');
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setBmiCategory('Overweight');
      setBmiColor('text-yellow-500');
    } else {
      setBmiCategory('Obese');
      setBmiColor('text-red-500');
    }
  };
  
  return (
    <Card>
      <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">BMI Calculator</h3>
        </div>
      </CardHeader>
      
      <CardBody>
        {userProfile ? (
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2 transition-colors duration-300 ease-in-out">
              <span className={bmiColor}>{bmi}</span>
            </div>
            <div className={`text-lg font-medium mb-4 ${bmiColor}`}>
              {bmiCategory}
            </div>
            
            {/* BMI Scale Visualization */}
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2 mb-4">
              <div className="flex h-full">
                <div className="bg-blue-500 h-full w-1/4"></div>
                <div className="bg-green-500 h-full w-1/4"></div>
                <div className="bg-yellow-500 h-full w-1/4"></div>
                <div className="bg-red-500 h-full w-1/4"></div>
              </div>
            </div>
            
            <div className="w-full flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Underweight<br/>&lt;18.5</span>
              <span>Normal<br/>18.5-24.9</span>
              <span>Overweight<br/>25-29.9</span>
              <span>Obese<br/>&gt;30</span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
              BMI provides a simple measure of body weight relative to height. It's a general indicator but doesn't account for factors like muscle mass or body composition.
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            Please complete your profile to see your BMI.
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BmiCalculator;