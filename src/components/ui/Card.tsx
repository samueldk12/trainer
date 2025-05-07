import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'flat' | 'glass';
  hoverEffect?: boolean;
  isInteractive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    hoverEffect = false, 
    isInteractive = false,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: 'border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm',
      bordered: 'border-2 border-[var(--card-border)] bg-[var(--card-bg)]',
      elevated: 'border-none bg-[var(--card-bg)] shadow-md',
      flat: 'border border-transparent bg-[var(--card-bg)]',
      glass: 'backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-300',
          variantClasses[variant],
          hoverEffect && 'hover:shadow-md hover:translate-y-[-2px]',
          isInteractive && 'cursor-pointer active:translate-y-[1px] active:shadow-inner',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-5 border-b border-[var(--card-border)]', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400 mt-2', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between p-5 pt-0 mt-2', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };