import React, { useState, useMemo } from 'react';
import Layout from '../components/common/Layout';
import ExerciseCard from '../components/workouts/ExerciseCard';
import { Exercise, ExerciseCategory, ExerciseDifficulty } from '../utils/types';
import { exerciseLibrary } from '../data/exerciseData';
import { Filter, Search, Grid, List } from 'lucide-react';
import Button from '../components/common/Button';

const ExerciseLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExerciseDifficulty | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Category options
  const categories: { id: ExerciseCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'arms', label: 'Arms' },
    { id: 'legs', label: 'Legs' },
    { id: 'core', label: 'Core' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'fullBody', label: 'Full Body' },
    { id: 'warmup', label: 'Warm-up' },
    { id: 'cooldown', label: 'Cool-down' }
  ];
  
  // Difficulty options
  const difficulties: { id: ExerciseDifficulty | 'all'; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' }
  ];
  
  // Filter exercises based on search term and filters
  const filteredExercises = useMemo(() => {
    return exerciseLibrary.filter(exercise => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      
      // Filter by difficulty
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);
  
  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Layout title="Exercise Library">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exercise Library
          </h1>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
            
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                icon={<Filter size={16} />}
                onClick={toggleFilters}
              >
                Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search Exercises
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-white"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name="category"
                        type="radio"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <div key={difficulty.id} className="flex items-center">
                      <input
                        id={`difficulty-${difficulty.id}`}
                        name="difficulty"
                        type="radio"
                        checked={selectedDifficulty === difficulty.id}
                        onChange={() => setSelectedDifficulty(difficulty.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700"
                      />
                      <label htmlFor={`difficulty-${difficulty.id}`} className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        {difficulty.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Exercise list */}
          <div className="md:col-span-3">
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">No exercises found matching your filters.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4' 
                : 'space-y-4'
              }>
                {filteredExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExerciseLibraryPage;