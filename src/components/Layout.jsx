import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

// Icons for navigation items
const icons = {
  stack: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  queue: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  ),
  sorting: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  ),
  algorithms: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
};

const navItems = [
  { id: 'stack', label: 'Stack', path: '/' },
  { id: 'queue', label: 'Queue', path: '/queue' },
  { id: 'sorting', label: 'Sorting', path: '/sorting' },
  { id: 'algorithms', label: 'Algorithms', path: '/algorithms' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 relative overflow-hidden">
      {/* No explicit background decorations here - using CSS ::before and ::after in background-fix.css */}
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700 shadow-lg z-30 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-700">
          <span className="text-2xl font-bold primary-gradient-text">DSA Visualizer</span>
          <ThemeSwitcher />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <Link 
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md scale-105' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-102'
              }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                {icons[item.id]}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Learn More</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Explore data structures and algorithms through interactive visualizations.
            </p>
            <a 
              href="https://github.com/username/dsa-visualizer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Documentation
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header 
        className={`lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <span className="text-xl font-bold primary-gradient-text">DSA Visualizer</span>
        
        <ThemeSwitcher />
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700 shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-700">
                <span className="text-2xl font-bold primary-gradient-text">DSA Visualizer</span>
                <button 
                  onClick={() => setSidebarOpen(false)} 
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map(item => (
                  <Link 
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md scale-105' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-102'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    <span className="text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                      {icons[item.id]}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Learn More</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Explore data structures and algorithms through interactive visualizations.
                  </p>
                  <a 
                    href="https://github.com/username/dsa-visualizer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Documentation
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 pt-16 lg:pt-0 lg:pl-72 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
