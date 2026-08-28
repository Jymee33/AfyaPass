'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IconComponent } from '@/components/icons';
import { cn } from '@/lib/utils';

export interface DropdownMenuItem {
  label: string;
  icon?: IconComponent;
  onClick: () => void;
  danger?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = 'right',
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-2 w-56 rounded-md bg-white shadow-dropdown ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in',
            align === 'right' ? 'origin-top-right right-0' : 'origin-top-left left-0'
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full text-left flex items-center px-4 py-2 text-sm transition-colors',
                  item.danger 
                    ? 'text-danger-600 hover:bg-danger-50' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
                role="menuitem"
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4" aria-hidden="true" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
