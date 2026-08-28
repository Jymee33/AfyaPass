import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface TabsProps {
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  defaultValue?: string;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, fullWidth, className, children }: TabsProps & { children?: React.ReactNode }) {
  if (children) {
    return <div className={cn('w-full', className)}>{children}</div>;
  }

  return (
    <div className={cn('flex space-x-1 p-1 bg-slate-100 rounded-lg overflow-x-auto', className)}>
      {tabs?.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
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

export function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex space-x-1 p-1 bg-slate-100 rounded-lg overflow-x-auto', className)} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ className, value: _value, active, onClick, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
        active
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value: _value, active: _active, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: string; active?: boolean }) {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  );
}
