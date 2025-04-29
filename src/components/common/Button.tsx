import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  icon
}) => {
  // Base styles
  const baseStyles = 'font-medium rounded-lg inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500 disabled:bg-secondary-300',
    outline: 'border-2 border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    danger: 'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500 disabled:bg-error-300',
    success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500 disabled:bg-success-300'
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Icon styles
  const iconStyles = icon ? 'gap-2' : '';
  
  // Combine styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${iconStyles} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;