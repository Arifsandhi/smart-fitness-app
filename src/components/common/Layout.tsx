import React, { ReactNode } from 'react';
import Header from './Header';
import { useUser } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  requireAuth = true,
  title
}) => {
  const { hasProfileSetup, loading } = useUser();
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-400 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Redirect to profile setup if requireAuth is true but no profile exists
  if (requireAuth && !hasProfileSetup) {
    return <Navigate to="/profile/setup" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="flex-1">
        {title && (
          <div className="bg-primary-600 dark:bg-primary-800 text-white py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
          </div>
        )}
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 FitMate - Your Smart Fitness Coach</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;