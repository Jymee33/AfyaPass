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
    success: 'bg-success-50 text-success-700 border-success-100',
    warning: 'bg-warning-50 text-warning-700 border-warning-100',
    danger: 'bg-danger-50 text-danger-700 border-danger-100',
    destructive: 'bg-danger-50 text-danger-700 border-danger-100',
    info: 'bg-medic-50 text-medic-700 border-medic-100',
    primary: 'bg-medic-50 text-medic-700 border-medic-100',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    secondary: 'bg-slate-100 text-slate-600 border-slate-200',
    default: 'bg-slate-100 text-slate-600 border-slate-200',
    outline: 'bg-white text-slate-600 border-border',
  };
  
  const dotColors = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    destructive: 'bg-danger-500',
    info: 'bg-medic-500',
    primary: 'bg-medic-500',
    neutral: 'bg-slate-400',
    secondary: 'bg-slate-400',
    default: 'bg-slate-400',
    outline: 'bg-slate-400',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-lg border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('mr-1.5 rounded-full', dotColors[variant], size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')}
        />
      )}
      {children}
    </span>
  );
}
