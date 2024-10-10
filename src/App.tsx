import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { AddressConverter } from './pages/AddressConverter.tsx';

import { ThemeProvider } from '@/components/theme-provider.tsx';

// AppWrapper component with authentication check

// Placeholder component for undefined routes
const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-2xl font-bold mb-4'>Page Not Found</h1>
      <p>
        The page "{location.pathname.split('/').pop()}" is under construction.
      </p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='min-h-screen w-screen bg-gradient-to-b from-blue-900 to-black p-4'>
          <Routes>
            <Route path='/tontastic-address/' element={<AddressConverter />} />

            {/* Placeholder route for undefined paths */}
            <Route path='/tontastic-address/*' element={<PlaceholderPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
