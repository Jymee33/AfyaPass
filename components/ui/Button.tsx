import React from 'react';
import { cn } from '@/lib/utils';
import { IconComponent } from '@/components/icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'destructive' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: IconComponent;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon: Icon, loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-gradient-to-r from-medic-600 to-medic-500 text-white hover:from-medic-700 hover:to-medic-600 focus-visible:ring-medic-500 shadow-icon',
      default: 'bg-gradient-to-r from-medic-600 to-medic-500 text-white hover:from-medic-700 hover:to-medic-600 focus-visible:ring-medic-500 shadow-icon',
      secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400',
      ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus-visible:ring-slate-400',
      outline: 'border border-border bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-400',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-600',
      destructive: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-600',
    };

    const sizes = {
      sm: 'h-8 px-3.5 text-xs rounded-lg',
      md: 'h-10 px-5 py-2 text-sm rounded-xl',
      lg: 'h-12 px-8 text-base rounded-xl',
      icon: 'h-10 w-10 p-2 rounded-xl',
    };

    const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!loading && Icon && (
          <Icon className={cn(size !== 'icon' && children && 'mr-2', iconSize)} />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
