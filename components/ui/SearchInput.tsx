'use client';
import React from 'react';
import { IcSearch, IcX } from '@/components/icons';
import { Input } from './Input';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = 'Search...',
  value = '',
  onChange,
  onClear,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative ${className || ''}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        icon={IcSearch}
        className={value && onClear ? 'pr-10' : ''}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
          aria-label="Clear search"
        >
          <IcX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
