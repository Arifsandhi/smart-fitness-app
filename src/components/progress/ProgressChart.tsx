import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { UserProgress } from '../../utils/types';
import Card, { CardBody, CardHeader } from '../common/Card';
import Button from '../common/Button';

interface ProgressChartProps {
  progress: UserProgress;
}

type ChartTimeframe = '7days' | '30days' | '90days' | 'all';
type ChartType = 'weight' | 'calories' | 'workouts';

const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('30days');
  const [chartType, setChartType] = useState<ChartType>('weight');
  
  // Format data for charts
  const prepareChartData = () => {
    // Sort data by date
    const sortedWeights = [...progress.weights].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const sortedWorkouts = [...progress.workouts].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Filter data by timeframe
    const now = new Date();
    const timeframeDates = {
      '7days': subDays(now, 7),
      '30days': subDays(now, 30),
      '90days': subDays(now, 90),
      'all': new Date(0) // Beginning of time
    };
    
    const filteredWeights = sortedWeights.filter(entry => 
      new Date(entry.date) >= timeframeDates[timeframe]
    );
    
    const filteredWorkouts = sortedWorkouts.filter(entry => 
      new Date(entry.date) >= timeframeDates[timeframe]
    );
    
    // Prepare data for weight chart
    const weightData = filteredWeights.map(entry => ({
      date: format(parseISO(entry.date), 'MMM d'),
      weight: entry.weight
    }));
    
    // Prepare data for calories chart
    const caloriesData = filteredWorkouts.map(entry => ({
      date: format(parseISO(entry.date), 'MMM d'),
      calories: entry.caloriesBurned
    }));
    
    // Prepare data for workouts completion chart
    const workoutsData = filteredWorkouts.map(entry => ({
      date: format(parseISO(entry.date), 'MMM d'),
      completed: entry.completed ? 1 : 0
    }));
    
    return {
      weightData,
      caloriesData,
      workoutsData
    };
  };
  
  const chartData = prepareChartData();
  
  // Get appropriate data for current chart type
  const getCurrentChartData = () => {
    switch (chartType) {
      case 'weight':
        return chartData.weightData;
      case 'calories':
        return chartData.caloriesData;
      case 'workouts':
        return chartData.workoutsData;
      default:
        return [];
    }
  };
  
  // Render appropriate chart for current type
  const renderChart = () => {
    const data = getCurrentChartData();
    
    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No data available for the selected timeframe
        </div>
      );
    }
    
    switch (chartType) {
      case 'weight':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="weight" 
                name="Weight (kg)" 
                stroke="#0ea5e9" 
                activeDot={{ r: 8 }} 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'calories':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="calories" 
                name="Calories Burned" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'workouts':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                stroke="#6b7280" 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(value) => value === 1 ? 'Yes' : 'No'}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [value === 1 ? 'Yes' : 'No', 'Completed']}
              />
              <Legend />
              <Bar 
                dataKey="completed" 
                name="Workout Completed" 
                fill="#22c55e" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="bg-primary-50 dark:bg-primary-900/30">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2 md:mb-0">
            Progress Tracker
          </h3>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
              <button
                className={`px-3 py-1 text-sm ${chartType === 'weight' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setChartType('weight')}
              >
                Weight
              </button>
              <button
                className={`px-3 py-1 text-sm ${chartType === 'calories' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setChartType('calories')}
              >
                Calories
              </button>
              <button
                className={`px-3 py-1 text-sm ${chartType === 'workouts' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setChartType('workouts')}
              >
                Workouts
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2 text-sm">
            <Button 
              size="sm" 
              variant={timeframe === '7days' ? 'primary' : 'outline'}
              onClick={() => setTimeframe('7days')}
            >
              7 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeframe === '30days' ? 'primary' : 'outline'}
              onClick={() => setTimeframe('30days')}
            >
              30 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeframe === '90days' ? 'primary' : 'outline'}
              onClick={() => setTimeframe('90days')}
            >
              90 Days
            </Button>
            <Button 
              size="sm" 
              variant={timeframe === 'all' ? 'primary' : 'outline'}
              onClick={() => setTimeframe('all')}
            >
              All
            </Button>
          </div>
        </div>
        
        {renderChart()}
      </CardBody>
    </Card>
  );
};

export default ProgressChart;