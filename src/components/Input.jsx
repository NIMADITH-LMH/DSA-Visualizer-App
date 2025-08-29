import React from 'react';

const Input = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name = '',
  id = '',
  label = '',
  error = '',
  maxLength,
  disabled = false,
  className = '',
  onKeyDown,
  icon = null,
  iconPosition = 'left',
  helpText = '',
  required = false,
  fullWidth = true,
  ariaLabel = ''
}) => {
  const baseClasses = 'px-4 py-3 bg-slate-700/80 dark:bg-slate-800/80 text-white dark:text-white rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300';
  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
    : 'border-indigo-500/30 dark:border-indigo-500/50 focus:border-indigo-500 focus:ring-indigo-500/50';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : '';
  const iconClass = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-slate-300 dark:text-slate-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          name={name}
          id={id || name}
          disabled={disabled}
          maxLength={maxLength}
          className={`${baseClasses} ${stateClasses} ${widthClass} ${disabledClass} ${iconClass}`}
          aria-label={ariaLabel || label || placeholder}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : helpText ? `${name}-help` : undefined}
          required={required}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p id={`${name}-help`} className="mt-1 text-xs text-slate-400">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Input;
