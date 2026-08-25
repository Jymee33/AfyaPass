import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'stat' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({
  className,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'card',
    stat: 'bg-white rounded-card border border-border shadow-sm',
    elevated: 'bg-white rounded-card-lg border border-border shadow-dropdown',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        variants[variant],
        paddings[padding],
        hoverable && 'hover:shadow-card-hover transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
