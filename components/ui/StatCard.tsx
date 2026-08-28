import React from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import { IconComponent, IcTrendingUp, IcTrendingDown } from '@/components/icons';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode | IconComponent;
  trend?: string | {
    value: string;
    positive: boolean;
  };
  trendUp?: boolean;
  trendDirection?: 'up' | 'down';
  iconColor?: string;
  iconBoxClass?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp = true,
  trendDirection,
  iconColor,
  iconBoxClass = 'icon-box-blue',
  className,
}: StatCardProps) {
  const isPositive = trendDirection ? trendDirection === 'up' : trendUp;
  const trendObj = typeof trend === 'string' ? { value: trend, positive: isPositive } : trend;
  const isIconComponent = typeof icon === 'function';
  const IconSlot = isIconComponent ? (icon as IconComponent) : null;

  return (
    <Card variant="stat" className={cn('flex flex-col group hover:shadow-card-hover transition-all duration-200', className)}>
      <div className="flex justify-between items-start mb-5">
        <div className={cn('h-12 w-12', iconBoxClass)}>
          {IconSlot ? (
            <IconSlot className="w-6 h-6" />
          ) : (
            <span className={cn('flex items-center justify-center', iconColor)}>{icon as React.ReactNode}</span>
          )}
        </div>
        {trendObj && (
          <span className={cn(
            'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg',
            trendObj.positive
              ? 'bg-success-50 text-success-700'
              : 'bg-danger-50 text-danger-700'
          )}>
            {trendObj.positive ? (
              <IcTrendingUp className="h-3.5 w-3.5" />
            ) : (
              <IcTrendingDown className="h-3.5 w-3.5" />
            )}
            {trendObj.value}
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <span className="stat-value">{value}</span>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </Card>
  );
}
