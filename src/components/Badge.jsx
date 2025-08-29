import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  pill = false,
  icon = null,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium';
  
  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    secondary: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
    light: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    dark: 'bg-gray-700 text-gray-100 dark:bg-gray-900 dark:text-gray-100'
  };
  
  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-3.5 py-1.5'
  };
  
  const radiusClasses = pill ? 'rounded-full' : 'rounded';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClasses} ${className}`;
  
  return (
    <span className={classes}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
