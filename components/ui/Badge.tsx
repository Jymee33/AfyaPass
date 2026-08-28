import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'outline' | 'default' | 'destructive' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    success: 'bg-success-50 text-success-800 border-success-200',
    warning: 'bg-warning-50 text-warning-800 border-warning-200',
    danger: 'bg-danger-50 text-danger-800 border-danger-200',
    destructive: 'bg-danger-50 text-danger-800 border-danger-200',
    info: 'bg-info-50 text-info-800 border-info-200',
    primary: 'bg-info-50 text-info-800 border-info-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  
  const dotColors = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    destructive: 'bg-danger-500',
    info: 'bg-info-500',
    primary: 'bg-info-500',
    neutral: 'bg-slate-500',
    secondary: 'bg-slate-500',
    default: 'bg-slate-500',
    outline: 'bg-slate-500',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-pill border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('mr-1.5 rounded-full', dotColors[variant], size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5')}
        />
      )}
      {children}
    </span>
  );
}
