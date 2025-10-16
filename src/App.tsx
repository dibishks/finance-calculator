import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';

// Placeholder components for routes that don't have full pages yet
const Services: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Services</h1>
      <p className="text-gray-600 dark:text-gray-300">Services page coming soon!</p>
    </div>
  </div>
);

const Contact: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
      <p className="text-gray-600 dark:text-gray-300">Contact page coming soon!</p>
    </div>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
