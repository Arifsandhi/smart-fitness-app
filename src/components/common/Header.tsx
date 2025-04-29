import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Workout', path: '/workout' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Progress', path: '/progress' },
    { name: 'Tips', path: '/tips' },
    { name: 'Settings', path: '/settings' }
  ];
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <Dumbbell className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FitMate</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  pathname === item.path
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="ml-4"
              icon={darkMode ? <Sun size={18} /> : <Moon size={18} />}
            >
              {darkMode ? 'Light' : 'Dark'}
            </Button>
          </nav>
          
          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="mr-2"
              icon={darkMode ? <Sun size={18} /> : <Moon size={18} />}
            />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.path
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;