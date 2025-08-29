import React, { useState } from 'react';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import SortingVisualizer from './components/SortingVisualizer';
import ThemeSwitcher from './components/ThemeSwitcher';

/**
 * Test component that combines all visualizers in one view for testing
 */
const VisualizerTester = () => {
  const [theme, setTheme] = useState('dark');
  
  // Toggle theme for testing
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };
  
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-100">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-black/10 dark:border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Visualizer Tester</h1>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <button 
              onClick={toggleTheme}
              className="px-3 py-1 rounded-lg bg-blue-500 text-white"
              aria-label="Test theme toggle"
            >
              Test Toggle
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Stack Visualizer</h2>
            <StackVisualizer />
          </section>
          
          <section className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Queue Visualizer</h2>
            <QueueVisualizer />
          </section>
        </div>
        
        <section className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Sorting Visualizer</h2>
          <SortingVisualizer />
        </section>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900">Accessibility Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 dark:text-blue-300 text-blue-700">Keyboard Navigation</h3>
              <p className="dark:text-gray-300 text-gray-700 mb-4">
                Press Tab to navigate through interactive elements, Enter or Space to activate them.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="btn-primary">First Button</button>
                <button className="btn-secondary">Second Button</button>
                <button className="btn-danger">Third Button</button>
              </div>
              
              <div className="mb-4">
                <label htmlFor="test-input" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                  Test Input
                </label>
                <input 
                  id="test-input"
                  type="text" 
                  className="input-control w-full"
                  placeholder="Test keyboard focus"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 dark:text-blue-300 text-blue-700">Theme Testing</h3>
              <p className="dark:text-gray-300 text-gray-700 mb-4">
                The UI should adapt to both dark and light themes consistently.
              </p>
              
              <div className="p-4 mb-4 rounded-lg bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <h4 className="font-medium mb-2 dark:text-white text-gray-900">Theme Demo</h4>
                <p className="dark:text-gray-400 text-gray-600">
                  This container should look different in dark and light modes.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                <span className="dark:text-gray-300 text-gray-700">Primary Color</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-black/10 dark:border-white/10 text-center dark:text-gray-400 text-gray-600">
        <p>DSA Visualizer Testing Environment</p>
      </footer>
    </div>
  );
};

export default VisualizerTester;
