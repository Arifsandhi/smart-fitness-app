import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

// Pages
import DashboardPage from './pages/DashboardPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import WorkoutPage from './pages/WorkoutPage';
import ExerciseLibraryPage from './pages/ExerciseLibraryPage';
import ProgressPage from './pages/ProgressPage';
import TipsPage from './pages/TipsPage';
import SettingsPage from './pages/SettingsPage';

// Import global styles
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile/setup" element={<ProfileSetupPage />} />
            <Route path="/profile/edit" element={<ProfileSetupPage />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/exercises" element={<ExerciseLibraryPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;