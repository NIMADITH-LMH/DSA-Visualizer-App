import React from 'react';
import { motion } from 'framer-motion';

const InfoPanel = ({ 
  title, 
  children, 
  icon = null,
  variant = 'default', // default, success, warning, error, info
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-slate-800/70 dark:bg-slate-800/90 border-slate-700/50 dark:border-slate-700',
    success: 'bg-emerald-900/20 dark:bg-emerald-900/30 border-emerald-700/30 dark:border-emerald-700/50',
    warning: 'bg-amber-900/20 dark:bg-amber-900/30 border-amber-700/30 dark:border-amber-700/50',
    error: 'bg-red-900/20 dark:bg-red-900/30 border-red-700/30 dark:border-red-700/50',
    info: 'bg-blue-900/20 dark:bg-blue-900/30 border-blue-700/30 dark:border-blue-700/50',
    primary: 'bg-indigo-900/20 dark:bg-indigo-900/30 border-indigo-700/30 dark:border-indigo-700/50'
  };

  const variantTextClasses = {
    default: 'text-indigo-300 dark:text-indigo-300',
    success: 'text-emerald-300 dark:text-emerald-300',
    warning: 'text-amber-300 dark:text-amber-300',
    error: 'text-red-300 dark:text-red-300',
    info: 'text-blue-300 dark:text-blue-300',
    primary: 'text-indigo-300 dark:text-indigo-300'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-5 rounded-xl border ${variantClasses[variant]} shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-lg">{icon}</span>}
        <h3 className={`text-xl font-semibold ${variantTextClasses[variant]}`}>{title}</h3>
      </div>
      
      <div className="space-y-3 text-slate-300 dark:text-slate-300">
        {children}
      </div>
    </motion.div>
  );
};

export default InfoPanel;
