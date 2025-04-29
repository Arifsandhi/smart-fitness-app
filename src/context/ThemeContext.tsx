import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getUserSettings, saveUserSettings } from '../utils/localStorage';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const settings = getUserSettings();
    setDarkMode(settings.darkMode);
    
    // Apply dark mode class to html element
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Update theme and save preference
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      
      // Update settings in localStorage
      const settings = getUserSettings();
      saveUserSettings({ ...settings, darkMode: newMode });
      
      // Apply dark mode class to html element
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};