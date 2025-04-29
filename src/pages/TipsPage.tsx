import React from 'react';
import Layout from '../components/common/Layout';
import { motivationalTips } from '../data/motivationalTips';
import DailyTip from '../components/tips/DailyTip';
import Card, { CardBody } from '../components/common/Card';
import { Bell } from 'lucide-react';

const TipsPage: React.FC = () => {
  // Group tips by category
  const tipsByCategory = motivationalTips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, typeof motivationalTips>);
  
  // Define category display names and colors
  const categoryInfo = {
    motivation: { label: 'Motivation', color: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' },
    nutrition: { label: 'Nutrition', color: 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300' },
    technique: { label: 'Exercise Technique', color: 'bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300' },
    recovery: { label: 'Recovery', color: 'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300' },
    planning: { label: 'Planning', color: 'bg-warning-50 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300' },
    mental: { label: 'Mental Fitness', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' }
  };
  
  return (
    <Layout title="Fitness Tips">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Daily Tip
        </h1>
        
        <DailyTip />
        
        <div className="flex items-center mt-8 mb-4">
          <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Fitness Tips
          </h2>
        </div>
        
        <div className="space-y-8">
          {Object.entries(tipsByCategory).map(([category, tips]) => (
            <div key={category}>
              <h3 className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryInfo[category as keyof typeof categoryInfo].color}`}>
                {categoryInfo[category as keyof typeof categoryInfo].label}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map(tip => (
                  <Card key={tip.id} hover>
                    <CardBody className="p-4">
                      <p className="text-gray-800 dark:text-gray-200">
                        {tip.tip}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TipsPage;