import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'info' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    isLoading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: 'bg-[var(--primary)] text-white shadow-md hover:shadow-lg hover:bg-[var(--primary-hover)] active:shadow-inner',
      primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-md hover:shadow-lg hover:brightness-105 active:shadow-inner active:brightness-95',
      secondary: 'bg-gradient-to-r from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary),black_10%)] text-white shadow-md hover:shadow-lg hover:brightness-105 active:shadow-inner',
      outline: 'border-2 border-[var(--card-border)] bg-transparent hover:bg-[var(--primary-light)] hover:text-[var(--primary)] hover:border-[var(--primary-light)]',
      destructive: 'bg-gradient-to-r from-[var(--accent-danger)] to-[color-mix(in_srgb,var(--accent-danger),black_10%)] text-white shadow-md hover:shadow-lg hover:brightness-105 active:shadow-inner',
      success: 'bg-gradient-to-r from-[var(--accent-success)] to-[color-mix(in_srgb,var(--accent-success),black_10%)] text-white shadow-md hover:shadow-lg hover:brightness-105 active:shadow-inner',
      info: 'bg-gradient-to-r from-[var(--accent-info)] to-[color-mix(in_srgb,var(--accent-info),black_10%)] text-white shadow-md hover:shadow-lg hover:brightness-105 active:shadow-inner',
      ghost: 'bg-transparent hover:bg-[var(--primary-light)] hover:text-[var(--primary)] dark:hover:bg-gray-800',
    };

    const sizeClasses = {
      xs: 'text-xs px-2 py-1 rounded-md',
      sm: 'text-xs px-3 py-1.5 rounded-md',
      md: 'text-sm px-4 py-2 rounded-md',
      lg: 'text-base px-6 py-3 rounded-lg',
    };

    return (
      <button
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          isLoading ? 'opacity-90 pointer-events-none' : '',
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        <span className={cn('flex items-center gap-2', isLoading ? 'opacity-0' : '')}>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </span>
      </button>
    );
  }
); 