import React from 'react';
import { Achievement } from '../../utils/types';
import Card, { CardBody } from '../common/Card';
import { Award, Lock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { name, description, icon, earned, earnedDate } = achievement;
  
  return (
    <Card 
      className={`h-full transition-all duration-200 ${
        earned 
          ? 'border-l-4 border-l-success-500 dark:border-l-success-500' 
          : 'opacity-70 dark:opacity-60'
      }`}
    >
      <CardBody className="p-4">
        <div className="flex items-start">
          <div className={`rounded-full p-3 ${
            earned 
              ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
          } mr-4`}>
            {earned ? <Award className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            
            {earned && earnedDate && (
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                Earned on {format(parseISO(earnedDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AchievementCard;