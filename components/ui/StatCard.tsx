import React from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = 'text-afya-600 bg-afya-50',
  className,
}: StatCardProps) {
  return (
    <Card variant="stat" className={cn('flex flex-col', className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="section-subtitle">{title}</h3>
        <div className={cn('p-2 rounded-lg', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="stat-value">{value}</span>
        {trend && (
          <span className={cn(
            'flex items-center text-xs font-medium',
            trend.positive ? 'text-success-600' : 'text-danger-600'
          )}>
            {trend.positive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {trend.value}
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
