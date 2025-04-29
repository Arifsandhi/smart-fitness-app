import React from 'react';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import ProgressChart from '../components/progress/ProgressChart';
import ProgressForm from '../components/progress/ProgressForm';
import StatsCard from '../components/progress/StatsCard';
import BmiCalculator from '../components/profile/BmiCalculator';

const ProgressPage: React.FC = () => {
  const { userProgress, userStreak } = useUser();
  
  return (
    <Layout title="Progress Tracker">
      <div className="space-y-6">
        <StatsCard streak={userStreak} progress={userProgress} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProgressChart progress={userProgress} />
          </div>
          
          <div className="space-y-6">
            <ProgressForm />
            <BmiCalculator />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;