import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, fullWidth, className }: TabsProps) {
  return (
    <div className={cn('flex space-x-1 p-1 bg-slate-100 rounded-lg overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
              fullWidth && 'flex-1',
              isActive
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {Icon && <Icon className={cn('w-4 h-4 mr-2', isActive ? 'text-afya-600' : 'text-slate-400')} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
