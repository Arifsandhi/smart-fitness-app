import React from 'react';
import Card, { CardBody, CardHeader } from '../common/Card';
import { Lightbulb } from 'lucide-react';
import { getDailyTip } from '../../data/motivationalTips';

const DailyTip: React.FC = () => {
  const { tip, category } = getDailyTip();
  
  // Category-specific colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'motivation':
        return 'bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300';
      case 'nutrition':
        return 'bg-success-50 dark:bg-success-900/30 text-success-800 dark:text-success-300';
      case 'technique':
        return 'bg-secondary-50 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300';
      case 'recovery':
        return 'bg-accent-50 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300';
      case 'planning':
        return 'bg-warning-50 dark:bg-warning-900/30 text-warning-800 dark:text-warning-300';
      case 'mental':
        return 'bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Daily Fitness Tip</h3>
        </div>
      </CardHeader>
      
      <CardBody className="p-6">
        <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 border-l-4 border-primary-400 pl-4 py-1">
          "{tip}"
        </blockquote>
        
        <div className="mt-4 flex justify-end">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default DailyTip;