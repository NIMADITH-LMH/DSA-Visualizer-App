import React from 'react';
import { motion } from 'framer-motion';

const VisualizerCard = ({ 
  title, 
  description, 
  children, 
  controls = null, 
  sidebar = null,
  icon = null,
  className = '' 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full max-w-6xl mx-auto px-4 py-6 md:py-8 ${className}`}
    >
      <div className="card dark:bg-slate-800/80 p-6 md:p-8">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center primary-gradient-bg text-white">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold primary-gradient-text">{title}</h1>
              {description && (
                <p className="text-slate-300 dark:text-slate-400 mt-1">{description}</p>
              )}
            </div>
          </div>
        </header>
        
        {/* Controls section */}
        {controls && (
          <div className="mb-8 p-4 md:p-5 rounded-xl bg-slate-700/30 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-600/20 dark:border-slate-700/50">
            {controls}
          </div>
        )}
        
        <div className={`${sidebar ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : ''}`}>
          {/* Main visualization area */}
          <div className={`visualizer-content ${sidebar ? 'lg:col-span-2' : 'w-full'}`}>
            {children}
          </div>
          
          {/* Sidebar information */}
          {sidebar && (
            <div className="flex flex-col gap-4">
              {sidebar}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualizerCard;
