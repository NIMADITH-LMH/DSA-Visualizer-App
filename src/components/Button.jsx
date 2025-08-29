import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  icon = null,
  iconPosition = 'left',
  type = 'button',
  ariaLabel = '',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'btn font-medium transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-500/20',
    danger: 'bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/20',
    warning: 'bg-amber-500 hover:bg-amber-400 text-white hover:shadow-lg hover:shadow-amber-500/20',
    info: 'bg-cyan-500 hover:bg-cyan-400 text-white hover:shadow-lg hover:shadow-cyan-500/20',
    light: 'bg-slate-200 hover:bg-slate-300 text-slate-800 hover:shadow-lg hover:shadow-slate-300/20 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white',
    dark: 'bg-slate-800 hover:bg-slate-700 text-white hover:shadow-lg hover:shadow-slate-700/20',
    outline: 'bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:text-white',
    'outline-secondary': 'bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white dark:border-pink-400 dark:text-pink-400 dark:hover:text-white',
    ghost: 'bg-transparent hover:bg-indigo-50 text-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-900/30',
    link: 'bg-transparent p-0 text-indigo-600 hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300'
  };
  
  const sizeClasses = {
    xs: 'text-xs px-2.5 py-1.5 rounded',
    sm: 'text-sm px-3 py-2 rounded-md',
    md: 'text-base px-4 py-2 rounded-lg',
    lg: 'text-lg px-5 py-2.5 rounded-lg',
    xl: 'text-xl px-6 py-3 rounded-xl'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel || undefined}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
    </button>
  );
};

export default Button;
