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
  iconColor = 'text-afya-600 bg-afya-50',
  className,
}: StatCardProps) {
  const isPositive = trendDirection ? trendDirection === 'up' : trendUp;
  const trendObj = typeof trend === 'string' ? { value: trend, positive: isPositive } : trend;
  const isIconComponent = typeof icon === 'function';
  const IconSlot = isIconComponent ? (icon as IconComponent) : null;

  return (
    <Card variant="stat" className={cn('flex flex-col', className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="section-subtitle">{title}</h3>
        <div className={cn('p-2 rounded-lg', iconColor)}>
          {IconSlot ? <IconSlot className="w-5 h-5" /> : (icon as React.ReactNode)}
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="stat-value">{value}</span>
        {trendObj && (
          <span className={cn(
            'flex items-center text-xs font-medium',
            trendObj.positive ? 'text-success-600' : 'text-danger-600'
          )}>
            {trendObj.positive ? (
              <IcTrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <IcTrendingDown className="h-4 w-4 mr-1" />
            )}
            {trendObj.value}
          </span>
        )}
      </div>
      
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </Card>
  );
}
