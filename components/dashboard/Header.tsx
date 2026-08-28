'use client';

import React from 'react';
import { IcMenu, IcSearch, IcBell, IcPlus, IcCalendar } from '@/components/icons';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-border/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 focus:outline-none"
          aria-label="Open menu"
        >
          <IcMenu className="h-5 w-5" />
        </button>
        
        <div className="hidden md:flex relative max-w-lg w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IcSearch className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients, ID numbers, or phone..."
            className="block w-full pl-11 pr-4 py-2.5 border border-border rounded-xl leading-5 bg-slate-50/80 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-medic-500/15 focus:border-medic-400 sm:text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500 mr-2">
          <IcCalendar className="h-4 w-4 text-slate-400" />
          <span className="hidden xl:inline">{formatDate()}</span>
        </div>

        <Link 
          href="/patients/register"
          className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-medic-600 to-medic-500 hover:from-medic-700 hover:to-medic-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-icon"
        >
          <IcPlus className="h-4 w-4" />
          New Patient
        </Link>
        
        <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 focus:outline-none transition-colors" aria-label="Notifications">
          <IcBell className="h-5 w-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
        </button>

        <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-border">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">Dr. James Kamau</p>
            <p className="text-xs text-slate-500">{getGreeting()}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-medic-500 to-afya-500 flex items-center justify-center text-white font-bold text-sm shadow-icon ring-2 ring-white">
            JK
          </div>
        </div>
      </div>
    </header>
  );
}
