import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'destructive' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon: Icon, loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-afya-600 text-white hover:bg-afya-700 focus-visible:ring-afya-600',
      default: 'bg-afya-600 text-white hover:bg-afya-700 focus-visible:ring-afya-600',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500',
      ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus-visible:ring-slate-500',
      outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-500',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-600',
      destructive: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-600',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 py-2 text-sm rounded-md',
      lg: 'h-12 px-8 text-base rounded-lg',
      icon: 'h-10 w-10 p-2 rounded-md',
    };

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
        {!loading && Icon && <Icon className={cn('mr-2', size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4')} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
