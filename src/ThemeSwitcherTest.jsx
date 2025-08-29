import React from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';

/**
 * A small test component that demonstrates the ThemeSwitcher integration
 */
const ThemeSwitcherTest = () => {
  return (
    <div className="p-6 min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-gray-800">Theme Switcher Test</h1>
          <ThemeSwitcher />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 dark:bg-white/10 dark:backdrop-blur-sm bg-white/80 backdrop-blur-sm dark:border-white/20 border border-black/10 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-gray-800">Dark Theme Features</h2>
            <ul className="list-disc pl-5 dark:text-gray-300 text-gray-600 space-y-2">
              <li>Dark background with reduced light emission</li>
              <li>Glass morphism effects with proper contrast</li>
              <li>Vibrant accents for important UI elements</li>
              <li>Proper color contrast for text readability</li>
              <li>Subtle shadows and highlights</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 dark:bg-white/10 dark:backdrop-blur-sm bg-white/80 backdrop-blur-sm dark:border-white/20 border border-black/10 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-gray-800">Light Theme Features</h2>
            <ul className="list-disc pl-5 dark:text-gray-300 text-gray-600 space-y-2">
              <li>Clean white background for daylight viewing</li>
              <li>Subtle glass effects for depth</li>
              <li>Muted color palette with clear contrast</li>
              <li>Sharp borders for clear element separation</li>
              <li>Minimal shadows for a clean look</li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2 glass-card p-6 dark:bg-white/10 dark:backdrop-blur-sm bg-white/80 backdrop-blur-sm dark:border-white/20 border border-black/10 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-gray-800">Theme Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold dark:text-blue-300 text-blue-600 mb-2">System Features</h3>
                <p className="dark:text-gray-300 text-gray-600 mb-4">
                  The theme switcher respects user's system preferences and also stores the selection in localStorage
                  for persistent experience.
                </p>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-4 h-4 rounded-full dark:bg-purple-500 bg-purple-700"></span>
                  <span className="dark:text-gray-300 text-gray-600">Primary Color</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-4 h-4 rounded-full dark:bg-blue-400 bg-blue-600"></span>
                  <span className="dark:text-gray-300 text-gray-600">Secondary Color</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 rounded-full dark:bg-green-400 bg-green-600"></span>
                  <span className="dark:text-gray-300 text-gray-600">Accent Color</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold dark:text-blue-300 text-blue-600 mb-2">Accessibility Features</h3>
                <ul className="list-disc pl-5 dark:text-gray-300 text-gray-600 space-y-2">
                  <li>Proper color contrast ratios</li>
                  <li>Keyboard accessible controls</li>
                  <li>Focus indicators</li>
                  <li>Semantic HTML structure</li>
                  <li>ARIA attributes for screen readers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcherTest;
