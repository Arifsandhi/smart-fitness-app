import React, { useState } from 'react';
import { Exercise } from '../../utils/types';
import Card, { CardBody } from '../common/Card';
import { Timer, ChevronDown, ChevronUp } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  isCompleted = false,
  onToggleComplete
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Difficulty color
  const difficultyColor = {
    easy: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
    medium: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
    hard: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'
  };
  
  // Category color
  const categoryColor = {
    arms: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    legs: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    core: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    cardio: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    fullBody: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    warmup: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    cooldown: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
  };
  
  return (
    <Card 
      className={`transition-all duration-300 ${
        isCompleted ? 'border-l-4 border-l-success-500' : ''
      }`}
      hover
    >
      <CardBody className="p-0">
        {/* Header section */}
        <div 
          className={`p-4 cursor-pointer flex justify-between items-center ${
            isCompleted ? 'bg-success-50 dark:bg-success-900/10' : ''
          }`}
          onClick={toggleExpanded}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-lg font-semibold">
              {index}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor[exercise.category]}`}>
                  {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[exercise.difficulty]}`}>
                  {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                  <Timer size={12} className="mr-1" />
                  {exercise.duration} min
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {onToggleComplete && (
              <div 
                className={`w-6 h-6 rounded-full mr-4 cursor-pointer border-2 flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-success-500 border-success-500 text-white' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete();
                }}
              >
                {isCompleted && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            )}
            
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 pt-0 animate-fade-in">
            <div className="mt-2 grid md:grid-cols-2 gap-4">
              <div>
                <img 
                  src={exercise.imageUrl} 
                  alt={exercise.name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {exercise.description}
                </p>
                <div className="mt-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Target Muscles:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exercise.targetMuscles.map((muscle) => (
                      <span 
                        key={muscle} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instructions:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  {exercise.instructions.map((instruction, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 text-sm">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ExerciseCard;